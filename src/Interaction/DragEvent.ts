import UIBase from "../UIBase";
import { TouchMouseEventEnum } from "../Enum/TouchMouseEventEnum";
import { interaction } from "pixi.js";

/**
 * 拖动相关的事件处理订阅类
 * @since 1.0.0
 */
export default class DragEvent {

    public constructor(obj: UIBase) {
        this.obj = obj;
        obj.container.interactive = true;
        this.startEvent();
    }

    private obj: UIBase;
    public  id = 0;
    private offset = new PIXI.Point();
    private movementX = 0;
    private movementY = 0;
    private bound = false;
    private start = new PIXI.Point();
    private mouse = new PIXI.Point();
    private cancel = false;
    private dragging = false;

    private startEvent() {

        this.obj.container.on(TouchMouseEventEnum.mousedown, this._onDragStart, this);
        this.obj.container.on(TouchMouseEventEnum.touchstart, this._onDragStart, this);
    }


    private _onDragStart(e: interaction.InteractionEvent) {
        this.id = e.data.identifier;
        this.onPress && this.onPress.call(this.obj, e, true);
        if (!this.bound && this.obj.stage) {
            this.start.copyFrom(e.data.global);
            this.obj.stage.on(TouchMouseEventEnum.mousemove, this._onDragMove, this);
            this.obj.stage.on(TouchMouseEventEnum.touchmove, this._onDragMove, this);
            this.obj.stage.on(TouchMouseEventEnum.mouseup, this._onDragEnd, this);
            this.obj.stage.on(TouchMouseEventEnum.mouseupoutside, this._onDragEnd, this);
            this.obj.stage.on(TouchMouseEventEnum.touchend, this._onDragEnd, this);
            this.obj.stage.on(TouchMouseEventEnum.touchendoutside, this._onDragEnd, this);
            this.obj.stage.on(TouchMouseEventEnum.touchcancel, this._onDragEnd, this);
            this.bound = true;
        }

        e.data.originalEvent.preventDefault();
    }

    private _onDragMove(e: interaction.InteractionEvent) {
        if (e.data.identifier !== this.id) return;
        this.mouse.copyFrom(e.data.global);
        this.offset.set(this.mouse.x - this.start.x, this.mouse.y - this.start.y);
        if (!this.dragging) {
            this.movementX = Math.abs(this.offset.x);
            this.movementY = Math.abs(this.offset.y);
            if (this.movementX === 0 && this.movementY === 0 || Math.max(this.movementX, this.movementY) < this.obj.dragThreshold) return; //thresshold
            if (this.obj.dragRestrictAxis !== undefined) {
                this.cancel = false;
                if (this.obj.dragRestrictAxis == "x" && this.movementY > this.movementX) this.cancel = true;
                else if (this.obj.dragRestrictAxis == "y" && this.movementY <= this.movementX) this.cancel = true;
                if (this.cancel) {
                    this._onDragEnd(e);
                    return;
                }
            }
            this.onDragStart && this.onDragStart.call(this.obj, e);
            this.dragging = true;
        }
        this.onDragMove && this.onDragMove.call(this.obj, e, this.offset);
    }

    private _onDragEnd(e: interaction.InteractionEvent) {
        if (e.data.identifier !== this.id) return;
        if (this.bound && this.obj.stage) {
            this.obj.stage.removeListener(TouchMouseEventEnum.mousemove, this._onDragMove, this);
            this.obj.stage.removeListener(TouchMouseEventEnum.touchmove, this._onDragMove, this);
            this.obj.stage.removeListener(TouchMouseEventEnum.mouseup, this._onDragEnd, this);
            this.obj.stage.removeListener(TouchMouseEventEnum.mouseupoutside, this._onDragEnd, this);
            this.obj.stage.removeListener(TouchMouseEventEnum.touchend, this._onDragEnd, this);
            this.obj.stage.removeListener(TouchMouseEventEnum.touchendoutside, this._onDragEnd, this);
            this.obj.stage.removeListener(TouchMouseEventEnum.touchcancel, this._onDragEnd, this);
            this.dragging = false;
            this.bound = false;
            this.onDragEnd && this.onDragEnd.call(this.obj, e);
            this.onPress && this.onPress.call(this.obj, e, false);

        }
    }

    /** 清除拖动 */
    public stopEvent() {
        if (this.bound && this.obj.stage) {
            this.obj.stage.removeListener(TouchMouseEventEnum.mousemove, this._onDragMove, this);
            this.obj.stage.removeListener(TouchMouseEventEnum.touchmove, this._onDragMove, this);
            this.obj.stage.removeListener(TouchMouseEventEnum.mouseup, this._onDragEnd, this);
            this.obj.stage.removeListener(TouchMouseEventEnum.mouseupoutside, this._onDragEnd, this);
            this.obj.stage.removeListener(TouchMouseEventEnum.touchend, this._onDragEnd, this);
            this.obj.stage.removeListener(TouchMouseEventEnum.touchendoutside, this._onDragEnd, this);
            this.bound = false;
        }
        this.obj.container.removeListener(TouchMouseEventEnum.mousedown, this._onDragStart, this);
        this.obj.container.removeListener(TouchMouseEventEnum.touchstart, this._onDragStart, this);
    }

    public remove(){
        this.stopEvent();
        this.onPress = undefined;
        this.onDragEnd = undefined;
        this.onDragMove = undefined;
        this.onDragStart = undefined;
    }

    public onPress: ((e: interaction.InteractionEvent, isPressed: boolean) => void) | undefined;
    public onDragEnd: ((e: interaction.InteractionEvent) => void) | undefined
    public onDragMove: ((e: interaction.InteractionEvent, offset: PIXI.Point) => void) | undefined 
    public onDragStart: ((e: interaction.InteractionEvent) => void) | undefined
}
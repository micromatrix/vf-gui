import * as tween from "./c/Tween/index";
import { now } from "./Utils";
/**
 * 心跳，需要UI库初始化后，进行实例调用注册
 */
class Ticker extends PIXI.utils.EventEmitter {
    /**
     * 心跳构造函数
     * @param autoStart 是否自动开启心跳，默认false
     */
    constructor(autoStart) {
        super();
        /** 上次运行的时间 */
        this._lastnow = 0;
        this._disabled = true;
        this._lastnow = now();
        if (autoStart) {
            this.disabled = false;
        }
    }
    /** 是否关闭心跳.默认false不关闭,关闭后，缓动等组件也将关闭 */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        if (value == this._disabled) {
            return;
        }
        this._disabled = value;
        if (!this._disabled) {
            this.update(now() - this._lastnow);
        }
    }
    update(deltaTime) {
        if (this._disabled) {
            return;
        }
        const _now = now();
        tween.update(_now);
        this.emit("update", _now - this._lastnow, deltaTime);
        this._lastnow = _now;
    }
    /**
     * 增加更新监听器
     * @param fn 被调用的函数
     * @param context 当前域
     */
    addUpdateEvent(fn, context) {
        return this.on("update", fn, context);
    }
    /**
     * 移除更新监听器
     * @param fn 被调用的函数
     * @param context 当前域
     */
    removeUpdateEvent(fn, context) {
        return this.removeListener("update", fn, context);
    }
}
/**
 * Ticker 的实例
 */
export const shared = new Ticker(true);
//# sourceMappingURL=Ticker.js.map
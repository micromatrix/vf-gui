import {Stage} from "./core/Stage";
import {UIBase} from "./core/UIBase";
import {shared as TickerShared} from "./core/Ticker";
import * as Utils from "./core/Utils";

import {Container} from "./c/Container";
import {ScrollingContainer} from "./c/ScrollingContainer";

import {Image} from "./c/Image";
import {SpriteAnimated} from "./c/SpriteAnimated";


import {Label,LabelProps} from "./c/Label";
import {TextInput} from "./c/TextInput";

import {Slider} from "./c/Slider";
import {Button} from "./c/Button";
import {CheckBox} from "./c/CheckBox";
import {Rect} from "./c/Rect";
import {Graphics} from "./c/Graphics";


import {Tween} from "./c/Tween";
import {Timeline} from "./c/Timeline";
import {Easing} from "./c/Easing";

import * as Interaction from "./interaction/Index";
import * as AlignEnum from "./enum/AlignEnum";

/** 请不要在编写UI组件内部使用本类 */
export {Utils,Stage,Container,ScrollingContainer,Slider,
    Label,LabelProps,TextInput,Button,CheckBox,Rect,Graphics,Interaction,
    UIBase,TickerShared,AlignEnum,Tween,Timeline,Easing,Image,SpriteAnimated};
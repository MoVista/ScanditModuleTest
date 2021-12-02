/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 362:
/***/ ((module) => {

module.exports = require("com.scandit.ti.datacapture.core");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {

;// CONCATENATED MODULE: ./src/ts/CommonEnums.ts
var MeasureUnit;
(function (MeasureUnit) {
    MeasureUnit["DIP"] = "dip";
    MeasureUnit["Pixel"] = "pixel";
    MeasureUnit["Fraction"] = "fraction";
})(MeasureUnit || (MeasureUnit = {}));
var SizingMode;
(function (SizingMode) {
    SizingMode["WidthAndHeight"] = "widthAndHeight";
    SizingMode["WidthAndAspectRatio"] = "widthAndAspectRatio";
    SizingMode["HeightAndAspectRatio"] = "heightAndAspectRatio";
    SizingMode["ShorterDimensionAndAspectRatio"] = "shorterDimensionAndAspectRatio";
})(SizingMode || (SizingMode = {}));
var Orientation;
(function (Orientation) {
    Orientation["Unknown"] = "unknown";
    Orientation["Portrait"] = "portrait";
    Orientation["PortraitUpsideDown"] = "portraitUpsideDown";
    Orientation["LandscapeRight"] = "landscapeRight";
    Orientation["LandscapeLeft"] = "landscapeLeft";
})(Orientation || (Orientation = {}));
var Direction;
(function (Direction) {
    Direction["None"] = "none";
    Direction["Horizontal"] = "horizontal";
    Direction["LeftToRight"] = "leftToRight";
    Direction["RightToLeft"] = "rightToLeft";
    Direction["Vertical"] = "vertical";
    Direction["TopToBottom"] = "topToBottom";
    Direction["BottomToTop"] = "bottomToTop";
})(Direction || (Direction = {}));
var Anchor;
(function (Anchor) {
    Anchor["TopLeft"] = "topLeft";
    Anchor["TopCenter"] = "topCenter";
    Anchor["TopRight"] = "topRight";
    Anchor["CenterLeft"] = "centerLeft";
    Anchor["Center"] = "center";
    Anchor["CenterRight"] = "centerRight";
    Anchor["BottomLeft"] = "bottomLeft";
    Anchor["BottomCenter"] = "bottomCenter";
    Anchor["BottomRight"] = "bottomRight";
})(Anchor || (Anchor = {}));

;// CONCATENATED MODULE: ./src/ts/internal/Serializable.ts
function ignoreFromSerialization(target, propertyName) {
    target.ignoredProperties = target.ignoredProperties || [];
    target.ignoredProperties.push(propertyName);
}
function nameForSerialization(customName) {
    return (target, propertyName) => {
        target.customPropertyNames = target.customPropertyNames || {};
        target.customPropertyNames[propertyName] = customName;
    };
}
function ignoreFromSerializationIfNull(target, propertyName) {
    target.ignoredIfNullProperties = target.ignoredIfNullProperties || [];
    target.ignoredIfNullProperties.push(propertyName);
}
function serializationDefault(defaultValue) {
    return (target, propertyName) => {
        target.customPropertyDefaults = target.customPropertyDefaults || {};
        target.customPropertyDefaults[propertyName] = defaultValue;
    };
}
class DefaultSerializable {
    toJSON() {
        const properties = Object.keys(this);
        // use @ignoreFromSerialization to ignore properties
        const ignoredProperties = this.ignoredProperties || [];
        // use @ignoreFromSerializationIfNull to ignore properties if they're null
        const ignoredIfNullProperties = this.ignoredIfNullProperties || [];
        // use @nameForSerialization('customName') to rename properties in the JSON output
        const customPropertyNames = this.customPropertyNames || {};
        // use @serializationDefault({}) to use a different value in the JSON output if they're null
        const customPropertyDefaults = this.customPropertyDefaults || {};
        return properties.reduce((json, property) => {
            if (ignoredProperties.includes(property)) {
                return json;
            }
            let value = this[property];
            if (value === undefined) {
                return json;
            }
            // Ignore if it's null and should be ignored.
            // This is basically responsible for not including optional properties in the JSON if they're null,
            // as that's not always deserialized to mean the same as not present.
            if (value === null && ignoredIfNullProperties.includes(property)) {
                return json;
            }
            if (value === null && customPropertyDefaults[property] !== undefined) {
                value = customPropertyDefaults[property];
            }
            // Serialize if serializable
            if (value != null && value.toJSON) {
                value = value.toJSON();
            }
            // Serialize the array if the elements are serializable
            if (Array.isArray(value)) {
                value = value.map(e => e.toJSON ? e.toJSON() : e);
            }
            const propertyName = customPropertyNames[property] || property;
            json[propertyName] = value;
            return json;
        }, {});
    }
}

;// CONCATENATED MODULE: ./src/ts/Common.ts
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class Point extends DefaultSerializable {
    constructor(x, y) {
        super();
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    static fromJSON(json) {
        return new Point(json.x, json.y);
    }
}
__decorate([
    nameForSerialization('x')
], Point.prototype, "_x", void 0);
__decorate([
    nameForSerialization('y')
], Point.prototype, "_y", void 0);
class Quadrilateral extends DefaultSerializable {
    constructor(topLeft, topRight, bottomRight, bottomLeft) {
        super();
        this._topLeft = topLeft;
        this._topRight = topRight;
        this._bottomRight = bottomRight;
        this._bottomLeft = bottomLeft;
    }
    get topLeft() {
        return this._topLeft;
    }
    get topRight() {
        return this._topRight;
    }
    get bottomRight() {
        return this._bottomRight;
    }
    get bottomLeft() {
        return this._bottomLeft;
    }
    static fromJSON(json) {
        return new Quadrilateral(Point.fromJSON(json.topLeft), Point.fromJSON(json.topRight), Point.fromJSON(json.bottomRight), Point.fromJSON(json.bottomLeft));
    }
}
__decorate([
    nameForSerialization('topLeft')
], Quadrilateral.prototype, "_topLeft", void 0);
__decorate([
    nameForSerialization('topRight')
], Quadrilateral.prototype, "_topRight", void 0);
__decorate([
    nameForSerialization('bottomRight')
], Quadrilateral.prototype, "_bottomRight", void 0);
__decorate([
    nameForSerialization('bottomLeft')
], Quadrilateral.prototype, "_bottomLeft", void 0);
class NumberWithUnit extends DefaultSerializable {
    constructor(value, unit) {
        super();
        this._value = value;
        this._unit = unit;
    }
    get value() {
        return this._value;
    }
    get unit() {
        return this._unit;
    }
    static fromJSON(json) {
        return new NumberWithUnit(json.value, json.unit);
    }
}
__decorate([
    nameForSerialization('value')
], NumberWithUnit.prototype, "_value", void 0);
__decorate([
    nameForSerialization('unit')
], NumberWithUnit.prototype, "_unit", void 0);
class PointWithUnit extends DefaultSerializable {
    constructor(x, y) {
        super();
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    static fromJSON(json) {
        return new PointWithUnit(NumberWithUnit.fromJSON(json.x), NumberWithUnit.fromJSON(json.y));
    }
    static get zero() {
        return new PointWithUnit(new NumberWithUnit(0, MeasureUnit.Pixel), new NumberWithUnit(0, MeasureUnit.Pixel));
    }
}
__decorate([
    nameForSerialization('x')
], PointWithUnit.prototype, "_x", void 0);
__decorate([
    nameForSerialization('y')
], PointWithUnit.prototype, "_y", void 0);
class Rect extends DefaultSerializable {
    constructor(origin, size) {
        super();
        this._origin = origin;
        this._size = size;
    }
    get origin() {
        return this._origin;
    }
    get size() {
        return this._size;
    }
}
__decorate([
    nameForSerialization('origin')
], Rect.prototype, "_origin", void 0);
__decorate([
    nameForSerialization('size')
], Rect.prototype, "_size", void 0);
class RectWithUnit extends DefaultSerializable {
    constructor(origin, size) {
        super();
        this._origin = origin;
        this._size = size;
    }
    get origin() {
        return this._origin;
    }
    get size() {
        return this._size;
    }
}
__decorate([
    nameForSerialization('origin')
], RectWithUnit.prototype, "_origin", void 0);
__decorate([
    nameForSerialization('size')
], RectWithUnit.prototype, "_size", void 0);
class SizeWithUnit extends DefaultSerializable {
    constructor(width, height) {
        super();
        this._width = width;
        this._height = height;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
}
__decorate([
    nameForSerialization('width')
], SizeWithUnit.prototype, "_width", void 0);
__decorate([
    nameForSerialization('height')
], SizeWithUnit.prototype, "_height", void 0);
class Size extends DefaultSerializable {
    constructor(width, height) {
        super();
        this._width = width;
        this._height = height;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    static fromJSON(json) {
        return new Size(json.width, json.height);
    }
}
__decorate([
    nameForSerialization('width')
], Size.prototype, "_width", void 0);
__decorate([
    nameForSerialization('height')
], Size.prototype, "_height", void 0);
class SizeWithAspect {
    constructor(size, aspect) {
        this._size = size;
        this._aspect = aspect;
    }
    get size() {
        return this._size;
    }
    get aspect() {
        return this._aspect;
    }
}
__decorate([
    nameForSerialization('size')
], SizeWithAspect.prototype, "_size", void 0);
__decorate([
    nameForSerialization('aspect')
], SizeWithAspect.prototype, "_aspect", void 0);
class SizeWithUnitAndAspect {
    constructor() {
        this._widthAndHeight = null;
        this._widthAndAspectRatio = null;
        this._heightAndAspectRatio = null;
        this._shorterDimensionAndAspectRatio = null;
    }
    get widthAndHeight() {
        return this._widthAndHeight;
    }
    get widthAndAspectRatio() {
        return this._widthAndAspectRatio;
    }
    get heightAndAspectRatio() {
        return this._heightAndAspectRatio;
    }
    get shorterDimensionAndAspectRatio() {
        return this._shorterDimensionAndAspectRatio;
    }
    get sizingMode() {
        if (this.widthAndAspectRatio) {
            return SizingMode.WidthAndAspectRatio;
        }
        if (this.heightAndAspectRatio) {
            return SizingMode.HeightAndAspectRatio;
        }
        if (this.shorterDimensionAndAspectRatio) {
            return SizingMode.ShorterDimensionAndAspectRatio;
        }
        return SizingMode.WidthAndHeight;
    }
    static sizeWithWidthAndHeight(widthAndHeight) {
        const sizeWithUnitAndAspect = new SizeWithUnitAndAspect();
        sizeWithUnitAndAspect._widthAndHeight = widthAndHeight;
        return sizeWithUnitAndAspect;
    }
    static sizeWithWidthAndAspectRatio(width, aspectRatio) {
        const sizeWithUnitAndAspect = new SizeWithUnitAndAspect();
        sizeWithUnitAndAspect._widthAndAspectRatio = new SizeWithAspect(width, aspectRatio);
        return sizeWithUnitAndAspect;
    }
    static sizeWithHeightAndAspectRatio(height, aspectRatio) {
        const sizeWithUnitAndAspect = new SizeWithUnitAndAspect();
        sizeWithUnitAndAspect._heightAndAspectRatio = new SizeWithAspect(height, aspectRatio);
        return sizeWithUnitAndAspect;
    }
    static sizeWithShorterDimensionAndAspectRatio(shorterDimension, aspectRatio) {
        const sizeWithUnitAndAspect = new SizeWithUnitAndAspect();
        sizeWithUnitAndAspect._shorterDimensionAndAspectRatio = new SizeWithAspect(shorterDimension, aspectRatio);
        return sizeWithUnitAndAspect;
    }
    static fromJSON(json) {
        if (json.width && json.height) {
            return this.sizeWithWidthAndHeight(new SizeWithUnit(NumberWithUnit.fromJSON(json.width), NumberWithUnit.fromJSON(json.height)));
        }
        else if (json.width && json.aspect) {
            return this.sizeWithWidthAndAspectRatio(NumberWithUnit.fromJSON(json.width), json.aspect);
        }
        else if (json.height && json.aspect) {
            return this.sizeWithHeightAndAspectRatio(NumberWithUnit.fromJSON(json.height), json.aspect);
        }
        else if (json.shorterDimension && json.aspect) {
            return this.sizeWithShorterDimensionAndAspectRatio(NumberWithUnit.fromJSON(json.shorterDimension), json.aspect);
        }
        else {
            throw new Error(`SizeWithUnitAndAspectJSON is malformed: ${JSON.stringify(json)}`);
        }
    }
    toJSON() {
        switch (this.sizingMode) {
            case SizingMode.WidthAndAspectRatio:
                return {
                    width: this.widthAndAspectRatio.size.toJSON(),
                    aspect: this.widthAndAspectRatio.aspect,
                };
            case SizingMode.HeightAndAspectRatio:
                return {
                    height: this.heightAndAspectRatio.size.toJSON(),
                    aspect: this.heightAndAspectRatio.aspect,
                };
            case SizingMode.ShorterDimensionAndAspectRatio:
                return {
                    shorterDimension: this.shorterDimensionAndAspectRatio.size.toJSON(),
                    aspect: this.shorterDimensionAndAspectRatio.aspect,
                };
            default:
                return {
                    width: this.widthAndHeight.width.toJSON(),
                    height: this.widthAndHeight.height.toJSON(),
                };
        }
    }
}
__decorate([
    nameForSerialization('widthAndHeight')
], SizeWithUnitAndAspect.prototype, "_widthAndHeight", void 0);
__decorate([
    nameForSerialization('widthAndAspectRatio')
], SizeWithUnitAndAspect.prototype, "_widthAndAspectRatio", void 0);
__decorate([
    nameForSerialization('heightAndAspectRatio')
], SizeWithUnitAndAspect.prototype, "_heightAndAspectRatio", void 0);
__decorate([
    nameForSerialization('shorterDimensionAndAspectRatio')
], SizeWithUnitAndAspect.prototype, "_shorterDimensionAndAspectRatio", void 0);
class MarginsWithUnit extends DefaultSerializable {
    constructor(left, right, top, bottom) {
        super();
        this._left = left;
        this._right = right;
        this._top = top;
        this._bottom = bottom;
    }
    get left() {
        return this._left;
    }
    get right() {
        return this._right;
    }
    get top() {
        return this._top;
    }
    get bottom() {
        return this._bottom;
    }
    static fromJSON(json) {
        return new MarginsWithUnit(NumberWithUnit.fromJSON(json.left), NumberWithUnit.fromJSON(json.right), NumberWithUnit.fromJSON(json.top), NumberWithUnit.fromJSON(json.bottom));
    }
    static get zero() {
        return new MarginsWithUnit(new NumberWithUnit(0, MeasureUnit.Pixel), new NumberWithUnit(0, MeasureUnit.Pixel), new NumberWithUnit(0, MeasureUnit.Pixel), new NumberWithUnit(0, MeasureUnit.Pixel));
    }
}
__decorate([
    nameForSerialization('left')
], MarginsWithUnit.prototype, "_left", void 0);
__decorate([
    nameForSerialization('right')
], MarginsWithUnit.prototype, "_right", void 0);
__decorate([
    nameForSerialization('top')
], MarginsWithUnit.prototype, "_top", void 0);
__decorate([
    nameForSerialization('bottom')
], MarginsWithUnit.prototype, "_bottom", void 0);
class Color {
    constructor(hex) {
        this.hexadecimalString = hex;
    }
    get redComponent() {
        return this.hexadecimalString.slice(0, 2);
    }
    get greenComponent() {
        return this.hexadecimalString.slice(2, 4);
    }
    get blueComponent() {
        return this.hexadecimalString.slice(4, 6);
    }
    get alphaComponent() {
        return this.hexadecimalString.slice(6, 8);
    }
    get red() {
        return Color.hexToNumber(this.redComponent);
    }
    get green() {
        return Color.hexToNumber(this.greenComponent);
    }
    get blue() {
        return Color.hexToNumber(this.blueComponent);
    }
    get alpha() {
        return Color.hexToNumber(this.alphaComponent);
    }
    static fromHex(hex) {
        return new Color(Color.normalizeHex(hex));
    }
    static fromRGBA(red, green, blue, alpha = 1) {
        const hexString = [red, green, blue, this.normalizeAlpha(alpha)]
            .reduce((hex, colorComponent) => hex + this.numberToHex(colorComponent), '');
        return new Color(hexString);
    }
    static hexToNumber(hex) {
        return parseInt(hex, 16);
    }
    static fromJSON(json) {
        return Color.fromHex(json);
    }
    static numberToHex(x) {
        x = Math.round(x);
        let hex = x.toString(16);
        if (hex.length === 1) {
            hex = '0' + hex;
        }
        return hex.toUpperCase();
    }
    static normalizeHex(hex) {
        // remove leading #
        if (hex[0] === '#') {
            hex = hex.slice(1);
        }
        // double digits if single digit
        if (hex.length < 6) {
            hex = hex.split('').map(s => s + s).join('');
        }
        // add alpha if missing
        if (hex.length === 6) {
            hex = hex + 'FF';
        }
        return hex.toUpperCase();
    }
    static normalizeAlpha(alpha) {
        if (alpha > 0 && alpha <= 1) {
            return 255 * alpha;
        }
        return alpha;
    }
    withAlpha(alpha) {
        const newHex = this.hexadecimalString.slice(0, 6) + Color.numberToHex(Color.normalizeAlpha(alpha));
        return Color.fromHex(newHex);
    }
    toJSON() {
        return this.hexadecimalString;
    }
}
class Brush extends DefaultSerializable {
    constructor(fillColor = Brush.defaults.fillColor, strokeColor = Brush.defaults.strokeColor, strokeWidth = Brush.defaults.strokeWidth) {
        super();
        this.fill = { color: fillColor };
        this.stroke = { color: strokeColor, width: strokeWidth };
    }
    static get transparent() {
        const transparentBlack = Color.fromRGBA(255, 255, 255, 0);
        return new Brush(transparentBlack, transparentBlack, 0);
    }
    get fillColor() {
        return this.fill.color;
    }
    get strokeColor() {
        return this.stroke.color;
    }
    get strokeWidth() {
        return this.stroke.width;
    }
    get copy() {
        return new Brush(this.fillColor, this.strokeColor, this.strokeWidth);
    }
}

;// CONCATENATED MODULE: ./src/ts/DataCaptureView+Related.ts

class TapToFocus extends DefaultSerializable {
    constructor() {
        super();
        this.type = 'tapToFocus';
    }
}
class SwipeToZoom extends DefaultSerializable {
    constructor() {
        super();
        this.type = 'swipeToZoom';
    }
}
var LogoStyle;
(function (LogoStyle) {
    LogoStyle["Minimal"] = "minimal";
    LogoStyle["Extended"] = "extended";
})(LogoStyle || (LogoStyle = {}));

;// CONCATENATED MODULE: ./src/ts/internal/PrivateDataCaptureView+Related.ts

class PrivateFocusGestureDeserializer {
    static fromJSON(json) {
        if (json && json.type === new TapToFocus().type) {
            return new TapToFocus();
        }
        else {
            return null;
        }
    }
}
class PrivateZoomGestureDeserializer {
    static fromJSON(json) {
        if (json && json.type === new SwipeToZoom().type) {
            return new SwipeToZoom();
        }
        else {
            return null;
        }
    }
}

;// CONCATENATED MODULE: ./src/ts/Viewfinder+Related.ts
var Viewfinder_Related_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var RectangularViewfinderStyle;
(function (RectangularViewfinderStyle) {
    RectangularViewfinderStyle["Legacy"] = "legacy";
    RectangularViewfinderStyle["Rounded"] = "rounded";
    RectangularViewfinderStyle["Square"] = "square";
})(RectangularViewfinderStyle || (RectangularViewfinderStyle = {}));
var RectangularViewfinderLineStyle;
(function (RectangularViewfinderLineStyle) {
    RectangularViewfinderLineStyle["Light"] = "light";
    RectangularViewfinderLineStyle["Bold"] = "bold";
})(RectangularViewfinderLineStyle || (RectangularViewfinderLineStyle = {}));
var LaserlineViewfinderStyle;
(function (LaserlineViewfinderStyle) {
    LaserlineViewfinderStyle["Legacy"] = "legacy";
    LaserlineViewfinderStyle["Animated"] = "animated";
})(LaserlineViewfinderStyle || (LaserlineViewfinderStyle = {}));
class RectangularViewfinderAnimation extends DefaultSerializable {
    constructor(isLooping) {
        super();
        this._isLooping = false;
        this._isLooping = isLooping;
    }
    static fromJSON(json) {
        if (json === null) {
            return null;
        }
        return new RectangularViewfinderAnimation(json.looping);
    }
    get isLooping() {
        return this._isLooping;
    }
}
Viewfinder_Related_decorate([
    nameForSerialization('looping')
], RectangularViewfinderAnimation.prototype, "_isLooping", void 0);

;// CONCATENATED MODULE: ./src/ts/internal/Defaults.ts



const coreNative = __webpack_require__(362);
const defaultsFromJSON = (json) => {
    return {
        Camera: {
            Settings: {
                preferredResolution: json.Camera.Settings.preferredResolution,
                zoomFactor: json.Camera.Settings.zoomFactor,
                focusRange: json.Camera.Settings.focusRange,
                zoomGestureZoomFactor: json.Camera.Settings.zoomGestureZoomFactor,
                focusGestureStrategy: json.Camera.Settings.focusGestureStrategy,
                shouldPreferSmoothAutoFocus: json.Camera.Settings.shouldPreferSmoothAutoFocus,
                api: json.Camera.Settings.api,
            },
            defaultPosition: (json.Camera.defaultPosition || null),
            availablePositions: json.Camera.availablePositions,
        },
        DataCaptureView: {
            scanAreaMargins: MarginsWithUnit.fromJSON(JSON.parse(json.DataCaptureView.scanAreaMargins)),
            pointOfInterest: PointWithUnit.fromJSON(JSON.parse(json.DataCaptureView.pointOfInterest)),
            logoAnchor: json.DataCaptureView.logoAnchor,
            logoOffset: PointWithUnit.fromJSON(JSON.parse(json.DataCaptureView.logoOffset)),
            focusGesture: PrivateFocusGestureDeserializer.fromJSON(JSON.parse(json.DataCaptureView.focusGesture)),
            zoomGesture: PrivateZoomGestureDeserializer.fromJSON(JSON.parse(json.DataCaptureView.zoomGesture)),
            logoStyle: json.DataCaptureView.logoStyle,
        },
        LaserlineViewfinder: Object
            .keys(json.LaserlineViewfinder.styles)
            .reduce((acc, key) => {
            const viewfinder = json.LaserlineViewfinder.styles[key];
            acc.styles[key] = {
                width: NumberWithUnit.fromJSON(JSON.parse(viewfinder.width)),
                enabledColor: Color.fromJSON(viewfinder.enabledColor),
                disabledColor: Color.fromJSON(viewfinder.disabledColor),
                style: viewfinder.style,
            };
            return acc;
        }, { defaultStyle: json.LaserlineViewfinder.defaultStyle, styles: {} }),
        RectangularViewfinder: Object
            .keys(json.RectangularViewfinder.styles)
            .reduce((acc, key) => {
            const viewfinder = json.RectangularViewfinder.styles[key];
            acc.styles[key] = {
                size: SizeWithUnitAndAspect.fromJSON(JSON.parse(viewfinder.size)),
                color: Color.fromJSON(viewfinder.color),
                style: viewfinder.style,
                lineStyle: viewfinder.lineStyle,
                dimming: viewfinder.dimming,
                animation: RectangularViewfinderAnimation.fromJSON(JSON.parse(viewfinder.animation)),
            };
            return acc;
        }, { defaultStyle: json.RectangularViewfinder.defaultStyle, styles: {} }),
        AimerViewfinder: {
            frameColor: Color.fromJSON(json.AimerViewfinder.frameColor),
            dotColor: Color.fromJSON(json.AimerViewfinder.dotColor),
        },
        Brush: {
            fillColor: Color.fromJSON(json.Brush.fillColor),
            strokeColor: Color.fromJSON(json.Brush.strokeColor),
            strokeWidth: json.Brush.strokeWidth,
        },
        deviceID: json.deviceID,
    };
};
// tslint:disable-next-line:variable-name
const Defaults = defaultsFromJSON(JSON.parse(coreNative.defaults()));

;// CONCATENATED MODULE: ./src/ts/DataCaptureContext+Related.ts
class ContextStatus {
    static fromJSON(json) {
        const status = new ContextStatus();
        status._code = json.code;
        status._message = json.message;
        status._isValid = json.isValid;
        return status;
    }
    get message() {
        return this._message;
    }
    get code() {
        return this._code;
    }
    get isValid() {
        return this._isValid;
    }
}

;// CONCATENATED MODULE: ./src/ts/native/DataCaptureContextProxy.ts

const DataCaptureContextProxy_coreNative = __webpack_require__(362);
var DataCaptureContextListenerName;
(function (DataCaptureContextListenerName) {
    DataCaptureContextListenerName["didChangeStatus"] = "dataCaptureContextListener-didChangeStatus";
    DataCaptureContextListenerName["didStartObservingContext"] = "dataCaptureContextListener-didStartObservingContext";
})(DataCaptureContextListenerName || (DataCaptureContextListenerName = {}));
class DataCaptureContextProxy {
    constructor() {
        this.didChangeStatusListener = (body) => {
            const contextStatus = ContextStatus.fromJSON(JSON.parse(body.status));
            this.notifyListenersOfDidChangeStatus(contextStatus);
        };
        this.didStartObservingContextListener = () => {
            this.privateContext.listeners.forEach(listener => {
                if (listener.didStartObservingContext) {
                    listener.didStartObservingContext(this.context);
                }
            });
        };
    }
    get privateContext() {
        return this.context;
    }
    static forDataCaptureContext(context) {
        const contextProxy = new DataCaptureContextProxy();
        contextProxy.context = context;
        contextProxy.initialize();
        return contextProxy;
    }
    initialize() {
        this.subscribeListener();
        return this.initializeContextFromJSON();
    }
    updateContextFromJSON() {
        return DataCaptureContextProxy_coreNative.updateContextFromJson(JSON.stringify(this.context.toJSON()), (error) => {
            this.notifyListenersOfDeserializationError(error);
            return Promise.reject(error);
        });
    }
    dispose() {
        this.unsubscribeListener();
    }
    unsubscribeListener() {
        // tslint:disable:no-empty
        DataCaptureContextProxy_coreNative.removeEventListener(DataCaptureContextListenerName.didChangeStatus, this.didChangeStatusListener);
        DataCaptureContextProxy_coreNative.removeEventListener(DataCaptureContextListenerName.didStartObservingContext, this.didStartObservingContextListener);
        // tslint:enable:no-empty
    }
    initializeContextFromJSON() {
        return DataCaptureContextProxy_coreNative.createContextFromJson(JSON.stringify(this.context.toJSON()), (error) => {
            this.notifyListenersOfDeserializationError(error);
            return Promise.reject(error);
        });
    }
    subscribeListener() {
        // @ts-ignore
        DataCaptureContextProxy_coreNative.addEventListener(DataCaptureContextListenerName.didChangeStatus, this.didChangeStatusListener);
        DataCaptureContextProxy_coreNative.addEventListener(DataCaptureContextListenerName.didStartObservingContext, this.didStartObservingContextListener);
    }
    notifyListenersOfDeserializationError(error) {
        const contextStatus = ContextStatus.fromJSON({
            message: error,
            code: -1,
            isValid: true,
        });
        this.notifyListenersOfDidChangeStatus(contextStatus);
    }
    notifyListenersOfDidChangeStatus(contextStatus) {
        this.privateContext.listeners.forEach(listener => {
            if (listener.didChangeStatus) {
                listener.didChangeStatus(this.context, contextStatus);
            }
        });
    }
}

;// CONCATENATED MODULE: ./src/ts/DataCaptureContext.ts
var DataCaptureContext_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



class DataCaptureContextSettings extends DefaultSerializable {
    constructor() {
        super();
    }
    setProperty(name, value) {
        this[name] = value;
    }
    getProperty(name) {
        return this[name];
    }
}
class DataCaptureContext extends DefaultSerializable {
    constructor(licenseKey, deviceName) {
        super();
        this.licenseKey = licenseKey;
        this.deviceName = deviceName;
        this.framework = 'titanium';
        this.frameworkVersion = Titanium.version;
        this.settings = new DataCaptureContextSettings();
        this._frameSource = null;
        this.view = null;
        this.modes = [];
        this.components = [];
        this.listeners = [];
    }
    get frameSource() {
        return this._frameSource;
    }
    static get deviceID() {
        return Defaults.deviceID;
    }
    static forLicenseKey(licenseKey) {
        return DataCaptureContext.forLicenseKeyWithOptions(licenseKey, null);
    }
    static forLicenseKeyWithSettings(licenseKey, settings) {
        const context = this.forLicenseKey(licenseKey);
        if (settings !== null) {
            context.applySettings(settings);
        }
        return context;
    }
    static forLicenseKeyWithOptions(licenseKey, options) {
        if (options == null) {
            options = { deviceName: null };
        }
        return new DataCaptureContext(licenseKey, options.deviceName || '');
    }
    setFrameSource(frameSource) {
        if (this._frameSource) {
            this._frameSource.context = null;
        }
        this._frameSource = frameSource;
        if (frameSource) {
            frameSource.context = this;
        }
        return this.update();
    }
    addListener(listener) {
        if (this.listeners.includes(listener)) {
            return;
        }
        this.listeners.push(listener);
    }
    removeListener(listener) {
        if (!this.listeners.includes(listener)) {
            return;
        }
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    }
    addMode(mode) {
        if (!this.modes.includes(mode)) {
            this.modes.push(mode);
            mode._context = this;
            this.update();
        }
    }
    removeMode(mode) {
        if (this.modes.includes(mode)) {
            this.modes.splice(this.modes.indexOf(mode), 1);
            mode._context = null;
            this.update();
        }
    }
    removeAllModes() {
        this.modes.forEach(mode => {
            mode._context = null;
        });
        this.modes = [];
        this.update();
    }
    dispose() {
        var _a;
        if (!this.proxy) {
            return;
        }
        this.removeAllModes();
        (_a = this.view) === null || _a === void 0 ? void 0 : _a.dispose();
        this.proxy.dispose();
    }
    applySettings(settings) {
        this.settings = settings;
        return this.update();
    }
    // Called when the capture view is shown, that is the earliest point that we need the context deserialized.
    initialize() {
        if (this.proxy) {
            return;
        }
        this.proxy = DataCaptureContextProxy.forDataCaptureContext(this);
    }
    update() {
        if (!this.proxy) {
            return Promise.resolve();
        }
        return this.proxy.updateContextFromJSON();
    }
    addComponent(component) {
        if (this.components.includes(component)) {
            return Promise.resolve();
        }
        this.components.push(component);
        component._context = this;
        return this.update();
    }
}
DataCaptureContext_decorate([
    nameForSerialization('frameSource')
], DataCaptureContext.prototype, "_frameSource", void 0);
DataCaptureContext_decorate([
    ignoreFromSerialization
], DataCaptureContext.prototype, "proxy", void 0);
DataCaptureContext_decorate([
    ignoreFromSerialization
], DataCaptureContext.prototype, "listeners", void 0);

;// CONCATENATED MODULE: ./src/ts/native/DataCaptureViewProxy.ts

const DataCaptureViewProxy_coreNative = __webpack_require__(362);
var DataCaptureViewListenerName;
(function (DataCaptureViewListenerName) {
    DataCaptureViewListenerName["didChangeSize"] = "dataCaptureViewListener-didChangeSize";
})(DataCaptureViewListenerName || (DataCaptureViewListenerName = {}));
class DataCaptureViewProxy {
    constructor() {
        this.didChangeSizeListener = (body) => {
            const size = Size.fromJSON(body.size);
            const orientation = body.orientation;
            this.view.listeners.forEach(listener => {
                if (listener.didChangeSize) {
                    listener.didChangeSize(this.view.viewComponent, size, orientation);
                }
            });
        };
    }
    static forDataCaptureView(view) {
        const viewProxy = new DataCaptureViewProxy();
        viewProxy.view = view;
        viewProxy.subscribeListener();
        return viewProxy;
    }
    get captureViewProxy() {
        this.titaniumDataCaptureViewProxy = null;
        this.titaniumDataCaptureViewProxy = DataCaptureViewProxy_coreNative.createTitaniumDataCaptureView();
        return this.titaniumDataCaptureViewProxy;
    }
    viewPointForFramePoint(point) {
        return DataCaptureViewProxy_coreNative.viewPointForFramePoint(JSON.stringify(point.toJSON()))
            .then((jsonString) => Point.fromJSON(JSON.parse(jsonString)));
    }
    viewQuadrilateralForFrameQuadrilateral(quadrilateral) {
        return DataCaptureViewProxy_coreNative.viewQuadrilateralForFrameQuadrilateral(JSON.stringify(quadrilateral.toJSON()))
            .then((jsonString) => Quadrilateral.fromJSON(JSON.parse(jsonString)));
    }
    dispose() {
        this.unsubscribeListener();
    }
    subscribeListener() {
        // @ts-ignore
        DataCaptureViewProxy_coreNative.addEventListener(DataCaptureViewListenerName.didChangeSize, this.didChangeSizeListener);
    }
    unsubscribeListener() {
        // tslint:disable-next-line:no-empty
        DataCaptureViewProxy_coreNative.removeEventListener(DataCaptureViewListenerName.didChangeSize, this.didChangeSizeListener);
    }
}

;// CONCATENATED MODULE: ./src/ts/internal/PrivateDataCaptureView.ts
var PrivateDataCaptureView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class PrivateDataCaptureView extends DefaultSerializable {
    constructor() {
        super();
        this._context = null;
        this.controls = [];
        this.scanAreaMargins = Defaults.DataCaptureView.scanAreaMargins;
        this.pointOfInterest = Defaults.DataCaptureView.pointOfInterest;
        this.logoAnchor = Defaults.DataCaptureView.logoAnchor;
        this.logoOffset = Defaults.DataCaptureView.logoOffset;
        this.focusGesture = Defaults.DataCaptureView.focusGesture;
        this.zoomGesture = Defaults.DataCaptureView.zoomGesture;
        this.overlays = [];
        this.logoStyle = Defaults.DataCaptureView.logoStyle;
        this.listeners = [];
        this.proxy = DataCaptureViewProxy.forDataCaptureView(this);
    }
    get context() {
        return this._context;
    }
    set context(context) {
        if (!(context instanceof DataCaptureContext || context == null)) {
            // This should never happen, but let's just be sure
            throw new Error('The context for a capture view must be a DataCaptureContext');
        }
        this._context = context;
        if (this._context) {
            this._context.view = this;
            this._context.initialize();
        }
    }
    get privateContext() {
        return this.context;
    }
    static forContext(context) {
        const view = new PrivateDataCaptureView();
        view.context = context;
        return view;
    }
    controlUpdated() {
        this.privateContext.update();
    }
    get captureViewProxy() {
        return this.proxy.captureViewProxy;
    }
    addOverlay(overlay) {
        if (this.overlays.includes(overlay)) {
            return;
        }
        overlay.view = this;
        this.overlays.push(overlay);
        this.privateContext.update();
    }
    removeOverlay(overlay) {
        if (!this.overlays.includes(overlay)) {
            return;
        }
        overlay.view = null;
        this.overlays.splice(this.overlays.indexOf(overlay), 1);
        this.privateContext.update();
    }
    addListener(listener) {
        if (!this.listeners.includes(listener)) {
            this.listeners.push(listener);
        }
    }
    removeListener(listener) {
        if (this.listeners.includes(listener)) {
            this.listeners.splice(this.listeners.indexOf(listener), 1);
        }
    }
    viewPointForFramePoint(point) {
        return this.proxy.viewPointForFramePoint(point);
    }
    viewQuadrilateralForFrameQuadrilateral(quadrilateral) {
        return this.proxy.viewQuadrilateralForFrameQuadrilateral(quadrilateral);
    }
    addControl(control) {
        if (!this.controls.includes(control)) {
            this.controls.push(control);
            this.privateContext.update();
        }
    }
    removeControl(control) {
        if (this.controls.includes(control)) {
            this.controls.splice(this.overlays.indexOf(control), 1);
            this.privateContext.update();
        }
    }
    dispose() {
        this.overlays.forEach(overlay => this.removeOverlay(overlay));
        this.listeners.forEach(listener => this.removeListener(listener));
        this.proxy.dispose();
    }
}
PrivateDataCaptureView_decorate([
    ignoreFromSerialization
], PrivateDataCaptureView.prototype, "_context", void 0);
PrivateDataCaptureView_decorate([
    ignoreFromSerialization
], PrivateDataCaptureView.prototype, "viewComponent", void 0);
PrivateDataCaptureView_decorate([
    ignoreFromSerialization
], PrivateDataCaptureView.prototype, "proxy", void 0);
PrivateDataCaptureView_decorate([
    ignoreFromSerialization
], PrivateDataCaptureView.prototype, "listeners", void 0);

;// CONCATENATED MODULE: ./src/ts/DataCaptureView.ts
var DataCaptureView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class TorchSwitchControl extends DefaultSerializable {
    constructor() {
        super(...arguments);
        this.type = 'torch';
        this.icon = {
            on: { default: null, pressed: null },
            off: { default: null, pressed: null },
        };
    }
    get torchOffImage() {
        return this.icon.off.default;
    }
    set torchOffImage(torchOffImage) {
        this.icon.off.default = torchOffImage;
    }
    get torchOffPressedImage() {
        return this.icon.off.pressed;
    }
    set torchOffPressedImage(torchOffPressedImage) {
        this.icon.off.pressed = torchOffPressedImage;
    }
    get torchOnImage() {
        return this.icon.on.default;
    }
    set torchOnImage(torchOnImage) {
        this.icon.on.default = torchOnImage;
    }
    get torchOnPressedImage() {
        return this.icon.on.pressed;
    }
    set torchOnPressedImage(torchOnPressedImage) {
        this.icon.on.pressed = torchOnPressedImage;
    }
}
class ZoomSwitchControl extends DefaultSerializable {
    constructor() {
        super(...arguments);
        this.type = 'zoom';
        this.icon = {
            zoomedOut: { default: null, pressed: null },
            zoomedIn: { default: null, pressed: null },
        };
        this.view = null;
    }
    get zoomedOutImage() {
        return this.icon.zoomedOut.default;
    }
    set zoomedOutImage(zoomedOutImage) {
        this.icon.zoomedOut.default = zoomedOutImage;
        this.view.controlUpdated();
    }
    get zoomedInImage() {
        return this.icon.zoomedIn.default;
    }
    set zoomedInImage(zoomedInImage) {
        this.icon.zoomedIn.default = zoomedInImage;
        this.view.controlUpdated();
    }
    get zoomedInPressedImage() {
        return this.icon.zoomedIn.pressed;
    }
    set zoomedInPressedImage(zoomedInPressedImage) {
        this.icon.zoomedIn.pressed = zoomedInPressedImage;
        this.view.controlUpdated();
    }
    get zoomedOutPressedImage() {
        return this.icon.zoomedOut.pressed;
    }
    set zoomedOutPressedImage(zoomedOutPressedImage) {
        this.icon.zoomedOut.pressed = zoomedOutPressedImage;
        this.view.controlUpdated();
    }
}
DataCaptureView_decorate([
    ignoreFromSerialization
], ZoomSwitchControl.prototype, "view", void 0);
class DataCaptureView {
    constructor(context) {
        if (this.view) {
            this.view.dispose();
        }
        this.view = PrivateDataCaptureView.forContext(context);
        this.view.viewComponent = this;
    }
    get context() {
        return this.view.context;
    }
    set context(context) {
        this.view.context = context;
    }
    addToContainer(container) {
        return container.add(this.view.captureViewProxy);
    }
    get scanAreaMargins() {
        return this.view.scanAreaMargins;
    }
    ;
    set scanAreaMargins(newValue) {
        this.view.scanAreaMargins = newValue;
    }
    ;
    get pointOfInterest() {
        return this.view.pointOfInterest;
    }
    ;
    set pointOfInterest(newValue) {
        this.view.pointOfInterest = newValue;
    }
    ;
    get logoStyle() {
        return this.view.logoStyle;
    }
    set logoStyle(style) {
        this.view.logoStyle = style;
    }
    get logoAnchor() {
        return this.view.logoAnchor;
    }
    ;
    set logoAnchor(newValue) {
        this.view.logoAnchor = newValue;
    }
    ;
    get logoOffset() {
        return this.view.logoOffset;
    }
    ;
    set logoOffset(newValue) {
        this.view.logoOffset = newValue;
    }
    ;
    get focusGesture() {
        return this.view.focusGesture;
    }
    ;
    set focusGesture(newValue) {
        this.view.focusGesture = newValue;
    }
    ;
    get zoomGesture() {
        return this.view.zoomGesture;
    }
    ;
    set zoomGesture(newValue) {
        this.view.zoomGesture = newValue;
    }
    ;
    addOverlay(overlay) {
        this.view.addOverlay(overlay);
    }
    ;
    removeOverlay(overlay) {
        this.view.removeOverlay(overlay);
    }
    ;
    addListener(listener) {
        this.view.addListener(listener);
    }
    ;
    removeListener(listener) {
        this.view.removeListener(listener);
    }
    ;
    viewPointForFramePoint(point) {
        return this.view.viewPointForFramePoint(point);
    }
    ;
    viewQuadrilateralForFrameQuadrilateral(quadrilateral) {
        return this.view.viewQuadrilateralForFrameQuadrilateral(quadrilateral);
    }
    ;
    addControl(control) {
        this.view.addControl(control);
    }
    removeControl(control) {
        this.view.removeControl(control);
    }
}

;// CONCATENATED MODULE: ./src/ts/DataCaptureVersion.ts
const DataCaptureVersion_coreNative = __webpack_require__(362);
class DataCaptureVersion {
    static get pluginVersion() {
        return '6.11.0-beta.1';
    }
    static get sdkVersion() {
        return DataCaptureVersion_coreNative.dataCaptureVersion;
    }
}

;// CONCATENATED MODULE: ./src/ts/FrameSource.ts
var FrameSourceState;
(function (FrameSourceState) {
    FrameSourceState["On"] = "on";
    FrameSourceState["Off"] = "off";
    FrameSourceState["Starting"] = "starting";
    FrameSourceState["Stopping"] = "stopping";
    FrameSourceState["Standby"] = "standby";
    FrameSourceState["BootingUp"] = "bootingUp";
    FrameSourceState["WakingUp"] = "wakingUp";
    FrameSourceState["GoingToSleep"] = "goingToSleep";
    FrameSourceState["ShuttingDown"] = "shuttingDown";
})(FrameSourceState || (FrameSourceState = {}));

;// CONCATENATED MODULE: ./src/ts/native/FeedbackProxy.ts
const FeedbackProxy_coreNative = __webpack_require__(362);
class FeedbackProxy {
    static forFeedback(feedback) {
        const proxy = new FeedbackProxy();
        proxy.feedback = feedback;
        return proxy;
    }
    emit() {
        FeedbackProxy_coreNative.emitFeedback(JSON.stringify(this.feedback.toJSON()), (error) => Ti.API.info(`An error occurred when emitting feedback: ${error}`));
    }
}

;// CONCATENATED MODULE: ./src/ts/Feedback.ts
var Feedback_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var VibrationType;
(function (VibrationType) {
    VibrationType["default"] = "default";
    VibrationType["selectionHaptic"] = "selectionHaptic";
    VibrationType["successHaptic"] = "successHaptic";
})(VibrationType || (VibrationType = {}));
class Vibration extends DefaultSerializable {
    constructor(type) {
        super();
        this.type = type;
    }
    static get defaultVibration() {
        return new Vibration(VibrationType.default);
    }
    static get selectionHapticFeedback() {
        return new Vibration(VibrationType.selectionHaptic);
    }
    static get successHapticFeedback() {
        return new Vibration(VibrationType.successHaptic);
    }
}
class Sound extends DefaultSerializable {
    constructor(resource) {
        super();
        this.resource = null;
        this.resource = resource;
    }
    static get defaultSound() {
        return new Sound(null);
    }
}
Feedback_decorate([
    ignoreFromSerializationIfNull
], Sound.prototype, "resource", void 0);
class Feedback extends DefaultSerializable {
    constructor(vibration, sound) {
        super();
        this._vibration = null;
        this._sound = null;
        this._vibration = vibration;
        this._sound = sound;
        this.proxy = FeedbackProxy.forFeedback(this);
    }
    static get defaultFeedback() {
        return new Feedback(Vibration.defaultVibration, Sound.defaultSound);
    }
    get vibration() {
        return this._vibration;
    }
    get sound() {
        return this._sound;
    }
    emit() {
        this.proxy.emit();
    }
}
Feedback_decorate([
    ignoreFromSerializationIfNull,
    nameForSerialization('vibration')
], Feedback.prototype, "_vibration", void 0);
Feedback_decorate([
    ignoreFromSerializationIfNull,
    nameForSerialization('sound')
], Feedback.prototype, "_sound", void 0);
Feedback_decorate([
    ignoreFromSerialization
], Feedback.prototype, "proxy", void 0);

;// CONCATENATED MODULE: ./src/ts/LocationSelection.ts
var LocationSelection_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// tslint:disable-next-line:variable-name
const NoneLocationSelection = { type: 'none' };
class RadiusLocationSelection extends DefaultSerializable {
    constructor(radius) {
        super();
        this.type = 'radius';
        this._radius = radius;
    }
    get radius() {
        return this._radius;
    }
}
LocationSelection_decorate([
    nameForSerialization('radius')
], RadiusLocationSelection.prototype, "_radius", void 0);
class RectangularLocationSelection extends DefaultSerializable {
    constructor() {
        super(...arguments);
        this.type = 'rectangular';
    }
    get sizeWithUnitAndAspect() {
        return this._sizeWithUnitAndAspect;
    }
    static withSize(size) {
        const locationSelection = new RectangularLocationSelection();
        locationSelection._sizeWithUnitAndAspect = SizeWithUnitAndAspect.sizeWithWidthAndHeight(size);
        return locationSelection;
    }
    static withWidthAndAspectRatio(width, heightToWidthAspectRatio) {
        const locationSelection = new RectangularLocationSelection();
        locationSelection._sizeWithUnitAndAspect = SizeWithUnitAndAspect.sizeWithWidthAndAspectRatio(width, heightToWidthAspectRatio);
        return locationSelection;
    }
    static withHeightAndAspectRatio(height, widthToHeightAspectRatio) {
        const locationSelection = new RectangularLocationSelection();
        locationSelection._sizeWithUnitAndAspect = SizeWithUnitAndAspect.sizeWithHeightAndAspectRatio(height, widthToHeightAspectRatio);
        return locationSelection;
    }
}
LocationSelection_decorate([
    nameForSerialization('size')
], RectangularLocationSelection.prototype, "_sizeWithUnitAndAspect", void 0);

;// CONCATENATED MODULE: ./src/ts/Camera+Related.ts


var TorchState;
(function (TorchState) {
    TorchState["On"] = "on";
    TorchState["Off"] = "off";
    TorchState["Auto"] = "auto";
})(TorchState || (TorchState = {}));
var CameraPosition;
(function (CameraPosition) {
    CameraPosition["WorldFacing"] = "worldFacing";
    CameraPosition["UserFacing"] = "userFacing";
    CameraPosition["Unspecified"] = "unspecified";
})(CameraPosition || (CameraPosition = {}));
var VideoResolution;
(function (VideoResolution) {
    VideoResolution["Auto"] = "auto";
    VideoResolution["HD"] = "hd";
    VideoResolution["FullHD"] = "fullHd";
    VideoResolution["UHD4K"] = "uhd4k";
})(VideoResolution || (VideoResolution = {}));
var FocusRange;
(function (FocusRange) {
    FocusRange["Full"] = "full";
    FocusRange["Near"] = "near";
    FocusRange["Far"] = "far";
})(FocusRange || (FocusRange = {}));
var FocusGestureStrategy;
(function (FocusGestureStrategy) {
    FocusGestureStrategy["None"] = "none";
    FocusGestureStrategy["Manual"] = "manual";
    FocusGestureStrategy["ManualUntilCapture"] = "manualUntilCapture";
    FocusGestureStrategy["AutoOnLocation"] = "autoOnLocation";
})(FocusGestureStrategy || (FocusGestureStrategy = {}));
var PrivateCameraProperty;
(function (PrivateCameraProperty) {
    PrivateCameraProperty["CameraAPI"] = "api";
})(PrivateCameraProperty || (PrivateCameraProperty = {}));
class CameraSettings extends DefaultSerializable {
    constructor(settings) {
        super();
        this.preferredResolution = Defaults.Camera.Settings.preferredResolution;
        this.zoomFactor = Defaults.Camera.Settings.zoomFactor;
        this.zoomGestureZoomFactor = Defaults.Camera.Settings.zoomGestureZoomFactor;
        this.api = 0;
        this.focus = {
            range: Defaults.Camera.Settings.focusRange,
            focusGestureStrategy: Defaults.Camera.Settings.focusGestureStrategy,
            shouldPreferSmoothAutoFocus: Defaults.Camera.Settings.shouldPreferSmoothAutoFocus,
        };
        if (settings !== undefined && settings !== null) {
            Object.getOwnPropertyNames(settings).forEach(propertyName => {
                this[propertyName] = settings[propertyName];
            });
        }
    }
    get focusRange() {
        return this.focus.range;
    }
    set focusRange(newRange) {
        this.focus.range = newRange;
    }
    get focusGestureStrategy() {
        return this.focus.focusGestureStrategy;
    }
    set focusGestureStrategy(newStrategy) {
        this.focus.focusGestureStrategy = newStrategy;
    }
    get shouldPreferSmoothAutoFocus() {
        return this.focus.shouldPreferSmoothAutoFocus;
    }
    set shouldPreferSmoothAutoFocus(newShouldPreferSmoothAutoFocus) {
        this.focus.shouldPreferSmoothAutoFocus = newShouldPreferSmoothAutoFocus;
    }
    static fromJSON(json) {
        const settings = new CameraSettings();
        settings.preferredResolution = json.preferredResolution;
        settings.zoomFactor = json.zoomFactor;
        settings.focusRange = json.focusRange;
        settings.zoomGestureZoomFactor = json.zoomGestureZoomFactor;
        settings.focusGestureStrategy = json.focusGestureStrategy;
        settings.shouldPreferSmoothAutoFocus = json.shouldPreferSmoothAutoFocus;
        if (json.api !== undefined && json.api !== null) {
            settings.api = json.api;
        }
        return settings;
    }
    setProperty(name, value) {
        this[name] = value;
    }
    getProperty(name) {
        return this[name];
    }
}

;// CONCATENATED MODULE: ./src/ts/native/CameraProxy.ts
const CameraProxy_coreNative = __webpack_require__(362);
var FrameSourceListenerName;
(function (FrameSourceListenerName) {
    FrameSourceListenerName["didChangeState"] = "frameSourceListener-didChangeState";
})(FrameSourceListenerName || (FrameSourceListenerName = {}));
class CameraProxy {
    constructor() {
        this.didChangeStateListener = (body) => {
            const newState = body.state;
            this.camera.listeners.forEach(listener => {
                if (listener.didChangeState) {
                    listener.didChangeState(this.camera, newState);
                }
            });
        };
    }
    static forCamera(camera) {
        const proxy = new CameraProxy();
        proxy.camera = camera;
        return proxy;
    }
    getCurrentState() {
        return CameraProxy_coreNative.getCurrentCameraState(this.camera.position, (error) => Promise.reject(error));
    }
    getIsTorchAvailable() {
        return CameraProxy_coreNative.isTorchAvailable(this.camera.position, (error) => Promise.reject(error));
    }
    dispose() {
        this.unsubscribeListener();
    }
    subscribeListener() {
        // @ts-ignore
        CameraProxy_coreNative.addEventListener(FrameSourceListenerName.didChangeState, this.didChangeStateListener);
    }
    unsubscribeListener() {
        // tslint:disable-next-line:no-empty
        CameraProxy_coreNative.removeEventListener(FrameSourceListenerName.didChangeState, this.didChangeStateListener);
    }
}

;// CONCATENATED MODULE: ./src/ts/Camera.ts
var Camera_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class Camera extends DefaultSerializable {
    constructor() {
        super();
        this.type = 'camera';
        this.settings = null;
        this._desiredTorchState = TorchState.Off;
        this._desiredState = FrameSourceState.Off;
        this.listeners = [];
        this._context = null;
        this.proxy = CameraProxy.forCamera(this);
    }
    set context(newContext) {
        if (newContext == null) {
            this.proxy.unsubscribeListener();
        }
        else if (this._context == null) {
            this.proxy.subscribeListener();
        }
        this._context = newContext;
    }
    get context() {
        return this._context;
    }
    static get default() {
        if (Defaults.Camera.defaultPosition) {
            const camera = new Camera();
            camera.position = Defaults.Camera.defaultPosition;
            return camera;
        }
        else {
            return null;
        }
    }
    static atPosition(cameraPosition) {
        if (Defaults.Camera.availablePositions.includes(cameraPosition)) {
            const camera = new Camera();
            camera.position = cameraPosition;
            return camera;
        }
        else {
            return null;
        }
    }
    get desiredState() {
        return this._desiredState;
    }
    set desiredTorchState(desiredTorchState) {
        this._desiredTorchState = desiredTorchState;
        this.didChange();
    }
    get desiredTorchState() {
        return this._desiredTorchState;
    }
    switchToDesiredState(state) {
        this._desiredState = state;
        return this.didChange();
    }
    getCurrentState() {
        return this.proxy.getCurrentState();
    }
    getIsTorchAvailable() {
        return this.proxy.getIsTorchAvailable();
    }
    addListener(listener) {
        if (listener == null) {
            return;
        }
        if (this.listeners.includes(listener)) {
            return;
        }
        this.listeners.push(listener);
    }
    removeListener(listener) {
        if (listener == null) {
            return;
        }
        if (!this.listeners.includes(listener)) {
            return;
        }
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    }
    applySettings(settings) {
        this.settings = settings;
        return this.didChange();
    }
    didChange() {
        if (this.context) {
            return this.context.update();
        }
        else {
            return Promise.resolve();
        }
    }
}
Camera_decorate([
    serializationDefault({})
], Camera.prototype, "settings", void 0);
Camera_decorate([
    nameForSerialization('desiredTorchState')
], Camera.prototype, "_desiredTorchState", void 0);
Camera_decorate([
    nameForSerialization('desiredState')
], Camera.prototype, "_desiredState", void 0);
Camera_decorate([
    ignoreFromSerialization
], Camera.prototype, "listeners", void 0);
Camera_decorate([
    ignoreFromSerialization
], Camera.prototype, "_context", void 0);
Camera_decorate([
    ignoreFromSerialization
], Camera.prototype, "proxy", void 0);

;// CONCATENATED MODULE: ./src/ts/Viewfinder.ts
var Viewfinder_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// tslint:disable-next-line:variable-name
const NoViewfinder = { type: 'none' };
class LaserlineViewfinder extends DefaultSerializable {
    constructor(style) {
        super();
        this.type = 'laserline';
        const viewfinderStyle = style || Defaults.LaserlineViewfinder.defaultStyle;
        this._style = Defaults.LaserlineViewfinder.styles[viewfinderStyle].style;
        this.width = Defaults.LaserlineViewfinder.styles[viewfinderStyle].width;
        this.enabledColor = Defaults.LaserlineViewfinder.styles[viewfinderStyle].enabledColor;
        this.disabledColor = Defaults.LaserlineViewfinder.styles[viewfinderStyle].disabledColor;
    }
    get style() {
        return this._style;
    }
}
Viewfinder_decorate([
    nameForSerialization('style')
], LaserlineViewfinder.prototype, "_style", void 0);
class RectangularViewfinder extends DefaultSerializable {
    constructor(style, lineStyle) {
        super();
        this.type = 'rectangular';
        const viewfinderStyle = style || Defaults.RectangularViewfinder.defaultStyle;
        this._style = Defaults.RectangularViewfinder.styles[viewfinderStyle].style;
        this._lineStyle = Defaults.RectangularViewfinder.styles[viewfinderStyle].lineStyle;
        this._dimming = Defaults.RectangularViewfinder.styles[viewfinderStyle].dimming;
        this._animation = Defaults.RectangularViewfinder.styles[viewfinderStyle].animation;
        this.color = Defaults.RectangularViewfinder.styles[viewfinderStyle].color;
        this._sizeWithUnitAndAspect = Defaults.RectangularViewfinder.styles[viewfinderStyle].size;
        if (lineStyle !== undefined) {
            this._lineStyle = lineStyle;
        }
    }
    get sizeWithUnitAndAspect() {
        return this._sizeWithUnitAndAspect;
    }
    get style() {
        return this._style;
    }
    get lineStyle() {
        return this._lineStyle;
    }
    get dimming() {
        return this._dimming;
    }
    set dimming(value) {
        this._dimming = value;
    }
    get animation() {
        return this._animation;
    }
    set animation(animation) {
        this._animation = animation;
    }
    setSize(size) {
        this._sizeWithUnitAndAspect = SizeWithUnitAndAspect.sizeWithWidthAndHeight(size);
    }
    setWidthAndAspectRatio(width, heightToWidthAspectRatio) {
        this._sizeWithUnitAndAspect = SizeWithUnitAndAspect.sizeWithWidthAndAspectRatio(width, heightToWidthAspectRatio);
    }
    setHeightAndAspectRatio(height, widthToHeightAspectRatio) {
        this._sizeWithUnitAndAspect = SizeWithUnitAndAspect.sizeWithHeightAndAspectRatio(height, widthToHeightAspectRatio);
    }
    setShorterDimensionAndAspectRatio(fraction, aspectRatio) {
        this._sizeWithUnitAndAspect = SizeWithUnitAndAspect.sizeWithShorterDimensionAndAspectRatio(new NumberWithUnit(fraction, MeasureUnit.Fraction), aspectRatio);
    }
}
Viewfinder_decorate([
    nameForSerialization('style')
], RectangularViewfinder.prototype, "_style", void 0);
Viewfinder_decorate([
    nameForSerialization('lineStyle')
], RectangularViewfinder.prototype, "_lineStyle", void 0);
Viewfinder_decorate([
    nameForSerialization('dimming')
], RectangularViewfinder.prototype, "_dimming", void 0);
Viewfinder_decorate([
    nameForSerialization('animation')
], RectangularViewfinder.prototype, "_animation", void 0);
Viewfinder_decorate([
    nameForSerialization('size')
], RectangularViewfinder.prototype, "_sizeWithUnitAndAspect", void 0);
class AimerViewfinder extends DefaultSerializable {
    constructor() {
        super();
        this.type = 'aimer';
        this.frameColor = Defaults.AimerViewfinder.frameColor;
        this.dotColor = Defaults.AimerViewfinder.dotColor;
    }
}

;// CONCATENATED MODULE: ./src/index.ts













// Core API
exports.DataCaptureView = DataCaptureView;
exports.Camera = Camera;
exports.CameraPosition = CameraPosition;
exports.CameraSettings = CameraSettings;
exports.FocusRange = FocusRange;
exports.TorchState = TorchState;
exports.VideoResolution = VideoResolution;
exports.FocusGestureStrategy = FocusGestureStrategy;
exports.DataCaptureVersion = DataCaptureVersion;
exports.FrameSourceState = FrameSourceState;
exports.DataCaptureContext = DataCaptureContext;
exports.Feedback = Feedback;
exports.Sound = Sound;
exports.Vibration = Vibration;
exports.RectangularLocationSelection = RectangularLocationSelection;
exports.RadiusLocationSelection = RadiusLocationSelection;
exports.NoneLocationSelection = NoneLocationSelection;
exports.LaserlineViewfinder = LaserlineViewfinder;
exports.NoViewfinder = NoViewfinder;
exports.RectangularViewfinder = RectangularViewfinder;
exports.AimerViewfinder = AimerViewfinder;
exports.Color = Color;
exports.MarginsWithUnit = MarginsWithUnit;
exports.NumberWithUnit = NumberWithUnit;
exports.Point = Point;
exports.PointWithUnit = PointWithUnit;
exports.Quadrilateral = Quadrilateral;
exports.Rect = Rect;
exports.RectWithUnit = RectWithUnit;
exports.Size = Size;
exports.Brush = Brush;
exports.SizeWithAspect = SizeWithAspect;
exports.SizeWithUnit = SizeWithUnit;
exports.SizeWithUnitAndAspect = SizeWithUnitAndAspect;
exports.Anchor = Anchor;
exports.Direction = Direction;
exports.MeasureUnit = MeasureUnit;
exports.Orientation = Orientation;
exports.SizingMode = SizingMode;
exports.TorchSwitchControl = TorchSwitchControl;
exports.ZoomSwitchControl = ZoomSwitchControl;
exports.LaserlineViewfinderStyle = LaserlineViewfinderStyle;
exports.RectangularViewfinderAnimation = RectangularViewfinderAnimation;
exports.RectangularViewfinderLineStyle = RectangularViewfinderLineStyle;
exports.RectangularViewfinderStyle = RectangularViewfinderStyle;
exports.TapToFocus = TapToFocus;
exports.SwipeToZoom = SwipeToZoom;

})();

/******/ })()
;
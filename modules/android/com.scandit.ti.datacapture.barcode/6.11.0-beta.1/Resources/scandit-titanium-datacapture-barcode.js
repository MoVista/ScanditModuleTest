/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 187:
/***/ ((module) => {

module.exports = require("com.scandit.ti.datacapture.barcode");

/***/ }),

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

;// CONCATENATED MODULE: ./src/ts/Symbology.ts
var Symbology;
(function (Symbology) {
    Symbology["EAN13UPCA"] = "ean13Upca";
    Symbology["UPCE"] = "upce";
    Symbology["EAN8"] = "ean8";
    Symbology["Code39"] = "code39";
    Symbology["Code93"] = "code93";
    Symbology["Code128"] = "code128";
    Symbology["Code11"] = "code11";
    Symbology["Code25"] = "code25";
    Symbology["Codabar"] = "codabar";
    Symbology["InterleavedTwoOfFive"] = "interleavedTwoOfFive";
    Symbology["MSIPlessey"] = "msiPlessey";
    Symbology["QR"] = "qr";
    Symbology["DataMatrix"] = "dataMatrix";
    Symbology["Aztec"] = "aztec";
    Symbology["MaxiCode"] = "maxicode";
    Symbology["DotCode"] = "dotcode";
    Symbology["KIX"] = "kix";
    Symbology["RM4SCC"] = "rm4scc";
    Symbology["GS1Databar"] = "databar";
    Symbology["GS1DatabarExpanded"] = "databarExpanded";
    Symbology["GS1DatabarLimited"] = "databarLimited";
    Symbology["PDF417"] = "pdf417";
    Symbology["MicroPDF417"] = "microPdf417";
    Symbology["MicroQR"] = "microQr";
    Symbology["Code32"] = "code32";
    Symbology["Lapa4SC"] = "lapa4sc";
    Symbology["IATATwoOfFive"] = "iata2of5";
    Symbology["MatrixTwoOfFive"] = "matrix2of5";
    Symbology["USPSIntelligentMail"] = "uspsIntelligentMail";
})(Symbology || (Symbology = {}));

;// CONCATENATED MODULE: ../scandit-titanium-datacapture-core/src/ts/internal/Serializable.ts
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
class Serializable_DefaultSerializable {
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

;// CONCATENATED MODULE: ./src/ts/Symbology+Related.ts
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

class SymbologyDescription {
    constructor(symbology) {
        if (!symbology) {
            return;
        }
        return SymbologyDescription.all[SymbologyDescription.all
            .findIndex(description => description.identifier === symbology)];
    }
    static get all() {
        return this.defaults().SymbologyDescriptions;
    }
    get identifier() {
        return this._identifier;
    }
    get symbology() {
        return this.identifier;
    }
    get readableName() {
        return this._readableName;
    }
    get isAvailable() {
        return this._isAvailable;
    }
    get isColorInvertible() {
        return this._isColorInvertible;
    }
    get activeSymbolCountRange() {
        return this._activeSymbolCountRange;
    }
    get defaultSymbolCountRange() {
        return this._defaultSymbolCountRange;
    }
    get supportedExtensions() {
        return this._supportedExtensions;
    }
    static fromJSON(json) {
        const symbologyDescription = new SymbologyDescription();
        symbologyDescription._identifier = json.identifier;
        symbologyDescription._readableName = json.readableName;
        symbologyDescription._isAvailable = json.isAvailable;
        symbologyDescription._isColorInvertible = json.isColorInvertible;
        symbologyDescription._activeSymbolCountRange = Range.fromJSON(json.activeSymbolCountRange);
        symbologyDescription._defaultSymbolCountRange = Range.fromJSON(json.defaultSymbolCountRange);
        symbologyDescription._supportedExtensions = json.supportedExtensions;
        return symbologyDescription;
    }
    static forIdentifier(identifier) {
        const identifierIndex = SymbologyDescription.all
            .findIndex(description => description.identifier === identifier);
        if (identifierIndex === -1) {
            return null;
        }
        return new SymbologyDescription(identifier);
    }
}
class SymbologySettings extends Serializable_DefaultSerializable {
    get symbology() {
        return this._symbology;
    }
    get enabledExtensions() {
        return this.extensions;
    }
    static fromJSON(json) {
        const symbologySettings = new SymbologySettings();
        symbologySettings.extensions = json.extensions;
        symbologySettings.isEnabled = json.enabled;
        symbologySettings.isColorInvertedEnabled = json.colorInvertedEnabled;
        symbologySettings.checksums = json.checksums;
        symbologySettings.activeSymbolCounts = json.activeSymbolCounts;
        return symbologySettings;
    }
    setExtensionEnabled(extension, enabled) {
        const included = this.extensions.includes(extension);
        if (enabled && !included) {
            this.extensions.push(extension);
        }
        else if (!enabled && included) {
            this.extensions.splice(this.extensions.indexOf(extension), 1);
        }
    }
}
__decorate([
    ignoreFromSerialization
], SymbologySettings.prototype, "_symbology", void 0);
__decorate([
    nameForSerialization('enabled')
], SymbologySettings.prototype, "isEnabled", void 0);
__decorate([
    nameForSerialization('colorInvertedEnabled')
], SymbologySettings.prototype, "isColorInvertedEnabled", void 0);
var CompositeType;
(function (CompositeType) {
    CompositeType["A"] = "A";
    CompositeType["B"] = "B";
    CompositeType["C"] = "C";
})(CompositeType || (CompositeType = {}));
var Checksum;
(function (Checksum) {
    Checksum["Mod10"] = "mod10";
    Checksum["Mod11"] = "mod11";
    Checksum["Mod16"] = "mod16";
    Checksum["Mod43"] = "mod43";
    Checksum["Mod47"] = "mod47";
    Checksum["Mod103"] = "mod103";
    Checksum["Mod10AndMod11"] = "mod1110";
    Checksum["Mod10AndMod10"] = "mod1010";
})(Checksum || (Checksum = {}));
class EncodingRange {
    get ianaName() {
        return this._ianaName;
    }
    get startIndex() {
        return this._startIndex;
    }
    get endIndex() {
        return this._endIndex;
    }
    static fromJSON(json) {
        const encodingRange = new EncodingRange();
        encodingRange._ianaName = json.ianaName;
        encodingRange._startIndex = json.startIndex;
        encodingRange._endIndex = json.endIndex;
        return encodingRange;
    }
}
var CompositeFlag;
(function (CompositeFlag) {
    CompositeFlag["None"] = "none";
    CompositeFlag["Unknown"] = "unknown";
    CompositeFlag["Linked"] = "linked";
    CompositeFlag["GS1TypeA"] = "gs1TypeA";
    CompositeFlag["GS1TypeB"] = "gs1TypeB";
    CompositeFlag["GS1TypeC"] = "gs1TypeC";
})(CompositeFlag || (CompositeFlag = {}));
class Range {
    get minimum() {
        return this._minimum;
    }
    get maximum() {
        return this._maximum;
    }
    get step() {
        return this._step;
    }
    get isFixed() {
        return this.minimum === this.maximum || this.step <= 0;
    }
    static fromJSON(json) {
        const range = new Range();
        range._minimum = json.minimum;
        range._maximum = json.maximum;
        range._step = json.step;
        return range;
    }
}
__decorate([
    nameForSerialization('minimum')
], Range.prototype, "_minimum", void 0);
__decorate([
    nameForSerialization('maximum')
], Range.prototype, "_maximum", void 0);
__decorate([
    nameForSerialization('step')
], Range.prototype, "_step", void 0);

;// CONCATENATED MODULE: ../scandit-titanium-datacapture-core/src/ts/CommonEnums.ts
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

;// CONCATENATED MODULE: ../scandit-titanium-datacapture-core/src/ts/Common.ts
var Common_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class Point extends Serializable_DefaultSerializable {
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
Common_decorate([
    nameForSerialization('x')
], Point.prototype, "_x", void 0);
Common_decorate([
    nameForSerialization('y')
], Point.prototype, "_y", void 0);
class Quadrilateral extends Serializable_DefaultSerializable {
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
Common_decorate([
    nameForSerialization('topLeft')
], Quadrilateral.prototype, "_topLeft", void 0);
Common_decorate([
    nameForSerialization('topRight')
], Quadrilateral.prototype, "_topRight", void 0);
Common_decorate([
    nameForSerialization('bottomRight')
], Quadrilateral.prototype, "_bottomRight", void 0);
Common_decorate([
    nameForSerialization('bottomLeft')
], Quadrilateral.prototype, "_bottomLeft", void 0);
class NumberWithUnit extends Serializable_DefaultSerializable {
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
Common_decorate([
    nameForSerialization('value')
], NumberWithUnit.prototype, "_value", void 0);
Common_decorate([
    nameForSerialization('unit')
], NumberWithUnit.prototype, "_unit", void 0);
class PointWithUnit extends Serializable_DefaultSerializable {
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
Common_decorate([
    nameForSerialization('x')
], PointWithUnit.prototype, "_x", void 0);
Common_decorate([
    nameForSerialization('y')
], PointWithUnit.prototype, "_y", void 0);
class Rect extends Serializable_DefaultSerializable {
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
Common_decorate([
    nameForSerialization('origin')
], Rect.prototype, "_origin", void 0);
Common_decorate([
    nameForSerialization('size')
], Rect.prototype, "_size", void 0);
class RectWithUnit extends Serializable_DefaultSerializable {
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
Common_decorate([
    nameForSerialization('origin')
], RectWithUnit.prototype, "_origin", void 0);
Common_decorate([
    nameForSerialization('size')
], RectWithUnit.prototype, "_size", void 0);
class SizeWithUnit extends Serializable_DefaultSerializable {
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
Common_decorate([
    nameForSerialization('width')
], SizeWithUnit.prototype, "_width", void 0);
Common_decorate([
    nameForSerialization('height')
], SizeWithUnit.prototype, "_height", void 0);
class Size extends Serializable_DefaultSerializable {
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
Common_decorate([
    nameForSerialization('width')
], Size.prototype, "_width", void 0);
Common_decorate([
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
Common_decorate([
    nameForSerialization('size')
], SizeWithAspect.prototype, "_size", void 0);
Common_decorate([
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
Common_decorate([
    nameForSerialization('widthAndHeight')
], SizeWithUnitAndAspect.prototype, "_widthAndHeight", void 0);
Common_decorate([
    nameForSerialization('widthAndAspectRatio')
], SizeWithUnitAndAspect.prototype, "_widthAndAspectRatio", void 0);
Common_decorate([
    nameForSerialization('heightAndAspectRatio')
], SizeWithUnitAndAspect.prototype, "_heightAndAspectRatio", void 0);
Common_decorate([
    nameForSerialization('shorterDimensionAndAspectRatio')
], SizeWithUnitAndAspect.prototype, "_shorterDimensionAndAspectRatio", void 0);
class MarginsWithUnit extends Serializable_DefaultSerializable {
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
Common_decorate([
    nameForSerialization('left')
], MarginsWithUnit.prototype, "_left", void 0);
Common_decorate([
    nameForSerialization('right')
], MarginsWithUnit.prototype, "_right", void 0);
Common_decorate([
    nameForSerialization('top')
], MarginsWithUnit.prototype, "_top", void 0);
Common_decorate([
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
class Brush extends Serializable_DefaultSerializable {
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

;// CONCATENATED MODULE: ./src/ts/Barcode.ts


class Barcode {
    get symbology() {
        return this._symbology;
    }
    get data() {
        return this._data;
    }
    get rawData() {
        return this._rawData;
    }
    get compositeData() {
        return this._compositeData;
    }
    get compositeRawData() {
        return this._compositeRawData;
    }
    get addOnData() {
        return this._addOnData;
    }
    get encodingRanges() {
        return this._encodingRanges;
    }
    get location() {
        return this._location;
    }
    get isGS1DataCarrier() {
        return this._isGS1DataCarrier;
    }
    get compositeFlag() {
        return this._compositeFlag;
    }
    get isColorInverted() {
        return this._isColorInverted;
    }
    get symbolCount() {
        return this._symbolCount;
    }
    get frameID() {
        return this._frameID;
    }
    static fromJSON(json) {
        const barcode = new Barcode();
        barcode._symbology = json.symbology;
        barcode._data = json.data;
        barcode._rawData = json.rawData;
        barcode._compositeData = json.compositeData;
        barcode._compositeRawData = json.compositeRawData;
        barcode._addOnData = json.addOnData === undefined ? null : json.addOnData;
        barcode._isGS1DataCarrier = json.isGS1DataCarrier;
        barcode._compositeFlag = json.compositeFlag;
        barcode._isColorInverted = json.isColorInverted;
        barcode._symbolCount = json.symbolCount;
        barcode._frameID = json.frameId;
        barcode._encodingRanges = json.encodingRanges.map(EncodingRange.fromJSON);
        barcode._location = Quadrilateral.fromJSON(json.location);
        return barcode;
    }
}
class LocalizedOnlyBarcode {
    get location() {
        return this._location;
    }
    get frameID() {
        return this._frameID;
    }
    static fromJSON(json) {
        const localizedBarcode = new LocalizedOnlyBarcode();
        localizedBarcode._location = Quadrilateral.fromJSON(json.location);
        localizedBarcode._frameID = json.frameId;
        return localizedBarcode;
    }
}

;// CONCATENATED MODULE: ../scandit-titanium-datacapture-core/src/ts/native/FeedbackProxy.ts
const coreNative = __webpack_require__(362);
class FeedbackProxy {
    static forFeedback(feedback) {
        const proxy = new FeedbackProxy();
        proxy.feedback = feedback;
        return proxy;
    }
    emit() {
        coreNative.emitFeedback(JSON.stringify(this.feedback.toJSON()), (error) => Ti.API.info(`An error occurred when emitting feedback: ${error}`));
    }
}

;// CONCATENATED MODULE: ../scandit-titanium-datacapture-core/src/ts/Feedback.ts
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
class Vibration extends Serializable_DefaultSerializable {
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
class Sound extends Serializable_DefaultSerializable {
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
class Feedback extends Serializable_DefaultSerializable {
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

;// CONCATENATED MODULE: ./src/ts/BarcodeCaptureFeedback.ts


class BarcodeCaptureFeedback extends Serializable_DefaultSerializable {
    constructor() {
        super(...arguments);
        this.success = Feedback.defaultFeedback;
    }
    static get default() {
        return new BarcodeCaptureFeedback();
    }
}

;// CONCATENATED MODULE: ./src/ts/BarcodeCaptureSession.ts

class BarcodeCaptureSession {
    get newlyRecognizedBarcodes() {
        return this._newlyRecognizedBarcodes;
    }
    get newlyLocalizedBarcodes() {
        return this._newlyLocalizedBarcodes;
    }
    get frameSequenceID() {
        return this._frameSequenceID;
    }
    static fromJSON(json) {
        const session = new BarcodeCaptureSession();
        session._newlyRecognizedBarcodes = json.newlyRecognizedBarcodes
            .map(Barcode.fromJSON);
        session._newlyLocalizedBarcodes = json.newlyLocalizedBarcodes
            .map(LocalizedOnlyBarcode.fromJSON);
        session._frameSequenceID = json.frameSequenceId;
        return session;
    }
}

;// CONCATENATED MODULE: ./src/ts/native/BarcodeCaptureListenerProxy.ts

const barcodeNative = __webpack_require__(187);
var BarcodeCaptureListenerEventName;
(function (BarcodeCaptureListenerEventName) {
    BarcodeCaptureListenerEventName["didUpdateSession"] = "barcodeCaptureListener-didUpdateSession";
    BarcodeCaptureListenerEventName["didScan"] = "barcodeCaptureListener-didScan";
})(BarcodeCaptureListenerEventName || (BarcodeCaptureListenerEventName = {}));
class BarcodeCaptureListenerProxy {
    constructor() {
        this.didUpdateSessionListener = (body) => {
            const session = BarcodeCaptureSession.fromJSON(JSON.parse(body.session));
            this.notifyListenersOfDidUpdateSession(session);
            barcodeNative.finishDidUpdateSessionCallback(this.barcodeCapture.isEnabled);
        };
        this.didScanListener = (body) => {
            const session = BarcodeCaptureSession.fromJSON(JSON.parse(body.session));
            this.notifyListenersOfDidScan(session);
            barcodeNative.finishDidScanCallback(this.barcodeCapture.isEnabled);
        };
    }
    static forBarcodeCapture(barcodeCapture) {
        const proxy = new BarcodeCaptureListenerProxy();
        proxy.barcodeCapture = barcodeCapture;
        return proxy;
    }
    subscribeListener() {
        // @ts-ignore
        barcodeNative.addEventListener(BarcodeCaptureListenerEventName.didUpdateSession, this.didUpdateSessionListener);
        // @ts-ignore
        barcodeNative.addEventListener(BarcodeCaptureListenerEventName.didScan, this.didScanListener);
    }
    unsubscribeListener() {
        // tslint:disable:no-empty
        barcodeNative.removeEventListener(BarcodeCaptureListenerEventName.didUpdateSession, this.didUpdateSessionListener);
        barcodeNative.removeEventListener(BarcodeCaptureListenerEventName.didScan, this.didScanListener);
        // tslint:enable:no-empty
    }
    notifyListenersOfDidUpdateSession(session) {
        const mode = this.barcodeCapture;
        mode.isInListenerCallback = true;
        mode.listeners.forEach(listener => {
            if (listener.didUpdateSession) {
                listener.didUpdateSession(this.barcodeCapture, session);
            }
        });
        mode.isInListenerCallback = false;
    }
    notifyListenersOfDidScan(session) {
        const mode = this.barcodeCapture;
        mode.isInListenerCallback = true;
        mode.listeners.forEach(listener => {
            if (listener.didScan) {
                listener.didScan(this.barcodeCapture, session);
            }
        });
        mode.isInListenerCallback = false;
    }
}

;// CONCATENATED MODULE: ../scandit-titanium-datacapture-core/src/ts/DataCaptureView+Related.ts

class TapToFocus extends Serializable_DefaultSerializable {
    constructor() {
        super();
        this.type = 'tapToFocus';
    }
}
class SwipeToZoom extends Serializable_DefaultSerializable {
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

;// CONCATENATED MODULE: ../scandit-titanium-datacapture-core/src/ts/internal/PrivateDataCaptureView+Related.ts

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

;// CONCATENATED MODULE: ../scandit-titanium-datacapture-core/src/ts/Viewfinder+Related.ts
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
class RectangularViewfinderAnimation extends Serializable_DefaultSerializable {
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

;// CONCATENATED MODULE: ../scandit-titanium-datacapture-core/src/ts/internal/Defaults.ts



const Defaults_coreNative = __webpack_require__(362);
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
const Defaults_Defaults = defaultsFromJSON(JSON.parse(Defaults_coreNative.defaults()));

;// CONCATENATED MODULE: ../scandit-titanium-datacapture-core/src/ts/Camera+Related.ts


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
class CameraSettings extends Serializable_DefaultSerializable {
    constructor(settings) {
        super();
        this.preferredResolution = Defaults_Defaults.Camera.Settings.preferredResolution;
        this.zoomFactor = Defaults_Defaults.Camera.Settings.zoomFactor;
        this.zoomGestureZoomFactor = Defaults_Defaults.Camera.Settings.zoomGestureZoomFactor;
        this.api = 0;
        this.focus = {
            range: Defaults_Defaults.Camera.Settings.focusRange,
            focusGestureStrategy: Defaults_Defaults.Camera.Settings.focusGestureStrategy,
            shouldPreferSmoothAutoFocus: Defaults_Defaults.Camera.Settings.shouldPreferSmoothAutoFocus,
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

;// CONCATENATED MODULE: ./src/ts/internal/BarcodeCaptureDefaults.ts


const BarcodeCaptureDefaults_barcodeNative = __webpack_require__(187);
const parsedDefaults = JSON.parse(BarcodeCaptureDefaults_barcodeNative.barcodeCaptureDefaults());
// tslint:disable-next-line:variable-name
const BarcodeCaptureDefaults = {
    RecommendedCameraSettings: CameraSettings.fromJSON(parsedDefaults.RecommendedCameraSettings),
    BarcodeCaptureSettings: {
        codeDuplicateFilter: parsedDefaults.BarcodeCaptureSettings.codeDuplicateFilter,
    },
    BarcodeCaptureOverlay: {
        DefaultBrush: {
            fillColor: Color.fromJSON(parsedDefaults.BarcodeCaptureOverlay.DefaultBrush.fillColor),
            strokeColor: Color.fromJSON(parsedDefaults.BarcodeCaptureOverlay.DefaultBrush.strokeColor),
            strokeWidth: parsedDefaults.BarcodeCaptureOverlay.DefaultBrush.strokeWidth,
        },
        DefaultStyle: parsedDefaults.BarcodeCaptureOverlay.DefaultStyle,
        styles: Object
            .keys(parsedDefaults.BarcodeCaptureOverlay.styles)
            .reduce((previousValue, currentValue) => {
            return Object.assign(Object.assign({}, previousValue), { [currentValue]: {
                    DefaultBrush: {
                        fillColor: Color.fromJSON(parsedDefaults.BarcodeCaptureOverlay.styles[currentValue].DefaultBrush.fillColor),
                        strokeColor: Color.fromJSON(parsedDefaults.BarcodeCaptureOverlay.styles[currentValue].DefaultBrush.strokeColor),
                        strokeWidth: parsedDefaults.BarcodeCaptureOverlay.styles[currentValue].DefaultBrush.strokeWidth,
                    },
                } });
        }, {}),
    }
};

;// CONCATENATED MODULE: ./src/ts/BarcodeCapture.ts
var BarcodeCapture_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class BarcodeCapture extends Serializable_DefaultSerializable {
    constructor() {
        super();
        this.type = 'barcodeCapture';
        this._isEnabled = true;
        this._feedback = BarcodeCaptureFeedback.default;
        this.privateContext = null;
        this.listeners = [];
        this.isInListenerCallback = false;
        this.listenerProxy = BarcodeCaptureListenerProxy.forBarcodeCapture(this);
    }
    get isEnabled() {
        return this._isEnabled;
    }
    set isEnabled(isEnabled) {
        this._isEnabled = isEnabled;
        if (!this.isInListenerCallback) {
            // If we're "in" a listener callback, we don't want to deserialize the context to update the enabled state,
            // but rather pass that back to be applied in the native callback.
            this.didChange();
        }
    }
    get context() {
        return this._context;
    }
    get feedback() {
        return this._feedback;
    }
    set feedback(feedback) {
        this._feedback = feedback;
        this.didChange();
    }
    static get recommendedCameraSettings() {
        return BarcodeCaptureDefaults.RecommendedCameraSettings;
    }
    get _context() {
        return this.privateContext;
    }
    set _context(newContext) {
        if (newContext == null) {
            this.listenerProxy.unsubscribeListener();
        }
        else if (this.privateContext == null) {
            this.listenerProxy.subscribeListener();
        }
        this.privateContext = newContext;
    }
    static forContext(context, settings) {
        const barcodeCapture = new BarcodeCapture();
        barcodeCapture.settings = settings;
        if (context) {
            context.addMode(barcodeCapture);
        }
        return barcodeCapture;
    }
    applySettings(settings) {
        this.settings = settings;
        return this.didChange();
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
    didChange() {
        if (this.context) {
            return this.context.update();
        }
        else {
            return Promise.resolve();
        }
    }
}
BarcodeCapture_decorate([
    nameForSerialization('enabled')
], BarcodeCapture.prototype, "_isEnabled", void 0);
BarcodeCapture_decorate([
    nameForSerialization('feedback')
], BarcodeCapture.prototype, "_feedback", void 0);
BarcodeCapture_decorate([
    ignoreFromSerialization
], BarcodeCapture.prototype, "privateContext", void 0);
BarcodeCapture_decorate([
    ignoreFromSerialization
], BarcodeCapture.prototype, "listeners", void 0);
BarcodeCapture_decorate([
    ignoreFromSerialization
], BarcodeCapture.prototype, "listenerProxy", void 0);
BarcodeCapture_decorate([
    ignoreFromSerialization
], BarcodeCapture.prototype, "isInListenerCallback", void 0);

;// CONCATENATED MODULE: ../scandit-titanium-datacapture-core/src/ts/Viewfinder.ts
var Viewfinder_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// tslint:disable-next-line:variable-name
const NoViewfinder = { type: 'none' };
class LaserlineViewfinder extends Serializable_DefaultSerializable {
    constructor(style) {
        super();
        this.type = 'laserline';
        const viewfinderStyle = style || Defaults_Defaults.LaserlineViewfinder.defaultStyle;
        this._style = Defaults_Defaults.LaserlineViewfinder.styles[viewfinderStyle].style;
        this.width = Defaults_Defaults.LaserlineViewfinder.styles[viewfinderStyle].width;
        this.enabledColor = Defaults_Defaults.LaserlineViewfinder.styles[viewfinderStyle].enabledColor;
        this.disabledColor = Defaults_Defaults.LaserlineViewfinder.styles[viewfinderStyle].disabledColor;
    }
    get style() {
        return this._style;
    }
}
Viewfinder_decorate([
    nameForSerialization('style')
], LaserlineViewfinder.prototype, "_style", void 0);
class RectangularViewfinder extends Serializable_DefaultSerializable {
    constructor(style, lineStyle) {
        super();
        this.type = 'rectangular';
        const viewfinderStyle = style || Defaults_Defaults.RectangularViewfinder.defaultStyle;
        this._style = Defaults_Defaults.RectangularViewfinder.styles[viewfinderStyle].style;
        this._lineStyle = Defaults_Defaults.RectangularViewfinder.styles[viewfinderStyle].lineStyle;
        this._dimming = Defaults_Defaults.RectangularViewfinder.styles[viewfinderStyle].dimming;
        this._animation = Defaults_Defaults.RectangularViewfinder.styles[viewfinderStyle].animation;
        this.color = Defaults_Defaults.RectangularViewfinder.styles[viewfinderStyle].color;
        this._sizeWithUnitAndAspect = Defaults_Defaults.RectangularViewfinder.styles[viewfinderStyle].size;
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
class AimerViewfinder extends (/* unused pure expression or super */ null && (DefaultSerializable)) {
    constructor() {
        super();
        this.type = 'aimer';
        this.frameColor = Defaults.AimerViewfinder.frameColor;
        this.dotColor = Defaults.AimerViewfinder.dotColor;
    }
}

;// CONCATENATED MODULE: ./src/ts/BarcodeCaptureOverlay.ts
var BarcodeCaptureOverlay_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var BarcodeCaptureOverlayStyle;
(function (BarcodeCaptureOverlayStyle) {
    BarcodeCaptureOverlayStyle["Frame"] = "frame";
    BarcodeCaptureOverlayStyle["Legacy"] = "legacy";
})(BarcodeCaptureOverlayStyle || (BarcodeCaptureOverlayStyle = {}));
class BarcodeCaptureOverlay extends Serializable_DefaultSerializable {
    constructor() {
        super();
        this.type = 'barcodeCapture';
        this._shouldShowScanAreaGuides = false;
        this._viewfinder = null;
        this._brush = BarcodeCaptureOverlay.defaultBrush;
    }
    static get defaultBrush() {
        // tslint:disable-next-line:no-console
        console.warn('defaultBrush is deprecated and will be removed in a future release. ' +
            'Use .brush to get the default for your selected style');
        return new Brush(BarcodeCaptureDefaults.BarcodeCaptureOverlay.styles[BarcodeCaptureDefaults.BarcodeCaptureOverlay.DefaultStyle].DefaultBrush.fillColor, BarcodeCaptureDefaults.BarcodeCaptureOverlay.styles[BarcodeCaptureDefaults.BarcodeCaptureOverlay.DefaultStyle].DefaultBrush.strokeColor, BarcodeCaptureDefaults.BarcodeCaptureOverlay.styles[BarcodeCaptureDefaults.BarcodeCaptureOverlay.DefaultStyle].DefaultBrush.strokeWidth);
    }
    get brush() {
        return this._brush;
    }
    set brush(newBrush) {
        this._brush = newBrush;
        this.barcodeCapture.didChange();
    }
    get style() {
        return this._style;
    }
    get viewfinder() {
        return this._viewfinder;
    }
    set viewfinder(newViewfinder) {
        this._viewfinder = newViewfinder;
        this.barcodeCapture.didChange();
    }
    get shouldShowScanAreaGuides() {
        return this._shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(shouldShow) {
        this._shouldShowScanAreaGuides = shouldShow;
        this.barcodeCapture.didChange();
    }
    static withBarcodeCapture(barcodeCapture) {
        return BarcodeCaptureOverlay.withBarcodeCaptureForView(barcodeCapture, null);
    }
    static withBarcodeCaptureForView(barcodeCapture, view) {
        return this.withBarcodeCaptureForViewWithStyle(barcodeCapture, view, BarcodeCaptureDefaults.BarcodeCaptureOverlay.DefaultStyle);
    }
    static withBarcodeCaptureForViewWithStyle(barcodeCapture, view, style) {
        const overlay = new BarcodeCaptureOverlay();
        overlay.barcodeCapture = barcodeCapture;
        overlay._brush = new Brush(BarcodeCaptureDefaults.BarcodeCaptureOverlay.styles[style].DefaultBrush.fillColor, BarcodeCaptureDefaults.BarcodeCaptureOverlay.styles[style].DefaultBrush.strokeColor, BarcodeCaptureDefaults.BarcodeCaptureOverlay.styles[style].DefaultBrush.strokeWidth);
        overlay._style = style;
        if (view) {
            view.addOverlay(overlay);
        }
        return overlay;
    }
}
BarcodeCaptureOverlay_decorate([
    ignoreFromSerialization
], BarcodeCaptureOverlay.prototype, "barcodeCapture", void 0);
BarcodeCaptureOverlay_decorate([
    ignoreFromSerialization
], BarcodeCaptureOverlay.prototype, "view", void 0);
BarcodeCaptureOverlay_decorate([
    nameForSerialization('shouldShowScanAreaGuides')
], BarcodeCaptureOverlay.prototype, "_shouldShowScanAreaGuides", void 0);
BarcodeCaptureOverlay_decorate([
    serializationDefault(NoViewfinder),
    nameForSerialization('viewfinder')
], BarcodeCaptureOverlay.prototype, "_viewfinder", void 0);
BarcodeCaptureOverlay_decorate([
    nameForSerialization('brush')
], BarcodeCaptureOverlay.prototype, "_brush", void 0);
BarcodeCaptureOverlay_decorate([
    nameForSerialization('style')
], BarcodeCaptureOverlay.prototype, "_style", void 0);

;// CONCATENATED MODULE: ../scandit-titanium-datacapture-core/src/ts/LocationSelection.ts
var LocationSelection_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// tslint:disable-next-line:variable-name
const NoneLocationSelection = { type: 'none' };
class RadiusLocationSelection extends Serializable_DefaultSerializable {
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
class RectangularLocationSelection extends Serializable_DefaultSerializable {
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

;// CONCATENATED MODULE: ./src/ts/internal/BarcodeDefaults.ts

const BarcodeDefaults_barcodeNative = __webpack_require__(187);
const BarcodeDefaults_parsedDefaults = JSON.parse(BarcodeDefaults_barcodeNative.defaults());
// tslint:disable-next-line:variable-name
const BarcodeDefaults = {
    SymbologySettings: Object.keys(BarcodeDefaults_parsedDefaults.SymbologySettings)
        .reduce((settings, identifier) => {
        settings[identifier] = SymbologySettings.fromJSON(JSON.parse(BarcodeDefaults_parsedDefaults.SymbologySettings[identifier]));
        return settings;
    }, {}),
    SymbologyDescriptions: BarcodeDefaults_parsedDefaults.SymbologyDescriptions.map((description) => SymbologyDescription.fromJSON(JSON.parse(description))),
    CompositeTypeDescriptions: BarcodeDefaults_parsedDefaults.CompositeTypeDescriptions.map(JSON.parse),
};
SymbologyDescription.defaults = () => BarcodeDefaults;

;// CONCATENATED MODULE: ./src/ts/BarcodeCaptureSettings.ts
var BarcodeCaptureSettings_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class BarcodeCaptureSettings extends Serializable_DefaultSerializable {
    constructor() {
        super();
        this.codeDuplicateFilter = BarcodeCaptureDefaults.BarcodeCaptureSettings.codeDuplicateFilter;
        this.locationSelection = null;
        this.enabledCompositeTypes = [];
        this.properties = {};
        this.symbologies = {};
    }
    get enabledSymbologies() {
        return Object.keys(this.symbologies)
            .filter(symbology => this.symbologies[symbology].isEnabled);
    }
    get compositeTypeDescriptions() {
        return BarcodeDefaults.CompositeTypeDescriptions.reduce((descriptions, description) => {
            descriptions[description.types[0]] = description;
            return descriptions;
        }, {});
    }
    settingsForSymbology(symbology) {
        if (!this.symbologies[symbology]) {
            const symbologySettings = BarcodeDefaults.SymbologySettings[symbology];
            symbologySettings._symbology = symbology;
            this.symbologies[symbology] = symbologySettings;
        }
        return this.symbologies[symbology];
    }
    setProperty(name, value) {
        this.properties[name] = value;
    }
    getProperty(name) {
        return this.properties[name];
    }
    enableSymbologies(symbologies) {
        symbologies.forEach(symbology => this.enableSymbology(symbology, true));
    }
    enableSymbology(symbology, enabled) {
        this.settingsForSymbology(symbology).isEnabled = enabled;
    }
    enableSymbologiesForCompositeTypes(compositeTypes) {
        compositeTypes.forEach(compositeType => {
            this.enableSymbologies(this.compositeTypeDescriptions[compositeType].symbologies);
        });
    }
}
BarcodeCaptureSettings_decorate([
    serializationDefault(NoneLocationSelection)
], BarcodeCaptureSettings.prototype, "locationSelection", void 0);

;// CONCATENATED MODULE: ./src/index.ts








// Barcode API
exports.Symbology = Symbology;
exports.SymbologyDescription = SymbologyDescription;
exports.SymbologySettings = SymbologySettings;
exports.Checksum = Checksum;
exports.CompositeFlag = CompositeFlag;
exports.CompositeType = CompositeType;
exports.EncodingRange = EncodingRange;
exports.Range = Range;
exports.Barcode = Barcode;
exports.LocalizedOnlyBarcode = LocalizedOnlyBarcode;
exports.BarcodeCapture = BarcodeCapture;
exports.BarcodeCaptureOverlay = BarcodeCaptureOverlay;
exports.BarcodeCaptureOverlayStyle = BarcodeCaptureOverlayStyle;
exports.BarcodeCaptureSession = BarcodeCaptureSession;
exports.BarcodeCaptureFeedback = BarcodeCaptureFeedback;
exports.BarcodeCaptureSettings = BarcodeCaptureSettings;

})();

/******/ })()
;
import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";
import * as material from "material-colors";

export const selectionDependentTools = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];

export const JSON_KEYS = [
  "name",
  "gradientAngle",
  "selectable",
  "hasControls",
  "linkData",
  "editable",
  "extensionType",
  "extension"
];

export const filters = [
  "none",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "brightness",
  "greyscale",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "saturation",
  "gamma",
];
export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.blueGrey["500"],
  "transparent",
];
export const fonts = [
  "Arial",
  "Arial Black",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Palatino",
  "Bookman",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Geneva",
  "Lucida Console",
];
export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "forward"
  | "backward"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILY = "Arial";
export const FONT_SIZE = 32;
export const FONT_WEIGHT = 500;

export const CIRCLE_OPTIONS = {
  radius: 225,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};
export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};
export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};
export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 600,
  height: 600,
  angle: 0,
};
export const TEXT_OPTIONS = {
  type: "textbox",
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};



export interface EditorHookProps {
  clearSelectionCallback?: () => void;
}
export type BuildEditorProps = {
  canvas: fabric.Canvas;
  
  autoZoom: () => void,
  copy: () => void,
  paste: () => void,
  save: (skip?: boolean) => void,
  undo: () => void,
  redo: () => void,
  canUndo: () => boolean,
  canRedo: () => boolean,

  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  selectedObjects: fabric.Object[];
  strokeDashArray: number[];
  fontFamily: string;

  setStrokeDashArray: (vlaue: number[]) => void;
  setFillColor: (value: string) => void;
  setStrokeColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;
  setFontFamily: (value: string) => void;
};


export interface Editor {
  canvas: fabric.Canvas;
  
  saveJson: () => void,
  saveSvg: () => void,
  saveJpeg: () => void,
  savePng: () => void,
  loadJson: (json: string) => void,
  strokeWidth: number;
  selectedObjects: fabric.Object[];
  autoZoom: () => void,
  zoomIn: () => void,
  zoomOut: () =>  void,
  getWorkspace:() => fabric.Object | undefined;
  
  canUndo: () => boolean,
  canRedo: () => boolean,
  
  onUndo: () =>  void,
  onRedo: () =>  void,

  changeSize: (value: {width:number, height: number}) => void;
  changeBackground: (value: string) => void;
  enableDrawingMode: () => void;
  disableDrawingMode: () => void;
  OnCopy: () => void;
  OnPaste: () => void;
  delete: () => void;
  
   addImage: (value: string) => void;
  changeImageFilter: (value: string) => void;
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  addText: (value: string, options?: ITextboxOptions) => void;

  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveOpacity: () => number;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  getActiveFontFamily: () => string;
  getActiveFontWeight: () => number;
  getActiveFontStyle: () => string;
  getActiveFontLinethrough: () => boolean;
  getActiveFontUnderline: () => boolean;
  getActiveTextAlign: () => string;
  getActiveFontSize: () => number;

  changeZedPositionForward: () => void;
  changeZedPositionBackward: () => void;
  changeFillColor: (value: string) => void;
  changeOpacity: (value: number) => void;
  changeStrokeWidth: (value: number) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeDashArray: (vlaue: number[]) => void;
  changeFontWeight: (value: number) => void;
  changeFontFamily: (value: string) => void;
  changeFontStyle: (value: string) => void;
  changeFontLinethrough: (value: boolean) => void;
  changeFontUnderline: (value: boolean) => void;
  changeTextAlign: (value: string) => void;
  changeFontSize: (value: number) => void;
}
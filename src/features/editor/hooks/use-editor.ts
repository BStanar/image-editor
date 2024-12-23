"use client"

import { 
  useCallback, 
  useMemo, 
  useState } 
from "react";

import { fabric } from "fabric";

import { useAutoResize } from "@/features/editor/hooks/use-auto-resize";

import { 
   BuildEditorProps, 
   CIRCLE_OPTIONS, 
   DIAMOND_OPTIONS, 
   Editor, 
   EditorHookProps, 
   FILL_COLOR, 
   FONT_FAMILY, 
   FONT_SIZE, 
   FONT_WEIGHT, 
   JSON_KEYS, 
   RECTANGLE_OPTIONS,
   STROKE_COLOR,
   STROKE_DASH_ARRAY,
   STROKE_WIDTH,
   TEXT_OPTIONS,
   TRIANGLE_OPTIONS
} from "@/features/editor/types";

import { createFilter, downloadFile, isTextType, transformText } from "@/features/editor/utils";
import { useCanvasEvents } from "@/features/editor/hooks/use-canvas-events";
import { useClipboard } from "./use-clipboard";
import { useHistory } from "./use-history";
import { useHotkeys } from "./use-hotkeys";
import { useWindowEvents } from "./use-window-events";

const buildEditor = ({
   canvas,
   selectedObjects,
   fillColor,
   strokeColor,
   strokeWidth,
   strokeDashArray,
   fontFamily,
   setFillColor,
   setStrokeColor,
   setStrokeWidth,
   setStrokeDashArray,
   setFontFamily,
   copy,
   paste,
   autoZoom, 
   save,
   undo,
   redo,
   canUndo,
   canRedo,     
  }: BuildEditorProps): Editor => {
    const generateSaveOptions = () => {
      const { width, height, left, top} = getWorkspace() as fabric.Rect;
      return {
        name: "Image",
        format: "png",
        quality: 1,
        width,
        height,
        left,
        top,
      };
    };

    const savePng = () => {
      const options = generateSaveOptions();
  
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      const dataUrl = canvas.toDataURL(options);
  
      downloadFile(dataUrl, "png");
      autoZoom();
    };
  
    const saveSvg = () => {
      const options = generateSaveOptions();
  
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      const dataUrl = canvas.toDataURL(options);
  
      downloadFile(dataUrl, "svg");
      autoZoom();
    };
  
    const saveJpeg = () => {
      const options = generateSaveOptions();
  
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      const dataUrl = canvas.toDataURL(options);
  
      downloadFile(dataUrl, "jpg");
      autoZoom();
    };
  
    const saveJson = async () => {
      const dataUrl = canvas.toJSON(JSON_KEYS);
  
      await transformText(dataUrl.objects);
      const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(dataUrl, null, "\t"),
      )}`;
      downloadFile(fileString, "json");
    };
  
    const loadJson = (json: string) => {
      const data = JSON.parse(json);
  
      canvas.loadFromJSON(data, () => {
        autoZoom();
      });
    };
    const getWorkspace = () => {
      return canvas.getObjects().find((object) => object.name === "clip");
    };
    const center = (object: fabric.Object) => {
      const workspace = getWorkspace();
      const center = workspace?.getCenterPoint();

      if (!center) return;
      // @ts-expect-error comment no desccription
      canvas._centerObject(object, center);
    };
    const addToCanvas = (object: fabric.Object) => {
      center(object);
      canvas.add(object);
      canvas.setActiveObject(object);
    };
    
    return {
      savePng,
      saveJpeg,
      saveSvg,
      saveJson,
      loadJson,
      canvas,
      strokeWidth,
      selectedObjects,
      getWorkspace,
      autoZoom,
      canUndo,
      canRedo,

      zoomIn: () => {
        let zoomRatio = canvas.getZoom();
        zoomRatio += 0.05;
        const center=canvas.getCenter();

        canvas.zoomToPoint(
          new fabric.Point( center.left, center.top),
          zoomRatio > 1 ? 1: zoomRatio
        )
      },
      zoomOut: () => {
        let zoomRatio = canvas.getZoom();
        zoomRatio -= 0.05;
        const center=canvas.getCenter();

        canvas.zoomToPoint(
          new fabric.Point( center.left, center.top),
          zoomRatio < 0.2 ? 0.2 : zoomRatio,
        )
      },
      
      changeSize: (value: {width:number, height: number}) => {
        const workspace=getWorkspace();
        workspace?.set(value);
        autoZoom();
        save();
      },
      changeBackground:(value: string) => {
        const workspace=getWorkspace();
        workspace?.set({fill: value});
        canvas.renderAll();
        save();
      }, 
      enableDrawingMode: () => {
        canvas.discardActiveObject();
        canvas.renderAll();
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.width = strokeWidth;
        canvas.freeDrawingBrush.color = strokeColor;

      },
      disableDrawingMode: () => {
        canvas.isDrawingMode = false;
      },
      onUndo: () => undo(),
      onRedo: () => redo(),

      OnCopy: () => copy(),
      OnPaste: () => paste(),
      addImage: (value: string) => {
        fabric.Image.fromURL(
          value,
          (image) => {
            const workspace = getWorkspace();

            image.scaleToWidth(workspace?.width || 0);
            image.scaleToHeight(workspace?.width || 0);

            addToCanvas(image);
          },
          {
            crossOrigin: "anonymous",
          },
        );
      },
      changeImageFilter:( value:string) => {
        const objects = canvas.getActiveObjects();

        objects.forEach((object)=> {
          if(object.type === "image") {
            const imageObject = object as fabric.Image;

            const effect = createFilter(value);
            
            imageObject.filters = effect ? [effect] : [];
            imageObject.applyFilters();
            canvas.renderAll();
          }
        });
      },
      delete: () => {
        canvas.getActiveObjects().forEach((object) => canvas.remove(object));
        canvas.discardActiveObject();
        canvas.renderAll();
      },
      // Add elements to canvas
      addCircle: () => {
        const object = new fabric.Circle({
          ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });
      
      addToCanvas(object);
      },
      addSoftRectangle: () => {
        const object = new fabric.Rect({
          ...RECTANGLE_OPTIONS,
          rx: 50,
          ry: 50,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        });
        
        addToCanvas(object);
      },
      addRectangle: () => {
        const object = new fabric.Rect({
          ...RECTANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        });
        
        addToCanvas(object);
      },
      addTriangle: () => {
        const object = new fabric.Triangle({
          ...TRIANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        });
        
        addToCanvas(object);
      },
      addInverseTriangle: () => {
        const HEIGHT = TRIANGLE_OPTIONS.height;
        const WIDTH = TRIANGLE_OPTIONS.width;
        
        const object = new fabric.Polygon(
          [
            { x: 0, y: 0 },
            { x: WIDTH, y: 0 },
            { x: WIDTH / 2, y: HEIGHT },
          ],
          {
            ...TRIANGLE_OPTIONS,
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth: strokeWidth,
            strokeDashArray: strokeDashArray,
          }
        );
        
        addToCanvas(object);
      },
      addDiamond: () => {
        const HEIGHT = DIAMOND_OPTIONS.height;
        const WIDTH = DIAMOND_OPTIONS.width;
        
        const object = new fabric.Polygon(
          [
            { x: WIDTH / 2, y: 0 },
            { x: WIDTH, y: HEIGHT / 2 },
            { x: WIDTH / 2, y: HEIGHT },
            { x: 0, y: HEIGHT / 2 },
          ],
          {
            ...DIAMOND_OPTIONS,
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth: strokeWidth,
            strokeDashArray: strokeDashArray,
          }
        );
        
        addToCanvas(object);
      },
      addText: (value, options) => {
        const object = new fabric.Textbox(value, {
          ...TEXT_OPTIONS,
          fill: fillColor,
          ...options,
        });

        addToCanvas(object);
      },
      // Get element options  
      getActiveFillColor: () => {
        const selectedObject = selectedObjects[0];
        if (!selectedObject) {
          return fillColor;
        }
        const value = selectedObject.get("fill") || fillColor;
        // Currently, gradients & patterns are not supported
        return value as string;
      },
      getActiveOpacity: () => {
        const selectedObject = selectedObjects[0];
        if (!selectedObject) {
          return 1;
        }
        const value = selectedObject.get("opacity") || 1;
        return value;
      },
      getActiveStrokeColor: () => {
        const selectedObject = selectedObjects[0];
        if (!selectedObject) {
          return strokeColor;
        }
        const value = selectedObject.get("stroke") || strokeColor;
        // Currently, gradients & patterns are not supported
        return value;
      },
      getActiveStrokeWidth: () => {
        const selectedObject = selectedObjects[0];
        
        if (!selectedObject) {
          return strokeWidth;
        }
        const value = selectedObject.get("strokeWidth") || strokeWidth;
        
        return value;
      },
      getActiveStrokeDashArray: () => {
        const selectedObject = selectedObjects[0];
        
        if (!selectedObject) {
          return strokeDashArray;
        }
        const value = selectedObject.get("strokeDashArray") || strokeDashArray;
        
        return value;
      },   
      getActiveFontFamily: () => {
        const selectedObject = selectedObjects[0];
        if (!selectedObject) {
          return fontFamily;
        }
        //@ts-expect-error comment 
        //font fmaily exists
        const value = selectedObject.get("fontFamily") || fontFamily;
        
        return value;
      },
      getActiveFontWeight: () => {
        const selectedObject = selectedObjects[0];
        if (!selectedObject) {
          return FONT_WEIGHT;
        }

        //@ts-expect-error comment 
        //font fmaily exists
        const value = selectedObject.get("fontWeight") || FONT_WEIGHT;
        
        return value;
      },
      getActiveFontStyle: () => {
        const selectedObject = selectedObjects[0];
        if (!selectedObject) {
          return "normal";
        }

        //@ts-expect-error comment 
        //font fmaily exists
        const value = selectedObject.get("fontStyle") || "normal";
        
        return value;
      },
      getActiveFontLinethrough: () => {
        const selectedObject = selectedObjects[0];
        if (!selectedObject) {
          return false;
        }

        //@ts-expect-error comment 
        //font fmaily exists
        const value = selectedObject.get("linethrough") || false;
        
        return value;
      },
      getActiveFontUnderline: () => {
        const selectedObject = selectedObjects[0];
        if (!selectedObject) {
          return false;
        }

        //@ts-expect-error comment 
        //font fmaily exists
        const value = selectedObject.get("underline") || false;
        
        return value;
      },
      getActiveTextAlign: () => {
        const selectedObject = selectedObjects[0];
        if (!selectedObject) {
          return "left";
        }

        //@ts-expect-error comment 
        //textAlign exists
        const value = selectedObject.get("textAlign") || "left";
        
        return value;
      },
      getActiveFontSize: () => {
        const selectedObject = selectedObjects[0];
        if (!selectedObject) {
          return FONT_SIZE;
        }
        //@ts-expect-error comment 
        //textAlign exists
        const value = selectedObject.get("fontSize") || FONT_SIZE;
        
        return value;
      },
      
      // Change element options
      changeOpacity: (value: number) => {
        canvas.getActiveObjects().forEach((object) => {
          object.set({ opacity: value });
        });
        canvas.renderAll();
      },
      changeZedPositionForward: () => {
        canvas.getActiveObjects().forEach((object) => {
          canvas.bringForward(object);
        });

        canvas.renderAll();
        // TODO: FIX WORKPSACE OVERFLOW
        
        const workspace = getWorkspace();
        workspace?.sendToBack();
      },
      changeZedPositionBackward: () => {
        canvas.getActiveObjects().forEach((object) => {
          canvas.sendBackwards(object);
        });

        canvas.renderAll();
        
        const workspace = getWorkspace();
        workspace?.sendToBack();
      },
      changeFillColor: (value: string) => {
        setFillColor(value);
        canvas.getActiveObjects().forEach((object) => {
          object.set({ fill: value });
        });
        canvas.renderAll();
      },
      changeStrokeWidth: (value: number) => {
        setStrokeWidth(value);
        canvas.getActiveObjects().forEach((object) => {
          object.set({ strokeWidth: value });
        });
        
        canvas.freeDrawingBrush.width = value;
        canvas.renderAll();
      },    
      changeStrokeDashArray: (value: number[]) => {
        setStrokeDashArray(value);
        canvas.getActiveObjects().forEach((object) => {
          object.set({ strokeDashArray: value });
        });
        canvas.renderAll();
      },
      changeStrokeColor: (value: string) => {
        setStrokeColor(value);
        canvas.getActiveObjects().forEach((object) => {
          // Text types don't have stroke
          if (isTextType(object.type)) {
            object.set({ fill: value });
            return;
          }
          object.set({ stroke: value });
        });
        
        canvas.freeDrawingBrush.color = strokeColor;
        canvas.renderAll();
      },
      changeFontFamily: (value: string) => {
        setFontFamily(value);
        canvas.getActiveObjects().forEach((object) => {
          if(isTextType(object.type))

            //@ts-expect-error comment font family exists
            object.set({fontFamily: value});
        });
        canvas.renderAll();
      },
      changeFontWeight: (value: number) => {
        canvas.getActiveObjects().forEach((object) => {
          if(isTextType(object.type)){
            //@ts-expect-error comment
            //fontWeight existst
            object.set({ fontWeight: value });
          }
        });
        canvas.renderAll();
      },
      changeFontStyle: (value: string) => {
        canvas.getActiveObjects().forEach((object) => {
          if(isTextType(object.type)){
            //@ts-expect-error comment
            //fontStyle existst
            object.set({ fontStyle: value });
          }
        });
        canvas.renderAll();
      },
      changeFontLinethrough: (value: boolean) => {
        canvas.getActiveObjects().forEach((object) => {
          if(isTextType(object.type)){
            //@ts-expect-error comment
            //linethrough existst
            object.set({ linethrough: value });
          }
        });
        canvas.renderAll();
      },
      changeFontUnderline: (value: boolean) => {
        canvas.getActiveObjects().forEach((object) => {
          if(isTextType(object.type)){
            //@ts-expect-error comment
            //underline existst
            object.set({ underline: value });
          }
        });
        canvas.renderAll();
      },
      changeTextAlign: (value: string) => {
        canvas.getActiveObjects().forEach((object) => {
          if(isTextType(object.type)){
            //@ts-expect-error comment
            //textAlign existst
            object.set({ textAlign: value });
          }
        });
        canvas.renderAll();
      },
      changeFontSize: (value: number) => {
        canvas.getActiveObjects().forEach((object) => {
          if(isTextType(object.type)){
            //@ts-expect-error comment
            //textAlign existst
            object.set({ fontSize: value });
          }
        });
        canvas.renderAll();
      },
    };
};

export const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);
  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  
  const [fontFamily, setFontFamily] = useState(FONT_FAMILY);
  const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);
  
  const { 
    save, 
    canRedo, 
    canUndo, 
    redo, 
    undo, 
    canvasHistory,  
    setHistoryIndex
  } = useHistory({ canvas });

  const { 
    copy, 
    paste 
  } = useClipboard({ canvas });

  const { autoZoom } = useAutoResize({ 
    canvas, 
    container 
  });

  useWindowEvents();
  
  useCanvasEvents({
    canvas,
    save,
    setSelectedObjects,
    clearSelectionCallback,
  });

  useHotkeys({
    canvas,
    undo,
    redo,
    save,
    copy,
    paste,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        selectedObjects,
        strokeDashArray,
        setStrokeDashArray,
        fontFamily, 
        setFontFamily,
        copy,
        paste,
        autoZoom,
        save,
        undo,
        redo,
        canUndo,
        canRedo,

      });
    }
    
    return undefined;
  }, [
    copy,
    paste,
    autoZoom,
    save,
    undo,
    redo,
    canUndo,
    canRedo, 
    canvas, 
    fillColor, 
    strokeColor, 
    strokeWidth, 
    selectedObjects,
    strokeDashArray,
    fontFamily,
  ]);

  
  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#fff",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });
      
      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });
      
      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);
      
      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;
      
      setCanvas(initialCanvas);
      setContainer(initialContainer);

      const currentState = JSON.stringify(
        initialCanvas.toJSON(JSON_KEYS)
      );
      canvasHistory.current= [currentState];
      setHistoryIndex(0);
    },
    [
      canvasHistory,// No need, this is from useReF
      setHistoryIndex,// No need, this is from useState
    ]
  );
  
  return { init, editor };
};
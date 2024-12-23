import { cn } from "@/lib/utils";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

import { BsBorderWidth, BsTransparency } from "react-icons/bs";

import { 
  ActiveTool, 
  Editor, 
  FONT_SIZE, 
  FONT_WEIGHT
} from "@/features/editor/types"
import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp, ChevronDown, Trash2 } from "lucide-react";
import { isTextType } from "../utils";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { useState } from "react";
import { FontSizeInput } from "./font-size-input";
import { IoColorFilter } from "react-icons/io5";
import { FaCopy } from "react-icons/fa6";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool
}: ToolbarProps) => {
  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialFontLinethrough = editor?.getActiveFontLinethrough();
  const initialFontUnderline = editor?.getActiveFontUnderline();
  const initialTextAlign = editor?.getActiveTextAlign();
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;

  
  const [properties, setProperties] = useState({
    fillColor:initialFillColor,
    strokeColor:initialStrokeColor,
    fontFamily:initialFontFamily,
    fontWeight: initialFontWeight,
    fontStyle: initialFontStyle,
    fontLinethrough: initialFontLinethrough,
    fontUnderline: initialFontUnderline,
    textAlign: initialTextAlign,
    fontSize: initialFontSize,
  });

  const selectedObjects = editor?.selectedObjects[0];
  const selectedObjectType = editor?.selectedObjects[0]?.type;
  
  const isText= isTextType(selectedObjectType);
  const isImage= selectedObjectType === "image";

  

  const toggleBold = () => {
    if(!selectedObjects){
      return; 
    }

    const newValue = properties.fontWeight > 500 ? 500 : 700;

    editor.changeFontWeight(newValue)

    setProperties((current) => ({
      ...current,
      fontWeight: newValue,
    }));
  };
  const toggleItalic = () => {
    if(!selectedObjects){
      return; 
    }

    const isItalic = properties.fontStyle === "italic";
    const newValue = properties.fontStyle = isItalic ? "normal" : "italic";

    editor.changeFontStyle(newValue)

    setProperties((current) => ({
      ...current,
      fonts: newValue,
    }));
  };
  const toggleLinethrough = () => {
    if(!selectedObjects){
      return; 
    }

    const newValue = properties.fontLinethrough ? false : true;
    editor.changeFontLinethrough(newValue)

    setProperties((current) => ({
      ...current,
      fontLinethrough: newValue,
    }));
  };
  const toggleUnderline = () => {
    if(!selectedObjects){
      return; 
    }

    const newValue = properties.fontUnderline ? false : true;
    editor.changeFontUnderline(newValue)

    setProperties((current) => ({
      ...current,
      fontUnderline: newValue,
    }));
  };
  const onChangeTextalign = (value: string) => {
    if(!selectedObjects){
      return; 
    }

    editor.changeTextAlign(value);
    setProperties((current) => ({
      ...current,
      textAlign: value,
    }));
  }; 
  const onChangeFontSize = (value: number) => {
    if(!selectedObjects){
      return; 
    }

    editor.changeFontSize(value);
    setProperties((current) => ({
      ...current,
      fontSize: value,
    }));
  };


  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2"></div>
    );
  }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      {!isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Color" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("fill")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "fill" && "bg-gray-100")}
              >
              <div
                className="rounded-sm size-4 border"
                style={{ backgroundColor: properties.fillColor }}
                />
            </Button>
          </Hint>
        </div>
      )}
      {!isText && (
          <div className="flex items-center h-full justify-center">
            <Hint label="Stroke Color" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-color")}
                size="icon"
                variant="ghost"
                className={cn(activeTool === "stroke-color" && "bg-gray-100")}
                >
                <div
                  className="rounded-sm size-4 border-2 bg-white"
                  style={{ borderColor: properties.strokeColor }}
                  />
              </Button>
            </Hint>
          </div>
      )}
      {!isText && (
          <div className="flex items-center h-full justify-center">
          <Hint label="Stroke width" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("stroke-width")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "stroke-width" && "bg-gray-100")}
              >
              <BsBorderWidth
                className="size-4"
                />  
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Font" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("font")}
              size="icon"
              variant="ghost"
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-gray-100")}
              >
              <div className="max-w-[100px] truncate"> 
                {properties.fontFamily}
              </div>
              <ChevronDown className="sizse-4 ml-2 shrink-0"/>
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Bold" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleBold}
              size="icon"
              variant="ghost"
              className={cn(
                properties.fontWeight > 500 && "bg-gray-100"
              )}
              >
              <FaBold
                className="size-4"
                />  
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Bold" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleItalic}
              size="icon"
              variant="ghost"
              className={cn(
                properties.fontStyle === "italic" && "bg-gray-100"
              )}
            >
              <FaItalic className="size-4"/>  
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Bold" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleLinethrough}
              size="icon"
              variant="ghost"
              className={cn(
                properties.fontLinethrough === true && "bg-gray-100"
              )}
            >
              <FaStrikethrough className="size-4"/>  
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Italic" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleUnderline}
              size="icon"
              variant="ghost"
              className={cn(
                properties.fontUnderline === true && "bg-gray-100"
              )}
            >
              <FaUnderline className="size-4"/>  
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align left" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextalign("left")}
              size="icon"
              variant="ghost"
              className={cn(
                properties.textAlign === "left" && "bg-gray-100"
              )}
            >
              <AlignLeft className="size-4"/>  
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align center" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextalign("center")}
              size="icon"
              variant="ghost"
              className={cn(
                properties.textAlign === "center" && "bg-gray-100"
              )}
            >
              <AlignCenter className="size-4"/>  
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align right" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextalign("right")}
              size="icon"
              variant="ghost"
              className={cn(
                properties.textAlign === "right" && "bg-gray-100"
              )}
            >
              <AlignRight className="size-4"/>  
            </Button>
          </Hint>
        </div>
      )}
      {isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Image filters" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("filter")}
              size="icon"
              variant="ghost"
              className={cn(
                activeTool === "filter" && "bg-gray-100"
              )}
            >
              <IoColorFilter className="size-4"/>  
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <FontSizeInput
            value={properties.fontSize}
            onChange={onChangeFontSize}
          />
        </div>
      )}
      <div className="flex items-center h-full justify-center">
        <Hint label="Bring forward" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.changeZedPositionForward()}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "forward" && "bg-gray-100")}
            >
            <ArrowUp
              className="size-4"
              />  
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Send backward" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.changeZedPositionBackward()}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "backward" && "bg-gray-100")}
            >
            <ArrowDown
              className="size-4"
              />  
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "opacity" && "bg-gray-100")}
            >
            <BsTransparency
              className="size-4"
              />  
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Copy" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {editor?.OnCopy(), editor?.OnPaste()}}
            size="icon"
            variant="ghost"
            >
            <FaCopy
              className="size-4"
              />  
          </Button>
        </Hint>
      </div>
      
      <div className="flex items-center h-full justify-center">
        <Hint label="Delete" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.delete()}
            size="icon"
            variant="ghost"
            >
            <Trash2
              className="size-4"
              />  
          </Button>
        </Hint>
      </div>
    </div>
  );
  };

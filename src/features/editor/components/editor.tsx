"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "../hooks/use-editor";
import { fabric } from "fabric";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { Footer } from "./footer";
import { ActiveTool } from "../types";

export const EditorComponent = () => {

   const [activeTool, setActiveTool] = useState<ActiveTool>("select");

   const onChangeAactiveTool = useCallback((tool: ActiveTool) => {
      if(tool === activeTool){
         return setActiveTool("select");
      }
      if(tool === "draw"){
         // TODO: Enable draw mode
      }
      if(tool === "draw"){
         // TODO: Disable draw mode
      }
      setActiveTool(tool);
   },[activeTool]);

   const { init } = useEditor();

   const canvasRef = useRef(null);
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect (() => {
      const canvas = new fabric.Canvas(
         canvasRef.current,
         {
            controlsAboveOverlay: true,
            preserveObjectStacking: true,
         }
      );

      init({
         initialCanvas: canvas,
         initialContainer: containerRef.current!,
      })
      return () => {
         canvas.dispose();
      };
   }, [init]);

   return(
      <div className="h-full flex flex-col">
         <Navbar
               onChangeActiveTool={onChangeAactiveTool}
               activeTool={activeTool}>

         </Navbar>
         <div className="absolute bg-muted h-[calc(100%-68px)] w-full top-[68px] flex">
            <Sidebar 
               onChangeActiveTool={onChangeAactiveTool}
               activeTool={activeTool}/>
            <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
               <Toolbar/>
               <div className="flex-1 h-[calc(100%-124px)] bg-muted" ref={containerRef}>
                  <canvas ref={canvasRef}/>
               </div>
               <Footer/>
            </main>
         </div>
      </div>
   );
};
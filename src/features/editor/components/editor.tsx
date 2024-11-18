"use client"

import { useEffect, useRef } from "react";
import { useEditor } from "../hooks/use-editor";
import { fabric } from "fabric";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { Footer } from "./footer";

export const EditorComponent = () => {

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
         <Navbar>

         </Navbar>
         <div className="absolute bg-muted h-[calc(100%-68px)] w-full top-[68px] flex">
            <Sidebar/>
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
"use client"

import { ImageIcon, LayoutTemplate, LayoutTemplateIcon, PencilIcon, SettingsIcon, ShapesIcon, SparkleIcon, SparklesIcon, TypeIcon } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { ActiveTool } from "../types";

interface SidebarProps {
   activeTool: ActiveTool;
   onChangeActiveTool: (tool: ActiveTool) => void;
}


export const Sidebar = ({
   activeTool,
   onChangeActiveTool,
}: SidebarProps) => {



   return (
      <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
         <ul className="flex flex-col">
            <SidebarItem 
               icon={LayoutTemplateIcon}
               label="Design"
               isActive={activeTool === "templates"}
               onClick={()=> onChangeActiveTool("templates")}
            />
                        <SidebarItem 
               icon={ImageIcon}
               label="Image"
               isActive={activeTool === "images"}
               onClick={()=> onChangeActiveTool("images")}
            />
            <SidebarItem 
               icon={TypeIcon}
               label="Type"
               isActive={activeTool === "text"}
               onClick={()=> onChangeActiveTool("text")}
            />
            <SidebarItem 
               icon={ShapesIcon}
               label="Shapes"
               isActive={activeTool === "shapes"}
               onClick={()=> onChangeActiveTool("shapes")}
            />
            <SidebarItem 
               icon={SparklesIcon}
               label="AI"
               isActive={activeTool === "ai"}
               onClick={()=> onChangeActiveTool("ai")}
            />
            <SidebarItem 
               icon={SettingsIcon}
               label="Settings"
               isActive={activeTool === "settings"}
               onClick={()=> onChangeActiveTool("settings")}
            />
         </ul>
      </aside>
   );
}
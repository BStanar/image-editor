"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, MousePointerClick, Redo2, Undo2, Undo2Icon } from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import { Hint } from "@/components/hint";
import { BsCloudCheck, BsFiletypeJpg, BsFiletypeJson, BsFiletypePng, BsFiletypeSvg } from "react-icons/bs";
import { SiJpeg } from "react-icons/si";
import { TbPng } from "react-icons/tb";

export const Navbar = () => {
   return (
      <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
         <Logo/>
         <div className="w-full flex items-center gap-x-1 h-full">
            <DropdownMenu modal={false}>
               <DropdownMenuTrigger asChild>
                  <Button
                     size={"sm"}
                     variant={"ghost"}
                  >
                     File
                     <ChevronDown className="size-4 ml-2"/>
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="start" className="min-w-60">
                  <DropdownMenuItem 
                     className="flex items-center gap-x-2"
                  >
                     <CiFileOn/>
                     <div>
                        <p>Open</p>
                        <p className="text-xs text-muted-foreground">Open a json file</p>
                     </div>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation="vertical" className="mx-2"/>
            <Hint label="Select" side="bottom" sideOffset={10}>
               <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={()=>{}}
                  className=""
               >
                  <MousePointerClick/>
               </Button>
            </Hint>
            <Hint label="Undo" side="bottom" sideOffset={10}>
               <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={()=>{}}
                  className=""
               >
                  <Undo2/>
               </Button>
            </Hint>
            <Hint label="Redo" side="bottom" sideOffset={10}>
               <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={()=>{}}
                  className=""
               >
                  <Redo2/>
               </Button>
            </Hint>
            <Separator orientation="vertical" className="mx-2"/>
            <div className="flex items-center gap-x-2">
               <BsCloudCheck className="size-[20px] text-muted-foreground"/>
               <div className="text-xs text-muted-foreground">
                  Saved
               </div>
            </div>
            <div className="ml-auto flex items-center gap-x-4">
               <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                     <Button variant={"ghost"} size={"sm"}>
                        Export
                        <Download className="size-4 ml-4"/>
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-60">
                     <DropdownMenuItem
                        className="flex items-center gap-x-2"
                     >
                        <BsFiletypeJson className="size-8"/>
                        <div>
                           <p>JSON</p>
                           <p className="text-sm text-muted-foreground">
                              Save for later
                           </p>
                        </div>
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        className="flex items-center gap-x-2"
                     >
                        <BsFiletypePng className="size-8"/>
                        <div>
                           <p>PNG</p>
                           <p className="text-sm text-muted-foreground">
                              Save for web
                           </p>
                        </div>
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        className="flex items-center gap-x-2"
                     >
                        <BsFiletypeJpg className="size-8"/>
                        <div>
                           <p>JPG</p>
                           <p className="text-sm text-muted-foreground">
                              Best for printing
                           </p>
                        </div>
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        className="flex items-center gap-x-2"
                     >
                        <BsFiletypeSvg  className="size-8"/>
                        <div>
                           <p>SVG</p>
                           <p className="text-sm text-muted-foreground">
                              Best for editing in vector software
                           </p>
                        </div>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
      </nav>
   );
};
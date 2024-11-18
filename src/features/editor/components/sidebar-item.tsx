import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
   icon: LucideIcon;
   label: string;
   isActive?: boolean;
   onClick: ()=> void;
}

export const SidebarItem = ({
   icon: Icon,
   label,
   isActive,
   onClick,
}: SidebarItemProps) => {
   return (
      <Button 
         onClick = {onClick}
         className={cn(
            "w-full h-full aspect-video p-3 py-4 flex flex-col rounded-none",
            isActive && "bg-muted text-primary"
         )}
         variant={"ghost"}
      >
         <Icon className="size-5 stroke-2 shrink-0"/>
         <span className="text-xs">
            {label}
         </span>
      </Button>
   );
};
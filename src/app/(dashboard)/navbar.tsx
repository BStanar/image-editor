"use client";

import { UserButton } from "@/features/auth/components/user-button";
import { Logo } from "./logo";


export const Navbar = () => {
  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full">
        
        <div className="ml-auto flex items-center gap-x-4">
          <UserButton/>
        </div>
      </div>
    </nav>
  );
};

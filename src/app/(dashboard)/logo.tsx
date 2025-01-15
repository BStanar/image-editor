import Link from "next/link";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Space_Grotesk({
  weight: ["700"],
  subsets: ["latin"]
});

export const Logo = () => {
  return (
   <Link href="/">
   <div className="w-[120px] h-[35px] relative shrink-0">
      <Image
         priority
         src="/logo.svg"
         fill
         alt="logo image"
         className="shring-0 hover:opacity-75 transition"
      />
   </div>
</Link>
  );
};

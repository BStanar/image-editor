import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
   return(
      <Link href="/">
         <div className="w-[120px] h-[35px] relative shrink-0">
            <Image
               src="/logo.svg"
               fill
               alt="logo image"
               className="shring-0 hover:opacity-75 transition"
            />
         </div>
      </Link>
   );
}
import { auth } from "@/auth";
import { protectServer } from "@/features/auth/utils";
import Image from "next/image";

export default async function Home() {

  const session = await auth();
  await protectServer();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        {JSON.stringify(session)}
      <a
            className="rounded-full border border-solid border-transparent 
            transition-colors flex items-center justify-center bg-foreground 
            text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] 
            text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="http://localhost:3000/editor/1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Editor
          </a>
      </main>
    </div>
  );
}

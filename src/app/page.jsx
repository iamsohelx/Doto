"use client"
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
// because localStorage is not workin so this will off ssr then app will work
const Todo = dynamic(() => 
  import('../components/todo'),{ssr:false}
)

export default function Home() {
  return (
   <div className="relative flex h-[50rem] w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
     <div className="font-[poppins] w-full h-full relative">
       <Todo/>
     </div>
    </div>
  );
}

"use client"

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FaGithub,  } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

import { useSignUp } from "../hooks/use-sign-up";

import { 
   Card, 
   CardContent, 
   CardDescription, 
   CardHeader, 
   CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { on } from "events";


export const SignUpCard = () => {
   const mutation = useSignUp();


   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   
   const onCredentialSignUp = (
      e: React.FormEvent<HTMLFormElement>
   ) => {
      e.preventDefault();
      mutation.mutate({
         name,
         email,
         password,
      },{
         onSuccess: () => {
            console.log("registered");
         }
      }
   )   
   }
   const onProviderSignUp = (provider: "github" | "google") => {
      signIn(provider, {callbackUrl: "/"})
   }
   return(
      <Card className="w-fukk h-full p-8">
         <CardHeader className="px-0 pt-0">
            <CardTitle>
               Create an account
            </CardTitle>
            <CardDescription>
               Use your email or oAuth to create an account
            </CardDescription>
         </CardHeader>
         <CardDescription>
            <CardContent className="space-y-5 px-0 pb-0">
            <form 
                  onSubmit={onCredentialSignUp}
                  className="space-y-2.5"
               >
                  <Input
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Name"
                     type="name"
                     required
                  />
                  <Input
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Email"
                     type="email"
                     required
                  />
                  <Input
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Password"
                     type="password"
                     required
                     color="black"
                     minLength={3}
                  />
                  <Button type="submit" className="w-full" size={"lg"}>Sign in</Button>
               </form>
               <Separator/>
               <div className="gap-y-2.5 flex flex-col">
                  <Button 
                     variant={"outline"}
                     size={"lg"}
                     className="w-full relative"
                     onClick={() => onProviderSignUp("github")}
                  >
                     <FaGithub className="mr-2 size-5 top-3 left-2.5 absolute"/>
                        Continue with Github
                  </Button>
                  <Button 
                     variant={"outline"}
                     size={"lg"}
                     className="w-full relative"
                     onClick={() => onProviderSignUp("google")}
                  >
                     <FcGoogle className="mr-2 size-5 top-3 left-2.5 absolute"/>
                        Continue with Google
                  </Button>
               </div>
            </CardContent>
            <p className="text-xs text-muted-foreground">
               Have an account? <Link href={"/sign-in"}><span className="text-sky-700 hover:underline">Sign in</span></Link>
            </p>
         </CardDescription>
      </Card>
   );
};
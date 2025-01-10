"use client"
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FaGithub,  } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SignInCard = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const onCredentialSignIn = (
      e: React.FormEvent<HTMLFormElement>
   ) => {
      e.preventDefault();

      signIn("credentials", {
         email: email,
         password: password,
         callbackUrl: "/"
      });
   }

   const onProviderSignIn = (provider: "github" | "google") => {
      signIn(provider, {callbackUrl: "/"})
   }
   return(
      <Card className="w-fukk h-full p-8">
         <CardHeader className="px-0 pt-0">
            <CardTitle>
               Login to continue
            </CardTitle>
            <CardDescription>
               Use your email or oAuth to login
            </CardDescription>
         </CardHeader>
         <CardDescription>
            <CardContent className="space-y-5 px-0 pb-0">
               <form 
                  onSubmit={onCredentialSignIn}
                  className="space-y-2.5"
               >
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
                  />
                  <Button type="submit" className="w-full" size={"lg"}>Sign in</Button>
               </form>
               <Separator/>
               <div className="gap-y-2.5 flex flex-col">
               <Button 
                  variant={"outline"}
                  size={"lg"}
                  className="w-full relative"
                  onClick={() => onProviderSignIn("github")}
               >
                  <FaGithub className="mr-2 size-5 top-3 left-2.5 absolute"/>
                     Continue with Github
               </Button>
               <Button 
                  variant={"outline"}
                  size={"lg"}
                  className="w-full relative"
                  onClick={() => onProviderSignIn("google")}
               >
                  <FcGoogle className="mr-2 size-5 top-3 left-2.5 absolute"/>
                     Continue with Google
               </Button>
               </div>
            </CardContent>
            <p className="text-xs text-muted-foreground">
               Dont&apos;t have an account? <Link href={"/sign-up"}><span className="text-sky-700 hover:underline">Sign up</span></Link>
            </p>
         </CardDescription>
      </Card>
   );
};
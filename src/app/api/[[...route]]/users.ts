import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

const app = new Hono()
   .post(
      "/",
      zValidator(
         "json",
         z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(3),
         })
      ),
      async (c) => {
         const {
            name,
            email,
            password            
         } = c.req.valid("json");

         const hashedPassword = await bcrypt.hash(password, 12);

         await db.insert(users).values({
            email,
            name,
            password:hashedPassword,
         });

         return c.json(null,200);
      },
   );

export default app;
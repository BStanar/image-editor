import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { replicate } from "@/lib/replicate";

import { writeFile } from "node:fs/promises";

const app = new Hono()
  .post(
    "/remove-bg",
    zValidator(
      "json",
      z.object({
        image: z.string(),
      }),
    ),
    async (c) => {
      const { image } = c.req.valid("json");

      const input = {
        image: image
      };
    
      const output: unknown = await replicate.run("cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003", { input });

      const res = output as string;

      return c.json({ data: res });
    },
  )
  .post(
    "/generate-image",
    zValidator(
      "json",
      z.object({
        prompt: z.string(),
      }),
    ),
    async (c) => {
      const { prompt } = c.req.valid("json");

      const input = {
        style: "realistic_image",
        prompt: prompt,
    };
    
    const output = await replicate.run("recraft-ai/recraft-20b", { input });
      console.log("Raw Replicate API Response:", output);
      const res = output as Array<string>;

      return c.json({ data: res[0] });
    },
  );

export default app;

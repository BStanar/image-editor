import { unsplash } from "@/lib/unsplash";
import {Hono} from "hono";

const DEFAULT_COUNT=15;
const DEFAULT_COLLECTON_IDS = ["317099"];

const app = new Hono()
   .get("/",async (c) => {
      const images = await unsplash.photos.getRandom({
         collectionIds: DEFAULT_COLLECTON_IDS,
         count: DEFAULT_COUNT,
      });

      if(images.errors){
         return c.json({error: "Something went wrong with collecting images"}, 400);
      }

      let response = images.response;

      if (!Array.isArray(response)){
         response = [response];
      }

      return c.json({data: response });
   });

export default app;

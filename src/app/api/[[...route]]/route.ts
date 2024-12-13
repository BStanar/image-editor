import {Hono} from "hono";
import {handle} from "hono/vercel";


// Revert ot edge if you whant to run on the edge
export const rintime="nodejs";

const app = new Hono().basePath("/api");


export const GET = handle(app);


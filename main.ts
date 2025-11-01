import { Hono } from "@hono/hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/proxy", (c) => {
  const filename: string = c.req.query("remote");
  if (!filename) {
    return c.text("Filename is missing", 400);
  }
  return fetch(filename.trim());
});
Deno.serve(app.fetch);

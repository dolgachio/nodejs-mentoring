import http from "http";
import { apiRouter } from "./endpoints";

export function start(port: number) {
  apiRouter.init();

  const server = http.createServer((req, res) =>
    apiRouter.requestHandler(req, res)
  );

  console.log(`========> Server is listening: http://localhost:${port}`);
  server.listen(port);

  return apiRouter.reset;
}

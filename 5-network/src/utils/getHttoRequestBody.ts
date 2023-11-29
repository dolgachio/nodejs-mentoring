import { IncomingMessage } from "http";

export function getHttpRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk: string) => {
      body += chunk;
    });

    req.on("end", () => {
        resolve(body);
    });

    req.on("error", (error: Error) => {
        reject(error);
    });
  });
}

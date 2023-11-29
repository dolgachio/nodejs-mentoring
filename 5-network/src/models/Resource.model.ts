import { IncomingMessage, ServerResponse } from "http";

export interface CanHandleRequest {
    (params: {method: string, url: string}): boolean;
}

export interface HandleRequest {
    (req: IncomingMessage, res: ServerResponse): void | Promise<void>;
}

export type Resource = [CanHandleRequest, HandleRequest];
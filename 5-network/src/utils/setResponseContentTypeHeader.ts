import { ServerResponse } from "http";
import { ContentTypes } from "../constants/ContentTypes";

export function setResponseContentTypeHeader(res: ServerResponse, contentType: ContentTypes): void {
    res.setHeader("Content-Type", contentType);
}
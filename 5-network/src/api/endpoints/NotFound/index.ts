import {
  HandleRequest,
} from "../../../models/Resource";

export const applyNotFound: HandleRequest = (_, res) => {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");

    res.end("Not Found");
};

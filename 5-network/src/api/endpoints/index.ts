import { Resource, HandleRequest } from "../../models/Resource";
import { applyNotFound } from "./NotFound";
import { getUsersResource } from "./users/getUsers";

let resources: Resource[] = [];

interface ApiRouter {
    init: () => void;
    requestHandler: HandleRequest;
    reset: () => void;
}

export const apiRouterRequestHandler: HandleRequest = (req, res) => {
    const method = req.method || "";
    const url = req.url || "";

    for (let resource of resources) {
        const [canHandleRequest, handleRequest] = resource;
        
        if (canHandleRequest({ method, url })) {
            handleRequest(req, res);

            return;
        }
    }

    applyNotFound(req, res);
};

export const apiRouter: ApiRouter = {
    init() {
        resources = [
            getUsersResource,
        ]
    },

    requestHandler: apiRouterRequestHandler,
    reset() {
        resources = [];
    }
}




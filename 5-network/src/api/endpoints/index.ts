import { InternalServerError } from "../../models/InternalServerError";
import { Resource, HandleRequest } from "../../models/Resource.model";
import { handleInternalServerError } from "./internalServerError";
import { handleNotFound } from "./notFound";

import { usersResources } from "./users";

let resources: Resource[] = [];

interface ApiRouter {
  init: () => void;
  requestHandler: HandleRequest;
  reset: () => void;
}

export const apiRouterRequestHandler: HandleRequest = async (req, res) => {
  const method = req.method || "";
  const url = req.url || "";

  for (let resource of resources) {
    const [canHandleRequest, handleRequest] = resource;

    if (canHandleRequest({ method, url })) {
      try {
        await handleRequest(req, res);
      } catch (error) {
        if (error instanceof InternalServerError) {
          handleInternalServerError(req, res);
          // Stop Everything
          return;
        } else {
          throw error;
        }
      }

      // Stop Everything
      return;
    }
  }

  handleNotFound(req, res);
};

export const apiRouter: ApiRouter = {
  init() {
    resources = [...usersResources];
  },

  requestHandler: apiRouterRequestHandler,
  reset() {
    resources = [];
  },
};

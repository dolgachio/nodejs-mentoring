import { ContentTypes } from "../../../constants/ContentTypes";
import { HandleRequest } from "../../../models/Resource.model";
import { setResponseContentTypeHeader } from "../../../utils/setResponseContentTypeHeader";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const handleInternalServerError: HandleRequest = (_, res) => {
  res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  setResponseContentTypeHeader(res, ContentTypes.Text);

  res.end(ReasonPhrases.INTERNAL_SERVER_ERROR);
};

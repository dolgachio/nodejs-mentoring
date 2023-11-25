import { ContentTypes } from "../../../constants/ContentTypes";
import { HandleRequest } from "../../../models/Resource.model";
import { setResponseContentTypeHeader } from "../../../utils/setResponseContentTypeHeader";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const handleNotFound: HandleRequest = (_, res) => {
  res.statusCode = StatusCodes.NOT_FOUND;
  setResponseContentTypeHeader(res, ContentTypes.Text);

  res.end(ReasonPhrases.NOT_FOUND);
};

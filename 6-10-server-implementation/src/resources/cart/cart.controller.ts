import { Router } from "express";
import { wrapAsync } from "../../utils";

export const router = Router();

router.route("/").get(wrapAsync(async (req, res) => {
    res?.status(200).end("Done!");
}));

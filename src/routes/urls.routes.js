import { Router } from "express";
import { authValidation } from "../middlewares/authorization.middlewares.js";
import {
  shortenUrl,
  getUrlById,
  deleteUrl,
  openShortUrl,
} from "../controllers/urls.controller.js";
import urlSchema from "../models/urlSchema.js";
import { validateSchema } from "../middlewares/schemaValidator.js";

const router = Router();

router.post(
  "/urls/shorten",
  validateSchema(urlSchema),
  authValidation,
  shortenUrl
);
router.get("/urls/:id", getUrlById);
router.delete("/urls/:id", authValidation, deleteUrl);
router.get("/urls/open/:shortUrl", openShortUrl);

export default router;
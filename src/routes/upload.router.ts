import express from "express";
import UploadController from "../controllers/upload.controller";

const router = express.Router();

router.post("/", async (req, res) => {
  const controller = new UploadController();
  const response = await controller.createUpload(req.body);
  return res.send(response);
});

export default router
import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import {Upload} from '../models'
import { createUpload, IUploadPayload } from "../repositories/upload.repository";

@Route("uploads")
@Tags("Upload")
export default class UploadController {
  @Post("/")
  public async createUpload(@Body() body: IUploadPayload): Promise<Upload> {
    return createUpload(body)
  }
}
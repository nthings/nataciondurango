import UploadController from './upload.controller'
import * as UploadRepository from '../repositories/upload.repository'
import {generateUploadsData, generateUploadPayload, generateUploadData} from 'test/utils/generate'

afterEach(() => {
  jest.resetAllMocks()
})

describe("UploadController", () => {
  describe("getUploads", () => {
    test("should return empty array", async () => {
      const spy = jest.spyOn(UploadRepository, 'getUploads').mockResolvedValueOnce([])
      const controller = new UploadController();
      const uploads = await controller.getUploads();
      expect(uploads).toEqual([])
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return uploads list", async () => {
      const uploadsData = generateUploadsData(2)
      const spy = jest.spyOn(UploadRepository, 'getUploads').mockResolvedValueOnce(uploadsData)
      const controller = new UploadController();
      const uploads = await controller.getUploads();
      expect(uploads).toEqual(uploadsData)
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("createUpload", () => {
    test("should add upload to the database", async () => {
      const payload = generateUploadPayload()
      const uploadData = generateUploadData(payload)
      const spy = jest.spyOn(UploadRepository, 'createUpload').mockResolvedValueOnce(uploadData)
      const controller = new UploadController();
      const upload = await controller.createUpload(payload);
      expect(upload).toMatchObject(payload)
      expect(upload).toEqual(uploadData)
      expect(spy).toHaveBeenCalledWith(payload)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("getUpload", () => {
    test("should return upload from the database", async () => {
      const id = 1
      const uploadData = generateUploadData({id})
      const spy = jest.spyOn(UploadRepository, 'getUpload').mockResolvedValueOnce(uploadData)
      const controller = new UploadController();
      const upload = await controller.getUpload(id.toString());
      expect(upload).toEqual(uploadData)
      expect(upload?.id).toBe(id)
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return null if upload not found", async () => {
      const id = 1
      const spy = jest.spyOn(UploadRepository, 'getUpload').mockResolvedValueOnce(null)
      const controller = new UploadController();
      const upload = await controller.getUpload(id.toString());
      expect(upload).toBeNull()
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
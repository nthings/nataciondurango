import * as UploadRepository from './upload.repository'
import {getRepository} from 'typeorm'
import { mocked } from 'ts-jest/utils'
import {generateUploadsData, generateUploadPayload, generateUploadData} from 'test/utils/generate'

jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}))
beforeEach(() => {
  mockedGetRepo.find.mockClear()
  mockedGetRepo.findOne.mockClear()
  mockedGetRepo.save.mockClear()
})

describe("UploadRepository", () => {
  describe("getUploads", () => {
    test("should return empty array", async () => {
      mockedGetRepo.find.mockResolvedValue([])
      const uploads = await UploadRepository.getUploads();
      expect(uploads).toEqual([])
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })

    test("should return uploads list", async () => {
      const uploadsData = generateUploadsData(2)
      mockedGetRepo.find.mockResolvedValue(uploadsData)
      const uploads = await UploadRepository.getUploads();
      expect(uploads).toEqual(uploadsData)
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })
  })

  describe("createUpload", () => {
    test("should add upload to the database", async () => {
      const payload = generateUploadPayload()
      const uploadData = generateUploadData(payload)
      mockedGetRepo.save.mockResolvedValue(uploadData)
      const upload = await UploadRepository.createUpload(payload);
      expect(upload).toMatchObject(payload)
      expect(upload).toEqual(uploadData)
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload)
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1)
    })
  })

  describe("getUpload", () => {
    test("should return upload from the database", async () => {
      const id = 1
      const uploadData = generateUploadData({id})
      mockedGetRepo.findOne.mockResolvedValue(uploadData)
      const upload = await UploadRepository.getUpload(id);
      expect(upload).toEqual(uploadData)
      expect(upload?.id).toBe(id)
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })

    test("should return null if upload not found", async () => {
      const id = 1
      mockedGetRepo.findOne.mockResolvedValue(null)
      const upload = await UploadRepository.getUpload(id);
      expect(upload).toBeNull()
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })
  })
})
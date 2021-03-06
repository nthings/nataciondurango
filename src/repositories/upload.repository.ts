import {getRepository} from 'typeorm';
import {Upload} from '../models';
import { readFileSync } from 'fs';
import MDBReader from 'mdb-reader';

export interface IUploadPayload {
  content: string;
}

export const getUploads  = async () :Promise<Array<Upload>> => {
  const uploadRepository = getRepository(Upload);
  return uploadRepository.find()
}

export const createUpload  = async (payload: IUploadPayload) :Promise<Upload> => {
  console.log(payload);

  const uploadRepository = getRepository(Upload);
  const upload = new Upload()
  return uploadRepository.save({
    ...upload,
    ...payload
  })

}

export const getUpload  = async (id: number) :Promise<Upload | null> => {
  const uploadRepository = getRepository(Upload);
  const upload = await uploadRepository.findOne({id: id})
  if (!upload) return null
  return upload
}
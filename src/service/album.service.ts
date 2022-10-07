import { DocumentDefinition, ObjectId } from 'mongoose';
import AlbumModel, { AlbumDocument } from '../models/album.model';

export const createNewAlbum = async (
  input: DocumentDefinition<AlbumDocument>
) => {
  try {
    return await AlbumModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllAlbums = async () => {
  try {
    return await AlbumModel.find()
      .sort({ createdAt: -1 })
      .populate('photographer');
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAlbumById = async (id: string | ObjectId) => {
  try {
    return await AlbumModel.findById(id)
      .populate('photographer')
      .select('-coverImageIndex');
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteAlbumByIdHandler = async (id: string | ObjectId) => {
  try {
    return await AlbumModel.deleteOne({ _id: id });
  } catch (error: any) {
    throw new Error(error);
  }
};

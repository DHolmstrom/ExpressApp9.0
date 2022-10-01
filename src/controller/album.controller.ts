import { Request, Response } from 'express';
import { omit } from 'lodash';

import logger from '../utils/logger';
import {
  createNewAlbum,
  getAllAlbums,
  getAlbumById,
} from '../service/album.service';
import { getUserById } from '../service/user.service';

export const getAllAlbumsHandler = async (req: Request, res: Response) => {
  try {
    const albums = await getAllAlbums();

    const formatedAlbums = albums.map((album) => {
      return {
        ...album._doc,
        images: album.images[album.coverImageIndex],
      };
    });

    res.status(200).send(formatedAlbums);
  } catch (error: any) {
    logger.error(error);
    res.status(404).send(error.message);
  }
};

export const createAlbumHandler = async (req: Request, res: Response) => {
  try {
    const album = await createNewAlbum(req.body);
    res.status(201).send(album);
  } catch (error: any) {
    logger.error(error);
    res.status(409).send(error.message);
  }
};

export const getAlbumByIdHandler = async (req: Request, res: Response) => {
  try {
    const album = await getAlbumById(req.params.id);

    const formatedAlbum = omit(album?.toJSON(), 'coverImageIndex');

    res.status(200).send(formatedAlbum);
  } catch (error: any) {
    logger.error(error);
    res.status(404).send(error.message);
  }
};

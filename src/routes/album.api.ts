import express from 'express';
import {
  createAlbumHandler,
  getAllAlbumsHandler,
  getAlbumByIdHandler,
  deleteAlbumHandler,
} from '../controller/album.controller';
import validate from '../middleware/validateResource';
import { createAlbumSchema } from '../schema/album.schema';

const router = express.Router();

router.get('/', getAllAlbumsHandler);

router.post('/', validate(createAlbumSchema), createAlbumHandler);

router.get('/:id', getAlbumByIdHandler);

//TODO: Update album

router.delete('/:id', deleteAlbumHandler);

export default router;

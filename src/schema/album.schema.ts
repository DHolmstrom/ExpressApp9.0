import { array, date, number, object, string } from 'zod';

export const imageSchema = object({
  filename: string({
    required_error: 'Image must have a filename',
  }),
  tags: string({
    required_error: 'Image must have atleast one tag',
  }).array(),
  date: string().transform((a) => new Date(a)),
});

export const createAlbumSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    subTitle: string({
      required_error: 'Sub title is required',
    }).optional(),
    coverImageIndex: number({
      required_error: 'Cover image index is required',
    }).optional(),
    images: array(imageSchema).nonempty(
      'Album must contain at least one image'
    ),
    albumType: string({
      required_error: 'Album must have a type',
    }),
  }),
});

export type CreateAlbumInput = typeof createAlbumSchema;

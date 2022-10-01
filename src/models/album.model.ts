import mongoose from 'mongoose';

export interface AlbumDocument extends mongoose.Document {
  title: string;
  subTitle: string;
  coverImageIndex: number;
  images: AlbumImage[];
  photographer: mongoose.Schema.Types.ObjectId;
  albumType: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
}

export type AlbumImage = {
  filename: string;
  tags: string[];
  date: Date;
};

const albumSchema = new mongoose.Schema<AlbumDocument>(
  {
    title: { type: String, required: true },
    subTitle: { type: String },
    coverImageIndex: { type: Number, required: true, default: 0 },
    images: [
      {
        filename: { type: String, required: true, unique: true },
        tags: [String],
        date: { type: Date },
      },
    ],
    photographer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    albumType: { type: String, required: true, default: 'hidden' },
  },
  {
    timestamps: true,
  }
);

const AlbumModel = mongoose.model('Album', albumSchema);

export default AlbumModel;

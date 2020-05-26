import mongoose from 'mongoose';

const AnimeSchema = mongoose.Schema(
  {
    title: String,
    uriPage: String,
    posterStart: String,
    resume: String,
    status: Boolean,
    temporadas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Temporada',
      },
    ],
    category: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Anime', AnimeSchema);

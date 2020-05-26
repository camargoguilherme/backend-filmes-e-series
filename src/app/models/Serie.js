import mongoose from 'mongoose';

const SerieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    uriPage: {
      type: String,
      trim: true,
    },
    posterStart: {
      type: String,
      trim: true,
    },
    resume: {
      type: String,
      trim: true,
    },
    status: Boolean,
    date: {
      type: String,
      trim: true,
    },
    language: {
      type: String,
      trim: true,
    },
    conclude: {
      type: Boolean,
      default: false,
    },
    temporadas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Temporada',
      },
    ],
    category: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Serie', SerieSchema, 'series');

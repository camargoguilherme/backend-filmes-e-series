import mongoose from 'mongoose';

const EpisodioSchema = mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    temporada: {
      type: String,
      trim: true,
    },
    serie: {
      type: String,
      trim: true,
    },
    uri: {
      type: String,
      trim: true,
    },
    conclude: {
      type: Boolean,
      default: false,
    },
    servers: [
      {
        link: {
          type: String,
          trim: true,
        },
        name: {
          type: String,
          trim: true,
        },
      },
    ],
    dublado: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Episodio', EpisodioSchema, 'episodios');

import mongoose from 'mongoose';

const TemporadaSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    serie: {
      type: String,
      trim: true,
    },
    episodios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Episodio',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Temporada', TemporadaSchema, 'temporadas');

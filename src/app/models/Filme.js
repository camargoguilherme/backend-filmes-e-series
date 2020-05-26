import mongoose from 'mongoose';

const FilmeSchema = mongoose.Schema(
  {
    titulo: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    uri: Array,
    referer: String,
    uriPage: String,
    resumo: String,
    posterStart: String,
    category: [
      {
        type: String,
      },
    ],
    new: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Filme', FilmeSchema);

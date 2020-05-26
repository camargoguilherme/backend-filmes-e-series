import mongoose from 'mongoose';

const LogSchema = mongoose.Schema(
  {
    url: {
      type: String,
      trim: true,
    },
    error: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Log', LogSchema);

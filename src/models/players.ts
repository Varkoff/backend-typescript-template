import mongoose from 'mongoose';

const { Schema } = mongoose;

const PlayerSchema = new Schema({
  name: { type: String, unique: true, required: true },
  class: { type: String, required: true },
  specialization: [{ name: String }],
  level: { type: Number, required: true },
  renownLevel: Number,
});

export default mongoose.model('Player', PlayerSchema);

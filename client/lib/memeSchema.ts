import mongoose from 'mongoose';

const memeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
});

export const Meme = mongoose.models.Meme || mongoose.model('Meme', memeSchema, 'walla_collection');

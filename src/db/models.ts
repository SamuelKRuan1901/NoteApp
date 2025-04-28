import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, default: 'user' },
  authProviderId: { type: String },
  fontTheme: { type: String, default: 'sans' }
});

export const User =
  (mongoose.models && mongoose.models.User) ||
  mongoose.model('User', userSchema);

const noteSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  title: { type: String },
  tags: [{ type: String }],
  content: { type: String },
  isArchived: { type: Boolean, default: false },
  lastEdited: { type: String }
});

export const Note =
  (mongoose.models && mongoose.models.Note) ||
  mongoose.model('Note', noteSchema);

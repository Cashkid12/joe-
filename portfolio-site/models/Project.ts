import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], required: true },
  github: String,
  demo: String,
  image: String,
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);

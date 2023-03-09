import mongoose from "mongoose";
const { Schema } = mongoose;

const IdeaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  details: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Idea = mongoose.model("ideas", IdeaSchema);

export default Idea;

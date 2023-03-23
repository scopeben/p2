import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },

  avatar: {
    data: { type: Buffer },
    contentType: { type: String },
  },
});

const User = mongoose.model("users", UserSchema);
export default User;

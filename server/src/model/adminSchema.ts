import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: false,
      required: true,
    },
    role: {
        type: String,
        unique: false,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("adminCollection", AdminSchema);

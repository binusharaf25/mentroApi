import mongoose from "mongoose";
import { string } from "zod";
import { required } from "zod/mini";

const taskSchema = mongoose.Schema(
  {
    title: { type: string, required: true },
    description: string,
    status: {
      type: string,
      enum: ["pending", "in progress", "completed"],
      default: "pending",
    },
    DueDate: Date,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;

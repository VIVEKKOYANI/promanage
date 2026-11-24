import mongoose, { Schema, Document } from "mongoose";

export type TaskStatus =
  | "todo"
  | "in-progress"
  | "review"
  | "done";

export type TaskPriority =
  | "low"
  | "medium"
  | "high"
  | "urgent";

export interface ITask extends Document {
  title: string;
  description?: string;
  organizationId: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  assignee: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },

    description: {
      type: String,
      default: ""
    },

    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "review", "done"],
      default: "todo"
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium"
    },

    dueDate: Date
  },
  {
    timestamps: true
  }
);

taskSchema.index({ organizationId: 1, status: 1 });
taskSchema.index({ assignee: 1, status: 1 });
taskSchema.index({ project: 1, createdAt: -1 });

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
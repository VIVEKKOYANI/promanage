import mongoose, { Schema, Document } from "mongoose";

export type ProjectStatus =
  | "planning"
  | "active"
  | "on-hold"
  | "completed";

export type ProjectPriority = "low" | "medium" | "high";

export interface IProject extends Document {
  name: string;
  description: string;
  organizationId: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  manager: mongoose.Types.ObjectId;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate?: Date;
  deadline?: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
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

    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },

    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["planning", "active", "on-hold", "completed"],
      default: "planning"
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    startDate: Date,

    deadline: Date
  },
  {
    timestamps: true
  }
);

projectSchema.index({ organizationId: 1, status: 1 });
projectSchema.index({ team: 1, manager: 1 });

const Project = mongoose.model<IProject>(
  "Project",
  projectSchema
);

export default Project;
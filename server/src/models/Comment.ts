import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  task: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  message: string;
}

const commentSchema = new Schema<IComment>(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    }
  },
  {
    timestamps: true
  }
);

commentSchema.index({ task: 1, createdAt: -1 });

const Comment = mongoose.model<IComment>(
  "Comment",
  commentSchema
);

export default Comment;
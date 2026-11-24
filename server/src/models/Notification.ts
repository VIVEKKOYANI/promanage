import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  organizationId: mongoose.Types.ObjectId;
  message: string;
  type: "task" | "project" | "system";
  isRead: boolean;
}

const notificationSchema = new Schema<INotification>(
  {
    recipient: {
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
      maxlength: 500
    },

    type: {
      type: String,
      enum: ["task", "project", "system"],
      default: "system"
    },

    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default Notification;
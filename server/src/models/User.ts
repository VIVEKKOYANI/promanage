
import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "admin" | "manager" | "employee";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  organizationId: mongoose.Types.ObjectId;
  avatar?: string;
  isActive: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "employee",
      required: true
    },

    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true
    },

    avatar: {
      type: String,
      default: "",
      maxlength: 500
    },

    isActive: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// One email address can belong to only one account.
userSchema.index({ organizationId: 1, role: 1 });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
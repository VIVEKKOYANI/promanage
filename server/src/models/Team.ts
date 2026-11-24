import mongoose, { Schema, Document } from "mongoose";

export interface ITeam extends Document {
  name: string;
  description?: string;
  organizationId: mongoose.Types.ObjectId;
  teamLead?: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
}

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      trim: true
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

    teamLead: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

teamSchema.index({ organizationId: 1, name: 1 });

const Team = mongoose.model<ITeam>("Team", teamSchema);

export default Team;
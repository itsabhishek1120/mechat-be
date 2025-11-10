import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, trim: true, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contacts: {
      type: [
        {
          contactId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          addedAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
},{
    timestamps: true,
    versionKey: false
})

const User = mongoose.model("User",userSchema);
export default User;
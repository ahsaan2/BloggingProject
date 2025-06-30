const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
      //   required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // profileImageURL: {
    //   type: String,
    // //   required: true,
    // },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this; // this points to user
  if (!user.isModified("password")) return;

  // if user is modifird, hash the password using crypto
  const salt = 'somerandowmsalt';
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  user.salt = salt;
  user.password = hashedPassword;
  next();
});
userSchema.static("matchpassword",async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error('user not found');
//   const salt = randomBytes(16).toString("hex");
  const hashedPassword = user.password;
  const userProvidedPassword = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");
    if(hashedPassword !== userProvidedPassword)
        throw new Error('incorrect Password')
    
//   return hashedPassword === userProvidedPassword;
return user;
});
const User = model("user", userSchema);
module.exports = User;

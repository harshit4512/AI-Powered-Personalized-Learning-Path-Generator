import mongoose from "mongoose"
import bcrypt from "bcrypt.js"

const userschema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
        minlength:[2,"Nmae must be at least 2 characters"],
        maxlength:[50,"Name cannot exceed 50 characters"],
    },

    email:{
        type:String,
        required:[true,"Email is required"],
        lowercase:true,
        trim:true,
        match:[
             /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
        ]
    },

      // ================================
    // AUTH
    // password is optional because
    // Google users have no password
    // ================================

    password:{
        type:String,
        minlength:[6,"Password must be at least 6 characters"],
        select:false,
        // select false means password never comes
        // back in any query by default
    },

        // ================================
    // GOOGLE AUTH
    // ================================

    googleId:{
        type:String,
        unique:true,
        sparse:true,

       // sparse true means multiple users
      // can have null googleId without conflict
    },

    authProvider:{
        type:String,
        enum:["local","google"],
        default:"local"

       // local = email/password
      // google = google oauth
    },

    
    // ================================
    // REFRESH TOKEN
    // stored to support logout
    // and token rotation
    // ================================

     refreshToken: {
      type: String,
      select: false,
    },
},
{
        timestamps:true,
    }
);

// ================================
// PRE SAVE HOOK
// hashes password before saving
// only runs if password was changed
// ================================

userschema.schema.pre("save",async function(next){
    // skip if password not changed

    if(!this.isModified("password"))  return next();

     // skip if no password — Google auth users
    if (!this.password) return next();
// hash with 10 salt rounds — industry standard
    this.password=await bcrypt.hash(this.password,10);
    next();
});


// ================================
// METHOD — compare password on login
// usage: await user.comparePassword("entered123")
// ================================

userschema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
};

// ================================
// METHOD — remove sensitive fields
// before sending user to frontend
// usage: user.toSafeObject()
// ================================
userSchema.methods.toSafeObject = function () {
  const user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  delete user.__v;
  return user;
};

const User=mongoose.model("User",userSchema);


export default User
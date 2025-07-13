import { Schema, model } from 'mongoose';
// import { emailRegexp } from '../../constants/auth-constants.js';
import { saveErrorHandler, setUpdateSettings } from './hooks.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      // match: emailRegexp,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', saveErrorHandler);

userSchema.pre('findOneAndUpdate', setUpdateSettings);

userSchema.post('findOneAndUpdate', saveErrorHandler);

const UserCollection = model('user', userSchema);

export default UserCollection;

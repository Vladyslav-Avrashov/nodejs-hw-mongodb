import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts-constants.js';
import { saveErrorHandler, setUpdateSettings } from './hooks.js';
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: typeList,
      default: 'personal',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

contactSchema.post('save', saveErrorHandler);

contactSchema.pre('findOneAndUpdate', setUpdateSettings);

contactSchema.post('findOneAndUpdate', saveErrorHandler);

export const contactsSortFields = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updatedAt',
];

const ContactCollection = model('Contact', contactSchema);

export default ContactCollection;

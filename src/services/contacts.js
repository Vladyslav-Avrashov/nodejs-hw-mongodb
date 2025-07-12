import ContactCollection from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';
import { sortList } from '../constants/index.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy,
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const query = ContactCollection.find();

  if (filters.contactType) {
    query.where('contactType').equals(filters.contactType);
  }

  if (typeof filters.isFavourite === 'boolean') {
    query.where('isFavourite').equals(filters.isFavourite);
  }

  const totalItems = await ContactCollection.countDocuments(query.getFilter());
  const items = await query
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const data = calcPaginationData({ page, perPage, totalItems });

  return {
    items,
    totalItems,
    page,
    perPage,
    ...data,
  };
};

export const getContactById = (id) => ContactCollection.findById(id);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContactById = async (id, payload, options = {}) => {
  const result = await ContactCollection.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result?.lastErrorObject?.upserted);
  return {
    isNew,
    data: result?.value,
  };
};

export const deleteContactById = (id) =>
  ContactCollection.findByIdAndDelete(id);

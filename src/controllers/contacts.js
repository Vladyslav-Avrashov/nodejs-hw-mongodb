import createHttpError from 'http-errors';
import {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { contactsSortFields } from '../db/models/Contact.js';
import { parseContactFilters } from '../utils/filters/parseContactFilters.js';

export const getContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query, contactsSortFields);
  const filters = parseContactFilters(req.query);

  filters.userId = userId;

  const data = await getContacts({ page, perPage, sortBy, sortOrder, filters });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await getContactById({ _id: contactId, userId });

  if (!data) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await updateContactById({ _id: contactId, userId }, req.body);

  if (!result) throw createHttpError(404, 'Contact not found');

  res.json({
    status: '200',
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await deleteContactById({ _id: contactId, userId });

  if (!data) throw createHttpError(404, 'Contact not found');

  res.status(204).send();
};

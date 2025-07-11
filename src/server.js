import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import { getContacts, getContactById } from './services/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const data = await getContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const data = await getContactById(contactId);

    if (!data) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}`,
      data,
    });
  });

  app.use((error, req, res, next) => {
    const { status, message } = error;
    res.status(status).json({
      status,
      message,
    });
  });

  app.get((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};

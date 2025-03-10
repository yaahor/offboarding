import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { mockServerPort } from '../shared/config/mock-server-port';
import { addDelay } from './add-delay';
import { mockUsers } from './mock-users';


const app = express();
const PORT = mockServerPort;

app.use(cors());
app.use(bodyParser.json());

const users = mockUsers;

// Get all employees
app.get('/employees', (_, res) => {
  addDelay(() => {
    res.json(users);
  })
});

// Get employee by ID
app.get('/employees/:id', (req, res) => {
  addDelay(() => {
    const user = users.find(user => user.id === req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  })
});

// Offboard a user by ID
app.post('/users/:id/offboard', (req, res) => {
  addDelay(() => {
    const userId = req.params.id;
    const user = users.find(user => user.id === userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.status = 'OFFBOARDED';
    res.json({ message: `User ${user.name} (ID: ${userId}) has been offboarded.` });
  });
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});

const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'myTasks.json');

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Create empty JSON file if it doesn't exist
async function initializeFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, '[]');
  }
}

// CRUD operations
app.get('/tasks', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_FILE);
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).send('Error reading tasks');
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const tasks = JSON.parse(await fs.readFile(DATA_FILE));
    const newTask = {
      id: Date.now(),
      text: req.body.text,
      completed: false
    };
    tasks.push(newTask);
    await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).send('Error saving task');
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const tasks = JSON.parse(await fs.readFile(DATA_FILE));
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
      task.completed = req.body.completed;
      task.text = req.body.text || task.text;
      await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (err) {
    res.status(500).send('Error updating task');
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    let tasks = JSON.parse(await fs.readFile(DATA_FILE));
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Error deleting task');
  }
});

initializeFile().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
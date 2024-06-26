const express = require('express');
const router = express.Router();
const Task = require('../models/task');



router.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find({});
      res.send(tasks);
    } catch (error) {
      res.status(500).send(error);
    }
  });


router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.put('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title','completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
  
    try {
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        return res.status(404).send();
      }
  
      updates.forEach(update => task[update] = req.body[update]);
      await task.save();
  
      res.send(task);
    } catch (error) {
      res.status(400).send(error);
    }
  });


  router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.patch('/tasks/:id/complete', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    task.completed = true;
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;



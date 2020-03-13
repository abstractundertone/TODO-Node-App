const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/', async (req, res) => {
  try{
    const todos = await Todo.find()
    res.render('layout', {todos: todos});
  } catch (err) {
    console.log(err)
    res.render('error', {error: err});
  }
})

router.get('/getTodos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err);
  }
})

router.post('/addTodo', async (req, res) => {
  const task = new Todo({
    todoItem: req.body.task
  })
  try {
    const newTask = await task.save();
    res.redirect('/');
  } catch (err) {
    res.render('error', {error: err});
  }
})

router.post('/doneTodo/:id', async (req, res) => {
  const id = req.params.id;
  try{
    await Todo.findByIdAndUpdate({_id: id},
                                 { 
                                    todoStatus: true
                                 }, (err, todo) => {
                                   if(err) return res.status(500).send(err);

                                   return res.render('layout');
                                 })
  } catch (err) {
    console.error('Error ' + err);
  }
})
router.post('/removeTodo/:id', async (req, res) => {
  const id = req.params.id;
  try {
   await Todo.findByIdAndRemove(id, (err, todo) => {
      if (err) return res.status(500).send(err);
      
      const response = {
        message: "Todo successfully deleted",
        id: todo._id
      };
      return res.render('layout');
    });
  } catch (err) {
    console.error('Error: ' + err);
  }
})

module.exports = router
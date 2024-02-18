const express = require('express'); // Import Express.js module
const mongoose = require('mongoose'); // Import Mongoose module for MongoDB interaction
const cors = require('cors'); // Import CORS module for Cross-Origin Resource Sharing

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://vanaiyan2000:vanaiyan2000@cluster0.7oomlhy.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
});

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
});

app.listen(3002, () => console.log("Server started on port 3002"));

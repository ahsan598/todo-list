import express from 'express';
import methodOverride from 'method-override';
import sanitizer from 'sanitizer';

const app = express();
const port = process.env.PORT || 8000;

// Middleware configuration
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override for PUT/DELETE in forms
app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Set view engine
app.set('view engine', 'ejs');

// In-memory todo storage
let todolist = [];

// Routes

// Display todo list
app.get('/todo', (req, res) => {
    res.render('todo', {
        todolist,
        clickHandler: 'func1();'
    });
});

// Add new todo item
app.post('/todo/add/', (req, res) => {
    const newTodo = sanitizer.escape(req.body.newtodo);
    if (newTodo.trim() !== '') {
        todolist.push(newTodo);
    }
    res.redirect('/todo');
});

// Delete todo item
app.get('/todo/delete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!isNaN(id) && id >= 0 && id < todolist.length) {
        todolist.splice(id, 1);
    }
    res.redirect('/todo');
});

// Get single todo item for editing
app.get('/todo/:id', (req, res) => {
    const todoIdx = parseInt(req.params.id, 10);
    const todo = todolist[todoIdx];

    if (todo) {
        res.render('edititem', {
            todoIdx,
            todo,
            clickHandler: 'func1();'
        });
    } else {
        res.redirect('/todo');
    }
});

// Update todo item
app.put('/todo/edit/:id', (req, res) => {
    const todoIdx = parseInt(req.params.id, 10);
    const editTodo = sanitizer.escape(req.body.editTodo);
    
    if (!isNaN(todoIdx) && editTodo.trim() !== '' && todolist[todoIdx]) {
        todolist[todoIdx] = editTodo;
    }
    res.redirect('/todo');
});

// Catch-all redirect
app.use((req, res) => {
    res.redirect('/todo');
});

// Start server
app.listen(port, () => {
    console.log(`Todolist running on http://0.0.0.0:${port}`);
});

// Export app for testing
export default app;

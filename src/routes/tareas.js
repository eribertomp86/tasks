const express = require('express');
const router = express.Router();
const dbpool = require('../database');
const res = require('express/lib/response');
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('tasks/add');
});

router.post('/add', isLoggedIn, async(req, res) => {
    const { name, time, description } = (req.body);
    const newtask = {
        name,
        time,
        description,
        userid: req.user.id
        };
    await pool.query('INSERT INTO tareas set ?', [newtask]);
    req.flash('ok', 'Task Saved Successfully');
    res.redirect('list');
});

//show the list of task  for each user
router.get('/list', isLoggedIn, async (req, res) => {
    const tasks = await pool.query('SELECT * FROM tareas WHERE  userid =?', [req.user.id]);
    console.log(tasks);
    res.render('tasks/list', { tasks });
});

// to delete tasks
router.get('/list/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
       await pool.query('DELETE FROM tareas WHERE ID = ?', [id]);
       req.flash('ok', 'Task deleted Successfully');
   res.redirect('/tareas/list');
});

// to edit tasks

router.get('/list/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
      const task = await pool.query('SELECT * FROM tareas WHERE id = ?', [id]);
        res.render('tasks/edit', {tasks: task[0]});
    });

// save edit
router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { name, time, description } = (req.body);
    const newtask = {
        name,
        time,
        description
        };
    await pool.query('UPDATE tareas set ? WHERE id = ?', [newtask, id]);
    req.flash('ok', 'Task Edited Successfully');
     res.redirect('/tareas/list');
});
module.exports = router;  

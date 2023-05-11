
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');

const { database } = require('./configuratios');

// initializations
const task = express();
require('./lib/passport');

//settings
task.set('port',2000);
task.set('views', path.join(__dirname, 'views'));

task.engine('.hbs', engine({
    defaultlayout: 'main',
    layoutsDir: path.join(task.get('views'), 'layouts'),
    partialsDir: path.join(task.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
 
task.set('view engine', '.hbs');




//middlewares
task.use(session({
    secret: 'estoes',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));

task.use(flash());
task.use(morgan('dev'));
task.use(express.urlencoded({extended: false}));
task.use(passport.initialize());
task.use(passport.session());
task.use(express.json());

//globals variables

task.use((req, rest, next) => {
    task.locals.ok = req.flash('ok');
    task.locals.message = req.flash('message');
    task.locals.user = req.user;
    next();
})

//URl
task.use(require('./routes/index'));
task.use(require('./routes/authentication'));
task.use('/Tareas', require('./routes/tareas'));


//files public
task.use(express.static(path.join(__dirname, 'public')));


//server init
task.listen(task.get('port'), () => {
    console.log('Servert listen on port', task.get('port'));
});



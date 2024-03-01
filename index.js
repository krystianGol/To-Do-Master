import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let todayTasks = [];
let universityTasks = [];

const date = new Date();

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentDayOfWeek = daysOfWeek[date.getDay()];
const currentMonth = month[date.getMonth()];
let currentDay = date.getDate();

if (currentDay === 1) {
    currentDay += "st";
} else if (currentDay === 2) {
    currentDay += "nd"
} else if (currentDay == 3) {
    currentDay += "rd"
} else {
    currentDay += "th";
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {

    res.render('index.ejs',
        {
            tasks: todayTasks,
            currentDayOfWeek: currentDayOfWeek,
            currentMonth: currentMonth,
            currentDay: currentDay
        });
})


app.post('/save', (req, res) => {
    let newTask = req.body['newTask'];
    todayTasks.push(newTask);
    res.redirect('/');
})

app.post('/delete', (req, res) => {
    let taskToDelete = req.body['taskToDelete'];
    for (let i = 0; i < todayTasks.length; i++) {
        if (todayTasks[i] === taskToDelete) {
            todayTasks.splice(i, 1);
            break;
        }
    }
    res.redirect('/');
})

app.get('/university', (req, res) => {
    res.render("university.ejs", { tasks: universityTasks, });
})

app.post('/university/save', (req, res) => {
    let newTask = req.body['newTask'];
    universityTasks.push(newTask);
    res.redirect('/university');
})

app.post('/university/delete', (req, res) => {
    let taskToDelete = req.body['taskToDelete'];
    for (let i = 0; i < universityTasks.length; i++) {
        if (universityTasks[i] === taskToDelete) {
            universityTasks.splice(i, 1);
            break;
        }
    }
    res.redirect('/university');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

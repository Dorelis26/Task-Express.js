const express = require('express');
const app = express();
const port = 8000;

//add the current day 
const numberOfDays = new Date().getDay();
const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const dayName = daysOfWeek[numberOfDays];
const dateNum = new Date().getDate();
const monthNum = new Date().getMonth();
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const month = monthNames[monthNum];
const today = `Today is ${dayName}, ${dateNum}<sup>th</sup> of ${month}`;
//creat todo list
const todaysTask = [];
const workTask = [];
let all = []

//titles
const viewtitles = {
    worktitle : 'Work',
    todaytitle : 'Today',
    tasktitle : "My Task's",
}

//indicate static folders location
app.use(express.static('public'));
//get the post method rom the client
app.use(express.urlencoded({extended:true}))

//view functions 
function allTask(req,res){
    
    let task = [];
    task = todaysTask.concat(workTask);
    console.log(task)
    for(let i =0; i <task.length; i++){
       all.push(`<li>${task[i]}</li>`);
    };
    res.render('index.ejs',{today : today , task: Array.from(new Set(all)), view: viewtitles.tasktitle});
    };

    function todaysTaskView(req,res){
        res.render('today.ejs',{today : today,todaysTask: todaysTask, view : viewtitles.todaytitle})
    };

    function workTaskView(req,res){
        res.render('work.ejs',{today : today, workTask: workTask, view: viewtitles.worktitle })
    };

   // post functions

function addNewItems(req,res){
    let todayitem = req.body.newItemTO;
    todaysTask.push(`<li class="new"><input type="radio" name='compleated'> ${todayitem} </li>`);
    res.redirect('/');
};

function workNewItems(req,res){
    let workitem = req.body.newItemWO;
    workTask.push(`
    <form action="/submit" method="Post">
    <li class="new"><input type="radio" name='compleated'>
    ${workitem} </li></form>`);
    res.redirect('/');
};

app.post('/today',addNewItems);

app.post('/work',workNewItems);
 
app.get('/',allTask);

app.get('/today',todaysTaskView);

app.get('/work',workTaskView);

//server
app.listen(port,()=>{
    console.log(`Server listening to port ${port}`);
});
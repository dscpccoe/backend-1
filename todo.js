// Imports
const express = require('express') //Express module
const app = express() //Initialising express
const ejs = require('ejs')  //EJS for pages redering

app.use(express.urlencoded({ extended: true }));  //Data coming to the server is encoded thats whay we are using this statement to convert data to understandable format

app.set('view engine', 'ejs');  //Declared that we are going to use EJS

var task = [] //container to hold tasks (Consider this as a Database)

app.get('/todo', (req,res)=>{           //Accepting get request (main page)
    res.render('todo', {task:task})
})

app.post('/todo', (req,res)=>{          //Accepting post request(submitting task)
  task.push(req.body.task)
  res.redirect('/todo')
})
var index
app.post('/todo/delete', (req,res)=>{   //Accepting post and performing delete operation
  index = (req.body.index)
  task.splice(index, 1)
  res.redirect('/todo')
})

app.post('/todo/edit', (req,res)=>{     //Accepting post req to edit task
    res.render('edit', {index:req.body.index, task:task})
  })

app.post('/todo/edit/change', (req,res)=>{
    var changed = req.body.edited
    index = req.body.index
    task[index]=changed
    res.redirect('/todo')
  })
  
app.listen(4000, () => {              //Starting server
  console.log('Server connected to port: 4000')
})
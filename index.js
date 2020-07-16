const express=require('express')
const app =express()
const mongoose=require('mongoose')
//configure-enable express to read and parse json incoming data from the Post method//
app.use(express.json())
const port =3055

app.use(function(req,res,next){
    (`${req.method}-${req.url}-${req.ip}-${new Date()}`)
    next()
})
mongoose.connect('mongodb://localhost:27017/feb2020')
.then(()=>{
    console.log('db is connected')
})
.catch((err)=>{
    console.log('error',err)
})
//create a task schema
const Schema=mongoose.Schema
const taskSchema=new Schema({
    title:{
        type:String,
        required:[true,'title is mandatory']//in-built validations
    },
    description:{
        type:String
    },
    completed:{
        type:Boolean
    },
    dueDate:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
const Task=mongoose.model('Task',taskSchema)// create a model after the scema to communicate with the DB//
app.get('/',(req,res)=>{
    res.send('Welcome to the website')
    })
app.get('/api/error', (req, res) => {
        throw new Error('not authorized')
    })
    
app.get('/api/tasks',(req,res)=>{
    Task.find()//returns all the documents inside the collection// 
    .then((tasks)=>{
        res.json(tasks)
    })
    .catch((err)=>{
        res.json(err)
    })
})
app.post('/api/tasks',(req,res)=>{
    const body=req.body
    const task= new Task(body)//inserting the data into the Task Model//
    task.save()//inserts the data into the database//
    .then((task)=>{
        res.json(task)
    })
    .catch((err)=>{
        res.json(err)
    })
})
app.get('/api/tasks/:id',(req,res)=>{
    const id=req.params.id
    Task.findById(id)
    .then((task)=>{
        res.json(task)
    })
    .catch((err)=>{
        res.json(err)
    })
})


app.put('/api/tasks/:id',(req,res)=>{
    const id=req.params.id
    const body=req.body
    Task.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((task)=>{
        res.json(task)
    })
    .catch((err)=>{
        res.json(err)
    })

})
app.delete('/api/tasks/:id',(req,res)=>{
    const id=req.params.id
    Task.findByIdAndDelete(id)
    .then((task)=>{
        res.json(task)
    })
    .catch((err)=>{
        res.json(err)
    })
})

app.use(function (err,req,res,next){
    console.log('err handling middleware function')
    res.send(err.message)
})
app.listen(port,()=>{
    console.log('server running',port)
})

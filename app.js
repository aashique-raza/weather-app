import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import router from './routes/route.js'

const app=express()
const port=process.env.PORT || 4000

// static file load
app.use(express.static('public'))

// view engine setup
app.set('view engine','ejs')

// middlewares---
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// load routes 
app.use('/',router)


app.listen(port,()=>console.log(`server is running on ${port}`))
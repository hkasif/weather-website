const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode.js")
const forcast = require("./utils/forcast.js")

const app = express()
const port = process.env.PORT || 3000

const pathToPublicDirectory = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../template/views")
const partialsPath = path.join(__dirname,"../template/partials")

app.set("view engine","hbs")
app.set("views",viewsPath)
app.use(express.static(pathToPublicDirectory))
hbs.registerPartials(partialsPath)

app.get("",(req,res)=>{
    res.render("index",{
        title: "Weather app",
        name: "Asif Khan"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title: "About page",
        name: "Asif khan"
    })
})
app.get("/help",(req,res)=>{
    res.render("help",{
        title: "To help you",
        name: "Asif Khan"
    })
})
app.get("/weather",(req,res)=>{
    if(!req.query.adderess){
        return res.send({
            error: "You must provide adderess"
        })
    }
        geocode(req.query.adderess,(error,{lattitude,longtitude,location}={})=>{
            if(error){
                return res.send({
                    error:"Unable to find location. Please try another location"
                })
            }
            forcast(lattitude,longtitude,(error,forcastData)=>{
                if(error){
                    return res.send({
                        error: "Unable to find location"
                    })
                }
                res.send({
                    location,
                    forcastData
                })
            })
        })
})
app.get("/product",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "you must provide a search term"
        })
    }
    res.send({
        product: []
    })
})

app.get("/help/*",(req,res)=>{
    res.render("error",{
        title: "404",
        data: "Help article not found",
        name: "Asif Khan"
    })
})
app.get("*",(req,res)=>{
    res.render("error",{
        title: "404",
        data: "Page not found",
        name: "Asif Khan"
    })
})

//app.com
//app.com/help
//app.com/about
app.listen(port,()=>{
    console.log("Server is up on port "+port)
})

//import express from "express";
//import mysql2 from "mysql2";
//import cors from "cors";

/*const {
    lightstep,
    opentelemetry,
  } = require('lightstep-opentelemetry-launcher-node');*/


const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');


const db = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"apjkalam@24",
    database:"test1",
    
})


const app = express();
app.use(express.json())

app.use(cors())

app.get("/",(req,res)=>{
    res.json("hello this is backend")
})

app.get("/exerciselist",(req,res)=>{
    const q = "SELECT * FROM test1.exercises;"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/users",(req,res)=>{
    const q = "SELECT * FROM test1.users;"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/exerciselist",(req,res)=>{
    const q = "INSERT INTO exercises (`username`,`description`,`duration`,`date`) VALUES (?)" 
    const values = [req.body.username,req.body.description,req.body.duration,req.body.date]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("success");
    })
})

app.post("/users",(req,res)=>{
    const q = "INSERT INTO users (`username`) VALUES (?)" 
    const values = [req.body.username]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("success");
    })
})

app.delete("/exerciselist/:id",(req,res)=>{
    const bookId = req.params.id;
    const q= "DELETE FROM exercises WHERE id = ?"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("exercises has been deleted successfully")
    })
})

app.delete("/users/:id",(req,res)=>{
    const bookId = req.params.id;
    const q= "DELETE FROM users WHERE id = ?"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("user-name has been deleted successfully")
    })
})


app.put("/exerciseslist/:id",(req,res)=>{
    const bookId = req.params.id;
    const q= "UPDATE exercises SET `username` = ?,`description`=?,`duration`=?,`date`=? WHERE id =?";

    const values=[
        req.body.username,
        req.body.description,
        req.body.duration,
        req.body.date,
    ]

    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("exercises has been updated successfully")
    })
})

app.listen(8700, ()=>{
    console.log("Connected to backend!");
})


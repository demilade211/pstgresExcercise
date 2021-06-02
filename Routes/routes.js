const pool = require("../migerations/db");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const uuid = require("uuid");
const upload = require("../multer/multer")

router.post("/",async(req,res)=>{
   try {
       const {name,position,clubname} = req.body;
       const newTodo = await pool.query("INSERT INTO players (name,position,clubname) VALUES ($1,$2,$3) RETURNING *",[name,position,clubname])
       res.json({message: "Player created"});
   } catch (err) {
       console.log(err.message);
   }
})

 router.put("/avatar/:id",upload.single('avatars'),async(req,res)=>{
    try {
        const {id} = req.params;
        req.file.originalname = uuid.v4();
        fs.rename(req.file.path,`avatars\\${req.file.originalname}.PNG`,err=>{
            if(err)throw err;
            console.log('renamed');
        })
        const updateTodo = await pool.query("UPDATE players SET avatar = $1 WHERE player_id = $2",[req.file.originalname,id]);
        res.json({message: "photo uploaded"});
    } catch (err) {
        console.log(err.message);
    }
 })

// router.get("/",async(req,res)=>{
//     try {
//         const allTodo = await pool.query("SELECT * FROM todo");
//         res.json(allTodo.rows);
//     } catch (err) {
//         console.log(err.message);
//     }
//  })
 router.get("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const singleTodo = await pool.query("SELECT * FROM players WHERE player_id = $1",[id]);
        res.json(singleTodo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
 })
 
 router.patch("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const {name,position,clubname} = req.body;
        if(!name || !position || !clubname){
            res.json({message: "all fields required"});
        }
        await pool.query("UPDATE players SET name = $1, position = $2, clubname = $3 WHERE player_id = $4",[name,position,clubname,id]);
        res.json({message: "Player Updated"});
    } catch (err) {
        console.log(err.message);
    }
 })
 router.delete("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        await pool.query("DELETE FROM players  WHERE player_id = $1",[id]);
        res.json({message: "player deleted"});
    } catch (err) {
        console.log(err.message);
    }
 })
module.exports = router;

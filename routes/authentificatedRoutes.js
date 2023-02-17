const express = require('express');
const router = express.Router();

//db
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient() 

//conroller
const indexController = require("../controllers/indexControllers")

const isValidFx = require("../functions/isValid")
const SECRET = "lsdklsfkjdfkljkfldjlq98767kd9809mlqkdmqfjdhgjktheht4eokmqmqklsjfkjgijterjzlkdmlskjflkdjfitueutojrsjdklsjdfueihsdf";

// home page => (read)
router.get("/notes", indexController.notesGet)

// create note
router.post("/add", indexController.addNote)

// delete note
router.get("/delete/:id", indexController.deleteNote)

router.get("/edit/:id", indexController.editGet)

router.post("/edit/:id", indexController.editPost)

router.get ("/logout", (req,res)=>{
    const isValid = isValidFx.isValid(req, SECRET)
    if (isValid){
        //req.cookies.token.destroy()
        res.cookie("token", null, {httpOnly:true})
        res.redirect("/")
    }
    else{
        res.redirect("/")
    }
})



module.exports = router
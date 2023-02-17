// requirements
//db
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient() 
// functions
const isValidFx = require("../functions/isValid")
const SECRET = "lsdklsfkjdfkljkfldjlq98767kd9809mlqkdmqfjdhgjktheht4eokmqmqklsjfkjgijterjzlkdmlskjflkdjfitueutojrsjdklsjdfueihsdf";




const notesGet = async (req, res)=> {
    const isValid = isValidFx.isValid(req, SECRET);

    if (isValid) {
        const user = await prisma.user.findUnique({
            where: {id: isValid.id},
            include: {
                notes: true,
                profile: true,
            }
        });
        res.render("index", {user: user})
    }
    else {
        res.redirect("/auth/login")
    }

}

const addNote =  async (req,res)=>{
    const {title, content} = req.body
    const newNote = await prisma.note.create({
        data: {
            title: title,
            content: content,
            user_id: isValidFx.isValid(req, SECRET).id
        }
    })
    res.redirect("/notes")
}

const deleteNote = async (req, res)=>{
    await prisma.note.delete({where: {id: req.params.id}})
    res.redirect("/notes")
}

const editGet = async (req,res)=>{
    const note = await prisma.note.findUnique({where: {id: req.params.id}})
    const context = {
        note: note,
    }
    res.render("update", context)
}

const editPost = async (req,res)=>{
    const {title, content} = req.body;
    const id = req.params.id
    await prisma.note.update({
        where: {id: id.toString()},
        data: {
            title: title, content: content,
        }
    });
    res.redirect("/notes")
}
module.exports = {
    notesGet: notesGet,
    addNote: addNote,
    deleteNote: deleteNote,
    editGet: editGet,
    editPost: editPost,
}
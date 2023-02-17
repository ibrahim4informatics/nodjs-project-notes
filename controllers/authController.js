const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const jwt = require("jsonwebtoken")


let messages = {
    err : [], suc: []
}

const SECRET = "lsdklsfkjdfkljkfldjlq98767kd9809mlqkdmqfjdhgjktheht4eokmqmqklsjfkjgijterjzlkdmlskjflkdjfitueutojrsjdklsjdfueihsdf";
const isValidFx = require("../functions/isValid")

// routes midlewares
function protectAuthRoutes (req, res, next){
    const isValid = isValidFx.isValid(req, SECRET);
    console.log(isValid)
    if (isValid) {
        res.redirect("/notes")
        next()
    }
    else {
        next()
    }
    
}

// login controllers
const loginGet = (req, res) => { 
    messages.err = []
    res.render("login", {msg: messages})
    messages.suc = []
}


// register controllers
const registerGet =  (req, res) => { 
    res.render("register", {msg: messages})
    messages.err = []
    messages.suc = []
}


const registerPost = async (req, res) => {
    // get informations
    const { email, username, password, cpassword } = req.body;
    email.toLowerCase();

    const emails = await prisma.user.findUnique({ where: { email } });
    const usernames = await prisma.user.findUnique({ where: { username } });

    if (!emails && !usernames) {
        if (password !== cpassword) {
            messages.err = ["passwords doesn't match"]
            res.render("register", { msg: messages })
        }
        else {
            if (password.length < 8) {
                messages.err = ["passwords must be more than 8 characters"]
                res.render("register", { msg: messages })
            }
            else if (password.length > 18) {
                messages.err = ["passwords must be less than 18 characters"]
                res.render("register", { msg: messages })
            }
            else {
                const bcrypt = require('bcrypt');
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(password, salt)
                try {

                    const newUser = await prisma.user.create({
                        data: {
                            email: email,
                            password: hash,
                            username: username
                        }
                    })
                    messages.suc = ["account created login now"]
                    res.redirect("/auth/login")

                } catch {
                    
                    messages.err = ["unkonwn error try again"]
                    res.render("register", { msg: messages })
                }
            }
        }
    }
    else if (emails) {
        messages.err = ["email is used login now"];
        res.redirect("/auth/login")
    }
    else {
        messages.err = ["username is used choose another"];
        res.render("register", { msg: messages })
    }
}





// routes function
const loginPost = async (req,res)=>{
    const bcrytp = require('bcrypt')
    const {email, password} = req.body
    email.toLowerCase()

    // check if user exitst
    const user = await prisma.user.findUnique({where: {email: email}})
    if (user){
        const userPassword = user.password;
        const isCorrect = await bcrytp.compare(password, userPassword)
        if(isCorrect) {
            const userId = user.id;
            const token = jwt.sign({id: userId}, SECRET)
            res.cookie("token", token, {maxAge: 1000*3600*24*3, httpOnly: true})
            res.redirect("/notes")
            

        }
        else {
            messages.err = ["password is incorrect"]
            res.render("login", {msg: messages})
        }
    }
    else {
        messages.err = ["invalid email"]
        res.render('login', {msg: messages});
    }
}

module.exports = {
    loginPost: loginPost,
    loginGet: loginGet,
    registerPost: registerPost,
    registerGet: registerGet,
    protectAuthRoutes: protectAuthRoutes,
}
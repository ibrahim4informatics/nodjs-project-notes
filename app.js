const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const cookieParser = require("cookie-parser")


app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())



app.get("/", (req, res)=>{
    res.render("welcome")
})

app.use("/auth", require("./routes/authRoutes"));
app.use("/", require("./routes/authentificatedRoutes"))



app.listen(port, ()=> console.log(`server run on http://localhost:${port}`))


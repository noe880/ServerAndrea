const express = require("express");
const bodyParse = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3977;

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

app.get("/", (req, res) => {
res.status(200).send({msg: "que perro"});
});

app.get("/Hola", (req, res) => {
    const {user} = req.body;
    res.status(200).send({msg: `Hola, ${user}`});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
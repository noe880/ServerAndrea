const express = require("express");
const bodyParse = require("body-parser");
const nodemailer = require('nodemailer');
const { insertarDatos } = require('./database');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3977;

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "ferrreteriasanmartin@gmail.com",
    pass: "vevy eaic ftpd bpwz"
  }
});

//Envia correo De vienvenida
app.post("/email", async (req, res) => {
  const { nombre, apellido, email } = req.body;
  insertarDatos(nombre,apellido,email);
    try {
      const info = await transporter.sendMail({
        from: `"Ferreteria San Marcos" <ferrreteriasanmartin@gmail.com>`,
        to: email,
        subject: "Ferreteria",
        text: "CCCC",
        html: `
        <h1>Bienvenido</h1>
        <p>Estimado ${nombre} ${apellido},</p>
        <p>Te damos la más cordial bienvenida a nuestra ferretería. Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
        <p>En nuestra tienda encontrarás una amplia gama de productos y servicios para satisfacer tus necesidades de construcción y bricolaje. ¡Esperamos que encuentres todo lo que buscas!</p>
        <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
        <p>¡Gracias por elegirnos!</p>
        `
      });
      res.status(200).json({ status: 'OK', message: 'Correo enviado exitosamente' });
    } catch (error) {
      res.status(500).json({ status: 'Error', message: 'Error al enviar el correo' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
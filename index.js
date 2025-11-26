require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const twilio = require("twilio")
const app = express();

const routesAdmin = require("./routes/Admin");
const routesAuthAdmin = require("./routes/auth/authadmin");

const routesGuru = require("./routes/Guru");
const routesJamMasuk = require("./routes/JamMasuk");
const routesJamKeluar = require("./routes/JamKeluar");
const routesJabatan = require("./routes/Jabatan");

const port = 3000;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

app.use(
  cors({
    origin: "https://presensi-guru-three.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,      // WAJIB karena HTTPS
      httpOnly: true,    // Lebih aman
      sameSite: "none",  // WAJIB untuk domain berbeda
    },
  })
);

app.post('/api/send-sms', (req, res) => {
  const { to, body } = req.body;

  client.messages
    .create({
      body: body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    })
    .then(message => res.status(200).send(`Message sent with SID: ${message.sid}`))
    .catch(error => res.status(500).send(`Failed to send message: ${error}`));
});

// Routes for admin
app.use("/api/admin", routesAdmin);
app.use("/api/auth/admin", routesAuthAdmin);

//
app.use("/api/guru", routesGuru);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//
app.use("/api/jammasuk", routesJamMasuk);
app.use("/api/jamkeluar", routesJamKeluar);

//
app.use("/api/jabatan", routesJabatan);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

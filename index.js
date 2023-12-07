require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const Burger = require("./models/rankburger");
const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(cors())
mongoose.connect(process.env.mURL);

// EventListener. La función se ejecutará cuando exista un error
mongoose.connection.on("error", (error) => {
  console.log(error);
});

// 'Once' Se ejecuta una vez
mongoose.connection.once("open", () => console.log("Successful connection"));
app.use(express.json())

// Obtiene la informacion de los lugares
app.get("/burgers", async (req, res) => {
    const burgers = await Burger.find();
    res.json(burgers);
});

// Los obtiene por ID
app.get("/burgers/:id", getBurger, async (req, res) => {
    res.json(res.burger);
});

// Elimina la informacion de los lugares en base al id
app.delete("/burgers/:id", getBurger, async (req, res) => {
    await res.burger.deleteOne()
    res.json({
        tag: "Elemento borrado :(",
    });
});

// Actualiza la informacion del lugar
app.patch("/burgers/:id", getBurger, async(req, res) => {
    if (req.body.name != null) {
        res.burger.name = req.body.name
      }
      if (req.body.place != null) {
        res.burger.place = req.body.place
      }
      if (req.body.location != null) {
        res.burger.location = req.body.location
      }
      if (req.body.rating != null) {
        res.burger.rating = req.body.rating
      }
      if (req.body.price != null) {
        res.burger.price = req.body.price
      }
      
    try{
        const upBurger = await res.burger.save()
        res.json(upBurger)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Registra un lugar seleccionnado en la base de datos
app.post("/burgers", async (req, res)=>{
    console.log(req.body)
    const burger = new Burger(
        {
            name: req.body.name,
            place: req.body.place,
            location: req.body.location,
            rating: req.body.rating,
            price: req.body.price,
        }
    )
    const bSaved = await burger.save()
    console.log(bSaved)
    res.json(bSaved)
})

app.listen(3000, () => console.log("Si jala"));

// Middleware a llamar para obtener informacion por ID
async function getBurger(req, res, next) {
    try {
        const burger = await Burger.findById(req.params.id);

        if (!burger) {
            return res.status(404).json({ tag: "No se encontró tal lugar"});
        }

        res.burger = burger;
        next();
    } catch (error) {
        // Manejar errores de manera adecuada, por ejemplo:
        console.error(error);
        return res.status(500).json({ tag: "Error interno del servidor" });
    }
}
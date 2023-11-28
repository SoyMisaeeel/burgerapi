require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const Burger = require("./models/rankburger");

const app = express();
mongoose.connect(process.env.mURL);

// EventListener. La función se ejecutará cuando exista un error
mongoose.connection.on("error", (error) => {
  console.log(error);
});

// 'Once' Se ejecuta una vez
mongoose.connection.once("open", () => console.log("Successful connection"));
app.use(express.json())
app.get("/burgers", async (req, res) => {
    const burgers = await Burger.find();
    res.json(burgers);
});

app.get("/burgers/:id", getBurger, async (req, res) => {
    res.json(res.burger);
});

app.delete("/burgers/:id", getBurger, async (req, res) => {
    await res.burger.deleteOne()
    res.json({
        tag: "elemento borrado :(",
    });
});

app.post("/burgers", async (req, res)=>{
    console.log(req.body)
    const burger = new Burger(
        {
            name: req.body.name,
            place: req.body.place,
            location: req.body.location,
            rating: req.body.rating,
        }
    )
    const bSaved = await burger.save()
    console.log(bSaved)
    res.json(bSaved)
})

app.listen(3000, () => console.log("Si jala"));

async function getBurger(req, res, next) {
    try {
        const burger = await Burger.findById(req.params.id);

        if (!burger) {
            return res.status(404).json({ tag: "No se encontró la hamburguesa" });
        }

        res.burger = burger;
        next();
    } catch (error) {
        // Manejar errores de manera adecuada, por ejemplo:
        console.error(error);
        return res.status(500).json({ tag: "Error interno del servidor" });
    }
}
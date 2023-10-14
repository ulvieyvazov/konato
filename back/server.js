const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();


const DB = process.env.DB_URL;

mongoose.connect(DB, { useNewUrlParser: true });

const { Schema } = mongoose;

const HomeSchema = new Schema(
    {
        img: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        category: {
            type: String,
            require: true,
        },
        title: {
            type: String,
            require: true,
        },
        bedroom: {
            type: Number,
            require: true,
        },
        sq: {
            type: String,
            require: true,
        }
    },
    { timestamps: true }
);

const Home = mongoose.model("home", HomeSchema);
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/home", async (req, res) => {
    try {
        const get = await Home.find({});
        res.send(get);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

app.get("/home/:id", async (req, res) => {
    try {
        const getId = req.params.id;
        const getHomeId = await Home.findById(getId);
        res.send(getHomeId);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

app.post("/home", (req, res) => {
    const getBody = req.body;
    const postHome = new Home(getBody);
    postHome.save();
    res.send(postHome);
});

app.delete("/home/:id", async (req, res) => {
    try {
        const deletBody = req.params.id;
        const deletHome = await Home.findByIdAndDelete(deletBody);
        res.send(deletHome);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

app.put("/home/:id", async (req, res) => {
    try {
        const HomeId = req.params.id;
        const updatedUser = req.body
        const result = await Home.findByIdAndUpdate(HomeId, updatedUser, { new: true });
        res.send(result);
    } catch (err) {
        res.status(404).json({ message: "Not exist" });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server qalxdi, port:", PORT);
});
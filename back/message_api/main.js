const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();


const DB = process.env.DB_URL;

mongoose.connect(DB, { useNewUrlParser: true });

const { Schema } = mongoose;

const Message2Schema = new Schema(
    {
        message: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        subject: {
            type: String,
            require: true,
        }
    },
    { timestamps: true }
);

const Message2 = mongoose.model("message2", Message2Schema);
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/message2", async (req, res) => {
    try {
        const get = await Message2.find({});
        res.send(get);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

app.get("/message2/:id", async (req, res) => {
    try {
        const getId = req.params.id;
        const getMessage2Id = await Message2.findById(getId);
        res.send(getMessage2Id);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

app.post("/message2", (req, res) => {
    const getBody = req.body;
    const postMessage2 = new Message2(getBody);
    postMessage2.save();
    res.send(postMessage2);
});

app.delete("/message2/:id", async (req, res) => {
    try {
        const deletBody = req.params.id;
        const deletMessage2 = await Message2.findByIdAndDelete(deletBody);
        res.send(deletMessage2);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

app.put("/message2/:id", async (req, res) => {
    try {
        const Message2Id = req.params.id;
        const updatedUser = req.body
        const result = await Message2.findByIdAndUpdate(Message2Id, updatedUser, { new: true });
        res.send(result);
    } catch (err) {
        res.status(404).json({ message: "Not exist" });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server qalxdi, port:", PORT);
});
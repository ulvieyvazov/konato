const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();


const DB = process.env.DB_URL;

mongoose.connect(DB, { useNewUrlParser: true });

const { Schema } = mongoose;

const BlogSchema = new Schema(
    {
        img: {
            type: String,
            require: true,
        },
        title: {
            type: String,
            require: true,
        },
        news: {
            type: String,
            require: true,
        }
    },
    { timestamps: true }
);

const Blog = mongoose.model("blog", BlogSchema);
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/blog", async (req, res) => {
    try {
        const get = await Blog.find({});
        res.send(get);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

app.get("/blog/:id", async (req, res) => {
    try {
        const getId = req.params.id;
        const getBlogId = await Blog.findById(getId);
        res.send(getBlogId);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

app.post("/blog", (req, res) => {
    const getBody = req.body;
    const postBlog = new Blog(getBody);
    postBlog.save();
    res.send(postBlog);
});

app.delete("/blog/:id", async (req, res) => {
    try {
        const deletBody = req.params.id;
        const deletBlog = await Blog.findByIdAndDelete(deletBody);
        res.send(deletBlog);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

app.put("/blog/:id", async (req, res) => {
    try {
        const BlogId = req.params.id;
        const updatedUser = req.body
        const result = await Blog.findByIdAndUpdate(BlogId, updatedUser, { new: true });
        res.send(result);
    } catch (err) {
        res.status(404).json({ message: "Not exist" });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server qalxdi, port:", PORT);
});
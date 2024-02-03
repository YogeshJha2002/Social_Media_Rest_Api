import express from "express";
import mongoose from 'mongoose';
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";

const app = express();

// Parse JSON in the request body before routes
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.connect('mongodb+srv://demouser:demouser123@cluster0.rso3z76.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
        console.log("Connected to DB at 5000");
    })
    .catch((err) => console.log(err));

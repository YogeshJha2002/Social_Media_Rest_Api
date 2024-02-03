import express from 'express';
import { addBlog, deleteBlog, getAllBlogs, getById, getByUserId, updateBlog } from '../controllers/blog-controller.js';

const blogRouter = express.Router();//grabbing the router

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog)//ipdating the user//id from mongoDB
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlog)
blogRouter.get("/user/:id",getByUserId)

export default blogRouter;


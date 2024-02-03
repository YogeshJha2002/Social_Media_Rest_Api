import User from "../model/User.js";
import bcrypt from 'bcryptjs';

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    // if user already exists
    if (existingUser) {
        return res.status(400).json({ message: "User Already Exists! Login Instead" });
    }
    const hashedPassword=bcrypt.hashSync(password);
    // creating a new user
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs:[]
    });

    // save the user
    try {
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    return res.status(201).json({ user });
};

//for login
export const login = async(req,res,next) =>{
    const {email,password}=req.body;//only these 2 required for logging in
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.log(err);
       // return res.status(500).json({ message: "Internal Server Error" });
    }

    // if user already exists
    if (!existingUser) {
        return res.status(404).json({ message: "Could not find user by this email" });
    }

    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect)
    return res.status(400).json({message:"Incorrect Password"});
    return res.status(200).json({message:"Login Successful"});

}

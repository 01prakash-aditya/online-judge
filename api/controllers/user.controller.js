import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
    res.json({
        message: 'User controller is working!'
    });
};

// updating user

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your own account!"));
    }
    try{
        if(req.body.password) {
            req.body.password = await bcrypt.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
               fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
                dob: req.body.dob,
                bio: req.body.bio,
                profilePicture: req.body.profilePicture,
                role: req.body.role || 'user'
            }
        }, {new: true});
        const { password, ...others } = updatedUser._doc;
        res.status(200).json(others);
    } catch(error) {
        next(error);
    }
}

// deleting user
export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only delete your own account!"));
    }
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch(error) {
        next(error);
    }
}
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
        const currentUser = await User.findById(req.params.id);
        if (!currentUser) {
            return next(errorHandler(404, "User not found!"));
        }

        const updateData = {};

        if (req.body.fullName !== undefined) {
            updateData.fullName = req.body.fullName;
        }
        if (req.body.email !== undefined) {
            updateData.email = req.body.email;
        }
        if (req.body.dob !== undefined) {
            updateData.dob = req.body.dob;
        }
        if (req.body.bio !== undefined) {
            updateData.bio = req.body.bio;
        }
        if (req.body.profilePicture !== undefined) {
            updateData.profilePicture = req.body.profilePicture;
        }

        if (req.body.password && req.body.password.trim() !== '') {
            updateData.password = bcrypt.hashSync(req.body.password, 10);
        }

        if (req.body.role !== undefined) {
            if (req.user.role === 'admin' || req.body.role === currentUser.role) {
                updateData.role = req.body.role;
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: updateData }, 
            { new: true }
        );

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
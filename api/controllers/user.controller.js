import User from '../models/user.model.js';
import Problem from '../models/problem.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
          fullName: req.body.fullName,
          dob: req.body.dob,
          bio: req.body.bio,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }
};

export const submitSolution = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { problemId } = req.body;

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return next(errorHandler(404, 'Problem not found'));
    }

    const user = await User.findById(userId);
    const alreadySolved = user.solvedProblems.some(
      solved => solved.problemId.toString() === problemId
    );

    if (alreadySolved) {
      return res.json({
        success: false,
        message: 'Problem already solved by this user'
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          solvedProblems: {
            problemId: problemId,
            solvedAt: new Date()
          }
        },
        $inc: {
          questionCount: 1,
          rating: problem.rating
        }
      },
      { new: true }
    );

    const { password, ...userWithoutPassword } = updatedUser._doc;

    res.json({
      success: true,
      message: 'Solution submitted successfully!',
      user: userWithoutPassword,
      ratingGained: problem.rating
    });

  } catch (error) {
    next(error);
  }
};

export const getUserSolvedProblems = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId)
      .populate('solvedProblems.problemId', '_id title')
      .select('solvedProblems');

    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    const solvedProblemIds = user.solvedProblems.map(
      solved => solved.problemId._id.toString()
    );

    res.json({
      success: true,
      solvedProblems: solvedProblemIds
    });

  } catch (error) {
    next(error);
  }
};
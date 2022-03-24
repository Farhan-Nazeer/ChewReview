const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// GET: /api/goals
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })
  res.json(goals);
});

// POST: /api/goals
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  })

  res.json(goal);
});

// PUT: /api/goals/enteredID
const updateGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.id;
  const goal = await Goal.findById(goalId);

  if(!goal){
    res.status(400);
    throw new Error("Goal not found");
  }

  // Next two code blocks seem useless, don't need to check user and don't need to query for user to use id again
  if(!req.user){
    res.status(401)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(goalId, { text: req.body.text }, { new: true })

  res.json(updatedGoal);
});

// DELETE: /api/goals/enteredID
const deleteGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.id;
  const goal = await Goal.findById(goalId);

  if(!goal){
    res.status(400);
    throw new Error("Goal not found");
  }

  // Next two code blocks seem useless, don't need to check user and don't need to query for user to use id again
  if(!req.user){
    res.status(401)
    throw new Error('User not found')
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await Goal.findByIdAndRemove(goalId)

  res.json({ id: goalId });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};

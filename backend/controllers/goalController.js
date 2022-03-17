const asyncHandler = require('express-async-handler');

// GET: /api/goals
const getGoals = asyncHandler(async (req, res) => {
  res.json({ message: "get goals" });
});

// POST: /api/goals
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.json({ message: "set goals" });
});

// PUT: /api/goals/enteredID
const updateGoal = asyncHandler(async (req, res) => {
  res.json({ message: `update world ${req.params.id}` });
});

// DELETE: /api/goals/enteredID
const deleteGoal = asyncHandler(async (req, res) => {
  res.json({ message: `delete world ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};

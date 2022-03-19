const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect, getGoals).post(protect, setGoal)

router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

// Add patch route here as well

module.exports = router

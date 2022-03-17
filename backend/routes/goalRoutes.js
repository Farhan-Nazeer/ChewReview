const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')

router.route('/').get(getGoals).post(setGoal)

router.route('/:id').put(updateGoal).delete(deleteGoal)

// Add patch route here as well

module.exports = router

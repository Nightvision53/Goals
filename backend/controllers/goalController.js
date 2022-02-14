const asyncHandler = require('express-async-handler');

// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler((req, res) => {
    res.status(200).json({ message: 'Get Goals' });
})

// @desc Set Goals
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler((req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('No text provided');
    }

    res.status(200).json({ message: 'Set Goals' });
})

// @desc Update Goals
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler((req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` });
})

// @desc Delete Goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler((req, res) => {
    res.status(200).json({ message: 'Delete Goals' });
})





module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
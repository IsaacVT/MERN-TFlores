const State = require('../models/state');

const getAllStates = async (req, res) => {
    const state = await State.find()
    res.json(state)
}

const getOneState = async (req, res) => {
    const state = await State.findById(req.params.id)
    res.json(state)
}

module.exports = { getAllStates, getOneState }
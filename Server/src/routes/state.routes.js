const { Router } = require('express');
const router = Router();

const { getAllStates, getOneState } = require('../controllers/stateController')

// Show all data
router.get("/getStates", getAllStates);

// Show one task
router.get("/getState/:id", getOneState);

module.exports = router;
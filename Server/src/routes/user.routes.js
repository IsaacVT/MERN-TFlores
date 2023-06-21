const { Router } = require('express');
const { body } = require('express-validator');
const router = Router();
const multer = require("multer");
const {
    getAllUsers,
    getOneUser,
    insertNewUser,
    insertData,
    updateUser,
    deleteUser,
} = require("../controllers/userController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Show all data
router.get("/getUsers", getAllUsers);

// Show one task
router.get("/getUser/:id", getOneUser);

// Insert data
router.post("/saveUser",
    body('names', 'Name is required').not().isEmpty(),
    body('lastName', 'Last name is required').not().isEmpty(),
    body('birthday', 'Wrong date format').isISO8601().toDate(),
    body('cellphone', 'Cell phone must contain at least 10 characters').isLength({ min: 10, max: 10 }),
    body('state', 'State is required').not().isEmpty(),
    body('delegation', 'Delegation is required').not().isEmpty(),
    body('street', 'Street is required').not().isEmpty(),
    body('number', 'Only numbers within the number field').isLength({ min: 1, max: 5 }),
    body('cp', 'Zip Code must be at least 5 characters').isLength({ min: 5, max: 5 }),
    insertNewUser
);

// Insert data
router.post("/insertData", upload.single("excelData"), insertData);

// Update data
router.put("/updateUser/:id",
    body('names', 'Name is required').not().isEmpty(),
    body('lastName', 'Last name is required').not().isEmpty(),
    body('birthday', 'Wrong date format').isISO8601().toDate(),
    body('cellphone', 'Cell phone must contain at least 10 characters').isLength({ min: 10, max: 10 }),
    body('state', 'State is required').not().isEmpty(),
    body('delegation', 'Delegation is required').not().isEmpty(),
    body('street', 'Street is required').not().isEmpty(),
    body('number', 'Only numbers within the number field').isNumeric().isLength({ min: 1, max: 5 }),
    body('cp', 'Zip Code must be at least 5 characters').isLength({ min: 5, max: 5 }),
    updateUser
);

// Delete specified data
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;

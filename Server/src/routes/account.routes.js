const { Router } = require('express');
const { body } = require('express-validator');
const router = Router();

const { getAllAccounts, getOneAccount, insertNewAccount, updateAccount, deleteAccount, singInAccount, getAccountUser } = require('../controllers/accountController');

// Show all data
router.get('/getAccount', getAllAccounts);

// Show one data
router.get('/getAccount/:id', getOneAccount);
router.get('/getAccountUser/:id', getAccountUser);

// Insert data
router.post('/saveAccount',
    body('email', 'El email no es válido').not().isEmpty().normalizeEmail().isEmail(),
    body(
        "password",
        `El password debe de contener:<br>- Al menos 8 caracteres<br>- Letras mayúsculas<br> - Letras minúsculas<br> - Algún número<br> - Algún simbolo o caracter especial`
    ).isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    insertNewAccount
);

// Sing in
router.post('/singin',
    body('email', 'Invalid email').not().isEmpty().normalizeEmail().isEmail(),
    body(
        "password",
        `The password must contain some:<br>
        <ul>
        <li>Capital letter</li>
        <li>Lowercase letter</li>
        <li>Number</li>
        <li>Symbol or special character</li>
        </ul>`
    ).isStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    singInAccount
);

// Update data
router.put('/updateAccount/:id',
    body('email', 'Invalid email').not().isEmpty().normalizeEmail().isEmail(),
    body(
        "password",
        `The password must be at least 8 characters, and contain some:<br>
        <ul>
        <li>Capital letter</li>
        <li>Lowercase letter</li>
        <li>Number</li>
        <li>Symbol or special character</li>
        </ul>`
    ).isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    updateAccount
);

// Delete specified data
router.delete('/deleteAccount/:id', deleteAccount);

module.exports = router;
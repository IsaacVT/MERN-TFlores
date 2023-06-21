const { validationResult } = require("express-validator");
const Account = require("../models/account");

const getAllAccounts = async (req, res) => {
    const account = await Account.find().populate({
        path: "user",
    });
    res.json(account);
};

const getOneAccount = async (req, res) => {
    const account = await Account.findById(req.params.id);
    res.json(account);
};

const getAccountUser = async (req, res) => {
    const account = await Account.where({ user: req.params.id });
    res.json(account);
};

const singInAccount = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    try {
        const { email, password } = req.body;

        const account = await Account.findOne({ email });

        if (account === null) {
            return res.status(400).json({
                errors: [{ msg: "Email not registered" }],
            });
        }

        const passVerified = await account.comparePass(password);
        if (!passVerified) {
            return res.status(400).json({
                errors: [
                    { msg: "Verification failed<br>Check your credentials" },
                ],
            });
        }

        res.status(200).json({ account });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            ok: false,
            message: "No puedes acceder, revisa tus credenciales",
        });
    }
};

const insertNewAccount = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

    const { email, password } = req.body;

    const tmpAcc = await Account.where({ email: email });

    if (tmpAcc.length === 0) {
        const { user } = req.body;
        const newAccount = new Account({ email, password, user });
        await newAccount.save();
        res.json(newAccount);
    } else {
        res.status(400).json({ status: "Account already exists" });
    }
};

const updateAccount = async (req, res) => {
    const { id, email, password, idUser } = req.body;
    const newAccount = new Account({ email, password, user: idUser });
    await Account.findByIdAndRemove(id);
    await newAccount.save();
    res.json({ status: "Account update" });
};

const deleteAccount = async (req, res) => {
    await Account.findByIdAndRemove(req.params.id);
    res.json({ status: "Account delete" });
};

module.exports = {
    getAllAccounts,
    getOneAccount,
    insertNewAccount,
    updateAccount,
    deleteAccount,
    singInAccount,
    getAccountUser,
};

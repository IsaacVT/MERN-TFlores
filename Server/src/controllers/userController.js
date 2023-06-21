const User = require('../models/user');
const Account = require("../models/account");
const Cart = require("../models/cart");

const getAllUsers = async (req, res) => {
    const user = await User.find()
    res.json(user);
}

const getOneUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

const insertNewUser = async (req, res) => {
    const { names, lastName, birthday, cellphone, street, number, cp, delegation, state } = req.body;

    const user = await User.where({ names, lastName, cellphone })

    if (user.length === 0) {
        const newUser = new User({ names, lastName, birthday, cellphone, street, number, cp, delegation, state });

        await newUser.save();
        res.json(newUser);
    } else {
        res.status(400).json({ status: 'User al ready exists' });
    }
}

const insertData = async (req, res) => {
    function getDateFromExcel(excelDate) {
        const date = new Date((excelDate - 25569) * 86400 * 1000);
        return date;
    }

    const excelData = JSON.parse(req.body.excelData);
    let flag = 0;

    for (let i = 0; i < excelData.length; i++) {
        const { names, lastName, cellphone, street, number, cp, delegation, state, email, password } = excelData[i];
        const birthday = getDateFromExcel(excelData[i].birthday)

        if (await Account.findOne({ email }) !== null) {
            console.log('WARNING: The email -', email, '- already exists!');
            flag = flag + 1;
        }

        if (await User.findOne({ $and: [{ names }, { lastName }, { cellphone }] })) {
            console.log('WARNING: The user -', names, lastName, '- already exists!');
            flag = flag + 1;
        }

        if (flag == 0) {
            const newUs = new User({ names, lastName, birthday, cellphone, street, number, cp, delegation, state });
            await newUs.save();

            const newAc = new Account({ email, password, user: newUs })
            await newAc.save();

            const newCart = new Cart({ user: newUs, products: new Map() });
            await newCart.save();
        } else {
            flag = 0;
        }
    }

    res.json({ status: "Excel upload success" });
}


const updateUser = async (req, res) => {

    const {
        names,
        lastName,
        birthday,
        cellphone,
        street,
        number,
        cp,
        delegation,
        state,
        type
    } = req.body;

    const userType = type;

    const newUser =
    {
        names,
        lastName,
        birthday,
        cellphone,
        street,
        number,
        cp,
        delegation,
        state,
        userType
    };


    await User.findByIdAndUpdate(req.params.id, newUser);
    res.json({ status: "User update" });
}

const deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({ status: "User delete" });
}

module.exports = { getAllUsers, getOneUser, insertNewUser, insertData, updateUser, deleteUser };
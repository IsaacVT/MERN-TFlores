const Order = require('../models/order')
const User = require('../models/user')

const showOrders = async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
}

const createOrder = async (req, res) => {
    const { user, prods, final } = req.body

    const tmpUser = await User.findById(user)
    const name = `${tmpUser.names} ${tmpUser.lastName}`
    const direction = `${tmpUser.street} #${tmpUser.number}, CP.${tmpUser.cp}, ${tmpUser.delegation}, ${tmpUser.state}`;

    const prodMap = new Map()
    Object.entries(prods).forEach(([key, value]) => {
        prodMap.set(key, { ...value });
    })

    const tmpOrder = new Order({
        'user': user,
        'name': name,
        'direction': direction,
        'products': prodMap,
        'total': final
    })

    await tmpOrder.save()
    res.json({ status: tmpOrder.status, order: tmpOrder.id });
}

const updateOrder = async (req, res) => {
    const upOrder = req.body
    const { id, statusUpdate, paymentUpdate, shipmentUpdate } = upOrder

    const newOrder = {
        'user': upOrder.user,
        'name': upOrder.name,
        'direction': upOrder.direction,
        'products': upOrder.prodMap,
        'total': upOrder.final,
        'status': statusUpdate,
        'payment': paymentUpdate,
        'shipment': shipmentUpdate
    }

    await Order.findByIdAndUpdate({ _id: id }, newOrder)
    res.json({ status: 'Order update' })
}

const deleteOrder = async (req, res) => {
    await Order.findByIdAndRemove(req.params.id);
    res.json({ status: "User delete" });
}

module.exports = {
    showOrders,
    createOrder,
    updateOrder,
    deleteOrder
}
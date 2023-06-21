export const SaveLocalData = (data) => {
    const { user, role, products } = data

    const info = {
        'user': user,
        'role': role
    }

    const prods = [products]
    const prodMap = new Map()

    prods.forEach(product => {
        prodMap.set(product.id, product.amount);
    })

    SaveLocalList(prodMap, 0)
    window.localStorage.setItem('infoUser', JSON.stringify(info))
}

const SaveLocalList = (tmpList, where) => {
    const mapArray = Array.from(tmpList)

    const productList = mapArray.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

    if (where === 0) {
        window.localStorage.setItem('prodList', JSON.stringify(productList))
    }

    if (where === 1) {
        window.localStorage.setItem('prodListTmp', JSON.stringify(productList))
    }

    if (where === 2) {
        window.localStorage.setItem('prodList', JSON.stringify(productList))
        window.localStorage.setItem('prodListTmp', JSON.stringify(productList))
    }
}

export function GetProdsData() {
    let prodsTmp = null;

    const extistList = window.localStorage.getItem('prodListTmp');

    if (extistList === null) {
        prodsTmp = window.localStorage.getItem('prodList');
    } else {
        prodsTmp = extistList;
    }

    const prods = JSON.parse(prodsTmp)
    const tmpMap = new Map();

    Object.entries(prods).forEach(([key, value]) => {
        tmpMap.set(key, value);
    });

    return tmpMap;
}

export const AddLocalProd = (prod) => {
    const list = GetProdsData()
    const itemAmount = list.get(prod.id)

    if (itemAmount === undefined) {
        list.set(prod.id, 1)
    } else {
        list.set(prod.id, Number(itemAmount) + 1)
    }

    SaveLocalList(list, 1)
}

export function GetAmountProds() {
    let totalItems = 0;
    const list = GetProdsData()

    list.forEach((value) => {
        totalItems += value
    })

    return totalItems;
}

export function GetIdProds() {
    const map = GetProdsData()
    const list = ([...map.keys()])
    return list
}

export function FormatData(data) {
    const tmpMap = new Map();
    let finalMap = null;

    data.forEach(product => {
        tmpMap.set(product.id, product.amount)
    })

    if (tmpMap.size > 0) {
        const tmpList = Array.from(tmpMap)
        finalMap = tmpList.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
    } else {
        finalMap = {}
    }

    return finalMap
}

export function FormatOrderData(data) {
    const tmpMap = new Map();
    let finalMap = null;

    data.forEach(product => {
        tmpMap.set(product.id, {
            name: product.name,
            amount: product.amount,
            price: product.price,
            send: product.send,
            total: product.total,
        })
    })

    if (tmpMap.size > 0) {
        const tmpList = Array.from(tmpMap)
        finalMap = tmpList.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
    } else {
        finalMap = {}
    }

    return finalMap
}

export function GetLocalUser() {
    const dataUser = window.localStorage.getItem('infoUser');
    const info = JSON.parse(dataUser);
    const { user } = info
    return user
}

export function GetLocalRole() {
    const dataUser = window.localStorage.getItem('infoUser');
    const info = JSON.parse(dataUser);
    const { role } = info
    return role
}

export function UpdateLocalProd(map) {
    window.localStorage.setItem('prodList', JSON.stringify(map))
    window.localStorage.setItem('prodListTmp', JSON.stringify(map))
}

export const ResetLocalData = () => {
    window.localStorage.removeItem('prodListTmp');
    window.localStorage.setItem('prodList', JSON.stringify({}));
    window.localStorage.setItem('infoUser', JSON.stringify({}));
}

// -------------------------------------------------------------------------

export const AddLocalNotifications = (msg, order) => {
    const listNotis = GetLocalNotifications()
    listNotis.push({
        'status': msg,
        'order': order
    })

    window.localStorage.setItem('noti', JSON.stringify(listNotis))
}

export function GetLocalNotifications() {
    let listNotis = []

    let notis = window.localStorage.getItem('noti')

    if (notis === undefined || notis === null) {
        window.localStorage.setItem('noti', JSON.stringify([{ 'status': 'not_notify' }]))
        notis = window.localStorage.getItem('noti')
    }

    listNotis = JSON.parse(notis)

    return listNotis;
}

export const ResetNotifications = () => {
    window.localStorage.setItem('noti', JSON.stringify([{ 'status': 'not_notify' }]))
}
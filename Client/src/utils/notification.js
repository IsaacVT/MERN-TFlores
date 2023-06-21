import { set, sub } from 'date-fns';
import { faker } from '@faker-js/faker';
import { AddLocalNotifications, GetLocalNotifications } from './localData';

export const CreateNotification = (noti) => {
    const { status, order } = noti
    AddLocalNotifications(status, order)
}

export const GetNotifications = () => {

    const tmpNoti = GetLocalNotifications()

    const notis = tmpNoti.map((n) => {
        switch (n.status) {
            case 'order_placed':
                n = {
                    id: faker.datatype.uuid(),
                    title: 'Your order is placed',
                    description: 'waiting for shipping',
                    order: n.order,
                    avatar: null,
                    type: 'order_placed',
                    createdAt: set(new Date(), { seconds: 0, milliseconds: 0 }),
                    isUnRead: true,
                }
                break;

            case 'order_shipped':
                n = {
                    id: faker.datatype.uuid(),
                    title: 'Delivery processing',
                    description: 'Your order is being shipped',
                    order: n.order,
                    avatar: null,
                    type: 'order_shipped',
                    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
                    isUnRead: true,
                }
                break;

            default:
                n = {
                    id: faker.datatype.uuid(),
                    title: 'You are at day',
                    description: 'not new notification',
                    type: 'not_notify',
                    isUnRead: false,
                }
                break;
        }

        return n
    })

    return notis;
}
import { AsyncStorage } from 'react-native';
import { FLASH_CARDS_NOTIFICATION } from './constants';
import { Notifications, Permissions } from 'expo';

export const createNotification = () => {
  return {
    title: `Let's do a Review!!`,
    body: 'You should take a glance at your cards.',
    sound: true,
    vibrate: true
  }
}

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(FLASH_CARDS_NOTIFICATION)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(FLASH_CARDS_NOTIFICATION)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(19);
              tomorrow.setMinutes(30);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(FLASH_CARDS_NOTIFICATION, JSON.stringify(true));
            }
          })
      }
    });
}
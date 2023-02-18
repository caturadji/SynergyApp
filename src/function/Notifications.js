import { Notifications } from 'react-native-notifications'

export const registerRemoteNotification = () => {
    Notifications.registerRemoteNotifications();
    Notifications.events().registerRemoteNotificationsRegistered((event) => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log("Device Token Received", event.deviceToken);
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed((event) => {
        console.error('Fail Register', event);
    });
}

export const registerNotification = () => {
    Notifications.registerRemoteNotifications();
    Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
      console.log("Notification Received - Foreground", notification.payload);

      // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
      completion({alert: true, sound: true, badge: false});
    });

    Notifications.events().registerNotificationOpened((notification, completion, action) => {
      console.log("Notification opened by device user", notification.payload);
      console.log(`Notification opened with an action identifier: ${action.identifier} and response text: ${action.text}`);
      completion();
    });
        
    Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
      console.log("Notification Received - Background", notification.payload);

      // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
      completion({alert: true, sound: true, badge: false});
    });
}
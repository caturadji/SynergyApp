import { Platform, PermissionsAndroid, Alert } from 'react-native';
import { Notifications } from 'react-native-notifications';
import { RootNavigation } from './RootNavigation';
import messaging from '@react-native-firebase/messaging';

export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    async function requestNotifPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message: 'App needs permission for notification access',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // If Notification Permission is granted
          // registerRemoteNotification();
          // registerNotification();
          onAppBootstrap();
        } else {
          Alert.alert('Notification permission denied');
        }
      } catch (err) {
          Alert.alert('Notification permission err', err);
          console.warn(err);
      }      
    }
    // Calling the notification permission function
    if (Platform.Version < 33) {
        // registerRemoteNotification();
        // registerNotification();
        onAppBootstrap();
    } else {
        requestNotifPermission();

    }
  } else {
      // registerRemoteNotification();
      // registerNotification()
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        onAppBootstrap()
      }
  }
}

async function onAppBootstrap() {
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();

  console.log('Firebase Messaging token ', token)
}

const registerRemoteNotification = () => {
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
    Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
      console.log("Notification Received - Foreground", notification?.payload);

      let data = notification?.payload;

      Notifications.setNotificationChannel({
          channelId: 'my-notification-channel-id',
          name: 'My App',
          importance: 5,
          description: 'My Notification',
          enableLights: true,
          enableVibration: true,
          showBadge: true,
          vibrationPattern: [200, 1000, 500, 1000, 500],
      });

      Notifications.postLocalNotification(data);

      // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
      completion({alert: true, sound: true, badge: false});
    });

    Notifications.events().registerNotificationOpened((notification, completion, action) => {
      console.log("Notification opened by device user", notification?.payload);
      // console.log(`Notification opened with an action identifier: ${action?.identifier} and response text: ${action?.text}`);
      if (notification.payload?.page) {
        RootNavigation(notification.payload?.page, notification.payload?.id)
      }
      completion();
    });
        
    Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
      console.log("Notification Received - Background", notification?.payload);

      // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
      completion({alert: true, sound: true, badge: false});
    });
}

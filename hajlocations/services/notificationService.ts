import { Platform } from 'react-native';
import api from '@/api/axiosInstance';

// expo-notifications remote push is not available in Expo Go (removed in SDK 53).
// These functions are safe no-ops in Expo Go and will work in a native/dev build.

async function getToken(): Promise<string | null> {
  try {
    const Notifications = await import('expo-notifications');

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    const { status: existing } = await Notifications.getPermissionsAsync();
    let finalStatus = existing;
    if (existing !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') return null;

    const { data } = await Notifications.getExpoPushTokenAsync();
    return data;
  } catch {
    return null;
  }
}

export async function registerDeviceToken() {
  try {
    const token = await getToken();
    if (!token) return;
    const { data } = await api.post('/device/register', {
      fcm_token: token,
      platform: Platform.OS,
    });
    console.log('[Notifications]', data.data.message);
  } catch {
    // silent — non-critical
  }
}

export async function unregisterDeviceToken() {
  try {
    const { data } = await api.post('/device/unregister');
    console.log('[Notifications]', data.data.message);
  } catch {
    // silent — non-critical
  }
}

export function setupNotificationListeners() {
  let foregroundSub: any = null;
  let responseSub: any = null;

  import('expo-notifications')
    .then((Notifications) => {
      foregroundSub = Notifications.addNotificationReceivedListener((n) => {
        console.log('[Notifications] Received:', n.request.content.title);
      });
      responseSub = Notifications.addNotificationResponseReceivedListener((r) => {
        console.log('[Notifications] Tapped:', r.notification.request.content.data);
      });
    })
    .catch(() => {});

  return () => {
    foregroundSub?.remove();
    responseSub?.remove();
  };
}

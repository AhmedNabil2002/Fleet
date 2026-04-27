import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import api from '@/api/axiosInstance';

export const LOCATION_TASK = 'background-location-task';

// ─── Background task (native build only) ────────────────────────────────────

TaskManager.defineTask(LOCATION_TASK, async ({ data, error }: any) => {
  if (error) return;
  const locations: Location.LocationObject[] = data?.locations ?? [];
  if (!locations.length) return;
  const { coords } = locations[0];
  try {
    await sendLocationUpdate(coords.latitude, coords.longitude, coords.accuracy);
  } catch {
    // silent fail
  }
});

// ─── Shared API call ─────────────────────────────────────────────────────────

async function sendLocationUpdate(
  latitude: number,
  longitude: number,
  accuracy: number | null
) {
  await api.post('/location/update', {
    latitude,
    longitude,
    accuracy,
    timestamp: new Date().toISOString(),
  });
}

// ─── Foreground watcher (works in Expo Go) ───────────────────────────────────

let foregroundSubscription: Location.LocationSubscription | null = null;

export async function startForegroundTracking(
  onLocation?: (coords: { latitude: number; longitude: number }) => void
) {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    if (foregroundSubscription) return;

    foregroundSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10,
        timeInterval: 10000,
      },
      async (loc) => {
        const { latitude, longitude, accuracy } = loc.coords;
        onLocation?.({ latitude, longitude });
        try {
          await sendLocationUpdate(latitude, longitude, accuracy);
        } catch {
          // silent fail
        }
      }
    );
  } catch {
    // silent — permission denied or unavailable
  }
}

export function stopForegroundTracking() {
  foregroundSubscription?.remove();
  foregroundSubscription = null;
}

// ─── Background tracking (native build only) ─────────────────────────────────

export async function startLocationTracking() {
  try {
    const { status: fg } = await Location.requestForegroundPermissionsAsync();
    if (fg !== 'granted') return;

    const { status: bg } = await Location.requestBackgroundPermissionsAsync();
    if (bg !== 'granted') return;

    const isRunning = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK).catch(() => false);
    if (isRunning) return;

    await Location.startLocationUpdatesAsync(LOCATION_TASK, {
      accuracy: Location.Accuracy.High,
      distanceInterval: 10,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: 'تتبع الموقع',
        notificationBody: 'يتم تتبع موقعك لإخطار المشرف.',
      },
    });
  } catch {
    // Background location not available in Expo Go
  }
}

export async function stopLocationTracking() {
  try {
    const isRunning = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK).catch(() => false);
    if (isRunning) await Location.stopLocationUpdatesAsync(LOCATION_TASK);
  } catch {
    // silent
  }
}

export async function getCurrentLocation(): Promise<Location.LocationObject | null> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return null;
    return await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
  } catch {
    return null;
  }
}

import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import api from '@/api/axiosInstance';
import { startForegroundTracking, stopForegroundTracking } from '@/services/locationService';
import { HajjColors } from '@/constants/theme';

interface Coords {
  latitude: number;
  longitude: number;
}

interface MapMarker {
  id?: string | number;
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
}

function buildMapHTML(center: Coords, userLocation: Coords | null, markers: MapMarker[]): string {
  const userMarkerJS = userLocation ? `
    var userMarker = L.circleMarker(
      [${userLocation.latitude}, ${userLocation.longitude}],
      { radius: 10, fillColor: '${HajjColors.green}', fillOpacity: 1, color: '#fff', weight: 3 }
    ).addTo(map).bindPopup('<b>موقعي الحالي</b>');
  ` : '';

  const backendMarkersJS = markers.map((m) => `
    L.circleMarker(
      [${m.latitude}, ${m.longitude}],
      { radius: 9, fillColor: '${HajjColors.gold}', fillOpacity: 1, color: '#fff', weight: 2 }
    ).addTo(map).bindPopup('<b>${m.title ?? 'نقطة'}</b>');
  `).join('\n');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>* { margin:0; padding:0; } html,body,#map { width:100%; height:100%; }</style>
</head>
<body>
<div id="map"></div>
<script>
  var map = L.map('map').setView([${center.latitude}, ${center.longitude}], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  ${userMarkerJS}
  ${backendMarkersJS}

  function handleMsg(e) {
    try {
      var d = JSON.parse(e.data);
      if (d.type === 'LOC') {
        map.panTo([d.lat, d.lng]);
        if (typeof userMarker !== 'undefined') userMarker.setLatLng([d.lat, d.lng]);
      }
    } catch(e) {}
  }
  window.addEventListener('message', handleMsg);
  document.addEventListener('message', handleMsg);
</script>
</body>
</html>`;
}

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState<Coords | null>(null);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    startForegroundTracking((coords) => {
      setUserLocation(coords);
      setLoading(false);
      webViewRef.current?.postMessage(
        JSON.stringify({ type: 'LOC', lat: coords.latitude, lng: coords.longitude })
      );
    }).finally(() => setLoading(false));

    fetchMapData();
    const interval = setInterval(fetchMapData, 15000);
    return () => { stopForegroundTracking(); clearInterval(interval); };
  }, []);

  const fetchMapData = async () => {
    try {
      const { data } = await api.get('/map/data');
      setMarkers(data.data.markers ?? []);
    } catch { /* silent */ }
  };

  const center = userLocation ?? { latitude: 21.3891, longitude: 39.8579 };
  const html = buildMapHTML(center, userLocation, markers);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={HajjColors.green} />
          <Text style={styles.loadingText}>جارٍ تحديد الموقع...</Text>
        </View>
      )}

      <WebView
        ref={webViewRef}
        style={styles.map}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={['*']}
      />

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>🗺 الخريطة</Text>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: HajjColors.green }]} />
          <Text style={styles.legendText}>موقعي الحالي</Text>
        </View>
        {markers.length > 0 && (
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: HajjColors.gold }]} />
            <Text style={styles.legendText}>نقاط الخريطة ({markers.length})</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 10, justifyContent: 'center', alignItems: 'center',
    backgroundColor: HajjColors.cream,
  },
  loadingText: { marginTop: 12, color: HajjColors.textMuted, fontSize: 14 },
  legend: {
    position: 'absolute', bottom: 24, left: 16,
    backgroundColor: HajjColors.white, borderRadius: 12, padding: 14,
    borderLeftWidth: 4, borderLeftColor: HajjColors.green,
    elevation: 5, shadowColor: '#000', shadowOpacity: 0.15,
    shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, gap: 8,
  },
  legendTitle: { fontSize: 13, fontWeight: '700', color: HajjColors.greenDark, marginBottom: 4 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { fontSize: 13, color: HajjColors.textDark, fontWeight: '500' },
});

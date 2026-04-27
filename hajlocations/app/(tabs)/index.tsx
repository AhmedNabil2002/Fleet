import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import api from '@/api/axiosInstance';
import { startLocationTracking } from '@/services/locationService';
import { HajjColors } from '@/constants/theme';

interface Hotel {
  name: string | null;
  roomNo: string | null;
  roomType: string | null;
  hosting: string | null;
  entryDate: string | null;
  departureDate: string | null;
}

interface PassengerData {
  id: number;
  name: string;
  sales: string;
  gender: string;
  nationalId: string;
  passportNo: string;
  eNumber: string;
  visaNumber: string;
  phoneNo: string | null;
  groupNo: string;
  readyNo: string | null;
  visa: string;
  program: string;
  arrivalDate: string;
  arrivalDate2: string | null;
  originName: string;
  flightCode: string;
  flightClass: string;
  receptionTransport: string | null;
  hotel: Hotel;
  hotel2: Hotel;
  enhanceHotel: string;
  feelings: string;
  transportMethod: string;
  departureAirport: string;
  departureFlightCode: string;
  madinaTrainDate: string | null;
  makkaTrainDate: string | null;
  programCost: string;
  totalCost: number;
  paid: string;
  rest: string | null;
  medicalReports: string;
  airport: string | null;
  remarks: string | null;
  assignedSupervisor: string | null;
}

export default function HomeScreen() {
  const [passenger, setPassenger] = useState<PassengerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPassengerData();
    startLocationTracking();
  }, []);

  const fetchPassengerData = async () => {
    try {
      setError('');
      const { data } = await api.get('/passenger/details');
      setPassenger(data.data);
    } catch {
      setError('فشل تحميل البيانات. تحقق من الاتصال.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={HajjColors.green} />
        <Text style={styles.loadingText}>جارٍ التحميل...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={fetchPassengerData}>
          <Text style={styles.retryText}>إعادة المحاولة</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Header */}
      <View style={styles.banner}>
        <Text style={styles.bannerIcon}>🕋</Text>
        <Text style={styles.bannerName}>{passenger?.name}</Text>
        <Text style={styles.bannerSub}>{passenger?.program}</Text>
      </View>

      {/* Personal Info */}
      <SectionTitle title="البيانات الشخصية" icon="👤" />
      <Row label="الجنس" value={passenger?.gender} />
      <Row label="رقم الهوية" value={passenger?.nationalId} />
      <Row label="رقم الجواز" value={passenger?.passportNo} />
      <Row label="رقم الإيميج" value={passenger?.eNumber} />
      <Row label="رقم الفيزا" value={passenger?.visaNumber} />
      <Row label="رقم المجموعة" value={passenger?.groupNo} />
      <Row label="المبيعات" value={passenger?.sales} />

      {/* Flight Info */}
      <SectionTitle title="معلومات الرحلة" icon="✈️" />
      <Row label="مطار المغادرة" value={passenger?.departureAirport} />
      <Row label="رمز الرحلة (ذهاب)" value={passenger?.departureFlightCode} />
      <Row label="مطار الوصول" value={passenger?.originName} />
      <Row label="رمز الرحلة (عودة)" value={passenger?.flightCode} />
      <Row label="درجة السفر" value={passenger?.flightClass} />
      <Row label="تاريخ الوصول" value={passenger?.arrivalDate} />

      {/* Accommodation */}
      <SectionTitle title="الإقامة" icon="🏨" />
      <Row label="الفندق" value={passenger?.hotel?.name} />
      <Row label="رقم الغرفة" value={passenger?.hotel?.roomNo} />
      <Row label="نوع الغرفة" value={passenger?.hotel?.roomType} />
      <Row label="نظام الإقامة" value={passenger?.hotel?.hosting} />
      <Row label="تاريخ الدخول" value={passenger?.hotel?.entryDate} />
      <Row label="تاريخ المغادرة" value={passenger?.hotel?.departureDate} />
      <Row label="تحسين الفندق" value={passenger?.enhanceHotel} />
      <Row label="ملاحظات الغرفة" value={passenger?.feelings} />

      {/* Transport */}
      <SectionTitle title="النقل" icon="🚌" />
      <Row label="وسيلة النقل" value={passenger?.transportMethod} />
      <Row label="النقل الاستقبالي" value={passenger?.receptionTransport} />

      {/* Financial */}
      <SectionTitle title="المالية" icon="💰" />
      <Row label="تكلفة البرنامج" value={passenger?.programCost ? `${passenger.programCost} ج.م` : null} />
      <Row label="التكلفة الإجمالية" value={passenger?.totalCost ? `${passenger.totalCost} ج.م` : null} />
      <Row label="المدفوع" value={passenger?.paid ? `${passenger.paid} ج.م` : null} />
      <Row label="المتبقي" value={passenger?.rest ? `${passenger.rest} ج.م` : null} />
      <Row label="التقارير الطبية" value={passenger?.medicalReports ? `${passenger.medicalReports} ج.م` : null} />

      {/* Remarks */}
      {passenger?.remarks && (
        <>
          <SectionTitle title="ملاحظات" icon="📝" />
          <Row label="ملاحظات" value={passenger.remarks} />
        </>
      )}

    </ScrollView>
  );
}

function SectionTitle({ title, icon }: { title: string; icon: string }) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={styles.sectionTitleText}>{title}</Text>
      <Text style={styles.sectionTitleIcon}>{icon}</Text>
    </View>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: HajjColors.cream },
  content: { padding: 16, gap: 8, paddingBottom: 40 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: HajjColors.cream,
  },

  banner: {
    backgroundColor: HajjColors.green,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: HajjColors.goldDark,
  },
  bannerIcon: { fontSize: 36, marginBottom: 8 },
  bannerName: { fontSize: 18, fontWeight: 'bold', color: HajjColors.white, textAlign: 'center' },
  bannerSub: { fontSize: 13, color: HajjColors.goldLight, marginTop: 6, textAlign: 'center' },

  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  sectionTitleIcon: { fontSize: 16 },
  sectionTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: HajjColors.greenDark,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: HajjColors.white,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRightWidth: 3,
    borderRightColor: HajjColors.green,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  rowLabel: {
    fontSize: 13,
    color: HajjColors.gold,
    fontWeight: '700',
    flex: 1,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: HajjColors.textDark,
    flex: 2,
    textAlign: 'left',
  },

  loadingText: { marginTop: 12, color: HajjColors.textMuted, fontSize: 14 },
  errorIcon: { fontSize: 40, marginBottom: 12 },
  errorText: { fontSize: 15, color: HajjColors.error, marginBottom: 16, textAlign: 'center' },
  retryBtn: { backgroundColor: HajjColors.green, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  retryText: { color: HajjColors.white, fontWeight: '600' },
});

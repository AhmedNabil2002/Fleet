import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { HajjColors } from '@/constants/theme';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('تنبيه', 'الرجاء إدخال اسم المستخدم وكلمة المرور');
      return;
    }
    setLoading(true);
    try {
      await login(username, password);
    } catch {
      Alert.alert('خطأ', 'اسم المستخدم أو كلمة المرور غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.emblem}>
            <Text style={styles.emblemIcon}>🕌</Text>
          </View>
          <Text style={styles.appName}>نظام تتبع الحجاج</Text>
          <Text style={styles.subtitle}>دروب ترافيل </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>تسجيل الدخول</Text>

          <Text style={styles.inputLabel}>اسم المستخدم</Text>
          <TextInput
            style={styles.input}
            placeholder="أدخل اسم المستخدم"
            placeholderTextColor={HajjColors.textMuted}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            textAlign="right"
          />

          <Text style={styles.inputLabel}>كلمة المرور</Text>
          <TextInput
            style={styles.input}
            placeholder="أدخل كلمة المرور"
            placeholderTextColor={HajjColors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textAlign="right"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={HajjColors.white} />
            ) : (
              <Text style={styles.buttonText}>دخول</Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>بسم الله الرحمن الرحيم</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: HajjColors.cream },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },

  header: { alignItems: 'center', marginBottom: 32 },
  emblem: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: HajjColors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 3,
    borderColor: HajjColors.gold,
    elevation: 6,
    shadowColor: HajjColors.greenDark,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  emblemIcon: { fontSize: 40 },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: HajjColors.greenDark,
    marginBottom: 4,
  },
  subtitle: { fontSize: 14, color: HajjColors.gold, fontWeight: '600' },

  card: {
    backgroundColor: HajjColors.white,
    borderRadius: 16,
    padding: 24,
    borderTopWidth: 4,
    borderTopColor: HajjColors.green,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: HajjColors.greenDark,
    textAlign: 'center',
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: HajjColors.green,
    marginBottom: 6,
    textAlign: 'right',
  },
  input: {
    borderWidth: 1.5,
    borderColor: HajjColors.border,
    borderRadius: 10,
    padding: 13,
    marginBottom: 16,
    fontSize: 15,
    color: HajjColors.textDark,
    backgroundColor: HajjColors.cream,
  },

  button: {
    backgroundColor: HajjColors.green,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 4,
    borderWidth: 1,
    borderColor: HajjColors.goldDark,
  },
  buttonText: { color: HajjColors.white, fontSize: 17, fontWeight: 'bold' },

  footer: {
    textAlign: 'center',
    marginTop: 28,
    color: HajjColors.gold,
    fontSize: 14,
    fontWeight: '600',
  },
});

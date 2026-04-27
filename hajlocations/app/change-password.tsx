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
import { useRouter } from 'expo-router';
import api from '@/api/axiosInstance';
import { HajjColors } from '@/constants/theme';

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('تنبيه', 'يجب ملء جميع الحقول');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('خطأ', 'كلمتا المرور الجديدتان غير متطابقتين');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('خطأ', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    setLoading(true);
    try {
      await api.patch('/auth/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
      });
      Alert.alert('تم بنجاح', 'تم تغيير كلمة المرور بنجاح', [
        { text: 'حسناً', onPress: () => router.back() },
      ]);
    } catch (err: any) {
      const msg = err.response?.data?.message ?? 'حدث خطأ. حاول مجدداً.';
      Alert.alert('خطأ', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>🔑</Text>
        </View>
        <Text style={styles.title}>تغيير كلمة المرور</Text>

        <Text style={styles.label}>كلمة المرور الحالية</Text>
        <TextInput
          style={styles.input}
          placeholder="أدخل كلمة المرور الحالية"
          placeholderTextColor={HajjColors.textMuted}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          textAlign="right"
        />

        <Text style={styles.label}>كلمة المرور الجديدة</Text>
        <TextInput
          style={styles.input}
          placeholder="أدخل كلمة المرور الجديدة"
          placeholderTextColor={HajjColors.textMuted}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          textAlign="right"
        />

        <Text style={styles.label}>تأكيد كلمة المرور الجديدة</Text>
        <TextInput
          style={styles.input}
          placeholder="أعد إدخال كلمة المرور الجديدة"
          placeholderTextColor={HajjColors.textMuted}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          textAlign="right"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={HajjColors.white} />
          ) : (
            <Text style={styles.buttonText}>حفظ التغييرات</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: HajjColors.cream },
  content: { padding: 24, paddingBottom: 40 },

  iconWrap: {
    alignSelf: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: HajjColors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: HajjColors.gold,
  },
  icon: { fontSize: 32 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: HajjColors.greenDark,
    marginBottom: 28,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: HajjColors.green,
    textAlign: 'right',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: HajjColors.border,
    borderRadius: 10,
    padding: 13,
    marginBottom: 18,
    fontSize: 15,
    color: HajjColors.textDark,
    backgroundColor: HajjColors.white,
  },

  button: {
    backgroundColor: HajjColors.green,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: HajjColors.goldDark,
  },
  buttonText: { color: HajjColors.white, fontSize: 16, fontWeight: 'bold' },
});

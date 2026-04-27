import api from "@/api/axiosInstance";
import { HajjColors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
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
} from "react-native";

export default function ProfileScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { logout, user } = useAuth();

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("تنبيه", "يجب ملء جميع الحقول");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("خطأ", "كلمتا المرور الجديدتان غير متطابقتين");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("خطأ", "كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      Alert.alert("تم بنجاح ✓", data.data.message);
    } catch (err: any) {
      const msg = err.response?.data?.message ?? "حدث خطأ. حاول مجدداً.";
      Alert.alert("خطأ", msg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("تسجيل الخروج", "هل أنت متأكد؟", [
      { text: "إلغاء", style: "cancel" },
      { text: "خروج", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <Text style={styles.avatarTitle}>
            {user?.username ?? "الملف الشخصي"}
          </Text>
          <Text style={styles.avatarSub}>
            {user?.role === "passenger" ? "حاج" : user?.role}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <InfoRow label="اسم المستخدم" value={user?.username} />
          <InfoRow
            label="الدور"
            value={user?.role === "passenger" ? "حاج" : user?.role}
          />
          <InfoRow
            label="الحالة"
            value={user?.isActive ? "نشط ✓" : "غير نشط"}
            last
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🔑</Text>
            <Text style={styles.sectionTitle}>تغيير كلمة المرور</Text>
          </View>

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

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleChangePassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={HajjColors.white} />
            ) : (
              <Text style={styles.saveBtnText}>حفظ التغييرات</Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function InfoRow({
  label,
  value,
  last,
}: {
  label: string;
  value?: string | null;
  last?: boolean;
}) {
  return (
    <View style={[infoRowStyles.row, !last && infoRowStyles.rowBorder]}>
      <Text style={infoRowStyles.label}>{label}</Text>
      <Text style={infoRowStyles.value}>{value ?? "—"}</Text>
    </View>
  );
}

const infoRowStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    gap: 16,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: HajjColors.border,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: HajjColors.gold,
    minWidth: 90,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: HajjColors.textDark,
    textAlign: "left",
    flex: 1,
  },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: HajjColors.cream },
  content: { padding: 20, paddingBottom: 40, gap: 20 },

  infoCard: {
    backgroundColor: HajjColors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderTopWidth: 4,
    borderTopColor: HajjColors.gold,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  avatarWrap: { alignItems: "center", paddingVertical: 8 },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: HajjColors.green,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: HajjColors.gold,
    marginBottom: 12,
    elevation: 4,
    shadowColor: HajjColors.greenDark,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  avatarIcon: { fontSize: 42 },
  avatarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: HajjColors.greenDark,
  },
  avatarSub: {
    fontSize: 13,
    color: HajjColors.gold,
    marginTop: 4,
    fontWeight: "600",
  },

  section: {
    backgroundColor: HajjColors.white,
    borderRadius: 16,
    padding: 20,
    borderTopWidth: 4,
    borderTopColor: HajjColors.green,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 18,
  },
  sectionIcon: { fontSize: 20 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: HajjColors.greenDark,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: HajjColors.green,
    textAlign: "right",
    marginBottom: 6,
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

  saveBtn: {
    backgroundColor: HajjColors.green,
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: HajjColors.goldDark,
    marginTop: 4,
  },
  saveBtnText: { color: HajjColors.white, fontSize: 16, fontWeight: "bold" },

  logoutBtn: {
    backgroundColor: HajjColors.errorLight,
    borderWidth: 1.5,
    borderColor: HajjColors.error,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
  },
  logoutText: { color: HajjColors.error, fontWeight: "700", fontSize: 16 },
});

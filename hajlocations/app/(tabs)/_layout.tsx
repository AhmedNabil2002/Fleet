import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { HajjColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

function TabButton({
  activeColor,
  ...props
}: BottomTabBarButtonProps & { activeColor: string }) {
  const isSelected = props.accessibilityState?.selected;

  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}>
      {isSelected && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 12,
            right: 12,
            height: 3,
            borderRadius: 3,
            backgroundColor: activeColor,
          }}
        />
      )}
      {props.children}
    </PlatformPressable>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const activeColor = isDark ? HajjColors.gold : HajjColors.green;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: isDark ? '#6B8C74' : HajjColors.textMuted,
        tabBarStyle: {
          backgroundColor: isDark ? HajjColors.greenDark : HajjColors.white,
          borderTopColor: isDark ? HajjColors.goldDark : HajjColors.border,
          borderTopWidth: 1,
          elevation: 8,
          shadowOpacity: 0.1,
        },
        headerStyle: {
          backgroundColor: isDark ? HajjColors.greenDark : HajjColors.green,
        },
        headerTintColor: HajjColors.white,
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        headerTitleAlign: 'center',
        tabBarButton: (props) => <TabButton {...props} activeColor={activeColor} />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'بيانات الحاج',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="airplane" color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'الخريطة',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="map.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'الملف الشخصي',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

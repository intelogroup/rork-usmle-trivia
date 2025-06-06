import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Colors from '@/theme/colors';
import { Settings, Share2, HelpCircle, Shield, LogOut } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth/authStore';
import { router } from 'expo-router';

interface SettingsSectionProps {
  onShare: () => void;
}

export default function SettingsSection({ onShare }: SettingsSectionProps) {
  const { logout, isLoading } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out? Your progress will be saved.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              // Navigate to home tab after successful logout
              router.replace('/(tabs)');
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
              Alert.alert(
                'Sign Out Failed',
                `Could not sign out completely. ${errorMessage}`,
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      // Even on failure, the state is cleared, so we should still navigate
                      router.replace('/(tabs)');
                    },
                  },
                ]
              );
            }
          },
        },
      ]
    );
  };

  const settingsItems = [
    {
      icon: Settings,
      label: 'Preferences',
      onPress: () => console.log('Preferences'),
    },
    {
      icon: Share2,
      label: 'Share Progress',
      onPress: onShare,
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      onPress: () => console.log('Help'),
    },
    {
      icon: Shield,
      label: 'Privacy',
      onPress: () => console.log('Privacy'),
    },
    {
      icon: LogOut,
      label: isLoading ? 'Signing Out...' : 'Sign Out',
      onPress: handleLogout,
      isDestructive: true,
      disabled: isLoading,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.settingsList}>
        {settingsItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.settingItem,
              index === settingsItems.length - 1 && styles.lastSettingItem,
              item.disabled && styles.disabledSettingItem
            ]} 
            onPress={item.onPress}
            disabled={item.disabled}
          >
            <View style={[
              styles.settingIcon,
              item.isDestructive && styles.destructiveIcon,
              item.disabled && styles.disabledIcon
            ]}>
              <item.icon 
                size={20} 
                color={
                  item.disabled 
                    ? Colors.dark.textSecondary 
                    : item.isDestructive 
                      ? Colors.dark.error 
                      : Colors.dark.primary
                } 
              />
            </View>
            <Text style={[
              styles.settingLabel,
              item.isDestructive && styles.destructiveLabel,
              item.disabled && styles.disabledLabel
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 16,
  },
  settingsList: {
    flexDirection: 'column',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  lastSettingItem: {
    marginBottom: 0,
  },
  disabledSettingItem: {
    opacity: 0.6,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  destructiveIcon: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  disabledIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark.text,
  },
  destructiveLabel: {
    color: Colors.dark.error,
    fontWeight: '600',
  },
  disabledLabel: {
    color: Colors.dark.textSecondary,
  },
});
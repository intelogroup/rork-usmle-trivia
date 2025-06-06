import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Bell } from 'lucide-react-native';
import Colors from '@/theme/colors';
import { useAuthStore } from '@/store/auth/authStore';

export default function TopBar() {
  const { user, profile } = useAuthStore();

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleNotificationsPress = () => {
    // TODO: Implement notifications
    console.log('Notifications pressed');
  };

  const renderBrandName = () => {
    const triviaColors = [
      '#3B82F6', // Blue
      '#EAB308', // Yellow
      '#10B981', // Green
      '#F97316', // Orange
      '#EF4444', // Red
      '#8B5CF6', // Purple
    ];

    return (
      <View style={styles.brandContainer}>
        <Text style={styles.usmleText}>USMLE</Text>
        <View style={styles.triviaContainer}>
          {['T', 'R', 'I', 'V', 'I', 'A'].map((letter, index) => (
            <Text 
              key={index} 
              style={[
                styles.triviaLetter, 
                { color: triviaColors[index] }
              ]}
            >
              {letter}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {renderBrandName()}
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton} onPress={handleNotificationsPress}>
          <Bell size={16} color={Colors.dark.textSecondary} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.avatarButton} onPress={handleProfilePress}>
          {user?.user_metadata?.avatar_url ? (
            <Image source={{ uri: user.user_metadata.avatar_url }} style={styles.avatar} />
          ) : (
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' }} 
              style={styles.avatar} 
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.dark.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    height: 56,
  },
  leftSection: {
    flex: 1,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  usmleText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.dark.text,
    letterSpacing: 0.5,
  },
  triviaContainer: {
    flexDirection: 'row',
  },
  triviaLetter: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.card,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.dark.error,
  },
  avatarButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
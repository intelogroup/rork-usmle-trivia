import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '@/theme/colors';
import { Camera, Edit3 } from 'lucide-react-native';
import type { User } from '@supabase/supabase-js';
import type { UserProfile } from '@/lib/types/auth';

interface ProfileHeaderProps {
  user: User;
  profile?: UserProfile | null;
}

export default function ProfileHeader({ user, profile }: ProfileHeaderProps) {
  const handleEditProfile = () => {
    // TODO: Implement edit profile functionality
    console.log('Edit profile');
  };

  const handleChangeAvatar = () => {
    // TODO: Implement avatar change functionality
    console.log('Change avatar');
  };

  const displayName = profile?.username || user.user_metadata?.username || user.email?.split('@')[0] || 'User';
  const joinDate = profile?.created_at || user.created_at;
  const level = profile?.level || 1;

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {user.user_metadata?.avatar_url ? (
          <Image source={{ uri: user.user_metadata.avatar_url }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <TouchableOpacity style={styles.cameraButton} onPress={handleChangeAvatar}>
          <Camera size={16} color={Colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>LVL {level}</Text>
        </View>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.username}>{displayName}</Text>
          <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
            <Edit3 size={18} color={Colors.dark.textSecondary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.joinDate}>
          Joined {new Date(joinDate).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 24,
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    shadowColor: Colors.dark.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: Colors.dark.primary,
  },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.dark.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: Colors.dark.primaryLight,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.dark.card,
    borderWidth: 2,
    borderColor: Colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelBadge: {
    position: 'absolute',
    bottom: -10,
    left: -10,
    backgroundColor: Colors.dark.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.dark.background,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  userInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  username: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.dark.text,
    marginRight: 12,
  },
  editButton: {
    padding: 6,
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 12,
  },
  email: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    marginBottom: 6,
    textAlign: 'center',
  },
  joinDate: {
    fontSize: 14,
    color: Colors.dark.textTertiary,
    backgroundColor: Colors.dark.cardHighlight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
});
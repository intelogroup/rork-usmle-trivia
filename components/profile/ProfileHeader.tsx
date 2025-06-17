import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import Colors from '@/theme/colors';
import { Camera, Edit3, X, Check } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth/authStore';
import type { LocalUser, UserProfile } from '@/lib/types/auth';

interface ProfileHeaderProps {
  user: LocalUser;
  profile?: UserProfile | null;
}

export default function ProfileHeader({ user, profile }: ProfileHeaderProps) {
  const { updateProfile } = useAuthStore();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedUsername, setEditedUsername] = useState(profile?.username || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEditProfile = () => {
    setEditedUsername(profile?.username || '');
    setIsEditModalVisible(true);
  };

  const handleSaveProfile = async () => {
    if (!editedUsername.trim()) {
      Alert.alert('Error', 'Username cannot be empty');
      return;
    }

    if (editedUsername === profile?.username) {
      setIsEditModalVisible(false);
      return;
    }

    setIsUpdating(true);
    try {
      await updateProfile({ username: editedUsername.trim() });
      setIsEditModalVisible(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangeAvatar = () => {
    Alert.alert(
      'Change Avatar',
      'Avatar upload feature coming soon!',
      [{ text: 'OK' }]
    );
  };

  const displayName = profile?.username || user.user_metadata?.username || user.email?.split('@')[0] || 'User';
  const joinDate = profile?.created_at || user.created_at;
  const level = profile?.level || 1;

  return (
    <>
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

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity 
                onPress={() => setIsEditModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color={Colors.dark.textSecondary} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                style={styles.textInput}
                value={editedUsername}
                onChangeText={setEditedUsername}
                placeholder="Enter username"
                placeholderTextColor={Colors.dark.textSecondary}
                autoFocus
                maxLength={30}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.saveButton, isUpdating && styles.saveButtonDisabled]}
                onPress={handleSaveProfile}
                disabled={isUpdating}
              >
                <Check size={16} color={Colors.dark.background} />
                <Text style={styles.saveButtonText}>
                  {isUpdating ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  closeButton: {
    padding: 4,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.dark.text,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.dark.cardHighlight,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.textSecondary,
  },
  saveButton: {
    flex: 1,
    backgroundColor: Colors.dark.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.background,
  },
});
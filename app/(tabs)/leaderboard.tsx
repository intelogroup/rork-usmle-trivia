import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/theme/colors';
import { leaderboardData } from '@/mocks/leaderboard';
import LeaderboardItem from '@/components/LeaderboardItem';
import { Trophy } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth/authStore';

export default function LeaderboardScreen() {
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  
  const renderHeader = () => (
    <View style={styles.header}>
      <Stack.Screen 
        options={{ 
          headerStyle: { backgroundColor: Colors.dark.background },
          headerTintColor: Colors.dark.text,
          title: 'Leaderboard',
          headerShadowVisible: false,
        }} 
      />
      <View style={styles.headerContent}>
        <View style={styles.headerIcon}>
          <Trophy size={24} color={Colors.dark.primary} />
        </View>
        <View>
          <Text style={styles.headerTitle}>Global Rankings</Text>
          <Text style={styles.headerSubtitle}>
            Compete with players worldwide
          </Text>
        </View>
      </View>
    </View>
  );
  
  const renderItem = ({ item, index }: { item: any, index: number }) => (
    <LeaderboardItem
      rank={index + 1}
      username={item.username}
      score={item.score}
      avatar={item.avatar}
      isCurrentUser={item.id === user?.id}
    />
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.dark.primary}
            colors={[Colors.dark.primary]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  header: {
    marginBottom: 24,
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
});
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Colors from '@/theme/colors';
import { Crown, Medal } from 'lucide-react-native';

interface LeaderboardItemProps {
  rank: number;
  username: string;
  score: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export default function LeaderboardItem({ 
  rank, 
  username, 
  score, 
  avatar,
  isCurrentUser = false 
}: LeaderboardItemProps) {
  const isTopThree = rank <= 3;
  
  const RankIcon = () => {
    if (rank === 1) return <Crown size={16} color="#FFD700" />;
    if (rank === 2) return <Medal size={16} color="#C0C0C0" />;
    if (rank === 3) return <Medal size={16} color="#CD7F32" />;
    return null;
  };
  
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        isCurrentUser && styles.currentUserContainer,
        isTopThree && styles.topRankContainer,
        pressed && styles.pressed
      ]}
    >
      <View style={[
        styles.rankContainer,
        rank === 1 && styles.firstRank,
        rank === 2 && styles.secondRank,
        rank === 3 && styles.thirdRank
      ]}>
        {isTopThree ? (
          <RankIcon />
        ) : (
          <Text style={[
            styles.rankText,
            isTopThree && styles.topRankText
          ]}>
            {rank}
          </Text>
        )}
      </View>

      <Image 
        source={{ uri: avatar }}
        style={styles.avatar}
      />
      
      <View style={styles.userInfo}>
        <Text style={[
          styles.username,
          isCurrentUser && styles.currentUserText,
          isTopThree && styles.topThreeText
        ]} numberOfLines={1}>
          {username}
        </Text>
        
        <Text style={[
          styles.score,
          isCurrentUser && styles.currentUserScore
        ]}>
          {score.toLocaleString()} pts
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  currentUserContainer: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderColor: Colors.dark.primary,
    borderWidth: 1,
  },
  topRankContainer: {
    paddingVertical: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
  },
  rankContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.cardHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  firstRank: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  secondRank: {
    backgroundColor: 'rgba(192, 192, 192, 0.1)',
  },
  thirdRank: {
    backgroundColor: 'rgba(205, 127, 50, 0.1)',
  },
  rankText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  topRankText: {
    color: Colors.dark.primary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: Colors.dark.border,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 2,
  },
  score: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  currentUserText: {
    color: Colors.dark.primary,
  },
  currentUserScore: {
    color: Colors.dark.primary,
  },
  topThreeText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
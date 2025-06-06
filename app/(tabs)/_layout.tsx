import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import TopBar from '@/components/ui/TopBar';
import Colors from '@/theme/colors';
import { Home, Trophy, BarChart3, Brain } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.dark.background }}>
      <View style={{ paddingTop: insets.top }}>
        <TopBar />
      </View>
      
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.dark.primary,
          tabBarInactiveTintColor: Colors.dark.textTertiary,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
              backgroundColor: 'rgba(30, 30, 30, 0.9)',
              borderTopColor: 'rgba(255, 255, 255, 0.1)',
            },
            default: {
              backgroundColor: Colors.dark.background,
              borderTopColor: 'rgba(255, 255, 255, 0.1)',
            },
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="quiz"
          options={{
            title: 'Quiz',
            tabBarIcon: ({ color }) => <Brain size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="leaderboard"
          options={{
            title: 'Leaderboard',
            tabBarIcon: ({ color }) => <Trophy size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color }) => <BarChart3 size={24} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
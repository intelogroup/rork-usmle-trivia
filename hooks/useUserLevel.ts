import { useAuthStore } from '@/store/auth/authStore';

export function useUserLevel() {
  const { profile } = useAuthStore();

  const getUserLevel = () => {
    if (!profile) {
      return { 
        level: 1, 
        progress: 0,
        experienceToNext: 100
      };
    }

    const level = profile.level || 1;
    const experience = profile.experience_points || 0;
    const nextLevelExp = level * 100;
    const currentLevelExp = (level - 1) * 100;
    const progress = (experience - currentLevelExp) / (nextLevelExp - currentLevelExp);
    
    return { 
      level, 
      progress: Math.max(0, Math.min(1, progress)),
      experienceToNext: Math.max(0, nextLevelExp - experience)
    };
  };

  return getUserLevel();
}
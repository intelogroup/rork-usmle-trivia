export function calculateLevel(experiencePoints: number): {
  level: number;
  progress: number;
  experienceToNext: number;
} {
  const level = Math.floor(experiencePoints / 100) + 1;
  const nextLevelExp = level * 100;
  const currentLevelExp = (level - 1) * 100;
  const progress = (experiencePoints - currentLevelExp) / (nextLevelExp - currentLevelExp);
  
  return {
    level,
    progress: Math.max(0, Math.min(1, progress)),
    experienceToNext: nextLevelExp - experiencePoints,
  };
}

export function calculateQuizScore(correct: number, total: number): number {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

export function calculateWeeklyProgress(weeklyQuizzes: number, target: number = 7): number {
  return Math.min((weeklyQuizzes / target) * 100, 100);
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 30) return '🔥';
  if (streak >= 14) return '⚡';
  if (streak >= 7) return '🌟';
  return '💫';
}

export function getLevelInfo(level: number): {
  color: string;
  title: string;
} {
  if (level >= 20) {
    return { color: '#F59E0B', title: 'Master' };
  } else if (level >= 10) {
    return { color: '#7C5DF0', title: 'Expert' };
  } else if (level >= 5) {
    return { color: '#06B6D4', title: 'Advanced' };
  } else if (level >= 2) {
    return { color: '#10B981', title: 'Intermediate' };
  }
  return { color: '#10B981', title: 'Beginner' };
}
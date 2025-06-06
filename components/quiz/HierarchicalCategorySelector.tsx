import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '@/theme/colors';
import { UsmleCategory } from '@/lib/types/usmle';
import { ChevronDown, ChevronUp, CheckSquare, Square } from 'lucide-react-native';

interface HierarchicalCategorySelectorProps {
  categories: UsmleCategory[];
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
  isLoading: boolean;
}

interface GroupedCategories {
  [key: string]: UsmleCategory[];
}

export default function HierarchicalCategorySelector({
  categories,
  selectedCategories,
  onToggleCategory,
  isLoading,
}: HierarchicalCategorySelectorProps) {
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({
    Subject: true,
    System: true,
    'General Principles': true,
  });

  // Group categories by their grouping field
  const groupedCategories = useMemo(() => {
    const groups: GroupedCategories = {
      Subject: [],
      System: [],
      'General Principles': [],
    };

    // Filter out top-level group categories (those with parent_id null) and group the rest
    categories.forEach(category => {
      if (category.parent_id !== null && category.grouping in groups) {
        groups[category.grouping].push(category);
      }
    });

    return groups;
  }, [categories]);

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const toggleSelectAll = (group: string) => {
    const groupCategories = groupedCategories[group];
    const allSelected = groupCategories.every(cat => selectedCategories.includes(cat.id));

    if (allSelected) {
      // Deselect all in this group
      groupCategories.forEach(cat => {
        if (selectedCategories.includes(cat.id)) {
          onToggleCategory(cat.id);
        }
      });
    } else {
      // Select all in this group
      groupCategories.forEach(cat => {
        if (!selectedCategories.includes(cat.id)) {
          onToggleCategory(cat.id);
        }
      });
    }
  };

  const renderGroup = (group: string) => {
    const isExpanded = expandedGroups[group];
    const groupCategories = groupedCategories[group];
    const allSelected = groupCategories.length > 0 && groupCategories.every(cat => selectedCategories.includes(cat.id));

    if (groupCategories.length === 0) return null;

    return (
      <View key={group} style={styles.groupContainer}>
        <TouchableOpacity
          style={styles.groupHeader}
          onPress={() => toggleGroup(group)}
        >
          <View style={styles.groupTitleContainer}>
            {isExpanded ? (
              <ChevronUp size={20} color={Colors.dark.text} />
            ) : (
              <ChevronDown size={20} color={Colors.dark.text} />
            )}
            <Text style={styles.groupTitle}>{group}</Text>
          </View>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              toggleSelectAll(group);
            }}
            style={styles.selectAllButton}
          >
            {allSelected ? (
              <CheckSquare size={18} color={Colors.dark.primary} />
            ) : (
              <Square size={18} color={Colors.dark.textSecondary} />
            )}
            <Text style={styles.selectAllText}>All</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.categoryList}>
            {groupCategories.map(category => {
              const isSelected = selectedCategories.includes(category.id);
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    isSelected && styles.categoryItemSelected,
                  ]}
                  onPress={() => onToggleCategory(category.id)}
                >
                  {isSelected ? (
                    <CheckSquare size={18} color={Colors.dark.primary} style={styles.categoryIcon} />
                  ) : (
                    <Square size={18} color={Colors.dark.textSecondary} style={styles.categoryIcon} />
                  )}
                  <Text style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextSelected,
                  ]}>
                    {category.name}
                  </Text>
                  {category.questionCount > 0 && (
                    <View style={styles.questionCountBadge}>
                      <Text style={styles.questionCountText}>{category.questionCount}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Categories</Text>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading categories...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer} nestedScrollEnabled>
          {renderGroup('Subject')}
          {renderGroup('System')}
          {renderGroup('General Principles')}
        </ScrollView>
      )}
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
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Colors.dark.textSecondary,
    fontSize: 16,
  },
  scrollContainer: {
    maxHeight: 400,
  },
  groupContainer: {
    marginBottom: 16,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  groupTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginLeft: 8,
  },
  selectAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllText: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    marginLeft: 6,
  },
  categoryList: {
    marginTop: 8,
    paddingLeft: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  categoryItemSelected: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.primary,
  },
  categoryIcon: {
    marginRight: 12,
  },
  categoryText: {
    fontSize: 16,
    color: Colors.dark.text,
    flex: 1,
  },
  categoryTextSelected: {
    fontWeight: '500',
    color: Colors.dark.primaryLight,
  },
  questionCountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionCountText: {
    color: Colors.dark.text,
    fontSize: 12,
    fontWeight: '500',
  },
});
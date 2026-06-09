import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, useWindowDimensions } from 'react-native';

const filterOptions = [
  { key: 'all', label: 'Semua' },
  { key: 'pending', label: 'Belum' },
  { key: 'completed', label: 'Selesai' },
];

export default function HomeScreen({ navigation, tasks, toggleTaskStatus, deleteTask }) {
  const [filter, setFilter] = useState('all');
  const { width } = useWindowDimensions();

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    return !task.completed;
  });

  return (
    <View style={[styles.container, width >= 768 && styles.containerWide]}>
      <View style={styles.headerRow}>
        <Text style={styles.screenTitle}>Daftar Tugas</Text>
        <Pressable style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
          <Text style={styles.addButtonText}>Tambah Tugas</Text>
        </Pressable>
      </View>

      <View style={styles.filterRow}>
        {filterOptions.map((option) => (
          <Pressable
            key={option.key}
            style={[
              styles.filterButton,
              filter === option.key && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(option.key)}
          >
            <Text
              style={[
                styles.filterText,
                filter === option.key && styles.filterTextActive,
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {filteredTasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Tidak ada tugas.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <View style={styles.taskHeader}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={[styles.statusLabel, item.completed ? styles.statusDone : styles.statusPending]}>
                  {item.completed ? 'Selesai' : 'Belum'}
                </Text>
              </View>
              <Text style={styles.categoryText}>{item.category}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>

              <View style={styles.actionRow}>
                <Pressable style={[styles.actionButton, styles.toggleButton]} onPress={() => toggleTaskStatus(item.id)}>
                  <Text style={styles.actionText}>{item.completed ? 'Batalkan Selesai' : 'Selesai'}</Text>
                </Pressable>
                <Pressable style={[styles.actionButton, styles.detailButton]} onPress={() => navigation.navigate('TaskDetail', { task: item })}>
                  <Text style={styles.actionText}>Detail</Text>
                </Pressable>
                <Pressable style={[styles.actionButton, styles.deleteButton]} onPress={() => deleteTask(item.id)}>
                  <Text style={styles.actionText}>Hapus</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7fb',
  },
  containerWide: {
    paddingHorizontal: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
  },
  filterText: {
    color: '#374151',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  emptyState: {
    padding: 24,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '700',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    overflow: 'hidden',
  },
  statusDone: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  statusPending: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 14,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: 90,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#10b981',
  },
  detailButton: {
    backgroundColor: '#3b82f6',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  actionText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

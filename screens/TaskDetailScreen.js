import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';

export default function TaskDetailScreen({ route, navigation }) {
  const task = route.params?.task;

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Tugas tidak ditemukan.</Text>
        <Pressable style={styles.navigationButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navigationButtonText}>Kembali</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <View style={styles.detailCard}>
        <Text style={styles.detailLabel}>Kategori</Text>
        <Text style={styles.detailValue}>{task.category}</Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.detailLabel}>Status</Text>
        <Text style={[styles.detailValue, task.completed ? styles.doneText : styles.pendingText]}>
          {task.completed ? 'Selesai' : 'Belum'}
        </Text>
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.detailLabel}>Deskripsi Lengkap</Text>
        <Text style={styles.descriptionText}>{task.description}</Text>
      </View>
      <Pressable style={styles.navigationButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.navigationButtonText}>Kembali ke Home</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 18,
  },
  detailCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 16,
    color: '#111827',
  },
  descriptionText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  doneText: {
    color: '#047857',
  },
  pendingText: {
    color: '#b91c1c',
  },
  navigationButton: {
    marginTop: 12,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  navigationButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 16,
    color: '#b91c1c',
    marginBottom: 18,
  },
});

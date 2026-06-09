import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';

export default function AddTaskScreen({ navigation, onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Judul tugas wajib diisi.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Judul minimal 3 karakter.';
    }

    if (!description.trim()) {
      newErrors.description = 'Deskripsi tugas wajib diisi.';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Deskripsi minimal 10 karakter.';
    }

    if (!category.trim()) {
      newErrors.category = 'Kategori tugas wajib diisi.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const newTask = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.field}>
        <Text style={styles.label}>Judul Tugas</Text>
        <TextInput
          style={[styles.input, errors.title && styles.inputError]}
          placeholder="Contoh: Menyelesaikan laporan"
          value={title}
          onChangeText={setTitle}
          autoCorrect={false}
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Deskripsi Tugas</Text>
        <TextInput
          style={[styles.input, styles.multilineInput, errors.description && styles.inputError]}
          placeholder="Contoh: Buat laporan tugas akhir dan kirim sebelum jam 5 sore"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Kategori</Text>
        <TextInput
          style={[styles.input, errors.category && styles.inputError]}
          placeholder="Contoh: Kuliah, Pribadi, Organisasi"
          value={category}
          onChangeText={setCategory}
          autoCorrect={false}
        />
        {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Simpan Tugas</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  multilineInput: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    marginTop: 6,
    color: '#b91c1c',
    fontSize: 13,
  },
  submitButton: {
    marginTop: 6,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

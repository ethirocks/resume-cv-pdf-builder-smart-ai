import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { FormData } from '../types';

interface TitleSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const TitleSection: React.FC<TitleSectionProps> = ({ formData, setFormData }) => {
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Personal Information</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) => handleChange('name', value)}
        style={styles.input}
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
        style={styles.input}
      />
      <Text style={styles.label}>Phone:</Text>
      <TextInput
        placeholder="Phone"
        value={formData.phone}
        onChangeText={(value) => handleChange('phone', value)}
        style={styles.input}
      />
      <Text style={styles.label}>LinkedIn:</Text>
      <TextInput
        placeholder="LinkedIn"
        value={formData.linkedin}
        onChangeText={(value) => handleChange('linkedin', value)}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
});

export default TitleSection;

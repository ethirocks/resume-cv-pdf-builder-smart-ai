import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { FormData } from '../types';

interface SkillsSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ formData, setFormData }) => {
  const handleSkillsChange = (value: string) => {
    setFormData({ ...formData, skills: value });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Skills</Text>
      <TextInput
        placeholder="Enter your skills separated by commas"
        value={formData.skills}
        onChangeText={handleSkillsChange}
        style={styles.input}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
});

export default SkillsSection;

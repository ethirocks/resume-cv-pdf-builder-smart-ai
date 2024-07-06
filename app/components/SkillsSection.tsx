// components/SkillsSection.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface SkillsSectionProps {
  formData: { skills: string };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ formData, setFormData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Skills</Text>
      <TextInput
        style={styles.input}
        placeholder="Skills"
        value={formData.skills}
        onChangeText={(text) => setFormData((prev: any) => ({ ...prev, skills: text }))}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default SkillsSection;

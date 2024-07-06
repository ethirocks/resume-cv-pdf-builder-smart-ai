// components/TitleSection.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface TitleSectionProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const TitleSection: React.FC<TitleSectionProps> = ({ formData, setFormData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Resume</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => setFormData((prev: any) => ({ ...prev, name: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData((prev: any) => ({ ...prev, email: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={formData.phone}
        onChangeText={(text) => setFormData((prev: any) => ({ ...prev, phone: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="LinkedIn"
        value={formData.linkedin}
        onChangeText={(text) => setFormData((prev: any) => ({ ...prev, linkedin: text }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default TitleSection;

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function CreateCV() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
    publications: '',
    awards: '',
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const generatePDF = async () => {
    const htmlContent = `
      <html>
        <body>
          <h1>${formData.name}</h1>
          <p>Email: ${formData.email}</p>
          <p>Phone: ${formData.phone}</p>
          <h2>Education</h2>
          <p>${formData.education}</p>
          <h2>Experience</h2>
          <p>${formData.experience}</p>
          <h2>Skills</h2>
          <p>${formData.skills}</p>
          <h2>Publications</h2>
          <p>${formData.publications}</p>
          <h2>Awards</h2>
          <p>${formData.awards}</p>
        </body>
      </html>
    `;
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await shareAsync(uri);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create CV</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={formData.phone}
        onChangeText={(text) => handleInputChange('phone', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Education"
        value={formData.education}
        onChangeText={(text) => handleInputChange('education', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Experience"
        value={formData.experience}
        onChangeText={(text) => handleInputChange('experience', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Skills"
        value={formData.skills}
        onChangeText={(text) => handleInputChange('skills', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Publications"
        value={formData.publications}
        onChangeText={(text) => handleInputChange('publications', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Awards"
        value={formData.awards}
        onChangeText={(text) => handleInputChange('awards', text)}
      />
      <TouchableOpacity style={styles.button} onPress={generatePDF}>
        <Text style={styles.buttonText}>Generate PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

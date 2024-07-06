import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import TitleSection from './components/TitleSection';
import EducationSection from './components/EducationSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';

export default function CreateResume() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    education: [{ institution: '', degree: '', startDate: new Date(), endDate: new Date(), currently: false, description: '' }],
    experience: [{ company: '', role: '', startDate: new Date(), endDate: new Date(), currently: false, description: '' }],
    skills: '',
  });

  const generatePDF = async () => {
    const educationEntries = formData.education.map((edu) => `
      <h3>${edu.institution}</h3>
      <p>${edu.degree}</p>
      <p style="text-align: right;">${edu.startDate.toDateString()} - ${edu.currently ? 'Present' : edu.endDate?.toDateString()}</p>
      <p>${edu.description}</p>
    `).join('');

    const experienceEntries = formData.experience.map((exp) => `
      <h3>${exp.company}</h3>
      <p>${exp.role}</p>
      <p style="text-align: right;">${exp.startDate.toDateString()} - ${exp.currently ? 'Present' : exp.endDate?.toDateString()}</p>
      <ul>${exp.description.split('\n').map(item => `<li>${item}</li>`).join('')}</ul>
    `).join('');

    const htmlContent = `
      <html>
        <body>
          <h1 style="text-align: center;">${formData.name}</h1>
          <p>Email: ${formData.email}</p>
          <p>Phone: ${formData.phone}</p>
          <p>LinkedIn: ${formData.linkedin}</p>
          <hr />
          <h2>Education</h2>
          ${educationEntries}
          <hr />
          <h2>Experience</h2>
          ${experienceEntries}
          <hr />
          <h2>Skills</h2>
          <p>${formData.skills}</p>
        </body>
      </html>
    `;
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await shareAsync(uri);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TitleSection formData={formData} setFormData={setFormData} />
      <EducationSection formData={formData} setFormData={setFormData} />
      <ExperienceSection formData={formData} setFormData={setFormData} />
      <SkillsSection formData={formData} setFormData={setFormData} />
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
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

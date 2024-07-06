import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View, Linking, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import TitleSection from './components/TitleSection';
import EducationSection from './components/EducationSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import { FormData } from './types';
import { generatePDFDocument, generateWordDocument } from './utils/generateDocument';
import { FontAwesome } from '@expo/vector-icons';

export default function CreateResume() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    education: [{ institution: '', degree: '', startDate: new Date(), endDate: new Date(), currently: false, description: '' }],
    experience: [{ company: '', role: '', startDate: new Date(), endDate: new Date(), currently: false, description: '' }],
    skills: '',
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const [shareOption, setShareOption] = useState<'email' | 'whatsapp' | null>(null);

  const generateDocument = async (format: 'pdf' | 'docx') => {
    if (format === 'pdf') {
      const uri = await generatePDFDocument(formData);
      await Sharing.shareAsync(uri);
    } else if (format === 'docx') {
      const uri = await generateWordDocument(formData);
      await Sharing.shareAsync(uri);
    }
  };

  const handleShare = async () => {
    const uri = await generatePDFDocument(formData);
    if (shareOption === 'email') {
      const emailUrl = `mailto:?subject=My Resume&body=Please find my resume attached.&attachment=${uri}`;
      Linking.openURL(emailUrl);
    } else if (shareOption === 'whatsapp') {
      Linking.openURL(`whatsapp://send?text=Check out my resume&attachment=${uri}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TitleSection formData={formData} setFormData={setFormData} />
      <EducationSection formData={formData} setFormData={setFormData} />
      <ExperienceSection formData={formData} setFormData={setFormData} />
      <SkillsSection formData={formData} setFormData={setFormData} />

      <TouchableOpacity style={styles.generateButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Generate Document</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shareButton} onPress={() => setShareModalVisible(true)}>
        <FontAwesome name="share-alt" size={24} color="#fff" />
        <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Select Document Format</Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => { generateDocument('pdf'); setModalVisible(false); }}>
            <Text style={styles.modalButtonText}>Generate PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => { generateDocument('docx'); setModalVisible(false); }}>
            <Text style={styles.modalButtonText}>Generate Word</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isShareModalVisible}
        onRequestClose={() => setShareModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Share Options</Text>
          <TouchableOpacity style={[styles.modalButton, styles.emailButton]} onPress={() => { setShareOption('email'); handleShare(); setShareModalVisible(false); }}>
            <FontAwesome name="envelope" size={24} color="#fff" />
            <Text style={styles.modalButtonText}>Share via Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.whatsappButton]} onPress={() => { setShareOption('whatsapp'); handleShare(); setShareModalVisible(false); }}>
            <FontAwesome name="whatsapp" size={24} color="#fff" />
            <Text style={styles.modalButtonText}>Share via WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setShareModalVisible(false)}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  generateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
  },
  shareButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  modalButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  emailButton: {
    backgroundColor: '#d9534f',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
});

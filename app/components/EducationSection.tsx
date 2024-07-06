import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Education, FormData } from '../types';

interface EducationSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const EducationSection: React.FC<EducationSectionProps> = ({ formData, setFormData }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentField, setCurrentField] = useState<keyof Education | null>(null);

  const handleChange = (index: number, field: keyof Education, value: string | boolean | Date) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData({ ...formData, education: newEducation });
  };

  const handleDateConfirm = (date: Date) => {
    if (currentIndex !== null && currentField) {
      handleChange(currentIndex, currentField, date);
      setCurrentIndex(null);
      setCurrentField(null);
      setShowDatePicker(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Education</Text>
      {formData.education.map((edu, index) => (
        <View key={index} style={styles.section}>
          <Text>Institution:</Text>
          <TextInput
            style={styles.input}
            value={edu.institution}
            onChangeText={(text) => handleChange(index, 'institution', text)}
            placeholder="Institution"
          />
          <Text>Degree:</Text>
          <TextInput
            style={styles.input}
            value={edu.degree}
            onChangeText={(text) => handleChange(index, 'degree', text)}
            placeholder="Degree"
          />
          <Text>Description:</Text>
          <TextInput
            style={styles.input}
            value={edu.description}
            onChangeText={(text) => handleChange(index, 'description', text)}
            placeholder="Description"
            multiline
          />
          <TouchableOpacity style={styles.dateButton} onPress={() => { setCurrentIndex(index); setCurrentField('startDate'); setShowDatePicker(true); }}>
            <Text style={styles.dateButtonText}>Pick Start Date</Text>
          </TouchableOpacity>
          <Text style={styles.dateText}>Start Date: {edu.startDate.toDateString()}</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => { setCurrentIndex(index); setCurrentField('endDate'); setShowDatePicker(true); }}>
            <Text style={styles.dateButtonText}>Pick End Date</Text>
          </TouchableOpacity>
          <Text style={styles.dateText}>End Date: {edu.currently ? 'Present' : edu.endDate.toDateString()}</Text>
          <View style={styles.switchContainer}>
            <Text>Currently Studying Here</Text>
            <Switch
              value={edu.currently}
              onValueChange={(value) => handleChange(index, 'currently', value)}
            />
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setFormData({
          ...formData,
          education: [...formData.education, { institution: '', degree: '', startDate: new Date(), endDate: new Date(), currently: false, description: '' }],
        })}
      >
        <Text style={styles.addButtonText}>Add Education</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setShowDatePicker(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  dateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EducationSection;

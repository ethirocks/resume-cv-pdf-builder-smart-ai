import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Experience, FormData } from '../types';

interface ExperienceSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ formData, setFormData }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentField, setCurrentField] = useState<keyof Experience | null>(null);

  const handleChange = (index: number, field: keyof Experience, value: string | boolean | Date) => {
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setFormData({ ...formData, experience: newExperience });
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
      <Text style={styles.header}>Experience</Text>
      {formData.experience.map((exp, index) => (
        <View key={index} style={styles.section}>
          <Text>Company:</Text>
          <TextInput
            style={styles.input}
            value={exp.company}
            onChangeText={(text) => handleChange(index, 'company', text)}
            placeholder="Company"
          />
          <Text>Role:</Text>
          <TextInput
            style={styles.input}
            value={exp.role}
            onChangeText={(text) => handleChange(index, 'role', text)}
            placeholder="Role"
          />
          <Text>Description:</Text>
          <TextInput
            style={styles.input}
            value={exp.description}
            onChangeText={(text) => handleChange(index, 'description', text)}
            placeholder="Description"
            multiline
          />
          <TouchableOpacity style={styles.dateButton} onPress={() => { setCurrentIndex(index); setCurrentField('startDate'); setShowDatePicker(true); }}>
            <Text style={styles.dateButtonText}>Pick Start Date</Text>
          </TouchableOpacity>
          <Text style={styles.dateText}>Start Date: {exp.startDate.toDateString()}</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => { setCurrentIndex(index); setCurrentField('endDate'); setShowDatePicker(true); }}>
            <Text style={styles.dateButtonText}>Pick End Date</Text>
          </TouchableOpacity>
          <Text style={styles.dateText}>End Date: {exp.currently ? 'Present' : exp.endDate.toDateString()}</Text>
          <View style={styles.switchContainer}>
            <Text>Currently Working Here</Text>
            <Switch
              value={exp.currently}
              onValueChange={(value) => handleChange(index, 'currently', value)}
            />
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setFormData({
          ...formData,
          experience: [...formData.experience, { company: '', role: '', startDate: new Date(), endDate: new Date(), currently: false, description: '' }],
        })}
      >
        <Text style={styles.addButtonText}>Add Experience</Text>
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

export default ExperienceSection;

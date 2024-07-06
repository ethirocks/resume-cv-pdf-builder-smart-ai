import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Experience {
  company: string;
  role: string;
  startDate: Date;
  endDate: Date | null;
  currently: boolean;
  description: string;
}

interface ExperienceSectionProps {
  formData: { experience: Experience[] };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ formData, setFormData }) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState<{ [key: number]: boolean }>({});
  const [showEndDatePicker, setShowEndDatePicker] = useState<{ [key: number]: boolean }>({});

  const handleInputChange = (index: number, field: keyof Experience, value: any) => {
    const updatedExperience = formData.experience.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData((prev: any) => ({ ...prev, experience: updatedExperience }));
  };

  const addExperience = () => {
    setFormData((prev: any) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: '', role: '', startDate: new Date(), endDate: null, currently: false, description: '' },
      ],
    }));
  };

  const handleDateChange = (index: number, field: keyof Experience, event: any, selectedDate: Date) => {
    setShowStartDatePicker((prev) => ({ ...prev, [index]: false }));
    setShowEndDatePicker((prev) => ({ ...prev, [index]: false }));
    handleInputChange(index, field, selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Experience</Text>
      {formData.experience.map((exp, index) => (
        <View key={index} style={styles.sectionContainer}>
          <TextInput
            style={styles.input}
            placeholder="Company"
            value={exp.company}
            onChangeText={(text) => handleInputChange(index, 'company', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Role"
            value={exp.role}
            onChangeText={(text) => handleInputChange(index, 'role', text)}
          />
          <View style={styles.dateRow}>
            <Text>Start Date:</Text>
            <TouchableOpacity
              onPress={() => setShowStartDatePicker((prev) => ({ ...prev, [index]: true }))}
              style={styles.dateButton}
            >
              <Text style={styles.dateText}>{exp.startDate.toDateString()}</Text>
            </TouchableOpacity>
            {showStartDatePicker[index] && (
              <DateTimePicker
                value={exp.startDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => handleDateChange(index, 'startDate', event, selectedDate!)}
              />
            )}
          </View>
          <View style={styles.dateRow}>
            <Text>End Date:</Text>
            {exp.currently ? (
              <Text>Present</Text>
            ) : (
              <TouchableOpacity
                onPress={() => setShowEndDatePicker((prev) => ({ ...prev, [index]: true }))}
                style={styles.dateButton}
              >
                <Text style={styles.dateText}>{(exp.endDate || new Date()).toDateString()}</Text>
              </TouchableOpacity>
            )}
            {showEndDatePicker[index] && (
              <DateTimePicker
                value={exp.endDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => handleDateChange(index, 'endDate', event, selectedDate!)}
              />
            )}
            <View style={styles.switchContainer}>
              <Text>Currently</Text>
              <Switch
                value={exp.currently}
                onValueChange={(value) => handleInputChange(index, 'currently', value)}
              />
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={exp.description}
            onChangeText={(text) => handleInputChange(index, 'description', text)}
            multiline
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addExperience}>
        <Text style={styles.addButtonText}>Add Experience</Text>
      </TouchableOpacity>
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
  sectionContainer: {
    width: '100%',
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
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  dateText: {
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExperienceSection;

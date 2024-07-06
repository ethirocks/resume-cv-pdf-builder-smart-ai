import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Education {
  institution: string;
  degree: string;
  startDate: Date;
  endDate: Date | null;
  currently: boolean;
  description: string;
}

interface EducationSectionProps {
  formData: { education: Education[] };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const EducationSection: React.FC<EducationSectionProps> = ({ formData, setFormData }) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState<{ [key: number]: boolean }>({});
  const [showEndDatePicker, setShowEndDatePicker] = useState<{ [key: number]: boolean }>({});

  const handleInputChange = (index: number, field: keyof Education, value: any) => {
    const updatedEducation = formData.education.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData((prev: any) => ({ ...prev, education: updatedEducation }));
  };

  const addEducation = () => {
    setFormData((prev: any) => ({
      ...prev,
      education: [
        ...prev.education,
        { institution: '', degree: '', startDate: new Date(), endDate: null, currently: false, description: '' },
      ],
    }));
  };

  const handleDateChange = (index: number, field: keyof Education, event: any, selectedDate: Date | undefined) => {
    setShowStartDatePicker((prev) => ({ ...prev, [index]: false }));
    setShowEndDatePicker((prev) => ({ ...prev, [index]: false }));
    handleInputChange(index, field, selectedDate || new Date());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Education</Text>
      {formData.education.map((edu, index) => (
        <View key={index} style={styles.sectionContainer}>
          <TextInput
            style={styles.input}
            placeholder="Institution"
            value={edu.institution}
            onChangeText={(text) => handleInputChange(index, 'institution', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Degree"
            value={edu.degree}
            onChangeText={(text) => handleInputChange(index, 'degree', text)}
          />
          <View style={styles.dateRow}>
            <Text>Start Date:</Text>
            <TouchableOpacity
              onPress={() => setShowStartDatePicker((prev) => ({ ...prev, [index]: true }))}
              style={styles.dateButton}
            >
              <Text style={styles.dateText}>{edu.startDate.toDateString()}</Text>
            </TouchableOpacity>
            {showStartDatePicker[index] && (
              <DateTimePicker
                value={edu.startDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => handleDateChange(index, 'startDate', event, selectedDate!)}
              />
            )}
          </View>
          <View style={styles.dateRow}>
            <Text>End Date:</Text>
            {edu.currently ? (
              <Text>Present</Text>
            ) : (
              <TouchableOpacity
                onPress={() => setShowEndDatePicker((prev) => ({ ...prev, [index]: true }))}
                style={styles.dateButton}
              >
                <Text style={styles.dateText}>{(edu.endDate || new Date()).toDateString()}</Text>
              </TouchableOpacity>
            )}
            {showEndDatePicker[index] && (
              <DateTimePicker
                value={edu.endDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => handleDateChange(index, 'endDate', event, selectedDate!)}
              />
            )}
            <View style={styles.switchContainer}>
              <Text>Currently</Text>
              <Switch
                value={edu.currently}
                onValueChange={(value) => handleInputChange(index, 'currently', value)}
              />
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={edu.description}
            onChangeText={(text) => handleInputChange(index, 'description', text)}
            multiline
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addEducation}>
        <Text style={styles.addButtonText}>Add Education</Text>
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

export default EducationSection;

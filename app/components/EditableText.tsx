// components/EditableText.tsx
import React, { useState } from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';

interface EditableTextProps {
  text: string;
  onSave: (value: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({ text, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);

  const handleSave = () => {
    setIsEditing(false);
    onSave(currentText);
  };

  return (
    <>
      {isEditing ? (
        <TextInput
          value={currentText}
          onChangeText={setCurrentText}
          onBlur={handleSave}
          style={styles.input}
          autoFocus
        />
      ) : (
        <Text onPress={() => setIsEditing(true)} style={styles.text}>
          {text}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default EditableText;

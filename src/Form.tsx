import React, { useState } from 'react';
import DynamicFormComponent from './DynamicFormComponent';

const formSchema = {
  "fields": [
    {
      "name": "field1",
      "label": "Field 1",
      "type": "text"
    },
    {
      "name": "field2",
      "label": "Field 2",
      "type": "dropdown",
      "options": ["Option 1", "Option 2", "Option 3"]
    },
    {
      "name": "field3",
      "label": "Field 3",
      "type": "radio",
      "options": ["Option A", "Option B", "Option C"]
    },
    {
      "name": "field4",
      "label": "Field 4",
      "type": "checkbox",
      "options": ["Option X", "Option Y", "Option Z"]
    }
  ]
}


const Form: React.FC = () => {
  const initialFormData: { [key: string]: string } = {};
  formSchema.fields.forEach((field) => {
    initialFormData[field.name] = '';
  });

  const [formData, setFormData] = useState(initialFormData);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateField = (fieldName: string, value: string): boolean => {
    // Example validation logic (required fields cannot be empty)
    const isValid = value.trim() !== '';
    setFormErrors((prevErrors) => ({ ...prevErrors, [fieldName]: isValid ? '' : 'Field is required' }));
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    // Validate all form fields before submission
    const isFormValid = formSchema.fields.every((field) => validateField(field.name, formData[field.name]));

    if (isFormValid) {
      // Submit the form data (you can send it to your server or perform other actions)
      console.log('Form submitted:', formData);
    } else {
      console.log('Form has errors. Please fix them before submission.');
    }
  };

  const handleInputChange = (fieldName: string, value: string): void => {
    // Update form data when input values change
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
    // Validate the field after each input change
    validateField(fieldName, value);
  };

  return (
    <div>
      <h2>Dynamic Form</h2>
      <DynamicFormComponent
        formSchema={formSchema.fields}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        validate={validateField}
      />
      {/* Display form errors */}
      <div style={{ color: 'red' }}>
        {Object.values(formErrors).map((error, index) => (
          <div key={index}>{error}</div>
        ))}
      </div>
    </div>
  );
};

export default Form;
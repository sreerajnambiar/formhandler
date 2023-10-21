import React from 'react';

interface FormField {
  name: string;
  label: string;
  type: string;
  options?: any[]; // Options for dropdown, radio, and checkbox fields
}

interface DynamicFormProps {
  formSchema: FormField[];
  formData: { [key: string]: string };
  onChange: (fieldName: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  validate: (fieldName: string, value: string) => boolean;
}

const DynamicFormComponent: React.FC<DynamicFormProps> = ({ formSchema, formData, onChange, onSubmit, validate }) => {
  return (
    <form onSubmit={onSubmit}>
      {formSchema.map((field: FormField) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}:</label>
          {field.type === 'text' && (
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={(e) => onChange(field.name, e.target.value)}
              onBlur={() => validate(field.name, formData[field.name])}
            />
          )}
          {field.type === 'dropdown' && (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={(e) => onChange(field.name, e.target.value)}
              onBlur={() => validate(field.name, formData[field.name])}
            >
              <option value="">Select {field.label}</option>
              {field.options &&
                field.options.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
          )}
          {field.type === 'radio' && (
            <div>
              {field.options &&
                field.options.map((option: string) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name={field.name}
                      value={option}
                      checked={formData[field.name] === option}
                      onChange={() => onChange(field.name, option)}
                    />
                    {option}
                  </label>
                ))}
            </div>
          )}
          {field.type === 'checkbox' && (
            <div>
              {field.options &&
                field.options.map((option: string) => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      name={field.name}
                      value={option}
                      checked={formData[field.name]?.includes(option) || false}
                      onChange={() => {
                      }}
                    />
                    {option}
                  </label>
                ))}
            </div>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicFormComponent;

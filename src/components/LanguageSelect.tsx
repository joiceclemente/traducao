import React from 'react';
import { Select, MenuItem, InputLabel, SelectChangeEvent } from '@mui/material';

interface LanguageSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  label: string;
  disabled?: boolean;
}

const languages = [
  { code: 'Portuguese BR', name: 'Português BR' },
  // { code: 'Portuguese PT', name: 'Português PT' },
  // { code: 'Spanish', name: 'Espanhol' },
  { code: 'Italian', name: 'Italiano' },
  // { code: 'German', name: 'Alemão' },
];

const LanguageSelect: React.FC<LanguageSelectProps> = ({ value, onChange, label }) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} displayEmpty>
        <MenuItem value="" disabled>
          Selecione um idioma
        </MenuItem>
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default LanguageSelect;

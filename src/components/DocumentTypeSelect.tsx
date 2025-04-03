import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface DocumentTypeSelectProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ value, onChange }) => {
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="document-type-label">Tipo de Documento</InputLabel>
      <Select
        labelId="document-type-label"
        value={value}
        onChange={onChange}
      >
        <MenuItem value="matrimonio">Certidão de Casamento</MenuItem>
        <MenuItem value="nascita">Certidão de Nascimento</MenuItem>
        <MenuItem value="obito">Certidão de Óbito</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DocumentTypeSelect;

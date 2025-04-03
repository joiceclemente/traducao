import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const supportedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

      // Valida o tipo de arquivo
      if (!supportedTypes.includes(file.type)) {
        alert('Apenas arquivos PNG, JPEG ou PDF são suportados.');
        return;
      }

      // Valida o tamanho do arquivo (máximo de 5 MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('O arquivo excede o tamanho máximo de 5 MB.');
        return;
      }

      setSelectedFileName(file.name);
      onFileChange(file);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Button variant="contained" component="label" color="primary" sx={{ textTransform: 'none' }}>
        Selecionar Arquivo
        <input
          type="file"
          hidden
          accept=".png, .jpeg, .jpg, .pdf"
          onChange={handleFileChange}
          aria-label="Selecionar arquivo para upload"
        />
      </Button>
      {selectedFileName && (
        <Typography variant="body2" color="textSecondary">
          Arquivo: {selectedFileName}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;

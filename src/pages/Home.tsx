import React, { useState } from 'react';
import jsPDF from 'jspdf';
import FileUpload from '../components/FileUpload';
import LanguageSelect from '../components/LanguageSelect';
import { getTranslatedFile } from '../services/api';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Loader from '../components/Loader';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [showNewTranslationButton, setShowNewTranslationButton] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDocumentTypeFocused, setIsDocumentTypeFocused] = useState(false);

  const handleFileUpload = (file: File | null) => {
    if (!file) return;
    setSelectedFile(file);
    setFileURL(URL.createObjectURL(file));
    setShowDeleteButton(true);
    setErrorMessage('');
  };

  const handleTranslate = async () => {
    if (!selectedFile || !sourceLanguage || !targetLanguage || !documentType) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }

    if (sourceLanguage === targetLanguage) {
      setErrorMessage('O idioma de origem e destino devem ser diferentes.');
      return;
    }

    setIsLoading(true);
    setShowDeleteButton(false);
    setErrorMessage('');

    try {
      const response = await getTranslatedFile(selectedFile, documentType, sourceLanguage, targetLanguage);
      if (!response || !response.translatedText) {
        throw new Error('Erro inesperado na resposta do servidor.');
      }
      setTranslation(response.translatedText);
      setShowNewTranslationButton(true);
    } catch (error) {
      console.error('Erro na tradução:', error);
      setTranslation('');
      setErrorMessage('Erro ao traduzir o texto.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!translation) {
      alert('Nada para gerar no PDF!');
      return;
    }
    const doc = new jsPDF();
    doc.text('Texto Traduzido:', 10, 10);
    doc.text(translation, 10, 20);
    doc.save('traducao.pdf');
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
    setFileURL('');
    setSourceLanguage('');
    setTargetLanguage('');
    setDocumentType('');
    setTranslation('');
    setShowDeleteButton(false);
    setErrorMessage('');
  };

  const handleNewTranslation = () => {
    handleDeleteFile();
    setShowNewTranslationButton(false);
  };

  return (
    <Box p={3} height="100vh" display="flex" flexDirection="column" gap={2}>
      {errorMessage && (
        <Alert severity="error" onClose={() => setErrorMessage('')} sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box display="flex" gap={2}>
          <LanguageSelect
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value as string)}
            label="De"
          />
          <LanguageSelect
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value as string)}
            label="Para"
          />
          <FormControl sx={{ minWidth: 200 }}>
            {!isDocumentTypeFocused && !documentType && (
              <InputLabel id="document-type-label">Tipo de Documento</InputLabel>
            )}
            <Select
              labelId="document-type-label"
              value={documentType}
              onOpen={() => setIsDocumentTypeFocused(true)}
              onClose={() => setIsDocumentTypeFocused(false)}
              onChange={(e: SelectChangeEvent<string>) => setDocumentType(e.target.value)}
            >
              <MenuItem value="Nascimento">Certidão de Nascimento</MenuItem>
              <MenuItem value="Obito">Certidão de Óbito</MenuItem>
              <MenuItem value="Casamento">Certidão de Casamento</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" gap={2}>
          <Button onClick={handleTranslate} variant="contained" color="primary">
            Traduzir
          </Button>
          {showNewTranslationButton && (
            <Button onClick={handleNewTranslation} variant="contained" color="secondary">
              Nova Tradução
            </Button>
          )}
        </Box>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} flex={1}>
        <Box
          flex={1}
          border="1px dashed black"
          p={2}
          position="relative"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        >
          {!fileURL ? (
            <FileUpload onFileChange={handleFileUpload} />
          ) : (
            <>
              {showDeleteButton && (
                <IconButton onClick={handleDeleteFile} style={{ position: 'absolute', top: 8, right: 8, color: 'red' }}>
                  <CloseIcon />
                </IconButton>
              )}
              {isImageLoading && (
                <Box
                  position="absolute"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="100%"
                  bgcolor="rgba(255, 255, 255, 0.8)"
                >
                  <CircularProgress size={50} />
                </Box>
              )}
              <img
                src={fileURL}
                alt="Documento carregado"
                onLoad={() => setIsImageLoading(false)}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: isImageLoading ? 'none' : 'block' }}
              />
            </>
          )}
        </Box>

        <Box flex={1} border="1px dashed black" p={2} display="flex" flexDirection="column" alignItems="center">
          {isLoading ? (
            <>
              <Loader />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
                Aguarde um momento...
              </Typography>
            </>
          ) : (
            <>


            
<Box width="100%">
  {translation.includes('-----') ? (
    <>
      {/* Cabeçalho centralizado, com quebra de linha manual */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
      <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    p: ({ children }) => (
      <Typography sx={{ textAlign: 'center', whiteSpace: 'pre-line', fontWeight: 'normal' }}>
        {children}
      </Typography>
    ),
  }}
>
  {translation.split('-----')[1]?.trim() || ''}
</ReactMarkdown>

      </Box>

      {/* Corpo justificado */}
      <Box sx={{ textAlign: 'justify' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => (
              <Typography paragraph sx={{ textAlign: 'justify', mb: 1 }}>
                {children}
              </Typography>
            ),
          }}
        >
          {translation.split('-----').slice(2).join('\n').trim() || ''}
        </ReactMarkdown>
      </Box>
    </>
  ) : (
    <Box sx={{ textAlign: 'justify' }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <Typography paragraph sx={{ textAlign: 'justify', mb: 1 }}>
              {children}
            </Typography>
          ),
        }}
      >
        {translation || 'Aguardando texto para tradução.'}
      </ReactMarkdown>
    </Box>
  )}
</Box>






              {translation && (
                <Button onClick={handleDownloadPDF} variant="contained" color="secondary" sx={{ mt: 2 }}>
                  Baixar PDF
                </Button>
              )}
              <Button onClick={handleDeleteFile} variant="outlined" color="error" sx={{ mt: 2 }}>
                Resetar Tudo
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
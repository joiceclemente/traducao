import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Função para obter tradução
export const getTranslatedFile = async (
  file: File,
  documentType: string,
  sourceLanguage: string,
  targetLanguage: string
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('documentType', documentType);
  formData.append('sourceLanguage', sourceLanguage);
  formData.append('targetLanguage', targetLanguage);

  try {
    const response = await api.post('/translate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // { translatedText, extractedData }
  } catch (error) {
    console.error('Erro ao traduzir:', error);
    throw new Error('Erro ao traduzir o texto.');
  }
};
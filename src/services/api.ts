import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'https://bcc6-168-90-7-156.ngrok-free.app/api',
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
import axios from 'axios';

const clearSus = async (code) => {
  if (code) {
    const response = await axios.post(
      'https://n6a9k209p4.execute-api.us-east-2.amazonaws.com/clear-sus',
      { id: code }
    );

    if (response.status === 200) {
      return true;
    }
  }

  return false;
};

export default clearSus;

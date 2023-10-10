// 데이터 복호화 함수
export const decryptData = (encryptedData, key) => {
  if (!encryptedData) {
    return null;
  }

  const decodedData = atob(encryptedData);
  const decryptedData = decodeURIComponent(escape(decodedData));

  if (decryptedData.endsWith(key)) {
    return decryptedData.slice(0, -key.length);
  }

  return decryptedData;
};

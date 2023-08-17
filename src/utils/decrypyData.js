// 데이터 복호화 함수
export const decryptData = (encryptedData, key) => {
  const decryptedData = decodeURIComponent(escape(atob(encryptedData))).replace(key, "");
  return decryptedData;
};

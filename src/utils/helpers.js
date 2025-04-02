import CryptoJS from "crypto-js";
const CRYPTO_SECRET_KEY="947089n*(&#)$(*#RHFJDvmbksduj1234"

export const decryptPassword = (encryptedData) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, CRYPTO_SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      
      if (!decrypted) throw new Error("Decryption failed (wrong key?)");
      return decrypted;
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
  };
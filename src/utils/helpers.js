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

  export function getAssigneeName(row, assigneeData, users) {
    const assignee = assigneeData.find(item => 
      Array.isArray(item.leadIds) && item.leadIds.some(leadId => leadId === row?._id) 
    );
    return assignee 
        ? users.find(user => user._id === assignee.userId)?.name || "Unknown" 
        : "Unassigned";
  }

  export const formatDate = (dateString) => {
    if (!dateString) return "N/A";
  
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {  
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  

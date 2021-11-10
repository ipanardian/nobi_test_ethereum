const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 
const initVector = "XcuWj130vpfVmcaH";
const Securitykey = "W68o3sOJexdcXL3pJiG7lKdRNNOOQXU8";
const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

let encryptedData = "";

let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

decryptedData += decipher.final("utf8");

console.log("Decrypted message: " + decryptedData);
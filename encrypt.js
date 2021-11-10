const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 
const initVector = "XcuWj130vpfVmcaH";
const message = "";
const Securitykey = "W68o3sOJexdcXL3pJiG7lKdRNNOOQXU8";
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

let encryptedData = cipher.update(message, "utf-8", "hex");
encryptedData += cipher.final("hex");

console.log("Encrypted message: " + encryptedData);
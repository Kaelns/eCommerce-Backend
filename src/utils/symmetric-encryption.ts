import crypto from 'crypto';

// Generate a random 32-byte encryption key
// const encryptionKeyHex = crypto.randomBytes(32).toString("hex");

export function encryptData(encryptionKeyHex: string, plaintext: string) {
  const iv = crypto.randomBytes(16); // Generate a new Initialization Vector (IV) for each encryption
  const encryptionKey = Buffer.from(encryptionKeyHex, 'hex');
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

export function decryptData(encryptionKeyHex: string, ciphertext: string) {
  const [ivHex, encrypted] = ciphertext.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptionKey = Buffer.from(encryptionKeyHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

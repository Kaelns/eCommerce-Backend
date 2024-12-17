import { decryptData, encryptData } from '@/utils/symmetric-encryption.js';

const textToEncrypt = 'textToEncrypt';
const encryptionKeyHex = 'd970ae075cd4ecf5a1258279db5b0254954045cdcd1bff1683e3680705c31264';

describe('Given symmetric encrypt/decrypt pair', () => {
  it('returns initial data without distortion', () => {
    const encryptedText = encryptData(encryptionKeyHex, textToEncrypt);
    expect(decryptData(encryptionKeyHex, encryptedText)).toEqual(textToEncrypt);
  });
});

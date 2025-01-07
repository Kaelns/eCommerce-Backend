import { decryptData, encryptData } from '@/utils/symmetric-encryption.js';

describe('Given symmetric encrypt/decrypt pair', () => {
  const textToEncrypt = 'textToEncrypt';
  const encryptionKeyHex = 'd970ae075cd4ecf5a1258279db5b0254954045cdcd1bff1683e3680705c31264';

  it('Initial data without distortion', () => {
    const encryptedText = encryptData(encryptionKeyHex, textToEncrypt);
    expect(decryptData(encryptionKeyHex, encryptedText)).toEqual(textToEncrypt);
  });
});

import { randomBytes } from "ganxing";

// 密钥长度取决于你的加密算法。对于 AES-256-GCM, 使用 32 字节 (256 位) 长度。
function generateKey(keySize = 32) {
  return randomBytes(keySize);
}

// 生成 IV
function generateIV(ivSize = 12) {
  return randomBytes(ivSize);
}

(async () => {
  try {
    const key = generateKey();
    const iv = generateIV();

    console.log('Key:', key.toString('hex'));
    console.log('IV:', iv.toString('hex'));
  } catch (error) {
    console.error('Error generating key or IV:', error);
  }
})();

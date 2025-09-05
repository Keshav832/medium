// Generate 16-byte random salt
export function generateSalt(): string {
  const saltArray = crypto.getRandomValues(new Uint8Array(16));
  return arrayBufferToHex(saltArray.buffer);
}

// Hash password with salt using SHA-256
export async function hashPasswordWithSalt(password: string, salt: string): Promise<string> {
  const text = password + salt;
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return arrayBufferToHex(hashBuffer);
}

// Helper: convert ArrayBuffer to hex string
function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
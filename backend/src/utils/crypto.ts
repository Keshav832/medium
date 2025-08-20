export async function generateSalt() {
  // 16 random bytes as salt
  const saltArray = crypto.getRandomValues(new Uint8Array(16))
  return arrayBufferToHex(saltArray.buffer)
}

export async function hashPasswordWithSalt(password: string, salt: string) {
  // combine password + salt
  const text = password + salt
  const data = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return arrayBufferToHex(hashBuffer)
}

function arrayBufferToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

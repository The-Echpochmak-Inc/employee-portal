function bytesToHex(bytes: Uint8Array | number[]): string {
    return Array.from(bytes).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(hex: string): Uint8Array {
    return new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
}

// XOR two byte arrays (truncate to shortest length)
function xorBytes(a: Uint8Array | number[], b: Uint8Array | number[]): Uint8Array | number[] {
    return a.map((val, i) => val ^ (b[i % b.length] || 0));
}

// Generate a secure SHA-256 hash
async function hashString(input: string): Promise<Uint8Array> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return new Uint8Array(hashBuffer);
}

// Generate a unique, obfuscated ID (Browser-Compatible)
export async function generateId(input: string): Promise<string> {
    const randomSalt = crypto.getRandomValues(new Uint8Array(4)); // 4-byte random salt
    const saltHex = bytesToHex(randomSalt);

    const hash = await hashString(input + saltHex);
    const obfuscated = xorBytes(Array.from(randomSalt), Array.from(hash.slice(0, 4)));

    return `e-${bytesToHex(obfuscated)}${saltHex}`;
}

// Validate if an ID was generated from the original input
export async function validateId(input: string, id: string): Promise<boolean> {
    if (!id.startsWith("e-")) return false;

    const rawHex = id.slice(2); // Remove "e-"
    if (rawHex.length !== 16) return false;

    const obfuscatedPart = rawHex.slice(0, 8);
    const saltPart = rawHex.slice(8, 16);

    const saltBytes = hexToBytes(saltPart);
    const obfuscatedBytes = hexToBytes(obfuscatedPart);

    // Recompute the hash with the extracted salt
    const computedHash = await hashString(input + saltPart);

    // Reverse XOR to extract original hash fragment
    const expectedHashFragment = xorBytes(obfuscatedBytes, saltBytes);

    return expectedHashFragment.every((byte, i) => byte === computedHash[i]);
}
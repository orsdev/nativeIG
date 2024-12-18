export const separateHyphenatedWordWithSpaces = (value: string) => {
  if (!value) return "";
  return value
      .replace(/[_]|([a-z])([A-Z])/g, (match, p1, p2) => {
          if (p1 && p2) {
              return `${p1} ${p2}`;
          }
          return " ";
      })
      .toLowerCase();
};


export function isTokenExpired(timestamp: string | null): boolean {
  if (!timestamp) return true; 
  const expirationTime = new Date(timestamp).getTime() + 10 * 60 * 60 * 1000; // Add 10 hours in ms
  const currentTime = Date.now();
  return currentTime > expirationTime; 
}

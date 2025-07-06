export function checkImageUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);   // Image loaded successfully
    img.onerror = () => resolve(false); // Image failed to load
    img.src = url;
  });
}
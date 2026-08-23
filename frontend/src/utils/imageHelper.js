// fix image url if https is missing
export const fixImageUrl = (url) => {
  if (!url || !url.trim()) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

// remove empty image links
export const cleanImages = (images = []) => {
  return images.map(fixImageUrl).filter(Boolean);
};

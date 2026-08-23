import { useState } from 'react';
import { fixImageUrl } from '../utils/imageHelper';

function ItemImage({ src, alt, boxClass = '' }) {
  const [hasError, setHasError] = useState(false);
  const imageUrl = fixImageUrl(src);

  if (!imageUrl || hasError) {
    return (
      <div className={`img-box ${boxClass} img-fallback`}>
        <span>No Image</span>
      </div>
    );
  }

  return (
    <div className={`img-box ${boxClass}`}>
      <img
        src={imageUrl}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export default ItemImage;

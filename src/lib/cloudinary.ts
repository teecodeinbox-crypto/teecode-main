/**
 * Cloudinary image URL builder utility.
 * Constructs optimized Cloudinary delivery URLs with automatic format/quality.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';

/**
 * Build a Cloudinary image URL with transformations.
 * If no cloud name is configured or publicId is empty, returns the fallback URL.
 */
export function getCloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
  } = {},
  fallbackUrl?: string
): string {
  if (!CLOUD_NAME || !publicId) {
    return fallbackUrl || publicId || '';
  }

  const { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = options;

  const transforms: string[] = [`f_${format}`, `q_${quality}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(',')}/${publicId}`;
}

/**
 * Get a product image URL — uses Cloudinary if configured, else returns the original URL as-is.
 */
export function getProductImageUrl(
  imageUrl: string,
  width: number = 800,
  height?: number
): string {
  // If the URL is already a Cloudinary URL or a public ID, use the builder
  if (CLOUD_NAME && imageUrl && !imageUrl.startsWith('http')) {
    return getCloudinaryUrl(imageUrl, { width, height });
  }
  // Otherwise return the original URL (Unsplash, etc.)
  return imageUrl;
}

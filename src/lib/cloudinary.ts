import { apiUrl } from './api';

/**
 * Cloudinary image URL builder & client API utility.
 * Constructs optimized Cloudinary delivery URLs with automatic format/quality,
 * and provides client-side functions for uploading and deleting media.
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dtzyjynai';

export interface CloudinaryUploadOptions {
  folder?: string;
  tags?: string[];
  publicId?: string;
  overwrite?: boolean;
}

export interface CloudinaryAsset {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
  resource_type?: string;
}

export interface CloudinaryStatus {
  status: string;
  configured: boolean;
  cloudName: string | null;
  hasApiKey: boolean;
  hasApiSecret: boolean;
}

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

/**
 * Upload an image (File object, base64 data URI, or remote URL) to Cloudinary via backend API.
 */
export async function uploadToCloudinary(
  fileOrData: File | Blob | string,
  options: CloudinaryUploadOptions = {}
): Promise<{ success: boolean; data?: CloudinaryAsset; error?: string }> {
  try {
    let response: Response;

    if (typeof fileOrData === 'string') {
      // Base64 string or remote image URL
      response = await fetch(apiUrl('/cloudinary/upload'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: fileOrData,
          folder: options.folder || 'teecode',
          tags: options.tags,
          public_id: options.publicId,
          overwrite: options.overwrite,
        }),
      });
    } else {
      // File or Blob via multipart FormData
      const formData = new FormData();
      formData.append('file', fileOrData);
      if (options.folder) formData.append('folder', options.folder);
      if (options.publicId) formData.append('public_id', options.publicId);
      if (options.tags) formData.append('tags', options.tags.join(','));
      if (options.overwrite !== undefined) formData.append('overwrite', String(options.overwrite));

      response = await fetch(apiUrl('/cloudinary/upload'), {
        method: 'POST',
        body: formData,
      });
    }

    const result = await response.json();
    return result;
  } catch (err: any) {
    console.error('Error uploading to Cloudinary:', err);
    return { success: false, error: err.message || 'Failed to upload image' };
  }
}

/**
 * Delete an image from Cloudinary by public ID via backend API.
 */
export async function deleteFromCloudinary(publicId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(apiUrl('/cloudinary/delete'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ public_id: publicId }),
    });
    return await response.json();
  } catch (err: any) {
    console.error('Error deleting from Cloudinary:', err);
    return { success: false, error: err.message || 'Failed to delete asset' };
  }
}

/**
 * Fetch Cloudinary API configuration status.
 */
export async function getCloudinaryStatus(): Promise<CloudinaryStatus | null> {
  try {
    const response = await fetch(apiUrl('/cloudinary/status'));
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

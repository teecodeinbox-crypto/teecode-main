import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import { Router, Request, Response } from 'express';
import multer from 'multer';

// Configure multer memory storage for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB max file size
  },
});

export const cloudinaryRouter = Router();

// Helper to configure Cloudinary dynamically (reads latest env)
function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME || 'dtzyjynai';
  const apiKey = process.env.CLOUDINARY_API_KEY || '';
  const apiSecret = process.env.CLOUDINARY_API_SECRET || '';

  if (cloudName) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
    isConfigured: Boolean(cloudName && apiKey && apiSecret),
  };
}

// ==========================================
// 1. GET /status — Check Cloudinary Configuration Status
// ==========================================
cloudinaryRouter.get('/status', (req: Request, res: Response) => {
  const { cloudName, apiKey, isConfigured } = configureCloudinary();
  res.json({
    status: 'ok',
    configured: isConfigured,
    cloudName: cloudName || null,
    hasApiKey: Boolean(apiKey),
    hasApiSecret: Boolean(process.env.CLOUDINARY_API_SECRET),
  });
});

// ==========================================
// 2. POST /upload — Upload Image (File Buffer, Base64, or Remote URL)
// ==========================================
cloudinaryRouter.post(
  '/upload',
  upload.single('file'),
  async (req: Request, res: Response) => {
    const { isConfigured, cloudName } = configureCloudinary();

    if (!isConfigured) {
      return res.status(503).json({
        success: false,
        error: 'Cloudinary API is not fully configured. Please set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env file.',
        cloudName,
      });
    }

    try {
      const folder = (req.body.folder as string) || 'teecode';
      const tags = req.body.tags
        ? Array.isArray(req.body.tags)
          ? req.body.tags
          : (req.body.tags as string).split(',').map((t) => t.trim())
        : ['teecode-apparel'];
      const publicId = (req.body.public_id || req.body.publicId) as string | undefined;

      const uploadOptions: UploadApiOptions = {
        folder,
        tags,
        public_id: publicId,
        resource_type: 'auto',
        overwrite: req.body.overwrite === 'true' || req.body.overwrite === true,
      };

      let uploadResult;

      // Case A: Multipart file uploaded via FormData
      if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        uploadResult = await cloudinary.uploader.upload(dataURI, uploadOptions);
      }
      // Case B: Base64 string or remote URL provided in JSON body
      else {
        const target = req.body.image || req.body.file || req.body.url;
        if (!target) {
          return res.status(400).json({
            success: false,
            error: 'No image provided. Pass a multipart file, a base64 data URI, or a remote image URL in the request body.',
          });
        }
        uploadResult = await cloudinary.uploader.upload(target, uploadOptions);
      }

      console.log(`[Cloudinary] Successfully uploaded image: ${uploadResult.public_id} (${uploadResult.secure_url})`);

      return res.status(200).json({
        success: true,
        data: {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url,
          url: uploadResult.url,
          format: uploadResult.format,
          width: uploadResult.width,
          height: uploadResult.height,
          bytes: uploadResult.bytes,
          created_at: uploadResult.created_at,
          resource_type: uploadResult.resource_type,
        },
      });
    } catch (err: any) {
      console.error('[Cloudinary Upload Error]:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Failed to upload image to Cloudinary.',
      });
    }
  }
);

// ==========================================
// 3. POST /signature — Generate Signed Upload Parameters (for direct client uploads)
// ==========================================
cloudinaryRouter.post('/signature', (req: Request, res: Response) => {
  const { isConfigured, cloudName, apiKey, apiSecret } = configureCloudinary();

  if (!isConfigured) {
    return res.status(503).json({
      success: false,
      error: 'Cloudinary API credentials missing. Please set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env.',
    });
  }

  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = req.body.folder || 'teecode';

    const paramsToSign: Record<string, any> = {
      timestamp,
      folder,
      ...(req.body.params || {}),
    };

    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

    res.json({
      success: true,
      signature,
      timestamp,
      apiKey,
      cloudName,
      folder,
    });
  } catch (err: any) {
    console.error('[Cloudinary Signature Error]:', err);
    res.status(500).json({ success: false, error: err.message || 'Could not generate signature.' });
  }
});

// Also support GET /signature for convenience
cloudinaryRouter.get('/signature', (req: Request, res: Response) => {
  const { isConfigured, cloudName, apiKey, apiSecret } = configureCloudinary();

  if (!isConfigured) {
    return res.status(503).json({
      success: false,
      error: 'Cloudinary API credentials missing. Please set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env.',
    });
  }

  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = (req.query.folder as string) || 'teecode';

    const paramsToSign = {
      timestamp,
      folder,
    };

    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

    res.json({
      success: true,
      signature,
      timestamp,
      apiKey,
      cloudName,
      folder,
    });
  } catch (err: any) {
    console.error('[Cloudinary Signature Error]:', err);
    res.status(500).json({ success: false, error: err.message || 'Could not generate signature.' });
  }
});

// ==========================================
// 4. POST /delete (and DELETE /:public_id) — Delete Asset from Cloudinary
// ==========================================
cloudinaryRouter.post('/delete', async (req: Request, res: Response) => {
  const { isConfigured } = configureCloudinary();

  if (!isConfigured) {
    return res.status(503).json({
      success: false,
      error: 'Cloudinary API credentials missing. Please set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env.',
    });
  }

  const publicId = req.body.public_id || req.body.publicId;
  if (!publicId) {
    return res.status(400).json({ success: false, error: 'public_id is required.' });
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
    console.log(`[Cloudinary] Deleted asset ${publicId}:`, result);
    return res.json({ success: true, result });
  } catch (err: any) {
    console.error('[Cloudinary Delete Error]:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to delete asset.' });
  }
});

cloudinaryRouter.delete('/:public_id(*)', async (req: Request, res: Response) => {
  const { isConfigured } = configureCloudinary();

  if (!isConfigured) {
    return res.status(503).json({
      success: false,
      error: 'Cloudinary API credentials missing. Please set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env.',
    });
  }

  const publicId = req.params.public_id;
  try {
    const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
    return res.json({ success: true, result });
  } catch (err: any) {
    console.error('[Cloudinary Delete Error]:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to delete asset.' });
  }
});

// ==========================================
// 5. GET /resources — List Resources (Folder / Recent)
// ==========================================
cloudinaryRouter.get('/resources', async (req: Request, res: Response) => {
  const { isConfigured } = configureCloudinary();

  if (!isConfigured) {
    return res.status(503).json({
      success: false,
      error: 'Cloudinary API credentials missing. Please set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in your .env.',
    });
  }

  try {
    const prefix = (req.query.folder as string) || (req.query.prefix as string) || '';
    const maxResults = Math.min(Number(req.query.max_results) || 30, 100);

    const options: Record<string, any> = {
      type: 'upload',
      max_results: maxResults,
    };
    if (prefix) {
      options.prefix = prefix;
    }

    const resources = await cloudinary.api.resources(options);
    return res.json({ success: true, resources: resources.resources });
  } catch (err: any) {
    console.error('[Cloudinary Resources Error]:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to fetch resources.' });
  }
});

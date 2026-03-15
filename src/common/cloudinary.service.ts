import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(private readonly config: ConfigService) {
    cloudinary.config({
      cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
      api_key: config.get('CLOUDINARY_API_KEY'),
      api_secret: config.get('CLOUDINARY_API_SECRET'),
    });
  }

  uploadBuffer(buffer: Buffer, filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          public_id: `resume/${filename}`,
          overwrite: true,
          format: 'pdf',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        },
      );
      const readable = new Readable();
      readable.push(buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });
  }
}

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryConfig } from './cloudinary.config';
const sharp = require('sharp');
@Injectable()
export class CloudinaryService {
    constructor() {
        CloudinaryConfig();
    }

    // Hàm upload ảnh với nén trước khi tải lên Cloudinary
    async uploadImage(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            // Sử dụng sharp để nén ảnh trước khi upload
            sharp(file.buffer)
                .resize(800) // Resize ảnh để giảm kích thước (có thể thay đổi tùy nhu cầu)
                .toBuffer()
                .then((resizedImage) => {
                    // Tiến hành tải ảnh đã nén lên Cloudinary
                    cloudinary.uploader.upload_stream(
                        {
                            folder: 'thuoc', // Chỉ định thư mục lưu trữ ảnh
                            upload_preset: 'neronmen', // Dùng upload_preset để tối ưu quá trình upload
                        },
                        (error, result) => {
                            if (error || !result) return reject(error || new Error('Upload failed'));
                            resolve(result.secure_url); // Trả về URL của ảnh đã upload
                        }
                    ).end(resizedImage); // Tải ảnh đã nén lên Cloudinary
                })
                .catch((err) => reject(err)); // Nếu có lỗi trong quá trình nén ảnh
        });
    }
}

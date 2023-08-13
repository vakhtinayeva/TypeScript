import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { configService } from '../../config.service';
import Upload from 'src/models/upload.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>,
  ) {}

  async upload(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: configService.getAWSBucket(),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.uploadRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.uploadRepository.save(newFile);
    return newFile;
  }

  async delete(id: string) {
    const file = await this.uploadRepository.findOneByOrFail({ id });
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: configService.getAWSBucket(),
        Key: file.key,
      })
      .promise();
    return await this.uploadRepository.delete(id);
  }
}

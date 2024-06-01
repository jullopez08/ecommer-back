import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entidades/products.entity';
import { FilesRepository } from 'src/repositories/files.repository';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    private readonly fileRepository: FilesRepository,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async uploadImage(file: Express.Multer.File, productId: string) {
    const saveFile = await this.fileRepository.uploadImage(file);
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException(`Product not found`);
    product.imgUrl = saveFile.secure_url;
    await this.productRepository.save(product);
    return saveFile;
  }
}

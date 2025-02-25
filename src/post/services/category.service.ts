import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';
import { PostRepository } from '../repositories/post.repository';
import { CreateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async getAll() {
    return await this.categoryRepository.getByCondition({});
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.create(createCategoryDto);
  }

  async getPosts(category_id) {
    const { ObjectId } = require('mongoose').Types;
    if (!category_id || category_id === '0') {
      const query = { categories: { $exists: false } };
      const posts = await this.postRepository.getByCondition(
        query,
        'title thumbnailUrl description',
      );
      return posts || [];
    }

    try {
      const objectId = new ObjectId(category_id);
      const query = { categories: objectId };

      const posts = await this.postRepository.getByCondition(
        query,
        'title thumbnailUrl description',
      );

      return posts || [];
    } catch (error) {
      
    }
  }
}

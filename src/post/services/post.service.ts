import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { Post } from '../models/post.model';
import { PostRepository } from '../repositories/post.repository';
import { User } from 'src/user/models/user.model';
import { CategoryRepository } from '../repositories/category.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from '../dto/pagination.dto';
import { getDownloadURL, getStorage, ref, uploadBytes } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import config from '../config/uploadfirebase.config'
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<Post>,
    @InjectModel('User') private userModel: Model<User>,
    private readonly postRepository: PostRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getAllPosts() {
    return this.postRepository.getByCondition({});
  }
  async getPostCountAndUsers() {
    const users = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'user',
          as: 'posts',
        },
      },
      {
        $project: {
          userName: '$name',
          postCount: { $size: '$posts' },
        },
      },
    ]);

    return users;
  }
  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const [items, total] = await Promise.all([
      this.postModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.postModel.countDocuments().exec(),
    ]);

    return {
      items,
      total,
      page: Number(page),
      lastPage: Math.ceil(total / limit),
    };
  }


  async getPostById(post_id: string) {
    const post = await this.postRepository.findById(post_id);
    console.log(post);
    
    if (post) {
      await post.populate({ path: 'user', select: '-password' });
      return post;
    } else {
      throw new NotFoundException(post_id);
    }
  }

  async replacePost(post_id: string, data: UpdatePostDto) {
    return await this.postRepository.findByIdAndUpdate(post_id, data);
  }

  async createPost(user: User, post: CreatePostDto, file) {
    let imageUrl = '';
    if (file) {
      const firebaseApp = initializeApp(config.firebaseConfig);
      const firestore = getStorage(firebaseApp);

      const imageRef = ref(firestore, 'test/' + file.originalname);
      const snapshot = await uploadBytes(imageRef, file.buffer);
      imageUrl = await getDownloadURL(snapshot.ref);
    }
    post.thumbnailUrl = imageUrl;
    post.user = user._id;

    const new_post = await this.postRepository.create({
      ...post
    });
    if (post.categories) {
      await this.categoryRepository.updateMany(
        {
          _id: { $in: post.categories },
        },
        {
          $push: {
            posts: new_post._id,
          },
        },
      );
    }
    return new_post;
  }

  async getByCategory(category_id: string) {
    return await this.postRepository.getByCondition({
      categories: {
        $elemMatch: { $eq: category_id },
      },
    });
  }

  async getByCategories(category_ids: string) {
    return await this.postRepository.getByCondition({
      categories: {
        $all: category_ids,
      },
    });
  }

  async deletePost(post_id: string) {
    return await this.postRepository.deleteOne(post_id);
  }

  async getByArray() {
    return await this.postRepository.getByCondition({
      tags: { $size: 5 },
      numbers: { $size: 4 },
    });
  }
}

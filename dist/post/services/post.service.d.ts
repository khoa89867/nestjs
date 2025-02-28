/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { Post } from '../models/post.model';
import { PostRepository } from '../repositories/post.repository';
import { User } from 'src/user/models/user.model';
import { CategoryRepository } from '../repositories/category.repository';
import { Model } from 'mongoose';
import { PaginationDto } from '../dto/pagination.dto';
export declare class PostService {
    private readonly postModel;
    private userModel;
    private readonly postRepository;
    private readonly categoryRepository;
    constructor(postModel: Model<Post>, userModel: Model<User>, postRepository: PostRepository, categoryRepository: CategoryRepository);
    getAllPosts(): Promise<(import("mongoose").FlattenMaps<Post> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getPostCountAndUsers(): Promise<any[]>;
    findAll(paginationDto: PaginationDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, Post> & Post & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    getPostById(post_id: string): Promise<Post>;
    replacePost(post_id: string, data: UpdatePostDto): Promise<import("mongoose").Document<unknown, {}, Post> & Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createPost(user: User, post: CreatePostDto, file: any): Promise<any>;
    getByCategory(category_id: string): Promise<(import("mongoose").FlattenMaps<Post> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getByCategories(category_ids: string): Promise<(import("mongoose").FlattenMaps<Post> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    deletePost(post_id: string): Promise<Post>;
    getByArray(): Promise<(import("mongoose").FlattenMaps<Post> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}

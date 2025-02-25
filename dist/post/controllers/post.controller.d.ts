/// <reference types="multer" />
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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { PostService } from '../services/post.service';
import { PostRepository } from '../repositories/post.repository';
import { PaginationDto } from '../dto/pagination.dto';
export declare class PostController {
    private readonly postService;
    private readonly postRepository;
    constructor(postService: PostService, postRepository: PostRepository);
    getPostCountAndUsers(): Promise<any[]>;
    getAllPosts(): Promise<(import("mongoose").FlattenMaps<import("../models/post.model").Post> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    pagination(paginationDto: PaginationDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("../models/post.model").Post> & import("../models/post.model").Post & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        total: number;
        page: number;
        lastPage: number;
    }>;
    getPostById(id: string): Promise<import("../models/post.model").Post>;
    createPost(req: any, post: CreatePostDto, file: Express.Multer.File): Promise<any>;
    replacePost(id: string, post: UpdatePostDto): Promise<import("mongoose").Document<unknown, {}, import("../models/post.model").Post> & import("../models/post.model").Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deletePost(id: string): Promise<boolean>;
    getPostUser(req: any): Promise<any>;
    getByCategory(category_id: any): Promise<(import("mongoose").FlattenMaps<import("../models/post.model").Post> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getByCategories(category_ids: any): Promise<(import("mongoose").FlattenMaps<import("../models/post.model").Post> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getByArray(): Promise<(import("mongoose").FlattenMaps<import("../models/post.model").Post> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}

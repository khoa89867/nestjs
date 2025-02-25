"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const post_repository_1 = require("../repositories/post.repository");
const category_repository_1 = require("../repositories/category.repository");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const storage_1 = require("@firebase/storage");
const app_1 = require("firebase/app");
const uploadfirebase_config_1 = require("../config/uploadfirebase.config");
let PostService = class PostService {
    constructor(postModel, userModel, postRepository, categoryRepository) {
        this.postModel = postModel;
        this.userModel = userModel;
        this.postRepository = postRepository;
        this.categoryRepository = categoryRepository;
    }
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
    async findAll(paginationDto) {
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
    async getPostById(post_id) {
        const post = await this.postRepository.findById(post_id);
        console.log(post);
        if (post) {
            await post.populate({ path: 'user', select: '-password' });
            return post;
        }
        else {
            throw new common_1.NotFoundException(post_id);
        }
    }
    async replacePost(post_id, data) {
        return await this.postRepository.findByIdAndUpdate(post_id, data);
    }
    async createPost(user, post, file) {
        let imageUrl = '';
        if (file) {
            const firebaseApp = (0, app_1.initializeApp)(uploadfirebase_config_1.default.firebaseConfig);
            const firestore = (0, storage_1.getStorage)(firebaseApp);
            const imageRef = (0, storage_1.ref)(firestore, 'test/' + file.originalname);
            const snapshot = await (0, storage_1.uploadBytes)(imageRef, file.buffer);
            imageUrl = await (0, storage_1.getDownloadURL)(snapshot.ref);
        }
        post.thumbnailUrl = imageUrl;
        post.user = user._id;
        const new_post = await this.postRepository.create({
            ...post
        });
        if (post.categories) {
            await this.categoryRepository.updateMany({
                _id: { $in: post.categories },
            }, {
                $push: {
                    posts: new_post._id,
                },
            });
        }
        return new_post;
    }
    async getByCategory(category_id) {
        return await this.postRepository.getByCondition({
            categories: {
                $elemMatch: { $eq: category_id },
            },
        });
    }
    async getByCategories(category_ids) {
        return await this.postRepository.getByCondition({
            categories: {
                $all: category_ids,
            },
        });
    }
    async deletePost(post_id) {
        return await this.postRepository.deleteOne(post_id);
    }
    async getByArray() {
        return await this.postRepository.getByCondition({
            tags: { $size: 5 },
            numbers: { $size: 4 },
        });
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Post')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        post_repository_1.PostRepository,
        category_repository_1.CategoryRepository])
], PostService);
//# sourceMappingURL=post.service.js.map
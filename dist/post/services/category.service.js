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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_repository_1 = require("../repositories/category.repository");
const post_repository_1 = require("../repositories/post.repository");
let CategoryService = class CategoryService {
    constructor(categoryRepository, postRepository) {
        this.categoryRepository = categoryRepository;
        this.postRepository = postRepository;
    }
    async getAll() {
        return await this.categoryRepository.getByCondition({});
    }
    async create(createCategoryDto) {
        return await this.categoryRepository.create(createCategoryDto);
    }
    async getPosts(category_id) {
        const { ObjectId } = require('mongoose').Types;
        if (!category_id || category_id === '0') {
            const query = { categories: { $exists: false } };
            const posts = await this.postRepository.getByCondition(query, 'title thumbnailUrl description');
            return posts || [];
        }
        try {
            const objectId = new ObjectId(category_id);
            const query = { categories: objectId };
            const posts = await this.postRepository.getByCondition(query, 'title thumbnailUrl description');
            return posts || [];
        }
        catch (error) {
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository,
        post_repository_1.PostRepository])
], CategoryService);
//# sourceMappingURL=category.service.js.map
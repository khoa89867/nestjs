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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_dto_1 = require("../dto/post.dto");
const post_service_1 = require("../services/post.service");
const httpException_filter_1 = require("../../utils/httpException.filter");
const passport_1 = require("@nestjs/passport");
const post_repository_1 = require("../repositories/post.repository");
const pagination_dto_1 = require("../dto/pagination.dto");
const platform_express_1 = require("@nestjs/platform-express");
let PostController = class PostController {
    constructor(postService, postRepository) {
        this.postService = postService;
        this.postRepository = postRepository;
    }
    async getPostCountAndUsers() {
        return this.postService.getPostCountAndUsers();
    }
    getAllPosts() {
        return this.postService.getAllPosts();
    }
    async pagination(paginationDto) {
        return this.postService.findAll(paginationDto);
    }
    getPostById(id) {
        return this.postService.getPostById(id);
    }
    async createPost(req, post, file) {
        return this.postService.createPost(req.user, post, file);
    }
    async replacePost(id, post) {
        return this.postService.replacePost(id, post);
    }
    async deletePost(id) {
        await this.postService.deletePost(id);
        return true;
    }
    async getPostUser(req) {
        await req.user.populate('posts');
        return req.user.posts;
    }
    async getByCategory(category_id) {
        return await this.postService.getByCategory(category_id);
    }
    async getByCategories(category_ids) {
        return await this.postService.getByCategories(category_ids);
    }
    async getByArray() {
        return await this.postService.getByArray();
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Get)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostCountAndUsers", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Get)('page'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "pagination", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseFilters)(httpException_filter_1.HttpExceptionFilter),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPostById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "replacePost", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('user/all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostUser", null);
__decorate([
    (0, common_1.Get)('get/category'),
    __param(0, (0, common_1.Query)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getByCategory", null);
__decorate([
    (0, common_1.Get)('get/categories'),
    __param(0, (0, common_1.Query)('category_ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getByCategories", null);
__decorate([
    (0, common_1.Get)('get/array'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getByArray", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService, post_repository_1.PostRepository])
], PostController);
//# sourceMappingURL=post.controller.js.map
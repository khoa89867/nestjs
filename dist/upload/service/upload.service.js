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
exports.UploadService = void 0;
const storage_1 = require("@firebase/storage");
const app_1 = require("firebase/app");
const uploadfirebase_config_1 = require("../config/uploadfirebase.config");
const common_1 = require("@nestjs/common");
const post_repository_1 = require("../../post/repositories/post.repository");
let UploadService = class UploadService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async uploadFile(file) {
        if (file) {
            const firebaseApp = (0, app_1.initializeApp)(uploadfirebase_config_1.default.firebaseConfig);
            const firestore = (0, storage_1.getStorage)(firebaseApp);
            const imageRef = (0, storage_1.ref)(firestore, 'test/' + file.originalname);
            const snapshot = await (0, storage_1.uploadBytes)(imageRef, file.buffer);
            const imageURL = await (0, storage_1.getDownloadURL)(snapshot.ref);
            const uploadUrl = await this.postRepository.create({
                thumbnailUrl: imageURL,
            });
            return uploadUrl;
        }
        return null;
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [post_repository_1.PostRepository])
], UploadService);
//# sourceMappingURL=upload.service.js.map
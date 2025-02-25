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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    constructor(userModel, userRepository) {
        this.userModel = userModel;
        this.userRepository = userRepository;
    }
    async getAllUsers() {
        const userData = await this.userRepository.getByCondition({}, 'id name email');
        return userData;
    }
    async create(userDto) {
        userDto.password = await bcrypt.hash(userDto.password, 10);
        const userInDb = await this.userRepository.findByCondition({
            email: userDto.email,
        });
        if (userInDb) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.userRepository.create(userDto);
    }
    async findByLogin({ email, password }) {
        const user = await this.userRepository.findByCondition({
            email: email,
        });
        if (!user) {
            throw new common_1.HttpException({ message: ['Wrong email or password, please try again'] }, common_1.HttpStatus.UNAUTHORIZED);
        }
        const is_equal = bcrypt.compareSync(password, user.password);
        if (!is_equal) {
            throw new common_1.HttpException({ message: ['Wrong email or password, please try again'], status: common_1.HttpStatus.UNAUTHORIZED }, 401);
        }
        return user;
    }
    async findByEmail(email) {
        return await this.userRepository.findByCondition({
            email: email,
        });
    }
    async update(filter, update) {
        if (update.refreshToken) {
            update.refreshToken = await bcrypt.hash(this.reverse(update.refreshToken), 10);
        }
        return await this.userRepository.findByConditionAndUpdate(filter, update);
    }
    async getUserByRefresh(refresh_token, email) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
        const is_equal = await bcrypt.compare(this.reverse(refresh_token), user.refreshToken);
        if (!is_equal) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    reverse(s) {
        return s.split('').reverse().join('');
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map
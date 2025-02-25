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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(userDto) {
        const user = await this.userService.create(userDto);
        const token = await this._createToken(user);
        return {
            email: user.email,
            ...token,
        };
    }
    async login(loginUserDto) {
        const user = await this.userService.findByLogin(loginUserDto);
        const token = await this._createToken(user);
        return {
            user: user._id,
            email: user.email,
            ...token,
        };
    }
    async validateUser(email) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    async _createToken({ email }, refresh = true) {
        const accessToken = this.jwtService.sign({ email });
        if (refresh) {
            const refreshToken = this.jwtService.sign({ email }, {
                secret: 'huynhdangkhoa',
                expiresIn: '6000000',
            });
            await this.userService.update({ email: email }, {
                refreshToken: refreshToken,
            });
            return {
                expiresIn: '6000000',
                accessToken,
                refreshToken,
                expiresInRefresh: '2592000',
            };
        }
        else {
            return {
                expiresIn: '6000000',
                accessToken,
            };
        }
    }
    async refresh(refresh_token) {
        try {
            const payload = await this.jwtService.verify(refresh_token, {
                secret: 'huynhdangkhoa',
            });
            const user = await this.userService.getUserByRefresh(refresh_token, payload.email);
            const token = await this._createToken(user, false);
            return {
                email: user.email,
                ...token,
            };
        }
        catch (e) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async logout(user) {
        await this.userService.update({ email: user.email }, { refreshToken: null });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
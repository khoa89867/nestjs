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
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, LoginUserDto } from "../dto/user.dto";
import { User } from "../models/user.model";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(userDto: CreateUserDto): Promise<{
        expiresIn: string;
        accessToken: string;
        refreshToken: string;
        expiresInRefresh: string;
        email: any;
    } | {
        expiresIn: string;
        accessToken: string;
        refreshToken?: undefined;
        expiresInRefresh?: undefined;
        email: any;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        expiresIn: string;
        accessToken: string;
        refreshToken: string;
        expiresInRefresh: string;
        user: any;
        email: string;
    } | {
        expiresIn: string;
        accessToken: string;
        refreshToken?: undefined;
        expiresInRefresh?: undefined;
        user: any;
        email: string;
    }>;
    validateUser(email: any): Promise<import("mongoose").FlattenMaps<User> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    private _createToken;
    refresh(refresh_token: any): Promise<{
        expiresIn: string;
        accessToken: string;
        refreshToken: string;
        expiresInRefresh: string;
        email: string;
    } | {
        expiresIn: string;
        accessToken: string;
        refreshToken?: undefined;
        expiresInRefresh?: undefined;
        email: string;
    }>;
    logout(user: User): Promise<void>;
}

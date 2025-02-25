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
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
export declare class UserService {
    private readonly userModel;
    private readonly userRepository;
    constructor(userModel: Model<User>, userRepository: UserRepository);
    getAllUsers(): Promise<(import("mongoose").FlattenMaps<User> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    create(userDto: CreateUserDto): Promise<any>;
    findByLogin({ email, password }: LoginUserDto): Promise<import("mongoose").FlattenMaps<User> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByEmail(email: any): Promise<import("mongoose").FlattenMaps<User> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(filter: any, update: any): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getUserByRefresh(refresh_token: any, email: any): Promise<import("mongoose").FlattenMaps<User> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    private reverse;
}

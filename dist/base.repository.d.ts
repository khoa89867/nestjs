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
import { Model, Document, QueryOptions } from "mongoose";
export declare class BaseRepository<T extends Document> {
    private readonly model;
    constructor(model: Model<T>);
    create(doc: any): Promise<any>;
    findById(id: string, option?: QueryOptions): Promise<T>;
    findByCondition(filter: any, field?: any | null, option?: any | null, populate?: any | null): Promise<T extends any[] ? import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>[] : import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>>;
    getByCondition(filter: any, field?: any | null, option?: any | null, populate?: any | null): Promise<import("mongoose").Require_id<import("mongoose").FlattenMaps<T>>[]>;
    findAll(): Promise<T[]>;
    aggregate(option: any): Promise<any[]>;
    populate(result: T[], option: any): Promise<import("mongoose").IfAny<T, any, Document<unknown, {}, T> & import("mongoose").Require_id<T>>[]>;
    deleteOne(id: string): Promise<T | null>;
    deleteMany(filter: any): Promise<{
        deletedCount?: number;
    }>;
    deleteByCondition(filter: any): Promise<T[]>;
    findByConditionAndUpdate(filter: any, update: any): Promise<import("mongoose").IfAny<T, any, Document<unknown, {}, T> & import("mongoose").Require_id<T>>>;
    updateMany(filter: any, update: any, option?: any | null): Promise<import("mongoose").UpdateWriteOpResult>;
    findByIdAndUpdate(id: any, update: any): Promise<import("mongoose").IfAny<T, any, Document<unknown, {}, T> & import("mongoose").Require_id<T>>>;
}

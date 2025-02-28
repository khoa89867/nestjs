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
import { Schema, Document } from "mongoose";
import { User } from "src/user/models/user.model";
import { Category } from "./category.model";
declare const PostSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    collection: string;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title?: string;
    user?: import("mongoose").Types.ObjectId;
    description?: string;
    categories?: import("mongoose").Types.ObjectId;
    content?: string;
    view?: number;
    tag?: string;
    thumbnailUrl?: string;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title?: string;
    user?: import("mongoose").Types.ObjectId;
    description?: string;
    categories?: import("mongoose").Types.ObjectId;
    content?: string;
    view?: number;
    tag?: string;
    thumbnailUrl?: string;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title?: string;
    user?: import("mongoose").Types.ObjectId;
    description?: string;
    categories?: import("mongoose").Types.ObjectId;
    content?: string;
    view?: number;
    tag?: string;
    thumbnailUrl?: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export { PostSchema };
export interface Post extends Document {
    title: string;
    description: string;
    content: string;
    user: User;
    categories: Category;
}

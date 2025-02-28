"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    content: String,
    view: Number,
    tag: String,
    thumbnailUrl: String,
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    categories: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' },
}, {
    timestamps: true,
    collection: 'posts',
});
exports.PostSchema = PostSchema;
//# sourceMappingURL=post.model.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async create(doc) {
        const createdEntity = new this.model(doc);
        return await createdEntity.save();
    }
    async findById(id, option) {
        return this.model.findById(id, option);
    }
    async findByCondition(filter, field, option, populate) {
        return this.model.findOne(filter, field, option).populate(populate);
    }
    async getByCondition(filter, field, option, populate) {
        return this.model.find(filter, field, option).populate(populate);
    }
    async findAll() {
        return this.model.find();
    }
    async aggregate(option) {
        return this.model.aggregate(option);
    }
    async populate(result, option) {
        return await this.model.populate(result, option);
    }
    async deleteOne(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
    async deleteMany(filter) {
        return this.model.deleteMany(filter).exec();
    }
    async deleteByCondition(filter) {
        return this.model.find(filter).exec();
    }
    async findByConditionAndUpdate(filter, update) {
        return this.model.findOneAndUpdate(filter, update);
    }
    async updateMany(filter, update, option) {
        return this.model.updateMany(filter, update, option);
    }
    async findByIdAndUpdate(id, update) {
        return this.model.findByIdAndUpdate(id, update);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map
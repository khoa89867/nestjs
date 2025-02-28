import { PostRepository } from "src/post/repositories/post.repository";
export declare class UploadService {
    private readonly postRepository;
    constructor(postRepository: PostRepository);
    uploadFile(file: any): Promise<any>;
}

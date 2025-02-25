
import { File } from "buffer";
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    title: string;
    tag: string;
    view: number;
    description: string;
    content: string;
    thumbnailUrl: any;
    user: any;
    categories: any;
}
export class UpdatePostDto {
    description: string;
    title: string;
    content: string;
}
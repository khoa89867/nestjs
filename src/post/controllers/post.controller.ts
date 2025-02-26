import { Bind, Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { PostService } from '../services/post.service';
import { AuthGuard } from '@nestjs/passport';
import { PostRepository } from '../repositories/post.repository';
import { PaginationDto } from '../dto/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService, private readonly postRepository: PostRepository) {}
   
    @Get('count') 
    async getPostCountAndUsers() {
        return this.postService.getPostCountAndUsers();
    }

    @Get()
    getAllPosts() {
        return this.postService.getAllPosts();
    }

    @Get('page')
    async pagination(@Query() paginationDto: PaginationDto) {
        return this.postService.findAll(paginationDto);
    } 

    @Get(':id')
    @UseFilters()
    getPostById(@Param('id') id: string) {
        return this.postService.getPostById(id);
    }


    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard('jwt'))
    async createPost(@Req() req: any, @Body() post: CreatePostDto, @UploadedFile() file: Express.Multer.File) {
        return this.postService.createPost(req.user, post, file);
    }

    @Put(':id')
    async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
        return this.postService.replacePost(id, post);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        await this.postService.deletePost(id);
        return true;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('user/all')
    async getPostUser(@Req() req: any) {
        await req.user.populate('posts');
        return req.user.posts;
    }
    @Get('get/category')
    async getByCategory(@Query('category_id') category_id) {
        return await this.postService.getByCategory(category_id);
    }

    @Get('get/categories')
    async getByCategories(@Query('category_ids') category_ids) {
        return await this.postService.getByCategories(category_ids);
    }

    @Get('get/array')
    async getByArray() {
        return await this.postService.getByArray();
    }

}

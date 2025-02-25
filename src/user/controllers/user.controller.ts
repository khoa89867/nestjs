import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../services/user.service";

@Controller('user')
export class UserController {
    constructor(
        
        private readonly userService: UserService
    ) {}
    @UseGuards(AuthGuard())
    @Get('profile')
    async getProfile(@Req() req: any) {
        return req.user;
    }
    @Get('all')
    @Get('getall')
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
}

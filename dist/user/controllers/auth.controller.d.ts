import { AuthService } from "../services/auth.service";
import { CreateUserDto, LoginUserDto } from "../dto/user.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
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
    refresh(body: any): Promise<{
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
    logout(req: any): Promise<{
        statusCode: number;
        message: string;
    }>;
}

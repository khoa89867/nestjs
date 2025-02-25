import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, LoginUserDto } from "../dto/user.dto";
import { User } from "../models/user.model";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register(userDto: CreateUserDto) {
        const user = await this.userService.create(userDto);

        const token = await this._createToken(user);
        return {
            email: user.email,
            ...token,
        };
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.userService.findByLogin(loginUserDto);
        const token = await this._createToken(user);

        return {
            user: user._id,
            email: user.email,
            ...token,
        };
    }

    async validateUser(email) {
        const user = await this.userService.findByEmail(email);
        if(!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    private async _createToken({ email }, refresh = true) {
        const accessToken = this.jwtService.sign({ email });

        if(refresh) {
            const refreshToken = this.jwtService.sign(
                { email },
                {
                    secret: 'huynhdangkhoa',
                    expiresIn: '6000000',
                }
            );
            await this.userService.update(
                { email: email },
                {
                    refreshToken: refreshToken,
                }
            );
            return {
                expiresIn: '6000000',
                accessToken,
                refreshToken,
                expiresInRefresh: '2592000',
            };
        } else {
            return {
                expiresIn: '6000000',
                accessToken,
            };
        }
        
    }

    async refresh(refresh_token) {
        try {
          const payload = await this.jwtService.verify(refresh_token, {
            secret: 'huynhdangkhoa',
          });
          const user = await this.userService.getUserByRefresh(
            refresh_token,
            payload.email,
          );
          const token = await this._createToken(user, false);
          return {
            email: user.email,
            ...token,
          };
        } catch (e) {
          throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }

    async logout(user: User) {
        await this.userService.update({ email: user.email }, { refreshToken: null })
    }
}
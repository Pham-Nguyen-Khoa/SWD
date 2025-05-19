import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginDto } from "../dto/login.dto";
import { PrismaService } from "src/libs/prisma/prisma.service";
import { compare } from "bcrypt"
import { JwtService } from "@nestjs/jwt";


const EXPIRE_TIME = 3600 * 1000;

@Injectable()
export class LoginService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }
    async login(data: LoginDto) {

        // Check User tồn tại bởi email
        const user = await this.prisma.account.findUnique({
            where: {
                email: data.email
            }
        })
        if (!user) {
            throw new HttpException({ message: "Tài khoản không tồn tại" }, HttpStatus.UNAUTHORIZED)
        }

        // Kiểm tra password    

        const verify = await compare(data.password, user.password);
        if (!verify) {
            throw new HttpException({ message: "Mật khẩu không đúng " }, HttpStatus.UNAUTHORIZED)
        }


        // Generate Access token and Refresh Token
        const payload = { id: user.id, name: user.fullname, email: user.email, roleID: user.roleID }

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_KEY,
            expiresIn: '1h'
        })

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.SECRET_KEY_REFRESH,
            expiresIn: '7d'
        })

        const { password, ...result } = user
        return {
            user: result,
            backendToken: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
            }
        }
    }
}
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import type { SignupDto, LoginDto } from "./dto/auth.dto";
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signup(dto: SignupDto): Promise<{
        user: {
            email: string;
            name: string;
            id: string;
            createdAt: Date;
        };
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            createdAt: Date;
        };
        token: string;
    }>;
    validateUser(userId: string): Promise<{
        email: string;
        name: string;
        id: string;
        createdAt: Date;
    }>;
}

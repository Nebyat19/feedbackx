import { AuthService } from "./auth.service";
import type { SignupDto, LoginDto } from "./dto/auth.dto";
import type { Request } from "express";
interface AuthenticatedRequest extends Request {
    user: {
        sub: string;
        email: string;
    };
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    getProfile(req: AuthenticatedRequest): Promise<{
        sub: string;
        email: string;
    }>;
}
export {};

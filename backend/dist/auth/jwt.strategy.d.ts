import { Strategy } from "passport-jwt";
import type { ConfigService } from "@nestjs/config";
import type { AuthService } from "./auth.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService, config: ConfigService);
    validate(payload: {
        sub: string;
        email: string;
    }): Promise<{
        email: string;
        name: string;
        id: string;
        createdAt: Date;
    }>;
}
export {};

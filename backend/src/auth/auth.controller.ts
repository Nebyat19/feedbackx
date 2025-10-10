import { Controller, Post, Get, Body, UseGuards, Req } from "@nestjs/common"
import { AuthService } from "./auth.service"
import type { SignupDto, LoginDto } from "./dto/auth.dto"
import { JwtAuthGuard } from "./jwt-auth.guard"
import type { Request } from "express"

interface AuthenticatedRequest extends Request {
  user: { sub: string; email: string }
}

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto)
  }

  @Post("login")
  async login(@Body() dto: LoginDto) {
    console.log(dto)
    return this.authService.login(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getProfile(@Req() req: AuthenticatedRequest) {
    return req.user
  }
}

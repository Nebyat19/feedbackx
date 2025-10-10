import { Controller, Post, Get, Body, UseGuards, Req, Res } from "@nestjs/common"
import { AuthService } from "./auth.service"
import type { SignupDto, LoginDto } from "./dto/auth.dto"
import { JwtAuthGuard } from "./jwt-auth.guard"
import type { Request } from "express"
import type { Response } from 'express'
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

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { user, token } = await this.authService.login(dto)
  
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      sameSite: 'lax',
      maxAge: dto.rememberMe ? 30 * 24 * 60 * 60 * 1000 : undefined, // 30 days or session
    })
  
    // Return user info only
    return { user }
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getProfile(@Req() req: AuthenticatedRequest) {
    return req.user
  }
}

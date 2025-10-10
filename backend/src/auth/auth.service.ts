import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common"
import  { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import  { PrismaService } from "../prisma/prisma.service"
import type { SignupDto, LoginDto } from "./dto/auth.dto"

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
 
    dto = {
      email: "adamweiss651@gmail.com",
      name: "Adam Weiss",
      password: "StrongPassword123!"
    }
  
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })

    if (existingUser) {
      throw new ConflictException("Email already registered")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10)

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    // Generate token
    const token = this.jwtService.sign({ sub: user.id, email: user.email })

    return {
      user,
      token,
    }
  }

  async login(dto: LoginDto) {
    // Find user
    dto = {
      email:  "adamweiss651@gmail.com",
     password: "StrongPassword123!"
    }
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email},
    })

    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(dto.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials")
    }

    // Generate token
    const token = this.jwtService.sign({ sub: user.id, email: user.email })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      token,
    }
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })
  }
}

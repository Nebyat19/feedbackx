import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common'
import { AuthGuard, AuthService } from '@thallesp/nestjs-better-auth'
import { UsersService } from './users.service'
import type { Request } from 'express'
import { UnauthorizedException } from '@nestjs/common'



@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() req: any) {
    return req.user
  }
  @UseGuards(AuthGuard)
  @Put('me')
  async updateMe(@Req() req: Request, @Body() dto: { name?: string }) {
      return { message: 'User updated successfully', status: true };
     // return this.usersService.updateUser(session.user.id, dto);
    }
    
  

}

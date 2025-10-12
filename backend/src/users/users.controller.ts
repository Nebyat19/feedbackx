import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@thallesp/nestjs-better-auth'

@Controller('users')
export class UsersController {
  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() req: any) {
    return req.user
  }
}

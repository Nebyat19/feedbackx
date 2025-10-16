import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ObjectId } from "bson"
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

   
    async updateUser(userId: string, dto: { name?: string }) {
        // Log all user IDs in your database to see the format
const allUsers = await this.prisma.user.findMany({
    select: { id: true }
  });
  console.log('Database user IDs:', allUsers);
        const user = await this.prisma.user.findUnique({
          where: { id: userId }, // Use the string ID directly
        })
        if (!user) throw new Error(`User with id ${userId} not found`)
      
        return this.prisma.user.update({
          where: { id: userId }, // Use the string ID directly
          data: dto,
        })
      }
    
      
      
    
}

import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

import type { CreateProjectDto, UpdateProjectDto } from "./dto/project.dto"

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...dto,
        userId,
      },
      include: {
        _count: {
          select: { feedback: true },
        },
      },
    })
  }

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { userId },
      include: {
        _count: {
          select: { feedback: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })
  }

  async findOne(id: string, userId?: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        _count: {
          select: { feedback: true },
        },
      },
    })

    if (!project) {
      throw new NotFoundException("Project not found")
    }

    // If userId is provided, check ownership
    if (userId && project.userId !== userId) {
      throw new ForbiddenException("Access denied")
    }

    return project
  }

  async update(id: string, userId: string, dto: UpdateProjectDto) {
    // Check ownership
    const project = await this.findOne(id, userId)

    return this.prisma.project.update({
      where: { id },
      data: dto,
      include: {
        _count: {
          select: { feedback: true },
        },
      },
    })
  }

  async delete(id: string, userId: string) {
    // Check ownership
    await this.findOne(id, userId)

    await this.prisma.project.delete({
      where: { id },
    })

    return { message: "Project deleted successfully" }
  }

  async getStats(id: string, userId: string) {
    // Check ownership
    await this.findOne(id, userId)

    const [total, byStatus, byCategory] = await Promise.all([
      this.prisma.feedback.count({ where: { projectId: id } }),
      this.prisma.feedback.groupBy({
        by: ["status"],
        where: { projectId: id },
        _count: true,
      }),
      this.prisma.feedback.groupBy({
        by: ["category"],
        where: { projectId: id },
        _count: true,
      }),
    ])

    return {
      total,
      byStatus: byStatus.reduce((acc, item) => {
        acc[item.status] = item._count
        return acc
      }, {}),
      byCategory: byCategory.reduce((acc, item) => {
        acc[item.category] = item._count
        return acc
      }, {}),
    }
  }
}

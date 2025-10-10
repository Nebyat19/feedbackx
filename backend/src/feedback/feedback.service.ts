import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common"
import  { PrismaService } from "../prisma/prisma.service"
import type { CreateFeedbackDto, UpdateFeedbackStatusDto } from "./dto/feedback.dto"

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async create(projectId: string, dto: CreateFeedbackDto) {
    // Check if project exists and is active
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      throw new NotFoundException("Project not found")
    }

    if (project.status === "paused") {
      throw new ForbiddenException("This project is not accepting feedback at the moment")
    }

    return this.prisma.feedback.create({
      data: {
        ...dto,
        projectId,
      },
    })
  }

  async findAll(projectId: string, status?: string) {
    const where: any = { projectId }
    if (status) {
      where.status = status
    }

    return this.prisma.feedback.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })
  }

  async findAllPublic(projectId: string) {
    // Check if project is public
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      throw new NotFoundException("Project not found")
    }

    if (!project.isPublic) {
      throw new ForbiddenException("This project feedback is private")
    }

    return this.prisma.feedback.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" },
    })
  }

  async updateStatus(id: string, userId: string, dto: UpdateFeedbackStatusDto) {
    // Get feedback with project
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
      include: { project: true },
    })

    if (!feedback) {
      throw new NotFoundException("Feedback not found")
    }

    // Check if user owns the project
    if (feedback.project.userId !== userId) {
      throw new ForbiddenException("Access denied")
    }

    return this.prisma.feedback.update({
      where: { id },
      data: { status: dto.status },
    })
  }

  async delete(id: string, userId: string) {
    // Get feedback with project
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
      include: { project: true },
    })

    if (!feedback) {
      throw new NotFoundException("Feedback not found")
    }

    // Check if user owns the project
    if (feedback.project.userId !== userId) {
      throw new ForbiddenException("Access denied")
    }

    await this.prisma.feedback.delete({
      where: { id },
    })

    return { message: "Feedback deleted successfully" }
  }
}

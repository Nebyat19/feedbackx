import { PrismaService } from "../prisma/prisma.service";
import type { CreateFeedbackDto, UpdateFeedbackStatusDto } from "./dto/feedback.dto";
export declare class FeedbackService {
    private prisma;
    constructor(prisma: PrismaService);
    create(projectId: string, dto: CreateFeedbackDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        message: string;
        category: string;
        projectId: string;
    }>;
    findAll(projectId: string, status?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        message: string;
        category: string;
        projectId: string;
    }[]>;
    findAllPublic(projectId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        message: string;
        category: string;
        projectId: string;
    }[]>;
    updateStatus(id: string, userId: string, dto: UpdateFeedbackStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        message: string;
        category: string;
        projectId: string;
    }>;
    delete(id: string, userId: string): Promise<{
        message: string;
    }>;
}

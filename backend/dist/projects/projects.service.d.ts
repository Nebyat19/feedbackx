import { PrismaService } from "../prisma/prisma.service";
import type { CreateProjectDto, UpdateProjectDto } from "./dto/project.dto";
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateProjectDto): Promise<{
        _count: {
            feedback: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        isPublic: boolean;
        status: string;
        userId: string;
    }>;
    findAll(userId: string): Promise<({
        _count: {
            feedback: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        isPublic: boolean;
        status: string;
        userId: string;
    })[]>;
    findOne(id: string, userId?: string): Promise<{
        _count: {
            feedback: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        isPublic: boolean;
        status: string;
        userId: string;
    }>;
    update(id: string, userId: string, dto: UpdateProjectDto): Promise<{
        _count: {
            feedback: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        isPublic: boolean;
        status: string;
        userId: string;
    }>;
    delete(id: string, userId: string): Promise<{
        message: string;
    }>;
    getStats(id: string, userId: string): Promise<{
        total: number;
        byStatus: {};
        byCategory: {};
    }>;
}

import { ProjectsService } from "./projects.service";
import type { CreateProjectDto, UpdateProjectDto } from "./dto/project.dto";
import type { Request } from "express";
interface AuthenticatedRequest extends Request {
    user: {
        id: string;
    };
}
export declare class ProjectsController {
    private projectsService;
    constructor(projectsService: ProjectsService);
    create(req: AuthenticatedRequest, dto: CreateProjectDto): Promise<{
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
    findAll(req: AuthenticatedRequest): Promise<({
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
    findOne(id: string, req: AuthenticatedRequest): Promise<{
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
    update(id: string, dto: UpdateProjectDto, req: AuthenticatedRequest): Promise<{
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
    delete(id: string, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
    getStats(id: string, req: AuthenticatedRequest): Promise<{
        total: number;
        byStatus: {};
        byCategory: {};
    }>;
}
export {};

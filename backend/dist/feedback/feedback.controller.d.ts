import { FeedbackService } from "./feedback.service";
import type { CreateFeedbackDto, UpdateFeedbackStatusDto } from "./dto/feedback.dto";
export declare class FeedbackController {
    private feedbackService;
    constructor(feedbackService: FeedbackService);
    create(projectId: string, dto: CreateFeedbackDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        message: string;
        category: string;
        projectId: string;
    }>;
    findAllPublic(projectId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        message: string;
        category: string;
        projectId: string;
    }[]>;
    findAll(projectId: string, status?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        message: string;
        category: string;
        projectId: string;
    }[]>;
    updateStatus(req: any, id: string, dto: UpdateFeedbackStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        message: string;
        category: string;
        projectId: string;
    }>;
    delete(req: any, id: string): Promise<{
        message: string;
    }>;
}

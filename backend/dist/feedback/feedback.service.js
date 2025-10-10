"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FeedbackService = class FeedbackService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(projectId, dto) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            throw new common_1.NotFoundException("Project not found");
        }
        if (project.status === "paused") {
            throw new common_1.ForbiddenException("This project is not accepting feedback at the moment");
        }
        return this.prisma.feedback.create({
            data: {
                ...dto,
                projectId,
            },
        });
    }
    async findAll(projectId, status) {
        const where = { projectId };
        if (status) {
            where.status = status;
        }
        return this.prisma.feedback.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });
    }
    async findAllPublic(projectId) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            throw new common_1.NotFoundException("Project not found");
        }
        if (!project.isPublic) {
            throw new common_1.ForbiddenException("This project feedback is private");
        }
        return this.prisma.feedback.findMany({
            where: { projectId },
            orderBy: { createdAt: "desc" },
        });
    }
    async updateStatus(id, userId, dto) {
        const feedback = await this.prisma.feedback.findUnique({
            where: { id },
            include: { project: true },
        });
        if (!feedback) {
            throw new common_1.NotFoundException("Feedback not found");
        }
        if (feedback.project.userId !== userId) {
            throw new common_1.ForbiddenException("Access denied");
        }
        return this.prisma.feedback.update({
            where: { id },
            data: { status: dto.status },
        });
    }
    async delete(id, userId) {
        const feedback = await this.prisma.feedback.findUnique({
            where: { id },
            include: { project: true },
        });
        if (!feedback) {
            throw new common_1.NotFoundException("Feedback not found");
        }
        if (feedback.project.userId !== userId) {
            throw new common_1.ForbiddenException("Access denied");
        }
        await this.prisma.feedback.delete({
            where: { id },
        });
        return { message: "Feedback deleted successfully" };
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map
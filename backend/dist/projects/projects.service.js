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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
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
        });
    }
    async findAll(userId) {
        return this.prisma.project.findMany({
            where: { userId },
            include: {
                _count: {
                    select: { feedback: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }
    async findOne(id, userId) {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { feedback: true },
                },
            },
        });
        if (!project) {
            throw new common_1.NotFoundException("Project not found");
        }
        if (userId && project.userId !== userId) {
            throw new common_1.ForbiddenException("Access denied");
        }
        return project;
    }
    async update(id, userId, dto) {
        const project = await this.findOne(id, userId);
        return this.prisma.project.update({
            where: { id },
            data: dto,
            include: {
                _count: {
                    select: { feedback: true },
                },
            },
        });
    }
    async delete(id, userId) {
        await this.findOne(id, userId);
        await this.prisma.project.delete({
            where: { id },
        });
        return { message: "Project deleted successfully" };
    }
    async getStats(id, userId) {
        await this.findOne(id, userId);
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
        ]);
        return {
            total,
            byStatus: byStatus.reduce((acc, item) => {
                acc[item.status] = item._count;
                return acc;
            }, {}),
            byCategory: byCategory.reduce((acc, item) => {
                acc[item.category] = item._count;
                return acc;
            }, {}),
        };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from "@nestjs/common"
import  { ProjectsService } from "./projects.service"
import type { CreateProjectDto, UpdateProjectDto } from "./dto/project.dto"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import type { Request } from "express"

interface AuthenticatedRequest extends Request {
  user: { id: string }
}

@Controller("projects")
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateProjectDto) {
    return this.projectsService.create(req.user.id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.projectsService.findAll(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string, @Req() req: AuthenticatedRequest) {
    return this.projectsService.findOne(id, req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateProjectDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.projectsService.update(id, req.user.id, dto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  delete(@Param("id") id: string, @Req() req: AuthenticatedRequest) {
    return this.projectsService.delete(id, req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id/stats")
  getStats(@Param("id") id: string, @Req() req: AuthenticatedRequest) {
    return this.projectsService.getStats(id, req.user.id)
  }
}

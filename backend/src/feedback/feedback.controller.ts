import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request, Req } from "@nestjs/common"
import  { FeedbackService } from "./feedback.service"
import type { CreateFeedbackDto, UpdateFeedbackStatusDto } from "./dto/feedback.dto"
import { AuthGuard } from "@thallesp/nestjs-better-auth" 
import { auth } from "src/lib/auth"
import { ProjectsService } from "src/projects/projects.service"
import { error } from "console"

@Controller("feedback")
export class FeedbackController {
  constructor(
    private feedbackService: FeedbackService,
    private projectService: ProjectsService,

  ) {}

  // Public endpoint - no auth required
  @Post("project/:projectId")
  create(@Param('projectId') projectId: string, @Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(projectId, dto)
  }

  // Public endpoint - get public feedback
  @Get('public/project/:projectId') 
  findAllPublic(@Param('projectId') projectId: string) {
    return this.feedbackService.findAllPublic(projectId);
  }

  @UseGuards(AuthGuard)
  @Get("project/:projectId")
  async findAll(
    @Param('projectId') projectId: string,
    @Req() req: Request,
    @Query('status') status?: string,
   
  ) {
    const session = await auth.api.getSession({
      headers: req.headers
    });
    
    if (!session || !session.user) {
      throw new Error("Unauthorized");
    }
    
   const project = await this.projectService.findOne(projectId, session.user.id);
    if (project.userId !== session.user.id) {
      throw new error('You are not the owner of this project');
    }
    
    return this.feedbackService.findAll(projectId, status);
  }

  @UseGuards(AuthGuard)
  @Put(":id/status")
  updateStatus(@Request() req, @Param('id') id: string, @Body() dto: UpdateFeedbackStatusDto) {
    return this.feedbackService.updateStatus(id, req.user.id, dto)
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  delete(@Request() req, @Param('id') id: string) {
    return this.feedbackService.delete(id, req.user.id)
  }
}

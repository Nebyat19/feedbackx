import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from "@nestjs/common"
import  { FeedbackService } from "./feedback.service"
import type { CreateFeedbackDto, UpdateFeedbackStatusDto } from "./dto/feedback.dto"
import { AuthGuard } from "@thallesp/nestjs-better-auth" 

@Controller("feedback")
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  // Public endpoint - no auth required
  @Post("project/:projectId")
  create(@Param('projectId') projectId: string, @Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(projectId, dto)
  }

  // Public endpoint - get public feedback
  @Get('project/:projectId') 
  findAllPublic(@Param('projectId') projectId: string) {
    return this.feedbackService.findAllPublic(projectId);
  }

  // Protected endpoint - get all feedback for project owner
  @UseGuards(AuthGuard)
  @Get("project/:projectId")
  findAll(@Param('projectId') projectId: string, @Query('status') status?: string) {
    return this.feedbackService.findAll(projectId, status)
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

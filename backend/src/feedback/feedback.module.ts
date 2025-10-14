import { Module } from "@nestjs/common"
import { FeedbackController } from "./feedback.controller"
import { FeedbackService } from "./feedback.service"
import { ProjectsService } from "src/projects/projects.service"

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, ProjectsService],
})
export class FeedbackModule {}

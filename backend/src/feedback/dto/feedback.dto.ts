import { IsString, IsEnum } from "class-validator"

export class CreateFeedbackDto {
  @IsString()
  message: string

  @IsEnum(["bug", "feature", "improvement", "question", "other"])
  category: string
}

export class UpdateFeedbackStatusDto {
  @IsEnum(["new", "in_progress", "reviewed", "resolved", "archived"])
  status: string
}

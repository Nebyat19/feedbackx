import { IsString, IsBoolean, IsOptional, IsEnum } from "class-validator"

export class CreateProjectDto {
  @IsString()
  title: string

  @IsString()
  @IsOptional()
  description?: string

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean

  @IsEnum(["active", "paused"])
  @IsOptional()
  status?: string
}

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean

  @IsEnum(["active", "paused"])
  @IsOptional()
  status?: string
}

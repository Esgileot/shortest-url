import { IsString, IsUrl, Length } from 'class-validator'

export class LongUrlDto {
  @IsUrl({}, { message: 'Invalid URL format' })
  @IsString()
  @Length(5, 2000, {
    message: 'Long URL length must be between 5 and 2000 characters',
  })
  longUrl: string
}

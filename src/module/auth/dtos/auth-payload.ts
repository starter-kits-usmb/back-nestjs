import { ApiProperty } from '@nestjs/swagger';

export class AuthPayload {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;
}

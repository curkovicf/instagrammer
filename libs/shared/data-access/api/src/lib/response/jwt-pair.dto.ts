import { JwtDto } from './jwt.dto';

export interface JwtPairDto {
  accessToken: JwtDto;
  refreshToken: JwtDto;
}

import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import {
  JwtDto,
  LoginRequestDto,
  LoginResponseDto,
  LogoutRequestDto,
  RefreshJwtRequestDto,
  RegisterRequestDto,
  UsernameExistsRequestDto,
} from '@instagrammer/shared-data-access-api-auth-dto';
import { Request, Response } from 'express';
import { AuthService } from '@instagrammer/api/auth/data-access';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async register(@Body() registerDto: RegisterRequestDto): Promise<void> {
    return await this.authService.register(registerDto);
  }

  @Post('/username-exists')
  public async checkUsernameExists(@Body() usernameExistsDto: UsernameExistsRequestDto): Promise<UsernameExistsRequestDto> {
    return await this.authService.checkIfUsernameExists(usernameExistsDto);
  }

  @Post('/login')
  public async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    const { loginResponseDto, refreshToken } = await this.authService.login(loginDto);
    const newCookie = this.authService.createNewHttpHeaderWithCookie(refreshToken);

    res.setHeader('Set-Cookie', newCookie);

    return loginResponseDto;
  }

  @Post('/refresh-jwt')
  public async refreshJwt(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() refreshJwtDto: RefreshJwtRequestDto,
  ): Promise<JwtDto> {
    const { accessToken, refreshToken } = await this.authService.generateNewRefreshJwt(refreshJwtDto);
    const newCookie = this.authService.createNewHttpHeaderWithCookie(refreshToken.value);

    res.setHeader('Set-Cookie', newCookie);

    return accessToken;
  }

  @Get('/access-jwt')
  public async getAccessJwt(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<LoginResponseDto> {
    const refreshJwtFromCookie = req.cookies.Authentication;

    return await this.authService.generateNewAccessToken(refreshJwtFromCookie);
  }

  @Post('/logout')
  public async logout(@Res({ passthrough: true }) res: Response, @Body() logoutDto: LogoutRequestDto): Promise<void> {
    res.clearCookie('Authentication', { path: '/auth', httpOnly: true, sameSite: 'strict' });

    return await this.authService.logout(logoutDto);
  }
}

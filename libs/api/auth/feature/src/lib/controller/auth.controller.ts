import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import {
  AuthService,
  RegisterDto,
  LoginDto,
  UsernameExistsDto,
  LogoutDto,
  RefreshJwtDto,
  JwtTokenDto,
} from '@instagrammer/api/auth/data-access';
import { LoginResponseDto, UsernameExistsResponseDto } from '@instagrammer/shared/data-access/api-dtos';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async register(@Body() registerDto: RegisterDto): Promise<void> {
    return await this.authService.register(registerDto);
  }

  @Post('/username-exists')
  public async checkUsernameExists(@Body() usernameExistsDto: UsernameExistsDto): Promise<UsernameExistsResponseDto> {
    return await this.authService.checkIfUsernameExists(usernameExistsDto);
  }

  @Post('/login')
  public async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginDto,
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
    @Body() refreshJwtDto: RefreshJwtDto,
  ): Promise<JwtTokenDto> {
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
  public async logout(@Res({ passthrough: true }) res: Response, @Body() logoutDto: LogoutDto): Promise<void> {
    res.clearCookie('Authentication', { path: '/auth', httpOnly: true, sameSite: 'strict' });

    return await this.authService.logout(logoutDto);
  }
}

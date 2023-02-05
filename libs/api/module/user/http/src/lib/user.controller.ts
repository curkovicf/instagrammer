import { Body, Controller, Get, MethodNotAllowedException, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '@instagrammer/api/module/user/logic';
import { UserApi } from '@instagrammer/shared/data/api';

@Controller('auth')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('/register')
  public async register(@Body() registerDto: UserApi.RegisterRequestDto): Promise<void> {
    return await this.authService.register(registerDto);
  }

  @Post('/username-exists')
  public async checkUsernameExists(
    @Body() usernameExistsDto: UserApi.UsernameExistsRequestDto,
  ): Promise<UserApi.UsernameExistsRequestDto> {
    return await this.authService.checkIfUsernameExists(usernameExistsDto);
  }

  @Post('/login')
  public async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: UserApi.LoginRequestDto,
  ): Promise<UserApi.LoginResponseDto> {
    const { loginResponseDto, refreshToken } = await this.authService.login(loginDto);
    const newCookie = this.authService.createNewHttpHeaderWithCookie(refreshToken);

    res.setHeader('Set-Cookie', newCookie);

    return loginResponseDto;
  }

  @Post('/refresh-jwt')
  public async refreshJwt(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() refreshJwtDto: UserApi.RefreshJwtRequestDto,
  ): Promise<UserApi.JwtDto> {
    const { accessToken, refreshToken } = await this.authService.generateNewRefreshJwt(refreshJwtDto);
    const newCookie = this.authService.createNewHttpHeaderWithCookie(refreshToken.value);

    res.setHeader('Set-Cookie', newCookie);

    return accessToken;
  }

  @Get('/access-jwt')
  public async getAccessJwt(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserApi.LoginResponseDto | boolean> {
    const refreshJwtFromCookie = req.cookies.Authentication;

    try {
      return await this.authService.generateNewAccessToken(refreshJwtFromCookie);
    } catch (err) {
      if (!(err instanceof MethodNotAllowedException)) {
        throw err;
      }

      res.clearCookie('Authentication', { path: '/auth', httpOnly: true, sameSite: 'strict' });

      return false;
    }
  }

  @Post('/logout')
  public async logout(
    @Res({ passthrough: true }) res: Response,
    @Body() logoutDto: UserApi.LogoutRequestDto,
  ): Promise<void> {
    res.clearCookie('Authentication', { path: '/', httpOnly: true, sameSite: 'strict' });

    return await this.authService.logout(logoutDto);
  }
}

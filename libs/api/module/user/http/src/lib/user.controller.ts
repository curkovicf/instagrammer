import {
  Body,
  Controller,
  Get,
  Logger,
  MethodNotAllowedException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '@instagrammer/api/module/user/logic';
import { UserApi } from '@instagrammer/shared/data/api';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenFromCookie } from '@instagrammer/api/core/middleware/decorator';

@Controller('auth')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly authService: UserService) {}

  @Post('/register')
  public async register(@Body() registerDto: UserApi.RegisterRequestDto): Promise<void> {
    this.logger.debug(`Trying to register new user, data: ${registerDto}`);

    return await this.authService.register(registerDto);
  }

  @Post('/username-exists')
  public async checkUsernameExists(
    @Body() usernameExistsDto: UserApi.UsernameExistsRequestDto,
  ): Promise<UserApi.UsernameExistsRequestDto> {
    this.logger.debug(`Checking if username exists, data: ${usernameExistsDto}`);

    return await this.authService.checkIfUsernameExists(usernameExistsDto);
  }

  @Post('/login')
  public async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: UserApi.LoginRequestDto,
  ): Promise<UserApi.LoginResponseDto> {
    this.logger.debug(`Trying to login user, data: ${loginDto}`);

    const { loginResponseDto, refreshToken } = await this.authService.login(loginDto);
    const newCookie = this.authService.createNewHttpHeaderWithCookie(refreshToken);

    res.setHeader('Set-Cookie', newCookie);

    return loginResponseDto;
  }

  @Post('/refresh-jwt')
  public async signInViaRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() refreshJwtDto: UserApi.RefreshJwtRequestDto,
  ): Promise<UserApi.JwtDto> {
    this.logger.debug(`Trying to sign in via refresh token, data: ${refreshJwtDto}`);

    const { accessToken, refreshToken } = await this.authService.generateNewRefreshJwt(refreshJwtDto);
    const newCookie = this.authService.createNewHttpHeaderWithCookie(refreshToken.value);

    res.setHeader('Set-Cookie', newCookie);

    return accessToken;
  }

  @Get('/access-jwt')
  public async getAccessJwt(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @RefreshTokenFromCookie() refreshToken: string,
  ): Promise<UserApi.LoginResponseDto | boolean> {
    this.logger.debug(`Trying to get new access token}`);

    try {
      return await this.authService.generateNewAccessToken(refreshToken);
    } catch (err) {
      if (!(err instanceof MethodNotAllowedException)) {
        throw err;
      }

      res.clearCookie('Authentication', { path: '/auth', httpOnly: true, sameSite: 'strict' });

      return false;
    }
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt'))
  public async logout(
    @Res({ passthrough: true }) res: Response,
    @Body() logoutDto: UserApi.LogoutRequestDto,
  ): Promise<void> {
    this.logger.debug(`Trying to logout, data: ${logoutDto}`);

    res.clearCookie('Authentication', { path: '/', httpOnly: true, sameSite: 'strict' });

    return await this.authService.logout(logoutDto);
  }
}

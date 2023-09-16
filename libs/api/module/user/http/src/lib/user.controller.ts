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
  public async register(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() registerDto: UserApi.RegisterRequestDto,
  ): Promise<UserApi.LoginResponseDtoV2> {
    this.logger.debug(`Registering new user, data: ${registerDto}`);

    const { loginResponseDto, refreshToken, accessToken } = await this.authService.signUpV2(registerDto);

    const refreshTokenCookie = this.authService.createNewHttpHeaderWithCookie(refreshToken);
    const accessTokenCookie = this.authService.createNewHttpHeaderWithCookie(accessToken);

    res.setHeader('Set-Cookie', newCookie);


    return loginResponse.loginResponseDto;
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
    this.logger.debug(`Sign in user, data: ${loginDto}`);

    const { loginResponseDto, refreshToken } = await this.authService.signIn(loginDto);
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
    this.logger.debug(`Sign in user via refresh token, data: ${refreshJwtDto}`);

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
    this.logger.debug(`Get new access token`);

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
    this.logger.debug(`Logging out user, data: ${logoutDto}`);

    res.clearCookie('Authentication', { path: '/', httpOnly: true, sameSite: 'strict' });

    return await this.authService.logout(logoutDto);
  }
}

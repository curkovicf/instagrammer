import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  MethodNotAllowedException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserApi } from '@instagrammer/shared/data/api';
import { AuthGuard } from '@nestjs/passport';
import {
  ACCESS_TOKEN_EXPIRES_IN_SECONDS, REFRESH_TOKEN_LONG_EXPIRES_IN_SECONDS, REFRESH_TOKEN_SHORT_EXPIRES_IN_SECONDS,
  RefreshTokenFromCookie,
} from '@instagrammer/api/module/auth/middleware';
import { AuthService, SignUpDto } from '@instagrammer/api/module/auth/logic';
import { CookieService } from '@instagrammer/api/module/auth/util';
import { JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariable } from '@instagrammer/api/core/env';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    @Inject(ACCESS_TOKEN_EXPIRES_IN_SECONDS) private readonly accessTokenSignOptions: JwtSignOptions,
    @Inject(REFRESH_TOKEN_LONG_EXPIRES_IN_SECONDS) private readonly refreshTokenLongSignOptions: JwtSignOptions,
    @Inject(REFRESH_TOKEN_SHORT_EXPIRES_IN_SECONDS) private readonly refreshTokenShortSignOptions: JwtSignOptions,
    private readonly configService: ConfigService,
  ) {}

  @Post('/sign-up')
  public async register(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() signUpDto: SignUpDto,
  ): Promise<UserApi.LoginResponseDtoV2> {
    this.logger.debug(`Signing up new user, data: ${signUpDto}`);

    const { loginResponseDto, refreshToken, accessToken } = await this.authService.signUp(signUpDto);

    const refreshTokenCookie = this.authService.createNewHttpHeaderWithCookie(refreshToken);
    const accessTokenCookie = this.authService.createNewHttpHeaderWithCookie(accessToken);

    const accessTokenExpiresMs = this.configService.get(EnvironmentVariable.ACCESS_TOKEN_EXPIRES_IN_SECONDS);
    const refreshTokenShortMs = this.configService.get(
      EnvironmentVariable.REFRESH_TOKEN_SHORT_EXPIRES_IN_SECONDS,
    );

    res.setHeader(
      'Set-Cookie',
      this.cookieService.createCookie({
        title: 'Refresh-Token',
        token: '',
        expiresInMillis: 0,
      }),
    );

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

import { Body, Controller, Get, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthApi, UserApi } from '@instagrammer/shared/data/api';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, SignInDto, SignOutDto, SignUpDto } from '@instagrammer/api/module/auth/logic';
import { CookieService } from '@instagrammer/api/module/auth/util';
import { RefreshTokenFromCookie } from '@instagrammer/api/module/auth/middleware';
import SignInResponseDto = AuthApi.SignInResponseDto;

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService, private readonly cookieService: CookieService) {}

  /**
   * Signs up & in new user with short session
   *
   * @param req
   * @param res
   * @param signUpDto
   */
  @Post('/sign-up')
  public async signUp(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() signUpDto: SignUpDto,
  ): Promise<UserApi.LoginResponseDto> {
    this.logger.debug(`Signing up new user, data: ${signUpDto}`);

    //  1. Create account
    await this.authService.signUp(signUpDto);

    //  2. Sign in new user
    const { accessToken, refreshToken, loginResponseDto } = await this.authService.signIn({
      ...signUpDto,
      isLongSession: false,
    });

    //  3. Attach cookies to headers
    res.setHeader('Set-Cookie', this.cookieService.createAccessTokenCookie(accessToken));
    res.setHeader('Set-Cookie', this.cookieService.createRefreshTokenCookie(refreshToken, false));

    //  4. Return login response
    return loginResponseDto;
  }

  /**
   * Signs user in
   *
   * @param req
   * @param res
   * @param signInDto
   */
  @Post('/sign-in')
  public async signIn(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() signInDto: SignInDto,
  ): Promise<UserApi.LoginResponseDto> {
    this.logger.debug(`Sign in user, data: ${signInDto}`);

    const { loginResponseDto, accessToken, refreshToken } = await this.authService.signIn(signInDto);

    res.setHeader('Set-Cookie', [
      `${this.cookieService.ACCESS_TOKEN_KEY}=${this.cookieService.createAccessTokenCookie(accessToken)}`,
      `${this.cookieService.REFRESH_TOKEN_KEY}=${this.cookieService.createRefreshTokenCookie(
        refreshToken,
        false,
      )}`,
    ]);

    return loginResponseDto;
  }

  /**
   * Signs user in
   *
   * @param req
   * @param res
   * @param refreshTokenFromCookie
   */
  @Post('/sign-in-long-session')
  public async saveSignInInfo(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @RefreshTokenFromCookie() refreshTokenFromCookie: string,
  ): Promise<UserApi.LoginResponseDto> {
    this.logger.debug(`Saving long session sing in`);

    const { loginResponseDto, accessToken, refreshToken } = await this.authService.signInLongSession(
      refreshTokenFromCookie,
    );

    res.setHeader('Set-Cookie', [
      `${this.cookieService.ACCESS_TOKEN_KEY}=${this.cookieService.createAccessTokenCookie(accessToken)}`,
      `${this.cookieService.REFRESH_TOKEN_KEY}=${this.cookieService.createRefreshTokenCookie(
        refreshToken,
        true,
      )}`,
    ]);

    return loginResponseDto;
  }

  /**
   * Checks if username exists in the database
   *
   * @param usernameExistsDto
   */
  @Post('/username-exists')
  public async checkUsernameExists(
    @Body() usernameExistsDto: UserApi.UsernameExistsResponseDto,
  ): Promise<UserApi.UsernameExistsResponseDto> {
    this.logger.debug(`Checking if username exists, data: ${usernameExistsDto}`);

    return await this.authService.checkIfUsernameExists(usernameExistsDto);
  }

  /**
   * Attempts to create new access & refresh token pairs and authenticate user
   *
   * @param req
   * @param res
   * @param refreshTokenFromCookie
   */
  @Post('/refresh-jwt')
  public async signInViaRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @RefreshTokenFromCookie() refreshTokenFromCookie: string,
  ): Promise<void> {
    this.logger.debug(`Signing in user via refresh token, refresh token: ${refreshTokenFromCookie}`);

    const { accessToken, refreshToken } = this.authService.signInViaRefreshToken(refreshTokenFromCookie);

    //  3. Attach cookies to headers
    res.setHeader('Set-Cookie', this.cookieService.createAccessTokenCookie(accessToken));
    res.setHeader('Set-Cookie', this.cookieService.createRefreshTokenCookie(refreshToken, false));
  }

  /**
   * Attempts to validate access token
   *
   */
  @Get('/authenticate-tokens')
  @UseGuards(AuthGuard('jwt'))
  public async authenticateTokens(): Promise<SignInResponseDto> {
    this.logger.debug(`Access token validity check`);

    return {
      username: 'coffee_lord_fake',
    };
  }

  /**
   * Attempts to sign out user
   *
   * @param res
   * @param signOutDto
   */
  @Post('/sign-out')
  @UseGuards(AuthGuard('jwt'))
  public async logout(
    @Res({ passthrough: true }) res: Response,
    @Body() signOutDto: SignOutDto,
  ): Promise<void> {
    this.logger.debug(`Logging out user, data: ${signOutDto}`);

    res.clearCookie('Authentication', { path: '/', httpOnly: true, sameSite: 'strict' });

    return await this.authService.signOut(signOutDto);
  }
}

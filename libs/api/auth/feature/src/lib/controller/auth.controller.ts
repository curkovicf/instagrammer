import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import {
  AuthService,
  RegisterDto,
  LoginDto,
  UsernameExistsDto,
  LogoutDto,
  RefreshJwtDto,
} from '@instagrammer/api/auth/data-access';
import {
  LoginResponseDto,
  UsernameExistsResponseDto,
} from '@instagrammer/shared/data-access/api-dtos';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async register(@Body() registerDto: RegisterDto): Promise<void> {
    return await this.authService.register(registerDto);
  }

  @Post('/username-exists')
  public async checkUsernameExists(
    @Body() usernameExistsDto: UsernameExistsDto,
  ): Promise<UsernameExistsResponseDto> {
    return await this.authService.checkIfUsernameExists(usernameExistsDto);
  }

  @Post('/login')
  public async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginDto,
  ): Promise<LoginResponseDto> {
    const hashedRefreshJwt = await this.authService.generateNewRefreshJwt({
      username: loginDto.username,
      isLongSession: false,
    });
    const newCookie = await this.authService.createNewCookieWithRefreshJwt(hashedRefreshJwt);

    res.setHeader('Set-Cookie', newCookie);

    return await this.authService.login(loginDto);
  }

  @Post('/refresh-jwt')
  public async refreshJwt(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() refreshJwtDto: RefreshJwtDto,
  ): Promise<string> {
    // const hashedRefreshJwt = await this.authService.generateNewRefreshJwt(refreshJwtDto);
    // const newCookie = await this.authService.createNewCookieWithRefreshJwt(hashedRefreshJwt);
    //
    // res.setHeader('Set-Cookie', newCookie);

    // return await this.authService.generateNewRefreshJwt(refreshJwtDto);

    console.log('Cookies ', req.cookies);

    return '';
  }

  @Post('/logout')
  public async logout(@Body() logoutDto: LogoutDto): Promise<void> {
    return await this.authService.logout(logoutDto);
  }
}

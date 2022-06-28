import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from '@instagrammer/web/shared/app-configs';

@Injectable()
export class WithCredentialsInterceptor implements HttpInterceptor {
  private readonly allowedURLs: string[];

  constructor(private readonly environmentService: EnvironmentService) {
    this.allowedURLs = [
      //
      `${this.environmentService.baseUrl}/refresh-jwt`,
      `${this.environmentService.baseUrl}/access-jwt`,
    ];
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.shouldAttachCookie(req.url)) {
      console.log('Do not attach ', req.url);
      return next.handle(req);
    }

    console.log('Attach ', req.url);

    return next.handle(
      req.clone({
        withCredentials: true,
      }),
    );
  }

  private shouldAttachCookie(url: string): boolean {
    for (let i = 0; i < this.allowedURLs.length; i++) {
      const isFullReplace = url.replace(this.allowedURLs[i], '');

      if (isFullReplace) {
        return true;
      }
    }

    return false;
  }
}

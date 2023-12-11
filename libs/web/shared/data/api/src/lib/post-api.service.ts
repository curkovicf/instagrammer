import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostApi } from '@instagrammer/shared/data/api';
import { EnvironmentService } from '@instagrammer/web/core/env';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  private readonly url: string;

  constructor(private readonly http: HttpClient, private readonly environmentService: EnvironmentService) {
    this.url = `${this.environmentService.baseUrl}/post`;
  }

  /**
   *
   * @param userId
   */
  public getMany(userId: string): Observable<PostApi.Post<string>[]> {
    return this.http.get<PostApi.Post<string>[]>(`${this.url}`, {
      params: {
        userId,
      },
    });
  }

  /**
   *
   * @param post
   */
  public uploadPost(post: PostApi.Post<File>): Observable<PostApi.Post<string>> {
    const formData = new FormData();

    post.images.forEach(image => formData.append('files', image, image.name));

    formData.append('caption', post.caption);

    return this.http.post<PostApi.Post<string>>(`${this.url}`, formData);
  }
}

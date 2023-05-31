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

  public uploadPost(post: PostApi.Post): Observable<PostApi.Post> {
    const formData = new FormData();

    formData.append('file', post.image);
    formData.append('caption', post.caption);

    return this.http.post<PostApi.Post>(`${this.url}`, formData);
  }
}

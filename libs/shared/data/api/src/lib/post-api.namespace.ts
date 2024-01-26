export namespace PostApi {
  export interface Post<T> {
    id?: string;
    images: T[];
    caption: string;
  }
}

export namespace PostApi {
  export interface Post<T> {
    images: T[];
    caption: string;
  }
}

export namespace CommonApi {
  export interface PaginatedData<T> {
    data: T[];
    total: number;
  }

  export interface PaginateRequest {
    pageSize: number;
    currentPage: number;
  }

  export interface PaginateWithSearch extends PaginateRequest {
    term: string;
  }

  export interface Photo {
    url: string;
  }
}

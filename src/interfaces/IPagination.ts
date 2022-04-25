export default interface IPagination {
    firstPage: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    currentTotal: number;
    total: number;
    search: string;
  }
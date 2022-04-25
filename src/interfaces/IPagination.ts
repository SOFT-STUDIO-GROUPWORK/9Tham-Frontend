export default interface IPagination {
    firstPage: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    currentTotal: number;
    total: number;
    search: string;
}

export const initialPagination = {
    firstPage: 1,
    lastPage: 1,
    currentPage: 1,
    perPage: 12,
    currentTotal: 0,
    total: 0,
    search: "",
};

export const initialPaginationHomePage = {
    firstPage: 1,
    lastPage: 1,
    currentPage: 1,
    perPage: 8,
    currentTotal: 0,
    total: 0,
    search: "",
};
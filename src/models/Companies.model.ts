export interface Company {
  companyName: string;
  companyId: string;
}

export interface CompaniesResponse {
  items: Company[];
  itemCount: number;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
}

export interface SearchParams {
  Search: string | null;
  PageIndex: number | string | null;
  PageSize: number | string | null;
}

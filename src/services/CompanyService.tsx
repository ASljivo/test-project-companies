import {
  CompaniesResponse,
  Company,
  SearchParams,
} from "../models/Companies.model";
import ApiClient, { Response } from "../utils/api-client/ApiClient";

export class CompanyService {
  static companies(
    params?: SearchParams
  ): Promise<Response<CompaniesResponse>> {
    return ApiClient.get<undefined, CompaniesResponse>(`/companies`, params);
  }

  static delete(companyId: string): Promise<Response<null>> {
    return ApiClient.delete<undefined, null>(`/companies/${companyId}`);
  }

  static company(companyId: string): Promise<Response<Company>> {
    return ApiClient.get<undefined, Company>(`/companies/${companyId}`);
  }

  static addCompany(companyName: string): Promise<Response<Company>> {
    return ApiClient.post<undefined, Company>(`/companies`, {
      companyName,
    });
  }

  static updateCompany(
    companyId: string,
    companyName: string
  ): Promise<Response<Company>> {
    return ApiClient.put<any, Company>(`/companies/${companyId}`, {
      companyName,
    });
  }
}

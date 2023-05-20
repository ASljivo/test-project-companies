import { User } from '../models/Auth.model';
import ApiClient, { Response } from '../utils/api-client/ApiClient';

export class UserService {
  static user(): Promise<Response<User>> {
    return ApiClient.get<undefined, User>(`/me`);
  }
}

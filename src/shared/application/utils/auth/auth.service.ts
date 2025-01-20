import { User } from 'src/core/user/domain/user.entity';
import { ClearCookies, SetCookies } from '../cookies/cookies';

export type Authenticate = {
  accessToken: string;
  refreshToken: string;
};

export type Refresh = {
  accessToken: string;
};

export type SetTokensInCookiesProps = {
  accessToken: string;
  refreshToken: string;
  setCookies: SetCookies;
};

export type ClearAuthCookiesProps = {
  clearCookies: ClearCookies;
};

export type AuthenticatePayload = {
  sub: number;
};

export type SetAccessTokenInCookies = {
  accessToken: string;
  setCookies: SetCookies;
};

export interface AuthService {
  authenticate(user: User): Promise<Authenticate>;
  setTokenInCookies(props: SetTokensInCookiesProps): void;
  refresh(user: User): Promise<Refresh>;
  setAccessTokenInCookies({
    accessToken,
    setCookies,
  }: SetAccessTokenInCookies): void;
  clearAuthCookies({ clearCookies }: ClearAuthCookiesProps): void;
}

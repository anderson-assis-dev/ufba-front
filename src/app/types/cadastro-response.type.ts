export type CadastroResponseType = {
  id: number;
  name: string;
  email: string;
  login: string;
  password: string;
  role: string;
  enabled: boolean;
  username: string;
  authorities: { authority: string }[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
};

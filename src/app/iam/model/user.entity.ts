export type Role = 'ROLE_STUDENT' | 'ROLE_TEACHER';
export class User {
  id: number;
  userName: string;
  token: string;
  roles: Role[];

  constructor(user:{id?: number, userName?: string, token?: string, roles?: Role[]}) {
    this.id = user.id || 0;
    this.userName = user.userName || '';
    this.token = user.token || '';
    this.roles = user.roles || [];
  }
}

import { RoleType } from '../role/roletype.enum';

export interface IJwtPayload {
  id: number;
  username: string;
  emial: string;
  roles: RoleType[];
  iat?: Date;
}

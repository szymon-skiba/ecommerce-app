
export type AuthData = {
  email: string,
  token: string,
};

export type Details = {
  email: string,
};

export class User {
  id: number;
  email: string;
  roles: string[];

  constructor(
    id: number,
    email: string,
    roles: string[],
  ) {
    this.id = id;
    this.email = email;
    this.roles = roles;
  }
};





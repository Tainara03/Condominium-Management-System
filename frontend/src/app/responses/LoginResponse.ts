interface Role {
    id: string,
    level: number,
    role: string
}

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  unit: any;
}

interface LoginResponse {
  token: string;
  user: User;
}

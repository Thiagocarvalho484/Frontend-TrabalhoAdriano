import api from "../api";
import type { User } from "@/@types/user";

export type RegisterData = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

interface RegisterProps {
  data: RegisterData
}

interface RegisterReturn {
  message: string
  user: User
}

export const register = async ({ data }: RegisterProps): Promise<RegisterReturn> => {
  const { data: response } = await api.post('/auth/register', data);
  
  return response;
}

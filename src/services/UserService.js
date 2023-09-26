import { Api } from "@/config";


export const UserService = {
  async getUsers() {
    const response = await Api.get(`/users`);
    return response.data;
  },
};
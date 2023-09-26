import { Api } from "@/config";


export const PostService = {
  async getPosts() {
    const response = await Api.get(`/posts`);
    return response.data;
  },

  async createPost(post) {
    const response = await Api.post(`/posts`, post);
    return response.data;
  },

  async updatePost(id,updateData) {
    const response = await Api.put(`/posts/${id}`, updateData);
    return response.data;
  },

  async deletePost(postId) {
    const response = await Api.delete(`/posts/${postId}`);
    return response.data;
  },

  async getPost(postId) {
    const response = await Api.get(`/posts/${postId}`);
    return response.data;
  },

  async getUsers() {
    const response = await Api.get(`/users`);
    return response.data;
  },
};
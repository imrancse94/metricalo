import { PostService } from '@/services/PostService';
import { defineStore } from 'pinia';


export const usePostsStore = defineStore('posts',{
    state: () => ({
        posts: [],
        users: [],
        currentPage: 1,
        itemsPerPage: 10,
        post:{}
    }),
    actions: {
        async fetchPosts() {
            this.posts = await PostService.getPosts()
        },
        async getUsers() {
            this.users = await PostService.getUsers()
        },

        async createPost(post) {
           return await PostService.createPost(post)
        },
        async updatePost(id,post) {
            return await PostService.updatePost(id,post)
        },
        async getPostById(id) {
            this.post = await PostService.getPost(id)
        },

    }
   
});


<template>
    <div>
      <div v-for="comment in comments" :key="comment.id">
        <p>{{ comment.body }}</p>
      </div>
      <textarea v-model="newComment" placeholder="Add a comment"></textarea>
      <button @click="addComment">Add Comment</button>
    </div>
  </template>
  
  <script>
  import { computed, ref } from 'vue';
  import { useCommentsStore } from '../store/comments';
  
  export default {
    props: ['postId'],
    setup(props) {
      const commentsStore = useCommentsStore();
      const comments = computed(() => commentsStore.comments);
      const newComment = ref('');
  
      const addComment = () => {
        const comment = {
          postId: props.postId,
          body: newComment.value,
        };
        commentsStore.addComment(comment);
        newComment.value = '';
      };
  
      return { comments, newComment, addComment };
    },
  };
  </script>
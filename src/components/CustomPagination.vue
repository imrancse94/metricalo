<template>
    <div class="custom-pagination">
      <!-- <button @click="goToPage(1)" :disabled="currentPage === 1">First</button>
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      
      
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button v-for="item in items" :key="item.id"> {{ item.id }}</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">Last</button>
     -->
     <ul>
      <li v-for="item in items" :key="item">{{ item.id }}</li>
    </ul>
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </template>
  
  <script setup>
  import {computed,defineProps,ref } from 'vue';
  // export default {
  //   props: {
  //     currentPage: Number,
  //     totalPages: Number,
  //     items:[]
  //   },
  //   data(){
  //     return{
  //       count:0
  //     }
  //   },
  //   methods: {
  //     goToPage(page) {
  //       if (page >= 1 && page <= this.totalPages) {
  //         this.$emit('page-change', page);
  //       }
  //     },
  //     previousPage() {
  //       this.goToPage(this.currentPage - 1);
  //     },
  //     nextPage() {
  //       this.goToPage(this.currentPage + 1);
  //     },
  //   },
  // };
  const itemsPerPage = 10;

  const props = defineProps({
      items:[]
    })

  

const totalPages = computed(() => Math.ceil(props.items.length / itemsPerPage));


  </script>
  
  <style scoped>
  .custom-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  
  button {
    margin: 0 5px;
  }
  </style>
  
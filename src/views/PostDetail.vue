<template>
  <div class="col-2"></div>
  <div class="col-8">
      <div class="q-pa-md">
  
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input filled v-model="post.title" label="Title"
          :error="error?.title ? true: false"
          >
            <template #error>
                <div>{{ error?.title }}</div>
            </template>
        </q-input>
  
          <q-input filled 
          v-model="post.body" 
          label="Body" 
          type="textarea"
          :error="error?.body ? true: false"
          >
            <template #error>
                <div>{{ error?.body }}</div>
            </template>
        </q-input>
          <q-select 
          filled 
          v-model="post.userId" 
          :options="userList" 
          label="User List"
          emit-value
          map-options
          :error="error?.userId ? true: false"
          >
            <template #error>
                <div>{{ error?.userId }}</div>
            </template>
          </q-select>
          <div>
            <q-btn label="Save" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
    </div>
  <div class="col-2"></div>
</template>
  
<script setup>
import { PostService } from '@/services/PostService';
import { usePostsStore } from '@/store/posts';
import { postValidation } from '@/utils/validation';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const error = ref({});
const router = useRouter();
const postStore = usePostsStore()
const userList = ref([]);
let post = ref({});

const onSubmit = async() =>{
  error.value = postValidation(post.value)

  if(Object.keys(error.value).length == 0){
      const response = await PostService.updatePost(router.currentRoute.value.params.id, post.value);
      if(response){
        alert('Successfully updated')
      }
  }

  
}
onMounted(async () => {
  await postStore.getPostById(router.currentRoute.value.params.id)
  await postStore.getUsers();
  postStore.users.map((user) =>{
    userList.value.push({label: user.name, value: user.id}) ;
  })
  
  post.value = postStore.post
  //console.log('postStore', userList.value,postStore.users)
})

</script>
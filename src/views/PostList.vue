<template>
    <div class="col-2"></div>
    <div class="col-8">
        <div class="q-pa-md">
            <q-table title="Blog" :rows="paginatedItems" :columns="columns" :rows-per-page-options="[0]"
                :hide-pagination="true" row-key="name" dense>

                <template v-slot:top-left>
                    <router-link :to="{ name: 'AddPost' }">
                        <q-btn color="blue" style="margin-left: 10px;" label="Add Post"></q-btn>
                    </router-link>
                </template>
                <template v-slot:top-right>
                    <div class="q-pa-md">
                        <q-select filled v-model="user_id" :options="userList" label="User List" emit-value map-options
                            use-input input-debounce="0" @update:model-value="onItemClick()">

                        </q-select>
                    </div>
                    <div class="q-pa-md">
                        <q-select filled v-model="postStore.itemsPerPage" :options="paginateList" label="Show" />
                        <!-- <q-btn-dropdown color="primary" label="Show">
                                    <q-list>
                                        <q-item v-for="page in paginateList" :key="page" :row-key="page" clickable v-close-popup @click="onChangeItemPerpage(page)">
                                            <q-item-section>
                                                <q-item-label>{{ page }}</q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-btn-dropdown> -->

                    </div>
                </template>
                <template #body-cell-action="props">
                    <q-td :props="props">
                        <router-link :to="`post/${props.row.id}`">
                            <q-btn dense flat round color="blue" field="edit" icon="edit"></q-btn>
                        </router-link>
                        <q-btn dense flat round color="red" field="Delete" icon="delete"
                            @click="deleteById(props.row.id)"></q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
    </div>
    <div class="col-2"></div>
    <div class="col-12">
        <ul class="pagination">
            <li style="padding-right: 5px;">
                <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
            </li>
            <li v-for="item in totalPages" :key="item">
                <button :disabled="currentPage === item" @click="goToPage(item)">{{ item }}</button>
            </li>
            <li style="padding-left: 5px;">
                <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
            </li>
        </ul>

    </div>
</template>
  
<script setup>

//import { PostService } from '@/services/PostService';
import { PostService } from '@/services/PostService';
import { usePostsStore } from '@/store/posts'



import { ref, computed, onMounted } from 'vue';


const columns = [
    {
        name: 'ID',
        required: true,
        label: 'ID',
        align: 'left',
        field: row => row.id,
        format: val => `${val}`,
        sortable: true
    },
    {
        name: 'Name',
        required: true,
        label: 'User',
        align: 'left',
        field: row => getNameByUserId(row.userId),
        format: val => `${val}`,
        sortable: true
    },
    {
        name: 'Title',
        required: true,
        label: 'Title',
        align: 'left',
        field: row => row.title,
        format: val => `${val}`,
        sortable: true
    },
    {
        name: "action",
        align: "center",
        label: "Action",
        field: row => row.title,
        format: val => `${val}`,
        sortable: true
    }
];
const postStore = usePostsStore()


const user_id = ref(0)
const items = ref([]);
const userList = ref([]);
const paginateList = ref([5, 10, 20, 25, 50, 100])

const totalPages = computed(() => Math.ceil(items.value.length / postStore.itemsPerPage));

const paginatedItems = computed(() => {
    const startIndex = (postStore.currentPage - 1) * postStore.itemsPerPage;
    const endIndex = startIndex + postStore.itemsPerPage;
    return items.value.slice(startIndex, endIndex);
});

const currentPage = computed(() => postStore.currentPage);

const nextPage = () => {
    if (postStore.currentPage < totalPages.value) {
        postStore.currentPage++;
    }
};

const goToPage = (page) => {
    if (page > 0) {
        postStore.currentPage = page;
    }
};

const previousPage = () => {
    if (postStore.currentPage > 1) {
        postStore.currentPage--;
    }
};

const onItemClick = () => {
    items.value = postStore.posts.filter(post => {
        return post.userId == user_id.value || user_id.value == 0;
    })

    // console.log('postStore.posts', items.value)
};

const getNameByUserId = (id) => {
    let name = "";
    postStore.users.map(user => {
        if (user.id == id) {
            name = user.name;
            return
        }

    })
    //postStore.users = userList
    return name;
};

const deleteById = async (id) => {
    if (id > 0) {
        if (confirm("Are you sure you want to delete?")) {
            const response = await PostService.deletePost(id);
            console.log(response);
            if (response) {
                alert('Succesfully deleted');
            }
        }
    }
}

onMounted(async () => {
    await postStore.fetchPosts();
    await postStore.getUsers();
    items.value = postStore.posts
    userList.value.push({ label: 'All', value: 0 });
    postStore.users.map((user) => {
        userList.value.push({ label: user.name, value: user.id });
    })
})

</script>

<style>
.pagination {
    margin: 0;
    padding: 0;
    list-style: none;
}

.pagination li {
    display: inline;
}
</style>
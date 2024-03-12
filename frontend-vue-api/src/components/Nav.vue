<script setup>
import { ref } from 'vue';

let open = ref(false);
const MenuOpen = () => {
    open.value = !open.value;
};

</script>

<template>
    <div class="bg-gray-900 text-gray-100 py-3.5 px-6 shadow md:flex justify-between items-center">
        <div class="flex items-center cursor-pointer">
            <span class="text-green-500 text-xl mr-1">
                <i class="bi bi-messenger"></i>
            </span>
            <h1 class="text-xl">FullStack Test</h1>
        </div>

        <span @click="MenuOpen()" class="absolute md:hidden ease-in right-6 top-1.5  cursor-pointer text-4xl">
            <i :class="[open ? 'bi bi-x' : 'bi bi-filter-left']"></i>
        </span>
        <ul class="md:flex md:items-center md:px-0 px-6 md:pb-0 pb-10 md:static absolute
        bg-gray-900 md:w-auto w-full top-14 duration-700 ease-in"
        :class="[open ? 'left-0' : 'left-[-100%]']">
            <li class="md:mx-4 md:my-0 my-6">
                <router-link :to="{name:'Home'}" class="text-xl hover:text-green-500">Home</router-link>
            </li>
            <li class="md:mx-4 md:my-0 my-6">
                <router-link :to="{name:'Login'}" class="text-xl hover:text-green-500">Login</router-link>
            </li>
            <li class="md:mx-4 md:my-0 my-6">
                <router-link :to="{name:'Register'}" class="text-xl hover:text-green-500">Register</router-link>
            </li>
        </ul>
    </div>
</template>
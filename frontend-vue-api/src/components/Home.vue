<script setup>
import { ref, onMounted } from "vue"
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const form = ref({
  vin: ""
})

onMounted(async () => {
    await authStore.getUser();
    console.log(authStore.user);
});

</script>

<template>
    <!-- Serch VIN form -->
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8" v-if="authStore.user">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Search VIN information</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="authStore.handleFindingVIN(form)">
                <div> 
                    <label for="vin" class="block text-sm font-medium leading-6 text-gray-900">VIN</label>
                    <div class="mt-2">
                        <input id="vin" name="email" type="text" v-model="form.vin" autocomplete="vin"  required="" class="block w-full rounded-md border-0 py-1.5 p-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
                </div>
            </form>
        </div>
       {{ authStore.infoVIN?.success }} <br>
       {{ authStore.infoVIN?.vin }} <br>
       {{ authStore.infoVIN?.specification?.anti_brake_system }} <br>
       {{ authStore.infoVIN?.specification?.city_mileage }} <br>
       {{ authStore.infoVIN?.specification?.engine }} <br>
       {{ authStore.infoVIN?.specification?.highway_mileage }} <br>
       {{ authStore.infoVIN?.specification?.made_in }} <br>
       {{ authStore.infoVIN?.specification?.make }} <br>
       {{ authStore.infoVIN?.specification?.model }} <br>
       {{ authStore.infoVIN?.specification?.optional_seating }} <br>
       {{ authStore.infoVIN?.specification?.overall_height }} <br>
       {{ authStore.infoVIN?.specification?.overall_width }} <br>
       {{ authStore.infoVIN?.specification?.standard_seating }} <br>
       {{ authStore.infoVIN?.specification?.steering_type }} <br>
       {{ authStore.infoVIN?.specification?.style }} <br>
       {{ authStore.infoVIN?.specification?.tank_size }} <br>
       {{ authStore.infoVIN?.specification?.trim_level }} <br>
       {{ authStore.infoVIN?.specification?.vin }} <br>
       {{ authStore.infoVIN?.specification?.year }} 
    </div>
</template>
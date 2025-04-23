<script setup>
import { formatDistanceToNow, parseISO } from 'date-fns';

const supabase = useSupabaseClient();
const completedActivities = ref([]);
const searchQuery = ref('');

const fetchCompletedActivities = async () => {
    const { data, error } = await supabase
        .from('activity')
        .select('*')
        .eq('status', true); // Ambil hanya yang selesai

    if (error) {
        console.error('Error fetching completed activities:', error);
    } else {
        completedActivities.value = data;
    }
};

const formatTime = (date, time) => {
    return formatDistanceToNow(new Date(`${date}T${time}`), { addSuffix: true });
};

const filteredactivity = computed(() => {
    return completedActivities.value.filter(reminder => {
        return reminder.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
               reminder.date.includes(searchQuery.value);
    });
});


onMounted(() => {
    fetchCompletedActivities();
});

definePageMeta({
    layout: 'users',
    middleware: 'auth'
})

</script>

<template>
    <div class="container">
        <div class="d-flex">
            <h2 class="text-success fw-semibold mt-3">Completed Activity</h2>
            <div class="filter ms-auto mt-4">
                <form class="d-flex gap-4">
                    <input v-model="searchQuery" type="date" class="date rounded-5">
                    <input v-model="searchQuery" type="text" placeholder="Searh..." class="search rounded-5">
                </form>
            </div>
        </div>
        <div class="row justify-content-center m-2">
            <div  v-for="activity in filteredactivity" :key="activity.id" class="col-lg-6">
                <div class="card card-completed p-3 mt-4 rounded-4 shadow">
                    <div class="d-flex">
                        <div class="text-center rounded-5">
                            <p class="fs-2">{{ activity.icon }}</p>
                        </div>
                        <div class="ms-auto mt-2">
                            <button class="btn check text-white rounded-5"><i class="bi bi-check2-circle"></i></button>
                            <button class="btn btn-set rounded-5"><i class="bi bi-three-dots"></i></button>
                        </div>
                    </div>
                    <h5 class="mt-2">{{ activity.title }}</h5>
                    <h6 class="mt-2 text-muted">Selesai: {{ formatTime(activity.date, activity.end_time) }}</h6>
                    <div class="mx-auto mt-4">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h2, h5, h6, p, small, .search, .date {
    font-family: "Poppins", sans-serif;
}

h2, .date {
    margin-left: 2rem;
}

.card-completed {
    background-color: #fff;
}

.check {
    width: 5rem;
    background-color: #C7DB9C;
}

.filter {
    margin-right: 2rem;
}

.search {
    width: 13rem;
    height: 2.5rem;
}

.date {
    width: 10rem;
    height: 2.5rem;
}
</style>
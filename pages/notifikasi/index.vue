<template>
    <div class="container">
        <h2 class="text-success fw-semibold mt-3">🔔 Notifikasi</h2>
        <div class="bg-white shadow-lg rounded p-4 mt-4">
            <ul class="list-unstyled mt-3">
                <transition-group name="fade" tag="div">
                    <li v-for="reminder in activity" :key="reminder.id" class="p-3 bg-light border-start border-4 rounded mb-2"
                        :class="{ 'border-success': reminder.priority === 'high', 'border-primary': reminder.priority === 'medium', 'border-warning': reminder.priority === 'low' }">
                        <p class="mb-1">{{ reminder.icon }} {{ reminder.title }}</p>
                        <small class="text-muted">Berakhir: {{ formatTime(reminder.date, reminder.end_time) }}</small>
                    </li>
                </transition-group>
            </ul>
        </div>
    </div>

    <!-- Popup Notification -->
    <div v-if="showPopup" class="popup-notification">
        <div class="popup-content p-3 rounded shadow">
            <p class="mb-1">🔔 {{ popupReminder.icon }} {{ popupReminder.title }}</p>
            <small class="text-muted">Berakhir: {{ formatTime(popupReminder.date, popupReminder.end_time) }}</small>
        </div>
    </div>
</template>

<script setup>
import { formatDistanceToNow, parseISO } from 'date-fns';

const supabase = useSupabaseClient();
const activity = ref([]);
const showPopup = ref(false);
const popupReminder = ref({});

const fetchactivity = async () => {
    const { data, error } = await supabase
        .from('activity')
        .select('id, title, icon, date, end_time, status')
        .eq('status', false); // Ambil hanya yang belum selesai

    if (data) {
        activity.value = data;
        const now = new Date();
        const upcomingReminder = data.find(reminder => {
            const reminderDateTime = new Date(`${reminder.date}T${reminder.end_time}`);
            return reminderDateTime > now;
        });
        
        if (upcomingReminder) {
            triggerPopup(upcomingReminder);
        }
    }
};

const triggerPopup = (reminder) => {
    popupReminder.value = reminder;
    showPopup.value = true;
    setTimeout(() => {
        showPopup.value = false;
    }, 3000);
};

const formatTime = (date, time) => {
    const reminderDateTime = new Date(`${date}T${time}`);
    return formatDistanceToNow(reminderDateTime, { addSuffix: true });
};

onMounted(() => {
    fetchactivity();
});

definePageMeta({
    layout: 'users',
    middleware: 'auth',
    name: 'notif'
});


</script>

<style scoped>
h2, p, small {
    font-family: "Poppins", sans-serif;
}

h2 {
    margin-left: 2rem;
}

.popup-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border: 1px solid #ddd;
    padding: 10px;
    z-index: 1050;
    animation: fadeInOut 3s ease-in-out;
}

@keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-10px); }
    20% { opacity: 1; transform: translateY(0); }
    80% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-10px); }
}
</style>




<!-- <template>
    <div class="container">
        <h2 class="text-success fw-semibold mt-3">🔔 Notifikasi</h2>
            <div class="bg-white shadow-lg rounded p-4 mt-4">
                <ul class="list-unstyled mt-3">
                    <li class="p-3 bg-light border-start border-4 border-success rounded mb-2">
                        <p class="mb-1">Jangan lupa menyiram tanaman hari ini! 🌱</p>
                        <small class="text-muted">10 menit yang lalu</small>
                    </li>
                    <li class="p-3 bg-light border-start border-4 border-primary rounded mb-2">
                        <p class="mb-1">Saatnya membuang sampah plastik ke tempat daur ulang ♻️</p>
                        <small class="text-muted">1 jam yang lalu</small>
                    </li>
                    <li class="p-3 bg-light border-start border-4 border-warning rounded">
                        <p class="mb-1">Tahukah kamu? Satu botol plastik bisa butuh lebih dari 400 tahun untuk terurai! 🚯</p>
                        <small class="text-muted">Kemarin</small>
                    </li>
                </ul>
        </div>
    </div>
</template>

<style scoped>
h2, p, small {
    font-family: "Poppins", sans-serif;
}

h2 {
    margin-left: 2rem;
}
</style> -->
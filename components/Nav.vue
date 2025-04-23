<script setup>
import femaleImg from '@/assets/img/female.jpeg';
import maleImg from '@/assets/img/male.jpeg';
import { useReminderNotifications } from '../composables/useReminderNotifications'; 


const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userProfilePic = ref('');
const router = useRouter();
const reminders = ref([]);

const fetchUserData = async () => {
    if (!user.value) return;
    const { data, error } = await supabase
        .from('users')
        .select('name, gender')
        .eq('id', user.value.id)
        .single();
    
    if (error) {
        console.error('Error fetching user data:', error.message);
        return;
    }
    
    userProfilePic.value = data.gender === 'Perempuan' ? femaleImg : maleImg;

};


// Reminder dari Supabase
const fetchReminders = async () => {
  const { data, error } = await supabase.from('activity').select('*');
  if (!error) {
    reminders.value = data;
  }
};

onMounted(
    ()=> {
        fetchUserData();
        fetchReminders();
    })
; // ambil data pertama kali

// Untuk popup
const popupReminder = ref(null);
const showPopup = ref(false);

const triggerPopup = (reminder) => {
  popupReminder.value = reminder;
  showPopup.value = true;
  setTimeout(() => {
    showPopup.value = false;
  }, 3000);
};

const { showBellNotification } = useReminderNotifications(reminders, triggerPopup);
</script>




<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <img :src="userProfilePic" alt="logo" class="logo rounded-5">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto gap-4">
                    <li class="nav-item rounded-5 text-center">
                        <nuxt-link to="/notifikasi" class="btn nav-link"><i class="bi bi-bell fs-4"></i><span v-if="showBellNotification" style="color:red">•</span>
                        </nuxt-link>
                    </li>
                    <li class="nav-item rounded-5 text-center">
                        <nuxt-link to="/completed" class="nav-link"><i class="bi bi-list-check fs-4"></i></nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="showPopup" class="popup">
            Reminder: {{ popupReminder.title }}
        </div>
    </nav>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kavoon&family=Miltonian+Tattoo&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Red+Rose:wght@300..700&display=swap');


.navbar-collapse {
    margin-right: 2rem;
}

i {
    background-color: #fff;
}

.nav-item {
    font-family: "Poppins", sans-serif;
    background-color: #fff;
    width: 3.5rem;
}

.logo {
    width: 5rem;
}

.nav-link.active {
  position: relative;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background-color: #000;
}

@media only screen and (max-width: 600px) {
    .logo {
        width: 50px;
        margin-left: 25px;
        margin-top: 5px;
    }
}

@media only screen and (max-width: 890px) {
    .logo {
        width: 60px;
        margin-left: 30px;
        margin-top: 5px;
    }
}
</style>
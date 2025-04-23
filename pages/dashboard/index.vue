<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userName = ref('');
const activity = ref([]);

const fetchactivity = async () => {
  if (!user.value) return;
  const { data, error } = await supabase
    .from("activity")
    .select("*")
    .eq("users_id", user.value.id) // Sesuai user yang login
    .order("start_time", { ascending: true });

  if (error) {
    console.error("Error fetching activity:", error.message);
  } else {
    activity.value = data;
  }
};

const filteredActivities = ref(activity.value);

const activeFilter = ref('today'); // Default ke 'today'

// Fungsi untuk memfilter aktivitas
const filterActivities = (filterType) => {
  activeFilter.value = filterType;
  const now = new Date();
  
  // Filter berdasarkan pilihan tombol
  if (filterType === 'recent') {
    filteredActivities.value = activity.value.filter(activity => new Date(activity.date) < now);
  } else if (filterType === 'today') {
    filteredActivities.value = activity.value.filter(activity => {
      const activityDate = new Date(activity.date);
      return activityDate.toDateString() === now.toDateString();
    });
  } else if (filterType === 'upcoming') {
    filteredActivities.value = activity.value.filter(activity => new Date(activity.date) > now);
  }
};


const markAsDone = async (id) => {
  console.log("🚀 Mulai update status..."); // Debugging awal
  console.log("🔹 ID yang akan diupdate:", id); 

  const { data, error } = await supabase
    .from("activity")
    .update({ status: true })  // Pastikan status diubah ke TRUE
    .eq("id", id)
    .select(); // Tambahkan select() untuk melihat hasil

  if (error) {
    console.error("❌ Gagal update status:", error.message); // Debugging error
  } else {
    console.log("✅ Update berhasil! Data dari Supabase:", data);
    
    // Update status langsung di filteredActivities
    const updatedActivity = filteredActivities.value.find(item => item.id === id);
    if (updatedActivity) {
      updatedActivity.status = true;
    }

    // Atau, untuk me-refresh seluruh daftar aktivitas setelah update:
    fetchactivity(); // Refresh data dari Supabase untuk memastikan semua data terbaru
  }
};

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
    
    userName.value = data.name;

};

const formatTime = (time) => {
  if (!time) return "-"; // Jika kosong, tampilkan "-"
  return time.substring(0, 5); // Ambil jam & menit saja (hh:mm)
};

onMounted(() => {
    console.log("User:", user.value);
    fetchactivity();
    fetchUserData();
});

definePageMeta({
    layout: 'users',
    middleware: 'auth'
})

</script>


<template>
    <div class="container p-0 m-0">
        <div class="text-welcome mt-3">
            <h3>Welcome Back, <b>{{ userName }} !</b></h3>
        </div>

        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card p-3 mt-4 rounded-4 shadow">
                    <div class="text-center rounded-5">
                        <i class="bi bi-activity fs-4"></i>
                    </div>
                    <h4 class="mt-5">Today's Completed Activities</h4>
                    <!-- Progress Bar -->
                    <div class="progress mt-4 mb-3" style="height: 0.5rem; width: 75%;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 40%" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>
                    <h6 class="mt-2">8/12 Activity Complated</h6>
                </div>
            </div>
        </div>

        
        <div class="btn-group align-items-center rounded-4 m-3 mt-5">
            <a href="#" 
                :class="{'btn-success': activeFilter === 'recent', 'btn': true, 'rounded-4': true, 'm-2': true}" 
                @click="filterActivities('recent')">Recent</a>
            <a href="#" 
                :class="{'btn-success': activeFilter === 'today', 'btn': true, 'rounded-4': true, 'm-2': true}" 
                @click="filterActivities('today')">Today</a>
            <a href="#" 
                :class="{'btn-success': activeFilter === 'upcoming', 'btn': true, 'rounded-4': true, 'm-2': true}" 
                @click="filterActivities('upcoming')">Upcoming</a>
        </div>

        <h5 class="mt-4">Current Activity</h5>
        <!--Card Activity-->
        <div class="row justify-content-center m-2">
            <div v-for="item in filteredActivities" :key="item.id" class="col-lg-6">
                <div
                    class="card p-3 mt-4 rounded-4 shadow"
                    :class="{ 'card-completed': item.status }"
                >
                    <div class="d-flex">
                        <div class="text-center rounded-5">
                            <p class="emoji fs-3">{{ item.icon }}</p>
                        </div>
                        <div class="ms-auto mt-2">
                            <button v-if="item.status" class="btn check text-white rounded-5">
                                <i class="bi bi-check2-circle"></i>
                            </button>
                            <button class="btn btn-set rounded-5">
                                <i class="bi bi-three-dots"></i>
                            </button>
                        </div>
                    </div>
                    <h5 class="mt-4">{{ item.title }}</h5>
                    <h6 class="mt-2">
                    {{ formatTime(item.start_time) }} - {{ formatTime(item.end_time) }}
                    </h6>
                    <div class="mx-auto mt-4">
                        <button
                            v-if="!item.status"
                            class="btn btn-done rounded-5"
                            @click="markAsDone(item.id)"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <!--Card Completed Activity-->
        
        <!--Add-->
        <nuxt-link to="/add" class="btn-add fixed-bottom text-center" style="text-decoration: none; color: white;" target="_blank">
            <i class="bi bi-cloud-plus fs-1"></i>            
        </nuxt-link>


    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kavoon&family=Miltonian+Tattoo&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Red+Rose:wght@300..700&display=swap');

.container {
    background-color: #F7F7F7;
}

h4, h3, h5, h6, a, .btn {
    font-family: "Poppins", sans-serif;
}

h3 {
    margin-left: 2rem;
}

.text-center {
    background-color: #fff;
    width: 3.5rem;
}

.bi {
    background: none !important;
    box-shadow: none !important;
    padding: 0 !important;
}

.card {
    background-color: #C7DB9C;
}

.card-completed {
    background-color: #fff;
}

.btn-group {
    width: 97%;
    background-color: #fff;
}

.active {
    background-color: #C7DB9C;
}

.btn-done {
    width: 20rem;
    background-color: #fff;
}

.btn-set {
    width: 3rem;
    background-color: #fff;

}

.check {
    width: 5rem;
    background-color: #C7DB9C;
}

i {
    background-color: #fff;
}

.btn-add {
    background-color: #6E8E59;
    width: 5rem;
    border-radius: 100px;
    margin-bottom: 50px;
    margin-left: 60rem;
}

.emoji {
    height: 2rem;
}

</style>
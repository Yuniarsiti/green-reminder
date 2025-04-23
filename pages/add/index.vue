<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const activity = ref({
    title: '',
    icon: '',
    date: '',
    start_time: '',
    end_time: ''
})

async function tambahActivity() {
    try {
        if (!user.value) {
            alert('Anda harus login!')
            return
        }

        const { error } = await supabase
            .from('activity')
            .insert([
                {
                    users_id: user.value.id, // FK ke auth.uid()
                    title: activity.value.title,
                    icon: activity.value.icon,
                    date: activity.value.date,
                    start_time: activity.value.start_time,
                    end_time: activity.value.end_time
                }
            ])

        if (error) throw error

        alert('Reminder berhasil ditambahkan!')
        router.push('/dashboard') // 🔥 Redirect ke dashboard setelah sukses
    } catch (err) {
        console.error('Error tambah reminder:', err.message)
        alert('Gagal menambahkan reminder.')
    }
}

definePageMeta({
    layout: 'users',
    middleware: 'auth'
})

</script>


<template>
    <div class="container mt-4">
        <h2 class="text-success fw-semibold mt-3">Add Activity</h2>
            <div class="bg-white shadow-lg rounded p-4 mt-4">
                <div class="card border-0">
                    <div class="card-body">
                        <form @submit.prevent="tambahActivity">
                            <div class="mb-3 d-flex gap-4">
                                <div class="name w-75">
                                    <label class="form-label">Title</label>
                                    <input v-model="activity.title" type="text" class="form-control" required />
                                </div>
                                <div class="icon w-25">
                                    <label class="form-label">Icon / Emoji</label>
                                    <input v-model="activity.icon" type="text" class="form-control" required />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Date</label>
                                <input v-model="activity.date" type="date" class="form-control" required />
                            </div>
                            <div class="mb-3 d-flex gap-4">
                                <div class="start w-50">
                                    <label class="form-label">Start Time</label>
                                    <input v-model="activity.start_time" type="time" class="form-control" required />
                                </div>
                                <div class="end w-50">
                                    <label class="form-label">End Time</label>
                                    <input v-model="activity.end_time" type="time" class="form-control" required />
                                </div>
                            </div>
                            <div class="text-center mt-5 mb-5">
                                <button type="submit" class="btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    </div>
  </template>

<style scoped>
h2, label, input, .btn {
    font-family: "Poppins", sans-serif;
}

h2 {
    margin-left: 2rem;
}

.btn {
    width: 10rem;
    font-size: 1rem;
    color: white;
    background-color: #6E8E59;
}
</style>
  
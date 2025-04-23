<script setup>
const supabase = useSupabaseClient()
const router = useRouter()

// Data form pendaftaran
const form = ref({
    name: '',
    gender: '',
    email: '',
    password: ''
})

async function signUp() {
    try {
        // 1️⃣ Daftarkan user ke Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email: form.value.email,
            password: form.value.password
        })

        if (error) throw error
        
        // Ambil user_id dari auth
        const user = data.user

        if (user) {
            // 2️⃣ Simpan data user ke tabel `users`
            const { error: insertError } = await supabase
                .from('users')
                .insert([
                    {
                        id: user.id, // ID dari auth.uid()
                        name: form.value.name,
                        gender: form.value.gender,
                        email: form.value.email
                    }
                ])

            if (insertError) throw insertError

            // 3️⃣ Arahkan user ke dashboard setelah berhasil signup
            router.push('/dashboard')
        }
    } catch (err) {
        console.error('Error saat signup:', err.message)
    }
}

definePageMeta({
    layout: 'login',
})

</script>


<template>
    <div class="container-fluid mb-5">
    
        <div class="row mt-3">
            <div class="col-md-2 mt-2">
                <nuxt-link to="/" style="text-decoration: none; color: black;">
                    <i class="bi bi-arrow-left-circle fs-2"></i>
                </nuxt-link>
            </div>
            <div class="col-md-10 text-end">
                <nuxt-link to="/login">
                    <button class="btn rounded-5 mt-2 head-tittle">LOGIN</button>
                </nuxt-link>
            </div>
        </div>
            
        <!--login-->
        <div class="row signup">
            <div class="col p-5">
                <div class="card shadow rounded-4">
                    <div class="row">
                        <div class="col-md-6 p-5">
                            <div class="p-3">
                                <h2>Get Started</h2>
                                <h6 class="mt-3">Welcome to Green Reminder - Let's create your account</h6>
                            </div>
                            <form @submit.prevent="signUp" class="p-3">
                                <div class="mb-3">
                                    <label for="exampleInput" class="form-label">Name</label>
                                    <input v-model="form.name" type="text" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInput" class="form-label">Gender</label>
                                    <select v-model="form.gender" required class="form-select">
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInput" class="form-label">E - mail</label>
                                    <input v-model="form.email" type="email" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInput" class="form-label">Password</label>
                                    <input v-model="form.password" type="password" class="form-control">
                                </div>
                                <div class="text-center">
                                        <button type="submit" class="btn mt-4 rounded-5">Sign up</button>
                                </div>
                            </form>
                        </div>
                        <div class="col-md-6">
                            <div class="card card-img">
                                <div class="card-body">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
h5, h6, label, .btn, h2 {
    font-family: "Poppins", sans-serif;
}

.card-body {
  background: url('~/assets/img/signup.jpeg') no-repeat center center;
  background-size: cover;
  height: 42rem;
}

.card-img {      
    border-left: none;    
}

.btn {
    width: 6rem;
    font-size: 1rem;
    color: white;
    background-color: #6E8E59;
}


/* input, textarea, .card {
    border: 1px solid #C6AC7B;
} */


@media only screen and (min-width: 600px) and (max-width: 890px) {
    .head-tittle {
        margin-left: 30px;
    }

    .card-body {
        height: 670px;
    }
}

@media only screen and (max-width: 600px) {
    i {
        margin-left: 0;
    }

    .signup {
        font-size: small;
    }

    .card-body {        
        height: 450px;
    }

}
</style>
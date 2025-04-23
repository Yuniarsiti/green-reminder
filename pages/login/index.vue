<script setup>
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import { useRouter } from 'vue-router'

const supa = useSupabaseClient()
const router = useRouter()

const form = ref({
    email: '',
    password: ''
})

async function login() {
    try {
        const { data, error } = await supa.auth.signInWithPassword({
            email: form.value.email,
            password: form.value.password
        })

        if (error) throw error

        console.log('Login berhasil:', data) // Debugging
        router.push('/dashboard') // Arahkan ke dashboard setelah login
    } catch (err) {
        console.error('Error saat login:', err.message)
        alert('Login gagal! Periksa email & password.')
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
                <nuxt-link to="/signup" style="text-decoration: none; color: black;">
                    <btn class="btn rounded-5 mt-2 head-tittle">SIGNUP</btn>
                </nuxt-link>
            </div>
        </div>
            
        <!--login-->
        <div class="row login">
            <div class="col p-5">
                <div class="card shadow rounded-4">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card card-img">
                                <div class="card-body">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 p-5">
                            <div class="p-3">
                                <h2>Welcome Back!</h2>
                                <h6 class="mt-3">Enter your email and password</h6>
                            </div>
                            <form @submit.prevent="login" class="p-3">
                                <div class="mb-3">
                                    <label for="exampleInput" class="form-label">E - mail</label>
                                    <input v-model="form.email" type="email" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInput" class="form-label">Password</label>
                                    <input v-model="form.password" type="password" class="form-control">
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="btn mt-4 rounded-5">Login</button>
                                </div>
                            </form>
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
  background: url('~/assets/img/login.jpeg') no-repeat center center;
  background-size: cover;
  height: 30rem;
}

.card-img {      
    border-right: none;    
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

    .login {
        font-size: small;
    }

    .card-body {        
        height: 450px;
    }

}
</style>
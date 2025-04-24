<script setup>
const route = useRoute()
const router = useRouter()

const hiddenRoutes = ['login']

const shouldShowNavbar = !hiddenRoutes.includes(route.name)

const isActive = ref('home');

const setActive = (tab) => {
  isActive.value = tab;
};

</script>

<template>
    <nav v-if="route?.name != 'login'" class="navbar navbar-expand-lg">
        <div class="container">
            <img src="../assets/img/logo.png" alt="logo" class="logo">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- <ul class="navbar-nav justify-content-center mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">Feature</a>
                    </li>
                </ul> -->
                <ul class="navbar-nav ms-auto gap-4">
                    <li class="nav-item rounded-5 text-center">
                        <nuxt-link to="/login" class="nav-link">LOGIN</nuxt-link>
                    </li>
                    <li class="nav-item rounded-5 text-center">
                        <nuxt-link to="/signup" class="nav-link signup rounded-5">SIGNUP</nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kavoon&family=Miltonian+Tattoo&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Red+Rose:wght@300..700&display=swap');


.navbar-collapse {
    margin-right: 2rem;
}

.nav-item {
    font-family: "Poppins", sans-serif;
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

.signup {
    background-color: #6E8E59;
    color: #fff;
    width: 6rem;
}

.nav {
    margin-left: 25rem;
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
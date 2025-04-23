<template>
    <div class="container">
        <!-- Hero Section -->
        <div class="container-fluid cover p-0">
            <div class="row">
                <div class="col">
                    <div class="text-center mt-4">
                        <h1>Together for a <span class="green-text">Greener Future</span></h1>
                        <p>Small actions today, a thriving planet tomorrow. Let's reduce, recycle, and restore.</p>
                        <div class="img-hero">
                            <img src="../assets/img/earth.png" alt="" class="w-50">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <section class="hero">
            <div class="extra-circle"></div>
                <div class="container d-flex flex-column flex-md-row align-items-center justify-content-between">
                    <div class="text">
                        <h2 class="fw-semibold">Atur Harimu, Hijaukan Bumi 🌱</h2>
                        <p class="mt-3">Kelola to-do list dengan mudah dan kurangi penggunaan kertas untuk masa depan yang lebih hijau</p>
                    </div>
                <div>
                    <img src="../assets/img/checkklist.jpg" class="img-fluid rounded" alt="Checklist To-Do List">
                </div>
            </div>
        </section> -->

        <!-- About Section -->
        <section class="about-section text-center py-5">
            <div class="container-about">
                <div class="row align-items-center">
                    <div class="col-md-6 text-start">
                        <h3 class="fw-semibold">Kenapa Green Reminder?</h3>
                        <hr class="w-25">
                        <p class="mt-3">Green Reminder membantu pengguna menjalani kebiasaan ramah lingkungan dengan fitur pengingat otomatis, tips keberlanjutan, dan pencatatan progres.</p>
                        <div class="list">
                            <div class="d-flex">
                                <i class="bi bi-globe-asia-australia fs-4"></i>
                                <h6 class="mt-2">Mengurangi Jejak Karbon</h6>
                            </div>
                            <div class="d-flex">
                                <i class="bi bi-recycle fs-4"></i>                                
                                <h6 class="mt-2">Membentuk Kebiasaan Baik</h6>
                            </div>
                            <div class="d-flex">
                                <i class="bi bi-tree fs-4"></i>
                                <h6 class="mt-2">Mendukung Gerakan Hijau</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5 text-center">
                        <img src="../assets/img/activity.jpg" class="img-fluid rounded shadow" alt="Green Reminder">
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="text-center py-5">
            <h3 class="fw-bold text-success">Fitur Utama</h3>
            <div class="container mt-5">
                <div class="row g-4 justify-content-center">
                    <div class="col-md-3">
                        <div class="card p-4 rounded-3 shadow-sm">
                            <i class="bi bi-check2-circle text-success"></i>
                            <h5 class="fw-semibold mt-4">Checklist Simpel</h5>
                            <p class="text-muted">Tambahkan dan kelola tugasmu dengan mudah.</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card p-4 rounded-3 shadow-sm">
                            <i class="bi bi-bell text-success"></i>
                            <h5 class="fw-semibold mt-4">Pengingat Otomatis</h5>
                            <p class="text-muted">Dapatkan notifikasi agar tugas tidak terlewat.</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card p-4 rounded-3 shadow-sm">
                            <i class="bi bi-activity text-success"></i>
                            <h5 class="fw-semibold mt-4">Statistik</h5>
                            <p class="text-muted">Pantau aktifitas yang sudah kamu lakukan</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="join text-center text-white">
            <h3 class="fw-bold">Waktunya Beraksi! 🌱</h3>
            <p>Jangan tunda lagi, bergabung sekarang dan mulai kelola aktivitas hijau kamu!</p>
            <nuxt-link to="/signup">
                <button class="btn btn-light btn-lg mt-4">Daftar Sekarang</button>
            </nuxt-link>
        </section>

    </div>
</template>

<style scoped>
h1, h2, h3, h5, h6, p, .btn{
    font-family: "Poppins", sans-serif;
}

.green-text {
    color: #6E8E59;
}

.img-hero {
    margin-top: -5rem;
}

/* .cover {
  background: url('../assets/img/hero.jpg') no-repeat center center;
  background-size: cover;
  background-color: #F0EDDC;
  height: 550px;
  width: 100%;
} */

/* .hero {
    position: relative;
    background-color: white;
    padding: 0 0;
    overflow: hidden;
}

.hero::before, .hero::after, .hero .extra-circle {
    content: "";
    position: absolute;
    border-radius: 50%;
}

.hero::before {
    top: 5%;
    left: 5%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(76,175,80,0.4) 0%, rgba(76,175,80,0) 70%);
}

.hero::after {
    bottom: 15%;
    right: 10%;
    width: 180px;
    height: 180px;
    background: radial-gradient(circle, rgba(46,125,50,0.4) 0%, rgba(46,125,50,0) 70%);
}

.hero .extra-circle {
    top: 50%;
    left: 30%;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(102,187,106,0.4) 0%, rgba(102,187,106,0) 70%);
}

.hero .container {
    position: relative;
} */

img {
    width: 25rem;
}

.text {
    width: 65%;
}

p {
    font-size: 0.9rem !important;
}

.about-section {
    background: url('../assets/img/bg-texture.jpg') no-repeat center center;
    background-size: cover;
    color: white;
    padding: 80px 0;
}

.list h6 {
    margin-left: 0.8rem;
}

i {
    font-size: 3rem;
}

.card {
    height: 16rem;
}

.card p {
    font-size: 0.8rem !important;
}

.join {
    padding: 5rem 0;
    background-color: #6E8E59;
}

.btn {
    width: 15rem;
}

.text-start {
    margin-left: 5rem;
}
</style>
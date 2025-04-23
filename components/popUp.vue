<template>
    <div v-if="show" class="popup-reminder">
      ⏰ <strong>{{ reminder.title }}</strong> - waktunya hampir tiba!
    </div>
  </template>
  
  <script setup>
  defineProps(['reminder', 'show']);
  </script>
  
  <style scoped>
  .popup-reminder {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #fff3cd;
    border: 1px solid #ffeeba;
    padding: 12px 18px;
    border-radius: 10px;
    font-weight: 500;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 9999;
  }
  </style>
  
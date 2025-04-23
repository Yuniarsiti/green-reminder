import { useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue';

export function useReminderNotifications(reminders, triggerPopup) {
  const showBellNotification = ref(false);
  const route = useRoute();

  watchEffect(() => {
    const now = new Date();
    showBellNotification.value = false;

    reminders.value.forEach(reminder => {
      const reminderDate = new Date(reminder.tanggal);
      const [hour, minute, second] = reminder.end_time.split(':');
      reminderDate.setHours(hour);
      reminderDate.setMinutes(minute);
      reminderDate.setSeconds(second);

      const timeDiff = reminderDate.getTime() - now.getTime();

      if (timeDiff <= 5 * 60 * 1000 && timeDiff > 0) {
        showBellNotification.value = true;
        if (route.path !== '/notifikasi') {
          triggerPopup(reminder);
        }
      }
    });
  });

  return { showBellNotification };
}

import { ref } from 'vue'

type NotificationType = 'success' | 'error' | 'warning' | 'info'
type Notification = {
    id: number
    type: NotificationType
    message: string
    timeout?: number
}

const notifications = ref<Notification[]>([])
let nextId = 0

export function useNotify() {
  const notify = (
    message: string,
    type: NotificationType = 'info',
    timeout: number = 3000,
  ) => {
    const id = nextId++
    notifications.value.push({ id, type, message, timeout })

    if (timeout > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, timeout)
    }
  }

  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  return {
    notifications,
    notify,
    removeNotification,
  }
}

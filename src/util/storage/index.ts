import { Drivers, Storage } from '@ionic/storage'
import { ref, watch } from 'vue'

const store = new Storage({
    name: 'flashback_db',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
})

type Key = 'sets' | 'timers'

export const storageReady = store.create().then(() => store)

export function useStorage<T>(key: Key, defaultValue: T) {
    const value = ref<T>(defaultValue)
    storageReady.then(async (store) => {
        try {
            const ret = await store.get(key)
            value.value = ret != null ? JSON.parse(ret) : defaultValue
        } catch (err) {
            console.warn('get Storage failed: ', key, err)
        }
        watch(
            value,
            async (val) => {
                await store.set(key, JSON.stringify(val))
            },
            { deep: true }
        )
    })
    return value
}

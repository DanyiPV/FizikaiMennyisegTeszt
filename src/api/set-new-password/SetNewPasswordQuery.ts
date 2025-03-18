import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import type { Ref } from 'vue'

const setNewPassword = async (data: {token: string, password: string}) => {
    console.log(data);
    const response = await axiosClient.patch('http://localhost:3000/set-new-password', data)
    return response.data
}

export const useSetNewPassword = (loading: Ref<boolean, boolean>,  SetBtnValue: Ref<string, string>) => {
    const { push } = useRouter()
    return useMutation({
        mutationFn: setNewPassword,
        onMutate: () => {
          // A mutáció indítása előtt beállítjuk a loading-ot true-ra
          loading.value = true
        },
        onSuccess: (response) => {
          // A művelet sikeres befejezéséig, beállítjuk a loading-ot false-ra
          loading.value = false
          SetBtnValue.value = 'Új jelszó beállítva';
          push({ name: 'home' })
        },
        onError: (error) => {
          // Hiba esetén is beállítjuk a loading-ot false-ra
          loading.value = false
          SetBtnValue.value = 'Sikertelen';
        }
    })
}

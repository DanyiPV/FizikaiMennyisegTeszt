import axiosClient from '../../lib/axios'
import { useMutation } from '@tanstack/vue-query'

const leaderBoard = async () => {
  const response = await axiosClient.get('http://localhost:3000/contest/leader-board'); 
  return response.data;
}

export const useLeaderboard = () => {
  return useMutation({
    mutationFn: leaderBoard,
    onSuccess(array) {
      
    },
    onError: (error: any) => {
      
    },
  })
}
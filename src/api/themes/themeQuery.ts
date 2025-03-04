import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';

const fetchThemes = async () => {
    try {
        const response = await axios.get('/api/themes');
        return response.data;
    } catch (error) {
        console.error(`Error in theme store! Error ${error}`);
    }
}

export const UseThemes = () => {
    return useQuery({
        queryFn: fetchThemes,
        queryKey: ['allthemes'],
        onSuccess: (data) => {
            console.log('Fetched themes:', data);
        },
        onError: (error) => {
            console.log(`Error in theme store! Error ${error}`);
        }
    });
}

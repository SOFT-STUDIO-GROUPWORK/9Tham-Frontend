import axios from 'axios';
import { BASE_URL } from './routes';

// header
export const config = (token: string) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent: any) => {
            console.log(
                "Upload progress: " +
                Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                "%"
            );
        },
    };
};

export default axios.create({
    baseURL: BASE_URL // for backend port
});


import axios from 'axios';

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
    baseURL: 'https://localhost:7265' // for backend port
});


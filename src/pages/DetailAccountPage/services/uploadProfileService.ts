import axios, { config } from "../../../api/axios";
import { FILE_POST_URL } from "../../../api/routes"

// type urlProps = {
//     url: string;
//     token: string;
// }
// may not use in profile edit upload
// export const urlToObjectFile = async ({url, token}: urlProps) => {
//     const min = 1;
//     const max = 99999999;
//     const rand = Math.round(min + Math.random() * (max - min));

//     let file = await fetch(url)
//         .then((res) => res.blob())
//         .then((blob) => new File([blob], rand.toString(), { type: blob.type }));
//     return file;
// };

type fileUploadProps = {
    file: Blob;
    token: string;
}
export const fileUploadHandler = async ({ token, file }: fileUploadProps) => {
    if (!file) {
        console.log("Error: No file to Upload");
        return "";
    }
    try {
        const formData = new FormData();
        console.log(file);
        formData.append("Files", file);
        console.log("prepare Loading!");
        console.log(formData);
        return await axios
            .post(FILE_POST_URL, formData, config(token))
            .then((res) => {
                console.log(res.data.url);
                return res.data.url;
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.error(err)

    }
};
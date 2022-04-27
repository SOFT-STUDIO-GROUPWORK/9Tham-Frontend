import axios, { config } from "../../../api/axios";
import { FILE_POST_URL } from "../../../api/routes"

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
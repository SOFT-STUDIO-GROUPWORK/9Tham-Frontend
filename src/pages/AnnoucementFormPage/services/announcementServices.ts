import axios, { config } from "../../../api/axios";
import { ANNOUNCEMENT_DELETE_URL, ANNOUNCEMENT_GETID_URL, ANNOUNCEMENT_GET_URL, ANNOUNCEMENT_POST_URL, ANNOUNCEMENT_PUT_URL } from "../../../api/routes";

type getAnnouncementProps = {
    setIsLoading: any;
  };
  
  export const getAnnouncement = async ({ setIsLoading }: getAnnouncementProps) => {
    setIsLoading(true);
    let response = null;
    await axios
      .get(ANNOUNCEMENT_GET_URL)
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        console.error(
          `Announcement getAnnouncement(): ${err.response.status}:` + err
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log(response);
    return response;
  };

type getAnnouncementIdProps = {
    setIsLoading: any;
    AnnouncementId: number;
  };
  
  export const getAnnouncementId = async ({
    setIsLoading,
    AnnouncementId,
  }: getAnnouncementIdProps) => {
    setIsLoading(true);
    let response = null;
    await axios
      .get(ANNOUNCEMENT_GETID_URL.replace(":id", AnnouncementId.toString()))
      .then((res) => {
        response = res.data;
      })
      .catch((err) => {
        console.error(
          `AnnouncementId getAnnouncementId(): ${err.response.status}:` + err
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log(response);
    return response;
  };

  type addAnnouncementProps = {
    setIsLoading: any;
    imageUrl: string;
    content: string;
}
export const addAnnouncement = async ({
    setIsLoading,
    imageUrl,
    content
  }: addAnnouncementProps) => {
    setIsLoading(true);
    let response: any;
    await axios
      .post(
        ANNOUNCEMENT_POST_URL,
        {
          imageUrl: imageUrl,
          content: content,
        },
      )
      .then((res: any) => {
        if (res.status === 200) {
          console.log("add Announcement complete!");
          response = res.data;
        }
      })
      .catch((err) => {
        console.error(`Announcement addAnnouncement(): ${err.response.status}:` + err);
        response = null;
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log(response);
    return response;
  };

  type updateAnnouncementProps = {
    setIsLoading: any;
    editAnnouncementID: number;
    imageUrl: string;
    content: string;
  }
  export const updateAnnouncement = async ({
    setIsLoading,
    editAnnouncementID,
    imageUrl,
    content,
  }: updateAnnouncementProps) => {
    setIsLoading(true);
    let result = false;
    console.log(ANNOUNCEMENT_PUT_URL.replace(":id", editAnnouncementID.toString()));
    await axios
      .put(
        ANNOUNCEMENT_PUT_URL.replace(":id", editAnnouncementID.toString()),
        {
          imageUrl: imageUrl,
          content: content,
        },
      )
      .then((res: any) => {
        if (res.status === 200) {
          console.log("update Announcement complete!");
          console.log((ANNOUNCEMENT_PUT_URL.replace(":id", editAnnouncementID.toString())))
          result = true;
        }
      })
      .catch((err) => {
        console.error(
          `Announcement updateAnnouncement(): ${err.response.status}:` + err
        );
        result = false;
      })
      .finally(() => {
        setIsLoading(false);
      });
    return result;
  };

  type deleteAnnouncementProps = {
    setIsLoading: any;
    AnnouncementId: number;
  };

  export const deleteAnnouncement = async ({
    setIsLoading,
    AnnouncementId,
  }: deleteAnnouncementProps) => {
    setIsLoading(true);
    let result = false;
    await axios
      .delete(
        ANNOUNCEMENT_DELETE_URL.replace(":id", AnnouncementId.toString()),
      )
      .then((res: any) => {
        if (res.status === 200) {
          console.log("delete Announcement complete!");
          result = true;
        }
      })
      .catch((err) => {
        console.error(
          `Announcement deleteAnnouncement(): ${err.response.status}:` + err
        );
        result = false;
      })
      .finally(() => {
        setIsLoading(false);
      });
    return result;
  };
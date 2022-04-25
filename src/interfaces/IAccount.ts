export default interface IAccount {
    id?: number;
    firstName: string;
    lastName: string;
    nickName: string;
    email: string;
    role: number;
    isBanned: boolean;
    imageUrl: string;
    bannerUrl: string;
  }
export const initialAccount = {
    firstName: "",
    lastName: "",
    nickName: "",
    email: "",
    role: 0,
    isBanned: false,
    imageUrl: "",
    bannerUrl: "",
  };
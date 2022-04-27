export default interface IBlogger {
  bannerUrl: string;
  email: string;
  firstName: string;
  id?: number;
  imageUrl: string;
  isBanned: boolean;
  lastName: string;
  nickName: string;
  passwordHash: string;
  passwordSalt: string;
  role: number;
}

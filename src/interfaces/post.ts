import IUser from './user';

export default interface IPost {
    _id?: string;
    author: string | IUser;
    title: string;
    description: string;
    coverImage?: string;
    content: string;
    articleTag: string;
    visibility: string;
    createdAt?: string;
    updatedAt?: string;
}
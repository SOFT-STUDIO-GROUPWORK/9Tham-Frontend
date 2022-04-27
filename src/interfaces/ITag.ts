export default interface ITag {
    id: number | null;
    name: string;
    articleTags?: any;
}

export interface ITagMustHaveId {
    id: number;
    name: string;
    articleTags?: any;
}
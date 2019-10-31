import { Author } from './author';
export interface Book {
    id:number;
    name:string;
    releasedOn:string;
    author:Author;
}

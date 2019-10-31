import { Book } from "./book";
import { AuthorBook } from "./author-book";

export class Author {

    id:string;
    name:string;
    address:string;
    bookslist:AuthorBook[];
    profession:string;
    imageurl:string;
    //books : Book[];
}

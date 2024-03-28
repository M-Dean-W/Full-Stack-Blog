export interface IBlog {
    id: number;
    title: string; 
    content: string; 
    author_id: number;
    createdAt: string; 
}

export interface IAuthor {
    id: number;
    full_name: string;
    email: string;
}

export interface ITags {
    id:number;
    tag_name:string;
}
  
export interface IBlogJOIN extends IBlog {
    full_name:string;
    tag_name:string;
}
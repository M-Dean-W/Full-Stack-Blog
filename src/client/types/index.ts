export interface IBlog {
    id: number;
    title: string; 
    content: string; 
    createdAt: string; 
}

export interface IAuthor {
    id: number;
    full_name: string;
    email: string;
}
  
export interface IBlogJOIN extends IBlog {
    full_name:string;
}
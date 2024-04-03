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
}

export interface IEmail {
    from: string,
    subject: string,
    message: string
}

export interface IBlogWithContext {
    id: number;
    title: string;
    content: string;
    author_id: number;
    created_at: string;
    full_name:string;
    tagsID: string;
    TagNames: string;
    tags: {
      id: string;
      name: string;
    }[]
  }
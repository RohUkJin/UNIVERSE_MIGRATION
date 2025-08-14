export interface INews {
    title : string;
    id : number;
    image_url : string;
    news_site : string;
    summary : string;
    published_at : string;
    url : string;
}

export interface IAuthor {
    name: string;
    socials: string | null;
}

export interface INewsItem {
    id: number;
    title: string;
    authors: IAuthor[];
    url: string;
    image_url: string;
    news_site: string;
    summary: string;
    published_at: string;
    updated_at: string;
    featured: boolean;
    launches: any[];
    events: any[];
}

export interface INewsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: INewsItem[];
}
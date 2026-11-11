export interface SpaceflightArticle {
  id: number;
  title?: string;
  summary?: string;
  url?: string;
  image_url?: string;
  news_site?: string;
  published_at?: string;
}

export interface SpaceflightArticlesResponse {
  results: SpaceflightArticle[];
  next: string | null;
}

export interface NewsStory {
  id: number;
  title: string;
  summary: string;
  url: string;
  imageUrl: string | null;
  source: string;
  publishedAt: string;
}

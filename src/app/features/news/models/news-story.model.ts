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
  count: number;
  results: SpaceflightArticle[];
  next: string | null;
  previous: string | null;
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

export interface NewsArticlesPage {
  stories: NewsStory[];
  totalCount: number;
}

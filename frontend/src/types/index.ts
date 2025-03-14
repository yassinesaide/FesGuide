export interface Place {
  id: number;
  name: string;
  description: string;
  category: string;
  location: string;
  coordinates?: string;
  opening_hours?: string;
  ticket_price?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GuideResponse {
  query: string;
  language: string;
  response: string;
} 
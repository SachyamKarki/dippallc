export interface Post {
  id: number;
  title: string;
  tag: string;
  text: string;
  image_url: string;
  created_at: string;
}

export interface Job {
  id: number;
  title: string;
  location: string;
  job_type: string;
  category: string;
  description?: string;
}

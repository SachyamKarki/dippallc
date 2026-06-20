export interface Post {
  id: number;
  title: string;
  tag: string;
  text: string;
  image_url: string;
  created_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image_url: string;
}

export interface Job {
  id: number;
  title: string;
  location: string;
  job_type: string;
  category: string;
  description?: string;
  is_active?: boolean;
  created_at?: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  category: string;
  message: string;
  submitted_at: string;
  is_read: boolean;
}

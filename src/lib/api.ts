const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('dippa_admin_token');
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  withAuth = false,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
    ...(withAuth ? authHeaders() : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status}: ${text}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function login(username: string, password: string): Promise<string> {
  const data = await request<{ token: string }>('/api/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  return data.token;
}

// ── Posts ─────────────────────────────────────────────────────────────────────

export function fetchPosts() {
  return request<import('@/types').Post[]>('/api/posts/');
}

export function fetchPost(id: string | number) {
  return request<import('@/types').Post>(`/api/posts/${id}/`);
}

export function createPost(data: Omit<import('@/types').Post, 'id' | 'created_at'>) {
  return request<import('@/types').Post>('/api/posts/', { method: 'POST', body: JSON.stringify(data) }, true);
}

export function updatePost(id: number, data: Partial<Omit<import('@/types').Post, 'id' | 'created_at'>>) {
  return request<import('@/types').Post>(`/api/posts/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }, true);
}

export function deletePost(id: number) {
  return request<void>(`/api/posts/${id}/`, { method: 'DELETE' }, true);
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export function fetchTestimonials() {
  return request<import('@/types').Testimonial[]>('/api/testimonials/');
}

export function createTestimonial(data: Omit<import('@/types').Testimonial, 'id'>) {
  return request<import('@/types').Testimonial>('/api/testimonials/', { method: 'POST', body: JSON.stringify(data) }, true);
}

export function updateTestimonial(id: number, data: Partial<Omit<import('@/types').Testimonial, 'id'>>) {
  return request<import('@/types').Testimonial>(`/api/testimonials/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }, true);
}

export function deleteTestimonial(id: number) {
  return request<void>(`/api/testimonials/${id}/`, { method: 'DELETE' }, true);
}

// ── Jobs ──────────────────────────────────────────────────────────────────────

export function fetchJobs() {
  return request<import('@/types').Job[]>('/api/jobs/');
}

export function fetchJob(id: string | number) {
  return request<import('@/types').Job>(`/api/jobs/${id}/`);
}

export function createJob(data: Omit<import('@/types').Job, 'id'>) {
  return request<import('@/types').Job>('/api/jobs/', { method: 'POST', body: JSON.stringify(data) }, true);
}

export function updateJob(id: number, data: Partial<Omit<import('@/types').Job, 'id'>>) {
  return request<import('@/types').Job>(`/api/jobs/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }, true);
}

export function deleteJob(id: number) {
  return request<void>(`/api/jobs/${id}/`, { method: 'DELETE' }, true);
}

// ── Contact Submissions ───────────────────────────────────────────────────────

export function fetchContactSubmissions() {
  return request<import('@/types').ContactSubmission[]>('/api/contact-submissions/', {}, true);
}

// ── Contact form ──────────────────────────────────────────────────────────────

export function submitContact(data: { name: string; email: string; category?: string; message: string }) {
  return request<{ success: boolean }>('/api/contact/', { method: 'POST', body: JSON.stringify(data) });
}

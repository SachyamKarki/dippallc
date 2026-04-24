"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Post {
  id: number;
  title: string;
  tag: string;
  text: string;
  image_url: string;
  created_at: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image_url: string;
}

type Tab = "news" | "testimonials";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("news");
  
  // Blog State
  const [posts, setPosts] = useState<Post[]>([]);
  const [postForm, setPostForm] = useState({
    title: "",
    tag: "Software systems",
    text: "",
    image_url: "",
  });

  // Testimonial State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "",
    quote: "",
    image_url: "",
  });

  const fetchData = async () => {
    try {
      const [postsRes, testRes] = await Promise.all([
        fetch("http://localhost:8000/api/posts/"),
        fetch("http://localhost:8000/api/testimonials/")
      ]);
      setPosts(await postsRes.json());
      setTestimonials(await testRes.json());
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/posts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postForm),
    });
    setPostForm({ title: "", tag: "Software systems", text: "", image_url: "" });
    fetchData();
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/testimonials/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testimonialForm),
    });
    setTestimonialForm({ name: "", role: "", quote: "", image_url: "" });
    fetchData();
  };

  const handleDelete = async (type: "posts" | "testimonials", id: number) => {
    if (confirm(`Delete this ${type.slice(0, -1)}?`)) {
      await fetch(`http://localhost:8000/api/${type}/${id}/`, {
        method: "DELETE",
      });
      fetchData();
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto pt-32 pb-24 px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-4">Studio Admin.</h1>
            <p className="text-slate-500 font-medium">Manage your public perspective and client success stories.</p>
          </div>
          
          <div className="flex bg-slate-200/50 p-1 rounded-2xl">
            <button 
              onClick={() => setActiveTab("news")}
              className={cn(
                "px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                activeTab === "news" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Insights
            </button>
            <button 
              onClick={() => setActiveTab("testimonials")}
              className={cn(
                "px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                activeTab === "testimonials" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Testimonials
            </button>
          </div>
        </div>

        {activeTab === "news" ? (
          <div className="grid lg:grid-cols-[1fr,400px] gap-12">
            <section>
              <h2 className="text-2xl font-bold mb-8 text-slate-900">Manage Articles</h2>
              <div className="grid gap-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white p-6 rounded-3xl flex justify-between items-center border border-slate-200/60 shadow-sm group hover:border-blue-200 transition-colors">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 block mb-1">{post.tag}</span>
                      <h3 className="font-bold text-lg text-slate-900">{post.title}</h3>
                    </div>
                    <button 
                      onClick={() => handleDelete("posts", post.id)}
                      className="text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <aside className="bg-white p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 h-fit sticky top-32">
              <h2 className="text-xl font-bold mb-8">New Article</h2>
              <form onSubmit={handlePostSubmit} className="grid gap-5">
                <input
                  type="text"
                  placeholder="Article Title"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                  required
                />
                <input
                  type="text"
                  placeholder="Tag (e.g. AI Agents)"
                  value={postForm.tag}
                  onChange={(e) => setPostForm({ ...postForm, tag: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                  required
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={postForm.image_url}
                  onChange={(e) => setPostForm({ ...postForm, image_url: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
                <textarea
                  placeholder="Article content..."
                  value={postForm.text}
                  onChange={(e) => setPostForm({ ...postForm, text: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium min-h-[160px] resize-none"
                  required
                />
                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition shadow-lg shadow-slate-200">
                  Publish Insight
                </button>
              </form>
            </aside>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr,400px] gap-12">
            <section>
              <h2 className="text-2xl font-bold mb-8 text-slate-900">Manage Testimonials</h2>
              <div className="grid gap-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-white p-6 rounded-3xl flex justify-between items-center border border-slate-200/60 shadow-sm group hover:border-green-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden relative">
                        {t.image_url && <Image src={t.image_url} alt="" fill className="object-cover" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{t.name}</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.role}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete("testimonials", t.id)}
                      className="text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <aside className="bg-white p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 h-fit sticky top-32">
              <h2 className="text-xl font-bold mb-8">New Testimonial</h2>
              <form onSubmit={handleTestimonialSubmit} className="grid gap-5">
                <input
                  type="text"
                  placeholder="Client Name"
                  value={testimonialForm.name}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 transition-all font-medium"
                  required
                />
                <input
                  type="text"
                  placeholder="Role (e.g. CEO, Company Name)"
                  value={testimonialForm.role}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 transition-all font-medium"
                  required
                />
                <input
                  type="text"
                  placeholder="Avatar URL"
                  value={testimonialForm.image_url}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, image_url: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 transition-all font-medium"
                />
                <textarea
                  placeholder="Client quote..."
                  value={testimonialForm.quote}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 transition-all font-medium min-h-[160px] resize-none"
                  required
                />
                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition shadow-lg shadow-slate-200">
                  Save Testimonial
                </button>
              </form>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

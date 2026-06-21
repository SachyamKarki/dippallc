import ComingSoon from "@/components/ui/ComingSoon";

export const metadata = {
  title: "Case Studies & Blogs — DIPPA IT Solutions",
  description: "Case studies and technical insights from Dippa are coming soon.",
};

export default function NewsPage() {
  return (
    <ComingSoon
      eyebrow="Case Studies & Blogs"
      title={<>Something worth<br />reading is coming.</>}
      subtitle="We're compiling real-world case studies, technical insights, and strategic perspectives from our engagements."
    />
  );
}

import ComingSoon from "@/components/ui/ComingSoon";

export const metadata = {
  title: "About — DIPPA IT Solutions",
  description: "Learn more about Dippa — coming soon.",
};

export default function AboutPage() {
  return (
    <ComingSoon
      eyebrow="About"
      title={<>Our story is<br />on its way.</>}
      subtitle="We are putting the finishing touches on our about page — who we are, how we work, and why teams trust us with high-stakes systems."
    />
  );
}

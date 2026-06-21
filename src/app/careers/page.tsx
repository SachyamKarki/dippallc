import ComingSoon from "@/components/ui/ComingSoon";

export const metadata = {
  title: "Careers — DIPPA IT Solutions",
  description: "Open roles at Dippa are coming soon.",
};

export default function CareersPage() {
  return (
    <ComingSoon
      eyebrow="Careers"
      title={<>We&apos;re building<br />the team.</>}
      subtitle="Open roles are on their way. We hire people who take ownership, think clearly, and care about the craft."
    />
  );
}

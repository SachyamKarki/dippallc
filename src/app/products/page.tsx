import ComingSoon from "@/components/ui/ComingSoon";

export const metadata = {
  title: "Products — DIPPA IT Solutions",
  description: "Dippa product suite launching soon.",
};

export default function ProductsPage() {
  return (
    <ComingSoon
      eyebrow="Products"
      title={<>Built with precision.<br />Launching soon.</>}
      subtitle="Our product suite is in final development — purpose-built tools for IT operations, automation, and business continuity."
    />
  );
}

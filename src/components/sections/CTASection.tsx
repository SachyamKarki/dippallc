import Link from "next/link";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const CTASection = () => {
  return (
    <section className="py-32 bg-white reveal px-4 md:px-8">
      <div
        className="relative rounded-[3rem] py-12 md:py-16 px-8 md:px-16 text-center w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundColor: '#FAF9F6',
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.12) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      >
        <h2 className="section-title !mb-6">
          Start Your Journey
        </h2>

        <p className="relative z-10 text-base md:text-lg text-black max-w-2xl mx-auto mb-12 font-medium">
          Book a discovery call and let&apos;s map your technical landscape into a clear, institutional-grade architectural plan.
        </p>

        <div className="relative z-10">
          <Button href="/contact" className="px-10 py-5">
            Book Discovery Call
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

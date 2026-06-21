import { WHATSAPP_URL } from "@/lib/data";
import { WhatsAppIcon } from "@/components/ui/Icons";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={WHATSAPP_URL}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Dippa on WhatsApp at +1 443 780 6166"
    >
      <WhatsAppIcon className="whatsapp-float-icon" />
    </a>
  );
}

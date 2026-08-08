import { Sparkles } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-primary text-white text-sm">
      <div className="container-custom flex items-center justify-center gap-2 py-2 text-center">
        <Sparkles className="h-3.5 w-3.5 text-accent shrink-0" aria-hidden="true" />
        <p className="font-medium tracking-wide">
          Online classes launching soon — join the waiting list for early access
        </p>
      </div>
    </div>
  );
}

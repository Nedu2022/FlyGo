import Link from "next/link";
import { DashPage } from "@/components/dashboard/shell";
import { DashIcon } from "@/components/dashboard/icons";

const CHANNELS = [
  { icon: "messages", title: "Live chat", body: "Talk to the host team, 24/7.", action: "Start a chat", href: "/dashboard/messages" },
  { icon: "bookings", title: "Help centre", body: "Guides for listings, payouts and bookings.", action: "Browse articles", href: "/about" },
  { icon: "support", title: "Email us", body: "We reply within one working day.", action: "support@flygo.com", href: "/contact" },
];

export default function SupportPage() {
  return (
    <DashPage
      title="Help and support"
      subtitle="Find an answer fast, or reach the team directly."
    >
      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {CHANNELS.map((channel) => (
          <li key={channel.title}>
            <Link
              href={channel.href}
              className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_1px_3px_rgba(16,24,40,0.06),0_8px_24px_-12px_rgba(16,24,40,0.12)] transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-soft text-sky transition-transform duration-200 group-hover:scale-110">
                <DashIcon name={channel.icon} size={24} />
              </span>
              <h2 className="text-[17px] font-semibold text-ink">{channel.title}</h2>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-body">{channel.body}</p>
              <span className="mt-4 text-[14px] font-medium text-sky">{channel.action}</span>
            </Link>
          </li>
        ))}
      </ul>
    </DashPage>
  );
}

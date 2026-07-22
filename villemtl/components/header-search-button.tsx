"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/utils/i18n";

/**
 * The "Recherche" entry in the montreal.ca masthead. On the forum page it
 * jumps to and focuses the search field; elsewhere it navigates home first.
 */
export function HeaderSearchButton({ lang, label }: { lang: Locale; label: string }) {
  const router = useRouter();

  const activate = () => {
    const field = document.getElementById("forum-search");
    if (field) {
      field.scrollIntoView({ behavior: "smooth", block: "center" });
      field.focus({ preventScroll: true });
      return;
    }
    router.push(`/${lang}`);
  };

  return (
    <button
      type="button"
      onClick={activate}
      className="flex h-10 items-center gap-2 rounded-[4px] px-3 text-[16px] font-bold leading-[24px] text-[#212529] hover:text-[#097d6c]"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none">
        <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      {label}
    </button>
  );
}

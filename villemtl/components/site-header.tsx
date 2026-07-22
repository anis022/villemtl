import Image from "next/image";
import Link from "next/link";
import { AccountButton } from "@/components/auth/account-button";
import { MainMenu } from "@/components/main-menu";
import { LanguageToggle } from "@/components/language-toggle";
import { HeaderSearchButton } from "@/components/header-search-button";
import type { SessionUser } from "@/utils/supabase/auth";
import { getDictionary, type Locale } from "@/utils/i18n";

/**
 * Mirrors the montreal.ca masthead, measured off the live site:
 *   - the whole block is pinned to the top of the viewport (they use
 *     position:fixed + body padding; sticky achieves the same without the
 *     offset maths, and survives the page-blur filter the auth modal applies)
 *   - 32px dark utility bar, then a 73px white nav
 *   - the white nav carries a 0.8px #ced4da bottom border and no shadow
 */
export function SiteHeader({ user, lang }: { user: SessionUser | null; lang: Locale }) {
  const t = getDictionary(lang);

  return (
    <div className="sticky top-0 z-50">
      <div className="h-8 bg-[#212529]">
        <div className="flex h-full items-center justify-end pr-8">
          <LanguageToggle lang={lang} label={t.header.otherLanguage} />
        </div>
      </div>

      {/* relative: the mega-menu panel drops out of this element full-bleed. */}
      <header className="relative border-b-[0.8px] border-[#ced4da] bg-white">
        <div className="flex items-center px-8 py-[14px]">
          <Link href={`/${lang}`} className="flex shrink-0 items-center">
            {/* The borough lockup is two lines tall, so it needs more height
                than montreal.ca's single-line wordmark to stay legible. */}
            <Image
              src="/logo-montreal.png"
              alt="Ville de Montréal — Côte-des-Neiges–Notre-Dame-de-Grâce"
              width={260}
              height={120}
              priority
              className="h-16 w-auto"
            />
          </Link>

          <div className="mx-6 h-8 w-px shrink-0 bg-[#ced4da]" />

          <MainMenu
            lang={lang}
            labels={{ ...t.nav, menu: t.header.menu, sections: t.nav.sections }}
          />

          <div className="ml-auto flex items-center">
            <HeaderSearchButton lang={lang} label={t.header.search} />
            <div className="mx-6 h-8 w-px shrink-0 bg-[#ced4da]" />
            <AccountButton initialUser={user} lang={lang} />
          </div>
        </div>
      </header>
    </div>
  );
}

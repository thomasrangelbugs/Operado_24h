import { brand } from "@/data/brand";
import { footerNav } from "@/data/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-navy py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8">
        <div className="space-y-3">
          <p className="font-display text-lg font-semibold">{brand.productName}</p>
          <p className="text-sm text-white/55">{brand.footerNote}</p>
          <p className="max-w-sm text-sm text-white/70">{brand.conceptLabel}</p>
        </div>
        <nav
          className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3"
          aria-label="Rodapé"
        >
          {footerNav.map((item) => (
            <a
              key={`${item.href}-${item.label}`}
              href={item.href}
              className="text-sm text-white/65 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} {brand.productName}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

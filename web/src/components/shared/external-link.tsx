import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
};

export function ExternalLink({
  href,
  children,
  className,
  showIcon = true,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 text-accent-deep underline-offset-4 hover:text-accent hover:underline",
        className,
      )}
    >
      {children}
      {showIcon ? (
        <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 opacity-70" />
      ) : null}
    </a>
  );
}

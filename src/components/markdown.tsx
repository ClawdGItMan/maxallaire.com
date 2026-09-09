import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import type { ComponentProps } from "react";

function Anchor({ href = "", children, ...rest }: ComponentProps<"a">) {
  const external = /^https?:\/\//.test(href);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

export function Markdown({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`prose-editorial ${className}`.trim()}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: Anchor }}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

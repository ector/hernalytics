import React from "react";

export default function SectionClear({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return <section className="relative z-0 pt-[116px]">{children}</section>;
}

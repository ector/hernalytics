import Image from "next/image";
import Link from "next/link";

const AppLogo = () => (
  <Link href="/">
    <Image src="/images/brand-logo.png" alt="Brand logo" width={183} height={32} />
  </Link>
);

export default AppLogo;

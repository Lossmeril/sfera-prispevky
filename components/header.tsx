import Link from "next/link";

const Header = () => {
  return (
    <nav className="w-full h-20 border-b flex flex-row items-center px-14 font-medium shadow-sm">
      <Link href="/">Domů</Link>
    </nav>
  );
};

export default Header;

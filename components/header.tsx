import Link from "next/link";
import { RiExternalLinkLine } from "react-icons/ri";

const Header = () => {
  return (
    <nav className="w-full h-20 border-b border-black flex flex-row items-center justify-between px-10">
      <div>
        <Link href="/" className="hover:underline">
          Domů
        </Link>
      </div>
      <Link
        href="https://manual.sferagrafika.eu"
        target="_blank"
        className="px-5 py-2 border-black border 2 flex flex-row gap-2"
      >
        Grafický manuál <RiExternalLinkLine size={20} />
      </Link>
    </nav>
  );
};

export default Header;

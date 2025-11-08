import Link from "next/link";

import { RiExternalLinkLine, RiFontFamily } from "react-icons/ri";

const Header = () => {
  return (
    <nav className="w-full h-20 border-b border-black flex flex-row items-center justify-between px-10">
      <div>
        <Link href="/" className="hover:underline">
          Domů
        </Link>
      </div>
      <div className="flex flex-row items-center gap-4">
        <a
          href="/downloads/SFÉRA_fonty.zip"
          download
          className="bg-gray-100 hover:bg-gray-200 border rounded-md transition-all px-4 py-2 flex flex-row items-center gap-2"
        >
          Stáhnout sférické fonty <RiFontFamily size={20} />
        </a>
        <a
          href="https://manual.sferagrafika.eu"
          target="_blank"
          className="bg-gray-100 hover:bg-gray-200 border rounded-md transition-all px-4 py-2 flex flex-row items-center gap-2"
        >
          Grafický manuál <RiExternalLinkLine size={20} />
        </a>
      </div>
    </nav>
  );
};

export default Header;

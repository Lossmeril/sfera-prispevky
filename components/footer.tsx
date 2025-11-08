import Link from "next/link";

import { version } from "@/datasets/globalData";

const Footer = () => {
  return (
    <footer className="w-full h-16 text-xs border-t border-black flex flex-row items-center justify-between px-10">
      <div>
        <p>{"Současná verze: " + version}</p>
      </div>
      <div>
        <Link
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Grafický manuál
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

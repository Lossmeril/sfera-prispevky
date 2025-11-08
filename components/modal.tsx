"use client";

import { on } from "events";

interface modalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<modalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-xl py-10 px-20 relative">
        {title && (
          <h2 className="text-xl font-semibold mb-8 text-center">{title}</h2>
        )}
        <div className="flex flex-col gap-4 text-center">
          {children}
          <div className="flex flex-row gap-4 mt-6 justify-center">
            <button
              className="bg-gray-200 hover:bg-gray-300 border rounded-md transition-all px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
              onClick={onClose}
            >
              Pokračovat do generátoru
            </button>
            <a
              href="/downloads/SFÉRA_fonty.zip"
              download
              className="bg-gray-100 hover:bg-gray-200 border rounded-md transition-all px-4 py-2 mx-auto"
            >
              Stáhnout fonty
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

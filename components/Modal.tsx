import React from "react";

export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      onDoubleClick={(e) => e.stopPropagation()}
      className="flex items-center justify-center fixed inset-0 z-50 p-4 bg-black/40"
    >
      <div className="relative max-w-4xl mx-auto p-2.5 bg-white rounded-md animate-pop md:p-4 lg:p-5">
        <span
          className="absolute top-px right-3.5 font-bold text-3xl cursor-pointer md:text-4xl"
          onClick={onClose}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}

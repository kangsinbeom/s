"use client";

import { useModalStore } from "@/app/stores/modalStore";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const { isOpen, closeModal } = useModalStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()} // 클릭 시 모달 닫히는 거 막기
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

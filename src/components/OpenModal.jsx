import React, { useState } from "react";
import Modal from "./Modal";
import { getSolePhone } from "../api/phoneApi";

function OpenModal({ children, phoneinfoid }) {
  const [isOpen, setIsOpen] = useState(false);
  const solePhone = getSolePhone(phoneinfoid);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onClick={() => {
          setIsOpen(true);
          scrollToTop();
        }}
      >
        {children}
      </div>

      <Modal open={isOpen} soleTrending={solePhone} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default OpenModal;

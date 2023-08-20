import { createPortal } from "react-dom";

function Modal({ children, onCloseModal }) {
  const overlayRoot = document.getElementById("overlay-modal");
  const modalElement = (
    <>
      <div
        onClick={onCloseModal}
        className="fixed left-0 top-0 z-20 h-[100vh] w-[100%]  backdrop-blur-sm "
      />
      <div className="animate-slideDown fixed left-[5%] top-[20vh] z-30 w-[90%] rounded-2xl bg-white p-4 drop-shadow-md md:left-[calc(50%-20rem)] md:w-[40rem] ">
        {children}
      </div>
    </>
  );
  return createPortal(modalElement, overlayRoot);
}

export default Modal;

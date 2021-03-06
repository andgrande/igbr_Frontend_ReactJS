import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';

// interface IClassDetails {
//   class_id: string;
//   id: string;
//   class_level: string;
//   class_day: string;
//   class_hour: number;
//   teacher: {
//     teacher_name: string;
//   };
// }

interface IModalProps {
  children: any;
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, setIsOpen }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#FDF0E5',
          color: '#000000',
          borderRadius: '8px',
          // width: '736px',
          width: '80%',
          height: '60%',
          border: 'none',
          overflow: 'auto',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;

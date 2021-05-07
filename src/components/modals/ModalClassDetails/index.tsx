import React, { useCallback, useState } from 'react';

// import { FiCheckSquare } from 'react-icons/fi';
// import { FormHandles } from '@unform/core';
// import { Form } from './styles';
import Modal from '../Modal';
// import Input from '../Input';
// import api from '../../services/api';

import {
  ClassInfo,
  ModalHeader,
  ModalHeaderButtons,
  ReturnModalButton,
  CloseModalButton,
  Timetable,
} from './styles';

import { ClassDetailsDTO } from '../../../dto/IClassDetailsDTO';
import {
  ClassTimetableDTO,
  StudentsTimetableDTO,
} from '../../../dto/IClassTimetableDTO';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  // classDetails: ClassDetailsDTO;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  // classDetails,
}) => {
  const [dateInFocus, setDateInFocus] = useState<ClassTimetableDTO | null>(
    null,
  );
  const [studentsObjectArray, setStudentsObjectArray] = useState<
    StudentsTimetableDTO[]
  >([]);

  // const studentsObjectArray: StudentsTimetableDTO = new Array<StudentsTimetableDTO>();

  const handleReturnModal = useCallback(() => {
    setDateInFocus(null);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen();
  }, [setIsOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader>
        <h1>Class Details</h1>

        <ModalHeaderButtons>
          {dateInFocus && (
            <ReturnModalButton
              type="button"
              data-testid="add-food-button"
              onClick={() => handleReturnModal()}
            >
              <p className="text">Return</p>
            </ReturnModalButton>
          )}

          <CloseModalButton
            type="button"
            data-testid="add-food-button"
            onClick={() => handleCloseModal()}
          >
            <p className="text">Close details</p>
          </CloseModalButton>
        </ModalHeaderButtons>
      </ModalHeader>

      <h4>Teacher</h4>
      <ClassInfo>
        <p>Teacher name:</p>
        <p>Teacher email:</p>
      </ClassInfo>

      <h4>Students</h4>
      <ClassInfo />
      <h4>Class Dates</h4>
    </Modal>
  );
};

export default ModalAddFood;

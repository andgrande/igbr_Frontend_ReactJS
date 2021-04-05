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
  ClassDateSubHeader,
} from './styles';

import IClassDetailsDTO from '../../dto/IClassDetailsDTO';
import {
  ClassTimetableDTO,
  StudentsTimetableDTO,
} from '../../dto/IClassTimetableDTO';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  classDetails: IClassDetailsDTO;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  classDetails,
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

  function handleDateInfocus(timetable: ClassTimetableDTO) {
    setDateInFocus(timetable);

    const objectArray = Object.entries(timetable.students_presence);
    const newObjectArray = new Array<StudentsTimetableDTO>();

    objectArray.forEach(item => newObjectArray.push(item[1]));
    setStudentsObjectArray(
      newObjectArray.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      }),
    );
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader>
        <h1>
          Class <em>{classDetails.retrievedClasses.class_id}</em> Details
        </h1>

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
        <p>
          Teacher name: {classDetails.retrievedClasses.teacher.teacher_name}
        </p>
        <p>
          Teacher email: {classDetails.retrievedClasses.teacher.teacher_email}
        </p>
      </ClassInfo>

      <h4>Students</h4>
      <ClassInfo>
        {classDetails.retrievedClasses.classes_x_students.map(student => (
          <p>{student.student_name}</p>
        ))}
      </ClassInfo>
      <h4>Class Dates</h4>
      {!dateInFocus ? (
        classDetails.retrievedTimetable.map(timetable => (
          <Timetable
            key={timetable.id}
            onClick={() => handleDateInfocus(timetable)}
          >
            <p>Class Date: {timetable.date}</p>
            <p>Class no: {timetable.class_number}</p>
            <p>Class Status: {timetable.class_status}</p>
          </Timetable>
        ))
      ) : (
        <>
          <ClassDateSubHeader>
            <span>{dateInFocus.date}</span>
            <span>Class #{dateInFocus.class_number}</span>
            <span>{dateInFocus.class_status}</span>
            {console.log(studentsObjectArray)}
          </ClassDateSubHeader>

          {studentsObjectArray.map(
            item =>
              item.status === 'active' && (
                <Timetable>
                  <p>{item.name}</p>
                  {/* <p>{item.status}</p> */}
                  <p>Presence {item.present ? 'Present' : 'Absent'}</p>
                  <p>Homework {item.homework ? 'done' : 'pending'}</p>
                </Timetable>
              ),
          )}
        </>
      )}
    </Modal>
  );
};

export default ModalAddFood;

import React, { useCallback, useState } from 'react';

// import { FiCheckSquare } from 'react-icons/fi';
// import { FormHandles } from '@unform/core';
// import { Form } from './styles';
import Modal from '../Modal';
// import Input from '../Input';
// import api from '../../services/api';

import { ClassInfo, Timetable } from './styles';

import ClassDetailsDTO from '../../dto/IClassDetailsDTO';
import ClassTimetableDTO from '../../dto/IClassTimetableDTO';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  classDetails: ClassDetailsDTO;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  classDetails,
}) => {
  const [dateInFocus, setDateInFocus] = useState<ClassTimetableDTO | null>(
    null,
  );
  const handleSubmit = useCallback(() => {
    setIsOpen();
  }, [setIsOpen]);

  function handleDateInfocus(timetable: ClassTimetableDTO) {
    setDateInFocus(timetable);
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1>
        Class <em>{classDetails.retrievedClasses.class_id}</em> Details
      </h1>

      <h3>Teacher</h3>
      <ClassInfo>
        <p>
          Teacher name: {classDetails.retrievedClasses.teacher.teacher_name}
        </p>
        <p>
          Teacher email: {classDetails.retrievedClasses.teacher.teacher_email}
        </p>
      </ClassInfo>

      <h3>Students</h3>
      <ClassInfo>
        {classDetails.retrievedClasses.classes_x_students.map(student => (
          <p>{student.student_name}</p>
        ))}
      </ClassInfo>
      <h3>Class Dates</h3>
      {!dateInFocus
        ? classDetails.retrievedTimetable.map(timetable => (
            <Timetable
              key={timetable.id}
              onClick={() => handleDateInfocus(timetable)}
              // onClick={() => console.log(timetable)}
            >
              <p>Class Date: {timetable.date}</p>
              <p>Class no: {timetable.class_number}</p>
              <p>Class Status: {timetable.class_status}</p>
            </Timetable>
          ))
        : // : dateInFocus.map(item => <div>{item.date}</div>)}
          console.log(dateInFocus)}

      <button
        type="button"
        data-testid="add-food-button"
        onClick={() => handleSubmit}
      >
        <p className="text">Close details</p>
      </button>
    </Modal>
  );
};

export default ModalAddFood;

import React, { useCallback, useState, useEffect } from 'react';

import Modal from '../Modal';
import Input from '../../Input';
import Button from '../../Button';
import api from '../../../services/api';

import {
  ClassInfo,
  ModalHeader,
  ModalHeaderButtons,
  CloseModalButton,
  EnrolledStudents,
  StudentsList,
} from './styles';
import { ClassDetailsDTO } from '../../../dto/IClassDetailsDTO';
import { StudentsDTO } from '../../../dto/IStudentsDTO';
import ButtonRegular from '../../ButtonRegular';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  studentsList: ClassDetailsDTO | null;
  // showClassDetails: (class_id: string) => Promise<any>;
}

interface ManageStudentsFormData {
  class_day: string;
  class_level: string;
  class_hour: number;
  class_duration: number;
  weeks_duration: number;
  start_date: Date;
  teacher_id: string;
}

const ModalManageStudents: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  studentsList,
}) => {
  const [students, setStudents] = useState(studentsList);
  const [fullStudentsList, setFullStudentsList] = useState<StudentsDTO[]>();
  const [searchValue, setSearchValue] = useState('');
  const [filteredStudentsList, setFilteredStudentsList] = useState<
    StudentsDTO[]
  >();
  const mainClassId = studentsList?.retrievedClasses.id;
  const mainClassCode = studentsList?.retrievedClasses.class_id;

  const refreshData = useCallback(() => {
    const ids = studentsList?.retrievedClasses.classes_x_students.map(
      item => item.student_id,
    );

    const nugget = fullStudentsList?.filter(item => {
      if (ids?.includes(item.id)) {
        return false;
      }
      return item;
    });

    setFilteredStudentsList(nugget);
    setFullStudentsList(nugget);
  }, []);

  useEffect(() => {
    setStudents(studentsList);
    api.get(`students/`).then(response => {
      setFullStudentsList([...response.data]);
    });
    refreshData();
  }, [studentsList]);

  const handleCloseModal = useCallback(() => {
    setIsOpen();
  }, [setIsOpen]);

  const handleClassDetails = useCallback(
    (class_id: string) => {
      setIsOpen();
    },
    [setIsOpen],
  );

  const handleRemoveStudent = useCallback(
    async (id, name) => {
      // eslint-disable-next-line no-restricted-globals
      // const shouldProceed = confirm(
      //   `Click to remove student ${name} from class ${mainClassCode}!`,
      // );

      if (mainClassCode && students) {
        const { data } = await api.patch(`students/${id}`, {
          class_id: '8f110db3-73e9-4c06-b4fe-8b9ffea81f1b',
        });

        const index = students?.retrievedClasses.classes_x_students.findIndex(
          idx => idx.student_id === id,
        );

        const splicedArr = students;
        splicedArr.retrievedClasses.classes_x_students.splice(index, 1);

        setStudents({ ...splicedArr });
        // refreshData();
      }
    },
    [mainClassCode, students],
  );

  const handleAddStudent = useCallback(
    async (id, name) => {
      // eslint-disable-next-line no-restricted-globals
      // const shouldProceed = confirm(
      //   `Click to remove student ${name} from class ${`y`} to ${mainClassCode}!`,
      // );

      if (
        // shouldProceed &&
        students
        // &&
        // fullStudentsList &&
        // filteredStudentsList
      ) {
        const studentAlreadyExist = students.retrievedClasses.classes_x_students.find(
          item => item.student_id === id,
        );

        if (studentAlreadyExist) {
          console.log('Already enrolled');
          return;
        }

        api
          .patch(`students/${id}`, {
            class_id: mainClassId,
          })
          .then(response => {
            const tempStudents = students;
            tempStudents.retrievedClasses.classes_x_students.push(
              response.data,
            );
            setStudents({ ...tempStudents });
          });
      }
      // refreshData();
    },
    [mainClassId, students],
  );

  const filterStudentsList = useCallback(
    text => {
      setSearchValue(text);

      const filtered = fullStudentsList?.filter(item => {
        const name = item.full_name.toLocaleUpperCase();
        const search = text.toLocaleUpperCase();
        return name.includes(search);
      });

      setFilteredStudentsList(filtered);
    },
    [fullStudentsList],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader>
        <div>
          <h1>Manage Students for class # </h1>
        </div>
        <ModalHeaderButtons>
          <CloseModalButton type="button" onClick={() => handleCloseModal()}>
            <p className="text">Close details</p>
          </CloseModalButton>
        </ModalHeaderButtons>
      </ModalHeader>

      <h4>Students in this class</h4>

      {students &&
        students.retrievedClasses.classes_x_students.map(item => (
          <EnrolledStudents>
            <p>{item.student_name}</p>
            <ButtonRegular
              actionParam="remove"
              onClick={() =>
                handleRemoveStudent(item.student_id, item.student_name)
              }
            >
              Remove
            </ButtonRegular>
          </EnrolledStudents>
        ))}

      <h4>Handle students</h4>

      <input
        placeholder="Search student by name"
        value={searchValue}
        onChange={e => filterStudentsList(e.target.value)}
      />

      {filteredStudentsList &&
        filteredStudentsList.map(item => (
          <EnrolledStudents>
            <StudentsList>
              <p>{item.full_name}</p>
              <p>{item.email}</p>
            </StudentsList>
            <ButtonRegular
              actionParam={item.class_id === mainClassId ? 'remove' : 'add'}
              onClick={() =>
                item.class_id === mainClassId
                  ? handleRemoveStudent(item.id, item.full_name)
                  : handleAddStudent(item.id, item.full_name)
              }
            >
              {item.class_id === mainClassId ? 'Remove' : 'Add to class'}
            </ButtonRegular>
          </EnrolledStudents>
        ))}
    </Modal>
  );
};

export { ModalManageStudents };

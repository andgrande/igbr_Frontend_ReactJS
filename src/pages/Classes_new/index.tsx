import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ModalCreateClass } from '../../components/modals/ModalCreateClass';
import { ModalManageStudents } from '../../components/modals/ModalManageStudents';

import api from '../../services/api';

import { Header } from '../../components/Header';
import { SubHeader } from '../../components/SubHeader';
import { ToggleButton } from '../../components/ToggleButton';
import { ToggleRectangular } from '../../components/Toggle';
import {
  Container,
  Content,
  ClassList,
  ClassDetails,
  Class,
  DetailsHeader,
  DetailsButtons,
  CloseDetailsButton,
  ClassInfo,
  Timetable,
  ClassDateSubHeader,
  ClassDateSubHeaderSpan,
  ManageStudentsButton,
  Individuals,
  ClassStudentSubHeader,
} from './styles';

import {
  ClassDetailsDTO,
  RetrievedTimetableDTO,
} from '../../dto/IClassDetailsDTO';
import { ClassTimetableDTO, TTDTO } from '../../dto/IClassTimetableDTO';

interface ClassesItems {
  class_id: string;
  id: string;
  class_level: string;
  class_day: string;
  class_hour: number;
  teacher: {
    teacher_name: string;
  };
}

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<ClassesItems[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [classDetails, setClassDetails] = useState<ClassDetailsDTO | null>(
    null,
  );
  const [retrievedTimetable, setRetrievedTimetable] = useState<
    RetrievedTimetableDTO[]
  >([]);
  const [dateInFocus, setDateInFocus] = useState<ClassTimetableDTO | null>(
    null,
  );
  const [studentsObjectArray, setStudentsObjectArray] = useState<TTDTO[]>([]);
  const [date, setDate] = useState('');
  const [hour, setHour] = useState(Date);

  useEffect(() => {
    api.get('/classes').then(response => {
      setClasses(response.data);
    });
  }, []);

  function handleDateTime(timetable: ClassTimetableDTO) {
    setDateInFocus(timetable);

    const rawDate = new Date(timetable.date);
    setDate(format(rawDate, 'dd-MM-yyyy', { locale: ptBR }));
    setHour(format(rawDate, 'HH:mm'));

    if (timetable.students_presence) {
      const objectArray = Object.entries(timetable.students_presence);

      const newObjectArray = new Array<TTDTO>();

      objectArray.forEach(item => {
        const id = item[0];
        const arr = item[1];

        newObjectArray.push({ id, ...arr });
      });

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
  }

  async function handleShowClassDetails(class_id: string) {
    const { data } = await api.get(`/classes/${class_id}/details`);

    if (modalOpen2 === false) {
      setDateInFocus(null);
    }

    setClassDetails(data);

    const tt = data.retrievedTimetable;

    tt.sort((a: RetrievedTimetableDTO, b: RetrievedTimetableDTO) => {
      if (a.class_number > b.class_number) {
        return 1;
      }
      if (a.class_number < b.class_number) {
        return -1;
      }
      return 0;
    });

    setRetrievedTimetable([
      ...tt.map((item: RetrievedTimetableDTO) => {
        const tempItem = { ...item };
        const rawDate = new Date(tempItem.date);
        tempItem.formattedDate = format(rawDate, 'dd-MM-yyyy', {
          locale: ptBR,
        });
        return tempItem;
      }),
    ]);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleModal2(): void {
    if (classDetails && modalOpen2) {
      handleShowClassDetails(classDetails.retrievedClasses.id);
    }

    setModalOpen2(!modalOpen2);
  }

  const handleCloseDetails = useCallback(() => {
    setDateInFocus(null);
  }, []);

  async function handleChangeClassStatus(
    id: string,
    class_id: string,
    status: string,
    selected_date: Date,
  ) {
    let newStatus = '';

    if (status === 'pending') {
      newStatus = 'given';
    } else if (status === 'given') {
      newStatus = 'pending';
    }

    const { data } = await api.patch(`/classes/${class_id}/set_status`, {
      date: selected_date,
      new_status: newStatus,
    });

    const newData = data.updatedClass;
    const filteredData = newData.find((item: ClassTimetableDTO) => {
      return item.id === id;
    });
    setDateInFocus(filteredData);

    setRetrievedTimetable([
      ...retrievedTimetable.map(item => {
        const tempItem = { ...item };
        if (item.id === id) {
          tempItem.class_status = newStatus;
        }
        return tempItem;
      }),
    ]);
  }

  async function handleSetPresence(
    student: TTDTO,
    classDate: ClassTimetableDTO,
    status: boolean,
    component: string,
  ): Promise<any> {
    const action = {
      ...(component === 'presence' ? { student_presence: status } : {}),
      ...(component === 'homework' ? { student_homework: status } : {}),
    };

    const { data } = await api.patch(`/students/${student.id}/set_status`, {
      class_id: classDate.class_id,
      ...action,
      date: classDate.date,
    });

    setRetrievedTimetable([
      ...retrievedTimetable.map(item => {
        const tempItem = { ...item };
        data.forEach((idx: any) => {
          if (idx.id === item.id) {
            tempItem.students_presence = idx.students_presence;
          }
        });

        return tempItem;
      }),
    ]);
  }

  function handleToggleModal(): void {
    toggleModal();
  }

  function handleToggleModal2(): void {
    toggleModal2();
  }

  function handleManageStudents() {
    if (classDetails) {
      alert(
        classDetails.retrievedClasses.classes_x_students.map(
          student => student.student_name,
        ),
      );
    }
  }

  return (
    <Container>
      <Header />
      <SubHeader searchVisible openModal={handleToggleModal} />

      <Content>
        <ModalCreateClass
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          showClassDetails={handleShowClassDetails}
        />

        {/* {modalOpen2 && ( */}
        <ModalManageStudents
          isOpen={modalOpen2}
          setIsOpen={toggleModal2}
          studentsList={classDetails}
        />
        {classes && (
          <>
            <ClassList>
              {classes.map(item => (
                <Class
                  key={item.id}
                  onClick={() => handleShowClassDetails(item.id)}
                >
                  <p>
                    Class Code: <strong>{item.class_id}</strong>
                  </p>
                  <p>
                    Class Level: <strong>{item.class_level}</strong>
                  </p>
                  <p>
                    Class Day: <strong>{item.class_day}</strong>
                  </p>
                  <p>
                    Class Hour: <strong>{item.class_hour} h</strong>
                  </p>
                  <p>
                    Class Teacher: <strong>{item.teacher.teacher_name}</strong>
                  </p>
                </Class>
              ))}
            </ClassList>
            <ClassDetails>
              {classDetails && (
                <>
                  <DetailsHeader>
                    <h1>
                      Class <em>{classDetails.retrievedClasses.class_id}</em>{' '}
                      Details
                    </h1>
                  </DetailsHeader>

                  <h4>Teacher</h4>
                  <ClassInfo>
                    <Individuals>
                      <p>
                        Teacher name:{' '}
                        {classDetails.retrievedClasses.teacher.teacher_name}
                      </p>
                      <p>
                        Teacher email:{' '}
                        {classDetails.retrievedClasses.teacher.teacher_email}
                      </p>
                    </Individuals>
                  </ClassInfo>

                  <ClassStudentSubHeader>
                    <h4>Students</h4>
                    <ManageStudentsButton
                      type="button"
                      onClick={() => handleToggleModal2()}
                    >
                      <p className="text">Manage students</p>
                    </ManageStudentsButton>
                  </ClassStudentSubHeader>
                  <ClassInfo>
                    <Individuals>
                      {classDetails.retrievedClasses.classes_x_students.map(
                        student => (
                          <p key={student.id}>{student.student_name}</p>
                        ),
                      )}
                    </Individuals>
                  </ClassInfo>

                  <h4>Class Dates</h4>
                  {dateInFocus ? (
                    <>
                      <ClassDateSubHeader>
                        <ClassDateSubHeaderSpan>{date}</ClassDateSubHeaderSpan>
                        <ClassDateSubHeaderSpan>{hour}</ClassDateSubHeaderSpan>
                        <ClassDateSubHeaderSpan>
                          Class #{dateInFocus.class_number}
                        </ClassDateSubHeaderSpan>

                        <ToggleRectangular
                          isChecked={dateInFocus.class_status}
                          componentId="class_status"
                          dateInFocus={dateInFocus}
                          setPresence={handleChangeClassStatus}
                        />
                        <DetailsButtons>
                          <CloseDetailsButton
                            type="button"
                            onClick={() => handleCloseDetails()}
                          >
                            <p className="text">Close details</p>
                          </CloseDetailsButton>
                        </DetailsButtons>
                      </ClassDateSubHeader>

                      {studentsObjectArray.map(
                        item =>
                          item.status === 'active' && (
                            <Timetable key={item.id}>
                              <p>{item.name}</p>
                              <p>
                                Presence
                                <ToggleButton
                                  componentId="presence"
                                  dateInFocus={dateInFocus}
                                  setPresence={handleSetPresence}
                                  studentInFocus={item}
                                  isChecked={!!item.present}
                                />
                              </p>
                              <p>
                                Homework
                                <ToggleButton
                                  componentId="homework"
                                  dateInFocus={dateInFocus}
                                  setPresence={handleSetPresence}
                                  studentInFocus={item}
                                  isChecked={!!item.homework}
                                />
                              </p>
                            </Timetable>
                          ),
                      )}
                    </>
                  ) : (
                    retrievedTimetable.length > 0 &&
                    retrievedTimetable.map(timetable => (
                      <Timetable
                        key={timetable.id}
                        status={timetable.class_status}
                        onClick={() => handleDateTime(timetable)}
                      >
                        <p>Class Date: {timetable.formattedDate}</p>
                        <p>Class no: {timetable.class_number}</p>
                        <p>Class Status: {timetable.class_status}</p>
                      </Timetable>
                    ))
                  )}
                </>
              )}
            </ClassDetails>
          </>
        )}
      </Content>
    </Container>
  );
};

export { Classes };

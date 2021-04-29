import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import ModalClassDetails from '../../components/ModalClassDetails';

import api from '../../services/api';

import { Header } from '../../components/Header';
import { SubHeader } from '../../components/SubHeader';
import { Checkbox } from '../../components/Checkbox';
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
  ClassDateSubHeaderButton,
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
  const [classDetails, setClassDetails] = useState<ClassDetailsDTO | null>(
    null,
  );
  const [retrievedTimetable, setRetrievedTimetable] = useState<
    RetrievedTimetableDTO[]
  >([]);
  const [modalDetails, setModalDetails] = useState<ClassDetailsDTO | null>(
    null,
  );
  const [dateInFocus, setDateInFocus] = useState<ClassTimetableDTO | null>(
    null,
  );
  const [studentsObjectArray, setStudentsObjectArray] = useState<
    // StudentsTimetableDTO[]
    TTDTO[]
  >([]);
  const [date, setDate] = useState('');
  const [hour, setHour] = useState(Date);

  useEffect(() => {
    api.get('/classes').then(response => {
      setClasses(response.data);
    });
  }, []);

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function handleDateTime(timetable: ClassTimetableDTO) {
    setDateInFocus(timetable);

    const rawDate = new Date(timetable.date);
    setDate(format(rawDate, 'dd-MM-yyyy', { locale: ptBR }));
    setHour(format(rawDate, 'HH:mm'));

    const objectArray = Object.entries(timetable.students_presence);

    // const newObjectArray = new Array<StudentsTimetableDTO>();

    const newObjectArray = new Array<TTDTO>();

    objectArray.forEach(item => {
      const id = item[0];
      const arr = item[1];

      newObjectArray.push({ id, ...arr });
    });

    // objectArray.forEach(item => newObjectArray.push(item[1]));

    // setStudentsObjectArray([...newObjectArray]);
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

  // function handleToggleModal(class_id: string): void {
  //   api
  //     .get(`/classes/${class_id}/details`)
  //     .then(response => setModalDetails(response.data));

  //   toggleModal();
  // }

  const handleShowClassDetails = useCallback(async class_id => {
    const { data } = await api.get(`/classes/${class_id}/details`);
    setDateInFocus(null);

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
  }, []);

  const handleCloseDetails = useCallback(() => {
    setDateInFocus(null);
  }, []);

  // const getDateTime = useCallback(time => {
  //   const b = new Date(time);

  //   setDate(`${b.getDate()}-${b.getMonth() + 1}-${b.getFullYear()}`);
  // }, []);

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

    await api.patch(`/students/${student.id}/set_status`, {
      class_id: classDate.class_id,
      ...action,
      date: classDate.date,
    });
  }

  return (
    <Container>
      <Header />
      <SubHeader />
      <Content>
        {modalDetails && (
          <ModalClassDetails
            isOpen={modalOpen}
            setIsOpen={toggleModal}
            classDetails={modalDetails}
          />
        )}
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
                    <p>
                      Teacher name:{' '}
                      {classDetails.retrievedClasses.teacher.teacher_name}
                    </p>
                    <p>
                      Teacher email:{' '}
                      {classDetails.retrievedClasses.teacher.teacher_email}
                    </p>
                  </ClassInfo>

                  <h4>Students</h4>
                  <ClassInfo>
                    {classDetails.retrievedClasses.classes_x_students.map(
                      student => (
                        <p key={student.id}>{student.student_name}</p>
                      ),
                    )}
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
                        <ClassDateSubHeaderButton
                          type="button"
                          status={dateInFocus.class_status}
                          onClick={() =>
                            handleChangeClassStatus(
                              dateInFocus.id,
                              dateInFocus.class_id,
                              dateInFocus.class_status,
                              dateInFocus.date,
                            )
                          }
                        >
                          <p>{dateInFocus.class_status || '...'}</p>
                        </ClassDateSubHeaderButton>
                        <DetailsButtons>
                          <CloseDetailsButton
                            type="button"
                            data-testid="add-food-button"
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
                                <Checkbox
                                  componentId="presence"
                                  dateInFocus={dateInFocus}
                                  setPresence={handleSetPresence}
                                  studentInFocus={item}
                                  isChecked={!!item.present}
                                />
                              </p>
                              <p>
                                Homework
                                <Checkbox
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
                    retrievedTimetable.length > 1 &&
                    retrievedTimetable.map(timetable => (
                      <Timetable
                        key={timetable.id}
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

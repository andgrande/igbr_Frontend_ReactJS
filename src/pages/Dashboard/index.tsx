import React, { useState, useEffect } from 'react';

import ModalClassDetails from '../../components/ModalClassDetails';

import api from '../../services/api';

import { Header } from '../../components/Header';
import { Container, Content, Classes, Class } from './styles';

import ClassDetailsDTO from '../../dto/IClassDetailsDTO';

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

const Dashboard: React.FC = () => {
  const [classes, setClasses] = useState<ClassesItems[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  // const [modalClassDetails, setModalClassDetails] = useState<ClassesItems | null>(null);
  const [modalDetails, setModalDetails] = useState<ClassDetailsDTO | null>(
    null,
  );

  useEffect(() => {
    api.get('/classes').then(response => {
      setClasses(response.data);
    });
  }, []);

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function handleToggleModal(class_id: string): void {
    api
      .get(`/classes/${class_id}/details`)
      .then(response => setModalDetails(response.data));

    toggleModal();
  }

  return (
    <Container>
      <Header />
      <Content>
        <h1>Classes</h1>

        {modalDetails && (
          <ModalClassDetails
            isOpen={modalOpen}
            setIsOpen={toggleModal}
            classDetails={modalDetails}
          />
        )}
        {classes && (
          <Classes>
            {classes.map(item => (
              <Class key={item.id} onClick={() => handleToggleModal(item.id)}>
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
          </Classes>
        )}
      </Content>
    </Container>
  );
};

export { Dashboard };

import React, { useRef, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BiCalendar, BiTime, BiHourglass, BiAbacus } from 'react-icons/bi';
import { GiTeacher } from 'react-icons/gi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Modal from '../Modal';
import Input from '../../Input';
import Button from '../../Button';
import api from '../../../services/api';

import {
  ClassInfo,
  ModalHeader,
  ModalHeaderButtons,
  CloseModalButton,
} from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  showClassDetails: (class_id: string) => Promise<any>;
}

interface CreateClassFormData {
  class_day: string;
  class_level: string;
  class_hour: number;
  class_duration: number;
  weeks_duration: number;
  start_date: Date;
  teacher_id: string;
}

const ModalCreateClass: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  showClassDetails,
}) => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const handleCloseModal = useCallback(() => {
    setIsOpen();
  }, [setIsOpen]);

  const handleClassDetails = useCallback(
    (class_id: string) => {
      showClassDetails(class_id);
      setIsOpen();
    },
    [setIsOpen, showClassDetails],
  );

  const handleSubmit = useCallback(
    async (data: CreateClassFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          class_day: Yup.string().required('Day is mandatory'),
          class_level: Yup.string().required('Level is mandatory'),
          class_hour: Yup.string().required('Hour is mandatory'),
          class_duration: Yup.string().required('Time is mandatory'),
          weeks_duration: Yup.string().required('Duration is mandatory'),
          start_date: Yup.string().required('Date is mandatory'),
          teacher_id: Yup.string().required('Teacher is mandatory'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('/classes', {
          class_day: data.class_day,
          class_level: data.class_level,
          class_hour: data.class_hour,
          class_duration: data.class_duration,
          weeks_duration: data.weeks_duration,
          start_date: data.start_date,
          teacher_id: data.teacher_id,
        });

        handleClassDetails(response.data.createdClass.id);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // const error = getValidationErrors(err);
          // formRef.current?.setErrors(err);
          console.log('Check error');
        }
      }
    },
    [history, handleClassDetails],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalHeader>
        <div>
          <h1>Create new class</h1>
          <h4>Provide details:</h4>
        </div>
        <ModalHeaderButtons>
          <CloseModalButton
            type="button"
            data-testid="add-food-button"
            onClick={() => handleCloseModal()}
          >
            <p className="text">Close details</p>
          </CloseModalButton>
        </ModalHeaderButtons>
      </ModalHeader>

      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          marginTop: '1em',
          alignItems: 'center',
        }}
      >
        <Input name="class_day" icon={BiCalendar} placeholder="Class Day" />
        <Input name="class_level" icon={BiAbacus} placeholder="Class Level" />
        <Input name="class_hour" icon={BiTime} placeholder="Class Hour" />
        <Input
          name="class_duration"
          icon={BiTime}
          placeholder="Class Duration"
        />
        <Input
          name="weeks_duration"
          icon={BiHourglass}
          placeholder="Weeks Duration"
        />
        <Input name="start_date" icon={BiCalendar} placeholder="Start Date" />
        <Input name="teacher_id" icon={GiTeacher} placeholder="Teacher" />
        <Button type="submit">Criar classe</Button>
      </Form>
    </Modal>
  );
};

export { ModalCreateClass };

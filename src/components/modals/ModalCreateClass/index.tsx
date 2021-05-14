import React, { useRef, useCallback, useEffect, useState } from 'react';
import { BiCalendar, BiTime, BiHourglass, BiAbacus } from 'react-icons/bi';
import { GiTeacher } from 'react-icons/gi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Modal from '../Modal';
import Input from '../../Input';
import Button from '../../Button';
import Select from '../../Select';
import api from '../../../services/api';

import { ModalHeader, ModalHeaderButtons, CloseModalButton } from './styles';

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
  const [selectTeacherOptions, setSelectTeacherOptions] = useState<
    [{ name: string; label: string }]
  >();
  const selectClassDay: any = [
    { name: 'Sunday', label: 'Sunday' },
    { name: 'Monday', label: 'Monday' },
    { name: 'Tuesday', label: 'Tuesday' },
    { name: 'Wednesday', label: 'Wednesday' },
    { name: 'Thursday', label: 'Thursday' },
    { name: 'Friday', label: 'Friday' },
    { name: 'Saturday', label: 'Saturday' },
  ];
  const selectClassLevel: any = [
    { name: 'A1', label: 'Básico 1' },
    { name: 'A2', label: 'Básico 2' },
    { name: 'B1', label: 'Intermediário 1' },
    { name: 'B2', label: 'Intermediário 2' },
    { name: 'C1', label: 'Avançado' },
  ];
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

  useEffect(() => {
    api.get('/teacher').then(response => {
      setSelectTeacherOptions(() =>
        response.data.map((item: { id: string; teacher_name: string }) => {
          return {
            name: item.id,
            label: item.teacher_name,
          };
        }),
      );
    });
  }, []);

  const handleSubmit = useCallback(
    async (formData: CreateClassFormData) => {
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

        await schema.validate(formData, {
          abortEarly: false,
        });

        const { data } = await api.post('/classes', {
          class_day: formData.class_day,
          class_level: formData.class_level,
          class_hour: formData.class_hour,
          class_duration: formData.class_duration,
          weeks_duration: formData.weeks_duration,
          start_date: formData.start_date,
          teacher_id: formData.teacher_id,
        });

        handleClassDetails(data.createdClass.id);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          console.log('Check error');
        }
      }
    },
    [handleClassDetails],
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
        {/* <Input name="class_day" icon={BiCalendar} placeholder="Class Day" /> */}
        <Select name="class_day" icon={BiCalendar} options={selectClassDay} />
        {/* <Input name="class_level" icon={BiAbacus} placeholder="Class Level" /> */}
        <Select name="class_level" icon={BiAbacus} options={selectClassLevel} />
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
        {console.log(selectTeacherOptions)}
        <Select
          name="teacher_id"
          icon={GiTeacher}
          options={selectTeacherOptions}
        />
        <Button type="submit">Criar classe</Button>
      </Form>
    </Modal>
  );
};

export { ModalCreateClass };

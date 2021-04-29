import React, { useCallback, useState } from 'react';

import { ClassTimetableDTO, TTDTO } from '../../dto/IClassTimetableDTO';

import { CheckboxArea } from './styles';

interface ICheckboxProps {
  componentId: string;
  isChecked: boolean;
  dateInFocus: ClassTimetableDTO;
  studentInFocus: TTDTO;
  setPresence: (
    student: TTDTO,
    classDate: ClassTimetableDTO,
    nisChecked: boolean,
    componentId: string,
  ) => // studentInFocus: StudentsTimetableDTO,
  // dateInFocus: ClassTimetableDTO,
  Promise<any>;
}

const Checkbox: React.FC<ICheckboxProps> = ({
  componentId,
  isChecked,
  setPresence,
  dateInFocus,
  studentInFocus,
}) => {
  const [nisChecked, setIsChecked] = useState<boolean>(!!isChecked);

  const handleOnChangeStatus = useCallback(
    (student, classDate) => {
      setPresence(student, classDate, !nisChecked, componentId);
      setIsChecked(!nisChecked);
    },
    [setPresence, nisChecked, componentId],
  );

  return (
    <CheckboxArea htmlFor={`${componentId}-${studentInFocus.id}`}>
      <input
        id={`${componentId}-${studentInFocus.id}`}
        type="checkbox"
        onChange={() => handleOnChangeStatus(studentInFocus, dateInFocus)}
        checked={nisChecked}
      />
    </CheckboxArea>
  );
};

export { Checkbox };

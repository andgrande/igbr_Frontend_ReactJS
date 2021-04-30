import React, { useCallback, useState } from 'react';

import { ClassTimetableDTO, TTDTO } from '../../dto/IClassTimetableDTO';

import { Toggle } from './styles';

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
  ) => Promise<any>;
}

const ToggleButton: React.FC<ICheckboxProps> = ({
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
    <Toggle htmlFor={`${componentId}-${studentInFocus.id}`}>
      <input
        id={`${componentId}-${studentInFocus.id}`}
        type="checkbox"
        onChange={() => handleOnChangeStatus(studentInFocus, dateInFocus)}
        checked={nisChecked}
      />

      <span />
    </Toggle>
  );
};

export { ToggleButton };

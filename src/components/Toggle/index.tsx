import React, { useCallback, useState } from 'react';

import { ClassTimetableDTO } from '../../dto/IClassTimetableDTO';

import { Toggle } from './styles';

interface IToggleProps {
  componentId: string;
  dateInFocus: ClassTimetableDTO;
  isChecked: string;
  setPresence: (
    id: string,
    class_id: string,
    class_status: string,
    date: Date,
  ) => Promise<any>;
}

const ToggleRectangular: React.FC<IToggleProps> = ({
  isChecked,
  componentId,
  dateInFocus,
  setPresence,
}) => {
  const [nisChecked, setIsChecked] = useState<boolean>(() => {
    if (isChecked === 'given') {
      return true;
    }
    return false;
  });

  const handleOnChangeStatus = useCallback(
    class_event => {
      setPresence(
        class_event.id,
        class_event.class_id,
        class_event.class_status,
        class_event.date,
      );
      setIsChecked(!nisChecked);
    },
    [setPresence, nisChecked],
  );

  return (
    <Toggle htmlFor={componentId}>
      <input
        id={componentId}
        type="checkbox"
        onChange={() => handleOnChangeStatus(dateInFocus)}
        checked={nisChecked}
      />
      <span />
    </Toggle>
  );
};

export { ToggleRectangular };

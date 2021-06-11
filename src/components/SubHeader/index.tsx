import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { BsSearch } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';

import Input from '../Input';
import Button from '../Button';

import {
  PageSubHeader,
  SubHeaderTitle,
  Search,
  SearchTool,
  SearchButton,
  SearchFields,
} from './styles';

interface ISearchParamsDTO {
  searchVisible: boolean;
  openModal(): void;
  page: string;
  itemName: string;
}

const SubHeader: React.FC<ISearchParamsDTO> = ({
  searchVisible,
  openModal,
  page,
  itemName,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(
    searchVisible,
  );

  const handleSubmit = useCallback(async data => {
    try {
      formRef.current?.setErrors({});

      // const response = await api.post('/classes', {
      //   class_day: data.class_day,
      //   class_level: data.class_level,
      //   class_hour: data.class_hour,
      //   class_duration: data.class_duration,
      //   weeks_duration: data.weeks_duration,
      //   start_date: data.start_date,
      //   teacher_id: data.teacher_id,

      console.log(data);

      // });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <PageSubHeader>
      <Search>
        <SearchTool>
          <button type="button" onClick={() => openModal()}>
            <span>
              <GrAddCircle />
              Create {itemName}
            </span>
          </button>
          {isSearchVisible && (
            <SearchButton
              type="button"
              onClick={() => setIsFilterOn(!isFilterOn)}
            >
              <span>
                <BsSearch />
                Search {itemName}
              </span>
            </SearchButton>
          )}
        </SearchTool>
        {isFilterOn && (
          <SearchFields fieldsHidden={!isFilterOn}>
            <form>
              <span>
                Day
                <input name="day" placeholder="filter" />
              </span>

              <span>
                Hour
                <input name="hour" placeholder="filter" />
              </span>

              <span>
                Code
                <input name="code" placeholder="filter" />
              </span>

              <span>
                Level
                <input name="level" placeholder="filter" />
              </span>

              <span>
                Teacher
                <input name="teacher" placeholder="filter" />
              </span>

              <button type="submit">Search</button>
            </form>
          </SearchFields>
        )}
      </Search>

      <SubHeaderTitle>{page}</SubHeaderTitle>
    </PageSubHeader>
  );
};

export { SubHeader };

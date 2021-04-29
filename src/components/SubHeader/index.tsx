import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';

import {
  PageSubHeader,
  SubHeaderTitle,
  Search,
  SearchTool,
  SearchFields,
} from './styles';

const SubHeader: React.FC = () => {
  const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
  return (
    <PageSubHeader>
      <Search>
        <SearchTool>
          <button type="button" onClick={() => console.log()}>
            <span>
              <GrAddCircle />
              Create Class
            </span>
          </button>
          <button type="button" onClick={() => setIsFilterOn(!isFilterOn)}>
            <span>
              <BsSearch />
              Search Class
            </span>
          </button>
        </SearchTool>
        {isFilterOn && (
          <SearchFields hidden={!isFilterOn}>
            <span>
              Day
              <input placeholder="filter" />
            </span>

            <span>
              Hour
              <input placeholder="filter" />
            </span>

            <span>
              Code
              <input placeholder="filter" />
            </span>

            <span>
              Level
              <input placeholder="filter" />
            </span>

            <span>
              Teacher
              <input placeholder="filter" />
            </span>
          </SearchFields>
        )}
      </Search>

      <SubHeaderTitle>Classes</SubHeaderTitle>
    </PageSubHeader>
  );
};

export { SubHeader };

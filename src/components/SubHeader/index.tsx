import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';

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
}

const SubHeader: React.FC<ISearchParamsDTO> = ({
  searchVisible,
  openModal,
}) => {
  const [isFilterOn, setIsFilterOn] = useState<boolean>(false);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(
    searchVisible,
  );
  return (
    <PageSubHeader>
      <Search>
        <SearchTool>
          <button type="button" onClick={() => openModal()}>
            <span>
              <GrAddCircle />
              Create Class
            </span>
          </button>
          {isSearchVisible && (
            <SearchButton
              type="button"
              onClick={() => setIsFilterOn(!isFilterOn)}
            >
              <span>
                <BsSearch />
                Search Class
              </span>
            </SearchButton>
          )}
        </SearchTool>
        {isFilterOn && (
          <SearchFields fieldsHidden={!isFilterOn}>
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

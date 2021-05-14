import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertTriangle } from 'react-icons/fi';

import { Container, Error, SelectField } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: React.CSSProperties;
  options: [{ name: string; label: string }] | undefined;
  icon?: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  options,
  icon: Icon,
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);

    selectRef.current?.focus();
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      hasError={!!error}
      onClick={handleInputFocus}
      onBlur={handleInputBlur}
      isFocused={isFocused}
      isFilled={isFilled}
      // data-testid="input-container"
    >
      {Icon && <Icon size={20} />}
      <SelectField defaultValue={defaultValue} ref={selectRef}>
        {options &&
          options.map(item => (
            <option key={item.name} value={item.name}>
              {item.label}
            </option>
          ))}
      </SelectField>
      {error && (
        <Error title={error}>
          <FiAlertTriangle color="c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;

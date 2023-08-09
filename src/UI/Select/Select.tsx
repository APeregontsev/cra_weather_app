import style from "./style.module.scss";
import { FC, useEffect, useState } from "react";
import classNames from "classnames";

export type SelectOptionType = {
  label: string;
  value: number;
};

type SelectProps = {
  options: SelectOptionType[];
  multiple?: false;
  value: SelectOptionType | undefined;
  onChange: (value: SelectOptionType) => void;
};

// main function

const Select: FC<SelectProps> = ({ value, onChange, options }) => {
  // states
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // inner functions

  function selectOption(option: SelectOptionType) {
    if (option !== value) onChange(option);
  }

  function isOptionSelected(option: SelectOptionType) {
    return option === value;
  }

  // lets reset highlighted item to first

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div
      tabIndex={0}
      className={classNames(style.container, {
        [style.empty]: value?.value === 0,
      })}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
    >
      <span className={style.value}>{value?.label}</span>

      <div className={style.caret}></div>

      <ul
        className={classNames(style.options, {
          [style.show]: isOpen,
        })}
      >
        {options.map((option, index) => (
          <li
            key={option.label + index}
            // styles
            className={classNames(style.option, {
              [style.selected]: isOptionSelected(option),
              [style.highlighted]: index === highlightedIndex,
            })}
            // styles
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;

import React from "react";
import InputMask from "react-input-mask";

const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

const MaskedInput = ({ value, onChange }) => {
  function handleChange(e) {
    onChange({
      ...e,
      target: {
        ...e.target,
        value: onlyNumbers(e.target.value),
      },
    });
  }
  return (
    <InputMask mask="999.999.999-99" value={value} onChange={handleChange} />
  );
};

export default MaskedInput;

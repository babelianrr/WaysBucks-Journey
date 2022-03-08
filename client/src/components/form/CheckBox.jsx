import { createElement, useState, useEffect } from "react";

export default function CheckBox(props) {
  const { value, handleChangeToppingId, toppingId } = props;

  const [isChecked, setIsChecked] = useState();

  const getIsChecked = () => {
    if (toppingId?.length !== 0) {
      toppingId?.every((item) => {
        if (item == value) {
          setIsChecked(true);
          return false;
        } else {
          setIsChecked(false);
          return true;
        }
      });
    } else {
      setIsChecked(false);
    }
  };

  useEffect(() => {
    getIsChecked();
  }, [toppingId]);

  return createElement("input", {
    type: "radio",
    checked: isChecked,
    value: value,
    onClick: handleChangeToppingId,
  });
}

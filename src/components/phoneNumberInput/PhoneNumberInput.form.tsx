import React from "react";
import styles from "@/styles/Form.module.scss";
import { FaTimes } from "react-icons/fa";

interface PhoneNumberInputProps {
  label?: string;
  id: string;
  name?: string;
  value?: string;
  // needs a change handler to send the event to the parent component
  onTextChange: (e: string) => void;
}

const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const formatPhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const inputValue = input.value.replace(/\D/g, ""); // Remove non-numeric characters

    let formattedNumber = "";
    if (inputValue.length > 0) {
      formattedNumber = `(${inputValue.substring(0, 3)})`;
      if (inputValue.length > 3) {
        formattedNumber += `-${inputValue.substring(3, 6)}`;
      }
      if (inputValue.length > 6) {
        formattedNumber += `-${inputValue.substring(6, 10)}`;
      }
    }

    // send the event to the parent component
    props.onTextChange(formattedNumber as any);
  };

  return (
    <div className={styles.form__inputGroup}>
      {/* <label htmlFor="phone" className={styles.form__label}>
        Phone Number:
      </label> */}
      <div className="" style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <input
          type="text"
          name={props.name}
          id={props.id}
          value={props.value}
          onChange={formatPhoneNumber}
          className={styles.form__input}

          // add on an icon to the input that clears the input when clicked
        />
        <div className={styles.form__clearInput} onClick={() => props.onTextChange("")}>
          <FaTimes />
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberInput;

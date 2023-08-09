import style from "./style.module.scss";
import { FC } from "react";
import classNames from "classnames";

type ButtonProps = {
  children?: string;
  type: "login" | "slider" | "close" | "cancel" | "save";
  disabled?: boolean;
  action: () => void;
};

const Button: FC<ButtonProps> = ({ children, type, disabled, action }) => {
  const buttonStyle = classNames(
    style.button,
    { [style.login]: type === "login" },
    { [style.slider]: type === "slider" },
    { [style.close]: type === "close" },
    { [style.cancel]: type === "cancel" },
    { [style.save]: type === "save" }
  );

  return (
    <button className={buttonStyle} onClick={action} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;

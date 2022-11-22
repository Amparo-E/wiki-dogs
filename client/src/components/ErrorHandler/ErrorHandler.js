import React from "react";
import style from "./ErrorHandler.module.css";

import { useSelector, useDispatch } from "react-redux";
import { setErrorMessage } from "../../redux/actions";

const ErrorHandler = ({ children }) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.error);

  if (!errorMessage || errorMessage === "") {
    return <>{children}</>;
  }

  const handleCloseClick = (e) => {
    e.preventDefault();
    dispatch(setErrorMessage(''));
  };

  return (
    <>
      <div className={style.container} onClick={handleCloseClick}>
        <div className={style.modal}>
          <h1>{errorMessage}</h1>
          <button
            type="button"
            onClick={handleCloseClick}
            className={style.button}
          >
            Close
          </button>
        </div>
      </div>
      {children}
    </>
  );
};

export default ErrorHandler;

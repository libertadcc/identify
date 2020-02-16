import React from 'react';
import './header.scss';

export function Modal ({ handleClose, show, children }) {
  console.log(show)
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={`${show} ? modal display-block : modal display-none`}>
      <section className="modal-main">
        {children}

        
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};
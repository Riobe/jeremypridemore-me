import React, { Fragment } from 'react';

import './Modal.css';

export default function Modal({ Header, title, Body, body, Footer, children, ...props}) {
  const ModalBody = Body || (body && <p>{body}</p>) || children;

  return (
    <div className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true" {...props}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">

          <div className="modal-header">
            {Header || (
              <Fragment>
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </Fragment>
            )}
          </div>

          <div className="modal-body">
            {ModalBody}
          </div>

          <div className="modal-footer">
            {Footer || (
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

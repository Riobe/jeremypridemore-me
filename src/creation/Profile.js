import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="container">

      <div className="row">
        <div className="col text-center">
          <h1 className="display-1">Profile</h1>
        </div>
      </div>

      <div className="row justify-content-center align-items-center">
        <div className="col-3 text-right">
          You have no characters!
        </div>
        <div className="col-2">
          <Link className="btn btn-primary" role="button" to={'/creation/new'}>New</Link>
        </div>
      </div>

    </div>
  );
};

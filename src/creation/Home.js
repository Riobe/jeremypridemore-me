import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container-fluid">

      <div className="row">
        <div className="col text-center">
          <h1 className="display-1">Creation</h1>
        </div>
      </div>

      <div className="row justify-content-center">
        <Link className="btn btn-primary" id="creation-get-started" role="button" to="/creation/me">Get Started</Link>
      </div>

      <div className="row bg-dark text-light mt-3">
        <div className="col">
          <h1>What is Creation?</h1>
          <p className="lead pl-5">
            Creation is a character creator and manager for the Exalted 3rd edition tabletop roleplaying game.
          </p>
        </div>
      </div>

      <div className="row bg-dark text-light">
        <div className="col">
          <h1>Will Creation support any other editions/games?</h1>
          <p className="lead pl-5">
            Probably never happening, as this site isn't being developed with extensibility of system in mind.
          </p>
        </div>
      </div>

    </div>
  );
};

import React from 'react';

export default function AboutTile() {
  return (
    <div className="card">
      <div className="card-header bg-dark text-light p-2">
        About Me
      </div>
      <div className="card-body p-2">
        <p>Hello! My name is Jeremy Pridemore and welcome to my site! I'm a father, programmer, gamer, and general nerd. I have fun learning, playing with tech, and always pushing myself.</p>
        <p>This site is meant both as an introduction to myself and as a landing page to my other projects. For instance I'm currently working on "Creation", a character creator/manager for the tabletop roleplaying game Exalted 3rd edition.</p>
        <p>Feel free to poke around, make an account, or go look at the code (link in the nav bar). Have fun!</p>
      </div>
    </div>
  );
}

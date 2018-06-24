import React from 'react';
import ReactDOM from 'react-dom';
import './variables.css';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const toastrOptions = window.toastr.options;
toastrOptions.preventDuplicates = true;
toastrOptions.positionClass = 'toast-top-center';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

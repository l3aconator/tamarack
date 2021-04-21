import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import './App.css';

import MapChart from './components/MapChart';

function App() {
  const [content, setContent] = useState('');

  return (
    <div>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <MapChart setTooltipContent={setContent} />
      </div>
      <ReactTooltip
        clickable={true}
        html={true}
        backgroundColor="#0D374F"
        className="map--tip"
      >
        {content}
      </ReactTooltip>
    </div>
  );
}

export default App;

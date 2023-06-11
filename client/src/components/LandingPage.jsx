import React from 'react'
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <Link to={"/characters"} >
        <button>INGRESAR</button>
      </Link>
    </div>
  );
}

export default LandingPage;
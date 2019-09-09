import React from 'react'

function Xmark(props) {
  return (
    <svg 
        height="30.0000000"
        width="30.0000000"
        transform="scale(0.75) translate(0,12.5)"
        xmlns="http://www.w3.org/2000/svg">
      <path
          d="M 5.0,5.0 L 25.0,25.0 M 25.0,5.0 L 5.0,25.0"
          style={{
            fill: "none",
            stroke: "#ff0000",
            "strokeWidth": 5.0000000,
            "strokeLinecap": "round",
            "strokeLinejoin": "round",
            "strokeDasharray": "none"
          }}
      />
    </svg>
  );
}

export default Xmark;

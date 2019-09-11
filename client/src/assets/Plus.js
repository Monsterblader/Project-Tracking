import React from 'react';

function Plus(props) {
  return (
    <svg onClick={ props.activatePlus }
        height="30.0000000"
        width="30.0000000"
        transform="scale(0.75) translate(0,12.5)"
        xmlns="http://www.w3.org/2000/svg">
      <path
          d="M 15.0,5.0 L 15.0,25.0 M 5.0,15.0 L 25.0,15.0"
          style={{
            fill: "none",
            stroke: "#555",
            "strokeWidth": 5.0000000,
            "strokeLinecap": "round",
            "strokeLinejoin": "round",
            "strokeDasharray": "none"
          }}
      />
    </svg>
  );
}

export default Plus;

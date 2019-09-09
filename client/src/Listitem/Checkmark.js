import React from 'react';

function Checkmark(props) {
  return (
    <svg onClick={ props.activateCheckmark }
        height="30.0000000"
        width="30.0000000"
        transform="scale(0.75) translate(0,12.5)"
        xmlns="http://www.w3.org/2000/svg">
      <path
          d="M 5.0,18.33 L 11.66,25.0 L 25.0,8.33"
          style={{
            fill: "none",
            stroke: "#008000",
            "strokeWidth": 5.0000000,
            "strokeLinecap": "round",
            "strokeLinejoin": "round",
            "strokeDasharray": "none"
          }}
      />
    </svg>
  );
}

export default Checkmark;

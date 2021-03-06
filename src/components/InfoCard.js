import React from 'react';

import Col from 'react-bootstrap/Col';

const InfoCard = props => {
  const renderItems = data => {
    if (data != null) {
      let stuff = [];
      for (let i = 0; i < data.length; i++) {
        stuff.push(
          <div key={i} className="dynamic-div">
            {data[i][0]} - {data[i][1]}
            <hr />
          </div>
        );
      }

      return stuff;
    }
  };

  return (
    <Col className="info-card">
      <div className="card text-center box-shadow">
        <div className="card-title">
          <h3>{props.title}</h3>
        </div>
        <div className="card-body justify-content-md-center">
          {renderItems(props.data)}
        </div>
      </div>
    </Col>
  );
};

export default InfoCard;

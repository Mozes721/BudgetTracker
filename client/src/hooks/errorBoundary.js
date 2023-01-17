import React, { useEffect, useState, useRef } from 'react';
import Alert from 'react-bootstrap/Alert';


export default function ErrorDanger () {
    return (
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Please check again either as something went wrong!
        </p>
      </Alert>
    );

}

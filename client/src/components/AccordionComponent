import axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";

function AccordionComponent(props) {
  const [pdfFile, setPdfFile] = useState(null);
  const { title } = useParams();
  // Fetch pdf data from the server
  useEffect(() => {
    console.log(title);
    axios
      .get(
        `http://localhost:5000/courses/${title}/classwork/pdf`,
        { withCredentials: true, responseType: "blob" } // Set the response type to 'blob'
      )
      .then((res) => {
        console.log(res.data);
        // Create a URL object from the blob
        const url = URL.createObjectURL(res.data);

        // Set the PDF data state
        setPdfFile(url);
      })
      .catch((err) => console.log(err));
  }, [title]);

  return (
    <Accordion>
      <Accordion.Item eventKey="0" className="classwork-accordion">
        <Accordion.Header>
          <strong>{props.title}</strong>
        </Accordion.Header>
        {props.content && <Accordion.Body>{props.content}</Accordion.Body>}
        <Accordion.Body>
          {pdfFile && (
            <a href={pdfFile} target="_blank" rel="noreferrer noopener">
              {props.title}
            </a>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionComponent;

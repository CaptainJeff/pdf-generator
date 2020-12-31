import React, { useState } from "react";
import "./App.css";
import { Input, Button } from "@material-ui/core";
import blankPdf from "./assets/carton.pdf";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fileDownload from "js-file-download";
import PDFViewer from "pdf-viewer-reactjs";
import { encode } from "uint8-to-base64";

function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");
  const [input7, setInput7] = useState("");
  const [pdf, setPdf] = useState(null);
  const [pdfBase, setPdfBase] = useState();
  const [isReview, setIsReview] = useState(false);

  async function modifyPdf() {
    const existingPdfBytes = await fetch(blankPdf).then((res) =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    firstPage.drawText(input1, {
      x: 90,
      y: 377.5,
      size: 17,
      font: helveticaFont,
      color: rgb(0, 0, 1),
    });

    firstPage.drawText(input2, {
      x: 56,
      y: 355,
      size: 17,
      font: helveticaFont,
      color: rgb(0, 0, 1),
    });

    firstPage.drawText(input3, {
      x: 56,
      y: 320,
      size: 17,
      font: helveticaFont,
      maxWidth: 500,
      color: rgb(0, 0, 1),
    });

    firstPage.drawText(input4, {
      x: 153,
      y: 247,
      size: 17,
      font: helveticaFont,
      color: rgb(0, 0, 1),
    });

    firstPage.drawText(input5, {
      x: 56,
      y: 220,
      size: 17,
      font: helveticaFont,
      maxWidth: 500,
      color: rgb(0, 0, 1),
    });

    firstPage.drawText(input6, {
      x: 102,
      y: 158,
      size: 17,
      font: helveticaFont,
      color: rgb(0, 0, 1),
    });

    firstPage.drawText(input6, {
      x: 243,
      y: 113,
      size: 17,
      font: helveticaFont,
      color: rgb(0, 0, 1),
    });

    const pdfBytes = await pdfDoc.save();
    const utf8Binary = new Uint8Array(pdfBytes);
    const encoded = encode(utf8Binary);
    setPdfBase(encoded);
    setPdf(pdfBytes);
    setIsReview(true);
  }

  return (
    <React.Fragment>
      {!isReview ? (
        <div className="App">
          <div className="inputsContainer">
            <Input
              autoFocus
              placeholder="Input1"
              value={input1}
              className="InputTop"
              onChange={(e) => setInput1(e.target.value)}
            />
            <Input
              placeholder="Input2"
              value={input2}
              className="Input"
              onChange={(e) => setInput2(e.target.value)}
            />
          </div>
          <div className="inputsContainer">
            <Input
              autoFocus
              placeholder="Input3"
              value={input3}
              className="InputTop"
              onChange={(e) => setInput3(e.target.value)}
            />
            <Input
              placeholder="Input4"
              value={input4}
              className="Input"
              onChange={(e) => setInput4(e.target.value)}
            />
          </div>
          <div className="inputsContainer">
            <Input
              autoFocus
              placeholder="Input5"
              value={input5}
              className="InputTop"
              onChange={(e) => setInput5(e.target.value)}
            />
            <Input
              placeholder="Input6"
              value={input6}
              className="Input"
              onChange={(e) => setInput6(e.target.value)}
            />
          </div>
          <div className="inputsContainer">
            <Input
              autoFocus
              placeholder="Input7"
              value={input7}
              className="Inputone"
              onChange={(e) => setInput7(e.target.value)}
            />
          </div>

          <Button
            className="FormContainer_btn"
            primary
            variant="contained"
            onClick={modifyPdf}
          >
            Preview the Pdf
          </Button>
        </div>
      ) : (
        <React.Fragment>
          <div className="inputsWrapper">
            <Button
              className="editbtn"
              primary
              variant="contained"
              onClick={() => setIsReview(false)}
            >
              Edit
            </Button>
            <Button
              className="FormContainer_btn"
              primary
              variant="contained"
              onClick={() => fileDownload(pdf, "carton.pdf")}
            >
              Download the Pdf
            </Button>
          </div>
          <PDFViewer
            className="PDF"
            hideNavbar={true}
            document={{
              base64: pdfBase,
            }}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default App;

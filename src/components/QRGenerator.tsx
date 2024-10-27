// src/components/QRGenerator.tsx
import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { PDFDocument } from 'pdf-lib';
import { QRCodeCanvas } from 'qrcode.react';

const QRGenerator: React.FC = () => {
    const [text, setText] = useState('');
    const qrRef = useRef<HTMLDivElement | null>(null);

    const downloadPDF = async () => {
        if (!text) {
            alert("Please enter text before downloading.");
            return;
        }

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();

        const qrCanvas = qrRef.current?.querySelector('canvas') as HTMLCanvasElement;
        const qrImageData = qrCanvas?.toDataURL('image/png');

        if (qrImageData) {
            const qrImage = await pdfDoc.embedPng(qrImageData);
            const qrImageDims = qrImage.scale(0.5); // Scale as needed
            page.drawImage(qrImage, {
                x: 50,
                y: page.getHeight() - qrImageDims.height - 50,
                width: qrImageDims.width,
                height: qrImageDims.height,
            });
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qrcode.pdf';
        a.click();
        URL.revokeObjectURL(url);

        alert("PDF is being downloaded.");
    };

    const downloadWord = () => {
        if (!text) {
            alert("Please enter text before downloading.");
            return;
        }

        const blob = new Blob([`<html><body><h1>${text}</h1><img src="${qrRef.current?.querySelector('canvas')?.toDataURL('image/png')}" /></body></html>`], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qrcode_info.doc';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert("Word document is being downloaded.");
    };

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL"
            />
            <div ref={qrRef} style={{ marginBottom: '20px' }}>
                <QRCodeCanvas value={text} />
            </div>
            <div style={{ marginTop: '20px' }}>
                <button onClick={downloadPDF} style={{ marginRight: '10px' }}>Download PDF</button>
                <button onClick={downloadWord}>Download Word</button>
            </div>
        </div>
    );
};

export default QRGenerator;





/* // src/components/QRGenerator.tsx
import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { PDFDocument, rgb } from 'pdf-lib';

const QRGenerator: React.FC = () => {
    const [text, setText] = useState('');

    const downloadPDF = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();

        const qrCanvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
        const qrImageData = qrCanvas?.toDataURL('image/png');

        if (qrImageData) {
            const qrImage = await pdfDoc.embedPng(qrImageData);
            const qrImageDims = qrImage.scale(0.5); // Scale as needed
            page.drawImage(qrImage, {
                x: 50,
                y: page.getHeight() - qrImageDims.height - 50,
                width: qrImageDims.width,
                height: qrImageDims.height,
            });
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qr-code.pdf';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <h2>QR Code Generator</h2>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL"
            />
            <QRCodeCanvas id="qr-canvas" value={text} />
            <button onClick={downloadPDF}>Download PDF</button>
        </div>
    );
};

export default QRGenerator; */





// // src/components/QRGenerator.tsx
// import React, { useState } from 'react';
// import { QRCodeCanvas } from 'qrcode.react';

// const QRGenerator: React.FC = () => {
//     const [text, setText] = useState('');

//     return (
//         <div>
//             <h2>QR Code Generator</h2>
//             <input
//                 type="text"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Enter text or URL"
//             />
//             <QRCodeCanvas value={text} />
//         </div>
//     );
// };

// export default QRGenerator;




// src/components/QRGenerator.tsx
// import React, { useState } from 'react';
// import { QRCodeSVG } from 'qrcode.react';

// const QRGenerator: React.FC = () => {
//     const [text, setText] = useState('');

//     return (
//         <div>
//             <h2>QR Code Generator</h2>
//             <input
//                 type="text"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="Enter text or URL"
//             />
//             <QRCodeSVG value={text} />
//         </div>
//     );
// };

// export default QRGenerator;

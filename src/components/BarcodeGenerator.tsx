import React, { useState, useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import { PDFDocument } from 'pdf-lib';

const BarcodeGenerator: React.FC = () => {
    const [code, setCode] = useState('');
    const barcodeRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        // Generate barcode whenever the code changes
        if (barcodeRef.current && code) {
            JsBarcode(barcodeRef.current, code, { format: "CODE128" });
        }
    }, [code]);

    const downloadPDF = async () => {
        if (!code) {
            alert("Please enter a code before downloading.");
            return;
        }

        // Wait for the barcode to render
        window.requestAnimationFrame(async () => {
            if (!barcodeRef.current) {
                alert("Failed to generate barcode. Canvas element not found.");
                return;
            }

            try {
                const pdfDoc = await PDFDocument.create();
                const page = pdfDoc.addPage([600, 400]);

                // Convert the canvas to a PNG data URL
                const barcodeImageData = barcodeRef.current.toDataURL('image/png');
                const barcodeImage = await pdfDoc.embedPng(barcodeImageData);
                const barcodeImageDims = barcodeImage.scale(1); // Adjust scaling if needed

                // Draw the barcode image onto the PDF page
                page.drawImage(barcodeImage, {
                    x: 50,
                    y: page.getHeight() - barcodeImageDims.height - 50,
                    width: barcodeImageDims.width,
                    height: barcodeImageDims.height,
                });

                // Draw the code text below the barcode
                page.drawText(`Code: ${code}`, {
                    x: 50,
                    y: page.getHeight() - barcodeImageDims.height - 70,
                    size: 12,
                });

                // Save the PDF document and trigger the download
                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'barcode.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                alert("PDF is being downloaded.");
            } catch (error) {
                console.error("Error generating PDF:", error);
                alert("Failed to generate PDF. Check console for details.");
            }
        });
    };

    const downloadWord = () => {
        if (!code) {
            alert("Please enter a code before downloading.");
            return;
        }

        if (!barcodeRef.current) {
            alert("Failed to generate barcode. Canvas element not found.");
            return;
        }

        const barcodeImageData = barcodeRef.current.toDataURL('image/png');

        if (barcodeImageData) {
            const blob = new Blob(
                [`<html><body><h1>${code}</h1><img src="${barcodeImageData}" /></body></html>`],
                { type: 'application/msword' }
            );
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'barcode_info.doc';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            alert("Word document is being downloaded.");
        } else {
            alert("Failed to generate barcode for Word document. Please try again.");
        }
    };

    return (
        <div>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code"
            />
            {/* Use a canvas element for JsBarcode */}
            <canvas ref={barcodeRef}></canvas>
            <div style={{ marginTop: '20px' }}>
                <button onClick={downloadPDF} style={{ marginRight: '10px' }}>
                    Download PDF
                </button>
                <button onClick={downloadWord}>
                    Download Word
                </button>
            </div>
        </div>
    );
};

export default BarcodeGenerator;





// import React, { useState } from 'react';
// import Barcode from 'react-barcode';

// const BarcodeGenerator: React.FC = () => {
//     const [code, setCode] = useState('');

//     return (
//         <div>
//             <h2>Barcode Generator</h2>
//             <input
//                 type="text"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 placeholder="Enter code"
//             />
//             <Barcode value={code} />
//         </div>
//     );
// };

// export default BarcodeGenerator;



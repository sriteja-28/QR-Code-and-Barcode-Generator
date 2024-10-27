// src/components/QRGenerator.tsx
import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRGenerator: React.FC = () => {
    const [text, setText] = useState('');

    return (
        <div>
            <h2>QR Code Generator</h2>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL"
            />
            <QRCodeCanvas value={text} />
        </div>
    );
};

export default QRGenerator;




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

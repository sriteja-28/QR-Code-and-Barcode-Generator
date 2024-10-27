
import React, { useState } from 'react';
import Barcode from 'react-barcode';

const BarcodeGenerator: React.FC = () => {
    const [code, setCode] = useState('');

    return (
        <div>
            <h2>Barcode Generator</h2>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code"
            />
            <Barcode value={code} />
        </div>
    );
};

export default BarcodeGenerator;

// src/App.tsx
import React from 'react';
import QRGenerator from './components/QRGenerator';
import BarcodeGenerator from './components/BarcodeGenerator';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="container">
            <h1>QR Code and Barcode Generator</h1>
            <div className="generator-section">
                <QRGenerator />
            </div>
            <div className="generator-section">
                <BarcodeGenerator />
            </div>
        </div>
    );
};

export default App;

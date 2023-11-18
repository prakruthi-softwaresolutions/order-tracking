import React, { useState } from 'react';
import QRCode from 'react-qr-code';

function Generation() {

  const [restaurantName, setRestaurantName] = useState('');
  const [tableName, setTableName] = useState('');


  const [qrCodeDimensions, setQRCodeDimensions] = useState(150);


  const [qrCodeValue, setQRCodeValue] = useState('');

  const generateQRCode = () => {

    const qrValue = `Restaurant: ${restaurantName}, Table: ${tableName}`;
    setQRCodeValue(qrValue);
  };

  const downloadQRCode = () => {

    const link = document.createElement('a');
    link.href = `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${qrCodeDimensions}" height="${qrCodeDimensions}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <img src="data:image/svg+xml;base64,${btoa(qrCodeValue)}" alt="QR Code" />
          </div>
        </foreignObject>
      </svg>`
    )}`;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>

      <label htmlFor="restaurantName">Restaurant Name:</label>
      <input
        type="text"
        id="restaurantName"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
      />

      <label htmlFor="tableName">Table Name:</label>
      <input type="text" id="tableName" value={tableName} onChange={(e) => setTableName(e.target.value)} />

      <button onClick={generateQRCode}>Generate QR Code</button>

      {qrCodeValue && <QRCode value={qrCodeValue} size={qrCodeDimensions} />}

      <label htmlFor="qrCodeDimensions">QR Code Dimensions:</label>
      <input
        type="number"
        id="qrCodeDimensions"
        value={qrCodeDimensions}
        onChange={(e) => setQRCodeDimensions(e.target.value)}
      />

      {qrCodeValue && <button onClick={downloadQRCode}>Download QR Code</button>}
    </div>
  );
}

export default Generation;

import { useState } from 'react';
import './App.css';

const App = () => {

  const [img, setImg] = useState('');

  const [loading, setLoading] = useState(false);

  const [inputErr, setInputErr] = useState(false);

  const [data, setData] = useState('');

  const [size, setSize] = useState('150');


  const generateQR = async () => {
    if (data === '') {
      setInputErr(true);
    } else {
      setInputErr(false);
      setLoading(true);

      try {
        const url = `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=${size}x${size}`;
        setImg(url);
      } catch (error) {
        console.error("Error generating QR Code", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const downloadQR = () => {
    fetch(img).then((res) => res.blob()).then((blob) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'QRCode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <section className='w-full h-screen flex flex-col justify-center items-center gap-5'>
      {/* title */}
      <h1 className='text-2xl font-bold mb-5'>QR Code Generator</h1>

      {/* QR code image */}
      {img && <img src={img} className='border-2 border-gray-300 rounded-2xl p-3' />}

      {/* loading state */}
      {loading && <p>Please wait...</p>}

      <div className='space-y-8'>
        {/* QR Code Input */}
        <div>
          <label htmlFor='dataInput' className='text-blue-800 text-bold'>Enter your QR code text:</label>
          <input type='text' placeholder='Enter your text' id='dataInput'
            className='block w-full border-2 border-blue-700 outline-none rounded p-2 mt-3'
            value={data} onChange={(e) => setData(e.target.value)} />
          {inputErr && <p className='text-red-600 text-xs mt-3 font-semibold'>* Please enter valid value</p>}
        </div>

        {/* QR code size input */}
        <div>
          <label htmlFor='sizeInput' className='text-blue-800 text-bold'>Enter your size of QR Code (eg: 150):</label>
          <input type='text' placeholder='Enter your size' id='sizeInput'
            className='block w-full border-2 border-blue-700 outline-none rounded p-2 mt-3'
            value={size} onChange={(e) => setSize(e.target.value)} />
        </div>

        {/* button to actions */}
        <div className='space-x-5'>
          <button className='p-2 rounded cursor-pointer text-semibold text-white bg-green-600 hover:bg-green-700 transition-colors'
            disabled={loading} onClick={generateQR}>Generate QR Code</button>
          <button className='p-2 rounded cursor-pointer text-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors'
            onClick={downloadQR}>Download QR Code</button>
        </div>
      </div>

      <p className='text-sm text-gray-500 mt-5 text-semibold'>Mentored by <a className='text-blue-800' href='https://youtu.be/KqrWo525VUU?si=U9zQjh4RSIu04ADO'>Tutor Joes</a></p>
    </section>
  );
};

export default App;
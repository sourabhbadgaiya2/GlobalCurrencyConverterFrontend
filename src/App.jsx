import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const currencyCodes = ["USD", "INR", "EUR", "GBP", "GHS", "JPY"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://globalcurrencyconverterbackend.onrender.com/api/convert",
        formData
      );
      setResult(response.data);
      setError("");
      console.log(response);
    } catch (error) {
      setError(
        "Error",
        error?.response ? error?.response?.data : error?.message
      );
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center bg-gray-100'>
      {/* Header Section */}
      <section className='bg-blue-600 w-full text-center py-8'>
        <h1 className='text-white text-3xl font-bold'>
          Global Currency Converter
        </h1>
        <p className='text-white mt-2'>
          Your go-to solution for real-time currency conversions worldwide.
        </p>
      </section>

      {/* Converter Form Section */}
      <section className='bg-white shadow-lg rounded-lg p-8 mt-8 w-11/12 md:w-1/2'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {/* From Currency */}
          <select
            name='from'
            value={formData.from}
            onChange={handleChange}
            className='border rounded-lg p-2'
          >
            <option value=''>Select From Currency</option>
            {currencyCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>

          {/* To Currency */}
          <select
            name='to'
            value={formData.to}
            onChange={handleChange}
            className='border rounded-lg p-2'
          >
            <option value=''>Select To Currency</option>
            {currencyCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>

          {/* Amount */}
          <input
            type='number'
            name='amount'
            value={formData.amount}
            onChange={handleChange}
            placeholder='Amount'
            className='border rounded-lg p-2'
          />

          {/* Submit Button */}
          <button
            type='submit'
            className='bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700'
          >
            Convert
          </button>
        </form>

        {/* Result Section */}
        {result && (
          <div className='mt-4 text-center'>
            <p className='text-lg font-semibold'>
              Converted Amount: {result.convertedAmount} {result.target}
            </p>
            <p className='text-sm text-gray-600'>
              Conversion Rate: {result.conversionRate}
            </p>
          </div>
        )}

        {/* Error Section */}
        {error && (
          <p className='text-red-500 mt-4 text-center'>Error: {error}</p>
        )}
      </section>

      {/* Footer Section */}
      <section className='mt-8 text-center'>
        <h2 className='text-xl font-bold'>
          Why Choose Global Currency Converter?
        </h2>
        <ul className='mt-4 space-y-2 text-gray-600'>
          <li>
            🔹 <strong>Real-Time Conversion:</strong> Get the latest and most
            accurate currency exchange rates instantly.
          </li>
          <li>
            🔹 <strong>Supports Multiple Currencies:</strong> Easily convert
            between popular currencies like USD, EUR, INR, and more.
          </li>
          <li>
            🔹 <strong>User-Friendly Interface:</strong> Simplified design for
            quick and hassle-free conversions.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default App;

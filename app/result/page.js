'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const [predictedNumber, setPredictedNumber] = useState(null);
  const [customerId, setCustomerId] = useState('');
  const router = useRouter();

  useEffect(() => {
    const number = sessionStorage.getItem('predictedNumber');
    const id = sessionStorage.getItem('customerId');

    if (!number) {
      router.push('/'); // Redirect to login if no data
      return;
    }

    setPredictedNumber(number);
    setCustomerId(id);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/');
  };

  if (!predictedNumber) return null;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome, {customerId}
        </h1>
        <p className="text-gray-500 mb-6">Your personalized score</p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-6">
          <p className="text-6xl font-bold text-blue-600">
            {parseFloat(predictedNumber).toFixed(2)}
          </p>
          <p className="text-gray-500 mt-2 text-sm">Predicted by our ML Model</p>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-500 underline"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
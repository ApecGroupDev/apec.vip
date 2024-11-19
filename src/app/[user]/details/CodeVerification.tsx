import { useState, useEffect } from 'react';

interface CodeVerificationProps {
  specialCode: string;
  userData: { name: string; email: string; age: number; special_code: string }; // Add userData type
}

const CodeVerification: React.FC<CodeVerificationProps> = ({ userData }) => {
  const [enteredCode, setEnteredCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verificationError, setVerificationError] = useState('');

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredCode(e.target.value);
  };

  const handleVerify = async () => {
    try {
      // First, try the special_code
      let response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify-special-code?user=${userData.name}&special_code=${enteredCode}`, {
        method: 'GET',
      });

      if (response.ok) {
        setIsVerified(true);
        setVerificationError('');
        return;
      }

      // If special_code doesn't match, check the master_code via the new API
      response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify-master-key?master_code=${enteredCode}`, {
        method: 'GET',
      });

      if (response.ok) {
        setIsVerified(true);
        setVerificationError('');
      } else {
        setVerificationError('Invalid code');
      }
    } catch (error: unknown) {
      console.error(error);
      setVerificationError('Error verifying code');
    }
  };


  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white px-8 py-16">
      {!isVerified ? (
        <div className="bg-white shadow-lg rounded-3xl p-12 max-w-lg w-full text-center border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-4xl font-extrabold text-blue-700 mb-6">
            VIP Access Verification
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Enter the special code to unlock your personalized details.
          </p>
          <input
            type="text"
            value={enteredCode}
            onChange={handleCodeChange}
            placeholder="Enter your special code"
            className="w-full bg-gray-100 border-2 border-gray-300 rounded-xl px-6 py-4 text-gray-800 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
          <button
            onClick={handleVerify}
            className="w-full bg-blue-600 text-white font-semibold py-4 rounded-xl shadow-xl hover:bg-blue-700 focus:outline-none transition-all duration-200 transform hover:scale-105"
          >
            Verify Code
          </button>
          {verificationError && (
            <p className="text-red-600 font-semibold mt-4">{verificationError}</p>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-3xl p-12 max-w-lg w-full text-center border border-gray-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-6">
            Welcome, {userData.name}
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Your access has been successfully verified. Below are your details:
          </p>
          <div className="bg-gray-100 rounded-xl p-8 text-left space-y-6 border border-gray-300">
            <p className="text-gray-800 text-lg">
              <strong className="text-blue-600">Username:</strong> {userData.name}
            </p>
            <p className="text-gray-800 text-lg">
              <strong className="text-blue-600">Email:</strong> {userData.email}
            </p>
            <p className="text-gray-800 text-lg">
              <strong className="text-blue-600">Age:</strong> {userData.age}
            </p>
            <p className="text-gray-800 text-lg">
              <strong className="text-blue-600">Special Code:</strong> {userData.special_code}
            </p>
          </div>
          <button
            onClick={() => alert('Thank you!')}
            className="mt-8 bg-red-600 text-white font-semibold py-4 px-8 rounded-xl shadow-xl hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeVerification;

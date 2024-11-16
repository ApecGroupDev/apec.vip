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
      let response = await fetch(`/api/verify-special-code?user=${userData.name}&special_code=${enteredCode}`, {
        method: 'GET',
      });

      if (response.ok) {
        setIsVerified(true);
        setVerificationError('');
        return;
      }

      // If special_code doesn't match, check the master_code via the new API
      response = await fetch(`/api/verify-master-key?master_code=${enteredCode}`, {
        method: 'GET',
      });

      if (response.ok) {
        setIsVerified(true);
        setVerificationError('');
      } else {
        setVerificationError('Invalid code');
      }
    } catch (error: unknown) { // Specify 'any' type for the error
      console.error(error); // Log the error
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
    <div>
      {!isVerified ? (
        <div>
          <h2>Enter Code to View Details</h2>
          <input
            type="text"
            value={enteredCode}
            onChange={handleCodeChange}
            placeholder="Enter special code"
          />
          <button onClick={handleVerify}>Verify Code</button>
          {verificationError && <p>{verificationError}</p>}
        </div>
      ) : (
        <div>
          <h1>User Details for {userData.name}</h1>
          <p><strong>Username:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Code:</strong> {userData.special_code}</p>
        </div>
      )}
    </div>
  );
};

export default CodeVerification;

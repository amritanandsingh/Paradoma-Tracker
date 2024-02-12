import React, { useState, useEffect } from 'react';

const EmailDataComponent = ({ email }) => {
  const [emailData, setEmailData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://paradoma-tracker-node.onrender.com/getcount?email=${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setEmailData(responseData.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {emailData && (
        <div>
          <h2>Data for {email}</h2>
          <ul>
            {emailData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmailDataComponent;

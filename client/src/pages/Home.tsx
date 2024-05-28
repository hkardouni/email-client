import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Home: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const [inboxData, setInboxData] = useState<any[]>([]);
  const [sentData, setSentData] = useState<any[]>([]);
  const [deletedData, setDeletedData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMailboxData = async () => {
      try {
        // Fetch inbox data
        const inboxResponse = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages?q=in:inbox', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const inboxJson = await inboxResponse.json();
        setInboxData(inboxJson.messages);

        // Fetch sent data
        const sentResponse = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages?q=in:sent', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const sentJson = await sentResponse.json();
        setSentData(sentJson.messages);

        // Fetch deleted data
        const deletedResponse = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages?q=in:trash', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const deletedJson = await deletedResponse.json();
        setDeletedData(deletedJson.messages);
      } catch (error) {
        console.error('Error fetching mailbox data:', error);
      }
    };

    fetchMailboxData();
  }, [token]);

  return (
    <div>
      <h1>Gmail Mailbox</h1>
      <h2>Inbox</h2>
      <ul>
        {inboxData.map((message) => (
          <li key={message.id}>{message.snippet}</li>
        ))}
      </ul>
      <h2>Sent Box</h2>
      <ul>
        {sentData.map((message) => (
          <li key={message.id}>{message.snippet}</li>
        ))}
      </ul>
      <h2>Deleted Items</h2>
      <ul>
        {deletedData.map((message) => (
          <li key={message.id}>{message.snippet}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

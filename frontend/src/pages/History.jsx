import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import HistoryCard from "../components/HistoryCard";

function History() {
  const db = getFirestore();
  const userId = localStorage.getItem("user");

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const colRef = collection(db, "users", userId, "extractions");
    const snap = await getDocs(colRef);

    let list = [];
    snap.forEach((doc) => list.push(doc.data()));

    setHistory(list);
  };

  return (
    <div style={styles.container}>
      <h2>Your Extraction History</h2>

      {history.map((item, i) => (
        <HistoryCard key={i} item={item} onOpen={() => {}} />
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: "90%",
    maxWidth: "700px",
    margin: "20px auto",
  },
};

export default History;

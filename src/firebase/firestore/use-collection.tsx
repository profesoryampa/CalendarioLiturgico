'use client';

import { useEffect, useState, useRef } from 'react';
import { onSnapshot, Query, DocumentData } from 'firebase/firestore';

export const useCollection = (query: Query<DocumentData> | null) => {
  const [data, setData] = useState<DocumentData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const queryRef = useRef(query);
  useEffect(() => {
    if (JSON.stringify(queryRef.current) !== JSON.stringify(query)) {
      queryRef.current = query;
    }
  }, [query]);

  useEffect(() => {
    if (!queryRef.current) {
        setLoading(false);
        setData([]);
        return;
    }
    
    setLoading(true);

    const unsubscribe = onSnapshot(
      queryRef.current,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(docs);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
        console.error("Error fetching collection: ", err);
      }
    );

    return () => unsubscribe();
  }, [queryRef.current]);

  return { data, loading, error };
};

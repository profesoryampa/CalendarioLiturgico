'use client';

import { useEffect, useState, useRef } from 'react';
import { onSnapshot, DocumentReference, DocumentData } from 'firebase/firestore';

export const useDoc = (docRef: DocumentReference<DocumentData> | null) => {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const docRefRef = useRef(docRef);
  useEffect(() => {
    if (JSON.stringify(docRefRef.current) !== JSON.stringify(docRef)) {
        docRefRef.current = docRef;
    }
  }, [docRef]);

  useEffect(() => {
    if (!docRefRef.current) {
        setLoading(false);
        setData(null);
        return;
    };
    
    setLoading(true);

    const unsubscribe = onSnapshot(
      docRefRef.current,
      (doc) => {
        if (doc.exists()) {
          setData({ id: doc.id, ...doc.data() });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
        console.error("Error fetching document: ", err);
      }
    );

    return () => unsubscribe();
  }, [docRefRef.current]);

  return { data, loading, error };
};

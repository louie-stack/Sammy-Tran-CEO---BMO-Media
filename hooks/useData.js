"use client";
import { useState, useEffect } from "react";

// Fetches a public JSON file and polls every 30 seconds for updates
export function useData(filename) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch(`/${filename}.json?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok && mounted) {
          setData(await res.json());
          setLoading(false);
        }
      } catch {}
    }

    load();
    const interval = setInterval(load, 30000);
    return () => { mounted = false; clearInterval(interval); };
  }, [filename]);

  return { data, loading };
}

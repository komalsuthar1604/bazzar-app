import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [apiMessage, setApiMessage] = useState("Loading API message...");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => {
        setApiMessage(data.message);
      })
      .catch((err) => {
        console.error("API fetch error:", err);
        setApiMessage("Failed to load message from API.");
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="text-center max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-blue-950 text-3xl font-extrabold mb-2">Welcome to our website</h3>
        <p className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg my-6 inline-block">
          <strong>API Status:</strong> "{apiMessage}"
        </p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <Link href="/products" className="text-white bg-blue-900 border border-blue-800 shadow-sm rounded-lg py-3 px-5 text-sm font-semibold hover:bg-blue-800 transition-colors">
            Products to explore
          </Link>
          <Link href="/dashboard" className="text-white bg-gray-900 border border-gray-800 shadow-sm rounded-lg py-3 px-5 text-sm font-semibold hover:bg-gray-800 transition-colors">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import Link from "next/link";

function LiveActivityFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState("");

  const fetchAndShufflePosts = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=15");
      if (!res.ok) throw new Error("API Network issue");
      const data = await res.json();
      const shuffled = data.sort(() => Math.random() - 0.5).slice(0, 5);
      
      setPosts(shuffled);
      setLastRefreshed(new Date().toLocaleTimeString());
      setError(false);
    } catch (err) {
      console.error("Fetch failed: ", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndShufflePosts();
    const interval = setInterval(fetchAndShufflePosts, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading && posts.length === 0) return <p className="text-md text-emerald-600 animate-pulse mt-4">Fetching live dashboard feeds...</p>;
  if (error && posts.length === 0) return <p className="text-md text-red-500 mt-4">Error loading dashboard data.</p>;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800 text-lg">Latest Post Titles:</h3>
        <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-md border border-emerald-200">
          Last refresh: {lastRefreshed}
        </span>
      </div>
      <ul className="space-y-2 text-gray-700">
        {posts.map((post) => (
          <li key={post.id} className="text-sm capitalize font-medium hover:text-gray-900 transition-colors">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Dashboard({ initialUserData, serverLoadedTime }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/50 p-4">
      <div className="w-full max-w-lg border border-gray-200 bg-white shadow-sm rounded-xl p-8">
        <header className="border-b border-gray-100 pb-4">
          <h1 className="text-blue-950 font-extrabold text-2xl tracking-tight">
            Welcome Back, {initialUserData.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            <strong className="text-gray-700">Role:</strong> {initialUserData.role}
          </p>

          <p className="border border-amber-200 bg-amber-50 text-amber-900 text-xs rounded-lg p-2.5 my-3 font-medium">
            <strong>Initial Timestamp:</strong> {new Date(serverLoadedTime).toLocaleTimeString()}
          </p>
          
          <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline inline-block mt-1">
            &larr; Go Back Home
          </Link>
        </header>

        <main>
          <LiveActivityFeed />
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const userData = {
    name: "Komal Suthar",
    role: "Senior Developer",
  };

  return {
    props: {
      initialUserData: userData,
      serverLoadedTime: new Date().toISOString(),
    },
  };
}
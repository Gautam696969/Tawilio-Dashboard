import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
const Dashboard = () => {
  const [logs, setLogs] = useState( [] );
  const [loading, setLoading] = useState( false );
  const [page, setPage] = useState( 1 );
  const [totalLogs, setTotalLogs] = useState();
  const limit = 10;

  const token = localStorage.getItem( 'token' );

  const fetchLogs = async () => {
    setLoading( true );
    if ( !token ) {
      alert( "No token found. Please login first." );
      setLoading( false );
      return;
    }

    try {
      const res = await fetch(
        `https://api.estousim.com/callLogs?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await res.json();
      console.log( "API response:", data );

      if ( Array.isArray( data ) ) {
        setLogs( data );
        setTotalLogs( data.length );
      } else {
        setLogs( data.logs || [] );
        setTotalLogs( data.total || data.logs?.length || 0 );
      }
    } catch ( err ) {
      console.error( "Fetch Error:", err );
      alert( "Something went wrong. Check console." );
    } finally {
      setLoading( false );
    }
  };

  useEffect( () => {
    fetchLogs();
  }, [page] );

  const totalPages = Math.ceil( totalLogs / limit );
  

  return (
    <div>
      <Navbar/>
    <div className="p-6 max-w-5xl mx-auto auto-mobile-center ">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Call Logs Dashboard</h1>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border-b text-center">SR</th>
                <th className="px-4 py-2 border-b">To Phone Number</th>
                <th className="px-4 py-2 border-b">From Phone Number</th>
                <th className="px-4 py-2 border-b">Call Duration</th>
                <th className="px-4 py-2 border-b">UTS</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 1 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-red-500">
                    No logs found
                  </td>
                </tr>
              ) : (
                logs.map( ( log, i ) => (
                  <tr key={log.id || i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b text-center">
                      {( page - 1 ) * limit + i + 1}
                    </td>
                    <td className="px-4 py-2 border-b">{log.to_phone || 'N/A'}</td>
                    <td className="px-4 py-2 border-b">{log.from_phone || 'N/A'}</td>
                    <td className="px-4 py-2 border-b">{log.call_duration ? ( log.call_duration / 60 ).toFixed( 2 ) + 'min' : 'N/A'}</td>
                    <td className="px-4 py-2 border-b">{log.uts ? new Date( log.uts ).toLocaleDateString( 'eng' ) : 'N/A'}</td>
                  </tr>
                ) )
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage( ( pages ) => Math.max( pages - 1, 1 ) )}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400">
          Prev
        </button>
        <span className="px-4 py-2 text-sm">
          Page {page} of <strong>{1}</strong>
        </span>

        <button
          onClick={() => setPage( ( pages ) => Math.max( pages + 1, totalPages ) )}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';

/**
 * Toast 提示组件
 * Displays a temporary toast notification
 */
export default function Toast({ message }) {
  const [visible, setVisible] = useState(false);
  const [displayMsg, setDisplayMsg] = useState('');

  useEffect(() => {
    if (message) {
      setDisplayMsg(message);
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 1400);
      return () => clearTimeout(t);
    }
  }, [message]);

  if (!message && !visible) return null;

  return (
    <div
      className="fixed top-1/2 left-1/2 z-50 pointer-events-none"
      style={{
        transform: 'translate(-50%, -50%)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div className="px-6 py-3 rounded-[10px] text-white text-sm whitespace-nowrap"
        style={{ background: 'rgba(74, 55, 40, 0.9)' }}>
        {displayMsg}
      </div>
    </div>
  );
}

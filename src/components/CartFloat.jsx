import React from 'react';
import { useApp } from '../App';

/**
 * 悬浮点菜清单按钮（左下角圆形 + 购物车图标 + 数量角标）
 * Floating cart button shown on order page
 */
export default function CartFloat() {
  const { cartCount, setCartOpen } = useApp();

  if (cartCount === 0) return null;

  return (
    <button
      onClick={() => setCartOpen(true)}
      aria-label="打开点菜清单"
      className="fixed bottom-[88px] left-4 z-10 w-14 h-14 rounded-full bg-[#E88D5A] text-white flex items-center justify-center border-none cursor-pointer transition-transform active:scale-95"
      style={{ boxShadow: '0 4px 16px rgba(232,141,90,0.4)' }}
    >
      {/* 购物车图标（SVG） */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {/* 数量角标 */}
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center font-semibold border-2 border-white">
        {cartCount}
      </span>
    </button>
  );
}

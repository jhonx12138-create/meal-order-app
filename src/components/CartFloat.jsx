import React from 'react';
import { useApp } from '../App';

/**
 * 悬浮点菜清单按钮
 * Floating cart button shown on order page
 */
export default function CartFloat() {
  const { cartCount, setCartOpen } = useApp();

  if (cartCount === 0) return null;

  return (
    <button
      onClick={() => setCartOpen(true)}
      className="cart-float-pulse fixed bottom-[88px] left-1/2 z-10 flex items-center gap-2.5 px-6 py-3 rounded-[28px] text-white text-sm font-semibold cursor-pointer border-none transition-all duration-200 active:scale-95"
      style={{ background: '#E88D5A', transform: 'translateX(-50%)', boxShadow: '0 4px 16px rgba(232,141,90,0.4)' }}
    >
      <span>点菜清单</span>
      <span className="bg-white text-coral rounded-xl px-2.5 py-0.5 text-[13px] min-w-[24px] text-center font-semibold">
        {cartCount}
      </span>
    </button>
  );
}

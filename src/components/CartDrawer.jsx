import React from 'react';
import Drawer from '@mui/material/Drawer';
import { useApp } from '../App';

/**
 * 点菜清单抽屉
 * Cart drawer showing selected dishes with qty controls
 */
export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, cartCount, changeCartQty, removeCartItem, clearCart, checkout } = useApp();

  return (
    <Drawer
      anchor="bottom"
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      PaperProps={{
        sx: {
          maxWidth: 430,
          mx: 'auto',
          maxHeight: '80vh',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          bgcolor: '#fff',
        },
      }}
    >
      <div className="px-5 pt-5 pb-2 overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-semibold text-brown m-0">点菜清单</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-xl text-muted bg-transparent border-none cursor-pointer p-1"
          >
            ×
          </button>
        </div>

        {/* Items */}
        {cartItems.length === 0 ? (
          <div className="text-center py-10 text-brown-light">清单是空的，去选几道菜吧</div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center py-3 border-b border-cream gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-3xl bg-cream flex-shrink-0 overflow-hidden">
                  {item.photo ? (
                    <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    item.emoji || '🍽️'
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-brown">{item.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => changeCartQty(item.id, -1)}
                      className="w-7 h-7 rounded-full bg-cream border-none text-base flex items-center justify-center cursor-pointer text-brown"
                    >
                      -
                    </button>
                    <span className="text-sm text-brown min-w-[20px] text-center">{item.qty}</span>
                    <button
                      onClick={() => changeCartQty(item.id, 1)}
                      className="w-7 h-7 rounded-full bg-cream border-none text-base flex items-center justify-center cursor-pointer text-brown"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeCartItem(item.id)}
                  className="text-xs text-coral-dark bg-transparent border-none cursor-pointer p-1 whitespace-nowrap"
                >
                  删除
                </button>
              </div>
            ))}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 mt-2">
              <button
                onClick={clearCart}
                className="text-xs text-coral-dark bg-transparent border-none cursor-pointer"
              >
                清空全部
              </button>
              <div className="flex items-center gap-4">
                <span className="text-[13px] text-brown-light">
                  共 <b className="text-brown">{cartCount}</b> 道菜
                </span>
                <button
                  onClick={checkout}
                  className="px-8 py-3 rounded-btn text-[15px] font-semibold cursor-pointer border-none text-white"
                  style={{ background: '#E88D5A' }}
                >
                  一键下单
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
}

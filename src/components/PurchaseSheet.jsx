import React from 'react';
import Drawer from '@mui/material/Drawer';
import { useApp } from '../App';

/**
 * 采购清单页面
 * Purchase list sheet showing aggregated ingredients grouped by category
 */
export default function PurchaseSheet() {
  const { purchaseOpen, setPurchaseOpen, purchaseData, togglePurchaseCheck, shareOrder, saveOrderToMeals } = useApp();

  if (!purchaseData) return null;

  const { id, date, menu, groups } = purchaseData;

  return (
    <Drawer
      anchor="bottom"
      open={purchaseOpen}
      onClose={() => setPurchaseOpen(false)}
      PaperProps={{
        sx: {
          maxWidth: 430,
          mx: 'auto',
          maxHeight: '85vh',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          bgcolor: '#fff',
        },
      }}
    >
      <div className="px-5 pt-5 pb-6 overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-semibold text-brown m-0">采购清单</h2>
          <button
            onClick={() => setPurchaseOpen(false)}
            className="text-xl text-muted bg-transparent border-none cursor-pointer p-1"
          >
            ×
          </button>
        </div>

        {/* Date & Menu Summary */}
        <div className="text-center text-[13px] text-brown-light mb-4">
          {date} 菜单
        </div>

        {/* Ingredient Groups */}
        {Object.entries(groups).map(([catName, items]) => (
          <div key={catName} className="mb-4">
            <div className="text-[13px] font-semibold text-coral mb-2">{catName}</div>
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center py-2 gap-2.5 border-b border-cream text-sm text-brown">
                <div
                  onClick={() => togglePurchaseCheck(id, catName, idx)}
                  className="w-[22px] h-[22px] border-2 rounded-md cursor-pointer flex-shrink-0 flex items-center justify-center transition-colors"
                  style={{
                    borderColor: item.checked ? '#7BC67E' : '#E88D5A',
                    background: item.checked ? '#7BC67E' : 'transparent',
                  }}
                >
                  {item.checked && <span className="text-white text-[13px] font-bold">✓</span>}
                </div>
                <span className="flex-1">{item.name}</span>
                <span className="text-xs text-brown-light">{item.amount}</span>
              </div>
            ))}
          </div>
        ))}

        {/* Menu Summary */}
        <div className="p-3 bg-cream rounded-[10px] mt-3 text-xs text-brown-light leading-relaxed">
          <b className="text-brown">今日菜单：</b>{menu.join('、')}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => shareOrder(id)}
            className="flex-1 py-3 rounded-btn text-sm font-semibold cursor-pointer bg-white text-coral border-[1.5px] border-coral"
          >
            分享
          </button>
          <button
            onClick={() => saveOrderToMeals(id)}
            className="flex-1 py-3 rounded-btn text-sm font-semibold cursor-pointer border-none text-white"
            style={{ background: '#E88D5A' }}
          >
            保存到食记
          </button>
        </div>
      </div>
    </Drawer>
  );
}

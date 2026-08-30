import React from 'react';
import Drawer from '@mui/material/Drawer';
import { useApp } from '../App';

/**
 * 菜品详情
 * Recipe detail view with edit and delete actions
 */
export default function RecipeDetail() {
  const {
    recipeDetailOpen,
    setRecipeDetailOpen,
    detailDish,
    detailReadonly,
    handleDetailEdit,
    handleDetailDelete,
    dishes,
    addBuiltinToPersonal,
    removeFromPersonal,
    activeTab,
    TABS,
  } = useApp();

  // 点菜页 / 系统菜单打开详情为只读（不显示编辑/删除）
  const readOnly = activeTab === TABS.ORDER || detailReadonly;

  if (!detailDish) return null;

  const d = detailDish;
  // 系统菜单详情：该菜是否已在个人菜单
  const alreadyAdded = dishes.some((x) => x.name === d.name);

  return (
    <Drawer
      anchor="bottom"
      open={recipeDetailOpen}
      onClose={() => setRecipeDetailOpen(false)}
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
          <h2 className="text-[17px] font-semibold text-brown m-0">{d.name}</h2>
          <button
            onClick={() => setRecipeDetailOpen(false)}
            className="text-xl text-muted bg-transparent border-none cursor-pointer p-1"
          >
            ×
          </button>
        </div>

        {/* Emoji / Image */}
        <div className="w-full aspect-[16/10] rounded-card mb-4 dish-img-bg flex items-center justify-center text-[64px] overflow-hidden">
          {d.photo ? (
            <img src={d.photo} alt={d.name} className="w-full h-full object-cover" />
          ) : (
            d.emoji || '🍽️'
          )}
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <div className="text-[13px] font-semibold text-coral mb-2">食材清单</div>
          {d.ingredients.map((ing, idx) => (
            <div
              key={idx}
              className="flex justify-between py-1.5 text-sm text-brown border-b border-cream"
            >
              <span>{ing.name}</span>
              <span className="text-brown-light">{ing.amount}</span>
            </div>
          ))}
        </div>

        {/* Categories */}
        {(d.categories || []).length > 0 && (
          <div className="flex gap-2 flex-wrap mb-4">
            {(d.categories || []).map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 rounded-[10px] text-xs text-brown-light bg-cream"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Actions（点菜页/系统菜单只读时隐藏编辑/删除） */}
        {!readOnly && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleDetailEdit}
              className="flex-1 py-2.5 rounded-btn text-sm font-semibold cursor-pointer bg-white text-coral border-[1.5px] border-coral"
            >
              编辑
            </button>
            <button
              onClick={handleDetailDelete}
              className="flex-1 py-2.5 rounded-btn text-sm font-semibold cursor-pointer border-none text-white"
              style={{ background: '#E24B4A' }}
            >
              删除
            </button>
          </div>
        )}

        {/* 系统菜单详情只读：加入 / 移出个人菜单 */}
        {detailReadonly && (
          <button
            onClick={() => {
              if (alreadyAdded) {
                removeFromPersonal(d);
              } else {
                addBuiltinToPersonal(d);
              }
              setRecipeDetailOpen(false);
            }}
            className="w-full mt-4 py-3 rounded-btn text-sm font-semibold cursor-pointer border-none"
            style={
              alreadyAdded
                ? { background: '#F5ECE1', color: '#E88D5A' }
                : { background: '#E88D5A', color: '#fff' }
            }
          >
            {alreadyAdded ? '移出个人菜单' : '加入个人菜单'}
          </button>
        )}
      </div>
    </Drawer>
  );
}

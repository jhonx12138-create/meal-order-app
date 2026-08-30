import React, { useState, useEffect } from 'react';
import { useApp } from '../App';

/**
 * 菜谱页面
 * Kitchen page with two tabs:
 *  - 个人菜单：用户自己的菜谱，可增删改
 *  - 系统菜单：只读系统菜库（88 道），可挑选加入 / 移出个人菜单
 */
export default function KitchenPage() {
  const {
    dishes,
    openAddRecipe,
    openRecipeDetail,
    CATEGORIES,
    BUILTIN_DISHES,
    addBuiltinToPersonal,
    removeFromPersonal,
    kitchenPendingCat,
    setKitchenPendingCat,
  } = useApp();
  const [menuTab, setMenuTab] = useState('personal'); // 'personal' | 'builtin'
  const [activeCat, setActiveCat] = useState('全部');

  // 从点菜页跳转过来时，切到个人菜单 tab 并默认选中点菜页的当前分类（一次性）
  useEffect(() => {
    if (kitchenPendingCat) {
      setMenuTab('personal');
      setActiveCat(kitchenPendingCat);
      setKitchenPendingCat(null);
    }
  }, [kitchenPendingCat, setKitchenPendingCat]);

  const cats = CATEGORIES.filter((c) => c !== '全部');

  // 个人菜单已有菜名集合（用于「已加入」提示）
  const addedNames = new Set(dishes.map((d) => d.name));

  // 系统 tab 数据：随分类筛选，未加入个人菜单的优先展示
  const builtinFiltered = (
    activeCat === '全部'
      ? BUILTIN_DISHES
      : BUILTIN_DISHES.filter(
          (d) => d.categories && d.categories.includes(activeCat)
        )
  )
    .slice()
    .sort(
      (a, b) => Number(addedNames.has(a.name)) - Number(addedNames.has(b.name))
    );

  // 个人 tab 数据
  const personalFiltered =
    activeCat === '全部'
      ? dishes
      : dishes.filter((d) => d.categories && d.categories.includes(activeCat));

  const listSource = menuTab === 'personal' ? personalFiltered : builtinFiltered;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Menu Tabs: 个人菜单 / 系统菜单 */}
      <div className="px-5 mb-3 flex-shrink-0">
        <div className="flex p-1 rounded-full bg-[#F5ECE1]">
          <button
            onClick={() => setMenuTab('personal')}
            className="flex-1 py-2 rounded-full text-[13px] font-semibold cursor-pointer border-none transition-colors"
            style={
              menuTab === 'personal'
                ? { background: '#E88D5A', color: '#fff' }
                : { background: 'transparent', color: '#8B7355' }
            }
          >
            个人菜单
          </button>
          <button
            onClick={() => setMenuTab('builtin')}
            className="flex-1 py-2 rounded-full text-[13px] font-semibold cursor-pointer border-none transition-colors"
            style={
              menuTab === 'builtin'
                ? { background: '#E88D5A', color: '#fff' }
                : { background: 'transparent', color: '#8B7355' }
            }
          >
            系统菜单
          </button>
        </div>
      </div>

      {/* Category Tags */}
      <div className="px-5 mb-3 flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {['全部', ...cats].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className="px-3.5 py-1.5 rounded-tag text-[13px] cursor-pointer border-none whitespace-nowrap transition-colors"
              style={{
                background: activeCat === cat ? '#E88D5A' : '#F5ECE1',
                color: activeCat === cat ? '#fff' : '#8B7355',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe List */}
      <div className="flex-1 overflow-y-auto px-5 hide-scrollbar">
        {listSource.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
            <div className="text-[64px] mb-3">🍽️</div>
            <div className="text-sm text-brown-light mb-4">
              {menuTab === 'builtin' ? (
                `「${activeCat}」分类下暂无系统菜品`
              ) : activeCat === '全部' ? (
                '没有菜品'
              ) : (
                `「${activeCat}」分类下没有菜品`
              )}
            </div>
            {menuTab === 'personal' && (
              <div className="text-xs text-muted leading-relaxed max-w-[240px]">
                可以点击下方按钮手动添加，或者从系统菜单中选择菜品添加
              </div>
            )}
          </div>
        ) : (
          listSource.map((dish) => {
            const isBuiltin = menuTab === 'builtin';
            const alreadyAdded = isBuiltin && addedNames.has(dish.name);
            return (
              <div
                key={dish.id}
                onClick={() => openRecipeDetail(dish, isBuiltin)}
                className="relative flex items-center p-3 bg-white rounded-card mb-2 gap-3 shadow-[0_1px_4px_rgba(0,0,0,0.03)] cursor-pointer active:bg-[#faf7f2]"
              >
                {/* 缩略图 */}
                <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-4xl bg-cream flex-shrink-0 overflow-hidden">
                  {dish.photo ? (
                    <img
                      src={dish.photo}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    dish.emoji || '🍽️'
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-brown mb-0.5">
                    {dish.name}
                  </div>
                  <div className="text-[11px] text-muted">
                    {(dish.categories || []).join(' · ') || '未分类'}
                  </div>
                </div>
                {/* 系统菜单：行中央水印标识是否已加入个人菜单 */}
                {isBuiltin && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                      className="px-3 py-1 rounded-full text-[11px] font-bold border-[1.5px] -rotate-12"
                      style={
                        alreadyAdded
                          ? {
                              color: 'rgba(123,198,126,0.95)',
                              borderColor: 'rgba(123,198,126,0.65)',
                              background: 'rgba(255,255,255,0.75)',
                            }
                          : {
                              color: 'rgba(196,185,152,0.9)',
                              borderColor: 'rgba(196,185,152,0.55)',
                              background: 'rgba(255,255,255,0.75)',
                            }
                      }
                    >
                      {alreadyAdded ? '已加入 ✓' : '未加入'}
                    </span>
                  </div>
                )}
                {isBuiltin ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (alreadyAdded) {
                        removeFromPersonal(dish);
                      } else {
                        addBuiltinToPersonal(dish);
                      }
                    }}
                    className="px-2.5 py-1.5 rounded-tag text-[11px] font-semibold cursor-pointer border-none whitespace-nowrap z-10"
                    style={
                      alreadyAdded
                        ? { background: '#F5ECE1', color: '#E88D5A' }
                        : { background: '#E88D5A', color: '#fff' }
                    }
                  >
                    {alreadyAdded ? '移出个人菜单' : '加入个人菜单'}
                  </button>
                ) : (
                  <span className="text-sm text-muted">›</span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Button（仅个人菜单） */}
      {menuTab === 'personal' && (
        <div className="px-5 pb-3 flex-shrink-0 safe-bottom">
          <button
            onClick={openAddRecipe}
            className="w-full py-3.5 rounded-btn text-white text-[15px] font-semibold cursor-pointer border-none"
            style={{ background: '#E88D5A' }}
          >
            + 添加菜品
          </button>
        </div>
      )}
    </div>
  );
}

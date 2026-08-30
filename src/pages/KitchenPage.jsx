import React, { useState, useEffect } from 'react';
import { useApp } from '../App';

/**
 * 菜谱页面
 * 主场景 = 个人菜单（我的菜单）
 * 「从系统菜单导入」→ 进入系统菜库子页（返回式导航）
 * 系统菜库是添加菜品的一种方式（进货仓库），不是与个人菜单并列的 tab
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
  const [inLibrary, setInLibrary] = useState(false); // false=个人菜单 / true=系统菜库
  const [activeCat, setActiveCat] = useState('全部');

  // 从点菜页跳转过来时，落在个人菜单并默认选中点菜页的当前分类（一次性）
  useEffect(() => {
    if (kitchenPendingCat) {
      setInLibrary(false);
      setActiveCat(kitchenPendingCat);
      setKitchenPendingCat(null);
    }
  }, [kitchenPendingCat, setKitchenPendingCat]);

  const cats = CATEGORIES.filter((c) => c !== '全部');

  // 个人菜单已有菜名集合（系统菜库「已加入」提示）
  const addedNames = new Set(dishes.map((d) => d.name));

  // 系统菜库数据：随分类筛选；按固定分类顺序排序（不随「已加入」状态变化，保证操作后列表稳定不跳动）
  const catOrder = {};
  CATEGORIES.forEach((c, i) => {
    catOrder[c] = i;
  });
  const builtinFiltered = (
    activeCat === '全部'
      ? BUILTIN_DISHES
      : BUILTIN_DISHES.filter(
          (d) => d.categories && d.categories.includes(activeCat)
        )
  )
    .slice()
    .sort((a, b) => {
      const ca = catOrder[a.categories?.[0]] ?? 999;
      const cb = catOrder[b.categories?.[0]] ?? 999;
      return ca - cb;
    });

  // 个人菜单数据
  const personalFiltered =
    activeCat === '全部'
      ? dishes
      : dishes.filter((d) => d.categories && d.categories.includes(activeCat));

  // ─── 系统菜库子页 ─────────────────────────────────
  if (inLibrary) {
    const addedCount = BUILTIN_DISHES.filter((d) => addedNames.has(d.name))
      .length;
    return (
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* 顶栏：返回 + 标题 */}
        <div className="px-5 pt-4 pb-3 flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => setInLibrary(false)}
            className="py-1 pr-2 text-[15px] font-semibold cursor-pointer border-none bg-transparent"
            style={{ color: '#8B7355' }}
          >
            ‹ 返回
          </button>
          <div className="text-[16px] font-semibold text-brown">
            系统菜库 · {BUILTIN_DISHES.length} 道
          </div>
        </div>

        {/* 分类标签 */}
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

        {/* 菜库列表 */}
        <div className="flex-1 overflow-y-auto px-5 hide-scrollbar">
          {builtinFiltered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
              <div className="text-[64px] mb-3">🍽️</div>
              <div className="text-sm text-brown-light mb-4">
                「{activeCat}」分类下暂无系统菜品
              </div>
            </div>
          ) : (
            builtinFiltered.map((dish) => {
              const alreadyAdded = addedNames.has(dish.name);
              return (
                <div
                  key={dish.id}
                  onClick={() => openRecipeDetail(dish, true)}
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (alreadyAdded) {
                        removeFromPersonal(dish);
                      } else {
                        addBuiltinToPersonal(dish);
                      }
                    }}
                    className="min-w-[88px] px-2 py-1.5 rounded-tag text-[12px] font-semibold cursor-pointer border-none whitespace-nowrap z-10 text-center"
                    style={
                      alreadyAdded
                        ? { background: '#F5ECE1', color: '#E88D5A' }
                        : { background: '#E88D5A', color: '#fff' }
                    }
                  >
                    {alreadyAdded ? '移出我的菜单' : '加入我的菜单'}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* 底部汇总条：可点击返回我的菜单 */}
        <div className="px-5 pt-2 pb-2 flex-shrink-0 safe-bottom">
          <button
            onClick={() => setInLibrary(false)}
            className="w-full py-2.5 rounded-full text-center text-[12px] font-semibold cursor-pointer border-none"
            style={{ background: '#F5ECE1', color: '#E88D5A' }}
          >
            已加入 {addedCount} 道菜 · 点击返回即回到我的菜单
          </button>
        </div>
      </div>
    );
  }

  // ─── 个人菜单主视图 ───────────────────────────────
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* 标题行 */}
      <div className="px-5 pt-4 pb-3 flex items-end justify-between flex-shrink-0">
        <div className="text-[18px] font-semibold text-brown">我的菜单</div>
        <div className="text-[12px] text-muted">{dishes.length} 道</div>
      </div>

      {/* 分类标签 */}
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

      {/* 个人菜单列表 */}
      <div className="flex-1 overflow-y-auto px-5 hide-scrollbar">
        {personalFiltered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
            <div className="text-[64px] mb-3">🍽️</div>
            <div className="text-sm text-brown-light mb-4">
              {activeCat === '全部'
                ? '没有菜品'
                : `「${activeCat}」分类下没有菜品`}
            </div>
            <div className="text-xs text-muted leading-relaxed max-w-[240px]">
              点击下方按钮手动添加，或从系统菜单导入菜品
            </div>
          </div>
        ) : (
          personalFiltered.map((dish) => (
            <div
              key={dish.id}
              onClick={() => openRecipeDetail(dish, false)}
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
              <span className="text-sm text-muted">›</span>
            </div>
          ))
        )}
      </div>

      {/* 底部双按钮：手动添加 / 从系统菜单导入 */}
      <div className="px-5 pt-2 pb-2 flex gap-3 flex-shrink-0 safe-bottom">
        <button
          onClick={openAddRecipe}
          className="flex-1 py-3.5 rounded-btn text-white text-[15px] font-semibold cursor-pointer border-none"
          style={{ background: '#E88D5A' }}
        >
          ＋ 添加菜品
        </button>
        <button
          onClick={() => setInLibrary(true)}
          className="flex-1 py-3.5 rounded-btn text-[15px] font-semibold cursor-pointer border-none"
          style={{ background: '#F5ECE1', color: '#E88D5A' }}
        >
          从系统菜单导入
        </button>
      </div>
    </div>
  );
}

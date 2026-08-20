import React, { useState, useCallback, useRef, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import { useApp } from '../App';

/**
 * 转义正则特殊字符，让 query 按字面量匹配。
 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 安全高亮组件：将 query 转义后 split 成数组，匹配片段用 <b> 包裹。
 * 不使用 dangerouslySetInnerHTML。
 */
function HighlightText({ text, query }) {
  const q = (query || '').trim();
  if (!q) return text;

  const parts = text.split(new RegExp(`(${escapeRegExp(q)})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === q.toLowerCase() ? (
      <b key={i} style={{ color: '#E88D5A' }}>
        {part}
      </b>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

/**
 * 搜索页面
 * Search page for finding dishes by name or ingredient
 */
export default function SearchPage() {
  const { searchOpen, setSearchOpen, searchDishes, openRecipeDetail } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debounceTimer = useRef(null);

  const handleInput = useCallback(
    (e) => {
      const val = e.target.value;
      setQuery(val);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        setResults(searchDishes(val));
      }, 300);
    },
    [searchDishes]
  );

  const handleClose = useCallback(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setSearchOpen(false);
    setQuery('');
    setResults([]);
  }, [setSearchOpen]);

  const handleResultClick = useCallback(
    (dish) => {
      handleClose();
      setTimeout(() => openRecipeDetail(dish), 100);
    },
    [handleClose, openRecipeDetail]
  );

  // 组件卸载时清理防抖 timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  return (
    <Drawer
      anchor="bottom"
      open={searchOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          maxWidth: 430,
          mx: 'auto',
          height: '100vh',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          bgcolor: '#FFFAF5',
        },
      }}
    >
      <div className="flex flex-col h-full">
        {/* Search Header */}
        <div className="flex items-center gap-2.5 px-5 pt-4 pb-3">
          <span className="text-base">🔍</span>
          <input
            type="text"
            value={query}
            onChange={handleInput}
            placeholder="搜索菜品或食材"
            autoComplete="off"
            autoFocus
            className="flex-1 border-none text-[15px] text-brown bg-transparent outline-none placeholder:text-muted"
          />
          <button
            onClick={handleClose}
            className="text-sm text-coral bg-transparent border-none cursor-pointer whitespace-nowrap"
          >
            取消
          </button>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto px-5 hide-scrollbar">
          {!query.trim() ? (
            <div className="text-center py-10 text-muted">
              试试搜索：鸡、牛肉、蔬菜
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 text-brown-light">
              没有找到「{query}」
              <br />
              <span className="text-xs text-muted">试试搜索：鸡、牛肉、蔬菜</span>
            </div>
          ) : (
            results.map((dish) => (
              <div
                key={dish.id}
                onClick={() => handleResultClick(dish)}
                className="flex items-center py-3 border-b border-cream gap-3 cursor-pointer active:bg-cream/50"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-3xl bg-cream flex-shrink-0 overflow-hidden">
                  {dish.photo ? (
                    <img src={dish.photo} alt={dish.name} className="w-full h-full object-cover" />
                  ) : (
                    dish.emoji || '🍽️'
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-brown">
                    <HighlightText text={dish.name} query={query} />
                  </div>
                  <div className="text-[11px] text-brown-light mt-0.5 truncate">
                    {dish.ingredients.map((i) => i.name).join('、')}
                  </div>
                </div>
                <span className="text-sm text-muted">›</span>
              </div>
            ))
          )}
        </div>
      </div>
    </Drawer>
  );
}

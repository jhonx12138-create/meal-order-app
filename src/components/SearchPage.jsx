import React, { useState, useCallback } from 'react';
import Drawer from '@mui/material/Drawer';
import { useApp } from '../App';

/**
 * 搜索页面
 * Search page for finding dishes by name or ingredient
 */
export default function SearchPage() {
  const { searchOpen, setSearchOpen, searchDishes, openRecipeDetail } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInput = useCallback(
    (e) => {
      const val = e.target.value;
      setQuery(val);
      setResults(searchDishes(val));
    },
    [searchDishes]
  );

  const handleClose = useCallback(() => {
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
            results.map((dish) => {
              // Highlight matching text
              const highlightedName = dish.name.replace(
                new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g'),
                '<b style="color:#E88D5A;">$1</b>'
              );
              return (
                <div
                  key={dish.id}
                  onClick={() => handleResultClick(dish)}
                  className="flex items-center py-3 border-b border-cream gap-3 cursor-pointer active:bg-cream/50"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-3xl bg-cream flex-shrink-0">
                    {dish.emoji || '🍽️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-sm font-semibold text-brown"
                      dangerouslySetInnerHTML={{ __html: highlightedName }}
                    />
                    <div className="text-[11px] text-brown-light mt-0.5 truncate">
                      {dish.ingredients.map((i) => i.name).join('、')}
                    </div>
                  </div>
                  <span className="text-sm text-muted">›</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Drawer>
  );
}

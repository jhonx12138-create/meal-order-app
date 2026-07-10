import React from 'react';
import { useApp } from '../App';

export default function DishCard({ dish }) {
  const { cart, toggleCartItem, openRecipeDetail } = useApp();
  const inCart = !!cart[dish.id];

  const handleAddClick = (e) => {
    e.stopPropagation();
    toggleCartItem(dish.id);
  };

  const ingredientSummary = dish.ingredients
    .slice(0, 3)
    .map((i) => i.name + (i.amount ? '·' + i.amount : ''))
    .join(' ');

  return (
    <div
      onClick={() => openRecipeDetail(dish)}
      className="bg-white rounded-card overflow-hidden cursor-pointer relative shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:bg-[#faf7f2] transition-colors"
    >
      {/* Image / Emoji area */}
      <div className="w-full aspect-square dish-img-bg flex items-center justify-center text-[40px] overflow-hidden">
        {dish.photo ? (
          <img src={dish.photo} alt={dish.name} className="w-full h-full object-cover" />
        ) : (
          dish.emoji || '🍽️'
        )}
      </div>

      {/* Info */}
      <div className="px-3 pt-2.5 pb-10">
        <div className="text-sm font-semibold text-brown mb-1">{dish.name}</div>
        <div className="text-[11px] text-brown-light leading-relaxed line-clamp-2">
          {ingredientSummary || '暂无食材'}
        </div>
      </div>

      {/* Add button */}
      <button
        onClick={handleAddClick}
        className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-lg text-white border-none cursor-pointer shadow-[0_2px_8px_rgba(232,141,90,0.3)] active:scale-90 transition-transform animate-scale-in"
        style={{ background: inCart ? '#7BC67E' : '#E88D5A' }}
      >
        {inCart ? '✓' : '+'}
      </button>
    </div>
  );
}

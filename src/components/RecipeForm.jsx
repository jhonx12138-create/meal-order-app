import React, { useState, useEffect, useCallback } from 'react';
import Drawer from '@mui/material/Drawer';
import { useApp } from '../App';
import { CATEGORIES } from '../data/defaults';

const FILTERED_CATEGORIES = CATEGORIES.filter((c) => c !== '全部');

/**
 * 添加/编辑菜谱表单
 * Recipe form for adding or editing a dish
 */
export default function RecipeForm({ onSave }) {
  const { recipeFormOpen, setRecipeFormOpen, editingDish } = useApp();

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [showPhoto, setShowPhoto] = useState(false);

  // Reset form when opening
  useEffect(() => {
    if (recipeFormOpen) {
      if (editingDish) {
        setName(editingDish.name || '');
        setIngredients(
          editingDish.ingredients && editingDish.ingredients.length > 0
            ? editingDish.ingredients.map((i) => ({ name: i.name, amount: i.amount || '' }))
            : [{ name: '', amount: '' }]
        );
        setSelectedCats(editingDish.categories || []);
      } else {
        setName('');
        setIngredients([{ name: '', amount: '' }]);
        setSelectedCats([]);
      }
      setShowPhoto(false);
    }
  }, [recipeFormOpen, editingDish]);

  // Ingredient row operations
  const addIngredientRow = useCallback(() => {
    setIngredients((prev) => [...prev, { name: '', amount: '' }]);
  }, []);

  const removeIngredientRow = useCallback((idx) => {
    setIngredients((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const updateIngredient = useCallback((idx, field, value) => {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === idx ? { ...ing, [field]: value } : ing))
    );
  }, []);

  // Category toggle
  const toggleCategory = useCallback((cat) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);

  // Save
  const handleSave = useCallback(() => {
    const trimName = name.trim();
    if (!trimName) {
      alert('请填写菜品名称');
      return;
    }
    if (trimName.length < 2 || trimName.length > 20) {
      alert('菜品名称需在2~20字之间');
      return;
    }

    const validIngredients = ingredients.filter((i) => i.name.trim());
    if (validIngredients.length === 0) {
      alert('请至少添加一种食材');
      return;
    }

    const finalCats = selectedCats.length > 0 ? selectedCats : ['菜菜'];

    onSave({
      name: trimName,
      emoji: editingDish?.emoji || '🍽️',
      ingredients: validIngredients.map((i) => ({
        name: i.name.trim(),
        amount: i.amount.trim() || '适量',
      })),
      categories: finalCats,
    });
  }, [name, ingredients, selectedCats, editingDish, onSave]);

  // Simulate photo upload
  const simulatePhoto = useCallback(() => {
    setShowPhoto(true);
  }, []);

  return (
    <Drawer
      anchor="bottom"
      open={recipeFormOpen}
      onClose={() => setRecipeFormOpen(false)}
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
          <h2 className="text-[17px] font-semibold text-brown m-0">
            {editingDish ? '编辑菜谱' : '添加菜谱'}
          </h2>
          <button
            onClick={() => setRecipeFormOpen(false)}
            className="text-xl text-muted bg-transparent border-none cursor-pointer p-1"
          >
            ×
          </button>
        </div>

        {/* Photo Upload */}
        <div
          onClick={simulatePhoto}
          className="w-full aspect-[16/10] border-2 border-dashed border-cream-dark rounded-card flex flex-col items-center justify-center cursor-pointer mb-4 transition-colors"
          style={{ background: showPhoto ? '#FFE4C4' : 'transparent' }}
        >
          {showPhoto ? (
            <>
              <span className="text-5xl">🍽️</span>
              <span className="text-[11px] text-brown-light mt-1">照片已上传（模拟）</span>
            </>
          ) : (
            <>
              <span className="text-4xl text-muted">📷</span>
              <span className="text-xs text-muted mt-1">点击上传菜品照片</span>
            </>
          )}
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-brown mb-1.5">菜品名称 *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="如：可乐鸡翅"
            maxLength={20}
            className="w-full px-3.5 py-2.5 border-[1.5px] border-cream-dark rounded-[10px] text-sm text-brown bg-white outline-none focus:border-coral placeholder:text-muted"
          />
          <div className="text-right text-[11px] text-muted mt-0.5">{name.length}/20</div>
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-brown mb-1.5">食材清单 *</label>
          {ingredients.map((ing, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={ing.name}
                onChange={(e) => updateIngredient(idx, 'name', e.target.value)}
                placeholder="食材名称"
                className="flex-[2] px-3.5 py-2.5 border-[1.5px] border-cream-dark rounded-[10px] text-sm text-brown bg-white outline-none focus:border-coral placeholder:text-muted"
              />
              <input
                type="text"
                value={ing.amount}
                onChange={(e) => updateIngredient(idx, 'amount', e.target.value)}
                placeholder="用量"
                className="flex-1 px-3.5 py-2.5 border-[1.5px] border-cream-dark rounded-[10px] text-sm text-brown bg-white outline-none focus:border-coral placeholder:text-muted"
              />
              {ingredients.length > 1 && (
                <button
                  onClick={() => removeIngredientRow(idx)}
                  className="text-lg text-coral-dark bg-transparent border-none cursor-pointer px-2"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addIngredientRow}
            className="text-xs text-coral bg-transparent border-none cursor-pointer py-1"
          >
            + 添加食材
          </button>
        </div>

        {/* Category Tags */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-brown mb-1.5">分类标签</label>
          <div className="flex flex-wrap gap-2">
            {FILTERED_CATEGORIES.map((cat) => {
              const sel = selectedCats.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="px-3.5 py-1.5 rounded-tag text-xs cursor-pointer border-none transition-colors duration-200"
                  style={{
                    background: sel ? '#E88D5A' : '#F5ECE1',
                    color: sel ? '#fff' : '#8B7355',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 rounded-btn text-white text-[15px] font-semibold cursor-pointer border-none mt-2"
          style={{ background: '#E88D5A' }}
        >
          保存菜谱
        </button>
      </div>
    </Drawer>
  );
}

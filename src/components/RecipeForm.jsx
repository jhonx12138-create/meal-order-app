import React, { useState, useEffect, useCallback, useRef } from 'react';
import Drawer from '@mui/material/Drawer';
import { useApp } from '../App';
import { CATEGORIES } from '../data/defaults';

const FILTERED_CATEGORIES = CATEGORIES.filter((c) => c !== '全部');

export default function RecipeForm({ onSave }) {
  const { recipeFormOpen, setRecipeFormOpen, editingDish } = useApp();

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);

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
        setPhoto(editingDish.photo || null);
      } else {
        setName('');
        setIngredients([{ name: '', amount: '' }]);
        setSelectedCats([]);
        setPhoto(null);
      }
    }
  }, [recipeFormOpen, editingDish]);

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

  const toggleCategory = useCallback((cat) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);

  const handlePhotoClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handlePhotoChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setPhoto(evt.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

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
      photo: photo || null,
      emoji: editingDish?.emoji || (photo ? null : '🍽️'),
      ingredients: validIngredients.map((i) => ({
        name: i.name.trim(),
        amount: i.amount.trim() || '适量',
      })),
      categories: finalCats,
    });
  }, [name, ingredients, selectedCats, photo, editingDish, onSave]);

  return (
    <Drawer
      anchor="bottom"
      open={recipeFormOpen}
      onClose={() => setRecipeFormOpen(false)}
      PaperProps={{
        sx: {
          maxWidth: 430,
          mx: 'auto',
          height: '100vh',
          maxHeight: '100%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          bgcolor: '#fff',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2 flex-shrink-0">
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 pt-2 pb-4 hide-scrollbar">
          {/* Photo Upload */}
          <div className="mb-4">
            <div
              onClick={handlePhotoClick}
              className="w-full aspect-[16/10] border-2 border-dashed border-[#D4C4B0] rounded-card flex flex-col items-center justify-center cursor-pointer transition-colors"
              style={{ background: photo ? '#f5f0eb' : 'transparent' }}
            >
              {photo ? (
                <img
                  src={photo}
                  alt="菜品"
                  className="w-full h-full object-cover rounded-card"
                />
              ) : (
                <>
                  <span className="text-4xl text-[#999]">📷</span>
                  <span className="text-[13px] text-[#999] mt-1">点击上传菜品照片</span>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-brown mb-1.5">
              菜品名称
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="如：可乐鸡翅"
              maxLength={20}
              className="w-full px-3.5 py-2.5 border-[1.5px] border-cream-dark rounded-[10px] text-sm text-brown bg-white outline-none focus:border-coral placeholder:text-muted"
            />
            <div className="text-right text-[11px] text-muted mt-0.5">
              {name.length}/20
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-brown mb-1.5">
              食材清单
            </label>
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2 mb-2 items-center">
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
                <button
                  onClick={() => removeIngredientRow(idx)}
                  className="text-sm font-bold text-[#D4784A] bg-transparent border-none cursor-pointer px-1"
                  style={{ fontSize: '18px' }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={addIngredientRow}
              className="text-[13px] text-coral bg-transparent border-none cursor-pointer py-1"
            >
              + 添加食材
            </button>
          </div>

          {/* Category Tags */}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-brown mb-1.5">
              分类标签
            </label>
            <div className="flex flex-wrap gap-2">
              {FILTERED_CATEGORIES.map((cat) => {
                const sel = selectedCats.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className="px-4 py-1.5 rounded-tag text-[13px] cursor-pointer border-none transition-colors duration-200"
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
        </div>

        {/* Save Button - Fixed at bottom */}
        <div className="px-5 pb-6 pt-2 flex-shrink-0">
          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-btn text-white text-[15px] font-semibold cursor-pointer border-none"
            style={{ background: '#E88D5A' }}
          >
            保存菜谱
          </button>
        </div>
      </div>
    </Drawer>
  );
}

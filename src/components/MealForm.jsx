import React, { useState, useCallback, useRef, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import { useApp } from '../App';

/** 压缩图片，限制最大宽度600px，质量0.7 */
function compressImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxW = 600;
        let w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * 食记编辑弹窗：评分 / 和谁吃 / 一句话点评 / 照片
 */
export default function MealForm() {
  const { mealFormOpen, setMealFormOpen, mealFormOrder, handleMealSave } = useApp();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [who, setWho] = useState('');
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (mealFormOpen) {
      setRating(0);
      setComment('');
      setWho('');
      setPhoto(null);
    }
  }, [mealFormOpen]);

  const handlePhotoChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setPhoto(compressed);
    } catch {
      const reader = new FileReader();
      reader.onload = (evt) => setPhoto(evt.target.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSave = useCallback(() => {
    handleMealSave({ rating, comment: comment.trim(), who: who.trim(), photo });
  }, [rating, comment, who, photo, handleMealSave]);

  return (
    <Drawer
      anchor="bottom"
      open={mealFormOpen}
      onClose={() => setMealFormOpen(false)}
      PaperProps={{
        sx: {
          maxWidth: 430,
          mx: 'auto',
          maxHeight: '90vh',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          bgcolor: '#fff',
        },
      }}
    >
      <div className="px-5 pt-5 pb-6 overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-semibold text-brown m-0">记一笔食记</h2>
          <button
            onClick={() => setMealFormOpen(false)}
            className="text-xl text-muted bg-transparent border-none cursor-pointer p-1"
          >
            ×
          </button>
        </div>

        {/* 关联的订单摘要 */}
        {mealFormOrder && (
          <div className="mb-4 p-3 bg-cream rounded-[10px] text-sm text-brown">
            <b>{mealFormOrder.date}</b> · {mealFormOrder.menu.join('、')}
          </div>
        )}

        {/* 评分 */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-brown mb-1.5">
            这顿饭怎么样？
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setRating(n)}
                className="text-3xl bg-transparent border-none cursor-pointer p-1 transition-transform"
                style={{ color: n <= rating ? '#E88D5A' : '#D9CFC3' }}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* 和谁吃 */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-brown mb-1.5">
            和谁一起吃
          </label>
          <input
            type="text"
            value={who}
            onChange={(e) => setWho(e.target.value)}
            placeholder="如：一家三口 / 和朋友"
            maxLength={20}
            className="w-full px-3.5 py-2.5 border-[1.5px] border-cream-dark rounded-[10px] text-sm text-brown bg-white outline-none focus:border-coral placeholder:text-muted"
          />
        </div>

        {/* 点评 */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-brown mb-1.5">
            一句话点评
          </label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="如：下次多放点糖"
            maxLength={50}
            className="w-full px-3.5 py-2.5 border-[1.5px] border-cream-dark rounded-[10px] text-sm text-brown bg-white outline-none focus:border-coral placeholder:text-muted"
          />
        </div>

        {/* 照片 */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-brown mb-1.5">
            照片（选一张）
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-[16/10] border-2 border-dashed border-[#D4C4B0] rounded-card flex flex-col items-center justify-center cursor-pointer transition-colors"
            style={{ background: photo ? '#f5f0eb' : 'transparent' }}
          >
            {photo ? (
              <img src={photo} alt="食记" className="w-full h-full object-cover rounded-card" />
            ) : (
              <>
                <span className="text-4xl text-[#999]">📷</span>
                <span className="text-[13px] text-[#999] mt-1">点击上传</span>
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

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 rounded-btn text-white text-[15px] font-semibold cursor-pointer border-none"
          style={{ background: '#E88D5A' }}
        >
          保存食记
        </button>
      </div>
    </Drawer>
  );
}

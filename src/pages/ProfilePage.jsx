import React, { useState, useCallback } from 'react';
import Drawer from '@mui/material/Drawer';
import { useApp } from '../App';

export default function ProfilePage() {
  const { user, updateUser, banner, updateBanner } = useApp();

  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');

  const openEdit = useCallback((field, currentValue) => {
    setEditField(field);
    setEditValue(currentValue || '');
  }, []);

  const closeEdit = useCallback(() => {
    setEditField(null);
    setEditValue('');
  }, []);

  const handleSave = useCallback(() => {
    const trimmed = editValue.trim();
    if (!trimmed) {
      closeEdit();
      return;
    }
    if (editField === 'nickname') {
      updateUser({ nickname: trimmed });
    } else if (editField === 'kitchen') {
      updateUser({ kitchenName: trimmed });
    } else if (editField === 'avatar') {
      updateUser({ avatar: trimmed });
    }
    closeEdit();
  }, [editField, editValue, updateUser, closeEdit]);

  const handleBannerUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      updateBanner(evt.target.result);
    };
    reader.readAsDataURL(file);
  }, [updateBanner]);

  const avatarOptions = ['🦊', '🐱', '🐶', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🦄', '🐙', '🦀', '🦋', '🌸'];

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-5 pb-4 hide-scrollbar">
      <div className="flex flex-col items-center mb-8">
        <div
          onClick={() => openEdit('avatar', user.avatar)}
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-4xl cursor-pointer mb-3"
          style={{ background: 'linear-gradient(135deg, #E88D5A, #F5C4A1)' }}
        >
          {user.avatar || '🦊'}
        </div>
        <div className="text-base font-semibold text-brown text-center">{user.nickname || '今天吃什么呀'}</div>
        <div className="text-xs text-brown-light text-center mt-1">{user.kitchenName || '我的厨房'}</div>
      </div>

      <div
        onClick={() => openEdit('nickname', user.nickname)}
        className="flex justify-between items-center py-4 border-b border-cream text-sm text-brown cursor-pointer"
      >
        <span>昵称设置</span>
        <span className="flex items-center gap-2">
          <span className="text-xs text-muted">{user.nickname || '今天吃什么呀'}</span>
          <span className="text-base text-muted">›</span>
        </span>
      </div>

      <div
        onClick={() => openEdit('kitchen', user.kitchenName)}
        className="flex justify-between items-center py-4 border-b border-cream text-sm text-brown cursor-pointer"
      >
        <span>厨房名称</span>
        <span className="flex items-center gap-2">
          <span className="text-xs text-muted">{user.kitchenName || '我的厨房'}</span>
          <span className="text-base text-muted">›</span>
        </span>
      </div>

      <div
        onClick={() => openEdit('avatar', user.avatar)}
        className="flex justify-between items-center py-4 border-b border-cream text-sm text-brown cursor-pointer"
      >
        <span>头像更换</span>
        <span className="text-base text-muted">›</span>
      </div>

      <label className="flex justify-between items-center py-4 border-b border-cream text-sm text-brown cursor-pointer">
        <span>首页头图</span>
        <span className="flex items-center gap-2">
          {banner ? (
            <span className="text-xs text-coral">已设置</span>
          ) : (
            <span className="text-xs text-muted">未设置</span>
          )}
          <span className="text-base text-muted">›</span>
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleBannerUpload}
        />
      </label>

      {banner && (
        <div className="mt-2 mb-2 rounded-card overflow-hidden aspect-[4/1] bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }} />
      )}

      <div className="flex justify-between items-center py-4 border-b border-cream text-sm text-brown">
        <span>关于今天吃什么</span>
        <span className="text-xs text-muted">v1.0</span>
      </div>

      <Drawer
        anchor="bottom"
        open={!!editField}
        onClose={closeEdit}
        PaperProps={{
          sx: {
            maxWidth: 430,
            mx: 'auto',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            bgcolor: '#fff',
          },
        }}
      >
        <div className="px-5 pt-5 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-semibold text-brown m-0">
              {editField === 'nickname' ? '昵称设置' : editField === 'kitchen' ? '厨房名称' : '头像更换'}
            </h2>
            <button
              onClick={closeEdit}
              className="text-xl text-muted bg-transparent border-none cursor-pointer p-1"
            >
              ×
            </button>
          </div>

          {editField === 'avatar' ? (
            <div>
              <div className="flex justify-center mb-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-5xl"
                  style={{ background: 'linear-gradient(135deg, #E88D5A, #F5C4A1)' }}
                >
                  {editValue || '🦊'}
                </div>
              </div>
              <div className="grid grid-cols-5 gap-3 mb-6">
                {avatarOptions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setEditValue(emoji)}
                    className="w-full aspect-square rounded-xl flex items-center justify-center text-2xl cursor-pointer border-2 transition-all bg-transparent"
                    style={{
                      borderColor: editValue === emoji ? '#E88D5A' : '#F5ECE1',
                      background: editValue === emoji ? '#FFF5EE' : '#fff',
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <button
                onClick={handleSave}
                className="w-full py-3.5 rounded-btn text-white text-[15px] font-semibold cursor-pointer border-none"
                style={{ background: '#E88D5A' }}
              >
                保存
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={editField === 'nickname' ? '请输入昵称' : '请输入厨房名称'}
                maxLength={20}
                autoFocus
                className="w-full px-3.5 py-2.5 border-[1.5px] border-cream-dark rounded-[10px] text-sm text-brown bg-white outline-none focus:border-coral placeholder:text-muted mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={closeEdit}
                  className="flex-1 py-2.5 rounded-btn text-sm font-semibold cursor-pointer bg-white text-coral border-[1.5px] border-coral"
                >
                  取消
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-2.5 rounded-btn text-sm font-semibold cursor-pointer border-none text-white"
                  style={{ background: '#E88D5A' }}
                >
                  保存
                </button>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}

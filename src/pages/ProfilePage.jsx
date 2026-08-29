import React, { useState, useCallback, useRef } from 'react';
import Drawer from '@mui/material/Drawer';
import { useApp } from '../App';
import { BUILTIN_BANNERS, resolveBanner } from '../data/store';

export default function ProfilePage() {
  const { user, updateUser, banner, updateBanner } = useApp();

  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [bannerSheetOpen, setBannerSheetOpen] = useState(false);
  const fileInputRef = useRef(null);
  const avatarFileInputRef = useRef(null);

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
    e.target.value = ''; // 允许再次选择同一文件
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      updateBanner(evt.target.result);
      setBannerSheetOpen(false);
    };
    reader.readAsDataURL(file);
  }, [updateBanner]);

  // 头像图片上传：dataURL 存入 user.avatar
  const handleAvatarUpload = useCallback((e) => {
    const file = e.target.files[0];
    e.target.value = ''; // 允许再次选择同一文件
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      updateUser({ avatar: evt.target.result });
      closeEdit();
    };
    reader.readAsDataURL(file);
  }, [updateUser, closeEdit]);

  // 是否为图片头像（dataURL 开头）；否则按 emoji 渲染
  const isImageAvatar = typeof user.avatar === 'string' && user.avatar.startsWith('data:image');

  const pickBuiltin = useCallback((id) => {
    updateBanner(`builtin:${id}`);
    setBannerSheetOpen(false);
  }, [updateBanner]);

  const avatarOptions = ['🦊', '🐱', '🐶', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🦄', '🐙', '🦀', '🦋', '🌸'];

  // 当前选中的内置 id（用于高亮）
  const currentBuiltinId = (() => {
    if (typeof banner === 'string' && banner.startsWith('builtin:')) {
      return parseInt(banner.slice('builtin:'.length), 10);
    }
    return null;
  })();
  const previewSrc = resolveBanner(banner);

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-5 pb-4 hide-scrollbar">
      <div className="flex flex-col items-center mb-8">
        <div
          onClick={() => openEdit('avatar', user.avatar)}
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-4xl cursor-pointer mb-3 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #E88D5A, #F5C4A1)' }}
        >
          {isImageAvatar ? (
            <img src={user.avatar} alt="头像" className="w-full h-full object-cover" />
          ) : (
            (user.avatar || '🦊')
          )}
        </div>
        <div className="text-base font-semibold text-brown text-center">{user.nickname || '今天吃什么呀'}</div>
        <div className="text-xs text-brown-light text-center mt-1">{user.kitchenName || '我家小厨'}</div>
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
          <span className="text-xs text-muted">{user.kitchenName || '我家小厨'}</span>
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

      <div
        onClick={() => setBannerSheetOpen(true)}
        className="flex justify-between items-center py-4 border-b border-cream text-sm text-brown cursor-pointer"
      >
        <span>首页头图</span>
        <span className="flex items-center gap-2">
          {currentBuiltinId ? (
            <span className="text-xs text-coral">内置 {currentBuiltinId}</span>
          ) : (
            <span className="text-xs text-coral">已自定义</span>
          )}
          <span className="text-base text-muted">›</span>
        </span>
      </div>

      {previewSrc && (
        <div
          className="mt-2 mb-2 rounded-card overflow-hidden aspect-[4/1] bg-cover bg-center"
          style={{ backgroundImage: `url(${previewSrc})` }}
        />
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
                  className="w-20 h-20 rounded-full flex items-center justify-center text-5xl overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #E88D5A, #F5C4A1)' }}
                >
                  {typeof editValue === 'string' && editValue.startsWith('data:image') ? (
                    <img src={editValue} alt="头像" className="w-full h-full object-cover" />
                  ) : (
                    (editValue || '🦊')
                  )}
                </div>
              </div>

              {/* 上传图片头像 */}
              <div
                onClick={() => avatarFileInputRef.current?.click()}
                className="rounded-xl border-[1.5px] border-dashed border-cream-dark py-3 text-center cursor-pointer mb-5"
              >
                <div className="text-sm text-brown">📷 上传图片头像</div>
                <div className="text-[11px] text-muted mt-0.5">支持 jpg / png</div>
              </div>
              <input
                ref={avatarFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />

              <div className="text-xs text-muted mb-3">或选择可爱 emoji：</div>
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
                placeholder={editField === 'nickname' ? '请输入昵称' : '请输入厨房名称（最多8字）'}
                maxLength={editField === 'nickname' ? 20 : 8}
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

      {/* 头图选择弹层 */}
      <Drawer
        anchor="bottom"
        open={bannerSheetOpen}
        onClose={() => setBannerSheetOpen(false)}
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
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[17px] font-semibold text-brown m-0">选择首页头图</h2>
            <button
              onClick={() => setBannerSheetOpen(false)}
              className="text-xl text-muted bg-transparent border-none cursor-pointer p-1"
            >
              ×
            </button>
          </div>
          <p className="text-xs text-muted mb-4">5 张内置头图（不会随你的操作减少），也可上传自定义</p>

          {/* 内置头图网格 */}
          <div className="grid grid-cols-1 gap-2 mb-4">
            {BUILTIN_BANNERS.map((b) => {
              const selected = currentBuiltinId === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => pickBuiltin(b.id)}
                  className="relative rounded-card overflow-hidden cursor-pointer border-2"
                  style={{
                    borderColor: selected ? '#E88D5A' : 'transparent',
                    aspectRatio: '4 / 1',
                    backgroundImage: `url(${b.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {selected && (
                    <div
                      className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[11px] text-white"
                      style={{ background: '#E88D5A' }}
                    >
                      当前
                    </div>
                  )}
                  <div
                    className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[11px] text-white"
                    style={{ background: 'rgba(0,0,0,0.45)' }}
                  >
                    {b.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 自定义上传 */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="rounded-card border-[1.5px] border-dashed border-cream-dark py-4 text-center cursor-pointer mb-3"
            style={{ borderColor: currentBuiltinId == null ? '#E88D5A' : '#E5D9C8' }}
          >
            <div className="text-2xl mb-1">📷</div>
            <div className="text-sm text-brown">上传自定义头图</div>
            <div className="text-[11px] text-muted mt-1">支持 jpg / png，建议 4:1 横幅</div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBannerUpload}
          />
        </div>
      </Drawer>
    </div>
  );
}

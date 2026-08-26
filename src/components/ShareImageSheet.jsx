import React from 'react';
import Drawer from '@mui/material/Drawer';
import { useApp } from '../App';
import { buildShareText } from '../utils/shareImage';

/**
 * 兜底复制文本（clipboard API 不可用时）
 * @param {string} text
 * @returns {boolean} 是否复制成功
 */
function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch (e) {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

/**
 * 分享菜单弹窗
 * 展示生成的卡片图，支持分享图片到微信 / 复制文字 / 长按保存
 */
export default function ShareImageSheet() {
  const {
    shareImage,
    shareImageOpen,
    setShareImageOpen,
    shareOrderData,
    showToast,
  } = useApp();

  if (!shareImage) return null;

  // 分享图片到微信
  const handleShareImage = async () => {
    if (!shareImage) return;

    // 不支持 Web Share API 时提示
    if (!navigator.share) {
      showToast('当前浏览器不支持直接分享图片，请长按图片保存或复制文字');
      return;
    }

    // dataURL → File
    let file;
    try {
      const blob = await fetch(shareImage).then((r) => r.blob());
      file = new File([blob], '菜单.png', { type: 'image/png' });
    } catch (e) {
      showToast('分享失败，可长按图片保存');
      return;
    }

    // 优先走文件分享
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: '我家小厨' });
        // 分享成功，不额外提示
      } catch (e) {
        // 用户取消分享（AbortError）不视为失败
        if (e && e.name === 'AbortError') return;
        showToast('分享失败，可长按图片保存');
      }
    } else {
      showToast('分享失败，可长按图片保存');
    }
  };

  // 复制文字
  const handleCopyText = async () => {
    if (!shareOrderData) return;
    const text = buildShareText(shareOrderData);

    let ok = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch (e) {
        ok = fallbackCopyText(text);
      }
    } else {
      ok = fallbackCopyText(text);
    }

    showToast(ok ? '已复制到剪贴板，去微信粘贴即可' : '复制失败，请长按手动复制');
  };

  return (
    <Drawer
      anchor="bottom"
      open={shareImageOpen}
      onClose={() => setShareImageOpen(false)}
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
          <h2 className="text-[17px] font-semibold text-brown m-0">分享菜单</h2>
          <button
            onClick={() => setShareImageOpen(false)}
            className="text-xl text-muted bg-transparent border-none cursor-pointer p-1"
          >
            ×
          </button>
        </div>

        {/* 卡片图 */}
        <img
          src={shareImage}
          alt="分享菜单卡片"
          className="w-full rounded-[12px] block"
        />

        {/* 提示 */}
        <div className="text-center text-xs text-muted mt-2 mb-4">
          长按图片可保存到相册
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-3">
          <button
            onClick={handleShareImage}
            className="flex-1 py-3 rounded-btn text-sm font-semibold cursor-pointer border-none text-white"
            style={{ background: '#E88D5A' }}
          >
            分享图片
          </button>
          <button
            onClick={handleCopyText}
            className="flex-1 py-3 rounded-btn text-sm font-semibold cursor-pointer bg-white text-coral border-[1.5px] border-coral"
          >
            复制文字
          </button>
        </div>
      </div>
    </Drawer>
  );
}

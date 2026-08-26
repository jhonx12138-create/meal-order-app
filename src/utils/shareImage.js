/**
 * 分享图片生成工具
 * Share image generation utilities
 *
 * 提供两个函数：
 *  - buildShareText(order)：生成可复制到微信的纯文本
 *  - generateShareImage(order)：用离屏 canvas 把订单渲染成暖色卡片图，返回 dataURL
 */

// 统一的字体栈，与全局 theme 保持一致
const FONT_FAMILY = '-apple-system,"PingFang SC","Microsoft YaHei",sans-serif';

/**
 * 生成分享纯文本
 * @param {object} order 订单对象 { id, date, menu: string[], groups: { 分类: [{name, amount, checked}] } }
 * @returns {string} 分享文本
 */
export function buildShareText(order) {
  if (!order) return '';

  const menuLines = (order.menu || []).map((name) => '  · ' + name).join('\n');
  let text = `今日菜单：\n${menuLines}\n\n采购清单：\n`;

  Object.entries(order.groups || {}).forEach(([cat, items]) => {
    text += `【${cat}】\n`;
    (items || []).forEach((item) => {
      text += `  ${item.checked ? '✓' : '□'} ${item.name} ${item.amount}\n`;
    });
  });

  text += '\n来自「我家小厨」';
  return text;
}

/**
 * 在 canvas 上绘制圆角矩形路径（不调用 fill/stroke，由调用方决定）
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {number} r 圆角半径
 */
function roundRectPath(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

/**
 * 生成订单分享卡片图
 * @param {object} order 订单对象
 * @returns {Promise<string>} 解析为 PNG dataURL
 */
export function generateShareImage(order) {
  return new Promise((resolve) => {
    const WIDTH = 750; // 2x 画布，对应逻辑宽 375px
    const PADDING = 40; // 左右内边距
    const CONTENT_X = PADDING;
    const CONTENT_WIDTH = WIDTH - PADDING * 2;

    // 先在一个"足够高"的离屏画布上绘制，最后裁剪出实际高度
    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = 9000;
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    // 背景
    ctx.fillStyle = '#FFFAF5';
    ctx.fillRect(0, 0, WIDTH, canvas.height);

    let y = 44; // 顶部内边距

    // ── 顶部主标题 ──
    ctx.font = `bold 44px ${FONT_FAMILY}`;
    ctx.fillStyle = '#E88D5A';
    ctx.fillText('我家小厨', CONTENT_X, y);
    y += 60;

    // ── 日期 ──
    ctx.font = `28px ${FONT_FAMILY}`;
    ctx.fillStyle = '#8B7355';
    ctx.fillText(order.date || '', CONTENT_X, y);
    y += 40;

    // ── 分隔线 ──
    y += 16;
    ctx.strokeStyle = '#F0E6DA';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(CONTENT_X, y);
    ctx.lineTo(CONTENT_X + CONTENT_WIDTH, y);
    ctx.stroke();
    y += 28;

    // ── 小节标题：今日菜单 ──
    ctx.font = `bold 32px ${FONT_FAMILY}`;
    ctx.fillStyle = '#4A3728';
    ctx.fillText('今日菜单', CONTENT_X, y);
    y += 48;

    // ── 菜单 chips（横向自动换行） ──
    const CHIP_TEXT_SIZE = 26;
    const CHIP_PADDING_X = 14;
    const CHIP_HEIGHT = 54;
    const CHIP_GAP = 14;
    ctx.font = `26px ${FONT_FAMILY}`;
    let chipX = CONTENT_X;
    let chipY = y;

    (order.menu || []).forEach((name) => {
      const textWidth = ctx.measureText(name).width;
      const chipWidth = textWidth + CHIP_PADDING_X * 2;

      // 超出右边界则换行
      if (chipX + chipWidth > CONTENT_X + CONTENT_WIDTH && chipX !== CONTENT_X) {
        chipX = CONTENT_X;
        chipY += CHIP_HEIGHT + CHIP_GAP;
      }

      // 圆角矩形背景
      ctx.fillStyle = '#F5ECE1';
      roundRectPath(ctx, chipX, chipY, chipWidth, CHIP_HEIGHT, 16);
      ctx.fill();

      // 文字垂直居中
      ctx.fillStyle = '#4A3728';
      ctx.fillText(name, chipX + CHIP_PADDING_X, chipY + (CHIP_HEIGHT - CHIP_TEXT_SIZE) / 2);

      chipX += chipWidth + CHIP_GAP;
    });
    y = chipY + CHIP_HEIGHT;

    // ── 分隔线 ──
    y += 24;
    ctx.strokeStyle = '#F0E6DA';
    ctx.beginPath();
    ctx.moveTo(CONTENT_X, y);
    ctx.lineTo(CONTENT_X + CONTENT_WIDTH, y);
    ctx.stroke();
    y += 28;

    // ── 小节标题：采购清单 ──
    ctx.font = `bold 32px ${FONT_FAMILY}`;
    ctx.fillStyle = '#4A3728';
    ctx.fillText('采购清单', CONTENT_X, y);
    y += 48;

    // ── 分组与明细 ──
    const ITEM_LINE_HEIGHT = 48;
    const CHECK_OFFSET = 40; // 名称相对勾选符号的横向偏移

    Object.entries(order.groups || {}).forEach(([catName, items]) => {
      // 分类名
      ctx.font = `bold 30px ${FONT_FAMILY}`;
      ctx.fillStyle = '#E8795B';
      ctx.fillText(catName, CONTENT_X, y);
      y += 44;

      // 每项一行
      ctx.font = `26px ${FONT_FAMILY}`;
      (items || []).forEach((item) => {
        // 勾选符号
        ctx.fillStyle = item.checked ? '#7BC67E' : '#C4B998';
        ctx.fillText(item.checked ? '✓' : '□', CONTENT_X, y);

        // 名称
        ctx.fillStyle = '#4A3728';
        ctx.fillText(item.name, CONTENT_X + CHECK_OFFSET, y);

        // 用量（右对齐）
        ctx.textAlign = 'right';
        ctx.fillStyle = '#8B7355';
        ctx.fillText(item.amount, CONTENT_X + CONTENT_WIDTH, y);
        ctx.textAlign = 'left';

        y += ITEM_LINE_HEIGHT;
      });

      y += 16; // 分组之间的间隔
    });

    // ── 底部署名 ──
    y += 28; // 分组后额外留白，合计接近 44px
    ctx.font = `24px ${FONT_FAMILY}`;
    ctx.fillStyle = '#8B7355';
    ctx.textAlign = 'center';
    ctx.fillText('—— 来自『我家小厨』', WIDTH / 2, y);
    ctx.textAlign = 'left';
    y += 36;

    // ── 裁剪出实际高度 ──
    const finalHeight = Math.ceil(y) + 44;
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = WIDTH;
    finalCanvas.height = finalHeight;
    const finalCtx = finalCanvas.getContext('2d');
    finalCtx.drawImage(canvas, 0, 0, WIDTH, finalHeight, 0, 0, WIDTH, finalHeight);

    resolve(finalCanvas.toDataURL('image/png'));
  });
}

import React from 'react';
import { useApp } from '../App';

const ICON = (file) => import.meta.env.BASE_URL + 'icons/' + file;

const tabConfig = [
  { key: 'order', icon: ICON('order.png'), label: '点菜' },
  { key: 'meal', icon: ICON('meal.png'), label: '食记' },
  { key: 'kitchen', icon: ICON('recipe.png'), label: '菜谱' },
  { key: 'profile', icon: ICON('profile.png'), label: '我的' },
];

export default function TabBar() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="flex bg-white border-t border-cream flex-shrink-0 safe-bottom">
      {tabConfig.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex flex-col items-center flex-1 py-1.5 gap-0.5 transition-colors duration-200 border-none bg-transparent cursor-pointer"
            style={{ color: isActive ? '#E88D5A' : '#C4B998' }}
          >
            <img
              src={tab.icon}
              alt={tab.label}
              className="w-8 h-8 object-contain"
              style={{ opacity: isActive ? 1 : 0.55 }}
            />
            <span className="text-[12px] font-medium leading-none">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

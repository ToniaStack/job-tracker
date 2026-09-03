import { STATUS_OPTIONS } from '../utils/helpers';

const TABS = ['All', ...STATUS_OPTIONS];

export default function FilterTabs({ active, onChange, counts }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mb-1 scrollbar-none">
      {TABS.map((tab) => {
        const isActive = active?.toLowerCase() === tab.toLowerCase();

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
              isActive
                ? 'bg-primary-purple text-white border-primary-purple shadow-sm shadow-primary-purple/20'
                : 'bg-surface-card text-text-secondary border-border-main hover:border-light-purple hover:text-text-primary'
            }`}
          >
            <span>{tab}</span>
            {typeof counts?.[tab] === 'number' && (
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-surface-main text-text-muted'
                }`}
              >
                {counts[tab]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
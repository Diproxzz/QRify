import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  LayoutGrid,
  Briefcase,
  GraduationCap,
  Utensils,
  ShoppingBag,
  Ticket,
  Share2,
  Compass,
  Heart,
  PenTool,
  Search,
  Check,
} from 'lucide-react';
import type { SceneTemplate, SceneCategory } from '../types/qr';
import { SCENE_CATEGORIES, ALL_SCENE_TEMPLATES } from '../templates/sceneTemplates';
import { SceneRenderer } from './SceneRenderer';
import { animateTabIndicator } from '../lib/animeHelper';

const categoryIcons: Record<string, React.FC<{ className?: string }>> = {
  LayoutGrid,
  Briefcase,
  GraduationCap,
  Utensils,
  ShoppingBag,
  Ticket,
  Share2,
  Compass,
  Heart,
  PenTool,
};

interface TemplateGalleryProps {
  selectedTemplateId: string;
  onSelectTemplate: (template: SceneTemplate) => void;
  qrSvgHtml: string;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  selectedTemplateId,
  onSelectTemplate,
  qrSvgHtml,
}) => {
  const [activeCategory, setActiveCategory] = useState<SceneCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  // Position animated underline
  useEffect(() => {
    if (activeTabRef.current && tabsContainerRef.current) {
      const tabRect = activeTabRef.current.getBoundingClientRect();
      const containerRect = tabsContainerRef.current.getBoundingClientRect();
      const left = tabRect.left - containerRect.left;
      const width = tabRect.width;

      animateTabIndicator(indicatorRef.current, left, width);
    }
  }, [activeCategory]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return ALL_SCENE_TEMPLATES.filter((template) => {
      const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 shadow-premium dark:shadow-premium-dark border border-slate-200/80 dark:border-slate-800 transition-all duration-200">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80 gap-3 mb-5">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Illustrated Scene Gallery
            </h2>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
              {ALL_SCENE_TEMPLATES.length} Illustrated Scenes
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Every template is a crafted marketing illustration with your live QR seamlessly placed inside.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scenes (e.g. coffee, envelope)..."
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="relative mb-6">
        <div
          ref={tabsContainerRef}
          className="relative flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100 dark:border-slate-800"
        >
          {SCENE_CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat.iconName] || LayoutGrid;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                ref={isActive ? activeTabRef : null}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50/70 dark:bg-brand-950/40'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
          {/* Sliding underline */}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-0.5 bg-brand-600 dark:bg-brand-400 rounded-full transition-all"
            style={{ width: 0 }}
          />
        </div>
      </div>

      {/* Responsive Grid with Varied Aspect Ratios */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          return (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className={`group relative flex flex-col justify-between p-3.5 rounded-3xl cursor-pointer transition-all duration-300 border ${
                isSelected
                  ? 'bg-brand-50/40 dark:bg-brand-950/20 border-brand-500 shadow-glow-md ring-2 ring-brand-500/30 -translate-y-1'
                  : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700/60 hover:-translate-y-1.5 hover:shadow-lg'
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 bg-brand-600 text-white rounded-full shadow-md z-10 animate-in zoom-in-50 duration-200">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}

              {/* Category Pill Tag */}
              <div className="w-full flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                <span className="truncate max-w-[90px]">{template.category}</span>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: template.palette.accent }}
                />
              </div>

              {/* Full Live Scene Miniature Preview */}
              <div className="w-full aspect-[4/5] flex items-center justify-center p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
                <SceneRenderer
                  template={template}
                  qrSvgHtml={qrSvgHtml}
                  textValues={{}}
                  isAnimated={false}
                  className="max-h-full max-w-full"
                />
              </div>

              {/* Template Title & Caption */}
              <div className="w-full mt-3 text-center">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {template.name}
                </h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                  {template.textSlots[0]?.defaultText || template.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            No scenes found matching "{searchQuery}"
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-2 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

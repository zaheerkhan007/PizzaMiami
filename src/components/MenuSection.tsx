'use client';

import { useState, useRef } from 'react';
import { Plus, Star, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { menuItems, categories, MenuItem, getSizeOptions, getMinPrice, hasSizes, formatPrice } from '@/lib/menu-data';
import { useCart, cartKey } from '@/lib/cart-context';

// ─── Size picker modal ────────────────────────────────────────────────────────
function SizePicker({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { addItem } = useCart();
  const sizes = getSizeOptions(item.price);
  const [selected, setSelected] = useState(0);
  const [qty, setQty] = useState(1);

  const chosen = sizes[selected];
  const lineTotal = Math.round(chosen.price * qty * 100) / 100;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(item, chosen.label, chosen.price);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}>
      <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <span style={{ fontSize: '40px' }}>{item.emoji}</span>
            <div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '17px', color: 'var(--text)', lineHeight: 1.3 }}>{item.name}</h3>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>{item.description}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--border)', color: 'var(--muted)' }}>
            <X size={15} />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Size options */}
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: '10px' }}>
              SELECT SIZE
            </p>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(sizes.length, 3)}, 1fr)` }}>
              {sizes.map((s, i) => (
                <button key={i} onClick={() => setSelected(i)}
                  className="py-3 px-2 rounded-xl flex flex-col items-center gap-1 transition-all duration-200"
                  style={selected === i
                    ? { background: 'linear-gradient(135deg, var(--red), var(--orange))', color: 'white', border: '2px solid transparent' }
                    : { background: 'var(--card2)', border: '2px solid var(--border)', color: 'var(--muted)' }}>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '14px' }}>{s.label}</span>
                  <span style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '18px', color: selected === i ? 'rgba(255,255,255,0.9)' : 'var(--text)' }}>
                    {formatPrice(s.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: '10px' }}>
              QUANTITY
            </p>
            <div className="flex items-center gap-4">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold transition-colors"
                style={{ background: 'var(--card2)', border: '1px solid var(--border)', color: qty === 1 ? 'var(--border)' : 'var(--text)' }}>
                −
              </button>
              <span style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '28px', minWidth: '32px', textAlign: 'center', color: 'var(--text)' }}>
                {qty}
              </span>
              <button onClick={() => setQty(q => Math.min(20, q + 1))}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold"
                style={{ background: 'linear-gradient(135deg, var(--red), var(--orange))', color: 'white' }}>
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button onClick={handleAdd}
            className="w-full py-4 rounded-2xl btn-primary text-base"
            style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>
            <Check size={18} />
            Add to Order · {formatPrice(lineTotal)}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Menu card ────────────────────────────────────────────────────────────────
function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [showPicker, setShowPicker] = useState(false);
  const [flash, setFlash] = useState(false);

  const sizes = getSizeOptions(item.price);
  const minPrice = getMinPrice(item.price);
  const multi = hasSizes(item.price) && sizes.length > 1;

  const handleClick = () => {
    if (multi) {
      setShowPicker(true);
    } else {
      addItem(item, sizes[0].label, sizes[0].price);
      setFlash(true);
      setTimeout(() => setFlash(false), 1000);
    }
  };

  return (
    <>
      <div className="menu-card rounded-2xl overflow-hidden flex flex-col cursor-pointer group"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        onClick={handleClick}>

        {/* Emoji zone */}
        <div className="relative flex items-center justify-center py-6"
          style={{ background: 'linear-gradient(135deg, rgba(232,25,44,0.06), rgba(255,107,0,0.06))' }}>
          <span className="transition-transform duration-300 group-hover:scale-110 block"
            style={{ fontSize: '56px', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))' }}>
            {item.emoji}
          </span>
          {item.popular && (
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{ background: 'linear-gradient(135deg, var(--yellow), var(--orange))', fontSize: '9px', fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#111', letterSpacing: '0.05em' }}>
              <Star size={8} fill="currentColor" /> HOT
            </div>
          )}
          {multi && (
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)', fontSize: '9px', fontFamily: 'DM Sans, sans-serif', color: 'var(--muted)', letterSpacing: '0.05em' }}>
              {sizes.length} sizes
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--text)', lineHeight: 1.35, marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {item.name}
          </h3>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'var(--muted)', lineHeight: 1.5, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '12px' }}>
            {item.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.05em' }}>
                {multi ? 'FROM' : 'PRICE'}
              </div>
              <div className="gradient-text" style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '22px', lineHeight: 1 }}>
                {formatPrice(minPrice)}
              </div>
            </div>

            <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{ background: flash ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'linear-gradient(135deg,var(--red),var(--orange))' }}>
              {flash ? <Check size={15} color="white" /> : <Plus size={15} color="white" />}
            </div>
          </div>
        </div>
      </div>

      {showPicker && <SizePicker item={item} onClose={() => setShowPicker(false)} />}
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('pizza');
  const tabsRef = useRef<HTMLDivElement>(null);

  const filtered = menuItems.filter(i => i.category === activeCategory);
  const activeCat = categories.find(c => c.id === activeCategory);

  const scrollTabs = (dir: 'l' | 'r') => {
    tabsRef.current?.scrollBy({ left: dir === 'l' ? -280 : 280, behavior: 'smooth' });
  };

  return (
    <section id="menu" className="section-full py-0" style={{ background: 'var(--dark)' }}>

      {/* ── Section header — full bleed ── */}
      <div className="section-inner pt-20 pb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,transparent,rgba(232,25,44,0.5))' }} />
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.22em', color: 'var(--red)' }}>OUR MENU</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg,rgba(232,25,44,0.5),transparent)' }} />
        </div>
        <h2 className="text-center" style={{ fontFamily: 'Bebas Neue, cursive', fontSize: 'clamp(52px, 8vw, 100px)', lineHeight: 0.92 }}>
          <span style={{ color: 'var(--text)' }}>What Are You </span>
          <span className="gradient-text">Craving?</span>
        </h2>
      </div>

      {/* ── Category tabs — full bleed with sticky ── */}
      <div className="sticky top-20 z-30 py-3"
        style={{ background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="relative section-inner">
          {/* Left arrow */}
          <button onClick={() => scrollTabs('l')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center sm:hidden"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <ChevronLeft size={14} />
          </button>

          <div ref={tabsRef}
            className="flex gap-2 overflow-x-auto px-9 sm:px-0 sm:flex-wrap"
            style={{ scrollbarWidth: 'none' }}>
            {categories.map(cat => {
              const active = cat.id === activeCategory;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-200 whitespace-nowrap"
                  style={active
                    ? { background: 'linear-gradient(135deg,var(--red),var(--orange))', color: 'white', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', boxShadow: '0 4px 18px rgba(232,25,44,0.45)' }
                    : { background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--muted)', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '12px' }}>
                  <span style={{ fontSize: '14px' }}>{cat.emoji}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>

          <button onClick={() => scrollTabs('r')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center sm:hidden"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Items — full bleed grid ── */}
      <div className="section-inner py-10">

        {/* Info banners */}
        {(activeCategory === 'pizza' || activeCategory === 'garlic-bread') && (
          <div className="mb-8 p-4 rounded-2xl flex items-start gap-3"
            style={{ background: 'rgba(255,214,0,0.06)', border: '1px solid rgba(255,214,0,0.2)' }}>
            <span style={{ fontSize: '22px', flexShrink: 0 }}>ℹ️</span>
            <div>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--yellow)' }}>
                {activeCategory === 'pizza' ? 'Pizza Sizes: 10" · 12" · 14"' : 'Available in 10" · 12" · 14"'}
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--muted)', marginTop: '2px' }}>
                Tap any item to choose your size and quantity. {activeCategory === 'pizza' ? 'Extra toppings from 70p — mention when ordering.' : ''}
              </p>
            </div>
          </div>
        )}

        {/* Active category title */}
        <div className="flex items-center gap-4 mb-6">
          <span style={{ fontSize: '32px' }}>{activeCat?.emoji}</span>
          <h3 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text)' }}>
            {activeCat?.label}
          </h3>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--muted)', marginTop: '4px' }}>
            ({filtered.length} items)
          </span>
        </div>

        {/* Grid — more columns, bigger cards on wide screens */}
        <div className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(160px, 100%), 1fr))' }}>
          {filtered.map(item => <MenuCard key={item.id} item={item} />)}
        </div>

        {/* Allergy note */}
        <div className="mt-10 py-4 px-5 rounded-2xl flex items-center gap-3"
          style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <span style={{ fontSize: '20px' }}>⚠️</span>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--muted)' }}>
            If you suffer from any food allergy or intolerance, please let us know <strong style={{ color: 'var(--text)' }}>before</strong> you place your order.
          </p>
        </div>
      </div>
    </section>
  );
}

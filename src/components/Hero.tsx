'use client';

import { useEffect, useState } from 'react';
import { Clock, MapPin, Phone, ArrowRight } from 'lucide-react';

const ITEMS = [
  { emoji: '🍕', label: 'Fresh Pizza', x: 8, y: 12, size: 90, delay: 0 },
  { emoji: '🍔', label: 'Burgers', x: 78, y: 8, size: 70, delay: 0.8 },
  { emoji: '🍗', label: 'Peri Peri', x: 88, y: 55, size: 80, delay: 1.4 },
  { emoji: '🥙', label: 'Kebabs', x: 72, y: 82, size: 65, delay: 0.4 },
  { emoji: '🍟', label: 'Fries', x: 5, y: 72, size: 60, delay: 1.8 },
  { emoji: '🌯', label: 'Wraps', x: 55, y: 6, size: 55, delay: 1.1 },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  return (
    <section
      className="section-full relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--dark)' }}
    >
      {/* Full-bleed background glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 70% at 30% 50%, rgba(232,25,44,0.1) 0%, transparent 65%),
          radial-gradient(ellipse 50% 60% at 80% 30%, rgba(255,107,0,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 40% 50% at 60% 90%, rgba(255,214,0,0.04) 0%, transparent 55%)`
      }} />

      {/* Huge grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      {/* Right-side diagonal stripes */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none" style={{
        background: 'repeating-linear-gradient(-55deg, rgba(232,25,44,0.03), rgba(232,25,44,0.03) 2px, transparent 2px, transparent 30px)'
      }} />

      {/* Floating food items — absolutely positioned all over the screen */}
      {mounted && ITEMS.map((item, i) => (
        <div key={i} className="absolute pointer-events-none select-none" style={{
          left: `${item.x}%`,
          top: `${item.y}%`,
          fontSize: `${item.size}px`,
          opacity: 0.07,
          animation: `float ${5 + i * 0.7}s ease-in-out infinite`,
          animationDelay: `${item.delay}s`,
          filter: 'drop-shadow(0 0 30px rgba(232,25,44,0.3))',
        }}>
          {item.emoji}
        </div>
      ))}

      {/* MAIN CONTENT — full width, edge padding only */}
      <div className="section-inner relative z-10 flex flex-col justify-center min-h-screen pt-24 pb-32">

        {/* Top badge */}
        <div className={`mb-10 ${mounted ? 'reveal-up delay-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{ background: 'rgba(232,25,44,0.12)', border: '1px solid rgba(232,25,44,0.35)' }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: 'var(--red)', animation: 'pulse-dot 1.5s infinite' }} />
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.2em', color: 'var(--red)' }}>
              OPEN NOW · DELIVERING ACROSS LIVERPOOL
            </span>
          </div>
        </div>

        {/* Giant heading — truly massive, edge-to-edge feel */}
        <div className={`${mounted ? 'reveal-up delay-200' : 'opacity-0'}`}>
          <h1 style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: 'clamp(100px, 18vw, 240px)',
            lineHeight: '0.88',
            letterSpacing: '-0.01em',
          }}>
            <span style={{ color: 'var(--text)', display: 'block' }}>PIZZA</span>
            <span className="gradient-text" style={{ display: 'block' }}>MIAMI</span>
          </h1>
        </div>

        {/* Divider line + tagline */}
        <div className={`flex items-center gap-6 mt-8 mb-10 ${mounted ? 'reveal-up delay-300' : 'opacity-0'}`}>
          <div className="h-px flex-none w-16" style={{ background: 'var(--red)' }} />
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(16px, 2.2vw, 22px)', color: 'rgba(245,240,232,0.6)', lineHeight: 1.5, maxWidth: '620px' }}>
            Liverpool's freshest pizza, fiery peri peri chicken, loaded burgers, kebabs & more.
            Order direct — 20% cheaper than Just Eat.
          </p>
        </div>

        {/* CTA row */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-16 ${mounted ? 'reveal-up delay-400' : 'opacity-0'}`}>
          <a href="#menu" className="btn-primary px-10 py-5 rounded-2xl text-lg group">
            <span>🍕</span>
            <span>Order Now</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="tel:01512601770"
            className="px-10 py-5 rounded-2xl border flex items-center gap-3 transition-all duration-300 hover:border-red-500 hover:bg-red-950/20"
            style={{ borderColor: 'var(--border)', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '17px' }}>
            <Phone size={18} style={{ color: 'var(--red)' }} />
            0151 260 1770
          </a>
        </div>

        {/* Info strip — full row */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${mounted ? 'reveal-up delay-500' : 'opacity-0'}`}>
          {[
            { icon: <Clock size={18} />, label: 'Open Hours', val: '3pm – 3am Daily', color: 'var(--yellow)' },
            { icon: <MapPin size={18} />, label: 'Location', val: '3 Townsend Lane, L6 0AX', color: 'var(--red)' },
            { icon: <span style={{ fontSize: '18px' }}>💸</span>, label: 'Save Money', val: '20% Less Than Just Eat', color: 'var(--orange)' },
            { icon: <span style={{ fontSize: '18px' }}>💷</span>, label: 'Payment', val: 'Cash on Delivery', color: '#22c55e' },
          ].map((pill, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-4 rounded-2xl"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <span style={{ color: pill.color, flexShrink: 0 }}>{pill.icon}</span>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', color: pill.color, letterSpacing: '0.05em' }}>{pill.label}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text)' }}>{pill.val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM MARQUEE — full bleed */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{ background: 'linear-gradient(90deg, var(--red), var(--orange), var(--red))', padding: '14px 0' }}>
        <div className="marquee-track flex gap-0 whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...Array(4)].map((_, r) => (
            <div key={r} className="flex">
              {['🍕 FRESH PIZZA', '🔥 PERI PERI', '🍔 BURGERS', '🥙 KEBABS', '🍗 FRIED CHICKEN', '🍟 FRIES', '🥤 MILKSHAKES', '🌯 WRAPS', '🍝 PASTA', '🥔 JACKET POTATO'].map(s => (
                <span key={s} style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '17px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.9)', padding: '0 32px' }}>
                  {s} <span style={{ color: 'rgba(255,255,255,0.35)' }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

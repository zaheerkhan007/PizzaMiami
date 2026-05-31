'use client';

import {useCart} from '@/lib/cart-context';
import {Menu, Phone, ShoppingBag, X} from 'lucide-react';
import Link from 'next/link';
import {useEffect, useState} from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const {totalItems, toggleCart} = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? 'rgba(8,8,8,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}>
      {/* Full-width inner — only side padding */}
      <div className="section-inner flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <img
            src="/PizzaLogo.png"
            alt="Pizza Miami Logo"
            style={{
              width: '52px',
              height: '52px',
              objectFit: 'contain',
              borderRadius: '50%',
              background: 'transparent',
              mixBlendMode: 'screen',
            }}
          />
          <div>
            <div
              style={{
                fontFamily: 'Bebas Neue, cursive',
                fontSize: '22px',
                letterSpacing: '0.04em',
                lineHeight: 1,
              }}
              className="gradient-text">
              Pizza Miami
            </div>
            <div
              style={{
                fontSize: '9px',
                color: 'var(--muted)',
                letterSpacing: '0.18em',
                fontFamily: 'DM Sans, sans-serif',
              }}>
              LIVERPOOL · EST. 2024
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {[
            ['Menu', '#menu'],
            ['Deals', '#deal-meals'],
            ['About', '#about'],
            ['Contact', '#footer'],
          ].map(([l, h]) => (
            <a
              key={h}
              href={h}
              className="relative group transition-colors duration-200 hover:text-white"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '0.1em',
                color: 'var(--muted)',
                textTransform: 'uppercase',
              }}>
              {l}
              <span
                className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{background: 'var(--red)'}}
              />
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="tel:01512601770"
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:border-red-700"
            style={{
              border: '1px solid var(--border)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              color: 'var(--muted)',
            }}>
            <Phone size={13} style={{color: 'var(--red)'}} />
            0151 260 1770
          </a>

          <button
            onClick={toggleCart}
            className="relative btn-primary px-5 py-2.5 rounded-xl"
            style={{fontSize: '14px'}}>
            <ShoppingBag size={15} />
            <span
              className="hidden sm:inline"
              style={{fontFamily: 'Syne, sans-serif', fontWeight: 700}}>
              Cart
            </span>
            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center pulse-dot"
                style={{
                  background: 'var(--yellow)',
                  color: 'var(--dark)',
                  fontSize: '10px',
                  fontWeight: 900,
                }}>
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{color: 'var(--text)', border: '1px solid var(--border)'}}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden section-inner py-6 pb-8"
          style={{
            borderTop: '1px solid var(--border)',
            background: 'rgba(8,8,8,0.98)',
          }}>
          {[
            ['Menu', '#menu'],
            ['Deals', '#deal-meals'],
            ['About', '#about'],
            ['Contact', '#footer'],
          ].map(([l, h]) => (
            <a
              key={h}
              href={h}
              onClick={() => setMobileOpen(false)}
              className="block py-4"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '18px',
                letterSpacing: '0.05em',
                color: 'var(--text)',
                borderBottom: '1px solid var(--border)',
              }}>
              {l}
            </a>
          ))}
          <a
            href="tel:01512601770"
            className="flex items-center gap-2 mt-5"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '16px',
              color: 'var(--red)',
              fontWeight: 500,
            }}>
            <Phone size={16} /> 0151 260 1770
          </a>
        </div>
      )}
    </nav>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart, cartKey } from '@/lib/cart-context';
import { formatPrice } from '@/lib/menu-data';

export default function Cart() {
  const { state, removeItem, setQty, closeCart, totalPrice, totalItems } = useCart();
  const router = useRouter();

  if (!state.isOpen) return null;

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
        onClick={closeCart} />

      {/* Panel */}
      <div className="cart-slide fixed right-0 top-0 bottom-0 z-50 flex flex-col w-full max-w-[420px]"
        style={{ background: 'var(--charcoal)', borderLeft: '1px solid var(--border)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,var(--red),var(--orange))' }}>
              <ShoppingBag size={17} color="white" />
            </div>
            <div>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '17px' }}>Your Order</p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--muted)' }}>
                {totalItems} item{totalItems !== 1 ? 's' : ''} · {formatPrice(totalPrice)}
              </p>
            </div>
          </div>
          <button onClick={closeCart}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white/5"
            style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}>
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
              <span style={{ fontSize: '64px', opacity: 0.2 }}>🛒</span>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--muted)' }}>Cart is empty</p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--muted)', textAlign: 'center' }}>
                Add something delicious from the menu!
              </p>
              <button onClick={closeCart}
                className="btn-primary px-6 py-3 rounded-xl text-sm">
                Browse Menu
              </button>
            </div>
          ) : (
            state.items.map(ci => {
              const key = cartKey(ci.item.id, ci.selectedSize);
              const lineTotal = Math.round(ci.unitPrice * ci.quantity * 100) / 100;
              return (
                <div key={key} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                  {/* Emoji */}
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(232,25,44,0.1)', fontSize: '22px' }}>
                    {ci.item.emoji}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="truncate" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '13px', color: 'var(--text)' }}>
                      {ci.item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {ci.selectedSize !== 'Regular' && (
                        <span className="px-1.5 py-0.5 rounded text-xs"
                          style={{ background: 'rgba(232,25,44,0.15)', color: 'var(--red)', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
                          {ci.selectedSize}
                        </span>
                      )}
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--muted)' }}>
                        {formatPrice(ci.unitPrice)} each
                      </span>
                    </div>
                  </div>

                  {/* Qty + total */}
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="gradient-text" style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '18px', lineHeight: 1 }}>
                      {formatPrice(lineTotal)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setQty(key, ci.quantity - 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                        style={{ background: 'var(--border)', color: ci.quantity === 1 ? 'var(--red)' : 'var(--text)' }}>
                        {ci.quantity === 1 ? <Trash2 size={11} /> : <Minus size={11} />}
                      </button>
                      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '14px', minWidth: '18px', textAlign: 'center' }}>
                        {ci.quantity}
                      </span>
                      <button onClick={() => setQty(key, ci.quantity + 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg,var(--red),var(--orange))' }}>
                        <Plus size={11} color="white" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="px-5 py-5 space-y-4" style={{ borderTop: '1px solid var(--border)' }}>
            {/* Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--muted)' }}>Subtotal ({totalItems} items)</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text)' }}>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--muted)' }}>Delivery</span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: '#22c55e' }}>FREE</span>
              </div>
              <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px' }}>Total</span>
                <span className="gradient-text" style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '28px', lineHeight: 1 }}>
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* Payment note */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(255,214,0,0.08)', border: '1px solid rgba(255,214,0,0.2)' }}>
              <span style={{ fontSize: '18px' }}>💷</span>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'rgba(255,214,0,0.85)' }}>
                Cash on delivery — please have <strong>{formatPrice(totalPrice)}</strong> ready
              </p>
            </div>

            <button onClick={handleCheckout}
              className="w-full py-4 rounded-2xl btn-primary text-base"
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '15px' }}>
              Checkout · {formatPrice(totalPrice)}
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

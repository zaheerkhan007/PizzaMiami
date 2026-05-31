'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Phone, User, FileText, CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import { useCart, cartKey } from '@/lib/cart-context';
import { formatPrice } from '@/lib/menu-data';

type Form = { name: string; phone: string; address: string; postcode: string; city: string; notes: string };
type Errors = Partial<Form>;

function Field({
  label, id, value, error, onChange, icon, placeholder, type = 'text', as,
}: {
  label: string; id: keyof Form; value: string; error?: string;
  onChange: (v: string) => void; icon: React.ReactNode;
  placeholder: string; type?: string; as?: 'textarea';
}) {
  const base: React.CSSProperties = {
    width: '100%', background: 'var(--card2)', border: `1.5px solid ${error ? 'var(--red)' : 'var(--border)'}`,
    color: 'var(--text)', fontFamily: 'DM Sans, sans-serif', fontSize: '15px',
    borderRadius: '12px', outline: 'none', paddingLeft: '44px', paddingRight: '16px',
    transition: 'border-color 0.2s',
  };
  return (
    <div>
      <label htmlFor={id}
        style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: '14px', top: as ? '14px' : '50%', transform: as ? 'none' : 'translateY(-50%)', color: 'var(--muted)' }}>
          {icon}
        </span>
        {as === 'textarea' ? (
          <textarea id={id} value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} rows={3}
            style={{ ...base, paddingTop: '12px', paddingBottom: '12px', resize: 'none' }} />
        ) : (
          <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} style={{ ...base, paddingTop: '13px', paddingBottom: '13px' }} />
        )}
      </div>
      {error && <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--red)', marginTop: '5px' }}>{error}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { state, totalPrice, totalItems, clearCart, setQty, removeItem } = useCart();
  const [form, setForm] = useState<Form>({ name: '', phone: '', address: '', postcode: '', city: 'Liverpool', notes: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderRef] = useState(() => 'PM' + Math.random().toString(36).slice(2, 7).toUpperCase());

  const set = (k: keyof Form) => (v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim())          e.name    = 'Full name is required';
    if (!/^[\d\s+\-(]{9,}$/.test(form.phone.replace(/\s/g, '')))
                                    e.phone   = 'Enter a valid UK phone number';
    if (!form.address.trim())       e.address = 'Street address is required';
    if (!form.postcode.trim())      e.postcode = 'Postcode is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false);
    setSubmitted(true);
    clearCart();
  };

  /* ── Empty cart ── */
  if (!state.items.length && !submitted) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 pt-20 section-inner text-center"
      style={{ background: 'var(--dark)' }}>
      <span style={{ fontSize: '80px' }}>🛒</span>
      <h2 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '48px', color: 'var(--text)' }}>Cart Is Empty</h2>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: 'var(--muted)', maxWidth: '320px' }}>
        Head back and add some food before checking out.
      </p>
      <button onClick={() => router.push('/')}
        className="btn-primary px-8 py-4 rounded-2xl text-base mt-2">
        Browse Menu
      </button>
    </div>
  );

  /* ── Success ── */
  if (submitted) return (
    <div className="min-h-screen flex flex-col items-center justify-center section-inner text-center gap-6 pt-20"
      style={{ background: 'var(--dark)' }}>
      <div className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 0 50px rgba(34,197,94,0.4)' }}>
        <CheckCircle size={50} color="white" />
      </div>
      <h2 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: 'clamp(48px, 9vw, 80px)', lineHeight: 1 }} className="gradient-text">
        Order Confirmed!
      </h2>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: 'var(--muted)', maxWidth: '440px', lineHeight: 1.6 }}>
        Thanks <strong style={{ color: 'var(--text)' }}>{form.name}</strong>! Your order is on its way to{' '}
        <strong style={{ color: 'var(--text)' }}>{form.address}, {form.postcode}</strong>.
        Please have <strong style={{ color: 'var(--yellow)' }}>{formatPrice(totalPrice)} cash</strong> ready.
      </p>

      {/* Order ref + ETA */}
      <div className="grid sm:grid-cols-2 gap-4 w-full max-w-sm mt-2">
        <div className="p-4 rounded-2xl text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.1em' }}>ORDER REF</p>
          <p style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '26px' }} className="gradient-text">{orderRef}</p>
        </div>
        <div className="p-4 rounded-2xl text-center" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.1em' }}>EST. DELIVERY</p>
          <p style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '26px', color: 'var(--text)' }}>30–45 MIN</p>
        </div>
      </div>

      <a href="tel:01512601770"
        style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--red)' }}>
        📞 Any issues? Call 0151 260 1770
      </a>

      <button onClick={() => router.push('/')}
        className="btn-primary px-10 py-4 rounded-2xl text-base mt-2">
        Back to Menu
      </button>
    </div>
  );

  /* ── Main checkout ── */
  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: 'var(--dark)' }}>
      <div className="section-inner">
        {/* Back */}
        <button onClick={() => router.back()}
          className="flex items-center gap-2 mb-8 transition-opacity hover:opacity-60"
          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--muted)' }}>
          <ArrowLeft size={15} /> Back
        </button>

        {/* Page title */}
        <h1 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: 0.95, marginBottom: '40px' }}>
          <span style={{ color: 'var(--text)' }}>Complete Your </span>
          <span className="gradient-text">Order</span>
        </h1>

        <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">

          {/* ── LEFT: Form ── */}
          <form onSubmit={submit} className="space-y-6">

            {/* Payment badge */}
            <div className="flex items-center gap-4 p-5 rounded-2xl"
              style={{ background: 'rgba(255,214,0,0.07)', border: '1px solid rgba(255,214,0,0.22)' }}>
              <span style={{ fontSize: '36px' }}>💷</span>
              <div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '17px', color: 'var(--yellow)' }}>Cash on Delivery</p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(255,214,0,0.65)' }}>
                  Have exact change ready when your driver arrives
                </p>
              </div>
            </div>

            {/* Details card */}
            <div className="p-6 rounded-2xl space-y-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px' }}>Your Details</p>
              <Field label="FULL NAME" id="name" value={form.name} error={errors.name}
                onChange={set('name')} icon={<User size={16} />} placeholder="John Smith" />
              <Field label="PHONE NUMBER" id="phone" value={form.phone} error={errors.phone}
                onChange={set('phone')} icon={<Phone size={16} />} placeholder="07700 900123" type="tel" />
            </div>

            {/* Address card */}
            <div className="p-6 rounded-2xl space-y-5" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px' }}>Delivery Address</p>
              <Field label="STREET ADDRESS" id="address" value={form.address} error={errors.address}
                onChange={set('address')} icon={<MapPin size={16} />} placeholder="123 High Street, Flat 2" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="POSTCODE" id="postcode" value={form.postcode} error={errors.postcode}
                  onChange={set('postcode')} icon={<MapPin size={16} />} placeholder="L6 0AX" />
                <Field label="CITY" id="city" value={form.city}
                  onChange={set('city')} icon={<MapPin size={16} />} placeholder="Liverpool" />
              </div>
            </div>

            {/* Notes */}
            <div className="p-6 rounded-2xl" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <Field label="SPECIAL INSTRUCTIONS (OPTIONAL)" id="notes" value={form.notes}
                onChange={set('notes')} icon={<FileText size={16} />}
                placeholder="Allergies, gate codes, extra sauce..." as="textarea" />
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full py-5 rounded-2xl btn-primary disabled:opacity-60"
              style={{ fontSize: '17px', fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>
              {loading
                ? <><span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span> Placing your order...</>
                : <>🍕 Place Order · {formatPrice(totalPrice)}</>}
            </button>
          </form>

          {/* ── RIGHT: Order summary ── */}
          <div className="lg:sticky lg:top-28 space-y-4">
            <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              {/* Summary header */}
              <div className="px-5 py-4" style={{ background: 'linear-gradient(135deg,rgba(232,25,44,0.12),rgba(255,107,0,0.08))', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px' }}>
                  Order Summary <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '13px' }}>({totalItems} items)</span>
                </p>
              </div>

              {/* Line items */}
              <div className="px-5 py-4 space-y-3 max-h-80 overflow-y-auto">
                {state.items.map(ci => {
                  const key = cartKey(ci.item.id, ci.selectedSize);
                  const lineTotal = Math.round(ci.unitPrice * ci.quantity * 100) / 100;
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <span style={{ fontSize: '24px', flexShrink: 0 }}>{ci.item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="truncate" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--text)' }}>
                          {ci.item.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {ci.selectedSize !== 'Regular' && (
                            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'var(--red)' }}>{ci.selectedSize}</span>
                          )}
                          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'var(--muted)' }}>
                            ×{ci.quantity} @ {formatPrice(ci.unitPrice)}
                          </span>
                        </div>
                      </div>
                      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: 'var(--text)', flexShrink: 0 }}>
                        {formatPrice(lineTotal)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="px-5 py-4 space-y-2" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex justify-between">
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--muted)' }}>Subtotal</span>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text)' }}>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--muted)' }}>Delivery fee</span>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: '#22c55e' }}>FREE</span>
                </div>
                <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px' }}>Total to pay</span>
                  <span className="gradient-text" style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '30px', lineHeight: 1 }}>
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* ETA + phone */}
            <div className="p-5 rounded-2xl space-y-3" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3">
                <Clock size={16} style={{ color: 'var(--orange)' }} />
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text)' }}>
                  Estimated delivery: <strong>30–45 minutes</strong>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} style={{ color: 'var(--red)' }} />
                <a href="tel:01512601770"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--red)', fontWeight: 600 }}>
                  0151 260 1770
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

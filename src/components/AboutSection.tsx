import { Clock, MapPin, Phone, Shield, Zap, Star } from 'lucide-react';

const features = [
  { icon: <Zap size={20} />, title: 'Fast Delivery', desc: 'Hot to your door in 30–45 minutes across Liverpool' },
  { icon: <Shield size={20} />, title: 'Fresh Ingredients', desc: 'Made fresh to order, every single time' },
  { icon: <Star size={20} />, title: '20% Cheaper', desc: 'Order direct and save 20% vs Just Eat' },
  { icon: <Clock size={20} />, title: 'Open Late', desc: 'We\'re open 3pm to 3am, 7 days a week' },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-full py-20 lg:py-28" style={{ background: 'var(--charcoal)' }}>
      <div className="section-inner">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(232,25,44,0.1)', border: '1px solid rgba(232,25,44,0.3)' }}
            >
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.15em', color: 'var(--red)' }}>
                ABOUT PIZZA MIAMI
              </span>
            </div>

            <h2
              style={{ fontFamily: 'Bebas Neue, cursive', fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: '0.95', marginBottom: '24px' }}
            >
              <span style={{ color: 'var(--text)' }}>Liverpool's</span>
              <br />
              <span className="gradient-text">Favourite</span>
              <br />
              <span style={{ color: 'var(--text)' }}>Grill & Pizza</span>
            </h2>

            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', color: 'rgba(245,240,232,0.65)', lineHeight: '1.7', marginBottom: '32px' }}>
              Pizza Miami brings Liverpool the best of fresh pizza, fiery peri peri chicken, loaded burgers, and sizzling kebabs — all made to order with quality ingredients.
              We&apos;re based on Townsend Lane and deliver across Liverpool every night of the week.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(232,25,44,0.15)' }}
                >
                  <MapPin size={18} style={{ color: 'var(--red)' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>Address</p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'var(--muted)' }}>3 Townsend Lane, Liverpool, L6 0AX</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(232,25,44,0.15)' }}
                >
                  <Phone size={18} style={{ color: 'var(--red)' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>Order by Phone</p>
                  <a
                    href="tel:01512601770"
                    style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'var(--red)' }}
                    className="hover:underline"
                  >
                    0151 260 1770
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(232,25,44,0.15)' }}
                >
                  <Clock size={18} style={{ color: 'var(--red)' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--text)' }}>Opening Hours</p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'var(--muted)' }}>Daily · 3:00pm – 3:00am</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="menu-card p-6 rounded-2xl"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(135deg, rgba(232,25,44,0.2), rgba(255,107,0,0.2))' }}
                >
                  <span style={{ color: 'var(--orange)' }}>{f.icon}</span>
                </div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}

            {/* Big CTA card */}
            <div
              className="col-span-2 p-6 rounded-2xl flex items-center justify-between gap-4"
              style={{ background: 'linear-gradient(135deg, rgba(232,25,44,0.15), rgba(255,107,0,0.1))', border: '1px solid rgba(232,25,44,0.3)' }}
            >
              <div>
                <p style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '28px' }} className="gradient-text">
                  Contactless Payment
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--muted)' }}>
                  Cash on delivery — pay at your door step
                </p>
              </div>
              <span style={{ fontSize: '48px' }}>💷</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

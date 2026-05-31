import { MapPin, Phone, Clock, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" style={{ background: '#080808', borderTop: '1px solid var(--border)' }}>
      {/* Top strip */}
      <div
        className="py-4 text-center"
        style={{ background: 'linear-gradient(135deg, var(--red), var(--orange))' }}
      >
        <p style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '18px', letterSpacing: '0.1em', color: 'white' }}>
          ORDER DIRECT · SAVE 20% vs JUST EAT · CASH ON DELIVERY
        </p>
      </div>

      {/* Main footer */}
      <div className="section-inner py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--red), var(--orange))' }}
              >
                <span style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '26px', color: 'white' }}>PM</span>
              </div>
              <div>
                <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '28px', letterSpacing: '0.05em' }} className="gradient-text">
                  Pizza Miami
                </div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.15em' }}>LIVERPOOL</div>
              </div>
            </div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'var(--muted)', lineHeight: '1.7', maxWidth: '280px' }}>
              Liverpool's favourite pizza and grill. Fresh ingredients, hot delivery, open late.
            </p>
          </div>

          {/* Info */}
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '14px', letterSpacing: '0.1em', color: 'var(--red)', marginBottom: '20px' }}>
              FIND US
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} style={{ color: 'var(--muted)', marginTop: '2px', flexShrink: 0 }} />
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'var(--muted)', lineHeight: '1.5' }}>
                  3 Townsend Lane<br />Liverpool, L6 0AX
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                <a
                  href="tel:01512601770"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'var(--text)' }}
                  className="hover:text-red-400 transition-colors"
                >
                  0151 260 1770
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: 'var(--muted)' }}>
                  3:00pm – 3:00am · 7 days
                </p>
              </div>
            </div>
          </div>

          {/* Menu quick links */}
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '14px', letterSpacing: '0.1em', color: 'var(--red)', marginBottom: '20px' }}>
              MENU
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {['Fresh Pizza', 'Garlic Bread', 'Burgers', 'Wraps', 'Peri Peri', 'Kababs', 'Fried Chicken', 'Milkshakes'].map(item => (
                <a
                  key={item}
                  href="#menu"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--muted)' }}
                  className="hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div
        className="py-6 text-center"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--muted)' }}>
          © {year} Pizza Miami · All rights reserved ·{' '}
          <span className="inline-flex items-center gap-1">
            Made with <Heart size={11} className="inline" style={{ color: 'var(--red)', fill: 'var(--red)' }} /> in Liverpool
          </span>
        </p>
      </div>
    </footer>
  );
}

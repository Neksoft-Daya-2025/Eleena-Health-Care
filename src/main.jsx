import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import './styles.css';

const asset = (path) => `/assets/uploads/${path}`;

const products = [
  { id: 247, title: 'ELOCEV-CV 200', slug: 'elocev-cv-200', price: '300.00', image: '2022/05/e2s9-7.jpg', category: 'Capsules', status: 'draft', excerpt: 'Cefpodoxime Proxetil IP with Potassium Clavulanate Diluted IP.' },
  { id: 163, title: 'E-29 Drop', slug: 'e-29-drop', price: '110.00', image: '2022/05/e2s9.jpg', category: 'Drops', status: 'draft', excerpt: 'DHA, Lycopene with Multivitamin & Lysine Drop.' },
  { id: 1684, title: 'ELOCEF-CV200 Tablet', slug: 'elocef-cv200', price: '300.00', image: '2023/07/7.png', category: 'Capsules', excerpt: 'Cefpodoxime Proxetil & Potassium Clavulanate Tablets' },
  { id: 1677, title: 'ELOMER-MNT Tablet', slug: 'elomer-mnt', price: '223.00', image: '2023/07/6.png', category: 'Capsules', excerpt: 'Pregabalin, Nortriptyline & Methylcobalamin Tablets' },
  { id: 1671, title: 'ELEEFER XT Syrup', slug: 'eleefer-xt-syrup', price: '205.00', image: '2023/07/5a.png', category: 'Syrup', excerpt: 'Ferrous Ascorbate, Folic Acid & Cyanocobalamin Syrup' },
  { id: 1661, title: 'E-29 Drop', slug: 'e-29-drop-2', price: '135.00', image: '2023/07/4ed.png', category: 'Drops', excerpt: 'DHA, Lycopene with Multivitamin & Lysine Drop' },
  { id: 1652, title: 'CC 29 Tablets', slug: 'cc-29-tablets', price: '', image: '2023/07/1111.png', category: 'Capsules', excerpt: 'Calcium, Magnesium, Vitamin D3, Zinc Sulphate' },
  { id: 1642, title: 'ELEEFER XT Drops', slug: 'eleefer-xt-drops', price: '95.00', image: '2023/07/22.png', category: 'Drops', excerpt: 'Ferrous Ascrobate & Folic Acid Drops' },
  { id: 1633, title: 'ELEEFER XT Tablet', slug: 'eleefer-xt-tablet', price: '145.00', image: '2023/07/m1.png', category: 'Capsules', excerpt: 'Ferrous Ascorbate, Folic Acid & Zinc Sulphate Tablets' },
  { id: 268, title: 'ELOCEF-100', slug: 'elocef-100', price: '170.00', image: '2022/05/e2s9.png', category: 'Capsules', excerpt: 'Each 5ml. of reconstituted suspension contains Cefpodoxime Proxetil IP.' },
  { id: 238, title: 'Velina - M', slug: 'velina-m', price: '120.00', image: '2022/05/e2s9-6.jpg', category: 'Capsules', excerpt: 'Vildagliptin and Metformin combination for glycemic control.' },
  { id: 228, title: 'Pantolena', slug: 'pantolena', price: '64.95', image: '2022/05/e2s9-5.jpg', category: 'Capsules', excerpt: 'Pantoprazole Gastro-resistant and Domperidone Prolonged-release Capsules IP.' },
  { id: 219, title: 'Pantolena-D', slug: 'pantolena-d', price: '89.67', image: '2022/05/e2s9-4.jpg', category: 'Capsules', excerpt: 'Pantoprazole Gastro-resistant and Domperidone Prolonged-release Capsules IP.' },
  { id: 210, title: 'Gowerm', slug: 'gowerm', price: '30.00', image: '2022/05/e2s9-3.jpg', category: 'Oral Suspension', excerpt: 'Albendazole & Ivermectin Oral Suspension - 10 Ml' },
  { id: 201, title: 'EZAR-1.125 & IP EZAR-4.5', slug: 'ezar-1-125-ip-ezar-4-5', price: '491.00', image: '2022/05/e2s9-2.jpg', category: 'Injection', excerpt: 'Piperacillin & Tazobactam Injection IP.' },
  { id: 191, title: 'ELOMER-NT', slug: 'elomer-nt', price: '219.00', image: '2022/05/e2s9.jpg.png', category: 'Capsules', excerpt: 'Pregabalin & Nortriptyline Hydrochloride Tablets.' },
  { id: 182, title: 'ELEENA-F', slug: 'eleena-f', price: '149.00', image: '2022/05/e2s9-1.jpg', category: 'Capsules', excerpt: 'Montelukast Sodium & Fexofenadine Hydrochloride Tablets.' },
  { id: 173, title: 'ELEENA-F -Suspension', slug: 'eleena-f-suspension', price: '115.00', image: '2022/05/eleanaf.jpg', category: 'Capsules', excerpt: 'Fexofenadine Hydrochloride & Montelukast Suspension - 60 ML' },
  { id: 156, title: 'E-29 Capsules', slug: 'e-29-l-lysine-vitamin-a-vitamin-c-vitamin-b12-sodium-selenate-manganese-zinc-syrup-200-ml-copy', price: '171.00', image: '2022/05/asdaada.png', category: 'Capsules', excerpt: 'Softgel Capsules of Omega-3 Fatty Acids, Green Tea Extract, Ginkgo Biloba, Ginseng, Vitamins and Minerals.' },
  { id: 149, title: 'E-29 - Syrup', slug: 'e-29-syrup', price: '145.00', image: '2022/05/e29.png', category: 'Syrup', excerpt: 'L-Lysine, Vitamin A, Vitamin C, Vitamin B12, Sodium Selenate, Manganese & Zinc Syrup.' },
  { id: 140, title: 'CC29-P', slug: 'cc29-p', price: '160.00', image: '2022/05/cc29p.png', category: 'Oral Suspension', excerpt: 'Calcium Phosphate, Magnesium, Zinc & Vitamin D3 Suspension.' },
  { id: 91, title: 'CC29', slug: 'cc29', price: '175.00', image: '2020/04/cc29.png', category: 'Capsules', excerpt: 'Calcium Citrate, Vitamin-B6, Folic Acid and Curcumin longa capsules.' },
];

const nav = [
  { label: 'HOME', page: 'home' },
  { label: 'OUR PRODUCTS', page: 'products' },
  { label: 'CONTACT US', page: 'contact' },
];

function App() {
  const initial = window.location.hash.replace('#/', '') || 'home';
  const [page, setPage] = useState(initial);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('eleeana-cart') || '[]');
    } catch {
      return [];
    }
  });
  const selectedProduct = useMemo(() => products.find((item) => page === `product/${item.slug}`), [page]);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + Number(item.product.price || 0) * item.qty, 0);

  useEffect(() => {
    localStorage.setItem('eleeana-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const syncHash = () => setPage(window.location.hash.replace('#/', '') || 'home');
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  const go = (next) => {
    setPage(next);
    setMenuOpen(false);
    setSearchOpen(false);
    setLoginOpen(false);
    window.location.hash = `/${next}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product, qty = 1) => {
    setCart((items) => {
      const existing = items.find((item) => item.product.id === product.id);
      if (existing) {
        return items.map((item) => item.product.id === product.id ? { ...item, qty: item.qty + qty } : item);
      }
      return [...items, { product, qty }];
    });
  };

  const updateQty = (id, qty) => {
    const nextQty = Math.max(1, Number(qty) || 1);
    setCart((items) => items.map((item) => item.product.id === id ? { ...item, qty: nextQty } : item));
  };

  const removeFromCart = (id) => {
    setCart((items) => items.filter((item) => item.product.id !== id));
  };

  return (
    <>
      <Header
        page={page}
        go={go}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onSearch={() => setSearchOpen(true)}
        onLogin={() => setLoginOpen(true)}
      />
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} go={go} addToCart={addToCart} />
      ) : (
        <MainPage page={page} go={go} addToCart={addToCart} cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} cartTotal={cartTotal} />
      )}
      <Footer go={go} />
      {searchOpen && <SearchOverlay go={go} onClose={() => setSearchOpen(false)} />}
      {loginOpen && <LoginPanel onClose={() => setLoginOpen(false)} />}
    </>
  );
}

function Header({ page, go, menuOpen, setMenuOpen, cartCount, cartTotal, onSearch, onLogin }) {
  return (
    <header className="topbar">
      <a className="brand" onClick={() => go('home')}>
        <img src={asset('2022/05/log.png')} alt="Eleeana Healthcare" />
      </a>
      <nav className={`mainnav ${menuOpen ? 'open' : ''}`}>
        {nav.map((item) => (
          <button key={item.page} className={page === item.page ? 'active' : ''} onClick={() => go(item.page)}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="header-actions">
        <button className="icon-btn" onClick={onSearch} aria-label="Search products"><Search size={22} strokeWidth={1.6} /></button>
        <button className="icon-btn" onClick={onLogin} aria-label="My account"><User size={24} strokeWidth={1.5} /></button>
        <button className="cart-icon" onClick={() => go('cart')} aria-label="Cart">
          <ShoppingBag size={25} strokeWidth={1.4} />
          <span>{cartCount}</span>
        </button>
        <strong>₹{cartTotal.toFixed(2)}</strong>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function MainPage({ page, go, addToCart, cart, updateQty, removeFromCart, cartTotal }) {
  if (page === 'products') return <ProductsPage go={go} addToCart={addToCart} />;
  if (page === 'about') return <AboutPage />;
  if (page === 'services') return <ServicesPage />;
  if (page === 'contact') return <ContactPage />;
  if (page === 'checkout') return <CheckoutPage go={go} cart={cart} cartTotal={cartTotal} />;
  if (page === 'cart') return <CartPage go={go} cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} cartTotal={cartTotal} />;
  return <HomePage go={go} addToCart={addToCart} />;
}

function HomePage({ go, addToCart }) {
  return (
    <main>
      <section className="hero">
        <img className="bubble bubble-left" src={asset('2020/04/med-slider-bubbles-1280x500.png')} alt="" />
        <div className="hero-copy">
          <h1>Shaping the Future of Healthcare</h1>
          <p className="lead">We have been operating for 5 years.</p>
          <p>To know more about ELEEANA HEALTHCARE<br />please follow our Product list.</p>
          <button className="primary" onClick={() => go('products')}>OUR PRODUCTS</button>
          <Socials />
        </div>
        <div className="hero-art">
          <img className="hero-mark" src={asset('2022/05/hero-3.png')} alt="Eleeana Healthcare" />
          <img className="microscope" src={asset('2020/04/med-under-microscope.png')} alt="" />
        </div>
      </section>
      <ProductStrip go={go} addToCart={addToCart} />
      <Vision />
      <Journey />
      <Counters />
    </main>
  );
}

function ProductStrip({ go, addToCart }) {
  const publishedProducts = products.filter((product) => product.status !== 'draft');

  return (
    <section className="product-strip">
      <div className="inner">
        <h6>OUR PRODUCTS</h6>
        <h2>Healthcare Products</h2>
        <div className="mini-products">
          {publishedProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} go={go} addToCart={addToCart} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsPage({ go, addToCart }) {
  const [sort, setSort] = useState('default');
  const [category, setCategory] = useState('all');
  const publishedProducts = useMemo(() => products.filter((product) => product.status !== 'draft'), []);
  const categories = useMemo(() => ['all', ...Array.from(new Set(publishedProducts.map((product) => product.category)))], [publishedProducts]);
  const sortedProducts = useMemo(() => {
    const list = publishedProducts.filter((product) => category === 'all' || product.category === category);
    if (sort === 'latest') return list.reverse();
    if (sort === 'name') return list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'price-low') return list.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    if (sort === 'price-high') return list.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    return list;
  }, [publishedProducts, sort, category]);

  return (
    <main className="shop-main">
      <section className="shop-page">
        <div className="shop-header">
          <p>Showing all {sortedProducts.length} results</p>
          <div className="shop-controls">
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => <option key={item} value={item}>{item === 'all' ? 'All categories' : item}</option>)}
            </select>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="default">Default sorting</option>
              <option value="latest">Sort by latest</option>
              <option value="name">Sort by name</option>
              <option value="price-low">Sort by price: low to high</option>
              <option value="price-high">Sort by price: high to low</option>
            </select>
          </div>
        </div>
        <div className="products-grid">
          {sortedProducts.map((product) => <ProductCard key={product.id} product={product} go={go} addToCart={addToCart} />)}
        </div>
      </section>
    </main>
  );
}

function ProductCard({ product, go, addToCart, compact = false }) {
  return (
    <article className={`product-card ${compact ? 'compact' : ''}`}>
      <button className="product-image" onClick={() => go(`product/${product.slug}`)}>
        <img src={asset(product.image)} alt={product.title} />
        <span className="quick-actions">
          <ShoppingBag size={25} />
          <span className="link-glyph">↗</span>
        </span>
      </button>
      <button className="product-title" onClick={() => go(`product/${product.slug}`)}>{product.title}</button>
      {product.price && <p className="price">₹{product.price}</p>}
    </article>
  );
}

function ProductDetail({ product, go, addToCart }) {
  const [qty, setQty] = useState(1);
  return (
    <main>
      <SubHero title={product.title} />
      <section className="detail">
        <div className="detail-image"><img src={asset(product.image)} alt={product.title} /></div>
        <div className="detail-copy">
          <p className="crumb">Home / Products / {product.title}</p>
          <h1>{product.title}</h1>
          {product.price && <p className="detail-price">₹{product.price}</p>}
          <p>{product.excerpt}</p>
          <p className="category-label">Category: {product.category}{product.status === 'draft' ? ' / Imported from archive' : ''}</p>
          <div className="cart-row">
            <input type="number" min="1" value={qty} onChange={(event) => setQty(Math.max(1, Number(event.target.value) || 1))} />
            <button className="primary" onClick={() => addToCart(product, qty)}>ADD TO CART</button>
          </div>
          <button className="ghost" onClick={() => go('products')}>BACK TO PRODUCTS</button>
        </div>
      </section>
      <ProductStrip go={go} addToCart={addToCart} />
    </main>
  );
}

function Vision() {
  const items = [
    ['2020/04/med-home-icon-1.png', 'Eleeana Healthcare carries huge experience in managing complex domains.'],
    ['2020/04/med-home-icon-2.png', 'The vision is to make quality medicines available to all at low prices.'],
    ['2020/04/med-home-icon-3.png', 'Provide best working environment for all to ensure growth.'],
    ['2020/04/med-home-icon-4.png', 'Employees carry the same zeal thus operate in resonance.'],
  ];
  return (
    <section className="vision">
      <div className="inner">
        <h6>COMPANY VISION</h6>
        <h2>Reliable, affordable and quality healthcare for everyone.</h2>
        <div className="vision-grid">
          {items.map(([icon, text]) => (
            <div className="vision-item" key={text}>
              <img src={asset(icon)} alt="" />
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="journey">
      <div className="inner journey-grid">
        <img src={asset('2022/05/dnaa.png')} alt="Healthcare research" />
        <div>
          <h6>ABOUT ELEEANA</h6>
          <h2>We shape healthcare with quality medicines.</h2>
          <p>With an illustrious journey which stands at striking distance of completing 5 decades, Eleeana Healthcare commands the status of one of world's leading global pharmaceutical formulation development, manufacturing and marketing companies from India.</p>
        </div>
      </div>
    </section>
  );
}

function Counters() {
  const items = [
    ['2020/04/med-home-counter-1.png', '250+', 'Products'],
    ['2020/04/med-home-counter-2.png', '30+', 'District Covered'],
    ['2020/04/med-home-counter-3.png', '50+', 'Employees'],
    ['2020/04/med-home-counter-4.png', '5+', 'Years'],
  ];
  return (
    <section className="counters">
      <div className="inner counter-grid">
        {items.map(([icon, value, label]) => (
          <div className="counter" key={label}>
            <img src={asset(icon)} alt="" />
            <strong>{value}</strong>
            <p>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <main>
      <SubHero title="ABOUT US" />
      <section className="content-split">
        <div>
          <h6>ABOUT ELEEANA HEALTHCARE</h6>
          <h2>Shaping the future of Healthcare</h2>
          <p>Eleeana Healthcare Pvt. Ltd. brings a focused product portfolio across medicines, syrups, drops and healthcare essentials. The company works with a simple promise: quality products, accessible prices and trusted distribution.</p>
          <p>Its operating approach combines reliable formulation, clear brand identity and a product catalogue designed for everyday healthcare needs.</p>
        </div>
        <img src={asset('2022/05/eleeana-logo.png')} alt="Eleeana logo" />
      </section>
      <Vision />
    </main>
  );
}

function ServicesPage() {
  return (
    <main>
      <SubHero title="SERVICES" />
      <section className="services">
        {['Pharmaceutical formulation', 'Healthcare distribution', 'Product marketing', 'Quality medicine access'].map((title, index) => (
          <div className="service" key={title}>
            <img src={asset(`2020/04/med-home-icon-${(index % 4) + 1}.png`)} alt="" />
            <h3>{title}</h3>
            <p>Focused support for reliable healthcare products and a strong medicine supply presence.</p>
          </div>
        ))}
      </section>
    </main>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main>
      <SubHero title="CONTACT US" />
      <section className="contact">
        <div className="contact-info">
          <h6>GET IN TOUCH</h6>
          <h2>Contact Eleeana Healthcare</h2>
          <p>Reach out for products, business queries and healthcare distribution support.</p>
          <p><strong>Address</strong><br />Eleeana Healthcare Pvt. Ltd.</p>
          <p><strong>Email</strong><br />info@eleeanahealthcare.in</p>
        </div>
        <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <input placeholder="Your name" required />
          <input placeholder="Email address" type="email" required />
          <input placeholder="Subject" required />
          <textarea placeholder="Message" rows="6" required />
          <button className="primary" type="submit">SEND MESSAGE</button>
          {sent && <p className="notice">Thank you. Your message has been received.</p>}
        </form>
      </section>
    </main>
  );
}

function CartPage({ go, cart, updateQty, removeFromCart, cartTotal }) {
  if (cart.length) {
    return (
      <main>
        <SubHero title="Cart" />
        <section className="cart-page">
          <div className="cart-table">
            {cart.map(({ product, qty }) => (
              <div className="cart-item" key={product.id}>
                <img src={asset(product.image)} alt={product.title} />
                <div>
                  <button className="product-title cart-title" onClick={() => go(`product/${product.slug}`)}>{product.title}</button>
                  <p className="price">₹{Number(product.price || 0).toFixed(2)}</p>
                </div>
                <input type="number" min="1" value={qty} onChange={(event) => updateQty(product.id, event.target.value)} />
                <strong>₹{(Number(product.price || 0) * qty).toFixed(2)}</strong>
                <button className="remove" onClick={() => removeFromCart(product.id)}>Remove</button>
              </div>
            ))}
          </div>
          <aside className="cart-summary">
            <h2>Cart totals</h2>
            <div><span>Subtotal</span><strong>₹{cartTotal.toFixed(2)}</strong></div>
            <div><span>Total</span><strong>₹{cartTotal.toFixed(2)}</strong></div>
            <button className="primary" onClick={() => go('checkout')}>PROCEED TO CHECKOUT</button>
          </aside>
        </section>
      </main>
    );
  }

  return (
    <main>
      <SubHero title="Cart" />
      <section className="empty-cart">
        <ShoppingBag size={48} strokeWidth={1.4} />
        <h2>Your cart is currently empty.</h2>
        <button className="primary" onClick={() => go('products')}>RETURN TO SHOP</button>
      </section>
    </main>
  );
}

function CheckoutPage({ go, cart, cartTotal }) {
  const [placed, setPlaced] = useState(false);

  return (
    <main>
      <SubHero title="Checkout" />
      <section className="checkout-page">
        <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setPlaced(true); }}>
          <h2>Billing details</h2>
          <input placeholder="Full name" required />
          <input placeholder="Company name" />
          <input placeholder="Street address" required />
          <input placeholder="Town / City" required />
          <input placeholder="Phone" required />
          <input placeholder="Email address" type="email" required />
          <textarea placeholder="Order notes" rows="5" />
          <button className="primary" type="submit">PLACE ORDER</button>
          {placed && <p className="notice">Order request placed locally. The React checkout flow is working.</p>}
        </form>
        <aside className="order-box">
          <h2>Your order</h2>
          {cart.length ? cart.map(({ product, qty }) => (
            <div key={product.id}><span>{product.title} x {qty}</span><strong>₹{(Number(product.price || 0) * qty).toFixed(2)}</strong></div>
          )) : <p>No products in cart.</p>}
          <div className="order-total"><span>Total</span><strong>₹{cartTotal.toFixed(2)}</strong></div>
          <button className="ghost" onClick={() => go('products')}>CONTINUE SHOPPING</button>
        </aside>
      </section>
    </main>
  );
}

function SearchOverlay({ go, onClose }) {
  const [query, setQuery] = useState('');
  const searchableProducts = products.filter((product) => product.status !== 'draft');
  const results = searchableProducts.filter((product) => {
    const text = `${product.title} ${product.excerpt}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  return (
    <div className="overlay">
      <div className="search-box">
        <button className="close-btn" onClick={onClose} aria-label="Close search"><X /></button>
        <h2>Search products</h2>
        <input autoFocus placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} />
        <div className="search-results">
          {(query ? results : searchableProducts.slice(0, 6)).map((product) => (
            <button key={product.id} onClick={() => go(`product/${product.slug}`)}>
              <img src={asset(product.image)} alt="" />
              <span>{product.title}</span>
              {product.price && <strong>₹{product.price}</strong>}
            </button>
          ))}
          {query && !results.length && <p>No products found.</p>}
        </div>
      </div>
    </div>
  );
}

function LoginPanel({ onClose }) {
  const [done, setDone] = useState(false);

  return (
    <div className="drawer-backdrop">
      <aside className="login-panel">
        <button className="close-btn" onClick={onClose} aria-label="Close login"><X /></button>
        <h2>My account</h2>
        <form onSubmit={(event) => { event.preventDefault(); setDone(true); }}>
          <input placeholder="Username or email address" required />
          <input placeholder="Password" type="password" required />
          <label className="remember"><input type="checkbox" /> Remember me</label>
          <button className="primary" type="submit">LOG IN</button>
          <a>Lost your password?</a>
          {done && <p className="notice">Login form submitted locally.</p>}
        </form>
      </aside>
    </div>
  );
}

function SubHero({ title }) {
  return (
    <section className="subhero">
      <h1>{title}</h1>
    </section>
  );
}

function Socials() {
  return (
    <div className="socials">
      <a><span className="brand-mark">f</span> FACEBOOK</a>
      <a><span className="brand-mark">t</span> TWITTER</a>
      <a><span className="brand-mark">◎</span> INSTAGRAM</a>
    </div>
  );
}

function Footer({ go }) {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <h4>ADDRESS</h4>
          <p>F NO D-4-C MIG DDA MUNIRKA<br />South West Delhi DL 110067<br />India</p>
          <p>Monday — Saturday: 10:00 AM — 8:00 PM</p>
        </div>
        <div>
          <h4>LINKS</h4>
          <button onClick={() => go('home')}>Home</button>
          <button onClick={() => go('products')}>Products</button>
          <button onClick={() => go('contact')}>Contact us</button>
        </div>
        <div>
          <h4>PHONE</h4>
          <strong className="footer-phone">+91-9000000000</strong>
          <p>If you have a question,<br />please contact at <a href="mailto:healthcareeleeana@gmail.com">healthcareeleeana@gmail.com</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>2022 - powered by <a href="https://neksoftconsultancy.com/" target="_blank" rel="noreferrer">NEKSOFT CONSULTANCY SERVICES</a> - all rights reserved.</p>
        <div className="footer-socials">
          <a aria-label="Facebook">f</a>
          <a aria-label="Twitter">t</a>
          <a aria-label="Instagram">◎</a>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">⌃</button>
        </div>
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);

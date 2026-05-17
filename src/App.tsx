import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import { CartProvider } from './components/CartProvider';
import { NotificationProvider } from './components/NotificationProvider';
import Layout from './components/Layout';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));
const KitchenDashboard = lazy(() => import('./pages/KitchenDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'));

function PageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-brand-nude">
      <div className="flex flex-col items-center gap-6">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-brand-gold border-t-transparent shadow-2xl" />
        <p className="font-serif italic font-black text-brand-coffee animate-pulse uppercase tracking-[0.3em] text-[10px]">Curating Experience...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <CartProvider>
            <Layout>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/tracking/:orderId" element={<OrderTracking />} />
                  <Route path="/kitchen" element={<KitchenDashboard />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/feedback" element={<FeedbackPage />} />
                </Routes>
              </Suspense>
            </Layout>
          </CartProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

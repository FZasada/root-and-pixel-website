import { MotionConfig } from "framer-motion";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { HashRouter, Route, Routes } from "react-router-dom";

import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { ScrollManager } from "./components/ScrollManager";
import { Home } from "./pages/Home/Home";

const AppsOverview = lazy(() =>
  import("./pages/Apps/AppsOverview").then((m) => ({ default: m.AppsOverview }))
);
const AppPage = lazy(() =>
  import("./pages/Apps/AppPage").then((m) => ({ default: m.AppPage }))
);
const AppPrivacy = lazy(() =>
  import("./pages/Apps/AppLegal").then((m) => ({ default: m.AppPrivacy }))
);
const AppSupport = lazy(() =>
  import("./pages/Apps/AppLegal").then((m) => ({ default: m.AppSupport }))
);
const ImprintPage = lazy(() =>
  import("./pages/Legal/LegalPage").then((m) => ({ default: m.ImprintPage }))
);
const PrivacyPage = lazy(() =>
  import("./pages/Legal/LegalPage").then((m) => ({ default: m.PrivacyPage }))
);
const NotFound = lazy(() =>
  import("./pages/NotFound/NotFound").then((m) => ({ default: m.NotFound }))
);

function RouteFallback() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-ink"
      role="status"
      aria-label="Laden"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-accent" />
    </div>
  );
}

function SkipLink() {
  const { t } = useTranslation();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
    >
      {t("nav.skipToContent")}
    </a>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <ScrollManager />
        <SkipLink />
        <Navbar />
        <main id="main">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apps" element={<AppsOverview />} />
              <Route path="/apps/:slug" element={<AppPage />} />
              <Route path="/apps/:slug/privacy" element={<AppPrivacy />} />
              <Route path="/apps/:slug/support" element={<AppSupport />} />
              <Route path="/impressum" element={<ImprintPage />} />
              <Route path="/datenschutz" element={<PrivacyPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </HashRouter>
    </MotionConfig>
  );
}
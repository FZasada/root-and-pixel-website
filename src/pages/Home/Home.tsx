import { About } from "../../components/About/About";
import { Apps } from "../../components/Apps/Apps";
import { Contact } from "../../components/Contact/Contact";
import { Hero } from "../../components/Hero/Hero";
import { Process } from "../../components/Process/Process";
import { SecurityBanner } from "../../components/SecurityBanner/SecurityBanner";
import { TechnologyBar } from "../../components/TechnologyBar/TechnologyBar";
import { SEO } from "../../components/ui/SEO";

export function Home() {
  return (
    <>
      <SEO titleKey="seo.home.title" descriptionKey="seo.home.description" />
      <Hero />
      <TechnologyBar />
      <SecurityBanner />
      <Apps />
      <Process />
      <About />
      <Contact />
    </>
  );
}
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { getContent } from "@/lib/content";

// Render on every request so published CMS edits appear on the next refresh,
// with no redeploy and no waiting. (Time-based ISR was serving a stale cached
// copy for hours on a low-traffic site; the content fetch uses `no-store`.)
export const dynamic = "force-dynamic";

export default async function Home() {
  const {
    site,
    socials,
    skillGroups,
    experience,
    education,
    projects,
    certifications,
    sections,
    hero,
    nav,
  } = await getContent();

  return (
    <>
      <ScrollProgress />
      <Navbar site={site} nav={nav} />
      <main id="main">
        <Hero site={site} socials={socials} hero={hero} />
        <About site={site} heading={sections.about} />
        <Skills skillGroups={skillGroups} heading={sections.skills} />
        <Experience
          experience={experience}
          education={education}
          heading={sections.experience}
        />
        <Projects projects={projects} heading={sections.projects} />
        <Certifications
          certifications={certifications}
          heading={sections.certifications}
        />
        <Contact site={site} socials={socials} heading={sections.contact} />
      </main>
      <Footer site={site} socials={socials} nav={nav} />
      <BackToTop />
    </>
  );
}

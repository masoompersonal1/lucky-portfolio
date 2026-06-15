import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Works from "@/components/sections/Works";
import Services from "@/components/sections/Services";
import Exhibitions from "@/components/sections/Exhibitions";
import Footer from "@/components/sections/Footer";
import { client } from "@/sanity/lib/client";
import { heroQuery } from "@/lib/sanity/queries";

export default async function Home() {
  let heroData = null;
  
  try {
    heroData = await client.fetch(heroQuery);
  } catch (error) {
    console.warn("Failed to fetch Sanity data (likely using dummy project ID). Using fallbacks.");
  }

  return (
    <main className="w-full min-h-screen relative flex flex-col overflow-x-hidden bg-[#c0c0c0]">
      <Navbar />
      <Hero data={heroData} />
      
      {/* About Section */}
      <About />
      
      {/* Works Section */}
      <Works />
      
      {/* Services Section */}
      <Services />
      
      {/* Exhibitions Section */}
      <Exhibitions />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}




import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import { PortfolioContent } from "@/lib/models";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ContactPage() {
  let content = null;
  
  try {
    await connectToDatabase();
    const doc = await PortfolioContent.findOne();
    if (doc) {
      content = JSON.parse(JSON.stringify(doc));
    }
  } catch (error) {
    console.warn("Failed to fetch MongoDB content.");
  }

  const data = content || {};
  const footer = data.footer || {};
  const socials = data.socials || {};

  return (
    <main className="min-h-screen bg-[#c0c0c0] text-black flex flex-col relative overflow-hidden">
      {/* Back Button */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-10">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-[#cc0000] transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 pt-24 text-center relative z-0">
        <h1 className="text-[12vw] leading-none font-bold tracking-tighter uppercase mb-8 hover:scale-105 transition-transform duration-500">
          CONTACT
        </h1>
        
        <div className="max-w-md w-full space-y-6">
          <p className="text-lg font-medium tracking-wide">
            Let&apos;s create something extraordinary together.
          </p>
          
          <a 
            href={`mailto:${footer.email || "hello@example.com"}`} 
            className="block w-full py-4 px-8 bg-black text-white text-xl font-bold tracking-widest uppercase hover:bg-[#cc0000] transition-colors rounded-full truncate"
          >
            {footer.email || "hello@example.com"}
          </a>

          {footer.mobile && (
            <a 
              href={`tel:${footer.mobile.replace(/ /g,'')}`} 
              className="block w-full py-4 px-8 border-2 border-black text-black text-xl font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors rounded-full mt-4"
            >
              {footer.mobile}
            </a>
          )}
          
          <div className="pt-8">
            <div className="font-['Brush_Script_MT','Brush_Script_Std',cursive] text-4xl text-[#cc0000]">
              Guent
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only Big Social Cards anchored to bottom */}
      <div className="flex md:hidden w-full gap-4 p-6 mt-auto">
        {socials?.enableInstagram !== false && (
          <a 
            href={socials?.instagram || "https://instagram.com"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 bg-black/5 border border-black/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-black/10 transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <span className="text-black text-xs font-bold tracking-widest uppercase">Instagram</span>
          </a>
        )}
        {socials?.enableWhatsapp !== false && (
          <a 
            href={socials?.whatsapp || "https://wa.me/917676343642"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#20b858] transition-all active:scale-95 shadow-lg shadow-[#25D366]/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            <span className="text-white text-xs font-bold tracking-widest uppercase">WhatsApp</span>
          </a>
        )}
      </div>
    </main>
  );
}

import React, { useState } from "react";
import { Search, Download, Youtube, ArrowRight, Image as ImageIcon, AlertTriangle, Clipboard } from "lucide-react";
import axios from "axios";
import { Toaster, toast } from "sonner";

// Use environment variable for backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";
const API = `${BACKEND_URL}/api`;

const HeroInput = ({ onSearch, loading }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSearch(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-20 relative z-10">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="PASTE YOUTUBE URL HERE"
          className="w-full bg-transparent border-b-2 border-white/20 focus:border-primary text-2xl md:text-5xl py-8 px-0 rounded-none placeholder:text-white/20 transition-all duration-300 focus:outline-none font-heading uppercase tracking-tight data-[filled=true]:border-white"
          data-testid="url-input"
          data-filled={url.length > 0}
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent text-white/50 hover:text-primary transition-colors disabled:opacity-50"
          data-testid="search-button"
        >
          {loading ? (
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
          ) : (
            <ArrowRight className="w-12 h-12 md:w-16 md:h-16" />
          )}
        </button>
      </form>
      <div className="flex items-center gap-4 mt-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        <span>Supported:</span>
        <span className="text-white">Video</span>
        <span className="text-white">Shorts</span>
        <span className="text-white">Embeds</span>
      </div>
    </div>
  );
};

const QualityCard = ({ label, res, url, isHero = false }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `yt-thumbnail-${label.toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      toast.success(`Downloaded ${label} quality`);
    } catch (error) {
        // Fallback for cross-origin issues if fetch fails directly (though img.youtube usually allows)
        window.open(url, "_blank");
        toast.info("Opened in new tab (Download manually)");
    }
  };

  return (
    <div 
      className={`group relative bg-[#0A0A0A] border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-300 ${isHero ? 'col-span-1 md:col-span-2 row-span-2' : ''}`}
      data-testid={`quality-card-${label}`}
    >
      <div className="absolute top-0 left-0 p-4 z-10 flex flex-col gap-1">
        <span className="bg-primary text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">{label}</span>
        <span className="text-xs font-mono text-white/60">{res}</span>
      </div>

      <div className="w-full h-full aspect-video relative overflow-hidden">
        <img 
          src={url} 
          alt={`${label} Thumbnail`} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
                onClick={handleDownload}
                className="bg-white text-black px-6 py-3 font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors duration-200 flex items-center gap-2"
                data-testid={`download-btn-${label}`}
            >
                <Download className="w-4 h-4" />
                Download
            </button>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="border-t border-white/10 mt-20 py-12">
    <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <Youtube className="w-6 h-6 text-primary" />
        <span className="font-heading font-bold text-lg tracking-tight">YT GRABBER</span>
      </div>
      <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest text-center md:text-right">
        For Personal Use Only. <br className="hidden md:block"/>Respect Copyrights.
      </p>
    </div>
  </footer>
);

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (url) => {
    setLoading(true);
    setData(null);
    try {
      const response = await axios.post(`${API}/extract`, { url });
      setData(response.data);
      toast.success("Thumbnails Extracted");
    } catch (error) {
      console.error(error);
      toast.error("Invalid URL or Extraction Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white">
      <Toaster position="top-right" theme="dark" toastOptions={{
        style: { background: '#0A0A0A', border: '1px solid #333', color: '#fff', borderRadius: '0px' }
      }}/>
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary flex items-center justify-center">
                    <Youtube className="w-5 h-5 text-white fill-current" />
                </div>
                <span className="font-heading font-bold text-xl tracking-tighter">YT GRABBER</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
                <span className="text-xs font-mono text-muted-foreground">V 1.0</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
        </div>
      </header>

      <main className="flex-grow pt-40 px-4 md:px-8 container mx-auto">
        <div className="text-center mb-12 space-y-4">
            <h1 className="font-heading text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                Extract <span className="text-primary">Thumbnails</span> <br/>
                <span className="text-transparent stroke-text opacity-50">Instantly</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-mono text-sm tracking-wide">
                High-resolution extraction tool for content creators. No ads. No fluff.
            </p>
        </div>

        <HeroInput onSearch={handleSearch} loading={loading} />

        {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-accordion-down" data-testid="results-grid">
                <QualityCard 
                    label="MAX RES" 
                    res="1280x720 (HD)" 
                    url={data.thumbnails.maxres} 
                    isHero={true} 
                />
                <QualityCard label="HIGH" res="480x360" url={data.thumbnails.hq} />
                <QualityCard label="STANDARD" res="640x480" url={data.thumbnails.sd} />
                <QualityCard label="MEDIUM" res="320x180" url={data.thumbnails.mq} />
                <QualityCard label="DEFAULT" res="120x90" url={data.thumbnails.default} />
            </div>
        )}

        {!data && !loading && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30 pointer-events-none select-none">
                <div className="aspect-video border border-dashed border-white/20 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-white/20" />
                </div>
                <div className="aspect-video border border-dashed border-white/20 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-white/20" />
                </div>
                <div className="aspect-video border border-dashed border-white/20 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-white/20" />
                </div>
             </div>
        )}
      </main>

      <Footer />
      
      <style>{`
        .stroke-text {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

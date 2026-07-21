import React, { useState } from 'react';
import { Ruler, Info, Check, Sparkles, Sliders } from 'lucide-react';
import { SIZE_CHARTS } from '../data';

type FitType = 'Oversized' | 'Regular' | 'Slim' | 'Crop';

export default function SizeGuideView() {
  const [activeFit, setActiveFit] = useState<FitType>('Oversized');

  const selectedChart = SIZE_CHARTS[activeFit];

  return (
    <div className="bg-white min-h-screen text-street-black font-sans py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left border-b border-zinc-200 pb-6 mb-8">
          <span className="font-mono text-xs font-bold text-street-red uppercase tracking-widest">DRAPE GUIDELINES</span>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight text-street-black">
            FIT & SIZE GUIDE
          </h1>
          <p className="text-zinc-500 font-mono text-xs mt-1">
            Explore dimensional specs and styling recommendations across our 4 custom engineered streetwear fits.
          </p>
        </div>

        {/* Fit Type Tabs */}
        <div className="flex flex-wrap border-b border-zinc-200 mb-8 gap-2">
          {(Object.keys(SIZE_CHARTS) as FitType[]).map((fit) => (
            <button
              id={`fit-guide-tab-${fit.toLowerCase()}`}
              key={fit}
              onClick={() => setActiveFit(fit)}
              className={`pb-3 px-4 text-xs font-display font-bold uppercase tracking-wider border-b-2 transition-all ${
                activeFit === fit
                  ? 'border-street-red text-street-red font-black'
                  : 'border-transparent text-zinc-400 hover:text-street-black'
              }`}
            >
              {SIZE_CHARTS[fit].title}
            </button>
          ))}
        </div>

        {/* Content Workspace */}
        <div className="space-y-8">
          
          {/* Fit Information Callout */}
          <div className="border border-zinc-200 bg-zinc-50 p-6 text-left space-y-2">
            <h3 className="font-display font-black text-sm uppercase text-street-black tracking-wide">
              {selectedChart.title} Specification
            </h3>
            <p className="font-mono text-xs text-zinc-600 leading-relaxed">
              {selectedChart.instructions}
            </p>
          </div>

          {/* Sizing Table */}
          <div className="overflow-x-auto border border-zinc-200 bg-zinc-50">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-street-black text-white border-b border-zinc-700 font-bold uppercase text-[10px] tracking-wider">
                  {selectedChart.columns.map((col, idx) => (
                    <th key={idx} className="p-3 text-center sm:p-4">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedChart.rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-zinc-200 hover:bg-zinc-100 transition-colors text-center"
                  >
                    <td className="p-3 font-bold border-r border-zinc-200 bg-zinc-100 sm:p-4">{row.size}</td>
                    <td className="p-3 sm:p-4">{row.chest} inches</td>
                    <td className="p-3 sm:p-4">{row.length} inches</td>
                    <td className="p-3 sm:p-4">{row.sleeve} inches</td>
                    <td className="p-3 sm:p-4">{row.shoulder} inches</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sizing recommendation box */}
          <div className="bg-zinc-50 p-6 border border-zinc-200 font-mono text-xs text-zinc-600 leading-relaxed text-left flex items-start space-x-4">
            <Info className="h-6 w-6 text-street-red shrink-0 animate-pulse" />
            <div>
              <h4 className="font-display font-bold text-sm text-street-black uppercase mb-1">GENERAL DRAPE FIT GUIDE</h4>
              <p className="mb-3">
                Measurements above represent the dimensions of the garment laid flat. Here are our crew recommendations based on height & weight:
              </p>
              <ul className="space-y-1.5 list-disc pl-4 text-zinc-500">
                <li>If your height is between <span className="font-bold text-street-black">5&apos;4&quot; – 5&apos;8&quot;</span> and you weigh less than 65kg, we recommend size <span className="font-bold text-street-black">S</span> or <span className="font-bold text-street-black">M</span>.</li>
                <li>If your height is between <span className="font-bold text-street-black">5&apos;8&quot; – 6&apos;0&quot;</span> and you weigh less than 80kg, we recommend size <span className="font-bold text-street-black">L</span> or <span className="font-bold text-street-black">XL</span>.</li>
                <li>For heights above <span className="font-bold text-street-black">6&apos;0&quot;</span> or an extremely dramatic baggy style, choose size <span className="font-bold text-street-black">XXL</span>.</li>
              </ul>
            </div>
          </div>

          {/* Sizing Model Grid Illustrative */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            
            <div className="bg-zinc-50 p-6 border border-zinc-200 text-left space-y-3">
              <div className="w-10 h-10 bg-street-black text-white flex items-center justify-center font-display font-black text-sm">GSM</div>
              <h4 className="font-display font-bold uppercase text-sm text-street-black tracking-wider">GSM VARIATIONS EXPLAINED</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                TeeCode designs premium tees with specific weights for different silhouettes. Our Oversized tees leverage ultra-stiff <span className="font-bold">240 GSM</span> cotton to hold a dramatic box shape. Our Regular and Crop drops are curated with premium <span className="font-bold">200-210 GSM</span> combed cotton for the perfect midweight drape, while Slim fits use highly breathable <span className="font-bold">190 GSM</span> cotton.
              </p>
            </div>

            <div className="bg-zinc-50 p-6 border border-zinc-200 text-left space-y-3">
              <div className="w-10 h-10 bg-street-black text-white flex items-center justify-center font-display font-black text-sm">FIT</div>
              <h4 className="font-display font-bold uppercase text-sm text-street-black tracking-wider">DIVERSE STREETWEAR CUTS</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                We believe streetwear is inclusive and experimental. While oversized drapes are iconic, fitted silhouettes (Slim Fit), standard layering blocks (Regular Fit), and modern cropped proportions (Crop Fit) offer the complete toolkit to customize your wardrobe and articulate your personal street style.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

import { useState } from 'react';
import { Share2, Droplets, FlaskConical, Save, Calculator, Wheat } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Translations
const translations = {
  en: {
    appTitle: "Bhumi Spray Calculator",
    tankMix: "Tank Mix",
    acreMix: "Per Acre",
    tankSize: "Tank Size (Liters)",
    dosagePerLiter: "Dosage per Liter (ml/gm)",
    numberOfTanks: "Number of Tanks (Optional)",
    calculate: "Calculate",
    resultPerTank: "Chemical Per Tank",
    resultTotal: "Total Chemical Required",
    cropType: "Crop Type",
    dosagePerAcre: "Dosage per Acre (ml/gm)",
    landSize: "Land Size (Acres)",
    resultAcre: "Total Chemical Needed",
    save: "Save",
    share: "Share",
    disclaimer: "Disclaimer: This calculator provides estimates. Always verify dosage with the product label.",
    selectCrop: "Select crop (Optional)",
    cotton: "Cotton",
    wheat: "Wheat",
    soybean: "Soybean",
    vegetables: "Vegetables",
  },
  hi: {
    appTitle: "भूमि स्प्रे कैलकुलेटर",
    tankMix: "टैंक मिक्स",
    acreMix: "प्रति एकड़",
    tankSize: "टैंक का आकार (लीटर)",
    dosagePerLiter: "खुराक प्रति लीटर (ml/gm)",
    numberOfTanks: "टैंकों की संख्या (वैकल्पिक)",
    calculate: "गणना करें",
    resultPerTank: "प्रति टैंक रसायनिक मात्रा",
    resultTotal: "कुल रसायनिक मात्रा",
    cropType: "फसल का प्रकार",
    dosagePerAcre: "खुराक प्रति एकड़ (ml/gm)",
    landSize: "भूमि का आकार (एकड़)",
    resultAcre: "कुल रसायनिक आवश्यकता",
    save: "सहेजें",
    share: "साझा करें",
    disclaimer: "अस्वीकरण: यह कैलकुलेटर अनुमान प्रदान करता है। हमेशा उत्पाद लेबल के साथ खुराक की पुष्टि करें।",
    selectCrop: "फसल चुनें (वैकल्पिक)",
    cotton: "कपास",
    wheat: "गेहूँ",
    soybean: "सोयाबीन",
    vegetables: "सब्जियां",
  }
};

type Language = 'en' | 'hi';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  
  const t = translations[lang];

  // Tank State
  const [tankSize, setTankSize] = useState<string>('15');
  const [dosageL, setDosageL] = useState<string>('');
  const [tankCount, setTankCount] = useState<string>('1');
  
  // Acre State
  const [cropType, setCropType] = useState<string>('');
  const [dosageAcre, setDosageAcre] = useState<string>('');
  const [landSize, setLandSize] = useState<string>('1');

  // Results
  const tankResult = parseFloat(tankSize || '0') * parseFloat(dosageL || '0');
  const totalTankResult = tankResult * parseFloat(tankCount || '1');
  const acreResult = parseFloat(dosageAcre || '0') * parseFloat(landSize || '0');

  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.appTitle,
          text: text,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="min-h-screen bg-muted/30 flex justify-center">
      <div className="w-full max-w-md bg-background min-h-screen shadow-xl border-x flex flex-col relative">
        
        {/* App Bar */}
        <header className="bg-primary text-primary-foreground p-4 shadow-md flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <TractorIcon className="h-6 w-6" />
            <h1 className="text-xl font-bold tracking-tight">{t.appTitle}</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLang}
            className="text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground font-semibold"
          >
            {lang === 'en' ? 'हिन्दी' : 'EN'}
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 pb-20">
          <Tabs defaultValue="tank" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 h-12 bg-muted/80 p-1">
              <TabsTrigger value="tank" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md font-medium text-base h-full">
                <FlaskConical className="h-4 w-4 mr-2" />
                {t.tankMix}
              </TabsTrigger>
              <TabsTrigger value="acre" className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md font-medium text-base h-full">
                <Wheat className="h-4 w-4 mr-2" />
                {t.acreMix}
              </TabsTrigger>
            </TabsList>

            {/* TANK MIX CALCULATOR */}
            <TabsContent value="tank" className="space-y-4 outline-none animate-in fade-in-50 duration-500">
              <Card className="border-border/50 shadow-sm overflow-hidden">
                <div className="bg-primary/5 p-4 border-b border-border/50">
                  <h2 className="font-semibold text-lg flex items-center text-primary">
                    <Droplets className="h-5 w-5 mr-2" />
                    {t.tankMix}
                  </h2>
                </div>
                <CardContent className="p-4 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="tankSize" className="text-sm font-medium text-foreground">{t.tankSize}</Label>
                    <div className="relative">
                      <Input 
                        id="tankSize" 
                        type="number" 
                        inputMode="decimal"
                        value={tankSize} 
                        onChange={(e) => setTankSize(e.target.value)} 
                        className="text-lg py-6 bg-background h-14 w-full px-4 rounded-xl font-medium border-border/60 focus-visible:ring-primary focus-visible:border-primary"
                        placeholder="15"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">L</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dosageL" className="text-sm font-medium text-foreground">{t.dosagePerLiter}</Label>
                    <div className="relative">
                      <Input 
                        id="dosageL" 
                        type="number" 
                        inputMode="decimal"
                        value={dosageL} 
                        onChange={(e) => setDosageL(e.target.value)} 
                        className="text-lg py-6 bg-background h-14 w-full px-4 rounded-xl font-medium border-border/60 focus-visible:ring-primary focus-visible:border-primary"
                        placeholder="e.g. 2.5"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">ml/g</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tankCount" className="text-sm font-medium text-foreground">{t.numberOfTanks}</Label>
                    <Input 
                      id="tankCount" 
                      type="number" 
                      inputMode="numeric"
                      value={tankCount} 
                      onChange={(e) => setTankCount(e.target.value)} 
                      className="text-lg py-6 bg-background h-14 w-full px-4 rounded-xl font-medium border-border/60 focus-visible:ring-primary focus-visible:border-primary"
                      placeholder="1"
                    />
                  </div>
                </CardContent>
              </Card>

              {dosageL && (
                <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20 animate-in slide-in-from-bottom-2 duration-300 shadow-sm mt-6">
                  <div className="flex flex-col gap-4">
                    <div className="bg-background rounded-xl p-4 shadow-sm border border-border/40">
                      <p className="text-sm text-muted-foreground mb-1 font-medium">{t.resultPerTank}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-primary">{tankResult.toFixed(2).replace(/\.00$/, '')}</span>
                        <span className="text-lg font-medium text-primary/70">ml/gm</span>
                      </div>
                    </div>
                    
                    {parseFloat(tankCount || '1') > 1 && (
                      <div className="bg-background rounded-xl p-4 shadow-sm border border-border/40">
                        <p className="text-sm text-muted-foreground mb-1 font-medium">{t.resultTotal}</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-foreground">{totalTankResult.toFixed(2).replace(/\.00$/, '')}</span>
                          <span className="text-base font-medium text-muted-foreground">ml/gm</span>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <Button 
                        variant="default" 
                        className="flex-1 py-6 rounded-xl text-md font-semibold shadow-md active:scale-[0.98] transition-transform" 
                        onClick={() => handleShare(`${t.appTitle}\n\n${t.tankSize}: ${tankSize}L\n${t.dosagePerLiter}: ${dosageL}ml\n${t.numberOfTanks}: ${tankCount}\n\n${t.resultPerTank}: ${tankResult.toFixed(2)}ml\n${t.resultTotal}: ${totalTankResult.toFixed(2)}ml`)}
                      >
                        <Share2 className="w-5 h-5 mr-2" />
                        {t.share}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* ACRE MIX CALCULATOR */}
            <TabsContent value="acre" className="space-y-4 outline-none animate-in fade-in-50 duration-500">
             <Card className="border-border/50 shadow-sm overflow-hidden">
                <div className="bg-primary/5 p-4 border-b border-border/50">
                  <h2 className="font-semibold text-lg flex items-center text-primary">
                    <Wheat className="h-5 w-5 mr-2" />
                    {t.acreMix}
                  </h2>
                </div>
                <CardContent className="p-4 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="cropType" className="text-sm font-medium text-foreground">{t.cropType}</Label>
                    <Select value={cropType} onValueChange={setCropType}>
                      <SelectTrigger className="text-lg h-14 bg-background rounded-xl font-medium border-border/60 focus:ring-primary">
                        <SelectValue placeholder={t.selectCrop} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cotton">{t.cotton}</SelectItem>
                        <SelectItem value="wheat">{t.wheat}</SelectItem>
                        <SelectItem value="soybean">{t.soybean}</SelectItem>
                        <SelectItem value="vegetables">{t.vegetables}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dosageAcre" className="text-sm font-medium text-foreground">{t.dosagePerAcre}</Label>
                    <div className="relative">
                      <Input 
                        id="dosageAcre" 
                        type="number" 
                        inputMode="decimal"
                        value={dosageAcre} 
                        onChange={(e) => setDosageAcre(e.target.value)} 
                        className="text-lg py-6 h-14 bg-background w-full px-4 rounded-xl font-medium border-border/60 focus-visible:ring-primary"
                        placeholder="e.g. 500"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">ml/acre</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="landSize" className="text-sm font-medium text-foreground">{t.landSize}</Label>
                    <div className="relative">
                      <Input 
                        id="landSize" 
                        type="number" 
                        inputMode="decimal"
                        value={landSize} 
                        onChange={(e) => setLandSize(e.target.value)} 
                        className="text-lg py-6 h-14 bg-background w-full px-4 rounded-xl font-medium border-border/60 focus-visible:ring-primary"
                        placeholder="1"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">acres</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {dosageAcre && (
                <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20 animate-in slide-in-from-bottom-2 duration-300 shadow-sm mt-6">
                  <div className="flex flex-col gap-4">
                    <div className="bg-background rounded-xl p-4 shadow-sm border border-border/40">
                      <p className="text-sm text-muted-foreground mb-1 font-medium">{t.resultAcre}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-primary">{acreResult.toFixed(2).replace(/\.00$/, '')}</span>
                        <span className="text-lg font-medium text-primary/70">ml/gm</span>
                      </div>
                      {cropType && <p className="text-sm mt-2 text-muted-foreground">For: {t[cropType as keyof typeof t] || cropType}</p>}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button 
                        variant="default" 
                        className="flex-1 py-6 rounded-xl text-md font-semibold shadow-md active:scale-[0.98] transition-transform" 
                        onClick={() => handleShare(`${t.appTitle}\n\n${t.cropType}: ${t[cropType as keyof typeof t] || 'N/A'}\n${t.dosagePerAcre}: ${dosageAcre}ml\n${t.landSize}: ${landSize} acres\n\n${t.resultAcre}: ${acreResult.toFixed(2)}ml`)}
                      >
                        <Share2 className="w-5 h-5 mr-2" />
                        {t.share}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>

        <footer className="mt-auto p-6 bg-muted/20 text-center border-t border-border/30">
          <p className="text-xs text-muted-foreground leading-relaxed">{t.disclaimer}</p>
          <p className="text-xs text-muted-foreground/60 mt-2">© {new Date().getFullYear()} Bhumi Growth</p>
        </footer>
      </div>
    </div>
  );
}

function TractorIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m11.1 5.9-2.5 1.4" />
      <path d="M12.9 8.2A3 3 0 0 0 10.4 7H8" />
      <path d="m14 11 3.5-2" />
      <path d="M14 6v5" />
      <path d="M15 15.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0Z" />
      <path d="M4 11.5a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0Z" />
      <path d="M6 16v2a2 2 0 0 0 2 2h6" />
      <path d="M7.5 11.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0Z" />
      <path d="M8 7v4.5" />
    </svg>
  )
}

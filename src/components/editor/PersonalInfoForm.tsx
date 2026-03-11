import { useState, useRef } from 'react';
import { User, Sparkles, Mail, Phone, MapPin, Globe, Camera, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SectionHeader } from './SectionHeader';
import { PersonalInfo } from '@/lib/types';
import { aiGeneratedSummaryStatement } from '@/ai/flows/ai-generated-summary-statement';
import { validateProfilePhoto } from '@/ai/flows/validate-profile-photo-flow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (info: Partial<PersonalInfo>) => void;
}

interface ValidationStatus {
  isValidating: boolean;
  isCompliant: boolean | null;
  reason?: string;
  dimensionValid: boolean | null;
}

export function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [validation, setValidation] = useState<ValidationStatus>({
    isValidating: false,
    isCompliant: null,
    dimensionValid: null
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAiSummary = async () => {
    if (!data.fullName) return;
    setIsGenerating(true);
    try {
      const result = await aiGeneratedSummaryStatement({
        keySkills: "Analytical, Creative, Team Player", 
        careerGoals: "Seeking entry level position in my field."
      });
      onChange({ summary: result.summaryStatement });
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const validateDimensions = (img: HTMLImageElement): boolean => {
    const ratio = img.width / img.height;
    // 2x2 inch = 1:1 ratio
    // 35x45 mm = 0.777 ratio
    const isSquare = Math.abs(ratio - 1) < 0.05;
    const isPassportTall = Math.abs(ratio - (35/45)) < 0.05;
    return isSquare || isPassportTall;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUri = reader.result as string;
        onChange({ profileImage: dataUri });
        
        // Client-side dimension check
        const img = new Image();
        img.onload = async () => {
          const dimOk = validateDimensions(img);
          
          setValidation({ 
            isValidating: true, 
            isCompliant: null, 
            dimensionValid: dimOk 
          });

          try {
            const aiResult = await validateProfilePhoto({ photoDataUri: dataUri });
            setValidation(prev => ({
              ...prev,
              isValidating: false,
              isCompliant: aiResult.isCompliant,
              reason: aiResult.reason
            }));
          } catch (error) {
            console.error('Validation failed', error);
            setValidation(prev => ({ ...prev, isValidating: false }));
          }
        };
        img.src = dataUri;
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    onChange({ profileImage: undefined });
    setValidation({ isValidating: false, isCompliant: null, dimensionValid: null });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-border/50">
      <SectionHeader icon={User} title="Personal Details" />
      
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-2 border-primary/20">
            <AvatarImage src={data.profileImage} className="object-cover" />
            <AvatarFallback className="bg-muted text-muted-foreground">
              <User size={40} />
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <Camera className="text-white" size={24} />
          </div>
          {data.profileImage && (
            <button 
              onClick={removeImage}
              className="absolute -top-1 -right-1 p-1 bg-destructive text-white rounded-full shadow-md hover:scale-110 transition-transform"
            >
              <X size={12} />
            </button>
          )}
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleImageUpload} 
        />
        <p className="text-[10px] text-muted-foreground mt-2 uppercase font-bold tracking-wider">Profile Photo</p>
        
        {/* Photo Validation Status */}
        {data.profileImage && (
          <div className="mt-4 w-full max-w-sm space-y-2">
            {validation.isValidating && (
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Loader2 size={14} className="animate-spin" />
                Validating photo requirements...
              </div>
            )}
            
            {!validation.isValidating && validation.isCompliant === true && validation.dimensionValid === true && (
              <Alert className="bg-green-50 border-green-200 py-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-xs font-bold text-green-800">Professional Match</AlertTitle>
                <AlertDescription className="text-[10px] text-green-700">
                  Photo meets posture, background, and dimension standards.
                </AlertDescription>
              </Alert>
            )}

            {!validation.isValidating && (validation.isCompliant === false || validation.dimensionValid === false) && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-xs font-bold">Requirement Issue</AlertTitle>
                <AlertDescription className="text-[10px]">
                  {validation.dimensionValid === false && "Dimensions should be 2x2\" (1:1) or 35x45mm (7:9). "}
                  {validation.reason || "Photo doesn't meet professional background or posture standards."}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              id="fullName"
              placeholder="Alex Johnson"
              className="pl-10"
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              id="email"
              type="email"
              placeholder="alex@example.com"
              className="pl-10"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              id="phone"
              placeholder="+1 234 567 890"
              className="pl-10"
              value={data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              id="location"
              placeholder="San Francisco, CA"
              className="pl-10"
              value={data.location}
              onChange={(e) => onChange({ location: e.target.value })}
            />
          </div>
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="website">Website / Portfolio</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              id="website"
              placeholder="https://portfolio.me"
              className="pl-10"
              value={data.website}
              onChange={(e) => onChange({ website: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="summary">Summary Statement</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAiSummary}
            disabled={isGenerating || !data.fullName}
            className="text-secondary hover:text-secondary/80 flex gap-2 h-8 px-2"
          >
            <Sparkles size={14} />
            {isGenerating ? 'Drafting...' : 'AI Draft'}
          </Button>
        </div>
        <Textarea
          id="summary"
          placeholder="Professional summary of your career and goals..."
          className="min-h-[120px] resize-none"
          value={data.summary}
          onChange={(e) => onChange({ summary: e.target.value })}
        />
      </div>
    </section>
  );
}

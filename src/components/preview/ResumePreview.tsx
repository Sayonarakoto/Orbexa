import { ResumeData } from '@/lib/types';
import { ModernTemplate } from './templates/Modern';
import { ExecutiveTemplate } from './templates/Executive';
import { CreativeTemplate } from './templates/Creative';
import { MinimalTemplate } from './templates/Minimal';
import { Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ResumePreview({ data }: { data: ResumeData }) {
  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    switch (data.templateId) {
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="sticky top-8 space-y-6 flex flex-col items-center">
      <div className="w-full flex justify-between items-center no-print">
        <h2 className="font-headline font-bold text-xl text-foreground">Real-time Preview</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex gap-2">
            <Share2 size={16} />
            Share
          </Button>
          <Button onClick={handlePrint} size="sm" className="bg-secondary hover:bg-secondary/90 flex gap-2">
            <Download size={16} />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="w-full overflow-auto bg-muted p-4 md:p-8 rounded-2xl border border-border/50 shadow-inner flex justify-center">
        <div className="resume-container w-full max-w-[800px] bg-white shadow-2xl rounded-sm origin-top">
          {renderTemplate()}
        </div>
      </div>

      <div className="text-center no-print">
        <p className="text-xs text-muted-foreground">
          Auto-saving to temporary session. Updates in real-time.
        </p>
      </div>
    </div>
  );
}

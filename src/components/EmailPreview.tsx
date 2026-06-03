import { Copy } from 'lucide-react';

interface EmailPreviewProps {
  email: string;
  onCopy: () => void;
  title: string;
}

export function EmailPreview({ email, onCopy, title }: EmailPreviewProps) {
  return (
    <div className="rounded-lg bg-slate-50 p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-medium text-slate-950">{title}</h3>
        <button
          onClick={onCopy}
          className="inline-flex h-9 shrink-0 items-center rounded-md bg-indigo-100 px-3 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </button>
      </div>
      <pre className="whitespace-pre-wrap rounded-md bg-white p-4 font-sans text-sm leading-6 text-slate-700 ring-1 ring-inset ring-slate-200">
        {email}
      </pre>
    </div>
  );
}

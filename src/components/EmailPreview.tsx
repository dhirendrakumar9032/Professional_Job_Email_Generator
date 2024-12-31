import { Copy } from 'lucide-react';

interface EmailPreviewProps {
  email: string;
  onCopy: () => void;
}

export function EmailPreview({ email, onCopy }: EmailPreviewProps) {
  return (
    <div className="relative">
      <div className="absolute right-4 top-4">
        <button
          onClick={onCopy}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </button>
      </div>
      <div className="bg-gray-50 rounded-lg p-6 h-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Generated Email</h3>
        <pre className="whitespace-pre-wrap font-sans text-gray-600 text-sm">
          {email}
        </pre>
      </div>
    </div>
  );
}
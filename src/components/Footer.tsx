export default function Footer() {
  return (
    <footer className="relative border-t border-green-500/10 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-gray-600">
          <span className="text-green-600">$</span> echo &quot;asdf © {new Date().getFullYear()} — all rights reserved&quot;
        </div>
        <div className="font-mono text-xs text-gray-700">
          built with <span className="text-green-600">love</span> &amp; <span className="text-red-500">caffeine</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs text-gray-600">systems operational</span>
        </div>
      </div>
    </footer>
  );
}

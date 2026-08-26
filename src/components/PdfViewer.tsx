import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Download, ExternalLink, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

// Configure the worker using local bundler asset or jsdelivr CDN fallback
if (typeof window !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();
  } catch {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  }
}

interface PdfViewerProps {
  url: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.25);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);

  // Load PDF Document
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const loadingTask = pdfjsLib.getDocument({
      url,
      cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
      cMapPacked: true,
    });

    loadingTask.promise
      .then((doc) => {
        if (!isMounted) return;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setCurrentPage(1);
        setLoading(false);
      })
      .catch((err) => {
        // Ignore deliberate aborts during unmount / StrictMode re-renders
        if (!isMounted || err?.name === 'AbortException' || err?.message?.includes('aborted')) {
          return;
        }
        console.error('Failed to load PDF via PDF.js:', err);
        setError('Could not load PDF document directly in the canvas viewer.');
        setLoading(false);
      });

    return () => {
      isMounted = false;
      try {
        loadingTask.destroy();
      } catch {
        // Ignore cleanup errors
      }
    };
  }, [url]);

  // Render Current Page
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let isCancelled = false;

    pdfDoc.getPage(currentPage).then((page) => {
      if (isCancelled) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d', { alpha: false });
      if (!context) return;

      // Cancel any ongoing render task
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // ignore
        }
      }

      const pixelRatio = window.devicePixelRatio || 1;
      const viewport = page.getViewport({ scale });

      // Canvas dimensions for sharp Hi-DPI display
      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const renderContext = {
        canvasContext: context,
        viewport,
      };

      const task = page.render(renderContext);
      renderTaskRef.current = task;

      task.promise
        .then(() => {
          renderTaskRef.current = null;
        })
        .catch((renderErr: any) => {
          if (
            renderErr?.name !== 'RenderingCancelledException' &&
            !renderErr?.message?.includes('cancelled')
          ) {
            console.error('Page render error:', renderErr);
          }
        });
    });

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [pdfDoc, currentPage, scale]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.75));
  };

  const handleResetZoom = () => {
    setScale(1.25);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, numPages));
  };

  return (
    <div className="flex flex-col w-full">
      {/* Viewer Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#07140F]/90 border-b border-white/10 text-xs font-mono text-[#D5E2D8]">
        {/* Page Navigation */}
        <div className="flex items-center space-x-2">
          <button
            id="pdf-prev-page-btn"
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage <= 1 || loading}
            aria-label="Previous Page"
            className="p-1.5 rounded-sm bg-[#0C231B] border border-[#1E4535] hover:border-[#E8754D] hover:text-[#FAF9F5] disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 py-1 bg-[#0A1A14] border border-white/10 rounded-sm text-[#FAF9F5] min-w-[70px] text-center">
            {loading ? '...' : `${currentPage} / ${numPages || 1}`}
          </span>
          <button
            id="pdf-next-page-btn"
            type="button"
            onClick={handleNextPage}
            disabled={currentPage >= numPages || loading}
            aria-label="Next Page"
            className="p-1.5 rounded-sm bg-[#0C231B] border border-[#1E4535] hover:border-[#E8754D] hover:text-[#FAF9F5] disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1.5">
          <button
            id="pdf-zoom-out-btn"
            type="button"
            onClick={handleZoomOut}
            disabled={scale <= 0.75 || loading}
            aria-label="Zoom Out"
            className="p-1.5 rounded-sm bg-[#0C231B] border border-[#1E4535] hover:border-[#E8754D] hover:text-[#FAF9F5] disabled:opacity-40 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="px-2 text-[11px] text-[#A5BDAE] min-w-[45px] text-center font-mono">
            {Math.round(scale * 100)}%
          </span>
          <button
            id="pdf-zoom-in-btn"
            type="button"
            onClick={handleZoomIn}
            disabled={scale >= 2.5 || loading}
            aria-label="Zoom In"
            className="p-1.5 rounded-sm bg-[#0C231B] border border-[#1E4535] hover:border-[#E8754D] hover:text-[#FAF9F5] disabled:opacity-40 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            id="pdf-reset-zoom-btn"
            type="button"
            onClick={handleResetZoom}
            disabled={loading}
            aria-label="Fit Page"
            className="p-1.5 rounded-sm bg-[#0C231B] border border-[#1E4535] hover:border-[#E8754D] hover:text-[#FAF9F5] disabled:opacity-40 transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <a
            id="pdf-open-tab-btn"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#0C231B] border border-[#1E4535] hover:border-[#E8754D] hover:text-[#FAF9F5] rounded-sm transition-colors text-[11px]"
          >
            <span>OPEN TAB</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#A5BDAE]" />
          </a>
          <a
            id="pdf-download-toolbar-btn"
            href={url}
            download="Niranjan-Resume.pdf"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#E8754D] text-[#07140F] hover:bg-[#FAF9F5] font-bold rounded-sm transition-colors text-[11px]"
          >
            <span>DOWNLOAD</span>
            <Download className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* PDF Canvas Display Area */}
      <div className="relative min-h-[500px] sm:min-h-[700px] lg:min-h-[880px] w-full overflow-auto p-4 sm:p-8 flex items-center justify-center bg-[#050D0A] scrollbar-thin">
        {loading && (
          <div className="flex flex-col items-center justify-center space-y-3 py-20 text-[#A5BDAE]">
            <Loader2 className="w-8 h-8 text-[#E8754D] animate-spin" />
            <span className="text-xs font-mono tracking-widest uppercase">Rendering Resume PDF...</span>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center max-w-md text-center p-8 bg-[#0C231B]/90 border border-red-500/30 rounded-md space-y-4">
            <AlertCircle className="w-10 h-10 text-[#E8754D]" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-[#FAF9F5]">Document Preview Protected</h4>
              <p className="text-xs text-[#BACBBF] leading-relaxed">
                Direct in-browser preview was intercepted. You can view or download the actual file directly:
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={url}
                download="Niranjan-Resume.pdf"
                className="px-4 py-2 bg-[#E8754D] text-[#07140F] text-xs font-bold uppercase rounded-sm hover:bg-[#FAF9F5] transition-colors"
              >
                Download PDF
              </a>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#17382D] border border-white/10 text-[#FAF9F5] text-xs font-semibold uppercase rounded-sm hover:bg-[#1E4535] transition-colors"
              >
                Open in Tab
              </a>
            </div>
          </div>
        )}

        {/* The rendered Canvas */}
        <canvas
          ref={canvasRef}
          className={`shadow-[0_15px_40px_rgba(0,0,0,0.85)] rounded-xs bg-white transition-opacity duration-300 ${
            loading || error ? 'hidden' : 'block'
          }`}
        />
      </div>
    </div>
  );
};

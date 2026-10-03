import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import type { ExportSettings, SceneTemplate } from '../types/qr';

function triggerDownload(blobOrUrl: Blob | string, filename: string) {
  const url = typeof blobOrUrl === 'string' ? blobOrUrl : URL.createObjectURL(blobOrUrl);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  if (typeof blobOrUrl !== 'string') {
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }
}

export async function downloadScenePng(
  sceneContainerEl: HTMLElement | null,
  settings: ExportSettings,
  templateName: string
): Promise<boolean> {
  const filename = `qrify-${templateName.toLowerCase().replace(/\s+/g, '-')}-${settings.resolution}px.png`;

  try {
    if (!sceneContainerEl) return false;
    const rect = sceneContainerEl.getBoundingClientRect();
    const width = rect.width || 400;
    const pixelRatio = Math.max(1, settings.resolution / width);

    const dataUrl = await toPng(sceneContainerEl, {
      pixelRatio,
      cacheBust: true,
      backgroundColor: settings.transparentBg ? undefined : '#ffffff',
    });

    triggerDownload(dataUrl, filename);
    return true;
  } catch (error) {
    console.error('PNG scene export failed:', error);
    return false;
  }
}

export async function downloadSceneSvg(
  svgElement: SVGSVGElement | null,
  templateName: string
): Promise<boolean> {
  const filename = `qrify-${templateName.toLowerCase().replace(/\s+/g, '-')}.svg`;

  try {
    if (!svgElement) return false;

    // Clone and serialize
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElement);

    // Ensure xml namespace is present
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    triggerDownload(blob, filename);
    return true;
  } catch (error) {
    console.error('SVG scene export failed:', error);
    return false;
  }
}

export async function downloadScenePdf(
  sceneContainerEl: HTMLElement | null,
  template: SceneTemplate,
  encodedData: string
): Promise<boolean> {
  try {
    if (!sceneContainerEl) return false;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59);
    doc.text('QRify Studio Export', pageWidth / 2, 28, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Scene: ${template.name} • ${template.category.toUpperCase()}`, pageWidth / 2, 35, { align: 'center' });

    // Render Scene image
    const dataUrl = await toPng(sceneContainerEl, { pixelRatio: 3, cacheBust: true });

    // Aspect ratio calculation
    const [vw, vh] = template.viewBox;
    const imgWidth = 120; // mm
    const imgHeight = (imgWidth * vh) / vw;
    const imgX = (pageWidth - imgWidth) / 2;
    const imgY = 44;

    doc.addImage(dataUrl, 'PNG', imgX, imgY, imgWidth, imgHeight);

    doc.save(`qrify-${template.name.toLowerCase().replace(/\s+/g, '-')}-print.pdf`);
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    return false;
  }
}

export async function copySceneToClipboard(sceneContainerEl: HTMLElement | null): Promise<boolean> {
  if (!sceneContainerEl) return false;

  try {
    const dataUrl = await toPng(sceneContainerEl, { pixelRatio: 2, cacheBust: true });
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

export async function shareQr(urlOrText: string, title = 'Scan this QR code'): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text: 'Generated with QRify Studio',
        url: urlOrText,
      });
      return true;
    } catch {
      // Ignored
    }
  }

  try {
    await navigator.clipboard.writeText(urlOrText);
    return true;
  } catch {
    return false;
  }
}

import imageCompression from "browser-image-compression";

const MAIN_MAX_WIDTH = 1280; // longest side
const MAIN_MAX_SIZE_MB = 0.3; // target: under 300 KB before sending to the AI
const MAIN_QUALITY = 0.82;
const MAX_FILE_BYTES = 20 * 1024 * 1024; // reject uploads over 20 MB before compressing

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Couldn't read that image."));
    reader.readAsDataURL(file);
  });
}

export async function readFileAsBase64(file) {
  return base64FromDataUrl(await readFileAsDataUrl(file));
}

/** Convert a data URL (e.g. a webcam screenshot) into a Blob. */
export function dataUrlToBlob(dataUrl) {
  const [head, body] = dataUrl.split(",");
  const mime = head.match(/data:([^;]+)/)?.[1] || "image/jpeg";
  const bin = atob(body);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

/** Strip the "data:image/jpeg;base64," prefix — send only raw base64 to the API. */
export function base64FromDataUrl(dataUrl) {
  const comma = dataUrl.indexOf(",");
  return comma === -1 ? dataUrl : dataUrl.slice(comma + 1);
}

async function compress(source, { maxWidthOrHeight, maxSizeMB, initialQuality }) {
  const file =
    source instanceof File
      ? source
      : new File([source], "plant.jpg", { type: source.type || "image/jpeg" });
  return imageCompression(file, {
    maxSizeMB,
    maxWidthOrHeight,
    initialQuality,
    useWebWorker: true, // keep the main thread responsive
    fileType: "image/jpeg",
  });
}

/** Compress a File/Blob for the diagnosis API (target < 300 KB). Returns a JPEG File. */
export function compressForDiagnosis(source) {
  return compress(source, {
    maxWidthOrHeight: MAIN_MAX_WIDTH,
    maxSizeMB: MAIN_MAX_SIZE_MB,
    initialQuality: MAIN_QUALITY,
  });
}

export function isReasonableUpload(file) {
  return file.type.startsWith("image/") && file.size <= MAX_FILE_BYTES;
}

/**
 * Lightweight photo-quality heuristic — not another AI model, just a quick
 * sanity check on brightness and detail before sending the image off.
 * Returns { brightness (0..1), detail (0..1), width, height }.
 */
export async function analyzePhoto(dataUrl) {
  const img = new Image();
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = () => reject(new Error("Couldn't read that image."));
    img.src = dataUrl;
  });

  const width = img.naturalWidth;
  const height = img.naturalHeight;
  const size = 48; // tiny sampling canvas is plenty
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);

  let sum = 0;
  let sumSq = 0;
  const count = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    // Perceived luminance
    const l = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    sum += l;
    sumSq += l * l;
  }
  const brightness = sum / count / 255;
  const variance = Math.max(0, sumSq / count - (sum / count) ** 2);
  const detail = Math.min(1, Math.sqrt(variance) / 60);

  return { brightness, detail, width, height };
}

/** A photo that would be genuinely hard for the AI to read. */
export function isProblematicPhoto(a) {
  if (!a) return false;
  return (
    a.width < 200 ||
    a.height < 200 ||
    a.brightness < 0.18 ||
    (a.detail < 0.12 && a.brightness < 0.35)
  );
}

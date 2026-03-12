import { useState, useRef, useCallback, useEffect } from 'react';
import { loadModels, detectFaces, FaceRecognizer, type FaceResult } from '@/lib/faceDetection';

const recognizer = new FaceRecognizer();

export function useFaceDetection() {
  const [modelsReady, setModelsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [detecting, setDetecting] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageNaturalSize, setImageNaturalSize] = useState({ w: 800, h: 500 });
  const [faces, setFaces] = useState<FaceResult[]>([]);
  const [selectedFace, setSelectedFace] = useState<number | null>(null);
  const [recognizedNames, setRecognizedNames] = useState<Map<number, string>>(new Map());
  const [knownFaces, setKnownFaces] = useState<string[]>([]);

  useEffect(() => {
    loadModels()
      .then(() => { setModelsReady(true); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const processImage = useCallback(async (src: string) => {
    setImageSrc(src);
    setFaces([]);
    setSelectedFace(null);
    setRecognizedNames(new Map());
    setDetecting(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    await new Promise(r => (img.onload = r));
    setImageNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });

    const results = await detectFaces(img);
    setFaces(results);

    const names = new Map<number, string>();
    results.forEach(f => {
      const match = recognizer.recognize(f.descriptor);
      if (match) names.set(f.id, match.label);
    });
    setRecognizedNames(names);
    setDetecting(false);
  }, []);

  const labelFace = useCallback((id: number, name: string) => {
    const face = faces.find(f => f.id === id);
    if (!face) return;
    recognizer.addFace(name, face.descriptor);
    setRecognizedNames(prev => new Map(prev).set(id, name));
    setKnownFaces([...recognizer.knownFaces]);
  }, [faces]);

  const removeFace = useCallback((name: string) => {
    recognizer.removeFace(name);
    setKnownFaces([...recognizer.knownFaces]);
  }, []);

  const selectedFaceData = faces.find(f => f.id === selectedFace) || null;

  return {
    modelsReady, loading, detecting, imageSrc, imageNaturalSize,
    faces, selectedFace, setSelectedFace, recognizedNames,
    knownFaces, selectedFaceData, processImage, labelFace, removeFace,
  };
}
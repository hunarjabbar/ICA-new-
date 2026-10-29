import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Locale } from '../../types';
import { 
  Building2, Layers, CheckCircle2, ShieldCheck, 
  ArrowRight, Download, Calculator, Sparkles, Building, 
  AlertCircle, Eye, Compass, RotateCcw, ChevronDown, ChevronUp,
  Maximize2, X, Check, DollarSign
} from 'lucide-react';

export interface BoothItem {
  id: string;
  hall: string;
  hallName: string;
  sector: string;
  sectorName: string;
  size: string;
  type: string;
  price: number;
  status: 'available' | 'reserved' | 'selected';
  exhibitor?: string;
  x: number;
  z: number;
  width: number;
  depth: number;
}

interface SummitFloorPlan3DProps {
  lang: Locale;
  onBoothSelect?: (booth: BoothItem) => void;
  selectedBoothId?: string;
}

export function SummitFloorPlan3D({ lang, onBoothSelect, selectedBoothId }: SummitFloorPlan3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHall, setActiveHall] = useState<'ALL' | 'A' | 'B' | 'C' | 'OUTDOOR'>('ALL');
  const [booths, setBooths] = useState<BoothItem[]>([]);
  const [selectedBooth, setSelectedBooth] = useState<BoothItem | null>(null);
  const [hoveredBooth, setHoveredBooth] = useState<BoothItem | null>(null);
  const [hudCollapsed, setHudCollapsed] = useState(false);
  const [is2DMode, setIs2DMode] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    sector: '',
    notes: ''
  });

  // Camera target vectors for animation
  const cameraTargetRef = useRef(new THREE.Vector3(0, 18, 24));
  const lookAtTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const boothMeshesRef = useRef<{ mesh: THREE.Mesh; booth: BoothItem }[]>([]);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Load booths from API
  useEffect(() => {
    let mounted = true;
    fetch('/api/summit/floorplan/booths')
      .then(r => r.json())
      .then(data => {
        if (mounted && data.booths) {
          setBooths(data.booths);
          const initial = data.booths.find((b: any) => b.id === (selectedBoothId || 'A-108')) || data.booths[0];
          setSelectedBooth(initial);
          if (onBoothSelect) onBoothSelect(initial);
        }
      })
      .catch(err => {
        console.error('Failed to load booths:', err);
      });
    return () => { mounted = false; };
  }, [selectedBoothId]);

  // Setup Three.js WebGL Scene
  useEffect(() => {
    if (is2DMode || !mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // 1. Scene with clean porcelain studio background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.025);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 20, 26);
    cameraRef.current = camera;

    // 3. Renderer with high color fidelity
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting: Crisp high-key studio rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 0.6);
    hemiLight.position.set(0, 30, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(15, 25, 18);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 60;
    dirLight.shadow.camera.left = -18;
    dirLight.shadow.camera.right = 18;
    dirLight.shadow.camera.top = 18;
    dirLight.shadow.camera.bottom = -18;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xfee2e2, 0.5); // subtle warm ruby rim
    rimLight.position.set(-15, 12, -15);
    scene.add(rimLight);

    // 5. Floorplate: Clean porcelain exhibition hall foundation
    const floorGeo = new THREE.PlaneGeometry(38, 28);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
      metalness: 0.05
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Grid markings on floor
    const gridHelper = new THREE.GridHelper(38, 38, 0xdc2626, 0xe2e8f0);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Perimeter architectural boundary lines (pure red and slate)
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.4,
      metalness: 0.1,
      transparent: true,
      opacity: 0.8
    });
    const wallGeoBack = new THREE.BoxGeometry(38, 1.5, 0.4);
    const wallBack = new THREE.Mesh(wallGeoBack, wallMat);
    wallBack.position.set(0, 0.75, -14);
    scene.add(wallBack);

    // 6. Build procedural 3D booth meshes
    boothMeshesRef.current = [];
    const meshesList: { mesh: THREE.Mesh; booth: BoothItem }[] = [];

    booths.forEach((b) => {
      const isSelected = selectedBooth?.id === b.id;
      const isReserved = b.status === 'reserved';

      const boothGroup = new THREE.Group();
      boothGroup.position.set(b.x, 0, b.z);

      // Base Carpet / Floor
      const baseGeo = new THREE.BoxGeometry(b.width, 0.1, b.depth);
      const baseColor = isSelected 
        ? 0xdc2626 // vibrant red
        : isReserved 
        ? 0xfca5a5 // soft rose reserved
        : 0xffffff; // crisp white available

      const baseMat = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: isSelected ? 0.2 : 0.4,
        metalness: isSelected ? 0.2 : 0.05
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = 0.05;
      baseMesh.castShadow = true;
      baseMesh.receiveShadow = true;
      boothGroup.add(baseMesh);

      // Walls for Shell Scheme Booth
      const backWallGeo = new THREE.BoxGeometry(b.width, 1.4, 0.1);
      const wallColor = isSelected ? 0xb91c1c : 0xf8fafc;
      const boothWallMat = new THREE.MeshStandardMaterial({
        color: wallColor,
        roughness: 0.3,
        metalness: 0.1
      });
      const backWall = new THREE.Mesh(backWallGeo, boothWallMat);
      backWall.position.set(0, 0.7, -b.depth / 2 + 0.05);
      backWall.castShadow = true;
      boothGroup.add(backWall);

      // Side Wall
      const sideWallGeo = new THREE.BoxGeometry(0.1, 1.4, b.depth);
      const sideWall = new THREE.Mesh(sideWallGeo, boothWallMat);
      sideWall.position.set(-b.width / 2 + 0.05, 0.7, 0);
      sideWall.castShadow = true;
      boothGroup.add(sideWall);

      // Display Counter
      const counterGeo = new THREE.BoxGeometry(b.width * 0.45, 0.65, 0.5);
      const counterMat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0xffffff : 0xdc2626,
        roughness: 0.2,
        metalness: 0.1
      });
      const counter = new THREE.Mesh(counterGeo, counterMat);
      counter.position.set(b.width * 0.2, 0.35, b.depth * 0.2);
      counter.castShadow = true;
      boothGroup.add(counter);

      // Overhead Signboard Fascia
      const fasciaGeo = new THREE.BoxGeometry(b.width * 0.8, 0.35, 0.1);
      const fasciaMat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0xffffff : 0xdc2626,
        roughness: 0.2,
        emissive: isSelected ? 0xdc2626 : 0x000000,
        emissiveIntensity: isSelected ? 0.4 : 0
      });
      const fascia = new THREE.Mesh(fasciaGeo, fasciaMat);
      fascia.position.set(0, 1.6, -b.depth / 2 + 0.15);
      boothGroup.add(fascia);

      // Interactive Click/Hover Collider Mesh
      const colliderGeo = new THREE.BoxGeometry(b.width + 0.2, 2.0, b.depth + 0.2);
      const colliderMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
      const colliderMesh = new THREE.Mesh(colliderGeo, colliderMat);
      colliderMesh.position.y = 1.0;
      boothGroup.add(colliderMesh);

      // Metadata on collider
      (colliderMesh as any).boothData = b;
      meshesList.push({ mesh: colliderMesh, booth: b });

      scene.add(boothGroup);
    });

    boothMeshesRef.current = meshesList;

    // 7. Raycasting Setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshesList.map(m => m.mesh));
      if (intersects.length > 0) {
        const hit = (intersects[0].object as any).boothData as BoothItem;
        setHoveredBooth(hit);
        renderer.domElement.style.cursor = 'pointer';
      } else {
        setHoveredBooth(null);
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshesList.map(m => m.mesh));
      if (intersects.length > 0) {
        const hit = (intersects[0].object as any).boothData as BoothItem;
        setSelectedBooth(hit);
        if (onBoothSelect) onBoothSelect(hit);
        // Animate camera look-at towards hit booth
        lookAtTargetRef.current.set(hit.x, 0, hit.z);
      }
    };

    renderer.domElement.addEventListener('mousemove', handlePointerMove);
    renderer.domElement.addEventListener('click', handleClick);

    // 8. Animation & Damping Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth camera position damping
      camera.position.x = THREE.MathUtils.damp(camera.position.x, cameraTargetRef.current.x, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, cameraTargetRef.current.y, 4, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraTargetRef.current.z, 4, delta);

      // Smooth lookAt target damping
      currentLookAtRef.current.x = THREE.MathUtils.damp(currentLookAtRef.current.x, lookAtTargetRef.current.x, 5, delta);
      currentLookAtRef.current.y = THREE.MathUtils.damp(currentLookAtRef.current.y, lookAtTargetRef.current.y, 5, delta);
      currentLookAtRef.current.z = THREE.MathUtils.damp(currentLookAtRef.current.z, lookAtTargetRef.current.z, 5, delta);

      camera.lookAt(currentLookAtRef.current);
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handlePointerMove);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
    };
  }, [booths, selectedBooth, is2DMode]);

  // Camera Presets
  const handleViewPreset = (view: 'overview' | 'hallA' | 'hallB' | 'hallC' | 'outdoor' | 'top') => {
    if (view === 'overview') {
      cameraTargetRef.current.set(0, 20, 26);
      lookAtTargetRef.current.set(0, 0, 0);
      setActiveHall('ALL');
    } else if (view === 'hallA') {
      cameraTargetRef.current.set(0, 12, 12);
      lookAtTargetRef.current.set(0, 0, -2);
      setActiveHall('A');
    } else if (view === 'hallB') {
      cameraTargetRef.current.set(0, 12, 14);
      lookAtTargetRef.current.set(0, 0, 0);
      setActiveHall('B');
    } else if (view === 'hallC') {
      cameraTargetRef.current.set(0, 11, 14);
      lookAtTargetRef.current.set(0, 0, 1);
      setActiveHall('C');
    } else if (view === 'outdoor') {
      cameraTargetRef.current.set(0, 14, 18);
      lookAtTargetRef.current.set(0, 0, -2);
      setActiveHall('OUTDOOR');
    } else if (view === 'top') {
      cameraTargetRef.current.set(0, 32, 0.1);
      lookAtTargetRef.current.set(0, 0, 0);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooth) return;
    try {
      const res = await fetch(`/api/summit/floorplan/booths/${selectedBooth.id}/reserve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: bookingForm.companyName,
          contactName: bookingForm.contactName,
          email: bookingForm.email,
          phone: bookingForm.phone,
          sector: selectedBooth.sector,
          notes: bookingForm.notes
        })
      });
      const data = await res.json();
      if (data.success) {
        setBookingSubmitted(true);
        // Refresh booths
        setBooths(prev => prev.map(b => b.id === selectedBooth.id ? { ...b, status: 'reserved', exhibitor: bookingForm.companyName } : b));
      }
    } catch (err) {
      console.error('Reservation failed:', err);
    }
  };

  const filteredBooths = useMemo(() => {
    if (activeHall === 'ALL') return booths;
    return booths.filter(b => b.hall === activeHall);
  }, [booths, activeHall]);

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm relative">
      {/* Top Header Strip: Strictly Red and White */}
      <div className="px-6 py-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest">
              <span>{lang === 'ar' ? 'معرض السليمانية الدولي' : lang === 'zh' ? '苏莱曼尼亚国际会展中心' : 'Sulaymaniyah Fairground'}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-600 font-semibold">{lang === 'ar' ? 'المخطط التفاعلي ثلاثي الأبعاد' : lang === 'zh' ? '3D空间交互选位' : 'Interactive 3D Floorplan'}</span>
            </div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              {lang === 'ar' ? 'حجز الأجنحة والقطاعات الاقتصادية الـ١١' : lang === 'zh' ? '博览会展馆立体漫游与实时展位选定' : 'Bilateral Expo 3D Spatial Walkthrough'}
            </h2>
          </div>
        </div>

        {/* 2D / 3D Mode Toggle & Reset View */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIs2DMode(!is2DMode)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:text-red-600 hover:border-red-300 transition-all flex items-center gap-1.5 cursor-pointer bg-slate-50"
          >
            <Compass className="w-4 h-4 text-red-600" />
            <span>{is2DMode ? (lang === 'ar' ? 'التحويل إلى 3D' : 'Switch to 3D View') : (lang === 'ar' ? 'مخطط هندسي 2D' : '2D Schematic Plan')}</span>
          </button>

          {!is2DMode && (
            <button
              onClick={() => handleViewPreset('overview')}
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-300 transition-all cursor-pointer bg-slate-50"
              title="Reset Camera View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="relative w-full h-[540px] bg-slate-50 overflow-hidden select-none">
        {is2DMode ? (
          /* 2D Schematic Plan Fallback */
          <div className="w-full h-full p-6 sm:p-8 overflow-y-auto bg-white space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                {lang === 'ar' ? 'المخطط الهندسي الثنائي للقاعات' : 'Architectural 2D Grid Layout'}
              </span>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1 text-slate-700">
                  <span className="w-3 h-3 rounded-xs bg-white border border-slate-300"></span> Available
                </span>
                <span className="flex items-center gap-1 text-red-600">
                  <span className="w-3 h-3 rounded-xs bg-red-600"></span> Selected
                </span>
                <span className="flex items-center gap-1 text-rose-500">
                  <span className="w-3 h-3 rounded-xs bg-rose-200 border border-rose-300"></span> Reserved
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {filteredBooths.map(b => (
                <div
                  key={b.id}
                  onClick={() => { setSelectedBooth(b); if (onBoothSelect) onBoothSelect(b); }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedBooth?.id === b.id
                      ? 'bg-red-600 text-white border-red-700 shadow-sm'
                      : b.status === 'reserved'
                      ? 'bg-rose-50/70 border-rose-200 text-slate-700'
                      : 'bg-white border-slate-200 hover:border-red-400 text-slate-900'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-black tracking-tight">{b.id}</span>
                    <span className="text-[10px] font-bold uppercase">{b.size}</span>
                  </div>
                  <div className={`text-xs truncate ${selectedBooth?.id === b.id ? 'text-red-100' : 'text-slate-500'}`}>
                    {b.sectorName}
                  </div>
                  <div className="mt-2 text-xs font-black tabular-nums">
                    ${b.price.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Three.js 3D WebGL Canvas Mount */
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        )}

        {/* Live Hover Float Indicator */}
        {!is2DMode && hoveredBooth && (
          <div className="absolute top-4 left-4 pointer-events-none bg-white/95 border border-red-200 shadow-md px-3.5 py-2 rounded-xl text-xs">
            <span className="font-black text-red-600 block">{hoveredBooth.id} — {hoveredBooth.size}</span>
            <span className="text-slate-600">{hoveredBooth.sectorName}</span>
          </div>
        )}

        {/* Selected Booth Info Float Card (Top-Right) */}
        {selectedBooth && (
          <div className="absolute top-4 right-4 max-w-sm bg-white border border-red-200 rounded-2xl shadow-lg p-4 space-y-3">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block">
                  {selectedBooth.hallName}
                </span>
                <h4 className="text-base font-black text-slate-900">
                  Booth {selectedBooth.id} ({selectedBooth.size})
                </h4>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                selectedBooth.status === 'reserved'
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {selectedBooth.status}
              </span>
            </div>

            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Sector:</span>
                <span className="font-bold text-slate-900">{selectedBooth.sectorName}</span>
              </div>
              <div className="flex justify-between">
                <span>Configuration:</span>
                <span className="font-medium">{selectedBooth.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Base Investment:</span>
                <span className="font-black text-red-600 tabular-nums">${selectedBooth.price.toLocaleString()} USD</span>
              </div>
              {selectedBooth.exhibitor && (
                <div className="flex justify-between text-slate-500 pt-1">
                  <span>Current Exhibitor:</span>
                  <span className="font-bold text-slate-800 truncate max-w-[140px]">{selectedBooth.exhibitor}</span>
                </div>
              )}
            </div>

            {selectedBooth.status !== 'reserved' && (
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{lang === 'ar' ? 'حجز هذا الجناح فوراً' : lang === 'zh' ? '立即锁定此展位' : 'Lock This Booth'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Collapsible Bottom Ergonomic HUD Dock */}
        {!is2DMode && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[94vw] w-auto transition-all duration-300 z-20">
            {/* Collapse / Expand Toggle */}
            <div className="flex justify-center -mb-2">
              <button
                onClick={() => setHudCollapsed(!hudCollapsed)}
                className="px-3 py-1 rounded-t-lg bg-white border border-b-0 border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:text-red-600 shadow-xs flex items-center gap-1 cursor-pointer"
              >
                {hudCollapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                <span>{hudCollapsed ? 'Show Controls' : 'Hide Controls'}</span>
              </button>
            </div>

            {!hudCollapsed && (
              <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl p-2.5 flex flex-wrap items-center gap-2">
                {/* Hall Filters */}
                <div className="flex items-center gap-1 pr-2 border-r border-slate-200">
                  {[
                    { id: 'ALL', label: 'All Pavilions' },
                    { id: 'A', label: 'Hall A (Energy & Heavy)' },
                    { id: 'B', label: 'Hall B (Tech & Pharma)' },
                    { id: 'C', label: 'Hall C (Finance & Trade)' },
                    { id: 'OUTDOOR', label: 'Outdoor Arena' },
                  ].map(h => (
                    <button
                      key={h.id}
                      onClick={() => handleViewPreset(h.id === 'ALL' ? 'overview' : h.id === 'A' ? 'hallA' : h.id === 'B' ? 'hallB' : h.id === 'C' ? 'hallC' : 'outdoor')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        activeHall === h.id 
                          ? 'bg-red-600 text-white shadow-xs font-black' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>

                {/* Perspective Presets */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleViewPreset('overview')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    3D Perspective
                  </button>
                  <button
                    onClick={() => handleViewPreset('top')}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Plan Top View
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Interactive Reservation Modal */}
      {isBookingOpen && selectedBooth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-red-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => { setIsBookingOpen(false); setBookingSubmitted(false); }}
              className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Booth Reserved & Locked</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Booth <strong>{selectedBooth.id}</strong> ({selectedBooth.size}) has been reserved for <strong>{bookingForm.companyName}</strong>. A verification dossier and contract schedule have been dispatched to <strong>{bookingForm.email}</strong>.
                </p>
                <button
                  onClick={() => { setIsBookingOpen(false); setBookingSubmitted(false); }}
                  className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-700"
                >
                  Close & Return to Plan
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block">
                    Official Bilateral Expo Reservation
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    Lock Booth {selectedBooth.id} ({selectedBooth.size})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Hall: {selectedBooth.hallName} · Rate: ${selectedBooth.price.toLocaleString()} USD
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Company / Enterprise Name</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.companyName}
                      onChange={e => setBookingForm({ ...bookingForm, companyName: e.target.value })}
                      placeholder="e.g. Sino-Arab Machinery EPC Group"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Authorized Contact Officer</label>
                      <input
                        type="text"
                        required
                        value={bookingForm.contactName}
                        onChange={e => setBookingForm({ ...bookingForm, contactName: e.target.value })}
                        placeholder="Full Name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Corporate Email</label>
                      <input
                        type="email"
                        required
                        value={bookingForm.email}
                        onChange={e => setBookingForm({ ...bookingForm, email: e.target.value })}
                        placeholder="trade@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Direct Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={bookingForm.phone}
                      onChange={e => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="+964 780 ... / +86 138 ..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Special Equipment / Power Needs</label>
                    <textarea
                      rows={2}
                      value={bookingForm.notes}
                      onChange={e => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      placeholder="e.g. 3-phase 380V industrial power, heavy crane access..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    Confirm Booth Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  Box3,
  Color, 
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  CylinderGeometry,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type BugattiViewerProps = {
  glbPath?: string;
  backgroundPath?: string;
};

export function BugattiViewer({
  glbPath = "ferrari_sf90_stradale.glb",
  backgroundPath = ""
}: BugattiViewerProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const turntableRef = useRef<Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    const scene = new Scene();
    // Solid black background by default
    if (backgroundPath) {
      const texLoader = new TextureLoader();
      texLoader.setPath("/");
      texLoader.load(
        backgroundPath,
        (texture) => {
          texture.colorSpace = SRGBColorSpace;
          scene.background = texture;
        },
        undefined,
        () => {
          scene.background = new Color("#000000");
        }
      );
    } else {
      scene.background = new Color("#000000");
    }

    const camera = new PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 1.25, 3.8); // back the camera so the whole car fits

    const hemi = new HemisphereLight(0xffffff, 0x222233, 1.6);
    scene.add(hemi);

    const ambient = new AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const key = new DirectionalLight(0xffffff, 2.0);
    key.position.set(6, 10, 5);
    scene.add(key);

    const fill = new DirectionalLight(0xffffff, 1.3);
    fill.position.set(-6, 4, -3);
    scene.add(fill);

    const rim = new DirectionalLight(0xffffff, 1.1);
    rim.position.set(0, 5, -6);
    scene.add(rim);

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.outputColorSpace = SRGBColorSpace;
    container.appendChild(renderer.domElement);

    let frameId: number | null = null;
    let model: any = null;
    const turntable = new Mesh(
      new CylinderGeometry(2.2, 2.2, 0.12, 64),
      new MeshStandardMaterial({ color: "#1b1f2a", metalness: 0.2, roughness: 0.5 })
    );
    turntable.position.y = -0.06;
    scene.add(turntable);
    turntableRef.current = turntable;

    const gltfLoader = new GLTFLoader();
    // Load from /public/models; avoid leading // which causes ERR_NAME_NOT_RESOLVED
    gltfLoader.setPath("/models/");
    gltfLoader.setResourcePath("/models/");
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load(
      glbPath,
      (gltf) => {
        setStatus("ready");
        model = gltf.scene;
        
        // Change body color to silver
        model.traverse((child: any) => {
          if (child.isMesh && child.material) {
            // Handle both single material and array of materials
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            const childName = (child.name || "").toLowerCase();
            materials.forEach((mat: any) => {
              if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
                const matName = (mat.name || "").toLowerCase();

                const isTire =
                  childName.includes("tire") ||
                  childName.includes("tyre") ||
                  matName.includes("tire") ||
                  matName.includes("tyre");
                const isRim =
                  childName.includes("rim") ||
                  childName.includes("wheel") ||
                  matName.includes("rim") ||
                  matName.includes("wheel");
                const isLogo =
                  childName.includes("logo") ||
                  childName.includes("badge") ||
                  matName.includes("logo") ||
                  matName.includes("badge") ||
                  matName.includes("emblem");
                const isTailLight =
                  childName.includes("tail") ||
                  childName.includes("rear_light") ||
                  childName.includes("brake") ||
                  matName.includes("tail") ||
                  matName.includes("rear_light") ||
                  matName.includes("brake");
                const isHeadLight =
                  childName.includes("head") ||
                  childName.includes("lamp") ||
                  childName.includes("headlight") ||
                  childName.includes("front_light") ||
                  matName.includes("head") ||
                  matName.includes("lamp") ||
                  matName.includes("headlight") ||
                  matName.includes("front_light");

                if (isTire) {
                  // Rubber-like black tires
                  mat.color.setHex(0x111111);
                  mat.metalness = 0.05;
                  mat.roughness = 0.9;
                } else if (isRim) {
                  // Classic silver rims
                  mat.color.setHex(0xbfc0c0);
                  mat.metalness = 0.85;
                  mat.roughness = 0.25;
                } else if (isLogo) {
                  // Ferrari logo yellow
                  mat.color.setHex(0xffd700);
                  mat.metalness = 0.2;
                  mat.roughness = 0.4;
                  mat.emissive?.setHex(0x000000);
                } else if (isTailLight) {
                  // Red tail lights with subtle glow
                  mat.color.setHex(0xff1a1a);
                  mat.emissive?.setHex(0x330000);
                  mat.emissiveIntensity = 1.2;
                  mat.metalness = 0.1;
                  mat.roughness = 0.4;
                } else if (isHeadLight) {
                  // Glowing front lights
                  mat.color.setHex(0xf5f7ff);
                  mat.emissive?.setHex(0xcfd8ff);
                  mat.emissiveIntensity = 2.0;
                  mat.metalness = 0.05;
                  mat.roughness = 0.2;
                } else {
                  // Body paint – match the showcase photos (Ferrari red)
                  mat.color.setHex(0xd00000);
                  mat.metalness = 0.8;
                  mat.roughness = 0.32;
                }
                mat.needsUpdate = true;
              }
            });
          }
        });
        
        // Center and scale model
        const box = new Box3().setFromObject(model);
        const size = box.getSize(new Vector3());
        const center = box.getCenter(new Vector3());
        model.position.sub(center);
        const maxAxis = Math.max(size.x, size.y, size.z);
        const scale = 4.8 / maxAxis; // slightly smaller so it all fits
        model.scale.setScalar(scale);
        model.position.y = 0.25;
        turntable.add(model);
      },
      undefined,
      (err) => {
        console.error("GLB load error", err);
        setStatus("error");
      }
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.target.set(0, 0.8, 0);
    controls.autoRotate = false; // rotation handled via turntable

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      // Rotate the car + base as a unit
      if (turntableRef.current) {
        turntableRef.current.rotation.y += 0.005;
      }

      camera.lookAt(controls.target);

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
      scene.clear();
    };
  }, [glbPath]);

  return (
    <div
      ref={mountRef}
      className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
    >
      {status !== "ready" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/80 text-sm text-slate-200">
          {status === "loading" ? "Loading 3D model..." : "Failed to load model. Check console for details."}
        </div>
      )}
    </div>
  );
}


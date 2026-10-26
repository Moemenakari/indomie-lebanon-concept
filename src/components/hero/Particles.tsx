import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { ParticleKind, Theme } from '../../data/themes';

interface Kind { geo: () => THREE.BufferGeometry; color: string; emissive?: string; size: [number, number] }

const lathe = (pts: [number, number][]) => new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(x, y)), 18);
const flat = (g: THREE.BufferGeometry, x: number, y: number, z: number) => g.scale(x, y, z);

const KINDS: Record<ParticleKind, Kind> = {
  chilli: { geo: () => lathe([[0, -0.4], [0.07, -0.3], [0.12, -0.05], [0.13, 0.2], [0.1, 0.32], [0.03, 0.36], [0, 0.36]]), color: '#E0201B', size: [0.8, 1.2] },
  flame: { geo: () => lathe([[0, 0.45], [0.06, 0.3], [0.14, 0.05], [0.15, -0.1], [0.1, -0.2], [0, -0.22]]), color: '#FF7A1A', emissive: '#FF4500', size: [0.6, 1] },
  ember: { geo: () => new THREE.SphereGeometry(0.05, 8, 8), color: '#FFB347', emissive: '#FF6A00', size: [0.6, 1.4] },
  drumstick: { geo: () => lathe([[0, -0.35], [0.03, -0.33], [0.04, -0.15], [0.12, 0.02], [0.17, 0.18], [0.15, 0.3], [0.08, 0.36], [0, 0.37]]), color: '#C77A2E', size: [0.8, 1.1] },
  herb: { geo: () => flat(new THREE.SphereGeometry(0.16, 12, 8), 1, 0.18, 0.5), color: '#3F8F3A', size: [0.6, 1] },
  noodle: { geo: () => new THREE.TorusKnotGeometry(0.13, 0.025, 80, 8, 2, 3), color: '#F2C14E', size: [0.8, 1.2] },
  pea: { geo: () => new THREE.SphereGeometry(0.09, 14, 12), color: '#6DBE45', size: [0.7, 1.2] },
  carrot: { geo: () => new THREE.BoxGeometry(0.15, 0.15, 0.15), color: '#F57C21', size: [0.7, 1.1] },
  broccoli: { geo: () => new THREE.IcosahedronGeometry(0.15, 1), color: '#2E7D32', size: [0.8, 1.2] },
  curryleaf: { geo: () => flat(new THREE.SphereGeometry(0.18, 12, 8), 1, 0.16, 0.45), color: '#4E7A2A', size: [0.6, 1] },
  dust: { geo: () => new THREE.SphereGeometry(0.035, 6, 6), color: '#F0A03A', size: [0.6, 1.4] },
  shallot: { geo: () => new THREE.TorusGeometry(0.11, 0.03, 8, 20), color: '#9A5A2B', size: [0.7, 1.1] },
  sesame: { geo: () => flat(new THREE.SphereGeometry(0.06, 10, 8), 1, 0.45, 0.6), color: '#F5E6C4', size: [0.7, 1.2] },
  mushroom: { geo: () => lathe([[0, -0.2], [0.06, -0.2], [0.06, 0.02], [0.2, 0.04], [0.18, 0.14], [0.08, 0.2], [0, 0.21]]), color: '#B98A5E', size: [0.8, 1.2] },
};

function Swarm({ kind, count, seed }: { kind: ParticleKind; count: number; seed: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const k = KINDS[kind];
  const geo = useMemo(() => k.geo(), [k]);
  const born = useRef(0);
  const items = useMemo(() => {
    let s = seed;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    return Array.from({ length: count }, () => ({
      x: (rnd() - 0.5) * 13, y: (rnd() - 0.5) * 9, z: -rnd() * 4,
      r: new THREE.Euler(rnd() * 6, rnd() * 6, rnd() * 6),
      spin: (rnd() - 0.5) * 1.2, rise: 0.15 + rnd() * 0.35, sway: rnd() * 6,
      s: k.size[0] + rnd() * (k.size[1] - k.size[0]),
    }));
  }, [count, seed, k]);
  const m = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, dt) => {
    const mesh = ref.current;
    if (!mesh) return;
    born.current = Math.min(1, born.current + dt * 1.4);
    const grow = 1 - Math.pow(1 - born.current, 3);
    const t = state.clock.elapsedTime;
    items.forEach((p, i) => {
      p.y += p.rise * dt;
      if (p.y > 5) p.y = -5;
      p.r.x += p.spin * dt; p.r.y += p.spin * dt * 0.7;
      m.position.set(p.x + Math.sin(t * 0.5 + p.sway) * 0.25, p.y, p.z);
      m.rotation.copy(p.r);
      m.scale.setScalar(p.s * grow);
      m.updateMatrix();
      mesh.setMatrixAt(i, m.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[geo, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial color={k.color} emissive={k.emissive ?? '#000'} emissiveIntensity={k.emissive ? 0.6 : 0} roughness={0.45} metalness={0.05} />
    </instancedMesh>
  );
}

/** Real 3D ingredients floating behind the product — they change with the flavour. */
export default function Particles({ theme, count }: { theme: Theme; count: number }) {
  const per = Math.max(4, Math.round(count / theme.particles.length));
  return (
    <Canvas className="particles" dpr={[1, 1.75]} camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 5, 6]} intensity={1.5} />
      <directionalLight position={[-4, -2, 3]} intensity={0.4} color={theme.tones[1]} />
      <group key={theme.id}>
        {theme.particles.map((k, i) => <Swarm key={k} kind={k} count={per} seed={17 + i * 101} />)}
      </group>
    </Canvas>
  );
}

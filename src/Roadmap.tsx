import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Line, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Shield, PenTool, ChevronRight, CheckCircle2, Map as MapIcon, Sun, Moon, Database, Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useTheme } from './App';

// Data
const PROGRAMS = {
  programming: {
    id: 'programming',
    name: 'Programming',
    icon: BookOpen,
    color: '#3b82f6',
    milestones: [
      { id: 'p1', title: 'Basics of IT', subtitle: 'Computer Science Fundamentals', description: 'Learn how computers work, memory, CPU, and basic algorithms.', pos: [-20, 0, 20], height: 3 },
      { id: 'p2', title: 'Frontend', subtitle: 'HTML, CSS, React', description: 'Build user interfaces and interactive web applications.', pos: [-10, 0, 35], height: 5 },
      { id: 'p3', title: 'Backend', subtitle: 'Node.js, Express', description: 'Create server-side logic, APIs, and handle data.', pos: [15, 0, 25], height: 7 },
      { id: 'p4', title: 'Databases', subtitle: 'SQL, MongoDB', description: 'Store, retrieve, and manage application data efficiently.', pos: [30, 0, 5], height: 4 },
      { id: 'p5', title: 'DevOps', subtitle: 'Docker, AWS', description: 'Deploy, scale, and maintain applications in the cloud.', pos: [20, 0, -25], height: 9 },
    ]
  },
  cybersecurity: {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    icon: Shield,
    color: '#10b981',
    milestones: [
      { id: 'c1', title: 'Networking', subtitle: 'TCP/IP, DNS', description: 'Understand how data travels across networks and the internet.', pos: [-25, 0, 15], height: 4 },
      { id: 'c2', title: 'Linux Basics', subtitle: 'Command Line', description: 'Master the command line and operating system fundamentals.', pos: [-15, 0, -5], height: 3 },
      { id: 'c3', title: 'Ethical Hacking', subtitle: 'Penetration Testing', description: 'Learn to find and exploit vulnerabilities safely.', pos: [5, 0, -20], height: 6 },
      { id: 'c4', title: 'Cryptography', subtitle: 'Encryption', description: 'Secure data using modern encryption and hashing techniques.', pos: [25, 0, -10], height: 5 },
      { id: 'c5', title: 'Security Ops', subtitle: 'Monitoring & Response', description: 'Detect, analyze, and respond to security incidents.', pos: [35, 0, -30], height: 8 },
    ]
  },
  uxui: {
    id: 'uxui',
    name: 'UX/UI Design',
    icon: PenTool,
    color: '#ec4899',
    milestones: [
      { id: 'u1', title: 'Design Principles', subtitle: 'Color, Typography', description: 'Master the core principles of visual design and aesthetics.', pos: [-15, 0, 30], height: 3 },
      { id: 'u2', title: 'User Research', subtitle: 'Personas, Journeys', description: 'Understand user needs through interviews and research.', pos: [5, 0, 40], height: 4 },
      { id: 'u3', title: 'Wireframing', subtitle: 'Low-fidelity', description: 'Create structural blueprints for user interfaces.', pos: [25, 0, 20], height: 5 },
      { id: 'u4', title: 'Prototyping', subtitle: 'Figma, High-fidelity', description: 'Build interactive, high-fidelity mockups of your designs.', pos: [10, 0, -5], height: 6 },
      { id: 'u5', title: 'Design Systems', subtitle: 'Components, Variants', description: 'Create reusable component libraries for consistent design.', pos: [40, 0, -15], height: 7 },
    ]
  },
  digitalmarketing: {
    id: 'digitalmarketing',
    name: 'Digital Marketing',
    icon: Globe,
    color: '#f59e0b',
    milestones: [
      { id: 'm1', title: 'Marketing Basics', subtitle: 'Strategy & Funnel', description: 'Understand core marketing principles, psychology, and customer journeys.', pos: [-20, 0, 25], height: 3 },
      { id: 'm2', title: 'Content & Social', subtitle: 'Community Growth', description: 'Create engaging content and grow engaged communities on social platforms.', pos: [-5, 0, 5], height: 4 },
      { id: 'm3', title: 'SEO mastery', subtitle: 'Search Engine Opt.', description: 'Optimize websites to rank organically on Google.', pos: [10, 0, -15], height: 5 },
      { id: 'm4', title: 'Performance Ads', subtitle: 'Google / Meta', description: 'Run highly profitable paid advertising campaigns with data-driven ROI.', pos: [25, 0, 20], height: 6 },
      { id: 'm5', title: 'Data Analytics', subtitle: 'Tracking & CRO', description: 'Analyze user behavior, track conversions, and optimize the funnel.', pos: [40, 0, -10], height: 7 },
    ]
  },
  dataanalytics: {
    id: 'dataanalytics',
    name: 'Data Analytic',
    icon: Database,
    color: '#8b5cf6',
    milestones: [
      { id: 'd1', title: 'Excel & Basics', subtitle: 'Data formatting', description: 'Learn to organize, format and analyze basic data with Excel.', pos: [-15, 0, 20], height: 3 },
      { id: 'd2', title: 'SQL & Databases', subtitle: 'Data Extraction', description: 'Extract and manipulate data from relational databases using SQL.', pos: [-5, 0, -10], height: 4 },
      { id: 'd3', title: 'Python for Data', subtitle: 'Pandas, NumPy', description: 'Use Python to scientifically clean, analyze and manipulate large datasets.', pos: [15, 0, 15], height: 6 },
      { id: 'd4', title: 'Data Visualization', subtitle: 'Tableau, PowerBI', description: 'Create interactive dashboards and visual reports for stakeholders.', pos: [30, 0, -5], height: 5 },
      { id: 'd5', title: 'Machine Learning', subtitle: 'Predictive Modeling', description: 'Apply basic machine learning algorithms to predict trends and behaviors.', pos: [40, 0, -25], height: 8 },
    ]
  }
};

const CityBackground = ({ milestones, isDarkMode }: { milestones: any[], isDarkMode: boolean }) => {
  const buildings = useMemo(() => {
    const arr = [];
    for (let x = -50; x <= 50; x += 4) {
      for (let z = -50; z <= 50; z += 4) {
        // Skip some buildings to create roads/gaps
        if (Math.random() > 0.5) {
          const bx = x + (Math.random() - 0.5);
          const bz = z + (Math.random() - 0.5);
          
          let tooClose = false;
          for (const m of milestones) {
            const dx = bx - m.pos[0];
            const dz = bz - m.pos[2];
            if (Math.sqrt(dx*dx + dz*dz) < 4) {
              tooClose = true;
              break;
            }
          }
          
          if (!tooClose) {
            const w = 1.5 + Math.random() * 2;
            const d = 1.5 + Math.random() * 2;
            const h = 2 + Math.random() * 10;
            arr.push({ position: [bx, h / 2, bz], scale: [w, h, d] });
          }
        }
      }
    }
    return arr;
  }, [milestones]);

  return (
    <group>
      {buildings.map((b, i) => (
        <mesh key={i} position={b.position as [number, number, number]} userData={{ isObstacle: true }}>
          <boxGeometry args={b.scale as [number, number, number]} />
          <meshStandardMaterial color={isDarkMode ? "#111" : "#ddd"} transparent opacity={0.8} roughness={0.2} metalness={0.8} />
          <Edges color={isDarkMode ? "#333" : "#bbb"} />
        </mesh>
      ))}
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} userData={{ isGround: true }}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color={isDarkMode ? "#0a0a0a" : "#e5e5e5"} />
      </mesh>
      {/* Grid helper for tech feel */}
      <gridHelper args={[200, 200, isDarkMode ? '#222' : '#ccc', isDarkMode ? '#111' : '#ddd']} position={[0, 0, 0]} />
    </group>
  );
};

const CaptureEffect = ({ position, color }: { position: [number, number, number], color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.scale.x += 15 * delta;
      meshRef.current.scale.z += 15 * delta;
      meshRef.current.scale.y += 15 * delta;
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = Math.max(0, mat.opacity - 1.5 * delta);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.8} emissive={color} emissiveIntensity={2} depthWrite={false} />
    </mesh>
  );
};

const Player = ({ program, collidersRef, setCheckpoints, isMapView, setCaptureEffects, setCurrentMilestoneId }: { program: any, collidersRef: React.RefObject<THREE.Group | null>, setCheckpoints: React.Dispatch<React.SetStateAction<string[]>>, isMapView: boolean, setCaptureEffects: React.Dispatch<React.SetStateAction<{id: string, pos: [number, number, number], color: string}[]>>, setCurrentMilestoneId: React.Dispatch<React.SetStateAction<string | null>> }) => {
  const avatarRef = useRef<THREE.Group>(null);
  const [keys, setKeys] = useState({ forward: false, backward: false, left: false, right: false, climb: false, capture: false });
  const mouseRef = useRef({ x: 0, y: 0 });
  const eulerRef = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const isLockedRef = useRef(false);
  const currentBuildingRef = useRef<string | null>(null);
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') setKeys(k => ({ ...k, forward: true }));
      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') setKeys(k => ({ ...k, backward: true }));
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') setKeys(k => ({ ...k, left: true }));
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') setKeys(k => ({ ...k, right: true }));
      if (e.key === ' ') setKeys(k => ({ ...k, climb: true }));
      if (e.key.toLowerCase() === 'f') setKeys(k => ({ ...k, capture: true }));
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') setKeys(k => ({ ...k, forward: false }));
      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') setKeys(k => ({ ...k, backward: false }));
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') setKeys(k => ({ ...k, left: false }));
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') setKeys(k => ({ ...k, right: false }));
      if (e.key === ' ') setKeys(k => ({ ...k, climb: false }));
      if (e.key.toLowerCase() === 'f') setKeys(k => ({ ...k, capture: false }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isLockedRef.current || isMapView) return;
      
      const movementX = e.movementX || 0;
      const movementY = e.movementY || 0;

      eulerRef.current.y -= movementX * 0.002;
      eulerRef.current.x -= movementY * 0.002;
      
      // Clamp vertical rotation
      eulerRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, eulerRef.current.x));
    };

    const handlePointerLockChange = () => {
      isLockedRef.current = document.pointerLockElement === document.body;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName.toLowerCase() !== 'canvas') return;
      if (!isLockedRef.current && !isMapView) {
        try {
          const promise = document.body.requestPointerLock() as unknown as Promise<void>;
          if (promise !== undefined && promise.catch) {
            promise.catch((e: any) => console.warn('Pointer lock error:', e));
          }
        } catch (e) {
          console.warn('Pointer lock error:', e);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('click', handleCanvasClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('click', handleCanvasClick);
      if (document.pointerLockElement) {
          document.exitPointerLock();
      }
    };
  }, [isMapView]);

  useEffect(() => {
    if (avatarRef.current && program.milestones.length > 0) {
      const start = program.milestones[0];
      avatarRef.current.position.set(start.pos[0], start.height, start.pos[2]);
      eulerRef.current.set(0, 0, 0, 'YXZ');
      setCheckpoints([]); // Reset checkpoints on program change
    }
  }, [program, setCheckpoints]);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const downVector = useMemo(() => new THREE.Vector3(0, -1, 0), []);

  useFrame((state, delta) => {
    if (!avatarRef.current) return;

    const speed = 10 * delta;

    // Apply rotation from mouse
    avatarRef.current.quaternion.setFromEuler(new THREE.Euler(0, eulerRef.current.y, 0, 'YXZ'));

    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(avatarRef.current.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(avatarRef.current.quaternion);
    
    const moveVec = new THREE.Vector3();
    if (!isMapView) {
      if (keys.forward) moveVec.add(dir);
      if (keys.backward) moveVec.sub(dir);
      if (keys.right) moveVec.add(right);
      if (keys.left) moveVec.sub(right);
    }
    
    if (moveVec.lengthSq() > 0) {
        moveVec.normalize().multiplyScalar(speed);
        
        if (collidersRef.current && !isMapView) {
            const pos = avatarRef.current.position;
            const radius = 0.4;
            
            // Check X
            if (moveVec.x !== 0) {
                const dirX = new THREE.Vector3(Math.sign(moveVec.x), 0, 0);
                raycaster.set(pos.clone().add(new THREE.Vector3(0, 0.5, 0)), dirX);
                const hitsX = raycaster.intersectObject(collidersRef.current, true).filter(h => h.object.userData.isObstacle);
                if (hitsX.length > 0 && hitsX[0].distance < radius + Math.abs(moveVec.x)) {
                    moveVec.x = 0;
                }
            }
            // Check Z
            if (moveVec.z !== 0) {
                const dirZ = new THREE.Vector3(0, 0, Math.sign(moveVec.z));
                raycaster.set(pos.clone().add(new THREE.Vector3(0, 0.5, 0)), dirZ);
                const hitsZ = raycaster.intersectObject(collidersRef.current, true).filter(h => h.object.userData.isObstacle);
                if (hitsZ.length > 0 && hitsZ[0].distance < radius + Math.abs(moveVec.z)) {
                    moveVec.z = 0;
                }
            }
        }
        
        avatarRef.current.position.add(moveVec);
    }

    // Gravity
    velocityRef.current.y -= 30 * delta;

    // Ground collision
    if (collidersRef.current) {
      raycaster.set(new THREE.Vector3(avatarRef.current.position.x, 50, avatarRef.current.position.z), downVector);
      raycaster.camera = state.camera;
      const intersects = raycaster.intersectObject(collidersRef.current, true).filter(h => h.object.userData.isGround || h.object.userData.isMilestone || h.object.userData.isObstacle);
      
      let groundY = 0;
      let onMilestone = false;
      let milestoneId = null;

      if (intersects.length > 0) {
          groundY = intersects[0].point.y;
          if (intersects[0].object.userData.isMilestone) {
              onMilestone = true;
              milestoneId = intersects[0].object.userData.id;
          }
      }

      // Check forward for climbing
      let climbY = null;
      if (!isMapView) {
         const lookDir = new THREE.Vector3(0, 0, -1).applyEuler(eulerRef.current);
         lookDir.y = 0;
         lookDir.normalize();
         raycaster.set(avatarRef.current.position.clone().add(new THREE.Vector3(0, 0.5, 0)), lookDir);
         const forwardIntersects = raycaster.intersectObject(collidersRef.current, true);
         
         if (forwardIntersects.length > 0 && forwardIntersects[0].distance < 1.5) {
             const hitObject = forwardIntersects[0].object;
             if (hitObject.userData.isMilestone) {
                 climbY = hitObject.userData.height;
             }
         }
      }

      avatarRef.current.position.y += velocityRef.current.y * delta;

      // Ground collision resolution
      if (avatarRef.current.position.y <= groundY) {
          avatarRef.current.position.y = groundY;
          velocityRef.current.y = 0;
          
          if (keys.climb && !isMapView) {
              velocityRef.current.y = 12; // Jump
          }
      }

      // Climbing resolution (boost up if facing a milestone and pressing jump)
      if (keys.climb && climbY !== null && avatarRef.current.position.y < climbY && !isMapView) {
          velocityRef.current.y = 15;
      }

      if (onMilestone && avatarRef.current.position.y <= groundY + 0.1) {
          if (currentBuildingRef.current !== milestoneId) {
              currentBuildingRef.current = milestoneId;
              setCurrentMilestoneId(milestoneId);
          }
      } else {
          if (currentBuildingRef.current !== null) {
              currentBuildingRef.current = null;
              setCurrentMilestoneId(null);
          }
      }

      // Capture logic
      if (keys.capture && currentBuildingRef.current && !isMapView) {
          const buildingId = currentBuildingRef.current;
          setCheckpoints(prev => {
              if (!prev.includes(buildingId)) {
                  const m = program.milestones.find((m: any) => m.id === buildingId);
                  if (m) {
                      setCaptureEffects(effs => [...effs, { id: Date.now().toString() + Math.random(), pos: [m.pos[0], m.height, m.pos[2]], color: program.color }]);
                  }
                  return [...prev, buildingId];
              }
              return prev;
          });
      }
    }

    if (isMapView) {
      const targetCameraPos = new THREE.Vector3(0, 80, 20);
      state.camera.position.lerp(targetCameraPos, 5 * delta);
      
      const targetRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2.2, 0, 0, 'YXZ'));
      state.camera.quaternion.slerp(targetRotation, 5 * delta);
    } else {
      const cameraOffset = new THREE.Vector3(0, 1.5, 0);
      const targetCameraPos = avatarRef.current.position.clone().add(cameraOffset);
      state.camera.position.copy(targetCameraPos);
      
      const targetRotation = new THREE.Quaternion().setFromEuler(eulerRef.current);
      state.camera.quaternion.copy(targetRotation);
    }
  });

  return (
    <group ref={avatarRef}>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.8, 8]} />
        <meshStandardMaterial color={program.color} emissive={program.color} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      <pointLight color={program.color} intensity={1} distance={5} position={[0, 1, 0]} />
    </group>
  );
};

const RoadmapPath = ({ program, checkpoints, isDarkMode }: { program: any, checkpoints: string[], isDarkMode: boolean }) => {
  const points = useMemo(() => {
    const pts = [];
    const m = program.milestones;
    for (let i = 0; i < m.length; i++) {
      const current = m[i];
      if (i === 0) {
        pts.push(new THREE.Vector3(current.pos[0], current.height, current.pos[2]));
        pts.push(new THREE.Vector3(current.pos[0], 0.1, current.pos[2]));
      } else {
        const prev = m[i - 1];
        pts.push(new THREE.Vector3(prev.pos[0], 0.1, prev.pos[2]));
        pts.push(new THREE.Vector3(prev.pos[0], 0.1, current.pos[2]));
        pts.push(new THREE.Vector3(current.pos[0], 0.1, current.pos[2]));
        pts.push(new THREE.Vector3(current.pos[0], current.height, current.pos[2]));
      }
    }
    return pts;
  }, [program]);

  return (
    <group>
      <Line
        points={points}
        color={program.color}
        lineWidth={3}
        dashed={true}
        dashSize={0.5}
        gapSize={0.2}
      />
      {program.milestones.map((m: any) => {
        const isReached = checkpoints.includes(m.id);
        return (
          <group key={m.id}>
            {/* Building for the milestone */}
            <mesh position={[m.pos[0], m.height / 2, m.pos[2]]} userData={{ isMilestone: true, height: m.height, id: m.id, isObstacle: true }}>
              <boxGeometry args={[2, m.height, 2]} />
              <meshStandardMaterial color={isReached ? (isDarkMode ? '#ffffff' : '#000000') : program.color} transparent opacity={isReached ? 0.8 : 0.2} emissive={isReached ? (isDarkMode ? '#ffffff' : '#000000') : '#000000'} emissiveIntensity={isReached ? 0.2 : 0} />
              <Edges color={isReached ? (isDarkMode ? '#ffffff' : '#000000') : program.color} />
            </mesh>
            {/* Marker */}
            <Html position={[m.pos[0], m.height + 0.5, m.pos[2]]} center zIndexRange={[100, 0]}>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center pointer-events-none select-none"
              >
                <div className={`${isDarkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-md border px-4 py-2 rounded-lg text-center whitespace-nowrap shadow-xl flex items-center gap-2 transition-all duration-500 ${isReached ? (isDarkMode ? 'border-white/50 scale-110' : 'border-black/50 scale-110') : (isDarkMode ? 'border-white/10' : 'border-black/10')}`}>
                  {isReached && <CheckCircle2 size={16} color={isDarkMode ? "#ffffff" : "#000000"} />}
                  <div>
                    <div className="text-[10px] font-bold tracking-widest uppercase mb-1 transition-colors duration-500" style={{ color: isReached ? (isDarkMode ? '#ffffff' : '#000000') : program.color }}>
                      {m.title}
                    </div>
                    <div className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {m.subtitle}
                    </div>
                  </div>
                </div>
                <div className="w-0.5 h-6 transition-colors duration-500" style={{ backgroundColor: isReached ? (isDarkMode ? '#ffffff' : '#000000') : program.color, opacity: 0.8 }} />
                <div className="w-4 h-4 rounded-full border-[3px] shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-colors duration-500" style={{ borderColor: isDarkMode ? '#000' : '#fff', backgroundColor: isReached ? (isDarkMode ? '#ffffff' : '#000000') : program.color, boxShadow: `0 0 10px ${isReached ? (isDarkMode ? '#ffffff' : '#000000') : program.color}` }} />
              </motion.div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

export default function Roadmap() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [activeProgram, setActiveProgram] = useState<string>('programming');
  const [checkpoints, setCheckpoints] = useState<string[]>([]);
  const [isMapView, setIsMapView] = useState(false);
  const [captureEffects, setCaptureEffects] = useState<{id: string, pos: [number, number, number], color: string}[]>([]);
  const [currentMilestoneId, setCurrentMilestoneId] = useState<string | null>(null);
  
  const program = PROGRAMS[activeProgram as keyof typeof PROGRAMS];
  const collidersRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (captureEffects.length > 0) {
      const timer = setTimeout(() => {
        setCaptureEffects(effs => effs.slice(1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [captureEffects]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm') {
        setIsMapView(prev => !prev);
        if (!isMapView) {
          document.exitPointerLock();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMapView]);

  return (
    <div className={`w-full h-screen overflow-hidden relative font-sans transition-colors duration-500 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f0f0f0] text-black'}`}>
      {/* 3D Canvas */}
      <div className={`absolute inset-0 ${isMapView ? 'cursor-default' : 'cursor-crosshair'}`}>
        <Canvas camera={{ position: [15, 15, 15], fov: 60 }}>
          <color attach="background" args={[isDarkMode ? '#050505' : '#f0f0f0']} />
          <fog attach="fog" args={[isDarkMode ? '#050505' : '#f0f0f0', 10, 50]} />
          
          <ambientLight intensity={isDarkMode ? 0.5 : 0.8} />
          <directionalLight position={[10, 20, 10]} intensity={isDarkMode ? 1 : 1.5} />
          <pointLight position={[0, 10, 0]} intensity={0.5} color={program.color} />

          <group ref={collidersRef}>
            <CityBackground milestones={program.milestones} isDarkMode={isDarkMode} />
            <RoadmapPath program={program} checkpoints={checkpoints} key={program.id} isDarkMode={isDarkMode} />
          </group>
          
          {captureEffects.map(eff => (
            <CaptureEffect key={eff.id} position={eff.pos} color={eff.color} />
          ))}

          <Player 
            program={program} 
            collidersRef={collidersRef} 
            setCheckpoints={setCheckpoints} 
            isMapView={isMapView} 
            setCaptureEffects={setCaptureEffects} 
            setCurrentMilestoneId={setCurrentMilestoneId}
          />
        </Canvas>
      </div>

      {/* Crosshair */}
      {!isMapView && <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full pointer-events-none z-20 ${isDarkMode ? 'bg-white/50' : 'bg-black/50'}`} />}

      {/* Milestone Modal */}
      <AnimatePresence>
        {currentMilestoneId && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 p-6 rounded-2xl border backdrop-blur-xl shadow-2xl z-50 text-center max-w-md pointer-events-none ${isDarkMode ? 'bg-black/80 border-white/20 text-white' : 'bg-white/80 border-black/20 text-black'}`}
          >
            <h2 className="text-2xl font-bold mb-2" style={{ color: program.color }}>
              {t(`roadmapPage.programs.${program.id}.${currentMilestoneId as any}.title` as any, program.milestones.find(m => m.id === currentMilestoneId)?.title)}
            </h2>
            <p className={`text-sm mb-4 font-medium ${isDarkMode ? 'text-white/80' : 'text-black/80'}`}>
              {t(`roadmapPage.programs.${program.id}.${currentMilestoneId as any}.desc` as any, program.milestones.find(m => m.id === currentMilestoneId)?.description)}
            </p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'}`}>
              <span className="text-xs font-bold uppercase tracking-wider">{t('roadmapPage.ui.pressToCapture', 'Press \'F\' to capture')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UI Overlay */}
      <div className="absolute top-24 left-0 w-full px-6 py-2 pointer-events-none flex justify-between items-start z-10">
        <div className="pointer-events-auto">
          <h1 className="text-2xl font-bold tracking-tight mb-1">{t('roadmapPage.ui.title', 'Stack Academy')}</h1>
          <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{t('roadmapPage.ui.subtitle', 'Interactive 3D Roadmaps')}</p>
          <div className="mt-4 flex flex-col gap-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md border w-fit ${isDarkMode ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'}`}>
              <span className="text-xs font-medium">{t('roadmapPage.ui.instruction1', 'Click to lock mouse. WASD to move. Mouse to look.')}</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md border w-fit ${isDarkMode ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'}`}>
              <span className="text-xs font-medium">{t('roadmapPage.ui.instruction2', 'Look at a milestone building and hold \'Space\' to climb.')}</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md border w-fit ${isDarkMode ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'}`}>
              <span className="text-xs font-medium">{t('roadmapPage.ui.instruction3', 'Press \'F\' while on top of a milestone to capture it.')}</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-md border w-fit ${isDarkMode ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'}`}>
              <MapIcon size={14} />
              <span className="text-xs font-medium">{t('roadmapPage.ui.instruction4', 'Press \'M\' to toggle Map View')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar / Program Selector */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-8 md:left-8 md:translate-x-0 pointer-events-auto z-40">
        <div className={`backdrop-blur-xl border rounded-2xl p-2 flex md:flex-col gap-2 shadow-2xl ${isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white/40 border-black/10'}`}>
          {Object.values(PROGRAMS).map((p) => {
            const Icon = p.icon;
            const isActive = activeProgram === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveProgram(p.id)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-black') : (isDarkMode ? 'text-white/50 hover:text-white hover:bg-white/5' : 'text-black/50 hover:text-black hover:bg-black/5')
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-bg"
                    className={`absolute inset-0 rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={20} className="relative z-10" style={{ color: isActive ? p.color : 'currentColor' }} />
                <span className="relative z-10 font-medium text-sm hidden md:block">{t(`roadmapPage.programs.${p.id}.name` as any, p.name)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Program Info Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={program.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className={`absolute top-24 right-8 w-80 backdrop-blur-xl border rounded-2xl p-6 pointer-events-auto hidden lg:block shadow-2xl z-50 ${isDarkMode ? 'bg-black/40 border-white/10' : 'bg-white/40 border-black/10'}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${program.color}20` }}>
              <program.icon size={24} style={{ color: program.color }} />
            </div>
            <h2 className="text-xl font-bold">{t(`roadmapPage.programs.${program.id}.name` as any, program.name)}</h2>
          </div>
          
          <div className="space-y-4 relative">
            {/* Vertical line connecting steps */}
            <div className={`absolute left-[11px] top-2 bottom-2 w-[2px] ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`} />
            
            {program.milestones.map((m: any, i: number) => {
              const isReached = checkpoints.includes(m.id);
              return (
                <div key={m.id} className="relative flex gap-4 items-start">
                  <div 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center relative z-10 mt-0.5 shrink-0 transition-colors duration-500 ${isDarkMode ? 'border-[#050505]' : 'border-[#f0f0f0]'}`}
                    style={{ backgroundColor: isReached ? (isDarkMode ? '#ffffff' : '#000000') : program.color }}
                  >
                    {isReached ? (
                      <CheckCircle2 size={12} className={isDarkMode ? "text-black" : "text-white"} />
                    ) : (
                      <span className={`text-[10px] font-bold ${isDarkMode ? 'text-black' : 'text-white'}`}>{i + 1}</span>
                    )}
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold mb-0.5 transition-colors duration-500 ${isReached ? (isDarkMode ? 'text-white' : 'text-black') : (isDarkMode ? 'text-white/80' : 'text-black/80')}`}>{t(`roadmapPage.programs.${program.id}.${m.id}.title` as any, m.title)}</h3>
                    <p className={`text-xs ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>{t(`roadmapPage.programs.${program.id}.${m.id}.subtitle` as any, m.subtitle)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button 
            onClick={() => navigate('/proqramlar')}
            className="mt-8 w-full py-3.5 rounded-full font-medium text-white shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {t('roadmapPage.ui.startLearning', 'Tədrisə Başla')} <ChevronRight size={16} />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

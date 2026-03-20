import React, { useRef, useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';
import { Play, Palette, Code, ArrowRight, Search, Menu, ChevronDown, X, Shield, Database, Cpu, PenTool, Twitter, Instagram, Dribbble, Github, GraduationCap, Users, BookOpen, Linkedin, ChevronLeft, ChevronRight, ArrowLeft, Aperture, Command, Layers, Edit2, Feather, Plus, Globe, Sun, Moon, MapPin, Mail, Phone, Smartphone } from 'lucide-react';

export type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
import { createApplication, getActiveBanners, getActiveEmployerCompanies, getAllBlogPosts, getBlogPostBySlug, getCourseGroups, getFeaturedBlogPosts, getGraduates, getProgramBySlug, getPrograms, getTeacherById, getTeachers } from './api/endpoints';
import { useAsync } from './api/hooks';
import { LanguageProvider, useLanguage } from './LanguageContext';
import Roadmap from './Roadmap';
import type { AdvertisementBanner, ApplicationCreate, BlogPost, CourseGroup, EducationProgram, EmployerCompany, Graduate, Teacher } from './api/types';

const formatDate = (dateStr: string) => {
    try {
        if (!dateStr) return dateStr;
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return new Intl.DateTimeFormat('az-AZ', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    } catch {
        return dateStr;
    }
};
const PROGRAM_META_BY_SLUG: Record<
    string,
    { icon: any; color: string; bg: string }
> = {
    kibertehlukesizlik: { icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
    'kiber-tehlukesizlik': { icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
    'data-analitikasi': { icon: Database, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    data: { icon: Database, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    'suni-intellekt': { icon: Cpu, color: 'text-purple-600', bg: 'bg-purple-50' },
    ai: { icon: Cpu, color: 'text-purple-600', bg: 'bg-purple-50' },
    'ui-ux-dizayn': { icon: PenTool, color: 'text-orange-600', bg: 'bg-orange-50' },
};

function getProgramMeta(slug?: string | null) {
    if (!slug) return { icon: BookOpen, color: 'text-gray-700', bg: 'bg-gray-50' };
    return PROGRAM_META_BY_SLUG[slug] ?? { icon: BookOpen, color: 'text-gray-700', bg: 'bg-gray-50' };
}

function toImageSrc(maybeBase64OrUrl?: string | null) {
    if (!maybeBase64OrUrl) return null;
    const normalized = maybeBase64OrUrl.trim().toLowerCase();
    if (normalized in ICON_NAME_MAP) return null;
    if (maybeBase64OrUrl.startsWith('http')) return maybeBase64OrUrl;
    if (maybeBase64OrUrl.startsWith('data:')) return maybeBase64OrUrl;
    return `data:image/jpeg;base64,${maybeBase64OrUrl}`;
}

const ICON_NAME_MAP: Record<string, any> = {
    play: Play,
    arrowright: ArrowRight,
    search: Search,
    menu: Menu,
    code: Code,
    palette: Palette,
    smartphone: Smartphone,
    chevrondown: ChevronDown,
    x: X,
    shield: Shield,
    database: Database,
    cpu: Cpu,
    pentool: PenTool,
    twitter: Twitter,
    instagram: Instagram,
    dribbble: Dribbble,
    github: Github,
    graduationcap: GraduationCap,
    users: Users,
    bookopen: BookOpen,
    linkedin: Linkedin,
    chevronleft: ChevronLeft,
    chevronright: ChevronRight,
    arrowleft: ArrowLeft,
    aperture: Aperture,
    command: Command,
    layers: Layers,
    edit2: Edit2,
    feather: Feather,
    plus: Plus,
    globe: Globe,
};

function getProgramIcon(program: Pick<EducationProgram, 'icon' | 'slug'>) {
    if (typeof program.icon === 'function' || typeof program.icon === 'object') {
        return program.icon as any;
    }
    const iconStr = typeof program.icon === 'string' ? program.icon : '';
    const iconKey = iconStr.trim().toLowerCase().replace(/[\s_-]/g, '');
    if (iconKey && ICON_NAME_MAP[iconKey]) return ICON_NAME_MAP[iconKey];
    return getProgramMeta(program.slug).icon;
}

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// --- Constants & Data ---
const IMAGES = [
    "/cyber.png",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1578301978693-85fa9c026f19?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800"
];

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="100" height="100" fill="#0F0F0F" rx="8" />
        <path d="M 32 25 L 24 25 L 24 75 L 32 75" stroke="#F2F1E8" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter" />
        <path d="M 68 25 L 76 25 L 76 75 L 68 75" stroke="#F2F1E8" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter" />
        <line x1="36" y1="40" x2="64" y2="40" stroke="#F2F1E8" strokeWidth="6" strokeLinecap="round" />
        <line x1="36" y1="52" x2="56" y2="52" stroke="#8C8C8C" strokeWidth="6" strokeLinecap="round" />
        <line x1="36" y1="64" x2="48" y2="64" stroke="#E5FF00" strokeWidth="6" strokeLinecap="round" />
    </svg>
);

// --- Helper Components ---
const FadeIn = ({ children, delay = 0, className = "", direction = "up" }: any) => {
    const yOffset = direction === "up" ? 40 : direction === "down" ? -40 : 0;
    const xOffset = direction === "left" ? 40 : direction === "right" ? -40 : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: yOffset, x: xOffset }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// --- Sections ---

const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => {
    const { theme, toggleTheme } = useTheme();
    const { t, language, setLanguage } = useLanguage();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAkademiyaOpen, setIsAkademiyaOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: programs } = useAsync<EducationProgram[]>(() => getPrograms({ page: 1, limit: 50 }), [], []);

    const akademiya = [
        { name: t('nav.teachers'), desc: t('nav.teachersDesc'), icon: Users, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/30", link: "/telimciler" },
        { name: t('nav.graduates'), desc: t('nav.graduatesDesc'), icon: GraduationCap, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-900/30", link: "/mezunlar" },
        { name: t('nav.blog'), desc: t('nav.blogDesc'), icon: BookOpen, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/30", link: "/bloq" },
        { name: t('nav.roadmap'), desc: t('nav.roadmapDesc'), icon: MapPin, color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-900/30", link: "/roadmap" },
    ];

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-[100] bg-[#FDFDFD]/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-black/5 dark:border-white/10 text-gray-900 dark:text-gray-100"
        >
            <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
                <Link to="/" className="flex items-center gap-2">
                    <Logo className="w-8 h-8" />
                    <span className="text-xl font-bold tracking-tight uppercase">Stack Academy</span>
                </Link>
                <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <div
                        className="relative group"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <Link to="/proqramlar" className="flex items-center gap-1 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors py-2">
                            {t('nav.programs')} <ChevronDown className="w-4 h-4" />
                        </Link>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-white/10 p-3 grid gap-1"
                                >
                                    {programs.slice(0, 5).map((prog, idx) => {
                                        const meta = getProgramMeta(prog.slug);
                                        const iconSrc = toImageSrc(prog.icon ?? null);
                                        return (
                                            <Link key={prog._id ?? idx} to={prog.slug ? `/proqramlar/${prog.slug}` : '/proqramlar'} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors group">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${meta.bg} dark:${meta.bg.replace('50', '900/30')} ${meta.color} dark:${meta.color.replace('600', '400')} group-hover:scale-110 transition-transform`}>
                                                    {iconSrc ? <img src={iconSrc} alt="" className="w-5 h-5 object-contain" /> : React.createElement(getProgramIcon(prog), { className: `w-5 h-5 ${meta.color} dark:${meta.color.replace('600', '400')}` })}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{prog.title}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{prog.shortDescription ?? ''}</div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                    <Link to="/proqramlar" className="w-full text-center py-2 mt-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors">
                                        {t('nav.allPrograms')}
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div
                        className="relative group"
                        onMouseEnter={() => setIsAkademiyaOpen(true)}
                        onMouseLeave={() => setIsAkademiyaOpen(false)}
                    >
                        <button className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors py-2">
                            {t('nav.academy')} <ChevronDown className="w-4 h-4" />
                        </button>
                        <AnimatePresence>
                            {isAkademiyaOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-white/10 p-3 grid gap-1"
                                >
                                    {akademiya.map((item, idx) => (
                                        <Link key={idx} to={item.link} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors group">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link to="/haqqimizda" className="hover:text-black dark:hover:text-white transition-colors">{t('nav.about')}</Link>
                    <Link to="/elaqe" className="hover:text-black dark:hover:text-white transition-colors">{t('nav.contact')}</Link>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <button className="flex items-center gap-1 font-medium text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors uppercase">
                            {language} <ChevronDown className="w-3 h-3" />
                        </button>
                        <div className="absolute top-full right-0 mt-2 w-16 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-white/10 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col gap-1">
                            {(['az', 'en', 'ru', 'tr'] as const).map((lang) => (
                                <button key={lang} onClick={() => setLanguage(lang)} className={`py-1 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${language === lang ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button onClick={onOpenModal} className="hidden lg:block bg-black dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                        {t('nav.apply')}
                    </button>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2">
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            <div className="font-semibold text-gray-900 dark:text-white mb-2">Proqramlar</div>
                            <div className="grid grid-cols-1 gap-2 pl-4 border-l-2 border-gray-100 dark:border-white/10 mb-4">
                                {programs.map((prog, idx) => {
                                    const meta = getProgramMeta(prog.slug);
                                    const iconSrc = toImageSrc(prog.icon ?? null);
                                    return (
                                        <Link key={prog._id ?? idx} to={prog.slug ? `/proqramlar/${prog.slug}` : '/proqramlar'} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2">
                                            {iconSrc ? <img src={iconSrc} alt="" className="w-4 h-4 object-contain" /> : React.createElement(getProgramIcon(prog), { className: `w-4 h-4 ${meta.color} dark:${meta.color.replace('600', '400')}` })}
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{prog.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="font-semibold text-gray-900 dark:text-white mb-2">Akademiya</div>
                            <div className="grid grid-cols-1 gap-2 pl-4 border-l-2 border-gray-100 dark:border-white/10 mb-4">
                                {akademiya.map((item, idx) => (
                                    <Link key={idx} to={item.link} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2">
                                        <item.icon className={`w-4 h-4 ${item.color}`} />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                                    </Link>
                                ))}
                            </div>

                            <Link to="/haqqimizda" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-gray-900 dark:text-white py-2">Haqqımızda</Link>
                            <Link to="/elaqe" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-gray-900 dark:text-white py-2">Əlaqə</Link>
                            <button onClick={() => { setIsMobileMenuOpen(false); onOpenModal(); }} className="w-full mt-4 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                                Müraciət Et
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

type HeroCard = {
    id: string;
    src: string;
    z: number;
    fan: { x: number; y: number; r: number };
    showcase: { x: number; y: number; r: number };
    title: string;
    slug?: string;
};

const HERO_POSITIONS = [
    { z: 50, fan: { x: 0, y: 0, r: 0 }, showcase: { x: -60, y: -60, r: -8 } },
    { z: 40, fan: { x: -140, y: 15, r: -8 }, showcase: { x: -30, y: -30, r: -4 } },
    { z: 30, fan: { x: 140, y: 15, r: 8 }, showcase: { x: 0, y: 0, r: 0 } },
    { z: 20, fan: { x: -280, y: 45, r: -16 }, showcase: { x: 30, y: 30, r: 4 } },
    { z: 10, fan: { x: 280, y: 45, r: 16 }, showcase: { x: 60, y: 60, r: 8 } },
];

const HERO_DUMMY_DATA = [
    { title: "Kibertəhlükəsizlik", slug: "kibertehlukesizlik" },
    { title: "Data Analitikası", slug: "data-analitikasi" },
    { title: "Süni İntellekt", slug: "suni-intellekt" },
    { title: "UI/UX Dizayn", slug: "ui-ux-dizayn" },
    { title: "Full Stack", slug: "full-stack" }
];

function buildHeroCards(): HeroCard[] {
    const cards: HeroCard[] = [];
    for (let i = 0; i < HERO_POSITIONS.length; i++) {
        const p = HERO_DUMMY_DATA[i % HERO_DUMMY_DATA.length];
        cards.push({
            id: `hero-card-${i}`,
            src: IMAGES[i % IMAGES.length],
            title: p.title,
            slug: p.slug,
            ...HERO_POSITIONS[i]
        });
    }
    return cards;
}

const Hero = ({ isScrolled }: { isScrolled?: boolean }) => {
    const { t } = useLanguage();
    const [stage, setStage] = useState(0);
    const heroCards = buildHeroCards();

    useEffect(() => {
        const t1 = setTimeout(() => setStage(1), 100); // Text 1
        const t2 = setTimeout(() => setStage(2), 600); // Image 1 flies in
        const t3 = setTimeout(() => setStage(3), 1200); // Text 2, stack images
        const t4 = setTimeout(() => setStage(4), 1800); // Fan out
        const t5 = setTimeout(() => setStage(5), 2400); // Chat bubbles & buttons
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }, []);

    return (
        <section className="pt-40 pb-20 px-6 flex flex-col items-center text-center min-h-screen relative overflow-hidden bg-[#FAFAFA] dark:bg-[#0a0a0a]">
            <div className="relative z-10 h-32 md:h-48 flex flex-col items-center justify-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter max-w-5xl mx-auto leading-[1.1] text-gray-900 dark:text-gray-50">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-block"
                    >
                        {t('hero.title1')}
                    </motion.span>
                    <br />
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-block"
                    >
                        {t('hero.title2')}
                    </motion.span>
                </h1>
            </div>

            <div className="relative h-[350px] md:h-[450px] w-full max-w-5xl mx-auto mt-10 flex justify-center items-center z-20 pointer-events-none">
                {!isScrolled && heroCards.map((img, i) => {
                    let isVisible = false;
                    let isStacked = false;
                    let isFanned = false;

                    if (i === 0) {
                        if (stage >= 2) isVisible = true;
                        if (stage >= 3) isStacked = true;
                        if (stage >= 4) isFanned = true;
                    } else {
                        if (stage >= 3) {
                            isVisible = true;
                            isStacked = true;
                        }
                        if (stage >= 4) isFanned = true;
                    }

                    return (
                        <motion.div
                            key={img.id}
                            layoutId={img.id}
                            initial={{ opacity: 0, y: 400, x: 0, rotate: 30, scale: 0.8 }}
                            animate={{
                                opacity: isVisible ? 1 : 0,
                                y: isFanned ? img.fan.y : (isStacked ? 0 : (isVisible ? 0 : 400)),
                                x: isFanned ? img.fan.x : 0,
                                rotate: isFanned ? img.fan.r : (isStacked ? (i % 2 === 0 ? -2 : 2) : (isVisible ? -5 : 30)),
                                scale: isVisible ? 1 : 0.8
                            }}
                            transition={{
                                type: "spring",
                                damping: 22,
                                stiffness: 90,
                                mass: 1
                            }}
                            className="absolute origin-bottom pointer-events-auto"
                            style={{ zIndex: img.z }}
                        >
                            <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] overflow-hidden border-4 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-900 relative">
                                <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0"></div>
                                <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none">
                                    <div className="text-white font-medium text-sm md:text-base line-clamp-2 drop-shadow">{img.title}</div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Chat Bubbles */}
                {!isScrolled && (
                    <>
                        <motion.div
                            layoutId="bubble1"
                            initial={{ opacity: 0, scale: 0, y: 20 }}
                            animate={{ opacity: stage >= 5 ? 1 : 0, scale: stage >= 5 ? 1 : 0, y: stage >= 5 ? 0 : 20 }}
                            transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                            className="absolute z-50 top-10 left-[15%] md:left-[25%] -translate-x-1/2 -translate-y-1/2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-bl-sm font-medium text-sm shadow-xl"
                        >
                            @{HERO_DUMMY_DATA[0].slug}
                        </motion.div>

                        <motion.div
                            layoutId="bubble2"
                            initial={{ opacity: 0, scale: 0, y: 20 }}
                            animate={{ opacity: stage >= 5 ? 1 : 0, scale: stage >= 5 ? 1 : 0, y: stage >= 5 ? 0 : 20 }}
                            transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
                            className="absolute z-50 top-20 right-[15%] md:right-[25%] translate-x-1/2 -translate-y-1/2 bg-emerald-500 dark:bg-emerald-600 text-white px-4 py-2 rounded-2xl rounded-br-sm font-medium text-sm shadow-xl"
                        >
                            @{HERO_DUMMY_DATA[1].slug}
                        </motion.div>
                    </>
                )}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: stage >= 5 ? 1 : 0, y: stage >= 5 ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-12 max-w-md mx-auto relative z-10"
            >
                <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
                    {t('hero.desc')}
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Link to="/proqramlar" className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                        {t('nav.programs')}
                    </Link>
                    <Link to="/telimciler" className="px-6 py-3 rounded-full font-medium border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors bg-white dark:bg-gray-900 dark:text-white">    
                        {t('nav.teachers')}
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

const Showcase = ({ onOpenModal, isScrolled }: { onOpenModal: () => void, isScrolled?: boolean }) => {
    const { t } = useLanguage();
    const heroCards = buildHeroCards();
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
                <FadeIn>
                    <p className="text-sm font-semibold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-4">{t('nav.programs')}</p>
                    <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-tight mb-6 text-gray-900 dark:text-gray-50">
                        {t('showcase.title')}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg max-w-md">
                        {t('showcase.desc')}
                    </p>
                    <div className="flex items-center gap-4">
                        <Link to="/proqramlar" className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                            {t('common.explore')}
                        </Link>
                        <button
                            onClick={onOpenModal}
                            className="px-6 py-3 rounded-full font-medium border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors bg-white dark:bg-gray-900 dark:text-white"
                        >
                            {t('common.detail')}
                        </button>
                    </div>
                </FadeIn>
            </div>
            <div className="relative h-[500px] hidden md:flex justify-center items-center">
                {isScrolled && heroCards.map((img, i) => (
                    <motion.div
                        key={img.id}
                        layoutId={img.id}
                        initial={false}
                        animate={{ opacity: 1, x: img.showcase.x, y: img.showcase.y, rotate: img.showcase.r, scale: 1 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 80
                        }}
                        className="absolute origin-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] rounded-3xl overflow-hidden border-4 border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-900 w-48 h-48 md:w-64 md:h-64"
                        style={{ zIndex: img.z }}
                    >
                        <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                    </motion.div>
                ))}

                {isScrolled && (
                    <>
                        <motion.div
                            layoutId="bubble1"
                            initial={false}
                            animate={{ opacity: 1, scale: 1, x: -120, y: -120 }}
                            transition={{
                                type: "spring",
                                bounce: 0.5
                            }}
                            className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-bl-sm font-medium text-sm shadow-xl"
                        >
                            @kibertəhlükəsizlik
                        </motion.div>

                        <motion.div
                            layoutId="bubble2"
                            initial={false}
                            animate={{ opacity: 1, scale: 1, x: 120, y: 120 }}
                            transition={{
                                type: "spring",
                                bounce: 0.5
                            }}
                            className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-2 rounded-2xl rounded-br-sm font-medium text-sm shadow-xl"
                        >
                            @proqramlaşdırma
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
};

const Gateway = ({ banners }: { banners: AdvertisementBanner[] }) => {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    const bannerImages = banners
        .map((b) => {
            if (b.imageUrl) return { src: b.imageUrl, alt: b.altText ?? b.title, title: b.title, redirectUrl: b.redirectUrl };
            if (b.imageData) {
                const src = b.imageData.startsWith('data:') ? b.imageData : `data:image/jpeg;base64,${b.imageData}`;
                return { src, alt: b.altText ?? b.title, title: b.title, redirectUrl: b.redirectUrl };
            }
            return null;
        })
        .filter(Boolean) as { src: string; alt: string; title?: string; redirectUrl?: string }[];

    const imagesToUse = bannerImages.length > 0
        ? bannerImages
        : [
            { src: IMAGES[2], alt: 'Gateway', title: 'Stack Academy', redirectUrl: undefined },
            { src: IMAGES[3], alt: 'Gateway', title: 'Stack Academy', redirectUrl: undefined },
            { src: IMAGES[4], alt: 'Gateway', title: 'Stack Academy', redirectUrl: undefined },
        ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imagesToUse.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [imagesToUse.length]);

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <FadeIn>
                <p className="text-sm font-semibold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-4">{t('home.banners')}</p>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-12 max-w-3xl text-gray-900 dark:text-gray-50">
                    {t('home.bannersDesc')}
                </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
                <div className="relative w-full h-[600px] rounded-[2.5rem] overflow-hidden group">
                    <AnimatePresence mode="wait">
                        {imagesToUse[currentIndex] && (
                            <motion.a
                                key={currentIndex}
                                href={imagesToUse[currentIndex].redirectUrl || undefined}
                                target={imagesToUse[currentIndex].redirectUrl ? "_blank" : undefined}
                                rel={imagesToUse[currentIndex].redirectUrl ? "noreferrer" : undefined}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0 block"
                            >
                                <img
                                    src={imagesToUse[currentIndex].src}
                                    className="w-full h-full object-cover"
                                    alt={imagesToUse[currentIndex].alt ?? 'Gateway'}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/45 dark:from-black/70 via-black/10 dark:via-black/20 to-transparent" />
                                {imagesToUse[currentIndex].title && (
                                    <div className="absolute bottom-10 left-10 right-10 text-white">
                                        <p className="text-sm uppercase tracking-[0.25em] text-white/70 mb-2">{t('common.pano')}</p>
                                        <h3 className="text-3xl md:text-4xl font-semibold leading-tight drop-shadow-lg">
                                            {imagesToUse[currentIndex].title}
                                        </h3>
                                    </div>
                                )}
                            </motion.a>
                        )}
                    </AnimatePresence>
                    <div className="absolute top-8 left-8 flex flex-col gap-2 z-10">
                        {Array.from({ length: Math.min(imagesToUse.length, 5) }).map((_, i) => (
                            <div key={i} className={`w-12 h-12 rounded-xl transition-colors duration-500 ${i === currentIndex ? 'bg-white' : 'bg-black/50 dark:bg-gray-900/50 backdrop-blur'}`}></div>
                        ))}
                    </div>
                </div>
            </FadeIn>
        </section>
    );
};

const Trusted = () => {
    const { t } = useLanguage();
    return (
    <section className="py-24 px-6 max-w-7xl mx-auto text-center overflow-hidden">
        <FadeIn>
            <h2 className="text-4xl font-medium tracking-tight mb-4 text-gray-900 dark:text-gray-50">{t('home.programs')}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
                {t('home.programsDesc')}
            </p>

            <div className="relative flex overflow-x-hidden group">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="flex gap-16 items-center whitespace-nowrap opacity-50 grayscale dark:opacity-30 dark:grayscale-0 dark:brightness-200"
                >
                    <span className="text-2xl font-bold">React</span>
                    <span className="text-2xl font-bold">Node.js</span>
                    <span className="text-2xl font-bold">Python</span>
                    <span className="text-2xl font-bold">Figma</span>
                    <span className="text-2xl font-bold">TensorFlow</span>
                    <span className="text-2xl font-bold">AWS</span>
                    <span className="text-2xl font-bold">Docker</span>
                    <span className="text-2xl font-bold">Kubernetes</span>
                    {/* Duplicate for seamless loop */}
                    <span className="text-2xl font-bold">React</span>
                    <span className="text-2xl font-bold">Node.js</span>
                    <span className="text-2xl font-bold">Python</span>
                    <span className="text-2xl font-bold">Figma</span>
                    <span className="text-2xl font-bold">TensorFlow</span>
                    <span className="text-2xl font-bold">AWS</span>
                    <span className="text-2xl font-bold">Docker</span>
                    <span className="text-2xl font-bold">Kubernetes</span>
                </motion.div>
            </div>
        </FadeIn>
    </section>
    );
};

const Statement = ({ isScrolled }: { isScrolled?: boolean }) => {
    const { t } = useLanguage();
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0.4, 0.6], [0.3, 1]);

    return (
        <section className="py-32 px-6 relative min-h-[80vh] flex flex-col items-center justify-center">
            <div className="max-w-6xl mx-auto relative z-10 text-center flex items-center justify-center min-h-[60vh]">
                <motion.h2 style={{ scale, opacity }} className="text-4xl md:text-7xl font-medium leading-[1.1] tracking-tight text-gray-900 dark:text-gray-100 relative z-0">
                    {t('home.statement')}
                </motion.h2>
            </div>
        </section>
    );
};

const Vision = ({ isScrolled, visionRef, graduates }: { isScrolled?: boolean, visionRef?: React.RefObject<HTMLElement | null>, graduates: Graduate[] }) => {
    const { t } = useLanguage();
    return (
        <section ref={visionRef} className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center min-h-screen">
            <div>
                <FadeIn>
                    <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-tight mb-6 text-gray-900 dark:text-gray-50">
                        {t('graduates.title')}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg max-w-md">
                        {t('graduates.desc')}
                    </p>
                    <Link to="/mezunlar" className="inline-block px-6 py-3 rounded-full font-medium border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors bg-white dark:bg-gray-900 dark:text-white mb-16">
                        {t('common.detail')}
                    </Link>

                {/* Icons */}
                <div className="flex flex-wrap gap-4 max-w-xs">
                    <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center"><PenTool className="w-5 h-5" /></div>
                    <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center"><Aperture className="w-5 h-5" /></div>
                    <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center"><Command className="w-5 h-5" /></div>
                    <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center"><Layers className="w-5 h-5" /></div>
                    <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center"><Edit2 className="w-5 h-5" /></div>
                    <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center"><Feather className="w-5 h-5" /></div>
                </div>
            </FadeIn>
        </div>

        <div className="relative w-full">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-none border border-gray-100 dark:border-gray-800">
                {/* Grid */}
                <div className="p-6 bg-gray-50/50 dark:bg-gray-800/50 min-h-[400px] rounded-3xl">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {(graduates.length > 0 ? graduates : []).slice(0, 6).map((g, i) => (
                            <motion.div
                                key={g._id ?? i}
                                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                animate={{ opacity: isScrolled ? 1 : 0.75, y: isScrolled ? 0 : 8, scale: 1 }}
                                transition={{ type: "spring", damping: 25, stiffness: 80, delay: i * 0.03 }}
                                className="relative rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                            >
                                <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 relative">
                                    <img src={toImageSrc(g.photo ?? null) ?? IMAGES[i % IMAGES.length]} alt={g.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0"></div>
                                    <div className="absolute bottom-3 left-3 right-3 text-white">
                                        <div className="text-sm font-semibold leading-tight line-clamp-2 drop-shadow">{g.name}</div>
                                        <div className="text-xs text-white/85 mt-0.5 line-clamp-2 drop-shadow">
                                            {g.jobTitle ? g.jobTitle : 'Məzun'}{g.companyName ? ` • ${g.companyName}` : ''}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
};

const Story = ({ posts }: { posts: BlogPost[] }) => {
    const { t } = useLanguage();
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <FadeIn className="text-center mb-16">
                <p className="text-sm font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-4">{t('blog_page.title')}</p>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tight max-w-3xl mx-auto text-gray-900 dark:text-gray-50">
                    {t('blog_page.desc')}
                </h2>
            </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((post, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                    <Link to={`/bloq/${post.slug}`} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] overflow-hidden hover:shadow-xl dark:hover:shadow-none transition-shadow flex flex-col h-full group block">
                        <div className="h-48 overflow-hidden">
                            <img src={post.coverImage ?? IMAGES[(idx + 5) % IMAGES.length]} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex gap-2 mb-4">
                                {(post.tags ?? []).slice(0, 2).map((tag, i) => (
                                    <span key={i} className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">{tag}</span>
                                ))}
                            </div>
                            <h3 className="text-xl font-medium mb-3 line-clamp-2 text-gray-900 dark:text-gray-100">{post.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6 line-clamp-3 flex-grow">{post.content}</p>
                            <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-6 mt-auto">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xs font-medium text-gray-900 dark:text-white">{post.author.charAt(0)}</div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{post.author}</div>
                                </div>
                                <div className="text-xs text-gray-400">{post.readingTime ?? 1} dəq oxuma</div>
                            </div>
                        </div>
                    </Link>
                </FadeIn>
            ))}
        </div>
    </section>
    );
};

const Trainers = ({ teachers }: { teachers: Teacher[] }) => {
    const { t } = useLanguage();
    // Top row variations (size and vertical offset)
    const topRowVariations = [
        { size: 'w-24 h-24 md:w-32 md:h-32', y: '-translate-y-8' },
        { size: 'w-32 h-32 md:w-40 md:h-40', y: 'translate-y-12' },
        { size: 'w-28 h-28 md:w-36 md:h-36', y: '-translate-y-16' },
        { size: 'w-20 h-20 md:w-28 md:h-28', y: 'translate-y-4' },
        { size: 'w-36 h-36 md:w-48 md:h-48', y: '-translate-y-10' },
        { size: 'w-24 h-24 md:w-32 md:h-32', y: 'translate-y-16' },
        { size: 'w-32 h-32 md:w-40 md:h-40', y: '-translate-y-6' },
        { size: 'w-28 h-28 md:w-36 md:h-36', y: 'translate-y-8' },
    ];

    // Bottom row variations
    const bottomRowVariations = [
        { size: 'w-28 h-28 md:w-36 md:h-36', y: 'translate-y-8' },
        { size: 'w-36 h-36 md:w-48 md:h-48', y: '-translate-y-12' },
        { size: 'w-24 h-24 md:w-32 md:h-32', y: 'translate-y-16' },
        { size: 'w-32 h-32 md:w-40 md:h-40', y: '-translate-y-6' },
        { size: 'w-20 h-20 md:w-28 md:h-28', y: 'translate-y-10' },
        { size: 'w-28 h-28 md:w-36 md:h-36', y: '-translate-y-16' },
        { size: 'w-24 h-24 md:w-32 md:h-32', y: 'translate-y-4' },
        { size: 'w-36 h-36 md:w-48 md:h-48', y: '-translate-y-8' },
    ];

    const baseTeachers = teachers;
    const repeatedTeachers = [...baseTeachers, ...baseTeachers, ...baseTeachers, ...baseTeachers];

    return (
        <section className="py-24 overflow-hidden relative bg-white dark:bg-[#050505] flex flex-col items-center justify-center min-h-screen">

            {/* Top Row - Sliding Left */}
            <div className="w-full relative flex flex-col gap-8 mb-8">
                <div className="flex overflow-hidden group py-16">
                    <div className="flex gap-8 md:gap-12 items-center whitespace-nowrap animate-marquee-left group-hover:[animation-play-state:paused]">
                        {repeatedTeachers.map((teacher, i) => {
                            const variation = topRowVariations[i % topRowVariations.length];
                            return (
                                <Link
                                    key={i}
                                    to={teacher._id ? `/telimciler/${teacher._id}` : "/telimciler"}
                                    className={`block ${variation.size} ${variation.y} rounded-[2rem] overflow-hidden flex-shrink-0 transition-transform hover:scale-110 shadow-sm border-[4px] border-white dark:border-gray-800`}>
                                    <img src={teacher.profilePhoto ?? IMAGES[i % IMAGES.length]} className="w-full h-full object-cover" alt={teacher.fullName} />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Center Text Area */}
            <div className="max-w-4xl mx-auto text-center relative z-10 px-6 my-4">
                <FadeIn>
                    <div className="w-10 h-10 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                        <Users className="w-4 h-4 text-gray-800 dark:text-gray-200" />
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 text-gray-900 dark:text-gray-50">
                        {t('nav.teachers')}
                    </h2>
                    <p className="text-gray-900 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        {t('teacher_page.desc')}
                    </p>
                </FadeIn>
            </div>

            {/* Bottom Row - Sliding Right */}
            <div className="w-full relative flex flex-col gap-8 mt-8">
                <div className="flex overflow-hidden group py-16">
                    <div className="flex gap-8 md:gap-12 items-center whitespace-nowrap animate-marquee-right group-hover:[animation-play-state:paused]">
                        {[...repeatedTeachers].reverse().map((teacher, i) => {
                            const variation = bottomRowVariations[i % bottomRowVariations.length];
                            return (
                                <Link
                                    key={i}
                                    to={teacher._id ? `/telimciler/${teacher._id}` : "/telimciler"}
                                    className={`block ${variation.size} ${variation.y} rounded-[2rem] overflow-hidden flex-shrink-0 transition-transform hover:scale-110 shadow-sm border-[4px] border-white dark:border-gray-800`}>
                                    <img src={teacher.profilePhoto ?? IMAGES[i % IMAGES.length]} className="w-full h-full object-cover" alt={teacher.fullName} />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = ({ onOpenModal }: { onOpenModal: () => void }) => {
    const { t } = useLanguage();
    const { data: programs } = useAsync<EducationProgram[]>(() => getPrograms({ page: 1, limit: 20 }), [], []);
    const { data: companies } = useAsync<EmployerCompany[]>(() => getActiveEmployerCompanies(), [], []);

    const orderedCompanies = [...companies].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    const marqueeCompanies = orderedCompanies.length > 0 ? orderedCompanies : [];

    const location = useLocation();
    if (location.pathname === '/roadmap') return null;

    return (
        <footer className="mt-24 bg-gray-50 dark:bg-[#020202] pt-24">
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <h2 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-gray-100">{t('footer.companiesTitle')}</h2>
            </div>
            <div className="overflow-hidden whitespace-nowrap py-12 flex items-center border-y border-black/5 dark:border-white/5 mb-24">
                <div className="flex gap-16 items-center animate-marquee-left">
                    {marqueeCompanies.length > 0 &&
                        [...Array(2)].map((_, i) => (
                            <React.Fragment key={i}>
                                {marqueeCompanies.map((c) => (
                                    <a
                                        key={`${i}-${c._id}`}
                                        href={c.website ?? undefined}
                                        target={c.website ? "_blank" : undefined}
                                        rel={c.website ? "noreferrer" : undefined}
                                        className="w-32 h-12 grayscale opacity-50 dark:opacity-30 dark:invert hover:grayscale-0 hover:opacity-100 dark:hover:invert-[0] dark:hover:opacity-100 transition-all inline-flex items-center justify-center"
                                    >
                                        <img
                                            src={toImageSrc(c.logo) ?? ''}
                                            className="w-full h-full object-contain"
                                            alt={c.companyName}
                                            referrerPolicy="no-referrer"
                                        />
                                    </a>
                                ))}
                            </React.Fragment>
                        ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6 mb-24">
                <div className="bg-blue-600 dark:bg-blue-900 text-white rounded-[2.5rem] p-12 h-[400px] flex flex-col justify-between relative overflow-hidden group">
                    <div className="relative z-10">
                        <h3 className="text-5xl font-medium tracking-tight mb-4" dangerouslySetInnerHTML={{ __html: t('footer.startCareer') }}></h3>
                        <p className="text-blue-100 max-w-xs mb-8">{t('teacher_page.desc')}</p>
                        <button onClick={onOpenModal} className="bg-white dark:bg-blue-100 text-blue-600 dark:text-blue-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-white transition-colors">{t('nav.apply')}</button>
                    </div>
                    <img src={IMAGES[8]} className="absolute right-0 bottom-0 w-2/3 h-full object-cover object-right transition-transform duration-700 group-hover:scale-105 opacity-50 mix-blend-overlay" alt="" referrerPolicy="no-referrer" />
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-12 h-[400px] flex flex-col justify-between relative overflow-hidden group shadow-xl dark:shadow-none shadow-black/5 border border-gray-100 dark:border-gray-800">
                    <div className="relative z-10">
                        <h3 className="text-5xl font-medium tracking-tight mb-4 text-gray-900 dark:text-gray-50" dangerouslySetInnerHTML={{ __html: t('footer.newSkills') }}></h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xs mb-8">{t('showcase.desc')}</p>
                        <Link to="/proqramlar" className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">{t('nav.programs')}</Link>
                    </div>
                    <img src={IMAGES[3]} className="absolute right-0 bottom-0 w-2/3 h-full object-cover object-right transition-transform duration-700 group-hover:scale-105 opacity-50" alt="" referrerPolicy="no-referrer" />
                </div>
            </div>

            <div className="bg-white dark:bg-[#020202] pt-20 pb-10 border-t border-gray-200 dark:border-gray-800/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                        <div className="lg:col-span-4">
                            <Link to="/" className="flex items-center gap-2 mb-6">
                                <Logo className="w-10 h-10" />
                                <span className="text-2xl font-bold tracking-tight uppercase">Stack Academy</span>
                            </Link>
                            <p className="text-gray-500 dark:text-gray-400 text-base mb-8 max-w-sm leading-relaxed">
                                {t('footer.desc')}
                            </p>
                            <div className="flex items-center gap-4">
                                <Link to="/" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </Link>
                                <Link to="/" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-400 hover:text-white transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </Link>
                                <Link to="/" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-pink-600 hover:text-white transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </Link>
                                <Link to="/" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-900 hover:text-white transition-colors">
                                    <Github className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">{t('nav.programs')}</h4>
                            <ul className="flex flex-col gap-4">
                                {programs.slice(0, 6).map((p) => (
                                    <li key={p._id}>
                                        <Link to={`/proqramlar/${p.slug}`} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            {p.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-2">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-wider text-sm">{t('nav.academy')}</h4>
                            <ul className="flex flex-col gap-4">
                                <li><Link to="/telimciler" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.teachers')}</Link></li>
                                <li><Link to="/mezunlar" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.graduates')}</Link></li>
                                <li><Link to="/bloq" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.blog')}</Link></li>
                                <li><Link to="/haqqimizda" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.about')}</Link></li>
                            </ul>
                        </div>

                        <div className="lg:col-span-4">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">{t('footer.newsletter')}</h4>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">{t('footer.newsletterDesc')}</p>
                            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder={t('footer.emailPlaceholder')}
                                    className="flex-grow px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                    required
                                />
                                <button type="submit" className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors whitespace-nowrap">
                                    {t('footer.subscribe')}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100 dark:border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 dark:text-gray-500 text-sm">
                            © {new Date().getFullYear()} Stack Academy. {t('footer.rights')}
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link to="/mexfilik-siyaseti" className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors">{t('footer.privacy')}</Link>
                            <Link to="/istifade-sertleri" className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors">{t('footer.terms')}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const Home = ({ onOpenModal }: { onOpenModal: () => void }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    const visionRef = useRef<HTMLElement>(null);
    const isStatementScrolled = useInView(visionRef, { margin: "-30% 0px -30% 0px" });

    const { data: programs } = useAsync<EducationProgram[]>(() => getPrograms({ page: 1, limit: 50 }), [], []);
    const { data: banners } = useAsync<AdvertisementBanner[]>(() => getActiveBanners(), [], []);
    const { data: featuredPosts } = useAsync<BlogPost[]>(() => getFeaturedBlogPosts(), [], []);
    const { data: allPosts } = useAsync<BlogPost[]>(() => getAllBlogPosts({ page: 1, limit: 6 }), [], []);
    const { data: teachers } = useAsync<Teacher[]>(() => getTeachers({ page: 1, limit: 16 }), [], []);
    const { data: graduates } = useAsync<Graduate[]>(() => getGraduates({ page: 1, limit: 12 }), [], []);

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            setIsScrolled(prev => {
                if (latest > 250 && !prev) return true;
                if (latest <= 250 && prev) return false;
                return prev;
            });
        });
    }, [scrollY]);

    const storyPosts = (() => {
        const unique: BlogPost[] = [];
        const seen = new Set<string>();
        for (const p of [...featuredPosts, ...allPosts]) {
            const key = p?._id ?? p?.slug ?? p?.title;
            if (!key || seen.has(String(key))) continue;
            seen.add(String(key));
            unique.push(p);
            if (unique.length >= 6) break;
        }
        return unique;
    })();

    return (
        <main>
            <Hero isScrolled={isScrolled} />
            <Showcase onOpenModal={onOpenModal} isScrolled={isScrolled} />
            <Gateway banners={banners} />
            <Trusted />
            <Statement isScrolled={isStatementScrolled} />
            <Vision visionRef={visionRef} isScrolled={isStatementScrolled} graduates={graduates} />
            <Story posts={storyPosts} />
            <Trainers teachers={teachers} />
        </main>
    );
};

const mockPrograms = [
    {
        title: "Kibertəhlükəsizlik",
        slug: "kibertehlukesizlik",
        icon: Shield,
        bannerImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000",
        shortDescription: "Məlumatların qorunması və şəbəkə təhlükəsizliyi üzrə mütəxəssis olun.",
        longDescription: "Kibertəhlükəsizlik proqramı sizə müasir təhlükəsizlik təhdidlərini anlamaq, sistemləri qorumaq və kiber hücumların qarşısını almaq üçün lazım olan bilik və bacarıqları öyrədir. Bu proqram vasitəsilə siz şəbəkə təhlükəsizliyi, etik hakinq, kriptoqrafiya və informasiya təhlükəsizliyi idarəetməsi kimi mövzuları dərindən mənimsəyəcəksiniz.",
        totalDuration: 6,
        lessonHours: 120,
        color: "text-blue-600",
        bg: "bg-blue-50",
        syllabusModules: [
            { title: "Şəbəkə Təhlükəsizliyi Əsasları", description: "TCP/IP, OSI modeli, firewall və VPN texnologiyaları.", duration: 20 },
            { title: "Etik Hakinq və Sızma Testləri", description: "Sistemlərdəki boşluqların tapılması və aradan qaldırılması.", duration: 40 },
            { title: "Kriptoqrafiya", description: "Məlumatların şifrələnməsi və deşifrələnməsi üsulları.", duration: 30 },
            { title: "İnformasiya Təhlükəsizliyi İdarəetməsi", description: "ISO 27001 və digər təhlükəsizlik standartları.", duration: 30 },
        ],
        faqs: [
            { question: "Proqram kimlər üçündür?", answer: "Kibertəhlükəsizlik sahəsinə marağı olan, təməl IT biliklərinə sahib hər kəs üçün uyğundur." },
            { question: "Dərslər hansı formatda keçirilir?", answer: "Dərslər həm nəzəri, həm də praktiki məşğələlərdən ibarətdir. Real laboratoriya mühitində sınaqlar keçirilir." }
        ],
        teachers: [
            { fullName: "Əli Məmmədov", professionalTitle: "Kibertəhlükəsizlik Mütəxəssisi", profilePhoto: IMAGES[0] },
            { fullName: "Nərmin Quliyeva", professionalTitle: "İnformasiya Təhlükəsizliyi Auditi", profilePhoto: IMAGES[1] }
        ],
        courseGroups: [
            { name: "KIB-01", startDate: "2026-04-01", endDate: "2026-10-01", schedule: "Bazar ertəsi, Çərşənbə 19:00", capacity: 20, currentStudentCount: 15, status: "upcoming" },
            { name: "KIB-02", startDate: "2026-05-15", endDate: "2026-11-15", schedule: "Çərşənbə axşamı, Cümə axşamı 19:00", capacity: 20, currentStudentCount: 5, status: "upcoming" }
        ],
        softwareTools: [
            { name: "Kali Linux", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg" },
            { name: "Wireshark", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Wireshark_icon.svg" },
            { name: "Metasploit", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg" } // Placeholder
        ]
    },
    {
        title: "Data Analitikası",
        slug: "data-analitikasi",
        icon: Database,
        bannerImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
        shortDescription: "Böyük həcmli məlumatları təhlil edərək biznes qərarlarına təsir edin.",
        longDescription: "Data Analitikası proqramı vasitəsilə məlumatların toplanması, təmizlənməsi, təhlili və vizuallaşdırılması üsullarını öyrənəcəksiniz. Python, SQL və Tableau kimi alətlərdən istifadə edərək real biznes problemlərini həll etməyi bacaracaqsınız.",
        totalDuration: 5,
        lessonHours: 100,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        syllabusModules: [
            { title: "Python ilə Data Analizi", description: "Pandas, NumPy və Matplotlib kitabxanaları ilə iş.", duration: 30 },
            { title: "SQL Əsasları", description: "Məlumat bazalarının idarə edilməsi və sorğuların yazılması.", duration: 25 },
            { title: "Data Vizuallaşdırma", description: "Tableau və Power BI ilə interaktiv dashboardların yaradılması.", duration: 25 },
            { title: "Statistika və Ehtimal", description: "Data analizi üçün riyazi əsaslar.", duration: 20 },
        ],
        faqs: [
            { question: "Proqramlaşdırma biliyi tələb olunurmu?", answer: "Xeyr, proqram sıfırdan başlayanlar üçün nəzərdə tutulub." }
        ],
        teachers: [
            { fullName: "Rəşad Əliyev", professionalTitle: "Senior Data Analitik", profilePhoto: IMAGES[2] }
        ],
        courseGroups: [
            { name: "DA-01", startDate: "2026-04-10", endDate: "2026-09-10", schedule: "Şənbə, Bazar 10:00", capacity: 25, currentStudentCount: 20, status: "upcoming" }
        ],
        softwareTools: [
            { name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
            { name: "Tableau", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png" }
        ]
    },
    {
        title: "Süni İntellekt",
        slug: "suni-intellekt",
        icon: Cpu,
        bannerImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000",
        shortDescription: "Gələcəyin texnologiyası olan AI və Machine Learning alətlərini öyrənin.",
        longDescription: "Süni İntellekt proqramı sizə maşın öyrənməsi (Machine Learning), dərin öyrənmə (Deep Learning) və təbii dil emalı (NLP) kimi qabaqcıl texnologiyaları öyrədir. Bu proqramla siz ağıllı sistemlər və proqnozlaşdırma modelləri yarada biləcəksiniz.",
        totalDuration: 7,
        lessonHours: 140,
        color: "text-purple-600",
        bg: "bg-purple-50",
        syllabusModules: [
            { title: "Machine Learning Əsasları", description: "Supervised və Unsupervised learning alqoritmləri.", duration: 40 },
            { title: "Deep Learning və Neyron Şəbəkələri", description: "TensorFlow və Keras ilə dərin öyrənmə modelləri.", duration: 40 },
            { title: "Təbii Dil Emalı (NLP)", description: "Mətn məlumatlarının analizi və emalı.", duration: 30 },
            { title: "Kompüter Görməsi (Computer Vision)", description: "Təsvirlərin və videoların analizi.", duration: 30 },
        ],
        faqs: [
            { question: "Riyaziyyat biliyi vacibdirmi?", answer: "Bəli, statistika, xətti cəbr və ehtimal nəzəriyyəsi üzrə təməl biliklər tövsiyə olunur." }
        ],
        teachers: [
            { fullName: "Aynur Həsənova", professionalTitle: "AI Tədqiqatçısı", profilePhoto: IMAGES[3] }
        ],
        courseGroups: [
            { name: "AI-01", startDate: "2026-05-01", endDate: "2026-12-01", schedule: "Bazar ertəsi, Çərşənbə, Cümə 19:00", capacity: 15, currentStudentCount: 8, status: "upcoming" }
        ],
        softwareTools: [
            { name: "TensorFlow", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" },
            { name: "PyTorch", logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg" }
        ]
    },
    {
        title: "UI/UX Dizayn",
        slug: "ui-ux-dizayn",
        icon: PenTool,
        bannerImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000",
        shortDescription: "İstifadəçi təcrübəsini yaxşılaşdıran və vizual olaraq cəlbedici interfeyslər yaradın.",
        longDescription: "UI/UX Dizayn proqramı rəqəmsal məhsulların istifadəçi mərkəzli dizaynını öyrədir. İstifadəçi araşdırması, wireframing, prototipləşdirmə və vizual dizayn prinsiplərini mənimsəyərək funksional və estetik interfeyslər yaradacaqsınız.",
        totalDuration: 4,
        lessonHours: 80,
        color: "text-orange-600",
        bg: "bg-orange-50",
        syllabusModules: [
            { title: "UX Araşdırma və Strategiya", description: "İstifadəçi ehtiyaclarının öyrənilməsi və persona yaradılması.", duration: 20 },
            { title: "Wireframing və Prototipləşdirmə", description: "Figma ilə interfeys eskizlərinin və interaktiv prototiplərin hazırlanması.", duration: 25 },
            { title: "UI Dizayn Prinsipləri", description: "Rəng nəzəriyyəsi, tipoqrafiya və vizual iyerarxiya.", duration: 20 },
            { title: "Dizayn Sistemləri", description: "Təkrar istifadə edilə bilən dizayn komponentlərinin yaradılması.", duration: 15 },
        ],
        faqs: [
            { question: "Dizayn proqramlarını bilmək lazımdırmı?", answer: "Xeyr, Figma və digər alətlər kurs ərzində sıfırdan öyrədilir." }
        ],
        teachers: [
            { fullName: "Leyla Kərimova", professionalTitle: "Senior Product Designer", profilePhoto: IMAGES[4] }
        ],
        courseGroups: [
            { name: "UX-01", startDate: "2026-04-20", endDate: "2026-08-20", schedule: "Çərşənbə axşamı, Cümə axşamı 19:00", capacity: 20, currentStudentCount: 18, status: "upcoming" }
        ],
        softwareTools: [
            { name: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" }
        ]
    }
];

const mockTeachers = [
    {
        fullName: "Əli Məmmədov",
        profilePhoto: IMAGES[0],
        professionalTitle: "Kibertəhlükəsizlik Mütəxəssisi",
        biography: "10 ildən artıq təcrübəyə malik kibertəhlükəsizlik eksperti. Müxtəlif beynəlxalq layihələrdə iştirak edib.",
        expertise: ["Şəbəkə Təhlükəsizliyi", "Etik Hakinq", "Kriptoqrafiya"],
        yearsOfExperience: 10,
        companyName: "TechSec MMC",
        socialLinks: { linkedin: "#", github: "#" }
    },
    {
        fullName: "Rəşad Əliyev",
        profilePhoto: IMAGES[2],
        professionalTitle: "Senior Data Analitik",
        biography: "Böyük verilənlərin təhlili və vizuallaşdırılması üzrə ixtisaslaşmış data mütəxəssisi.",
        expertise: ["Python", "SQL", "Tableau", "Power BI"],
        yearsOfExperience: 8,
        companyName: "DataCorp",
        socialLinks: { linkedin: "#", github: "#" }
    },
    {
        fullName: "Aynur Həsənova",
        profilePhoto: IMAGES[3],
        professionalTitle: "AI Tədqiqatçısı",
        biography: "Süni intellekt və maşın öyrənməsi sahəsində elmi tədqiqatlar aparan mütəxəssis.",
        expertise: ["Machine Learning", "Deep Learning", "NLP"],
        yearsOfExperience: 6,
        companyName: "AI Labs",
        socialLinks: { linkedin: "#", github: "#" }
    },
    {
        fullName: "Leyla Kərimova",
        profilePhoto: IMAGES[4],
        professionalTitle: "Senior Product Designer",
        biography: "İstifadəçi mərkəzli dizayn və rəqəmsal məhsulların yaradılması üzrə peşəkar dizayner.",
        expertise: ["UI/UX Dizayn", "Figma", "İstifadəçi Araşdırması"],
        yearsOfExperience: 7,
        companyName: "DesignStudio",
        socialLinks: { linkedin: "#", portfolio: "#" }
    }
];

const mockBlogs = [
    {
        title: "2026-cı ildə Öyrənilməsi Vacib Olan 5 Proqramlaşdırma Dili",
        slug: "top-5-programming-languages-2026",
        coverImage: IMAGES[5],
        content: "Texnologiya sürətlə inkişaf edir və yeni dillər ortaya çıxır. Bu məqalədə 2026-cı ildə öyrənilməsi ən vacib olan 5 proqramlaşdırma dilini və onların tətbiq sahələrini araşdıracağıq.",
        tags: ["Proqramlaşdırma", "Karyera", "Texnologiya"],
        author: "Rəşad Əliyev",
        publishDate: "2026-03-10",
        readingTime: 5,
        featured: true
    },
    {
        title: "Kibertəhlükəsizlikdə Süni İntellektin Rolu",
        slug: "ai-in-cybersecurity",
        coverImage: IMAGES[6],
        content: "Süni intellekt kibertəhlükəsizlik sahəsində həm təhdid, həm də müdafiə vasitəsi kimi çıxış edir. Yeni nəsil AI alətlərinin təhlükəsizlik sistemlərinə necə inteqrasiya olunduğunu öyrənin.",
        tags: ["Kibertəhlükəsizlik", "Süni İntellekt"],
        author: "Əli Məmmədov",
        publishDate: "2026-03-05",
        readingTime: 7,
        featured: false
    },
    {
        title: "UI/UX Dizaynda Rəng Psixologiyası",
        slug: "color-psychology-in-ui-ux",
        coverImage: IMAGES[7],
        content: "Rənglər istifadəçilərin hisslərinə və qərarlarına necə təsir edir? Rəqəmsal məhsulların dizaynında rəng psixologiyasından istifadə edərək daha yaxşı istifadəçi təcrübəsi yaratmağın yolları.",
        tags: ["Dizayn", "UI/UX"],
        author: "Leyla Kərimova",
        publishDate: "2026-02-28",
        readingTime: 4,
        featured: false
    }
];

const mockGraduates = [
    {
        name: "Tural Qasımov",
        photo: IMAGES[8],
        program: "Data Analitikası",
        graduationYear: 2025,
        jobTitle: "Data Analitik",
        companyName: "Pasha Bank",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        linkedInProfile: "#"
    },
    {
        name: "Aysel Məmmədova",
        photo: IMAGES[9],
        program: "UI/UX Dizayn",
        graduationYear: 2025,
        jobTitle: "UI/UX Dizayner",
        companyName: "Kapital Bank",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        linkedInProfile: "#"
    },
    {
        name: "Orxan Əliyev",
        photo: IMAGES[1],
        program: "Kibertəhlükəsizlik",
        graduationYear: 2024,
        jobTitle: "Təhlükəsizlik Mühəndisi",
        companyName: "Azercell",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        linkedInProfile: "#"
    }
];

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { t } = useLanguage();
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [programId, setProgramId] = useState('');
    const [groupId, setGroupId] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    const { data: programs } = useAsync<EducationProgram[]>(() => getPrograms({ page: 1, limit: 50 }), [], []);
    const { data: groups } = useAsync<CourseGroup[]>(
        () => (programId ? getCourseGroups({ page: 1, limit: 50, program: programId }) : Promise.resolve([])),
        [programId],
        []
    );

    const currentProgram = programs.find((p) => p._id === programId) ?? null;

    const resetAndClose = () => {
        setFullName('');
        setPhone('');
        setEmail('');
        setProgramId('');
        setGroupId('');
        setMessage('');
        setSubmitting(false);
        setSubmitError(null);
        setSubmitSuccess(null);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={resetAndClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl z-[101] p-8 max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-medium text-gray-900 dark:text-gray-50">Müraciət Formu</h3>
                            <button onClick={resetAndClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-50 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form
                            className="space-y-4"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setSubmitError(null);
                                setSubmitSuccess(null);
                                setSubmitting(true);
                                try {
                                    const payload: ApplicationCreate = {
                                        fullName,
                                        email,
                                        phone,
                                        program: programId,
                                        ...(groupId ? { group: groupId } : {}),
                                        message,
                                    };
                                    await createApplication(payload);
                                    setSubmitSuccess('Müraciətiniz qəbul edildi.');
                                    setTimeout(() => resetAndClose(), 800);
                                } catch (err: any) {
                                    setSubmitError(err?.message ?? 'Müraciət göndərilmədi.');
                                } finally {
                                    setSubmitting(false);
                                }
                            }}
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ad və Soyad</label>
                                <input
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    type="text"
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#020202] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                    placeholder="Məs: Əli Məmmədov"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefon</label>
                                    <input
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        type="tel"
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#020202] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                        placeholder="+994"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <input
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#020202] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                        placeholder="nümunə@email.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Proqram</label>
                                <select
                                    required
                                    value={programId}
                                    onChange={(e) => {
                                        setProgramId(e.target.value);
                                        setGroupId('');
                                    }}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#020202] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                >
                                    <option value="">Proqram seçin</option>
                                    {programs.map((p) => (
                                        <option key={p._id} value={p._id}>{p.title}</option>
                                    ))}
                                </select>
                            </div>
                            {currentProgram && groups.length > 0 ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Qrup (Cədvəl)</label>
                                    <select
                                        value={groupId}
                                        onChange={(e) => setGroupId(e.target.value)}
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#020202] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                    >
                                        <option value="">Qrup seçin</option>
                                        {groups.map((g) => (
                                            <option key={g._id} value={g._id}>
                                                {g.name}
                                                {g.schedule ? ` - ${g.schedule}` : ''}
                                                {g.startDate ? ` (${String(g.startDate).slice(0, 10)})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : null}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mesajınız</label>
                                <textarea
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#020202] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
                                    placeholder="Əlavə qeydləriniz..."
                                />
                            </div>
                            {submitError ? (
                                <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-900/50 rounded-xl p-3">{submitError}</div>
                            ) : null}
                            {submitSuccess ? (
                                <div className="text-sm text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-900/50 rounded-xl p-3">{submitSuccess}</div>
                            ) : null}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mt-6 disabled:opacity-60"
                            >
                                {submitting ? t('contact.submitting') : t('contact.submit')}
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const TeacherDetail = () => {
    const { t } = useLanguage();
    const { id } = useParams<{ id: string }>();
    const { data: teacher, loading } = useAsync<Teacher | null>(
        () => (id ? getTeacherById(id) : Promise.resolve(null)),
        [id],
        null
    );

    if (loading) {
        return (
            <main className="pt-40 pb-24 px-6 text-center min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100">
                <div className="text-gray-500 dark:text-gray-400">{t('common.loading')}</div>
            </main>
        );
    }

    if (!teacher) {
        return (
            <main className="pt-40 pb-24 px-6 text-center min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100">
                <h1 className="text-4xl font-medium mb-4">{t('teacher_page.not_found')}</h1>
                <Link to="/telimciler" className="text-blue-600 dark:text-blue-400 hover:underline">Təlimçilərə qayıt</Link>
            </main>
        );
    }

    return (
        <main className="pt-32 pb-24 min-h-screen bg-white dark:bg-[#050505]">
            <div className="max-w-5xl mx-auto px-6">
                <FadeIn>
                    <div className="flex flex-col md:flex-row gap-10 items-start">
                        <div className="w-full md:w-[340px] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
                            <img
                                src={toImageSrc(teacher.profilePhoto ?? null) ?? IMAGES[0]}
                                alt={teacher.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">{teacher.professionalTitle}</p>
                            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 text-gray-900 dark:text-gray-50">{teacher.fullName}</h1>
                            <div className="space-y-6">
                                {teacher.companyName && (
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold text-gray-900 dark:text-gray-200">{t('teacher_page.company')}</span>{' '}
                                        <span>{teacher.companyName}</span>
                                    </div>
                                )}
                                {typeof teacher.yearsOfExperience === 'number' && (
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold text-gray-900 dark:text-gray-200">{t('teacher_page.experience')}</span>{' '}
                                        <span>{teacher.yearsOfExperience}+ {t('teacher_page.year')}</span>
                                    </div>
                                )}
                                {teacher.biography ? (
                                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{teacher.biography}</p>
                                ) : null}

                                {teacher.expertise && teacher.expertise.length > 0 ? (
                                    <div>
                                        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                                            {t('teacher_page.expertise')}
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {teacher.expertise.slice(0, 12).map((x, i) => (
                                                <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                                                    {x}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}

                                {teacher.socialLinks && (
                                    <div>
                                        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                                            {t('teacher_page.socials')}
                                        </h2>
                                        <div className="flex flex-wrap gap-3">
                                            {teacher.socialLinks.linkedin && (
                                                <a
                                                    href={teacher.socialLinks.linkedin}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                                >
                                                    <Linkedin className="w-4 h-4" />
                                                    Linkedin
                                                </a>
                                            )}
                                            {teacher.socialLinks.github && (
                                                <a
                                                    href={teacher.socialLinks.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm text-gray-900 dark:text-gray-200 hover:underline"
                                                >
                                                    <Github className="w-4 h-4" />
                                                    GitHub
                                                </a>
                                            )}
                                            {teacher.socialLinks.portfolio && (
                                                <a
                                                    href={teacher.socialLinks.portfolio}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm text-gray-900 dark:text-gray-200 hover:underline"
                                                >
                                                    <Globe className="w-4 h-4" />
                                                    Portfolio
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <Link
                                    to="/telimciler"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors mt-4 text-gray-900 dark:text-gray-200"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Təlimçilərə qayıt
                                </Link>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
};

const Telimciler = () => {
    const { t } = useLanguage();
    const { data: teachers, loading } = useAsync<Teacher[]>(() => getTeachers({ page: 1, limit: 50 }), [], []);
    const [currentIndex, setCurrentIndex] = useState(0);

    const list = teachers;

    if (loading) {
        return (
            <main className="pt-40 pb-24 px-6 text-center min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100">
                <div className="text-gray-500 dark:text-gray-400">{t('common.loading')}</div>
            </main>
        );
    }

    if (list.length === 0) {
        return (
            <main className="pt-40 pb-24 px-6 text-center min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100">
                <h1 className="text-4xl font-medium mb-4">{t('teacher_page.not_found')}</h1>
            </main>
        );
    }

    const nextTeacher = () => {
        setCurrentIndex((prev) => (prev + 1) % list.length);
    };

    const prevTeacher = () => {
        setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
    };

    const currentTeacher = list[currentIndex];

    const getThumbnails = () => {
        const thumbs = [];
        for (let i = 0; i < 3; i++) {
            const idx = (currentIndex + i) % list.length;
            thumbs.push({ ...list[idx], originalIndex: idx });
        }
        return thumbs;
    };

    return (
        <main className="pt-32 pb-24 min-h-screen flex items-center bg-white dark:bg-[#050505]">
            <div className="max-w-[1400px] mx-auto px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative">

                    <div className="lg:col-span-2 flex flex-col justify-between h-full min-h-[600px] relative">
                        <div>
                            <div className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-16">
                                {String(currentIndex + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}
                            </div>
                            <div className="origin-top-left -rotate-90 translate-y-24 text-sm font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-gray-50 absolute left-0 top-32">
                                {t('nav.teachers').toUpperCase()}
                            </div>
                        </div>

                        <button onClick={prevTeacher} className="absolute top-1/2 -translate-y-1/2 left-0 w-12 h-12 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] rounded-xl flex items-center justify-center hover:bg-black dark:hover:bg-gray-200 transition-colors z-10">
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="flex gap-4 mt-auto">
                            {getThumbnails().map((teacher, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(teacher.originalIndex)}
                                    className={`w-20 h-24 rounded-2xl overflow-hidden transition-all duration-300 ${idx === 0 ? 'ring-2 ring-offset-2 ring-black dark:ring-white dark:ring-offset-[#050505] opacity-100' : 'opacity-50 hover:opacity-100'}`}
                                >
                                    <img src={teacher.profilePhoto} alt={teacher.fullName} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="w-full aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl dark:shadow-none border border-transparent dark:border-gray-800"
                            >
                                <img src={toImageSrc(currentTeacher.profilePhoto ?? null) ?? IMAGES[0]} alt={currentTeacher.fullName} className="w-full h-full object-cover" />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-center relative pl-0 lg:pl-12">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
                            >
                                <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">{currentTeacher.professionalTitle}</p>
                                <h2 className="text-3xl font-semibold mb-10 text-gray-900 dark:text-gray-50">{currentTeacher.fullName}</h2>

                                {currentTeacher.companyName ? (
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        <span className="font-semibold text-gray-900 dark:text-gray-200">Şirkət:</span> {currentTeacher.companyName}
                                    </div>
                                ) : null}
                                {typeof currentTeacher.yearsOfExperience === 'number' ? (
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                                        <span className="font-semibold text-gray-900 dark:text-gray-200">Təcrübə:</span> {currentTeacher.yearsOfExperience}+ il
                                    </div>
                                ) : null}

                                {currentTeacher.biography ? (
                                    <p className="text-2xl md:text-3xl font-medium leading-[1.35] tracking-tight text-gray-900 dark:text-gray-100 mb-10">
                                        “{currentTeacher.biography}”
                                    </p>
                                ) : null}

                                {currentTeacher.expertise && currentTeacher.expertise.length > 0 ? (
                                    <div className="mb-10">
                                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-3">
                                            İxtisaslaşma
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {currentTeacher.expertise.slice(0, 10).map((x, i) => (
                                                <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                                                    {x}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}

                                {currentTeacher.socialLinks ? (
                                    <div className="flex flex-wrap items-center gap-3">
                                        {currentTeacher.socialLinks.linkedin ? (
                                            <a
                                                href={currentTeacher.socialLinks.linkedin}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                <Linkedin className="w-4 h-4" />
                                                Linkedin
                                            </a>
                                        ) : null}
                                        {currentTeacher.socialLinks.github ? (
                                            <a
                                                href={currentTeacher.socialLinks.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-200 hover:underline"
                                            >
                                                <Github className="w-4 h-4" />
                                                GitHub
                                            </a>
                                        ) : null}
                                        {currentTeacher.socialLinks.portfolio ? (
                                            <a
                                                href={currentTeacher.socialLinks.portfolio}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-200 hover:underline"
                                            >
                                                <Globe className="w-4 h-4" />
                                                Portfolio
                                            </a>
                                        ) : null}
                                    </div>
                                ) : null}
                            </motion.div>
                        </AnimatePresence>

                        <button onClick={nextTeacher} className="absolute top-1/2 -translate-y-1/2 -right-6 w-12 h-12 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] rounded-xl flex items-center justify-center hover:bg-black dark:hover:bg-gray-200 transition-colors z-10 hidden lg:flex">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
};

const Bloq = () => {
    const { t } = useLanguage();
    const { data: posts, loading } = useAsync<BlogPost[]>(() => getAllBlogPosts({ page: 1, limit: 20 }), [], []);
    const list = posts;
    return (
        <main className="pt-40 pb-24 bg-[#FDFDFD] dark:bg-[#050505] min-h-screen">
            <section className="px-6 max-w-7xl mx-auto mb-20 text-center">
                <FadeIn>
                    <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-gray-900 dark:text-gray-50">{t('nav.blog')}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        {t('blog_page.desc')}
                    </p>
                </FadeIn>
            </section>

            <section className="px-6 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] p-8 animate-pulse h-80" />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                            }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {list.map((post, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 100 } }
                                    }}
                                >
                                    <Link to={`/bloq/${post.slug}`} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] overflow-hidden hover:shadow-xl dark:hover:shadow-none transition-shadow flex flex-col h-full group block">
                                        <div className="h-48 overflow-hidden">
                                            <img src={toImageSrc(post.coverImage ?? null) ?? IMAGES[5]} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex gap-2 mb-4">
                                                {(post.tags ?? []).slice(0, 2).map((tag, i) => (
                                                    <span key={i} className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">{tag}</span>
                                                ))}
                                            </div>
                                            <h3 className="text-xl font-medium mb-3 line-clamp-2 text-gray-900 dark:text-gray-50">{post.title}</h3>
                                            <p className="text-gray-500 dark:text-gray-400 mb-6 line-clamp-3 flex-grow">{post.content}</p>
                                            <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-6 mt-auto">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xs font-medium text-gray-900 dark:text-white">{post.author.charAt(0)}</div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{post.author}</div>
                                                </div>
                                                <div className="text-xs text-gray-400">{post.readingTime ?? 1} {t('blog_page.read_time')}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </main>
    );
};

const BlogDetail = () => {
    const { t } = useLanguage();
    const { slug } = useParams<{ slug: string }>();
    const { data: post, loading } = useAsync<BlogPost | null>(
        () => (slug ? getBlogPostBySlug(slug) : Promise.resolve(null)),
        [slug],
        null
    );

    if (loading) {
        return (
            <main className="pt-40 pb-24 px-6 text-center min-h-screen">
                <div className="text-gray-500">{t('common.loading')}</div>
            </main>
        );
    }

    if (!post) {
        return (
            <main className="pt-40 pb-24 px-6 text-center min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100">
                <h1 className="text-4xl font-medium mb-4">{t('blog_page.not_found')}</h1>
                <Link to="/bloq" className="text-blue-600 dark:text-blue-400 hover:underline">{t('common.backToBlog')}</Link>
            </main>
        );
    }

    return (
        <main className="pt-32 pb-24 bg-white dark:bg-[#050505]">
            <article className="max-w-4xl mx-auto px-6">
                <FadeIn>
                    <div className="flex gap-2 mb-6 justify-center">
                        {(post.tags ?? []).map((tag, i) => (
                            <span key={i} className="text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-8 text-center leading-tight text-gray-900 dark:text-gray-50">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-6 text-gray-500 dark:text-gray-400 mb-12">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">{post.author.charAt(0)}</div>
                            <span className="font-medium text-gray-900 dark:text-gray-200">{post.author}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <span>{formatDate(post.publishDate)}</span>
                        <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <span>{post.readingTime ?? 1} {t('blog_page.read_time')}</span>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="w-full h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden mb-16">
                        <img src={toImageSrc(post.coverImage ?? null) ?? IMAGES[6]} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-400">
                        <p className="text-xl leading-relaxed mb-8">{post.content}</p>
                        <p className="mb-6">
                            {t('blog_page.article.p1')}
                        </p>
                        <h2 className="text-3xl font-medium text-gray-900 dark:text-gray-50 mt-12 mb-6">{t('blog_page.article.title')}</h2>
                        <p className="mb-6">
                            {t('blog_page.article.p2')}
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2">
                            <li>{t('blog_page.article.li1')}</li>
                            <li>{t('blog_page.article.li2')}</li>
                            <li>{t('blog_page.article.li3')}</li>
                            <li>{t('blog_page.article.li4')}</li>
                        </ul>
                        <p>
                            {t('blog_page.article.p3')}
                        </p>
                    </div>
                </FadeIn>
            </article>
        </main>
    );
};

const Mezunlar = () => {
    const { t } = useLanguage();
    const { data: grads, loading } = useAsync<Graduate[]>(() => getGraduates({ page: 1, limit: 50 }), [], []);
    const list = grads;
    return (
        <main className="pt-40 pb-24 bg-[#FDFDFD] dark:bg-[#050505] min-h-screen">
            <section className="px-6 max-w-7xl mx-auto mb-20 text-center">
                <FadeIn>
                    <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-gray-900 dark:text-gray-50">{t('graduates.title')}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        {t('graduates.desc')}
                    </p>
                </FadeIn>
            </section>

            <section className="px-6 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] p-8 animate-pulse h-72" />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                            }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {list.map((grad: any, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 100 } }
                                    }}
                                >
                                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] p-8 hover:shadow-xl dark:hover:shadow-none transition-shadow flex flex-col items-center text-center h-full">
                                        <img src={toImageSrc(grad.photo ?? null) ?? IMAGES[8]} alt={grad.name} className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-gray-50 dark:border-gray-800" />
                                        <h3 className="text-2xl font-medium mb-1 text-gray-900 dark:text-gray-50">{grad.name}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                                            {(typeof grad.program === 'string' ? grad.program : (grad.program?.title ?? '')) || 'Stack Academy'} {t('graduates.student_of')}
                                            {grad.graduationYear ? ` (${grad.graduationYear})` : ''}
                                        </p>

                                        {grad.linkedInProfile ? (
                                            <a
                                                href={grad.linkedInProfile}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-4"
                                            >
                                                <Linkedin className="w-4 h-4" />
                                                LinkedIn
                                            </a>
                                        ) : null}

                                        <div className="w-full border-t border-gray-50 dark:border-gray-800 pt-6 mt-auto">
                                            <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">{t('graduates.job')}</p>
                                            <div className="font-medium text-lg mb-1 text-gray-900 dark:text-gray-200">{grad.jobTitle}</div>
                                            <div className="text-blue-600 dark:text-blue-400 font-medium">{grad.companyName}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </main>
    );
};

const Haqqimizda = () => {
    const { t } = useLanguage();
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <main className="pt-40 pb-24 overflow-hidden bg-white dark:bg-[#050505]">
            <section className="px-6 max-w-7xl mx-auto mb-32 text-center relative">
                <FadeIn>
                    <h1 className="text-5xl md:text-8xl font-medium tracking-tighter mb-6 text-gray-900 dark:text-gray-50">
                        {t('about.subtitle1')} <br /><span className="text-gray-400">{t('about.subtitle2')}</span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        {t('about.desc')}
                    </p>
                </FadeIn>
                <motion.div style={{ y }} className="mt-20 relative h-[500px] rounded-[3rem] overflow-hidden">
                    <img src={IMAGES[0]} alt="About Us" className="w-full h-full object-cover" />
                </motion.div>
            </section>

            <section className="px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center mb-32">
                <FadeIn direction="right">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-gray-900 dark:text-gray-50">{t('about.mission_title')}</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
                        {t('about.mission_desc')}
                    </p>
                    <ul className="space-y-4">
                        {[t('about.check1'), t('about.check2'), t('about.check3')].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-lg font-medium text-gray-900 dark:text-gray-200">
                                <div className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-sm">✓</div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </FadeIn>
                <FadeIn direction="left" className="relative h-[600px] rounded-[2.5rem] overflow-hidden">
                    <img src={IMAGES[2]} alt="Mission" className="w-full h-full object-cover" />
                </FadeIn>
            </section>
        </main>
    );
};

const MexfilikSiyaseti = () => {
    const { t } = useLanguage();
    return (
    <main className="pt-40 pb-24 bg-white dark:bg-[#050505]">
        <section className="px-6 max-w-4xl mx-auto mb-12">
            <FadeIn>
                <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-gray-900 dark:text-gray-50">{t('privacy.title')}</h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {t('privacy.desc')}
                </p>
            </FadeIn>
        </section>
        <section className="px-6 max-w-4xl mx-auto space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
            <FadeIn delay={0.05}>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{t('privacy.section1.title')}</h2>
                    <p>{t('privacy.section1.content')}</p>
                </div>
            </FadeIn>
            <FadeIn delay={0.1}>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{t('privacy.section2.title')}</h2>
                    <p>{t('privacy.section2.content')}</p>
                </div>
            </FadeIn>
            <FadeIn delay={0.15}>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{t('privacy.section3.title')}</h2>
                    <p>{t('privacy.section3.content')}</p>
                </div>
            </FadeIn>
        </section>
    </main>
);
}
const IstifadeSertleri = () => {
    const { t } = useLanguage();
    return (
    <main className="pt-40 pb-24 bg-white dark:bg-[#050505]">
        <section className="px-6 max-w-4xl mx-auto mb-12">
            <FadeIn>
                <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-gray-900 dark:text-gray-50">{t('terms.title')}</h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {t('terms.desc')}
                </p>
            </FadeIn>
        </section>
        <section className="px-6 max-w-4xl mx-auto space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
            <FadeIn delay={0.05}>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{t('terms.section1.title')}</h2>
                    <p>{t('terms.section1.content')}</p>
                </div>
            </FadeIn>
            <FadeIn delay={0.1}>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{t('terms.section2.title')}</h2>
                    <p>{t('terms.section2.content')}</p>
                </div>
            </FadeIn>
            <FadeIn delay={0.15}>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">{t('terms.section3.title')}</h2>
                    <p>{t('terms.section3.content')}</p>
                </div>
            </FadeIn>
        </section>
    </main>
    );
};
const Programs = ({ onOpenModal }: { onOpenModal: () => void }) => {
    const { t } = useLanguage();
    const { data: programs, loading } = useAsync<EducationProgram[]>(() => getPrograms({ page: 1, limit: 50 }), [], []);

    return (
        <main className="pt-40 pb-24 bg-[#FDFDFD] dark:bg-[#050505] min-h-screen">
            <section className="px-6 max-w-7xl mx-auto mb-20 text-center">
                <FadeIn>
                    <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-gray-900 dark:text-gray-50">{t('programs_page.title')}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        {loading ? t('common.loading') : t('programs_page.desc')}
                    </p>
                </FadeIn>
            </section>

            <section className="px-6 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 gap-8">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] p-8 animate-pulse">
                                    <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-6" />
                                    <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded mb-4" />
                                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded mb-2" />
                                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-4/5 mb-8" />
                                    <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded" />
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                            }}
                            className="grid md:grid-cols-2 gap-8"
                        >
                            {programs.map((prog, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 100 } }
                                    }}
                                    className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] p-8 hover:shadow-xl dark:hover:shadow-none transition-shadow group flex flex-col h-full"
                                >
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mb-6 group-hover:scale-110 transition-transform">
                                        {React.createElement(getProgramIcon(prog), { className: 'w-8 h-8' })}
                                    </div>
                                    <h3 className="text-2xl font-medium mb-3 text-gray-900 dark:text-gray-50">{prog.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-8 flex-grow">{prog.shortDescription}</p>

                                    <div className="flex items-center gap-6 mb-8 border-t border-gray-50 dark:border-gray-800 pt-6">
                                        <div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t('common.duration')}</div>
                                            <div className="font-medium text-gray-900 dark:text-white">{prog.totalDuration ?? 0} {t('common.months')}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{t('common.hours')}</div>
                                            <div className="font-medium text-gray-900 dark:text-white">{prog.lessonHours ?? 0} {t('common.hrs')}</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Link to={prog.slug ? `/proqramlar/${prog.slug}` : '/proqramlar'} className="flex-1 py-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl font-medium transition-colors flex items-center justify-center text-gray-900 dark:text-white">
                                            {t('common.detail')}
                                        </Link>
                                        <button onClick={onOpenModal} className="flex-1 py-4 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                                            {t('common.applyNow')} <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </main>
    );
};

const ProgramDetail = ({ onOpenModal }: { onOpenModal: () => void }) => {
    const { t } = useLanguage();
    const { slug } = useParams<{ slug: string }>();
    const { data: program, loading } = useAsync<EducationProgram | null>(
        () => (slug ? getProgramBySlug(slug) : Promise.resolve(null)),
        [slug],
        null
    );

    if (loading) {
        return (
            <main className="pt-40 pb-24 px-6 text-center min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100">
                <div className="text-gray-500 dark:text-gray-400">{t('common.loading')}</div>
            </main>
        );
    }

    if (!program) {
        return (
            <main className="pt-40 pb-24 px-6 text-center min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-gray-100">
                <h1 className="text-4xl font-medium mb-4">{t('program_detail.not_found')}</h1>
                <Link to="/proqramlar" className="text-blue-600 dark:text-blue-400 hover:underline">{t('common.backToPrograms')}</Link>
            </main>
        );
    }

    return (
        <main className="pt-[65px] pb-24 bg-white dark:bg-[#050505]">
            {/* Banner */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center px-6">
                <div className="absolute inset-0 z-0">
                    <img src={toImageSrc(program.bannerImage ?? null) ?? IMAGES[0]} alt={program.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto w-full text-white">
                    <FadeIn>
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white/10 dark:bg-white/5 mb-8">
                            {React.createElement(getProgramIcon(program), { className: 'w-10 h-10' })}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 max-w-4xl">{program.title}</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mb-12">{program.shortDescription}</p>

                        <div className="flex flex-wrap items-center gap-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center backdrop-blur-md">
                                    <span className="font-medium">{program.totalDuration ?? 0}</span>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">{t('common.duration')}</div>
                                    <div className="font-medium capitalize">{t('common.months')}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center backdrop-blur-md">
                                    <span className="font-medium">{program.lessonHours ?? 0}</span>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">{t('common.hours')}</div>
                                    <div className="font-medium capitalize">{t('common.hrs')}</div>
                                </div>
                            </div>
                            <button onClick={onOpenModal} className="bg-white dark:bg-gray-100 text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-white transition-colors ml-auto">
                                {t('common.applyNow')}
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-20">
                    {/* About */}
                    <section>
                        <FadeIn>
                            <h2 className="text-3xl font-medium mb-6 text-gray-900 dark:text-gray-50">{t('program_detail.about')}</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{program.longDescription}</p>
                        </FadeIn>
                    </section>

                    {/* Syllabus */}
                    <section>
                        <FadeIn>
                            <h2 className="text-3xl font-medium mb-8 text-gray-900 dark:text-gray-50">{t('program_detail.syllabus')}</h2>
                            <div className="space-y-4">
                                {(program.syllabusModules ?? []).map((module, idx) => (
                                    <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">{module.title}</h3>
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">{module.duration ?? 0} {t('common.hrs')}</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">{module.description}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </section>

                    {/* Tools */}
                    <section>
                        <FadeIn>
                            <h2 className="text-3xl font-medium mb-8 text-gray-900 dark:text-gray-50">{t('program_detail.tools')}</h2>
                            <div className="flex flex-wrap gap-6">
                                {(program.softwareTools ?? []).map((tool, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                                        {typeof tool !== 'string' && tool.logo && <img src={toImageSrc(tool.logo ?? null) ?? ''} alt={tool.name} className="w-8 h-8 object-contain" />}
                                        <span className="font-medium text-gray-900 dark:text-gray-200">{typeof tool === 'string' ? tool : tool.name}</span>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </section>

                    {/* FAQs */}
                    <section>
                        <FadeIn>
                            <h2 className="text-3xl font-medium mb-8 text-gray-900 dark:text-gray-50">{t('program_detail.faqs')}</h2>
                            <div className="space-y-4">
                                {(program.faqs ?? []).map((faq, idx) => (
                                    <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                                        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">{faq.question}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-12">
                    {/* Course Groups */}
                    <section>
                        <FadeIn>
                            <h3 className="text-2xl font-medium mb-6 text-gray-900 dark:text-gray-50">{t('program_detail.groups')}</h3>
                            <div className="space-y-4">
                                {(program.courseGroups ?? []).filter((group) => typeof group !== 'string').map((group, idx) => (
                                    <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-medium text-lg text-gray-900 dark:text-gray-100">{group.name}</h4>
                                            <span className="text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-md uppercase tracking-wider">
                                                {group.status === 'upcoming' ? t('common.upcoming') : group.status}
                                            </span>
                                        </div>
                                        <div className="space-y-3 mb-6 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex justify-between">
                                                <span>{t('program_detail.start_date')}:</span>
                                                <span className="font-medium text-gray-900 dark:text-gray-200">{formatDate(group.startDate)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>{t('program_detail.schedule')}:</span>
                                                <span className="font-medium text-gray-900 dark:text-gray-200">{group.schedule}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>{t('program_detail.capacity')}:</span>
                                                <span className="font-medium text-gray-900 dark:text-gray-200">{group.capacity - group.currentStudentCount} / {group.capacity}</span>
                                            </div>
                                        </div>
                                        <button onClick={onOpenModal} className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                                            {t('program_detail.join_group')}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </section>

                    {/* Teachers */}
                    <section>
                        <FadeIn>
                            <h3 className="text-2xl font-medium mb-6 text-gray-900 dark:text-gray-50">{t('program_detail.teachers')}</h3>
                            <div className="space-y-6">
                                {(program.teachers ?? []).filter((teacher) => typeof teacher !== 'string').map((teacher, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <img src={toImageSrc(teacher.profilePhoto ?? null) ?? IMAGES[0]} alt={teacher.fullName} className="w-16 h-16 rounded-full object-cover" />
                                        <div>
                                            <h4 className="font-medium text-lg text-gray-900 dark:text-gray-100">{teacher.fullName}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{teacher.professionalTitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </section>
                </div>
            </div>
        </main>
    );
};

const Elaqe = () => {
    const { t } = useLanguage();
    return (
        <main className="pt-40 pb-24 min-h-screen bg-white dark:bg-[#050505]">
            <div className="max-w-4xl mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-gray-900 dark:text-gray-50">{t('contact_page.title')}</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                            {t('contact_page.desc')}
                        </p>
                    </div>
                </FadeIn>
                <div className="grid md:grid-cols-3 gap-8">
                    <FadeIn delay={0.1}>
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl text-center border border-gray-100 dark:border-gray-800 h-full flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('contact_page.email')}</h3>
                            <p className="text-gray-500 dark:text-gray-400">info@stackacademy.az</p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl text-center border border-gray-100 dark:border-gray-800 h-full flex flex-col items-center">
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
                                <Phone className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('contact_page.phone')}</h3>
                            <p className="text-gray-500 dark:text-gray-400">+994 50 123 45 67</p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl text-center border border-gray-100 dark:border-gray-800 h-full flex flex-col items-center">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                                <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{t('contact_page.address')}</h3>
                            <p className="text-gray-500 dark:text-gray-400">Baku, Azerbaijan</p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </main>
    );
};

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <ThemeProvider>
            <LanguageProvider>
                <Router>
                    <ScrollToTop />
                    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#050505] text-gray-900 dark:text-gray-100 font-sans selection:bg-emerald-200 dark:selection:bg-emerald-900">
                        <Navbar onOpenModal={() => setIsModalOpen(true)} />
                        <Routes>
                            <Route path="/" element={<Home onOpenModal={() => setIsModalOpen(true)} />} />
                            <Route path="/roadmap" element={<Roadmap />} />
                            <Route path="/proqramlar" element={<Programs onOpenModal={() => setIsModalOpen(true)} />} />
                            <Route path="/proqramlar/:slug" element={<ProgramDetail onOpenModal={() => setIsModalOpen(true)} />} />
                            <Route path="/telimciler" element={<Telimciler />} />
                            <Route path="/telimciler/:id" element={<TeacherDetail />} />
                            <Route path="/bloq" element={<Bloq />} />
                            <Route path="/bloq/:slug" element={<BlogDetail />} />
                            <Route path="/mezunlar" element={<Mezunlar />} />
                            <Route path="/haqqimizda" element={<Haqqimizda />} />
                            <Route path="/mexfilik-siyaseti" element={<MexfilikSiyaseti />} />
                            <Route path="/istifade-sertleri" element={<IstifadeSertleri />} />
                            <Route path="/elaqe" element={<Elaqe />} />
                        </Routes>
                        <Footer onOpenModal={() => setIsModalOpen(true)} />
                        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                    </div>
                </Router>
            </LanguageProvider>
        </ThemeProvider>
    );
}
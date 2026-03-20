export type Language = 'az' | 'en' | 'ru' | 'tr';

type NestedPaths<T> = T extends object
    ? { [K in keyof T]: `${K & string}${T[K] extends object ? '.' : ''}${NestedPaths<T[K]>}` }[keyof T]
    : '';
export type TranslationKey = NestedPaths<typeof az>;

const az = {
    nav: {
        programs: 'Proqramlar',
        teachers: 'Təlimçilər',
        blog: 'Bloq',
        about: 'Haqqımızda',
        graduates: 'Məzunlar',
        apply: 'Müraciət Et',
        contact: 'Əlaqə',
        roadmap: 'Tədris Planı',
        academy: 'Akademiya',
        teachersDesc: 'Peşəkar müəllim heyəti',
        graduatesDesc: 'Uğur hekayələrimiz',
        blogDesc: 'Faydalı məqalələr',
        roadmapDesc: 'İnteraktiv tədris xəritəsi',
        allPrograms: 'Bütün proqramlara bax'
    },
    roadmapPage: {
        ui: {
            title: 'Stack Academy',
            subtitle: 'İnteraktiv 3D Tədris Xəritələri',
            instruction1: 'Mouse kilidləmək üçün klikləyin. Hərəkət: WASD. Baxmaq: Mouse.',
            instruction2: 'Binaya baxaraq \'Space\' basıb yuxarı dırmaşın.',
            instruction3: 'Binanın üstündəykən \'F\' basıb mərhələni kiliddən çıxarın.',
            instruction4: 'Xəritə görünüşü üçün \'M\' basın.',
            pressToCapture: '\'F\' BASIB KİLİDDƏN ÇIXAR',
            startLearning: 'Tədrisə Başla'
        },
        programs: {
            programming: {
                name: 'Proqramlaşdırma',
                m1: { title: 'IT Əsasları', subtitle: 'Kompüter Elmləri Əsasları', desc: 'Kompüterlərin işləmə prinsipləri, yaddaş, CPU və alqoritmlər.' },
                m2: { title: 'Frontend', subtitle: 'HTML, CSS, React', desc: 'İstifadəçi interfeysləri və interaktiv veb tətbiqlərinin yaradılması.' },
                m3: { title: 'Backend', subtitle: 'Node.js, Express', desc: 'Server tərəfi məntiqi, API-lər və məlumatların idarə edilməsi.' },
                m4: { title: 'Verilənlər Bazası', subtitle: 'SQL, MongoDB', desc: 'Tətbiq məlumatlarının saxlanılması, çıxarılması və səmərəli idarə edilməsi.' },
                m5: { title: 'DevOps', subtitle: 'Docker, AWS', desc: 'Tətbiqlərin bulud sistemlərində yerləşdirilməsi və miqyaslanması.' }
            },
            cybersecurity: {
                name: 'Kibertəhlükəsizlik',
                m1: { title: 'Şəbəkələr', subtitle: 'TCP/IP, DNS', desc: 'Məlumatların şəbəkələrdə və internetdə necə səyahət etdiyini anlayın.' },
                m2: { title: 'Linux Əsasları', subtitle: 'Komanda Sətri', desc: 'Komanda sətiri və əməliyyat sistemi əsaslarını mənimsəyin.' },
                m3: { title: 'Etik Hakinq', subtitle: 'Sızma Testləri', desc: 'Boşluqları tapmaq və təhlükəsiz şəkildə istismar etmək.' },
                m4: { title: 'Kriptoqrafiya', subtitle: 'Şifrələmə', desc: 'Müasir şifrələmə və heşinq üsulları ilə məlumatları qorumaq.' },
                m5: { title: 'Təhlükəsizlik Əməliyyatları', subtitle: 'İzləmə və Cavab', desc: 'Təhlükəsizlik insidentlərini aşkar etmək, təhlil etmək və onlara cavab vermək.' }
            },
            uxui: {
                name: 'UX/UI Dizayn',
                m1: { title: 'Dizayn Prinsipləri', subtitle: 'Rəng, Tipoqrafiya', desc: 'Vizual dizayn və estetikanın əsas prinsiplərini mənimsəyin.' },
                m2: { title: 'İstifadəçi Tədqiqatı', subtitle: 'Personalar, Səyahətlər', desc: 'Müsahibələr və tədqiqatlar vasitəsilə istifadəçi ehtiyaclarını anlayın.' },
                m3: { title: 'Wireframing', subtitle: 'Aşağı dəqiqlikli', desc: 'İstifadəçi interfeysləri üçün struktur planları yaradın.' },
                m4: { title: 'Prototyping', subtitle: 'Figma, Yüksək dəqiqlikli', desc: 'Dizaynlarınızın interaktiv, yüksək dəqiqlikli maketlərini qurun.' },
                m5: { title: 'Dizayn Sistemləri', subtitle: 'Komponentlər, Variantlar', desc: 'Ardıl dizayn üçün təkrar istifadə edilə bilən komponent kitabxanaları yaradın.' }
            },
            digitalmarketing: {
                name: 'Rəqəmsal Marketinq',
                m1: { title: 'Marketinq Əsasları', subtitle: 'Strategiya və Qıf', desc: 'Əsas marketinq prinsiplərini, psixologiyanı və müştəri səyahətlərini anlayın.' },
                m2: { title: 'Məzmun və Sosial', subtitle: 'İcma Büyüməsi', desc: 'Cəlbedici məzmun yaradın və sosial platformalarda icmaları inkişaf etdirin.' },
                m3: { title: 'SEO Ustalığı', subtitle: 'Axtarış Motoru Opt.', desc: 'Vebsaytları Google-da orqanik olaraq yuxarı sıralamaq üçün optimallaşdırın.' },
                m4: { title: 'Performans Reklamları', subtitle: 'Google / Meta', desc: 'Məlumata əsaslanan ROI ilə gəlirli ödənişli reklam kampaniyaları həyata keçirin.' },
                m5: { title: 'Data Analitikası', subtitle: 'İzləmə və CRO', desc: 'İstifadəçi davranışını təhlil edin, dönüşümləri izləyin və qıfı optimallaşdırın.' }
            },
            dataanalytics: {
                name: 'Data Analitika',
                m1: { title: 'Excel və Əsaslar', subtitle: 'Məlumatların formatlanması', desc: 'Excel ilə əsas məlumatları təşkil etməyi, formatlamağı və təhlil etməyi öyrənin.' },
                m2: { title: 'SQL və VB', subtitle: 'Məlumatların Çıxarılması', desc: 'SQL istifadə edərək əlaqəli məlumat bazalarından məlumatları çıxarın və manipulyasiya edin.' },
                m3: { title: 'Data üçün Python', subtitle: 'Pandas, NumPy', desc: 'Böyük verilənlər toplusunu təmizləmək, təhlil etmək və manipulyasiya etmək üçün Python-dan istifadə edin.' },
                m4: { title: 'Data Vizuallaşdırılması', subtitle: 'Tableau, PowerBI', desc: 'Maraqlı tərəflər üçün interaktiv panellər və vizual hesabatlar yaradın.' },
                m5: { title: 'Maşın Öyrənməsi', subtitle: 'Proqnozlaşdırıcı Modelləşdirmə', desc: 'Trendləri və davranışları proqnozlaşdırmaq üçün əsas maşın öyrənmə alqoritmlərini tətbiq edin.' }
            }
        }
    },
    common: {
        loading: 'Yüklənir...',
        applyNow: 'İndi Müraciət Et',
        explore: 'Proqramları Kəşf Et',
        detail: 'Ətraflı',
        duration: 'Müddət',
        hours: 'Dərs Saatı',
        backToPrograms: 'Proqramlara qayıt',
        backToBlog: 'Bloqa qayıt',
        months: 'ay',
        hrs: 'saat',
        upcoming: 'Yaxında',
        pano: 'Pano',
        moreInfo: 'Daha Ətraflı'
    },
    home: {
        banners: 'PANOLAR',
        bannersDesc: 'Stack Academy-də təqdim olunan tədris istiqamətlərini və imkanları kəşf edin.',
        programs: 'Öyrənəcəyiniz Proqramlar',
        programsDesc: 'Real layihələr üzərində işləyərək texnologiya və dizayn sahəsində istifadə olunan peşəkar alətləri mənimsəyin.',
        statement: 'Texnologiya sahəsində karyera qurmaq istəyən hər kəs üçün Stack Academy müasir tədris proqramları, real layihələr və təcrübəli müəllimlərlə inkişaf imkanı yaradır.'
    },
    hero: {
        badge: 'Stack Academy-yə Xoş Gəlmisiniz',
        title1: 'Gələcəyin IT Bacarıqları',
        title2: 'Buradan Başlayır.',
        desc: 'İnnovativ tədris metodları, real layihələr və sənayenin qabaqcıl mütəxəssisləri ilə xəyalındakı karyeranı qurmaq üçün bizə qoşulun.',
        stats: {
            graduates: 'Məzun',
            companies: 'Partnyor Şirkət',
            rating: 'Tələbə Məmnuniyyəti'
        }
    },
    showcase: {
        title: 'Populyar Proqramlar',
        desc: 'Gələcəyin ən çox tələb olunan peşələrini kəşf edin.'
    },
    features: {
        badge: 'Niyə Stack Academy?',
        title: 'Öyrənmək Üçün Ən Yaxşı Mühit',
        desc: 'Təcrübəli instruktorlar və real layihələr sayəsində qısa zamanda mütəxəssis ola bilərsiniz.',
        items: {
            practical: {
               title: 'Praktik Tədris',
               desc: 'Nəzəriyyə deyil, real layihələr üzərində işləyərək öyrənəcəksiniz.'
            },
            mentors: {
               title: 'Təcrübəli Mentorlar',
               desc: 'Sənayenin qabaqcıl mütəxəssislərindən sənətin sirlərini və best practice-ləri öyrənin.'
            },
            career: {
               title: 'Karyera Dəstəyi',
               desc: 'Məzun olduqdan sonra CV hazırlığı və intervyu simulyasiyaları ilə dəstəklənəcəksiniz.'
            }
        }
    },
    stats_marquee: {
        badge: 'Partnyorlar',
        text: 'Tələbələrimiz artıq bu şirkətlərdə çalışır'
    },
    graduates: {
        title: 'Son Məzunlar',
        desc: 'Stack Academy-ni uğurla bitirib karyeralarında yüksələn tələbələrimiz.',
        job: 'İş Yeri',
        more: 'Bütün Məzunlara Baxın',
        student_of: 'məzunu'
    },
    about: {
        title: 'Haqqımızda',
        subtitle1: 'Gələcəyi Bizimlə',
        subtitle2: 'Qurun',
        desc: 'Stack Academy olaraq məqsədimiz, texnologiya sahəsində ən son bilik və bacarıqları tədris edərək, tələbələrimizi qlobal bazara hazırlamaqdır.',
        mission_title: 'Bizim Missiyamız',
        mission_desc: 'İnnovativ tədris metodları və real layihələr vasitəsilə tələbələrimizin potensialını tam üzə çıxarmaq. Biz inanırıq ki, düzgün təhsil və praktika ilə hər kəs texnologiya dünyasında uğur qazana bilər.',
        check1: 'Praktik Tədris',
        check2: 'Peşəkar Təlimçilər',
        check3: 'Karyera Dəstəyi',
    },
    story: {
        title: 'Sizin Uğur Hekayəniz Buradan Başlayır',
        desc: 'Minlərlə gənc bizim köməyimizlə öz xəyalındakı karyeranı qurub. İndi növbə sizindir.',
        start_now: 'İndi Başla'
    },
    programs_page: {
        title: 'Tədris Proqramları',
        desc: 'Gələcəyin ən çox tələb olunan peşələrini Stack Academy ilə kəşf edin. Real layihələr və peşəkar təlimçilərlə karyeranıza bu gün başlayın.'
    },
    program_detail: {
        not_found: 'Proqram tapılmadı',
        about: 'Proqram haqqında',
        syllabus: 'Tədris Planı',
        tools: 'Öyrənəcəyiniz Alətlər',
        faqs: 'Tez-tez Verilən Suallar',
        groups: 'Açıq Qruplar',
        teachers: 'Təlimçilər',
        join_group: 'Bu qrupa qoşul',
        start_date: 'Başlama tarixi',
        schedule: 'Cədvəl',
        capacity: 'Boş yer'
    },
    blog_page: {
        title: 'Bloq və Məqalələr',
        desc: 'Texnologiya, proqramlaşdırma və karyera barədə ən son yeniliklər və faydalı məqalələr.',
        not_found: 'Məqalə tapılmadı',
        read_time: 'dəq oxuma',
        article: {
            p1: 'Texnologiya dünyasında baş verən yeniliklər hər gün daha da sürətlənir. Bu dəyişikliklərə ayaq uydurmaq üçün davamlı öyrənmək və inkişaf etmək vacibdir. Stack Academy olaraq biz tələbələrimizə ən son texnologiyaları və trendləri öyrədirik.',
            title: 'Niyə bu mövzu önəmlidir?',
            p2: 'Müasir dövrdə rəqəmsal bacarıqlara sahib olmaq təkcə IT sektorunda deyil, bütün sahələrdə üstünlük təşkil edir. Şirkətlər artıq ənənəvi metodlardan uzaqlaşaraq rəqəmsal transformasiyaya üstünlük verirlər.',
            li1: 'Daha yüksək əmək haqqı potensialı',
            li2: 'Qlobal iş imkanları',
            li3: 'Davamlı inkişaf və öyrənmə mühiti',
            li4: 'Gələcəyin peşələrinə hazırlıq',
            p3: 'Əgər siz də bu sahədə özünüzü inkişaf etdirmək istəyirsinizsə, bizim proqramlarımıza qoşula və peşəkar təlimçilərdən dərs ala bilərsiniz.'
        }
    },
    teacher_page: {
        title: 'Peşəkar Təlimçilərimiz',
        desc: 'Sənayenin ən qabaqcıl mütəxəssislərindən öyrənin. Real təcrübə, real nəticələr.',
        not_found: 'Təlimçi tapılmadı',
        company: 'Şirkət:',
        experience: 'Təcrübə:',
        expertise: 'İxtisaslaşma sahələri',
        socials: 'Sosial keçidlər',
        year: 'il'
    },
    privacy: {
        title: 'Məxfilik Siyasəti',
        desc: 'Bu səhifə Stack Academy platformasında şəxsi məlumatlarınızın necə toplandığını, saxlanıldığını və qorunduğunu izah edir.',
        section1: { title: 'Topladığımız məlumatlar', content: 'Müraciət formaları, əlaqə formaları və qeydiyyat prosesində ad, e‑poçt ünvanı, telefon nömrəsi və seçdiyiniz proqram haqqında məlumatları toplayırıq.' },
        section2: { title: 'Məlumatların istifadə məqsədi', content: 'Toplanan məlumatlar yalnız tədris proqramları barədə sizinlə əlaqə saxlamaq, müraciətlərinizi emal etmək və xidmətlərimizi yaxşılaşdırmaq üçün istifadə olunur.' },
        section3: { title: 'Məlumatların qorunması', content: 'Məlumatlar təhlükəsiz serverlərdə saxlanılır və üçüncü tərəflərlə yalnız hüquqi tələblər və ya xidmət göstərilməsi üçün zəruri olduqda paylaşılır.' }
    },
    terms: {
        title: 'İstifadə Şərtləri',
        desc: 'Bu səhifə Stack Academy veb saytından və xidmətlərindən istifadə qaydalarını müəyyən edir.',
        section1: { title: 'Ümumi şərtlər', content: 'Saytdan istifadə etməklə təqdim olunan məlumatların tədris məqsədli olduğunu və xəbərdarlıq edilmədən dəyişdirilə biləcəyini qəbul edirsiniz.' },
        section2: { title: 'Məzmun və müəllif hüquqları', content: 'Saytdakı məzmun, dizayn və vizual materiallar Stack Academy və tərəfdaşlarına məxsusdur və icazə olmadan köçürülə və ya yayıla bilməz.' },
        section3: { title: 'Məsuliyyətin məhdudlaşdırılması', content: 'Stack Academy hər zaman dəqiq və aktual məlumat təqdim etməyə çalışsa da, texniki və ya məzmun xətalarına görə birbaşa və ya dolayı zərərlərə görə məsuliyyət daşımır.' }
    },
    footer: {
        desc: 'Texnologiya sahəsində xəyalınızdakı karyeranı bizimlə qurun. İnnovativ təhsil, real təcrübə.',
        links: 'Keçidlər',
        contact: 'Əlaqə',
        privacy: 'Məxfilik Siyasəti',
        terms: 'İstifadə Şərtləri',
        rights: 'Bütün hüquqlar qorunur.',
        companiesTitle: 'Karyera yolumuzun uzandığı şirkətlər',
        startCareer: 'Təhsilini Bizimlə <br /> Davam Et',
        newSkills: 'Yeni Bacarıqlara Yiyələn',
        newsletter: 'Bülletenə Abunə Olun',
        newsletterDesc: 'Ən son xəbərlər və endirimlərdən xəbərdar olmaq üçün e-poçt ünvanınızı qeyd edin.',
        emailPlaceholder: 'E-poçt ünvanınız',
        subscribe: 'Abunə ol'
    },
    contact: {
        title: 'Müraciət Formu',
        desc: 'Karyeranızdakı ilk addımı atmaq üçün formu doldurun. Komandamız ən qısa zamanda sizinlə əlaqə saxlayacaq.',
        name: 'Ad və Soyad',
        phone: 'Telefon nömrəsi',
        program: 'Proqram seçin',
        submit: 'Göndər',
        close: 'Bağla',
        submitting: 'Göndərilir...'
    },
    contact_page: {
        title: 'Bizimlə Əlaqə',
        desc: 'Sualınız var? Bizə yazın və tez bir zamanda sizə geri dönək.',
        address: 'Ünvan',
        phone: 'Telefon',
        email: 'E-poçt'
    }
};

const en: typeof az = {
    nav: {
        programs: 'Programs',
        teachers: 'Instructors',
        blog: 'Blog',
        about: 'About',
        graduates: 'Alumni',
        apply: 'Apply Now',
        contact: 'Contact',
        roadmap: 'Roadmap',
        academy: 'Academy',
        teachersDesc: 'Professional teaching staff',
        graduatesDesc: 'Our success stories',
        blogDesc: 'Useful articles',
        roadmapDesc: 'Interactive learning map',
        allPrograms: 'View all programs'
    },
    roadmapPage: {
        ui: {
            title: 'Stack Academy',
            subtitle: 'Interactive 3D Roadmaps',
            instruction1: 'Click to lock mouse. WASD to move. Mouse to look.',
            instruction2: 'Look at a building and hold \'Space\' to climb.',
            instruction3: 'Press \'F\' on top of a milestone to capture it.',
            instruction4: 'Press \'M\' for Map View.',
            pressToCapture: 'PRESS \'F\' TO CAPTURE',
            startLearning: 'Start Learning'
        },
        programs: {
            programming: {
                name: 'Programming',
                m1: { title: 'IT Basics', subtitle: 'Computer Science Fundamentals', desc: 'Learn how computers work, memory, CPU, and basic algorithms.' },
                m2: { title: 'Frontend', subtitle: 'HTML, CSS, React', desc: 'Build user interfaces and interactive web applications.' },
                m3: { title: 'Backend', subtitle: 'Node.js, Express', desc: 'Create server-side logic, APIs, and handle data.' },
                m4: { title: 'Databases', subtitle: 'SQL, MongoDB', desc: 'Store, retrieve, and manage application data efficiently.' },
                m5: { title: 'DevOps', subtitle: 'Docker, AWS', desc: 'Deploy, scale, and maintain applications in the cloud.' }
            },
            cybersecurity: {
                name: 'Cybersecurity',
                m1: { title: 'Networking', subtitle: 'TCP/IP, DNS', desc: 'Understand how data travels across networks and the internet.' },
                m2: { title: 'Linux Basics', subtitle: 'Command Line', desc: 'Master the command line and operating system fundamentals.' },
                m3: { title: 'Ethical Hacking', subtitle: 'Penetration Testing', desc: 'Learn to find and exploit vulnerabilities safely.' },
                m4: { title: 'Cryptography', subtitle: 'Encryption', desc: 'Secure data using modern encryption and hashing techniques.' },
                m5: { title: 'Security Ops', subtitle: 'Monitoring & Response', desc: 'Detect, analyze, and respond to security incidents.' }
            },
            uxui: {
                name: 'UX/UI Design',
                m1: { title: 'Design Principles', subtitle: 'Color, Typography', desc: 'Master the core principles of visual design and aesthetics.' },
                m2: { title: 'User Research', subtitle: 'Personas, Journeys', desc: 'Understand user needs through interviews and research.' },
                m3: { title: 'Wireframing', subtitle: 'Low-fidelity', desc: 'Create structural blueprints for user interfaces.' },
                m4: { title: 'Prototyping', subtitle: 'Figma, High-fidelity', desc: 'Build interactive, high-fidelity mockups of your designs.' },
                m5: { title: 'Design Systems', subtitle: 'Components, Variants', desc: 'Create reusable component libraries for consistent design.' }
            },
            digitalmarketing: {
                name: 'Digital Marketing',
                m1: { title: 'Marketing Basics', subtitle: 'Strategy & Funnel', desc: 'Understand core marketing principles, psychology, and customer journeys.' },
                m2: { title: 'Content & Social', subtitle: 'Community Growth', desc: 'Create engaging content and grow engaged communities on social platforms.' },
                m3: { title: 'SEO Mastery', subtitle: 'Search Engine Opt.', desc: 'Optimize websites to rank organically on Google.' },
                m4: { title: 'Performance Ads', subtitle: 'Google / Meta', desc: 'Run highly profitable paid advertising campaigns with data-driven ROI.' },
                m5: { title: 'Data Analytics', subtitle: 'Tracking & CRO', desc: 'Analyze user behavior, track conversions, and optimize the funnel.' }
            },
            dataanalytics: {
                name: 'Data Analytics',
                m1: { title: 'Excel & Basics', subtitle: 'Data formatting', desc: 'Learn to organize, format and analyze basic data with Excel.' },
                m2: { title: 'SQL & Databases', subtitle: 'Data Extraction', desc: 'Extract and manipulate data from relational databases using SQL.' },
                m3: { title: 'Python for Data', subtitle: 'Pandas, NumPy', desc: 'Use Python to scientifically clean, analyze and manipulate large datasets.' },
                m4: { title: 'Data Visualization', subtitle: 'Tableau, PowerBI', desc: 'Create interactive dashboards and visual reports for stakeholders.' },
                m5: { title: 'Machine Learning', subtitle: 'Predictive Modeling', desc: 'Apply basic machine learning algorithms to predict trends and behaviors.' }
            }
        }
    },
    common: {
        loading: 'Loading...',
        applyNow: 'Apply Now',
        explore: 'Explore Programs',
        detail: 'Details',
        duration: 'Duration',
        hours: 'Hours',
        backToPrograms: 'Back to Programs',
        backToBlog: 'Back to Blog',
        months: 'months',
        hrs: 'hrs',
        upcoming: 'Upcoming',
        pano: 'Banner',
        moreInfo: 'More Info'
    },
    home: {
        banners: 'BANNERS',
        bannersDesc: 'Discover the educational directions and opportunities offered at Stack Academy.',
        programs: 'Programs You Will Learn',
        programsDesc: 'Master professional tools used in technology and design by working on real projects.',
        statement: 'Stack Academy creates development opportunities with modern teaching programs, real projects, and experienced instructors for everyone who wants to build a career in technology.'
    },
    hero: {
        badge: 'Welcome to Stack Academy',
        title1: 'Future IT Skills',
        title2: 'Start Here',
        desc: 'Join us to build your dream career with innovative teaching methods, real projects, and industry professionals.',
        stats: {
            graduates: 'Alumni',
            companies: 'Partner Companies',
            rating: 'Student Satisfaction'
        }
    },
    showcase: {
        title: 'Popular Programs',
        desc: 'Discover the most demanded professions of the future.'
    },
    features: {
        badge: 'Why Stack Academy?',
        title: 'Best Environment for Learning',
        desc: 'Become an expert in a short time thanks to experienced instructors and real projects.',
        items: {
            practical: {
               title: 'Practical Education',
               desc: 'Learn by doing real-world projects, not just theory.'
            },
            mentors: {
               title: 'Experienced Mentors',
               desc: 'Learn industry secrets and best practices from leading professionals.'
            },
            career: {
               title: 'Career Support',
               desc: 'We support you with CV preparation and mock interviews after graduation.'
            }
        }
    },
    stats_marquee: {
        badge: 'Partners',
        text: 'Our students already work in these companies'
    },
    graduates: {
        title: 'Recent Alumni',
        desc: 'We are proud of our students who successfully graduated from Stack Academy and advanced their careers.',
        job: 'Workplace',
        more: 'View All Alumni',
        student_of: 'graduate'
    },
    about: {
        title: 'About Us',
        subtitle1: 'Build the Future',
        subtitle2: 'With Us',
        desc: 'At Stack Academy, our goal is to prepare our students for the global market by teaching the latest knowledge and skills in technology.',
        mission_title: 'Our Mission',
        mission_desc: 'To unleash the full potential of our students through innovative teaching methods and real projects. We believe anyone can succeed in the tech world with the right education and practice.',
        check1: 'Practical Education',
        check2: 'Professional Instructors',
        check3: 'Career Support',
    },
    story: {
        title: 'Your Success Story Starts Here',
        desc: 'Thousands of young people have built their dream careers with our help. Now it is your turn.',
        start_now: 'Start Now'
    },
    programs_page: {
        title: 'Education Programs',
        desc: 'Discover the most demanded professions of the future with Stack Academy. Start your career today with real projects and professional instructors.'
    },
    program_detail: {
        not_found: 'Program not found',
        about: 'About Program',
        syllabus: 'Curriculum',
        tools: 'Tools You Will Learn',
        faqs: 'Frequently Asked Questions',
        groups: 'Open Groups',
        teachers: 'Instructors',
        join_group: 'Join this group',
        start_date: 'Start date',
        schedule: 'Schedule',
        capacity: 'Available seats'
    },
    blog_page: {
        title: 'Blog & Articles',
        desc: 'Latest news and useful articles about technology, programming, and career.',
        not_found: 'Article not found',
        read_time: 'min read',
        article: {
            p1: 'Innovations in the world of technology are accelerating every day. To keep up with these changes, continuous learning and development is essential. At Stack Academy, we teach our students the latest technologies and trends.',
            title: 'Why is this topic important?',
            p2: 'Having digital skills in the modern era is an advantage not only in the IT sector, but in all fields. Companies are already moving away from traditional methods and preferring digital transformation.',
            li1: 'Higher salary potential',
            li2: 'Global job opportunities',
            li3: 'Continuous development and learning environment',
            li4: 'Preparation for future professions',
            p3: 'If you want to develop yourself in this field, you can join our programs and take lessons from professional instructors.'
        }
    },
    teacher_page: {
        title: 'Our Professional Instructors',
        desc: 'Learn from industry leading experts. Real experience, real results.',
        not_found: 'Instructor not found',
        company: 'Company:',
        experience: 'Experience:',
        expertise: 'Areas of Expertise',
        socials: 'Social Links',
        year: 'years'
    },
    privacy: {
        title: 'Privacy Policy',
        desc: 'This page explains how your personal information is collected, stored and protected on the Stack Academy platform.',
        section1: { title: 'Information we collect', content: 'We collect information about your name, e-mail address, phone number and selected program during application forms, contact forms and registration process.' },
        section2: { title: 'Purpose of using information', content: 'Collected information is used only to contact you about educational programs, to process your applications and to improve our services.' },
        section3: { title: 'Information protection', content: 'The data is kept on secure servers and shared with third parties only when necessary for legal requirements or the provision of services.' }
    },
    terms: {
        title: 'Terms of Use',
        desc: 'This page defines the rules for using the Stack Academy website and services.',
        section1: { title: 'General terms', content: 'By using the site, you acknowledge that the information provided is for educational purposes and may be changed without notice.' },
        section2: { title: 'Content and copyrights', content: 'The content, design and visual materials on the site belong to Stack Academy and its partners and cannot be copied or distributed without permission.' },
        section3: { title: 'Limitation of liability', content: 'Although Stack Academy always strives to provide accurate and up-to-date information, it is not responsible for direct or indirect damages due to technical or content errors.' }
    },
    footer: {
        desc: 'Build your dream IT career with us. Innovative education, real experience.',
        links: 'Links',
        contact: 'Contact',
        privacy: 'Privacy Policy',
        terms: 'Terms of Use',
        rights: 'All rights reserved.',
        companiesTitle: 'Companies our career path reaches',
        startCareer: 'Continue Your Education <br /> With Us',
        newSkills: 'Acquire New Skills',
        newsletter: 'Subscribe to Newsletter',
        newsletterDesc: 'Enter your e-mail address to be informed about the latest news and discounts.',
        emailPlaceholder: 'Your e-mail address',
        subscribe: 'Subscribe'
    },
    contact: {
        title: 'Application Form',
        desc: 'Fill out the form to take the first step in your career. Our team will contact you as soon as possible.',
        name: 'Full Name',
        phone: 'Phone Number',
        program: 'Select Program',
        submit: 'Submit',
        close: 'Close',
        submitting: 'Submitting...'
    },
    contact_page: {
        title: 'Contact Us',
        desc: 'Do you have a question? Write to us and we will get back to you as soon as possible.',
        address: 'Address',
        phone: 'Phone',
        email: 'Email'
    }
};

const ru: typeof az = {
    nav: {
        programs: 'Программы',
        teachers: 'Инструкторы',
        blog: 'Блог',
        about: 'О нас',
        graduates: 'Выпускники',
        apply: 'Подать заявку',
        contact: 'Контакты',
        roadmap: 'Учебный план',
        academy: 'Академия',
        teachersDesc: 'Профессиональный преподавательский состав',
        graduatesDesc: 'Наши истории успеха',
        blogDesc: 'Полезные статьи',
        roadmapDesc: 'Интерактивная карта обучения',
        allPrograms: 'Посмотреть все программы'
    },
    roadmapPage: {
        ui: {
            title: 'Stack Academy',
            subtitle: 'Интерактивные 3D-дорожные карты',
            instruction1: 'Клик чтобы зафиксировать мышь. Перемещение: WASD. Обзор: Мышь.',
            instruction2: 'Посмотри на здание и зажми \'Space\' чтобы залезть.',
            instruction3: 'Нажми \'F\' на вершине здания чтобы разблокировать.',
            instruction4: 'Нажми \'M\' для просмотра карты.',
            pressToCapture: 'НАЖМИ \'F\' ЧТОБЫ РАЗБЛОКИРОВАТЬ',
            startLearning: 'Начать обучение'
        },
        programs: {
            programming: {
                name: 'Программирование',
                m1: { title: 'Основы IT', subtitle: 'Основы компьютерных наук', desc: 'Узнайте как работают компьютеры, память, CPU и алгоритмы.' },
                m2: { title: 'Frontend', subtitle: 'HTML, CSS, React', desc: 'Создание пользовательских интерфейсов и веб-приложений.' },
                m3: { title: 'Backend', subtitle: 'Node.js, Express', desc: 'Создание серверной логики, API и работа с данными.' },
                m4: { title: 'Базы данных', subtitle: 'SQL, MongoDB', desc: 'Хранение, извлечение и эффективное управление данными.' },
                m5: { title: 'DevOps', subtitle: 'Docker, AWS', desc: 'Развертывание, масштабирование и поддержка приложений в облаке.' }
            },
            cybersecurity: {
                name: 'Кибербезопасность',
                m1: { title: 'Сети', subtitle: 'TCP/IP, DNS', desc: 'Поймите как данные передаются по сетям и интернету.' },
                m2: { title: 'Основы Linux', subtitle: 'Командная строка', desc: 'Освойте командную строку и основы ОС.' },
                m3: { title: 'Этичный хакинг', subtitle: 'Тестирование на проникновение', desc: 'Учитесь находить и безопасно эксплуатировать уязвимости.' },
                m4: { title: 'Криптография', subtitle: 'Шифрование', desc: 'Защита данных с использованием шифрования и хеширования.' },
                m5: { title: 'Операции безопасности', subtitle: 'Мониторинг и реагирование', desc: 'Обнаружение, анализ и реагирование на инциденты безопасности.' }
            },
            uxui: {
                name: 'UX/UI Дизайн',
                m1: { title: 'Принципы дизайна', subtitle: 'Цвет, Типографика', desc: 'Освойте ключевые принципы визуального дизайна.' },
                m2: { title: 'Исследование пользователей', subtitle: 'Персонажи, Пути', desc: 'Поймите потребности пользователей через интервью.' },
                m3: { title: 'Wireframing', subtitle: 'Низкая детализация', desc: 'Создайте структурные планы пользовательских интерфейсов.' },
                m4: { title: 'Прототипирование', subtitle: 'Figma, Высокая детализация', desc: 'Создавайте интерактивные макеты ваших дизайнов.' },
                m5: { title: 'Дизайн-системы', subtitle: 'Компоненты', desc: 'Создавайте библиотеки многократно используемых компонентов.' }
            },
            digitalmarketing: {
                name: 'Цифровой Маркетинг',
                m1: { title: 'Основы маркетинга', subtitle: 'Стратегия и Воронка', desc: 'Поймите основные принципы маркетинга и пути клиентов.' },
                m2: { title: 'Контент и Социальные сети', subtitle: 'Рост сообщества', desc: 'Создавайте контент и развивайте сообщества в соцсетях.' },
                m3: { title: 'SEO Мастерство', subtitle: 'Оптимизация', desc: 'Оптимизируйте сайты для органического ранжирования в Google.' },
                m4: { title: 'Performance Реклама', subtitle: 'Google / Meta', desc: 'Запускайте прибыльные платные рекламные кампании.' },
                m5: { title: 'Аналитика данных', subtitle: 'Отслеживание и CRO', desc: 'Анализируйте поведение пользователей и оптимизируйте конверсию.' }
            },
            dataanalytics: {
                name: 'Аналитика Данных',
                m1: { title: 'Excel и Основы', subtitle: 'Форматирование данных', desc: 'Организуйте и анализируйте базовые данные в Excel.' },
                m2: { title: 'SQL и Базы данных', subtitle: 'Извлечение данных', desc: 'Извлекайте данные из реляционных баз данных с помощью SQL.' },
                m3: { title: 'Python для Данных', subtitle: 'Pandas, NumPy', desc: 'Используйте Python для очистки и анализа больших датасетов.' },
                m4: { title: 'Визуализация', subtitle: 'Tableau, PowerBI', desc: 'Создавайте интерактивные дашборды для стейкхолдеров.' },
                m5: { title: 'Машинное обучение', subtitle: 'Моделирование', desc: 'Применяйте алгоритмы для прогнозирования трендов.' }
            }
        }
    },
    common: {
        loading: 'Загрузка...',
        applyNow: 'Подать заявку',
        explore: 'Наши программы',
        detail: 'Подробнее',
        duration: 'Продолжительность',
        hours: 'Часы занятий',
        backToPrograms: 'Назад к программам',
        backToBlog: 'Назад к блогу',
        months: 'мес',
        hrs: 'ч',
        upcoming: 'Скоро',
        pano: 'Баннер',
        moreInfo: 'Подробнее'
    },
    home: {
        banners: 'БАННЕРЫ',
        bannersDesc: 'Откройте для себя направления обучения и возможности, предлагаемые в Stack Academy.',
        programs: 'Программы, которые вы изучите',
        programsDesc: 'Освойте профессиональные инструменты, используемые в сфере технологий и дизайна, работая над реальными проектами.',
        statement: 'Stack Academy создает возможности для развития с помощью современных учебных программ, реальных проектов и опытных преподавателей для всех, кто хочет построить карьеру в сфере технологий.'
    },
    hero: {
        badge: 'Добро пожаловать в Stack Academy',
        title1: 'Навыки IT будущего',
        title2: 'Начните здесь',
        desc: 'Присоединяйтесь к нам, чтобы построить карьеру своей мечты с помощью инновационных методов обучения, реальных проектов и профессионалов.',
        stats: {
            graduates: 'Выпускников',
            companies: 'Компаний Партнеров',
            rating: 'Удовлетворенность студентов'
        }
    },
    showcase: {
        title: 'Популярные Программы',
        desc: 'Откройте для себя самые востребованные профессии будущего.'
    },
    features: {
        badge: 'Почему Stack Academy?',
        title: 'Лучшая среда для обучения',
        desc: 'Станьте экспертом в кратчайшие сроки благодаря опытным инструкторам и реальным проектам.',
        items: {
            practical: {
               title: 'Практическое обучение',
               desc: 'Вы будете учиться, работая над реальными проектами.'
            },
            mentors: {
               title: 'Опытные наставники',
               desc: 'Учитесь секретам отрасли у ведущих профессионалов.'
            },
            career: {
               title: 'Карьерная Поддержка',
               desc: 'После выпуска мы поддержим вас с составлением резюме и собеседованиями.'
            }
        }
    },
    stats_marquee: {
        badge: 'Партнеры',
        text: 'Наши студенты уже работают в этих компаниях'
    },
    graduates: {
        title: 'Наши выпускники',
        desc: 'Мы гордимся нашими студентами, которые успешно окончили Stack Academy.',
        job: 'Место работы',
        more: 'Посмотреть всех выпускников',
        student_of: 'выпускник'
    },
    about: {
        title: 'О нас',
        subtitle1: 'Строим будущее',
        subtitle2: 'Вместе',
        desc: 'В Stack Academy наша цель — подготовить студентов к мировому рынку, обучая знаниям и навыкам в области технологий.',
        mission_title: 'Наша Миссия',
        mission_desc: 'Раскрыть полный потенциал наших студентов с помощью инновационных методов. Мы верим, что любой может добиться успеха в мире технологий при правильном подходе.',
        check1: 'Практическое обучение',
        check2: 'Профессиональные инструкторы',
        check3: 'Карьерная поддержка',
    },
    story: {
        title: 'Ваша история успеха начинается здесь',
        desc: 'Тысячи молодых людей построили карьеру своей мечты с нашей помощью. Теперь ваша очередь.',
        start_now: 'Начать сейчас'
    },
    programs_page: {
        title: 'Образовательные программы',
        desc: 'Откройте для себя самые востребованные ИТ профессии вместе со Stack Academy.'
    },
    program_detail: {
        not_found: 'Программа не найдена',
        about: 'О программе',
        syllabus: 'Учебный план',
        tools: 'Инструменты',
        faqs: 'Часто задаваемые вопросы',
        groups: 'Открытые группы',
        teachers: 'Инструкторы',
        join_group: 'Присоединиться к группе',
        start_date: 'Дата начала',
        schedule: 'График',
        capacity: 'Свободные места'
    },
    blog_page: {
        title: 'Блог и статьи',
        desc: 'Последние новости и полезные статьи о технологиях, программировании и карьере.',
        not_found: 'Статья не найдена',
        read_time: 'мин. чтения',
        article: {
            p1: 'Инновации в мире технологий ускоряются каждый день. Чтобы идти в ногу с этими изменениями, необходимо постоянное обучение и развитие. В Stack Academy мы обучаем наших студентов новейшим технологиям и тенденциям.',
            title: 'Почему эта тема важна?',
            p2: 'Наличие цифровых навыков в современную эпоху является преимуществом не только в ИТ-секторе, но и во всех областях. Компании уже отходят от традиционных методов и отдают предпочтение цифровой трансформации.',
            li1: 'Высокий потенциал заработной платы',
            li2: 'Глобальные возможности',
            li3: 'Непрерывное развитие и обучение',
            li4: 'Подготовка к профессиям будущего',
            p3: 'Если вы хотите развиваться в этой сфере, вы можете присоединиться к нашим программам и брать уроки у профессиональных инструкторов.'
        }
    },
    teacher_page: {
        title: 'Наши Профессионалы',
        desc: 'Учитесь у ведущих экспертов отрасли. Практический опыт, реальные результаты.',
        not_found: 'Инструктор не найден',
        company: 'Компания:',
        experience: 'Опыт:',
        expertise: 'Области специализации',
        socials: 'Социальные сети',
        year: 'лет'
    },
    privacy: {
        title: 'Политика конфиденциальности',
        desc: 'Эта страница объясняет, как ваша личная информация собирается, хранится и защищается.',
        section1: { title: 'Какую информацию мы собираем', content: 'Мы собираем информацию о вашем имени, электронной почте, номере телефона.' },
        section2: { title: 'Цель использования', content: 'Собранная информация используется только для связи с вами по поводу наших программ.' },
        section3: { title: 'Защита', content: 'Данные хранятся на защищенных серверах.' }
    },
    terms: {
        title: 'Условия использования',
        desc: 'На этой странице определены правила использования веб-сайта и услуг Stack Academy.',
        section1: { title: 'Общие условия', content: 'Представленная информация предназначена для образовательных целей.' },
        section2: { title: 'Контент и авторские права', content: 'Контент, дизайн и визуальные материалы принадлежат Stack Academy.' },
        section3: { title: 'Ограничение ответственности', content: 'Stack Academy не несет ответственности за прямой или косвенный ущерб.' }
    },
    footer: {
        desc: 'Постройте карьеру своей мечты вместе с нами.',
        links: 'Ссылки',
        contact: 'Контакты',
        privacy: 'Политика конфиденциальности',
        terms: 'Условия использования',
        rights: 'Все права защищены.',
        companiesTitle: 'Компании, в которых работают наши выпускники',
        startCareer: 'Продолжите свое образование <br /> с нами',
        newSkills: 'Приобретайте новые навыки',
        newsletter: 'Подписаться на новостную рассылку',
        newsletterDesc: 'Введите свой адрес электронной почты, чтобы оставаться в курсе новостей.',
        emailPlaceholder: 'Ваш e-mail',
        subscribe: 'Подписаться'
    },
    contact: {
        title: 'Форма Заявки',
        desc: 'Заполните форму, и мы свяжемся с вами в кратчайшие сроки.',
        name: 'Имя и Фамилия',
        phone: 'Номер телефона',
        program: 'Выберите программу',
        submit: 'Отправить',
        close: 'Закрыть',
        submitting: 'Отправка...'
    },
    contact_page: {
        title: 'Свяжитесь с нами',
        desc: 'У вас есть вопрос? Напишите нам, и мы свяжемся с вами в ближайшее время.',
        address: 'Адрес',
        phone: 'Телефон',
        email: 'Эл. почта'
    }
};

const tr: typeof az = {
    nav: {
        programs: 'Programlar',
        teachers: 'Eğitmenler',
        blog: 'Blog',
        about: 'Hakkımızda',
        graduates: 'Mezunlar',
        apply: 'Başvur',
        contact: 'İletişim',
        roadmap: 'Eğitim Planı',
        academy: 'Akademi',
        teachersDesc: 'Profesyonel eğitim kadrosu',
        graduatesDesc: 'Başarı hikayelerimiz',
        blogDesc: 'Faydalı makaleler',
        roadmapDesc: 'İnteraktif eğitim haritası',
        allPrograms: 'Tüm programları gör'
    },
    roadmapPage: {
        ui: {
            title: 'Stack Academy',
            subtitle: 'İnteraktif 3D Eğitim Haritaları',
            instruction1: 'Mouse kilitlemek için tıklayın. Hareket: WASD. Bakmak: Mouse.',
            instruction2: 'Binaya bakarak \'Space\' basıp yukarı tırmanın.',
            instruction3: 'Binanın tepesindeyken \'F\' basıp aşamayı açın.',
            instruction4: 'Harita görünümü için \'M\' basın.',
            pressToCapture: '\'F\' BASARAK AŞAMAYI AÇ',
            startLearning: 'Eğitime Başla'
        },
        programs: {
            programming: {
                name: 'Programlama',
                m1: { title: 'IT Temelleri', subtitle: 'Bilgisayar Bilimleri', desc: 'Bilgisayarların çalışma prensipleri, bellek ve algoritmalar.' },
                m2: { title: 'Frontend', subtitle: 'HTML, CSS, React', desc: 'Kullanıcı arayüzleri ve interaktif web uygulamaları geliştirin.' },
                m3: { title: 'Backend', subtitle: 'Node.js, Express', desc: 'Sunucu tarafı mantığı, API\'ler ve veri yönetimi.' },
                m4: { title: 'Veritabanları', subtitle: 'SQL, MongoDB', desc: 'Uygulama verilerini depolayın ve verimli bir şekilde yönetin.' },
                m5: { title: 'DevOps', subtitle: 'Docker, AWS', desc: 'Uygulamaları bulut ortamında yayınlayın ve yönetin.' }
            },
            cybersecurity: {
                name: 'Siber Güvenlik',
                m1: { title: 'Ağlar', subtitle: 'TCP/IP, DNS', desc: 'Verilerin ağlar ve internet üzerinde nasıl seyahat ettiğini anlayın.' },
                m2: { title: 'Linux Temelleri', subtitle: 'Komut Satırı', desc: 'Komut satırını ve işletim sistemi temellerini öğrenin.' },
                m3: { title: 'Etik Hackleme', subtitle: 'Sızma Testleri', desc: 'Açıkları bulmayı ve güvenli bir şekilde değerlendirmeyi öğrenin.' },
                m4: { title: 'Kriptografi', subtitle: 'Şifreleme', desc: 'Modern şifreleme yöntemleriyle verileri koruyun.' },
                m5: { title: 'Güvenlik Ops', subtitle: 'İzleme ve Yanıt', desc: 'Güvenlik olaylarını tespit edin ve yanıt verin.' }
            },
            uxui: {
                name: 'UX/UI Tasarım',
                m1: { title: 'Tasarım Prensipleri', subtitle: 'Renk, Tipografi', desc: 'Görsel tasarımın temel prensiplerini kavrayın.' },
                m2: { title: 'Kullanıcı Araştırması', subtitle: 'Personalar', desc: 'Görüşmeler yoluyla kullanıcı ihtiyaçlarını anlayın.' },
                m3: { title: 'Wireframing', subtitle: 'Düşük Kalite', desc: 'Kullanıcı arayüzleri için yapısal planlar oluşturun.' },
                m4: { title: 'Prototipleme', subtitle: 'Figma, Yüksek Kalite', desc: 'Tasarımlarınızın interaktif maketlerini oluşturun.' },
                m5: { title: 'Tasarım Sistemleri', subtitle: 'Bileşenler', desc: 'Tutarlı tasarım için tekrar kullanılabilir kütüphaneler.' }
            },
            digitalmarketing: {
                name: 'Dijital Pazarlama',
                m1: { title: 'Pazarlama Temelleri', subtitle: 'Strateji ve Huni', desc: 'Pazarlama prensiplerini ve müşteri yolculuklarını anlayın.' },
                m2: { title: 'İçerik ve Sosyal', subtitle: 'Topluluk Büyütme', desc: 'İlgi çekici içerikler oluşturun ve topluluklar kurun.' },
                m3: { title: 'SEO Ustalığı', subtitle: 'Arama Motoru Opt.', desc: 'Web sitelerini Google\'da organik olarak sıralayın.' },
                m4: { title: 'Performans Reklamları', subtitle: 'Google / Meta', desc: 'Veriye dayalı ROI ile karlı reklam kampanyaları yürütün.' },
                m5: { title: 'Veri Analitiği', subtitle: 'İzleme ve CRO', desc: 'Kullanıcı davranışını analiz edin ve huniyi optimize edin.' }
            },
            dataanalytics: {
                name: 'Veri Analitiği',
                m1: { title: 'Excel ve Temeller', subtitle: 'Veri formatlama', desc: 'Excel ile temel verileri analiz etmeyi öğrenin.' },
                m2: { title: 'SQL ve Veritabanları', subtitle: 'Veri Çıkarma', desc: 'İlişkisel veritabanlarından SQL ile verileri çıkarın.' },
                m3: { title: 'Veri için Python', subtitle: 'Pandas, NumPy', desc: 'Büyük veri setlerini temizlemek ve analiz etmek için Python.' },
                m4: { title: 'Veri Görselleştirme', subtitle: 'Tableau, PowerBI', desc: 'Etkileşimli paneller ve görsel raporlar oluşturun.' },
                m5: { title: 'Makine Öğrenimi', subtitle: 'Modelleme', desc: 'Trendleri tahmin etmek için makine öğrenimi algoritmaları.' }
            }
        }
    },
    common: {
        loading: 'Yükleniyor...',
        applyNow: 'Hemen Başvur',
        explore: 'Programları Keşfet',
        detail: 'Detaylı Bilgi',
        duration: 'Süre',
        hours: 'Ders Saati',
        backToPrograms: 'Programlara Dön',
        backToBlog: 'Bloga Dön',
        months: 'ay',
        hrs: 'saat',
        upcoming: 'Yakında',
        pano: 'Pano',
        moreInfo: 'Daha Fazla Bilgi'
    },
    home: {
        banners: 'PANOLAR',
        bannersDesc: 'Stack Academy\'de sunulan eğitim yönlerini ve fırsatları keşfedin.',
        programs: 'Öğreneceğiniz Programlar',
        programsDesc: 'Gerçek projeler üzerinde çalışarak teknoloji ve tasarım alanlarında kullanılan profesyonel araçlarda uzmanlaşın.',
        statement: 'Teknoloji alanında kariyer yapmak isteyen herkes için Stack Academy, modern eğitim programları, gerçek projeler ve deneyimli eğitmenlerle gelişim fırsatları yaratır.'
    },
    hero: {
        badge: 'Stack Academy\'e Hoş Geldiniz',
        title1: 'Geleceğin BT Becerilerine',
        title2: 'Buradan Başlayın.',
        desc: 'Yenilikçi eğitim yöntemleri, gerçek projeler ve deneyimli uzmanlarla hayalindeki kariyeri kurmak için bize katıl.',
        stats: {
            graduates: 'Mezun',
            companies: 'Partner Şirket',
            rating: 'Öğrenci Memnuniyeti'
        }   
    },
    showcase: {
        title: 'Popüler Programlar',
        desc: 'Geleceğin en çok talep gören mesleklerini keşfedin.'
    },
    features: {
        badge: 'Neden Stack Academy?',
        title: 'Öğrenmek İçin En İyi Ortam',
        desc: 'Deneyimli eğitmenler ve gerçek projeler sayesinde kısa sürede uzmanlaşın.',
        items: {
            practical: {
               title: 'Pratik Eğitim',
               desc: 'Sadece teori değil, gerçek projeler üzerinde çalışarak öğreneceksiniz.'
            },
            mentors: {
               title: 'Deneyimli Mentorlar',
               desc: 'Sektörün önde gelen uzmanlarından mesleğin sırlarını öğrenin.'
            },
            career: {
               title: 'Kariyer Desteği',
               desc: 'Mezun olduktan sonra CV hazırlığı ve mülakat simülasyonları ile destekleneceksiniz.'
            }
        }
    },
    stats_marquee: {
        badge: 'Partnerler',
        text: 'Öğrencilerimiz halihazırda bu şirketlerde çalışıyor'
    },
    graduates: {
        title: 'Son Mezunlar',
        desc: 'Stack Academy\'yi başarıyla bitirip kariyerlerinde yükselen öğrencilerimiz.',
        job: 'Çalıştığı Kurum',
        more: 'Tüm Mezunları Gör',
        student_of: 'mezunu'
    },
    about: {
        title: 'Hakkımızda',
        subtitle1: 'Geleceği Bizimle',
        subtitle2: 'İnşa Et',
        desc: 'Stack Academy olarak amacımız, teknoloji alanındaki en son bilgi ve becerileri öğreterek öğrencilerimizi global pazara hazırlamaktır.',
        mission_title: 'Misyonumuz',
        mission_desc: 'Yenilikçi eğitim yöntemleri ve gerçek projeler ile öğrencilerimizin potansiyelini tam olarak ortaya çıkarmak. Doğru eğitim ve pratik ile teknoloji dünyasında herkesin başarılı olabileceğine inanıyoruz.',
        check1: 'Pratik Eğitim',
        check2: 'Profesyonel Eğitmenler',
        check3: 'Kariyer Desteği',
    },
    story: {
        title: 'Başarı Hikayeniz Buradan Başlıyor',
        desc: 'Binlerce genç bizim yardımımızla hayalindeki kariyeri kurdu. Şimdi sıra sende.',
        start_now: 'Şimdi Başla'
    },
    programs_page: {
        title: 'Eğitim Programları',
        desc: 'Geleceğin en çok aranan mesleklerini Stack Academy ile keşfedin. Kariyerinize bugün başlayın.'
    },
    program_detail: {
        not_found: 'Program bulunamadı',
        about: 'Program Hakkında',
        syllabus: 'Müfredat Planı',
        tools: 'Öğreneceğiniz Araçlar',
        faqs: 'Sık Sorulan Sorular',
        groups: 'Açık Gruplar',
        teachers: 'Eğitmenler',
        join_group: 'Bu gruba katıl',
        start_date: 'Başlangıç Tarihi',
        schedule: 'Program',
        capacity: 'Boş Kontenjan'
    },
    blog_page: {
        title: 'Blog ve Makaleler',
        desc: 'Teknoloji, programlama ve kariyer hakkında en son yenilikler ve faydalı makaleler.',
        not_found: 'Makale bulunamadı',
        read_time: 'dk okuma',
        article: {
            p1: 'Teknoloji dünyasında yenilikler her geçen gün hızlanıyor. Bu değişikliklere ayak uydurmak için sürekli öğrenme ve gelişim şarttır. Stack Academy olarak öğrencilerimize en son teknoloji ve trendleri öğretiyoruz.',
            title: 'Bu konu neden önemli?',
            p2: 'Modern çağda dijital becerilere sahip olmak sadece BT sektöründe değil, her alanda bir avantajdır. Şirketler artık geleneksel yöntemlerden uzaklaşıyor ve dijital dönüşümü tercih ediyor.',
            li1: 'Daha yüksek maaş potansiyeli',
            li2: 'Küresel iş fırsatları',
            li3: 'Sürekli gelişim ve öğrenme ortamı',
            li4: 'Geleceğin mesleklerine hazırlık',
            p3: 'Bu alanda kendinizi geliştirmek isterseniz programlarımıza katılabilir, profesyonel eğitmenlerimizden ders alabilirsiniz.'
        }
    },
    teacher_page: {
        title: 'Profesyonel Eğitmenlerimiz',
        desc: 'Sektörün en iyi uzmanlarından öğrenin. Gerçek tecrübe, gerçek sonuçlar.',
        not_found: 'Eğitmen bulunamadı',
        company: 'Şirket:',
        experience: 'Deneyim:',
        expertise: 'Uzmanlık Alanları',
        socials: 'Sosyal Medya',
        year: 'yıl'
    },
    privacy: {
        title: 'Gizlilik Politikası',
        desc: 'Platformumuzda kişisel bilgilerinizin nasıl toplandığını ve korunduğunu açıklar.',
        section1: { title: 'Topladığımız bilgiler', content: 'Başvuru formları aracılığıyla ad, e-posta, telefon ve program seçiminizi topluyoruz.' },
        section2: { title: 'Kullanım Amacı', content: 'Toplanan veriler yalnızca eğitim programlarımız hakkında bilgi vermek için kullanılır.' },
        section3: { title: 'Bilgi Koruma', content: 'Bilgiler güvenli sunucularda saklanır.' }
    },
    terms: {
        title: 'Kullanım Koşulları',
        desc: 'Stack Academy hizmetleri ve web sitesinin kullanım kurallarını belirler.',
        section1: { title: 'Genel Şartlar', content: 'Verilen eğitim amaçlı bilgilerin haber verilmeden değiştirilebileceğini kabul edersiniz.' },
        section2: { title: 'Telif Hakları', content: 'Sitedeki tüm haklar Stack Academy\'e aittir.' },
        section3: { title: 'Sorumluluğun Sınırlandırılması', content: 'Teknik sorunlar nedeniyle oluşabilecek zararlardan sorumlu değiliz.' }
    },
    footer: {
        desc: 'Teknoloji alanındaki kariyerinizi bizimle oluşturun. Gelişmiş eğitim, gerçek deneyim.',
        links: 'Bağlantılar',
        contact: 'İletişim',
        privacy: 'Gizlilik Politikası',
        terms: 'Kullanım Koşulları',
        rights: 'Tüm hakları saklıdır.',
        companiesTitle: 'Mezunlarımızın çalıştığı şirketler',
        startCareer: 'Eğitiminize Bizimle <br /> Devam Edin',
        newSkills: 'Yeni Beceriler Kazanın',
        newsletter: 'Bültene Abone Olun',
        newsletterDesc: 'En son haberler ve indirimlerden haberdar olmak için e-posta adresinizi girin.',
        emailPlaceholder: 'E-posta adresiniz',
        subscribe: 'Abone ol'
    },
    contact: {
        title: 'Başvuru Formu',
        desc: 'Kariyerinizdeki ilk adımı atmak için formu doldurun.',
        name: 'Ad ve Soyad',
        phone: 'Telefon Numarası',
        program: 'Program Seçin',
        submit: 'Gönder',
        close: 'Kapat',
        submitting: 'Gönderiliyor...'
    },
    contact_page: {
        title: 'Bize Ulaşın',
        desc: 'Bir sorunuz mu var? Bize yazın, en kısa sürede size geri dönelim.',
        address: 'Adres',
        phone: 'Telefon',
        email: 'E-posta'
    }
};

export const translations = {
    az,
    en,
    ru,
    tr
};

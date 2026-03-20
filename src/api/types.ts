export type Id = string;

export type EducationProgram = {
  _id: Id;
  title: string;
  slug: string;
  icon?: string | null;
  bannerImage?: string | null;
  shortDescription?: string;
  longDescription?: string;
  totalDuration?: number;
  lessonHours?: number;
  syllabusModules?: Array<{
    title: string;
    description?: string;
    duration?: number;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  teachers?: Array<Teacher | Id>;
  courseGroups?: Array<CourseGroup | Id>;
  softwareTools?: Array<{ _id?: Id; name?: string; logo?: string } | Id>;
};

export type CourseGroup = {
  _id: Id;
  name: string;
  program: Id | EducationProgram;
  startDate?: string;
  endDate?: string;
  schedule?: string;
  capacity?: number;
  currentStudentCount?: number;
  status?: 'upcoming' | 'active' | 'completed' | string;
};

export type Teacher = {
  _id: Id;
  fullName: string;
  profilePhoto?: string | null;
  professionalTitle: string;
  biography?: string;
  expertise?: string[];
  yearsOfExperience?: number;
  companyName?: string | null;
  socialLinks?: {
    linkedin?: string | null;
    github?: string | null;
    portfolio?: string | null;
  };
  featured?: boolean;
};

export type Graduate = {
  _id: Id;
  name: string;
  photo?: string | null;
  companyLogo?: string | null;
  program?: Id | EducationProgram;
  graduationYear?: number;
  jobTitle?: string;
  companyName?: string;
  linkedInProfile?: string | null;
};

export type BlogPost = {
  _id: Id;
  title: string;
  slug: string;
  coverImage?: string | null;
  content: string;
  tags?: string[];
  author: string;
  publishDate?: string;
  readingTime?: number;
  featured?: boolean;
};

export type AdvertisementBanner = {
  _id: Id;
  title: string;
  imageData?: string;
  imageUrl?: string | null;
  redirectUrl?: string;
  altText?: string | null;
  position?: number;
  isActive?: boolean;
};

export type EmployerCompany = {
  _id: Id;
  companyName: string;
  logo: string;
  website?: string | null;
  description?: string | null;
  isActive?: boolean;
  position?: number;
};

export type ApplicationCreate = {
  fullName: string;
  email: string;
  phone: string;
  program: Id;
  group?: Id;
  message: string;
};


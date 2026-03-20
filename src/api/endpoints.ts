import { apiFetch, unwrapList } from './client';
import type { AdvertisementBanner, ApplicationCreate, BlogPost, CourseGroup, EducationProgram, EmployerCompany, Graduate, Teacher } from './types';

export async function getPrograms(params?: { page?: number; limit?: number }) {
  const payload = await apiFetch<unknown>('/programs', { query: params });
  return unwrapList<EducationProgram>(payload);
}

export async function getProgramBySlug(slug: string) {
  const payload = await apiFetch<any>(`/programs/slug/${encodeURIComponent(slug)}`);
  return (payload?.data ?? payload) as EducationProgram;
}

export async function getFeaturedBlogPosts() {
  const payload = await apiFetch<unknown>('/blog/featured');
  return unwrapList<BlogPost>(payload);
}

export async function getAllBlogPosts(params?: { page?: number; limit?: number; search?: string }) {
  const payload = await apiFetch<unknown>('/blog', { query: params });
  return unwrapList<BlogPost>(payload);
}

export async function getBlogPostBySlug(slug: string) {
  const payload = await apiFetch<any>(`/blog/slug/${encodeURIComponent(slug)}`);
  return (payload?.data ?? payload) as BlogPost;
}

export async function getTeachers(params?: { page?: number; limit?: number }) {
  const payload = await apiFetch<unknown>('/teachers', { query: params });
  return unwrapList<Teacher>(payload);
}

export async function getTeacherById(id: string) {
  const payload = await apiFetch<any>(`/teachers/${encodeURIComponent(id)}`);
  return (payload?.data ?? payload) as Teacher;
}

export async function getGraduates(params?: { page?: number; limit?: number }) {
  const payload = await apiFetch<unknown>('/graduates', { query: params });
  return unwrapList<Graduate>(payload);
}

export async function getCourseGroups(params?: { page?: number; limit?: number; program?: string }) {
  const payload = await apiFetch<unknown>('/course-groups', { query: params });
  return unwrapList<CourseGroup>(payload);
}

export async function getActiveBanners() {
  const payload = await apiFetch<unknown>('/banners/active');
  return unwrapList<AdvertisementBanner>(payload);
}

export async function getEmployerCompanies(params?: { page?: number; limit?: number }) {
  const payload = await apiFetch<unknown>('/employer-companies', { query: params });
  return unwrapList<EmployerCompany>(payload);
}

export async function getActiveEmployerCompanies() {
  const payload = await apiFetch<unknown>('/employer-companies/active');
  return unwrapList<EmployerCompany>(payload);
}

export async function createApplication(data: ApplicationCreate) {
  const payload = await apiFetch<any>('/applications', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return payload;
}


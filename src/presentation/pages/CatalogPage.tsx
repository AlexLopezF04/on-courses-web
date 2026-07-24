import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { getCoursesUseCase } from '@infrastructure/factories/CourseFactory';
import { getCategoriesUseCase } from '@infrastructure/factories/CategoryFactory';
import { Course } from '@domain/entities/Course';
import { Category } from '@domain/entities/Category';
import { BookOpen, Search, SlidersHorizontal } from 'lucide-react';
import { Pagination } from '../components/Pagination';
import { CatalogSkeleton } from '../components/Skeletons';
import { CourseCard } from '../components/CourseCard';

export const CatalogPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Pagination State
  const [page, setPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    // Read URL search params
    const qSearch = searchParams.get('search');
    if (qSearch !== null) setSearch(qSearch);
    const qCat = searchParams.get('category');
    if (qCat !== null) setSelectedCategory(Number(qCat));
    const qMaxPrice = searchParams.get('max_price');
    if (qMaxPrice !== null) setMaxPrice(qMaxPrice);
  }, [searchParams]);

  useEffect(() => {
    // Load categories once
    getCategoriesUseCase
      .execute({ page_size: 100 })
      .then((data) => setCategories(data.results))
      .catch((err) => console.error('Failed to load categories', err));
  }, []);

  const fetchCourses = useCallback((currentPage: number) => {
    setIsLoading(true);
    const filters: any = {
      is_active: true,
      page: currentPage,
    };
    if (search) filters.search = search;
    if (selectedCategory) filters.category = selectedCategory;
    if (minPrice) filters.min_price = minPrice;
    if (maxPrice) filters.max_price = maxPrice;

    getCoursesUseCase
      .execute(filters)
      .then((data) => {
        setCourses(data.results);
        setTotalCourses(data.count);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [search, selectedCategory, minPrice, maxPrice]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      fetchCourses(1);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search, selectedCategory, fetchCourses]);

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchCourses(1);
  };

  const handleResetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategory('');
    setSearch('');
    setPage(1);
  };

  return (
    <Layout>
      <div className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
          Cursos
        </h1>
        <p className="text-slate-505 dark:text-slate-400">
          Aprende programación desde cero y mejora tus habilidades
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-fit`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-brand-500" />
              Filtros
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-slate-400 hover:text-brand-500 transition-colors"
            >
              Restablecer
            </button>
          </div>

          <form onSubmit={handleApplyFilters} className="flex flex-col gap-6">
            {/* Category selection */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:border-brand-500 text-sm"
              >
                <option value="">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price filters */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Rango de Precio ($)
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="px-3 py-1.5 text-sm"
                />
                <span className="text-slate-400">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="px-3 py-1.5 text-sm"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Aplicar Filtros
            </Button>
          </form>
        </div>

        {/* Courses Area */}
        <div className="lg:col-span-3">
          {/* Search bar & filter toggle for mobile */}
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Buscar por título, descripción..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </Button>
          </div>

          {isLoading ? (
            <CatalogSkeleton />
          ) : (
            <div>
              {courses.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                  <Pagination
                    count={totalCourses}
                    currentPage={page}
                    pageSize={10}
                    onPageChange={(newPage) => {
                      setPage(newPage);
                      fetchCourses(newPage);
                    }}
                  />
                </>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-slate-900 border border-dashed border-slate-350 dark:border-slate-800 rounded-2xl p-6">
                  <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No se encontraron cursos</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-455 mt-1 mb-6">Prueba a ajustar los criterios de búsqueda o filtros.</p>
                  <Button onClick={handleResetFilters} variant="outline" size="sm">
                    Restablecer Búsqueda y Filtros
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

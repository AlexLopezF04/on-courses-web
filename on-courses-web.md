This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where comments have been removed, line numbers have been added.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Code comments have been removed from supported file types
- Line numbers have been added to the beginning of each line
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
````
.agents/
  AGENTS.md
.github/
  workflows/
    deploy.yml
public/
  videos/
    sample_demo.mp4
    sql_lesson_1.mp4
  favicon.svg
  icons.svg
src/
  application/
    dtos/
      AuthDto.ts
      CategoryDto.ts
      CourseDto.ts
    use-cases/
      CreateCategoryUseCase.ts
      CreateCourseUseCase.ts
      CreateLessonUseCase.ts
      CreateModuleUseCase.ts
      DeleteCategoryUseCase.ts
      DeleteCourseUseCase.ts
      DeleteLessonUseCase.ts
      DeleteModuleUseCase.ts
      EnrollInCourseUseCase.ts
      GetCategoriesUseCase.ts
      GetCategoryByIdUseCase.ts
      GetCourseByIdUseCase.ts
      GetCoursesUseCase.ts
      GetCurrentUserUseCase.ts
      GetEnrollmentByIdUseCase.ts
      GetEnrollmentsUseCase.ts
      GetLessonByIdUseCase.ts
      GetLessonProgressUseCase.ts
      GetLessonsUseCase.ts
      GetModuleByIdUseCase.ts
      GetModulesUseCase.ts
      LoginUseCase.ts
      LogoutUseCase.ts
      MarkLessonAsCompletedUseCase.ts
      UpdateCategoryUseCase.ts
      UpdateCourseUseCase.ts
      UpdateCurrentUserUseCase.ts
      UpdateLessonUseCase.ts
      UpdateModuleUseCase.ts
  assets/
    hero.png
    react.svg
    vite.svg
  domain/
    entities/
      Category.ts
      Course.ts
      Enrollment.ts
      Lesson.ts
      LessonProgress.ts
      Module.ts
      PaginatedResult.ts
      User.ts
    enums/
      UserRole.ts
    ports/
      IAuthRepository.ts
      ICategoryRepository.ts
      ICourseRepository.ts
      IEnrollmentRepository.ts
      ILessonProgressRepository.ts
      ILessonRepository.ts
      IModuleRepository.ts
  infrastructure/
    adapters/
      AxiosAuthRepository.ts
      AxiosCategoryRepository.ts
      AxiosCourseRepository.ts
      AxiosEnrollmentRepository.ts
      AxiosLessonProgressRepository.ts
      AxiosLessonRepository.ts
      AxiosModuleRepository.ts
    config/
      env.ts
    data/
      CourseSeedData.ts
    factories/
      AuthFactory.ts
      CategoryFactory.ts
      CourseFactory.ts
      EnrollmentFactory.ts
      LessonFactory.ts
      LessonProgressFactory.ts
      ModuleFactory.ts
    http/
      axios-client.ts
      parse-api-error.ts
    storage/
      local-token-storage.ts
  presentation/
    components/
      cart/
        CartDrawer.tsx
        InvoiceModal.tsx
        PaymentCheckoutModal.tsx
      category-management/
        CategoryFormModal.tsx
        CategoryTable.tsx
      course-management/
        CourseFormModal.tsx
        CourseTable.tsx
      lesson-management/
        CoursePreviewModal.tsx
        LessonModal.tsx
        LessonsList.tsx
        ModuleSidebar.tsx
        SingleLessonPreviewModal.tsx
      profile/
        ProfileDetails.tsx
        ProfileEditForm.tsx
        ProfileHeader.tsx
      student-management/
        StudentProgressDetailModal.tsx
      Button.tsx
      CodeBlockWithCopy.tsx
      ConfirmModal.tsx
      CourseCard.tsx
      Footer.tsx
      FooterModals.tsx
      Input.tsx
      Layout.tsx
      Loader.tsx
      Logo.tsx
      MarkdownRenderer.tsx
      Navbar.tsx
      Pagination.tsx
      Skeletons.tsx
    hooks/
      useCategoryManagement.ts
      useCourseManagement.ts
      useLessonManagement.ts
      useProfile.ts
    pages/
      AdminDashboard.tsx
      AnalyticsDashboardPage.tsx
      CatalogPage.tsx
      CategoryManagementPage.tsx
      CourseDetailPage.tsx
      CourseManagementPage.tsx
      HomePage.tsx
      LessonManagementPage.tsx
      LessonPlayerPage.tsx
      LoginPage.tsx
      ProfilePage.tsx
      RegisterPage.tsx
      StudentDashboard.tsx
      StudentManagementPage.tsx
      UserManagementPage.tsx
    router/
      AppRouter.tsx
    store/
      useAuthStore.ts
      useCartStore.ts
      useThemeStore.ts
    utils/
      cn.ts
      course-stats.ts
      jwt-helper.ts
      sanitize-url.ts
  App.css
  App.tsx
  index.css
  main.tsx
.env.example
.gitignore
.oxlintrc.json
digital-ocean-deployment.md
index.html
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
````

# Files

## File: .github/workflows/deploy.yml
````yaml
 1: name: ⚛️ Deploy React to VPS (Nginx)
 2: 
 3: on:
 4:   push:
 5:     branches:
 6:       - main
 7: 
 8: jobs:
 9:   build-and-deploy:
10:     runs-on: ubuntu-latest
11: 
12:     steps:
13:       - name: Checkout Code
14:         uses: actions/checkout@v4
15: 
16:       - name: Setup Node.js
17:         uses: actions/setup-node@v4
18:         with:
19:           node-version: 20
20:           cache: npm
21: 
22:       - name: Create env for build
23:         run: |
24:           printf "%s" "${{ secrets.REACT_ENV }}" > .env.production
25: 
26:       - name: Install dependencies
27:         run: npm install
28: 
29:       - name: Run Lint
30:         run: npm run lint
31: 
32:       - name: Build
33:         run: npm run build
34: 
35:       - name: Upload build to VPS
36:         uses: appleboy/scp-action@v0.1.7
37:         with:
38:           host: ${{ secrets.VPS_HOST }}
39:           username: ${{ secrets.VPS_USER }}
40:           key: ${{ secrets.VPS_KEY }}
41:           source: "dist/*"
42:           target: "/tmp/on-courses-build"
43: 
44:       - name: Activate build on VPS
45:         uses: appleboy/ssh-action@v1.0.3
46:         with:
47:           host: ${{ secrets.VPS_HOST }}
48:           username: ${{ secrets.VPS_USER }}
49:           key: ${{ secrets.VPS_KEY }}
50:           script: |
51:             set -e
52: 
53:             mkdir -p /var/www/on-courses-frontend
54:             rm -rf /var/www/on-courses-frontend/*
55:             cp -r /tmp/on-courses-build/dist/* /var/www/on-courses-frontend/
56: 
57:             chown -R www-data:www-data /var/www/on-courses-frontend
58: 
59:             nginx -t
60:             systemctl reload nginx
````

## File: public/favicon.svg
````xml
1: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
````

## File: public/icons.svg
````xml
 1: <svg xmlns="http://www.w3.org/2000/svg">
 2:   <symbol id="bluesky-icon" viewBox="0 0 16 17">
 3:     <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
 4:     <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
 5:   </symbol>
 6:   <symbol id="discord-icon" viewBox="0 0 20 19">
 7:     <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
 8:   </symbol>
 9:   <symbol id="documentation-icon" viewBox="0 0 21 20">
10:     <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
11:     <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
12:     <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
13:   </symbol>
14:   <symbol id="github-icon" viewBox="0 0 19 19">
15:     <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
16:   </symbol>
17:   <symbol id="social-icon" viewBox="0 0 20 20">
18:     <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
19:     <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
20:   </symbol>
21:   <symbol id="x-icon" viewBox="0 0 19 19">
22:     <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
23:   </symbol>
24: </svg>
````

## File: src/application/dtos/AuthDto.ts
````typescript
 1: import { User } from '@domain/entities/User';
 2: 
 3: export interface LoginRequestDto {
 4:   username: string;
 5:   password: string;
 6: }
 7: 
 8: export interface LoginResponseDto {
 9:   access: string;
10:   refresh: string;
11:   user?: User;
12:   id?: number;
13:   username?: string;
14:   email?: string;
15:   role?: string;
16: }
17: 
18: export interface RegisterRequestDto {
19:   username: string;
20:   email: string;
21:   password?: string;
22:   first_name?: string;
23:   last_name?: string;
24:   phone?: string;
25: }
````

## File: src/application/dtos/CategoryDto.ts
````typescript
 1: export interface CreateCategoryDto {
 2:   name: string;
 3:   description?: string;
 4:   slug?: string;
 5: }
 6: 
 7: export interface UpdateCategoryDto {
 8:   name?: string;
 9:   description?: string;
10:   slug?: string;
11: }
````

## File: src/application/dtos/CourseDto.ts
````typescript
 1: export interface CreateCourseDto {
 2:   category: number;
 3:   title: string;
 4:   description: string;
 5:   price: string;
 6:   cover_image?: string | null;
 7:   slug: string;
 8:   is_active: boolean;
 9: }
10: 
11: export interface UpdateCourseDto extends Partial<CreateCourseDto> {}
````

## File: src/application/use-cases/CreateCategoryUseCase.ts
````typescript
 1: import { ICategoryRepository } from '@domain/ports/ICategoryRepository';
 2: import { Category } from '@domain/entities/Category';
 3: import { CreateCategoryDto } from '../dtos/CategoryDto';
 4: 
 5: export class CreateCategoryUseCase {
 6:   constructor(private categoryRepository: ICategoryRepository) {}
 7: 
 8:   async execute(dto: CreateCategoryDto): Promise<Category> {
 9:     return this.categoryRepository.createCategory(dto);
10:   }
11: }
````

## File: src/application/use-cases/CreateCourseUseCase.ts
````typescript
 1: import { ICourseRepository } from '@domain/ports/ICourseRepository';
 2: import { Course } from '@domain/entities/Course';
 3: 
 4: export class CreateCourseUseCase {
 5:   constructor(private courseRepository: ICourseRepository) {}
 6: 
 7:   async execute(courseData: any): Promise<Course> {
 8:     return this.courseRepository.createCourse(courseData);
 9:   }
10: }
````

## File: src/application/use-cases/CreateLessonUseCase.ts
````typescript
 1: import { ILessonRepository } from '@domain/ports/ILessonRepository';
 2: import { Lesson } from '@domain/entities/Lesson';
 3: 
 4: export class CreateLessonUseCase {
 5:   constructor(private lessonRepository: ILessonRepository) {}
 6: 
 7:   async execute(lesson: any): Promise<Lesson> {
 8:     return this.lessonRepository.createLesson(lesson);
 9:   }
10: }
````

## File: src/application/use-cases/CreateModuleUseCase.ts
````typescript
 1: import { IModuleRepository } from '@domain/ports/IModuleRepository';
 2: import { Module } from '@domain/entities/Module';
 3: 
 4: export class CreateModuleUseCase {
 5:   constructor(private moduleRepository: IModuleRepository) {}
 6: 
 7:   async execute(module: any): Promise<Module> {
 8:     return this.moduleRepository.createModule(module);
 9:   }
10: }
````

## File: src/application/use-cases/DeleteCategoryUseCase.ts
````typescript
1: import { ICategoryRepository } from '@domain/ports/ICategoryRepository';
2: 
3: export class DeleteCategoryUseCase {
4:   constructor(private categoryRepository: ICategoryRepository) {}
5: 
6:   async execute(id: number): Promise<void> {
7:     return this.categoryRepository.deleteCategory(id);
8:   }
9: }
````

## File: src/application/use-cases/DeleteCourseUseCase.ts
````typescript
1: import { ICourseRepository } from '@domain/ports/ICourseRepository';
2: 
3: export class DeleteCourseUseCase {
4:   constructor(private courseRepository: ICourseRepository) {}
5: 
6:   async execute(id: number): Promise<void> {
7:     return this.courseRepository.deleteCourse(id);
8:   }
9: }
````

## File: src/application/use-cases/DeleteLessonUseCase.ts
````typescript
1: import { ILessonRepository } from '@domain/ports/ILessonRepository';
2: 
3: export class DeleteLessonUseCase {
4:   constructor(private lessonRepository: ILessonRepository) {}
5: 
6:   async execute(id: number): Promise<void> {
7:     return this.lessonRepository.deleteLesson(id);
8:   }
9: }
````

## File: src/application/use-cases/DeleteModuleUseCase.ts
````typescript
1: import { IModuleRepository } from '@domain/ports/IModuleRepository';
2: 
3: export class DeleteModuleUseCase {
4:   constructor(private moduleRepository: IModuleRepository) {}
5: 
6:   async execute(id: number): Promise<void> {
7:     return this.moduleRepository.deleteModule(id);
8:   }
9: }
````

## File: src/application/use-cases/EnrollInCourseUseCase.ts
````typescript
1: import { IEnrollmentRepository } from '@domain/ports/IEnrollmentRepository';
2: 
3: export class EnrollInCourseUseCase {
4:   constructor(private enrollmentRepository: IEnrollmentRepository) {}
5: 
6:   async execute(courseId: number): Promise<any> {
7:     return this.enrollmentRepository.enrollInCourse(courseId);
8:   }
9: }
````

## File: src/application/use-cases/GetCategoriesUseCase.ts
````typescript
 1: import { ICategoryRepository } from '@domain/ports/ICategoryRepository';
 2: import { Category } from '@domain/entities/Category';
 3: import { PaginatedResult } from '@domain/entities/PaginatedResult';
 4: 
 5: export class GetCategoriesUseCase {
 6:   constructor(private categoryRepository: ICategoryRepository) {}
 7: 
 8:   async execute(filters?: any): Promise<PaginatedResult<Category>> {
 9:     return this.categoryRepository.getCategories(filters);
10:   }
11: }
````

## File: src/application/use-cases/GetCategoryByIdUseCase.ts
````typescript
 1: import { ICategoryRepository } from '@domain/ports/ICategoryRepository';
 2: import { Category } from '@domain/entities/Category';
 3: 
 4: export class GetCategoryByIdUseCase {
 5:   constructor(private categoryRepository: ICategoryRepository) {}
 6: 
 7:   async execute(id: number): Promise<Category> {
 8:     return this.categoryRepository.getCategoryById(id);
 9:   }
10: }
````

## File: src/application/use-cases/GetCourseByIdUseCase.ts
````typescript
 1: import { ICourseRepository } from '@domain/ports/ICourseRepository';
 2: import { Course } from '@domain/entities/Course';
 3: 
 4: export class GetCourseByIdUseCase {
 5:   constructor(private courseRepository: ICourseRepository) {}
 6: 
 7:   async execute(id: number): Promise<Course> {
 8:     return this.courseRepository.getCourseById(id);
 9:   }
10: }
````

## File: src/application/use-cases/GetCoursesUseCase.ts
````typescript
 1: import { ICourseRepository } from '@domain/ports/ICourseRepository';
 2: import { Course } from '@domain/entities/Course';
 3: import { PaginatedResult } from '@domain/entities/PaginatedResult';
 4: 
 5: export class GetCoursesUseCase {
 6:   constructor(private courseRepository: ICourseRepository) {}
 7: 
 8:   async execute(filters?: any): Promise<PaginatedResult<Course>> {
 9:     return this.courseRepository.getCourses(filters);
10:   }
11: }
````

## File: src/application/use-cases/GetCurrentUserUseCase.ts
````typescript
1: import { IAuthRepository } from '@domain/ports/IAuthRepository';
2: 
3: export class GetCurrentUserUseCase {
4:   constructor(private authRepository: IAuthRepository) {}
5: 
6:   async execute(userId: number): Promise<any> {
7:     return this.authRepository.getCurrentUser(userId);
8:   }
9: }
````

## File: src/application/use-cases/GetEnrollmentByIdUseCase.ts
````typescript
1: import { IEnrollmentRepository } from '@domain/ports/IEnrollmentRepository';
2: 
3: export class GetEnrollmentByIdUseCase {
4:   constructor(private enrollmentRepository: IEnrollmentRepository) {}
5: 
6:   async execute(id: number): Promise<any> {
7:     return this.enrollmentRepository.getEnrollmentById(id);
8:   }
9: }
````

## File: src/application/use-cases/GetEnrollmentsUseCase.ts
````typescript
1: import { IEnrollmentRepository } from '@domain/ports/IEnrollmentRepository';
2: 
3: export class GetEnrollmentsUseCase {
4:   constructor(private enrollmentRepository: IEnrollmentRepository) {}
5: 
6:   async execute(filters?: any): Promise<any> {
7:     return this.enrollmentRepository.getEnrollments(filters);
8:   }
9: }
````

## File: src/application/use-cases/GetLessonByIdUseCase.ts
````typescript
 1: import { ILessonRepository } from '@domain/ports/ILessonRepository';
 2: import { Lesson } from '@domain/entities/Lesson';
 3: 
 4: export class GetLessonByIdUseCase {
 5:   constructor(private lessonRepository: ILessonRepository) {}
 6: 
 7:   async execute(id: number): Promise<Lesson> {
 8:     return this.lessonRepository.getLessonById(id);
 9:   }
10: }
````

## File: src/application/use-cases/GetLessonProgressUseCase.ts
````typescript
 1: import { ILessonProgressRepository } from '@domain/ports/ILessonProgressRepository';
 2: import { LessonProgress } from '@domain/entities/LessonProgress';
 3: 
 4: export class GetLessonProgressUseCase {
 5:   constructor(private progressRepository: ILessonProgressRepository) {}
 6: 
 7:   async execute(courseId: number): Promise<LessonProgress[]> {
 8:     return this.progressRepository.getProgress(courseId);
 9:   }
10: }
````

## File: src/application/use-cases/GetLessonsUseCase.ts
````typescript
 1: import { ILessonRepository } from '@domain/ports/ILessonRepository';
 2: import { Lesson } from '@domain/entities/Lesson';
 3: 
 4: export class GetLessonsUseCase {
 5:   constructor(private lessonRepository: ILessonRepository) {}
 6: 
 7:   async execute(moduleId?: number): Promise<Lesson[]> {
 8:     return this.lessonRepository.getLessons(moduleId);
 9:   }
10: }
````

## File: src/application/use-cases/GetModuleByIdUseCase.ts
````typescript
 1: import { IModuleRepository } from '@domain/ports/IModuleRepository';
 2: import { Module } from '@domain/entities/Module';
 3: 
 4: export class GetModuleByIdUseCase {
 5:   constructor(private moduleRepository: IModuleRepository) {}
 6: 
 7:   async execute(id: number): Promise<Module> {
 8:     return this.moduleRepository.getModuleById(id);
 9:   }
10: }
````

## File: src/application/use-cases/GetModulesUseCase.ts
````typescript
 1: import { IModuleRepository } from '@domain/ports/IModuleRepository';
 2: import { Module } from '@domain/entities/Module';
 3: 
 4: export class GetModulesUseCase {
 5:   constructor(private moduleRepository: IModuleRepository) {}
 6: 
 7:   async execute(courseId?: number): Promise<Module[]> {
 8:     return this.moduleRepository.getModules(courseId);
 9:   }
10: }
````

## File: src/application/use-cases/LoginUseCase.ts
````typescript
 1: import { IAuthRepository } from '@domain/ports/IAuthRepository';
 2: import { LoginRequestDto, LoginResponseDto } from '../dtos/AuthDto';
 3: 
 4: export class LoginUseCase {
 5:   constructor(private authRepository: IAuthRepository) {}
 6: 
 7:   async execute(credentials: LoginRequestDto): Promise<LoginResponseDto> {
 8:     if (!credentials.username || !credentials.password) {
 9:       throw new Error('El usuario y la contraseña son requeridos');
10:     }
11:     return this.authRepository.login(credentials);
12:   }
13: }
````

## File: src/application/use-cases/LogoutUseCase.ts
````typescript
1: import { IAuthRepository } from '@domain/ports/IAuthRepository';
2: 
3: export class LogoutUseCase {
4:   constructor(private authRepository: IAuthRepository) {}
5: 
6:   async execute(refreshToken: string): Promise<void> {
7:     return this.authRepository.logout(refreshToken);
8:   }
9: }
````

## File: src/application/use-cases/MarkLessonAsCompletedUseCase.ts
````typescript
 1: import { ILessonProgressRepository } from '@domain/ports/ILessonProgressRepository';
 2: import { LessonProgress } from '@domain/entities/LessonProgress';
 3: 
 4: export class MarkLessonAsCompletedUseCase {
 5:   constructor(private progressRepository: ILessonProgressRepository) {}
 6: 
 7:   async execute(lessonId: number): Promise<LessonProgress> {
 8:     return this.progressRepository.markAsCompleted(lessonId);
 9:   }
10: }
````

## File: src/application/use-cases/UpdateCategoryUseCase.ts
````typescript
 1: import { ICategoryRepository } from '@domain/ports/ICategoryRepository';
 2: import { Category } from '@domain/entities/Category';
 3: import { UpdateCategoryDto } from '../dtos/CategoryDto';
 4: 
 5: export class UpdateCategoryUseCase {
 6:   constructor(private categoryRepository: ICategoryRepository) {}
 7: 
 8:   async execute(id: number, dto: UpdateCategoryDto): Promise<Category> {
 9:     return this.categoryRepository.updateCategory(id, dto);
10:   }
11: }
````

## File: src/application/use-cases/UpdateCourseUseCase.ts
````typescript
 1: import { ICourseRepository } from '@domain/ports/ICourseRepository';
 2: import { Course } from '@domain/entities/Course';
 3: 
 4: export class UpdateCourseUseCase {
 5:   constructor(private courseRepository: ICourseRepository) {}
 6: 
 7:   async execute(id: number, courseData: any): Promise<Course> {
 8:     return this.courseRepository.updateCourse(id, courseData);
 9:   }
10: }
````

## File: src/application/use-cases/UpdateCurrentUserUseCase.ts
````typescript
1: import { IAuthRepository } from '@domain/ports/IAuthRepository';
2: 
3: export class UpdateCurrentUserUseCase {
4:   constructor(private authRepository: IAuthRepository) {}
5: 
6:   async execute(userId: number, data: any): Promise<any> {
7:     return this.authRepository.updateCurrentUser(userId, data);
8:   }
9: }
````

## File: src/application/use-cases/UpdateLessonUseCase.ts
````typescript
 1: import { ILessonRepository } from '@domain/ports/ILessonRepository';
 2: import { Lesson } from '@domain/entities/Lesson';
 3: 
 4: export class UpdateLessonUseCase {
 5:   constructor(private lessonRepository: ILessonRepository) {}
 6: 
 7:   async execute(id: number, lesson: any): Promise<Lesson> {
 8:     return this.lessonRepository.updateLesson(id, lesson);
 9:   }
10: }
````

## File: src/application/use-cases/UpdateModuleUseCase.ts
````typescript
 1: import { IModuleRepository } from '@domain/ports/IModuleRepository';
 2: import { Module } from '@domain/entities/Module';
 3: 
 4: export class UpdateModuleUseCase {
 5:   constructor(private moduleRepository: IModuleRepository) {}
 6: 
 7:   async execute(id: number, module: any): Promise<Module> {
 8:     return this.moduleRepository.updateModule(id, module);
 9:   }
10: }
````

## File: src/assets/react.svg
````xml
1: <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
````

## File: src/assets/vite.svg
````xml
1: <svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
````

## File: src/domain/entities/Category.ts
````typescript
1: export interface Category {
2:   id: number;
3:   name: string;
4:   description?: string;
5:   slug: string;
6: }
````

## File: src/domain/entities/Course.ts
````typescript
 1: import { Category } from './Category';
 2: import { Module } from './Module';
 3: 
 4: export interface Course {
 5:   id: number;
 6:   title: string;
 7:   slug: string;
 8:   price: string;
 9:   cover_image: string | null;
10:   category: number | Category;
11:   category_name?: string;
12:   professor_name: string;
13:   professor?: number;
14:   is_active: boolean;
15:   modules_count?: number;
16:   created_at: string;
17:   description?: string;
18:   modules?: Module[];
19: }
````

## File: src/domain/entities/Lesson.ts
````typescript
 1: export interface Lesson {
 2:   id: number;
 3:   title: string;
 4:   content_text?: string;
 5:   video_url?: string;
 6:   duration_seconds?: number;
 7:   order: number;
 8:   completion_percentage?: number;
 9:   module: number;
10:   resources?: string[];
11: }
````

## File: src/domain/entities/LessonProgress.ts
````typescript
1: export interface LessonProgress {
2:   id: number;
3:   lesson: number;
4:   percentage: number;
5:   is_completed: boolean;
6:   student?: number;
7:   enrolled_course?: number;
8: }
````

## File: src/domain/entities/Module.ts
````typescript
 1: import { Lesson } from './Lesson';
 2: 
 3: export interface Module {
 4:   id: number;
 5:   title: string;
 6:   description?: string;
 7:   order: number;
 8:   course: number;
 9:   lessons?: Lesson[];
10: }
````

## File: src/domain/entities/PaginatedResult.ts
````typescript
1: export interface PaginatedResult<T> {
2:   results: T[];
3:   count: number;
4:   next: string | null;
5:   previous: string | null;
6: }
````

## File: src/domain/entities/User.ts
````typescript
 1: import { UserRole } from '../enums/UserRole';
 2: 
 3: export interface User {
 4:   id: number;
 5:   username: string;
 6:   email: string;
 7:   first_name: string;
 8:   last_name: string;
 9:   role: UserRole;
10:   phone?: string;
11:   is_active: boolean;
12:   date_joined?: string;
13:   biography?: string;
14:   country?: string;
15:   birth_date?: string;
16:   avatar?: string | null;
17:   professional_title?: string;
18:   specialty?: string;
19:   linkedin_url?: string;
20: }
````

## File: src/domain/enums/UserRole.ts
````typescript
1: export enum UserRole {
2:   STUDENT = 'student',
3:   PROFESSOR = 'professor',
4:   ADMIN = 'admin',
5: }
````

## File: src/domain/ports/IAuthRepository.ts
````typescript
1: import { LoginRequestDto, LoginResponseDto } from '@application/dtos/AuthDto';
2: 
3: export interface IAuthRepository {
4:   login(credentials: LoginRequestDto): Promise<LoginResponseDto>;
5:   logout(refreshToken: string): Promise<void>;
6:   register(data: any): Promise<any>;
7:   getCurrentUser(userId: number): Promise<any>;
8:   updateCurrentUser(userId: number, data: any): Promise<any>;
9: }
````

## File: src/domain/ports/ICategoryRepository.ts
````typescript
 1: import { Category } from '@domain/entities/Category';
 2: import { PaginatedResult } from '@domain/entities/PaginatedResult';
 3: 
 4: export interface ICategoryRepository {
 5:   getCategories(filters?: any): Promise<PaginatedResult<Category>>;
 6:   getCategoryById(id: number): Promise<Category>;
 7:   createCategory(category: Partial<Category>): Promise<Category>;
 8:   updateCategory(id: number, category: Partial<Category>): Promise<Category>;
 9:   deleteCategory(id: number): Promise<void>;
10: }
````

## File: src/domain/ports/ICourseRepository.ts
````typescript
 1: import { Course } from '@domain/entities/Course';
 2: import { PaginatedResult } from '@domain/entities/PaginatedResult';
 3: 
 4: export interface ICourseRepository {
 5:   getCourses(filters?: any): Promise<PaginatedResult<Course>>;
 6:   getCourseById(id: number): Promise<Course>;
 7:   createCourse(course: any): Promise<Course>;
 8:   updateCourse(id: number, course: any): Promise<Course>;
 9:   deleteCourse(id: number): Promise<void>;
10: }
````

## File: src/domain/ports/IEnrollmentRepository.ts
````typescript
1: import { Enrollment } from '@domain/entities/Enrollment';
2: 
3: export interface IEnrollmentRepository {
4:   getEnrollments(filters?: any): Promise<{ results: Enrollment[]; count: number }>;
5:   enrollInCourse(courseId: number): Promise<Enrollment>;
6:   getEnrollmentById(id: number): Promise<Enrollment>;
7: }
````

## File: src/domain/ports/ILessonProgressRepository.ts
````typescript
1: import { LessonProgress } from '../entities/LessonProgress';
2: 
3: export interface ILessonProgressRepository {
4:   getProgress(courseId: number): Promise<LessonProgress[]>;
5:   markAsCompleted(lessonId: number): Promise<LessonProgress>;
6: }
````

## File: src/domain/ports/ILessonRepository.ts
````typescript
1: import { Lesson } from '@domain/entities/Lesson';
2: 
3: export interface ILessonRepository {
4:   getLessons(moduleId?: number): Promise<Lesson[]>;
5:   getLessonById(id: number): Promise<Lesson>;
6:   createLesson(lesson: any): Promise<Lesson>;
7:   updateLesson(id: number, lesson: any): Promise<Lesson>;
8:   deleteLesson(id: number): Promise<void>;
9: }
````

## File: src/domain/ports/IModuleRepository.ts
````typescript
1: import { Module } from '@domain/entities/Module';
2: 
3: export interface IModuleRepository {
4:   getModules(courseId?: number): Promise<Module[]>;
5:   getModuleById(id: number): Promise<Module>;
6:   createModule(module: any): Promise<Module>;
7:   updateModule(id: number, module: any): Promise<Module>;
8:   deleteModule(id: number): Promise<void>;
9: }
````

## File: src/infrastructure/adapters/AxiosAuthRepository.ts
````typescript
 1: import { IAuthRepository } from '@domain/ports/IAuthRepository';
 2: import { LoginRequestDto, LoginResponseDto } from '@application/dtos/AuthDto';
 3: import { axiosClient } from '../http/axios-client';
 4: import { parseApiError } from '../http/parse-api-error';
 5: 
 6: export class AxiosAuthRepository implements IAuthRepository {
 7:   async login(credentials: LoginRequestDto): Promise<LoginResponseDto> {
 8:     try {
 9:       const response = await axiosClient.post('/auth/login/', credentials);
10:       return response.data;
11:     } catch (error) {
12:       throw parseApiError(error);
13:     }
14:   }
15: 
16:   async logout(refreshToken: string): Promise<void> {
17:     try {
18:       await axiosClient.post('/auth/logout/', { refresh: refreshToken });
19:     } catch (error) {
20:       throw parseApiError(error);
21:     }
22:   }
23: 
24:   async register(data: any): Promise<any> {
25:     try {
26:       const response = await axiosClient.post('/auth/register/', data);
27:       return response.data;
28:     } catch (error) {
29:       throw parseApiError(error);
30:     }
31:   }
32: 
33:   async getCurrentUser(userId: number): Promise<any> {
34:     try {
35:       const response = await axiosClient.get(`/users/${userId}/`);
36:       return response.data;
37:     } catch (error) {
38:       throw parseApiError(error);
39:     }
40:   }
41: 
42:   async updateCurrentUser(userId: number, data: any): Promise<any> {
43:     try {
44:       const response = await axiosClient.patch(`/users/${userId}/`, data);
45:       return response.data;
46:     } catch (error) {
47:       throw parseApiError(error);
48:     }
49:   }
50: }
````

## File: src/infrastructure/adapters/AxiosCategoryRepository.ts
````typescript
 1: import { ICategoryRepository } from '@domain/ports/ICategoryRepository';
 2: import { Category } from '@domain/entities/Category';
 3: import { PaginatedResult } from '@domain/entities/PaginatedResult';
 4: import { axiosClient } from '../http/axios-client';
 5: import { parseApiError } from '../http/parse-api-error';
 6: 
 7: export class AxiosCategoryRepository implements ICategoryRepository {
 8:   async getCategories(filters?: any): Promise<PaginatedResult<Category>> {
 9:     try {
10:       const response = await axiosClient.get('/categories/', { params: filters });
11:       if (response.data && Array.isArray(response.data.results)) {
12:         return {
13:           results: response.data.results,
14:           count: response.data.count || response.data.results.length,
15:           next: response.data.next || null,
16:           previous: response.data.previous || null,
17:         };
18:       }
19:       if (Array.isArray(response.data)) {
20:         return {
21:           results: response.data,
22:           count: response.data.length,
23:           next: null,
24:           previous: null,
25:         };
26:       }
27:       return { results: [], count: 0, next: null, previous: null };
28:     } catch (error) {
29:       throw parseApiError(error);
30:     }
31:   }
32: 
33:   async getCategoryById(id: number): Promise<Category> {
34:     try {
35:       const response = await axiosClient.get(`/categories/${id}/`);
36:       return response.data;
37:     } catch (error) {
38:       throw parseApiError(error);
39:     }
40:   }
41: 
42:   async createCategory(category: Partial<Category>): Promise<Category> {
43:     try {
44:       const response = await axiosClient.post('/categories/', category);
45:       return response.data;
46:     } catch (error) {
47:       throw parseApiError(error);
48:     }
49:   }
50: 
51:   async updateCategory(id: number, category: Partial<Category>): Promise<Category> {
52:     try {
53:       const response = await axiosClient.put(`/categories/${id}/`, category);
54:       return response.data;
55:     } catch (error) {
56:       throw parseApiError(error);
57:     }
58:   }
59: 
60:   async deleteCategory(id: number): Promise<void> {
61:     try {
62:       await axiosClient.delete(`/categories/${id}/`);
63:     } catch (error) {
64:       throw parseApiError(error);
65:     }
66:   }
67: }
````

## File: src/infrastructure/adapters/AxiosEnrollmentRepository.ts
````typescript
 1: import { IEnrollmentRepository } from '@domain/ports/IEnrollmentRepository';
 2: import { Enrollment } from '@domain/entities/Enrollment';
 3: import { axiosClient } from '../http/axios-client';
 4: import { parseApiError } from '../http/parse-api-error';
 5: 
 6: export class AxiosEnrollmentRepository implements IEnrollmentRepository {
 7:   async getEnrollments(filters?: any): Promise<{ results: Enrollment[]; count: number }> {
 8:     try {
 9:       const response = await axiosClient.get('/enrollments/', { params: filters });
10:       if (response.data && Array.isArray(response.data.results)) {
11:         return {
12:           results: response.data.results,
13:           count: response.data.count || response.data.results.length,
14:         };
15:       }
16:       if (Array.isArray(response.data)) {
17:         return {
18:           results: response.data,
19:           count: response.data.length,
20:         };
21:       }
22:       return { results: [], count: 0 };
23:     } catch (error) {
24:       throw parseApiError(error);
25:     }
26:   }
27: 
28:   async enrollInCourse(courseId: number): Promise<Enrollment> {
29:     try {
30:       const response = await axiosClient.post('/enrollments/', { course: courseId });
31:       return response.data;
32:     } catch (error) {
33:       throw parseApiError(error);
34:     }
35:   }
36: 
37:   async getEnrollmentById(id: number): Promise<Enrollment> {
38:     try {
39:       const response = await axiosClient.get(`/enrollments/${id}/`);
40:       return response.data;
41:     } catch (error) {
42:       throw parseApiError(error);
43:     }
44:   }
45: }
````

## File: src/infrastructure/adapters/AxiosLessonProgressRepository.ts
````typescript
 1: import { ILessonProgressRepository } from '@domain/ports/ILessonProgressRepository';
 2: import { LessonProgress } from '@domain/entities/LessonProgress';
 3: import { axiosClient } from '../http/axios-client';
 4: 
 5: export class AxiosLessonProgressRepository implements ILessonProgressRepository {
 6:   async getProgress(courseId: number): Promise<LessonProgress[]> {
 7:     const response = await axiosClient.get('/lesson-progress/', {
 8:       params: { course: courseId },
 9:     });
10:     return response.data?.results || response.data || [];
11:   }
12: 
13:   async markAsCompleted(lessonId: number): Promise<LessonProgress> {
14:     const response = await axiosClient.post('/lesson-progress/', {
15:       lesson: lessonId,
16:       percentage: 100,
17:       is_completed: true,
18:     });
19:     return response.data;
20:   }
21: }
````

## File: src/infrastructure/adapters/AxiosLessonRepository.ts
````typescript
 1: import { ILessonRepository } from '@domain/ports/ILessonRepository';
 2: import { Lesson } from '@domain/entities/Lesson';
 3: import { axiosClient } from '../http/axios-client';
 4: import { parseApiError } from '../http/parse-api-error';
 5: 
 6: export class AxiosLessonRepository implements ILessonRepository {
 7:   async getLessons(moduleId?: number): Promise<Lesson[]> {
 8:     try {
 9:       const response = await axiosClient.get('/lessons/', {
10:         params: {
11:           ...(moduleId ? { module: moduleId } : {}),
12:           page_size: 100,
13:         },
14:       });
15:       if (response.data && Array.isArray(response.data.results)) {
16:         return response.data.results;
17:       }
18:       if (Array.isArray(response.data)) {
19:         return response.data;
20:       }
21:       return [];
22:     } catch (error) {
23:       throw parseApiError(error);
24:     }
25:   }
26: 
27:   async getLessonById(id: number): Promise<Lesson> {
28:     try {
29:       const response = await axiosClient.get(`/lessons/${id}/`);
30:       return response.data;
31:     } catch (error) {
32:       throw parseApiError(error);
33:     }
34:   }
35: 
36:   async createLesson(lesson: any): Promise<Lesson> {
37:     try {
38:       const response = await axiosClient.post('/lessons/', lesson);
39:       return response.data;
40:     } catch (error) {
41:       throw parseApiError(error);
42:     }
43:   }
44: 
45:   async updateLesson(id: number, lesson: any): Promise<Lesson> {
46:     try {
47:       const response = await axiosClient.patch(`/lessons/${id}/`, lesson);
48:       return response.data;
49:     } catch (error) {
50:       throw parseApiError(error);
51:     }
52:   }
53: 
54:   async deleteLesson(id: number): Promise<void> {
55:     try {
56:       await axiosClient.delete(`/lessons/${id}/`);
57:     } catch (error) {
58:       throw parseApiError(error);
59:     }
60:   }
61: }
````

## File: src/infrastructure/adapters/AxiosModuleRepository.ts
````typescript
 1: import { IModuleRepository } from '@domain/ports/IModuleRepository';
 2: import { Module } from '@domain/entities/Module';
 3: import { axiosClient } from '../http/axios-client';
 4: import { parseApiError } from '../http/parse-api-error';
 5: 
 6: export class AxiosModuleRepository implements IModuleRepository {
 7:   async getModules(courseId?: number): Promise<Module[]> {
 8:     try {
 9:       const response = await axiosClient.get('/modules/', {
10:         params: {
11:           ...(courseId ? { course: courseId } : {}),
12:           page_size: 100,
13:         },
14:       });
15:       if (response.data && Array.isArray(response.data.results)) {
16:         return response.data.results;
17:       }
18:       if (Array.isArray(response.data)) {
19:         return response.data;
20:       }
21:       return [];
22:     } catch (error) {
23:       throw parseApiError(error);
24:     }
25:   }
26: 
27:   async getModuleById(id: number): Promise<Module> {
28:     try {
29:       const response = await axiosClient.get(`/modules/${id}/`);
30:       return response.data;
31:     } catch (error) {
32:       throw parseApiError(error);
33:     }
34:   }
35: 
36:   async createModule(module: any): Promise<Module> {
37:     try {
38:       const response = await axiosClient.post('/modules/', module);
39:       return response.data;
40:     } catch (error) {
41:       throw parseApiError(error);
42:     }
43:   }
44: 
45:   async updateModule(id: number, module: any): Promise<Module> {
46:     try {
47:       const response = await axiosClient.patch(`/modules/${id}/`, module);
48:       return response.data;
49:     } catch (error) {
50:       throw parseApiError(error);
51:     }
52:   }
53: 
54:   async deleteModule(id: number): Promise<void> {
55:     try {
56:       await axiosClient.delete(`/modules/${id}/`);
57:     } catch (error) {
58:       throw parseApiError(error);
59:     }
60:   }
61: }
````

## File: src/infrastructure/config/env.ts
````typescript
1: export const ENV = {
2:   API_URL: import.meta.env.VITE_API_URL || 'https://on-courses-api.uaeftt-ute.site/api',
3: };
````

## File: src/infrastructure/factories/AuthFactory.ts
````typescript
 1: import { AxiosAuthRepository } from '../adapters/AxiosAuthRepository';
 2: import { LoginUseCase } from '@application/use-cases/LoginUseCase';
 3: import { GetCurrentUserUseCase } from '@application/use-cases/GetCurrentUserUseCase';
 4: import { UpdateCurrentUserUseCase } from '@application/use-cases/UpdateCurrentUserUseCase';
 5: import { LogoutUseCase } from '@application/use-cases/LogoutUseCase';
 6: 
 7: export const authRepositoryInstance = new AxiosAuthRepository();
 8: 
 9: export const loginUseCase = new LoginUseCase(authRepositoryInstance);
10: export const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepositoryInstance);
11: export const updateCurrentUserUseCase = new UpdateCurrentUserUseCase(authRepositoryInstance);
12: export const logoutUseCase = new LogoutUseCase(authRepositoryInstance);
````

## File: src/infrastructure/factories/CategoryFactory.ts
````typescript
 1: import { AxiosCategoryRepository } from '../adapters/AxiosCategoryRepository';
 2: import { GetCategoriesUseCase } from '@application/use-cases/GetCategoriesUseCase';
 3: import { GetCategoryByIdUseCase } from '@application/use-cases/GetCategoryByIdUseCase';
 4: import { CreateCategoryUseCase } from '@application/use-cases/CreateCategoryUseCase';
 5: import { UpdateCategoryUseCase } from '@application/use-cases/UpdateCategoryUseCase';
 6: import { DeleteCategoryUseCase } from '@application/use-cases/DeleteCategoryUseCase';
 7: 
 8: export const categoryRepositoryInstance = new AxiosCategoryRepository();
 9: 
10: export const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepositoryInstance);
11: export const getCategoryByIdUseCase = new GetCategoryByIdUseCase(categoryRepositoryInstance);
12: export const createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryInstance);
13: export const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepositoryInstance);
14: export const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepositoryInstance);
````

## File: src/infrastructure/factories/CourseFactory.ts
````typescript
 1: import { AxiosCourseRepository } from '../adapters/AxiosCourseRepository';
 2: import { GetCoursesUseCase } from '@application/use-cases/GetCoursesUseCase';
 3: import { GetCourseByIdUseCase } from '@application/use-cases/GetCourseByIdUseCase';
 4: import { CreateCourseUseCase } from '@application/use-cases/CreateCourseUseCase';
 5: import { UpdateCourseUseCase } from '@application/use-cases/UpdateCourseUseCase';
 6: import { DeleteCourseUseCase } from '@application/use-cases/DeleteCourseUseCase';
 7: 
 8: export const courseRepositoryInstance = new AxiosCourseRepository();
 9: 
10: export const getCoursesUseCase = new GetCoursesUseCase(courseRepositoryInstance);
11: export const getCourseByIdUseCase = new GetCourseByIdUseCase(courseRepositoryInstance);
12: export const createCourseUseCase = new CreateCourseUseCase(courseRepositoryInstance);
13: export const updateCourseUseCase = new UpdateCourseUseCase(courseRepositoryInstance);
14: export const deleteCourseUseCase = new DeleteCourseUseCase(courseRepositoryInstance);
````

## File: src/infrastructure/factories/EnrollmentFactory.ts
````typescript
 1: import { AxiosEnrollmentRepository } from '../adapters/AxiosEnrollmentRepository';
 2: import { GetEnrollmentsUseCase } from '@application/use-cases/GetEnrollmentsUseCase';
 3: import { EnrollInCourseUseCase } from '@application/use-cases/EnrollInCourseUseCase';
 4: import { GetEnrollmentByIdUseCase } from '@application/use-cases/GetEnrollmentByIdUseCase';
 5: 
 6: export const enrollmentRepositoryInstance = new AxiosEnrollmentRepository();
 7: 
 8: export const getEnrollmentsUseCase = new GetEnrollmentsUseCase(enrollmentRepositoryInstance);
 9: export const enrollInCourseUseCase = new EnrollInCourseUseCase(enrollmentRepositoryInstance);
10: export const getEnrollmentByIdUseCase = new GetEnrollmentByIdUseCase(enrollmentRepositoryInstance);
````

## File: src/infrastructure/factories/LessonFactory.ts
````typescript
 1: import { AxiosLessonRepository } from '../adapters/AxiosLessonRepository';
 2: import { GetLessonsUseCase } from '@application/use-cases/GetLessonsUseCase';
 3: import { GetLessonByIdUseCase } from '@application/use-cases/GetLessonByIdUseCase';
 4: import { CreateLessonUseCase } from '@application/use-cases/CreateLessonUseCase';
 5: import { UpdateLessonUseCase } from '@application/use-cases/UpdateLessonUseCase';
 6: import { DeleteLessonUseCase } from '@application/use-cases/DeleteLessonUseCase';
 7: 
 8: export const lessonRepositoryInstance = new AxiosLessonRepository();
 9: 
10: export const getLessonsUseCase = new GetLessonsUseCase(lessonRepositoryInstance);
11: export const getLessonByIdUseCase = new GetLessonByIdUseCase(lessonRepositoryInstance);
12: export const createLessonUseCase = new CreateLessonUseCase(lessonRepositoryInstance);
13: export const updateLessonUseCase = new UpdateLessonUseCase(lessonRepositoryInstance);
14: export const deleteLessonUseCase = new DeleteLessonUseCase(lessonRepositoryInstance);
````

## File: src/infrastructure/factories/LessonProgressFactory.ts
````typescript
1: import { AxiosLessonProgressRepository } from '../adapters/AxiosLessonProgressRepository';
2: import { GetLessonProgressUseCase } from '@application/use-cases/GetLessonProgressUseCase';
3: import { MarkLessonAsCompletedUseCase } from '@application/use-cases/MarkLessonAsCompletedUseCase';
4: 
5: export const lessonProgressRepositoryInstance = new AxiosLessonProgressRepository();
6: 
7: export const getLessonProgressUseCase = new GetLessonProgressUseCase(lessonProgressRepositoryInstance);
8: export const markLessonAsCompletedUseCase = new MarkLessonAsCompletedUseCase(lessonProgressRepositoryInstance);
````

## File: src/infrastructure/factories/ModuleFactory.ts
````typescript
 1: import { AxiosModuleRepository } from '../adapters/AxiosModuleRepository';
 2: import { GetModulesUseCase } from '@application/use-cases/GetModulesUseCase';
 3: import { GetModuleByIdUseCase } from '@application/use-cases/GetModuleByIdUseCase';
 4: import { CreateModuleUseCase } from '@application/use-cases/CreateModuleUseCase';
 5: import { UpdateModuleUseCase } from '@application/use-cases/UpdateModuleUseCase';
 6: import { DeleteModuleUseCase } from '@application/use-cases/DeleteModuleUseCase';
 7: 
 8: export const moduleRepositoryInstance = new AxiosModuleRepository();
 9: 
10: export const getModulesUseCase = new GetModulesUseCase(moduleRepositoryInstance);
11: export const getModuleByIdUseCase = new GetModuleByIdUseCase(moduleRepositoryInstance);
12: export const createModuleUseCase = new CreateModuleUseCase(moduleRepositoryInstance);
13: export const updateModuleUseCase = new UpdateModuleUseCase(moduleRepositoryInstance);
14: export const deleteModuleUseCase = new DeleteModuleUseCase(moduleRepositoryInstance);
````

## File: src/infrastructure/http/axios-client.ts
````typescript
  1: import axios from 'axios';
  2: import { ENV } from '../config/env';
  3: import { LocalTokenStorage } from '../storage/local-token-storage';
  4: 
  5: export const axiosClient = axios.create({
  6:   baseURL: ENV.API_URL,
  7:   headers: {
  8:     'Content-Type': 'application/json',
  9:   },
 10: });
 11: 
 12: 
 13: axiosClient.interceptors.request.use(
 14:   (config) => {
 15:     const token = LocalTokenStorage.getAccessToken();
 16:     if (token && config.headers) {
 17:       config.headers.Authorization = `Bearer ${token}`;
 18:     }
 19:     return config;
 20:   },
 21:   (error) => {
 22:     return Promise.reject(error);
 23:   }
 24: );
 25: 
 26: 
 27: let isRefreshing = false;
 28: let failedQueue: any[] = [];
 29: 
 30: const processQueue = (error: any, token: string | null = null) => {
 31:   failedQueue.forEach((prom) => {
 32:     if (token) {
 33:       prom.resolve(token);
 34:     } else {
 35:       prom.reject(error);
 36:     }
 37:   });
 38:   failedQueue = [];
 39: };
 40: 
 41: axiosClient.interceptors.response.use(
 42:   (response) => response,
 43:   async (error) => {
 44:     const originalRequest = error.config;
 45: 
 46: 
 47:     if (error.response?.status === 401 && !originalRequest._retry) {
 48:       if (originalRequest.url?.includes('auth/login') || originalRequest.url?.includes('auth/refresh')) {
 49:         return Promise.reject(error);
 50:       }
 51: 
 52:       if (isRefreshing) {
 53:         return new Promise((resolve, reject) => {
 54:           failedQueue.push({ resolve, reject });
 55:         })
 56:           .then((token) => {
 57:             originalRequest.headers.Authorization = `Bearer ${token}`;
 58:             return axiosClient(originalRequest);
 59:           })
 60:           .catch((err) => {
 61:             return Promise.reject(err);
 62:           });
 63:       }
 64: 
 65:       originalRequest._retry = true;
 66:       isRefreshing = true;
 67: 
 68:       const refreshToken = LocalTokenStorage.getRefreshToken();
 69:       if (!refreshToken) {
 70:         isRefreshing = false;
 71:         LocalTokenStorage.clear();
 72:         return Promise.reject(error);
 73:       }
 74: 
 75:       try {
 76:         const response = await axios.post(`${ENV.API_URL}/auth/refresh/`, {
 77:           refresh: refreshToken,
 78:         });
 79: 
 80:         const newAccessToken = response.data.access;
 81:         LocalTokenStorage.setAccessToken(newAccessToken);
 82: 
 83:         if (response.data.refresh) {
 84:           LocalTokenStorage.setRefreshToken(response.data.refresh);
 85:         }
 86: 
 87:         processQueue(null, newAccessToken);
 88:         isRefreshing = false;
 89: 
 90:         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
 91:         return axiosClient(originalRequest);
 92:       } catch (refreshError) {
 93:         processQueue(refreshError, null);
 94:         isRefreshing = false;
 95:         LocalTokenStorage.clear();
 96: 
 97:         window.dispatchEvent(new Event('auth-logout'));
 98: 
 99:         return Promise.reject(refreshError);
100:       }
101:     }
102: 
103: 
104:     if (originalRequest) {
105:       const isGetRequest = originalRequest.method?.toLowerCase() === 'get';
106:       const isTransientError = !error.response || (error.response.status >= 500 && error.response.status <= 599);
107: 
108:       if (isGetRequest && isTransientError) {
109:         originalRequest._retryCount = originalRequest._retryCount || 0;
110:         if (originalRequest._retryCount < 2) {
111:           originalRequest._retryCount += 1;
112:           await new Promise((resolve) => setTimeout(resolve, 1000));
113:           return axiosClient(originalRequest);
114:         }
115:       }
116:     }
117: 
118:     return Promise.reject(error);
119:   }
120: );
````

## File: src/infrastructure/http/parse-api-error.ts
````typescript
 1: import axios from 'axios';
 2: 
 3: export interface ApiError {
 4:   message: string;
 5:   errors?: Record<string, string[]>;
 6:   status?: number;
 7: }
 8: 
 9: export function parseApiError(error: unknown): ApiError {
10:   if (axios.isAxiosError(error)) {
11:     const data = error.response?.data;
12:     const status = error.response?.status;
13: 
14:     if (data && typeof data === 'object') {
15:       if ('detail' in data && typeof data.detail === 'string') {
16:         return { message: data.detail, status };
17:       }
18: 
19:       if ('non_field_errors' in data && Array.isArray(data.non_field_errors)) {
20:         return { message: data.non_field_errors[0], status };
21:       }
22: 
23:       const errors: Record<string, string[]> = {};
24:       let firstMessage = 'Error de validación';
25: 
26:       for (const [key, value] of Object.entries(data)) {
27:         if (Array.isArray(value)) {
28:           errors[key] = value.map(String);
29:           if (firstMessage === 'Error de validación' && value.length > 0) {
30:             firstMessage = `${key}: ${value[0]}`;
31:           }
32:         } else if (typeof value === 'string') {
33:           errors[key] = [value];
34:           if (firstMessage === 'Error de validación') {
35:             firstMessage = value;
36:           }
37:         }
38:       }
39: 
40:       return {
41:         message: firstMessage,
42:         errors,
43:         status
44:       };
45:     }
46: 
47:     return {
48:       message: error.message || 'Error de conexión con el servidor',
49:       status
50:     };
51:   }
52: 
53:   if (error instanceof Error) {
54:     return { message: error.message };
55:   }
56: 
57:   return { message: 'Ha ocurrido un error inesperado' };
58: }
````

## File: src/infrastructure/storage/local-token-storage.ts
````typescript
 1: const ACCESS_TOKEN_KEY = 'on_courses_access_token';
 2: const REFRESH_TOKEN_KEY = 'on_courses_refresh_token';
 3: 
 4: export const LocalTokenStorage = {
 5:   getAccessToken(): string | null {
 6:     return localStorage.getItem(ACCESS_TOKEN_KEY);
 7:   },
 8: 
 9:   setAccessToken(token: string): void {
10:     localStorage.setItem(ACCESS_TOKEN_KEY, token);
11:   },
12: 
13:   removeAccessToken(): void {
14:     localStorage.removeItem(ACCESS_TOKEN_KEY);
15:   },
16: 
17:   getRefreshToken(): string | null {
18:     return localStorage.getItem(REFRESH_TOKEN_KEY);
19:   },
20: 
21:   setRefreshToken(token: string): void {
22:     localStorage.setItem(REFRESH_TOKEN_KEY, token);
23:   },
24: 
25:   removeRefreshToken(): void {
26:     localStorage.removeItem(REFRESH_TOKEN_KEY);
27:   },
28: 
29:   clear(): void {
30:     localStorage.removeItem(ACCESS_TOKEN_KEY);
31:     localStorage.removeItem(REFRESH_TOKEN_KEY);
32:   }
33: };
````

## File: src/presentation/components/Loader.tsx
````typescript
 1: import React from 'react';
 2: 
 3: export const Loader: React.FC<{ fullScreen?: boolean }> = ({ fullScreen = false }) => {
 4:   const spinner = (
 5:     <div className="flex flex-col items-center justify-center gap-3">
 6:       <div className="relative w-12 h-12">
 7:         <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-slate-200 dark:border-slate-800" />
 8:         <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
 9:       </div>
10:       <span className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">Cargando...</span>
11:     </div>
12:   );
13: 
14:   if (fullScreen) {
15:     return (
16:       <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
17:         {spinner}
18:       </div>
19:     );
20:   }
21: 
22:   return <div className="py-12 flex justify-center w-full">{spinner}</div>;
23: };
````

## File: src/presentation/components/Pagination.tsx
````typescript
  1: import React from 'react';
  2: import { ChevronLeft, ChevronRight } from 'lucide-react';
  3: 
  4: interface PaginationProps {
  5:   count: number;
  6:   currentPage: number;
  7:   pageSize: number;
  8:   onPageChange: (page: number) => void;
  9: }
 10: 
 11: export const Pagination: React.FC<PaginationProps> = ({
 12:   count,
 13:   currentPage,
 14:   pageSize,
 15:   onPageChange,
 16: }) => {
 17:   const totalPages = Math.ceil(count / pageSize);
 18: 
 19:   if (totalPages <= 1) return null;
 20: 
 21: 
 22:   const getPageNumbers = () => {
 23:     const pages = [];
 24:     const maxVisible = 5;
 25:     let start = Math.max(1, currentPage - 2);
 26:     let end = Math.min(totalPages, start + maxVisible - 1);
 27: 
 28:     if (end - start + 1 < maxVisible) {
 29:       start = Math.max(1, end - maxVisible + 1);
 30:     }
 31: 
 32:     for (let i = start; i <= end; i++) {
 33:       pages.push(i);
 34:     }
 35:     return pages;
 36:   };
 37: 
 38:   const pages = getPageNumbers();
 39: 
 40:   return (
 41:     <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 sm:px-6 dark:border-slate-800 mt-6 bg-white dark:bg-slate-900 rounded-2xl">
 42:       <div className="flex flex-1 justify-between sm:hidden">
 43:         <button
 44:           onClick={() => onPageChange(currentPage - 1)}
 45:           disabled={currentPage === 1}
 46:           className="relative inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-850"
 47:         >
 48:           Anterior
 49:         </button>
 50:         <button
 51:           onClick={() => onPageChange(currentPage + 1)}
 52:           disabled={currentPage === totalPages}
 53:           className="relative ml-3 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-850"
 54:         >
 55:           Siguiente
 56:         </button>
 57:       </div>
 58:       <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between gap-4">
 59:         <div>
 60:           <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
 61:             Mostrando página <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> de{' '}
 62:             <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span> ({count} resultados totales)
 63:           </p>
 64:         </div>
 65:         <div>
 66:           <nav className="isolate inline-flex -space-x-px rounded-xl shadow-sm gap-1" aria-label="Pagination">
 67:             <button
 68:               onClick={() => onPageChange(currentPage - 1)}
 69:               disabled={currentPage === 1}
 70:               className="relative inline-flex items-center rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-850"
 71:             >
 72:               <span className="sr-only">Anterior</span>
 73:               <ChevronLeft className="h-5 w-5" aria-hidden="true" />
 74:             </button>
 75: 
 76:             {pages.map((page) => (
 77:               <button
 78:                 key={page}
 79:                 onClick={() => onPageChange(page)}
 80:                 aria-current={page === currentPage ? 'page' : undefined}
 81:                 className={`relative inline-flex items-center rounded-xl px-4 py-2 text-sm font-bold transition-all ${
 82:                   page === currentPage
 83:                     ? 'z-10 bg-brand-500 text-white shadow-md shadow-brand-500/20'
 84:                     : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-850'
 85:                 }`}
 86:               >
 87:                 {page}
 88:               </button>
 89:             ))}
 90: 
 91:             <button
 92:               onClick={() => onPageChange(currentPage + 1)}
 93:               disabled={currentPage === totalPages}
 94:               className="relative inline-flex items-center rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:pointer-events-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-850"
 95:             >
 96:               <span className="sr-only">Siguiente</span>
 97:               <ChevronRight className="h-5 w-5" aria-hidden="true" />
 98:             </button>
 99:           </nav>
100:         </div>
101:       </div>
102:     </div>
103:   );
104: };
````

## File: src/presentation/components/Skeletons.tsx
````typescript
 1: import React from 'react';
 2: 
 3: export const CatalogSkeleton: React.FC = () => {
 4:   return (
 5:     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
 6:       {[1, 2, 3, 4].map((n) => (
 7:         <div key={n} className="flex flex-col rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden h-[380px]">
 8:           <div className="aspect-video bg-slate-250 dark:bg-slate-800" />
 9:           <div className="flex-1 p-6 space-y-4">
10:             <div className="h-5 bg-slate-250 dark:bg-slate-800 rounded-lg w-3/4" />
11:             <div className="space-y-2">
12:               <div className="h-3 bg-slate-250 dark:bg-slate-800 rounded-lg" />
13:               <div className="h-3 bg-slate-250 dark:bg-slate-800 rounded-lg w-5/6" />
14:             </div>
15:             <div className="pt-4 flex justify-between">
16:               <div className="h-4 bg-slate-250 dark:bg-slate-805 rounded-lg w-1/4" />
17:               <div className="h-4 bg-slate-250 dark:bg-slate-805 rounded-lg w-1/4" />
18:             </div>
19:           </div>
20:           <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
21:             <div className="h-5 bg-slate-250 dark:bg-slate-800 rounded-lg w-1/4" />
22:             <div className="h-8 bg-slate-250 dark:bg-slate-800 rounded-lg w-1/3" />
23:           </div>
24:         </div>
25:       ))}
26:     </div>
27:   );
28: };
29: 
30: export const DashboardSkeleton: React.FC = () => {
31:   return (
32:     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
33:       {[1, 2, 3, 4].map((n) => (
34:         <div key={n} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[220px]">
35:           <div>
36:             <div className="flex justify-between items-start gap-4 mb-4">
37:               <div className="h-6 bg-slate-250 dark:bg-slate-800 rounded-lg w-2/3" />
38:               <div className="h-5 bg-slate-250 dark:bg-slate-800 rounded-lg w-1/5" />
39:             </div>
40:             <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden mb-6 animate-pulse" />
41:             <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded-lg w-1/3" />
42:           </div>
43:           <div className="flex gap-3 mt-auto">
44:             <div className="h-10 bg-slate-250 dark:bg-slate-800 rounded-xl flex-1" />
45:             <div className="h-10 bg-slate-250 dark:bg-slate-800 rounded-xl flex-1" />
46:           </div>
47:         </div>
48:       ))}
49:     </div>
50:   );
51: };
52: 
53: export const CourseDetailSkeleton: React.FC = () => {
54:   return (
55:     <div className="animate-pulse space-y-8">
56:       {}
57:       <div className="h-8 bg-slate-250 dark:bg-slate-800 rounded-2xl w-1/3 mb-4" />
58: 
59:       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
60:         {}
61:         <div className="lg:col-span-2 space-y-6">
62:           <div className="aspect-video bg-slate-250 dark:bg-slate-800 rounded-3xl" />
63:           <div className="space-y-4 p-6 border border-slate-200 dark:border-slate-800 rounded-3xl">
64:             <div className="h-6 bg-slate-250 dark:bg-slate-800 rounded-lg w-1/4" />
65:             <div className="space-y-2">
66:               <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded-lg" />
67:               <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded-lg" />
68:               <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded-lg w-5/6" />
69:             </div>
70:           </div>
71:         </div>
72: 
73:         {}
74:         <div className="space-y-6">
75:           <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 space-y-6">
76:             <div className="h-8 bg-slate-250 dark:bg-slate-800 rounded-lg w-1/3" />
77:             <div className="h-12 bg-slate-250 dark:bg-slate-800 rounded-2xl w-full" />
78:             <div className="space-y-3">
79:               <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded-lg w-2/3" />
80:               <div className="h-4 bg-slate-250 dark:bg-slate-800 rounded-lg w-1/2" />
81:             </div>
82:           </div>
83:         </div>
84:       </div>
85:     </div>
86:   );
87: };
````

## File: src/presentation/hooks/useCategoryManagement.ts
````typescript
  1: import React, { useState, useEffect, useCallback } from 'react';
  2: import { Category } from '@domain/entities/Category';
  3: import { useAuthStore } from '../store/useAuthStore';
  4: import {
  5:   getCategoriesUseCase,
  6:   createCategoryUseCase,
  7:   updateCategoryUseCase,
  8:   deleteCategoryUseCase,
  9: } from '@infrastructure/factories/CategoryFactory';
 10: 
 11: export const useCategoryManagement = () => {
 12:   const { user } = useAuthStore();
 13:   const [categories, setCategories] = useState<Category[]>([]);
 14:   const [isLoading, setIsLoading] = useState(true);
 15:   const [search, setSearch] = useState('');
 16: 
 17:   // Pagination State
 18:   const [page, setPage] = useState(1);
 19:   const [totalCategories, setTotalCategories] = useState(0);
 20: 
 21:   // Form Modal State
 22:   const [showFormModal, setShowFormModal] = useState(false);
 23:   const [isEditing, setIsEditing] = useState(false);
 24:   const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
 25: 
 26:   const [formName, setFormName] = useState('');
 27:   const [formDescription, setFormDescription] = useState('');
 28:   const [formSlug, setFormSlug] = useState('');
 29: 
 30:   // Status indicators
 31:   const [formLoading, setFormLoading] = useState(false);
 32:   const [formError, setFormError] = useState<string | null>(null);
 33:   const [successMessage, setSuccessMessage] = useState<string | null>(null);
 34: 
 35:   const isAdmin = user?.role === 'admin';
 36: 
 37:   const loadCategories = useCallback((currentPage: number = page, searchQuery: string = search) => {
 38:     setIsLoading(true);
 39:     const params: any = {};
 40:     if (searchQuery) params.search = searchQuery;
 41:     params.page = currentPage;
 42: 
 43:     getCategoriesUseCase
 44:       .execute(params)
 45:       .then((data) => {
 46:         setCategories(data.results);
 47:         setTotalCategories(data.count);
 48:         setIsLoading(false);
 49:       })
 50:       .catch((err) => {
 51:         console.error('Failed to load categories', err);
 52:         setIsLoading(false);
 53:       });
 54:   }, [page, search]);
 55: 
 56:   useEffect(() => {
 57:     const delayDebounceFn = setTimeout(() => {
 58:       setPage(1);
 59:       loadCategories(1, search);
 60:     }, 400);
 61: 
 62:     return () => clearTimeout(delayDebounceFn);
 63:   }, [search, loadCategories]);
 64: 
 65:   const handleOpenCreate = () => {
 66:     setIsEditing(false);
 67:     setEditingCategoryId(null);
 68:     setFormName('');
 69:     setFormDescription('');
 70:     setFormSlug('');
 71:     setFormError(null);
 72:     setShowFormModal(true);
 73:   };
 74: 
 75:   const handleOpenEdit = (category: Category) => {
 76:     setIsEditing(true);
 77:     setEditingCategoryId(category.id);
 78:     setFormName(category.name);
 79:     setFormDescription(category.description || '');
 80:     setFormSlug(category.slug);
 81:     setFormError(null);
 82:     setShowFormModal(true);
 83:   };
 84: 
 85:   const handleNameChange = (val: string) => {
 86:     setFormName(val);
 87:     const generatedSlug = val
 88:       .toLowerCase()
 89:       .normalize('NFD')
 90:       .replace(/[\u0300-\u036f]/g, '')
 91:       .replace(/[^a-z0-9]+/g, '-')
 92:       .replace(/(^-|-$)+/g, '');
 93:     setFormSlug(generatedSlug);
 94:   };
 95: 
 96:   const handleSubmit = async (e: React.FormEvent) => {
 97:     e.preventDefault();
 98:     setFormError(null);
 99: 
100:     if (!formName.trim()) {
101:       setFormError('El nombre de la categoría es obligatorio.');
102:       return;
103:     }
104: 
105:     if (!formSlug.trim()) {
106:       setFormError('El slug de la categoría es obligatorio.');
107:       return;
108:     }
109: 
110:     setFormLoading(true);
111: 
112:     const payload = {
113:       name: formName.trim(),
114:       description: formDescription.trim() || undefined,
115:       slug: formSlug.trim(),
116:     };
117: 
118:     try {
119:       if (isEditing && editingCategoryId !== null) {
120:         await updateCategoryUseCase.execute(editingCategoryId, payload);
121:         setSuccessMessage('Categoría actualizada con éxito');
122:       } else {
123:         await createCategoryUseCase.execute(payload);
124:         setSuccessMessage('Categoría creada con éxito');
125:       }
126: 
127:       setShowFormModal(false);
128:       loadCategories();
129:       setTimeout(() => setSuccessMessage(null), 4000);
130:     } catch (err: any) {
131:       setFormError(err.message || 'Error al guardar la categoría');
132:     } finally {
133:       setFormLoading(false);
134:     }
135:   };
136: 
137:   const handleDelete = async (categoryId: number) => {
138:     if (!isAdmin) {
139:       alert('Solo los administradores tienen permisos para eliminar recursos.');
140:       return;
141:     }
142: 
143:     try {
144:       await deleteCategoryUseCase.execute(categoryId);
145:       setSuccessMessage('Categoría eliminada con éxito');
146:       loadCategories();
147:       setTimeout(() => setSuccessMessage(null), 4000);
148:     } catch (err: any) {
149:       alert(err.message || 'Error al eliminar la categoría');
150:     }
151:   };
152: 
153:   return {
154:     categories,
155:     isLoading,
156:     search,
157:     setSearch,
158:     page,
159:     setPage,
160:     totalCategories,
161:     showFormModal,
162:     setShowFormModal,
163:     isEditing,
164:     formName,
165:     setFormName,
166:     formDescription,
167:     setFormDescription,
168:     formSlug,
169:     setFormSlug,
170:     formLoading,
171:     formError,
172:     successMessage,
173:     isAdmin,
174:     loadCategories,
175:     handleOpenCreate,
176:     handleOpenEdit,
177:     handleNameChange,
178:     handleSubmit,
179:     handleDelete,
180:   };
181: };
````

## File: src/presentation/store/useThemeStore.ts
````typescript
 1: import { create } from 'zustand';
 2: 
 3: interface ThemeState {
 4:   theme: 'light' | 'dark';
 5:   toggleTheme: () => void;
 6:   initTheme: () => void;
 7: }
 8: 
 9: export const useThemeStore = create<ThemeState>((set, get) => ({
10:   theme: 'light',
11: 
12:   toggleTheme: () => {
13:     const nextTheme = get().theme === 'light' ? 'dark' : 'light';
14:     localStorage.setItem('theme', nextTheme);
15: 
16:     if (nextTheme === 'dark') {
17:       document.documentElement.classList.add('dark');
18:     } else {
19:       document.documentElement.classList.remove('dark');
20:     }
21: 
22:     set({ theme: nextTheme });
23:   },
24: 
25:   initTheme: () => {
26:     const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
27:     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
28: 
29:     const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
30: 
31:     if (initialTheme === 'dark') {
32:       document.documentElement.classList.add('dark');
33:     } else {
34:       document.documentElement.classList.remove('dark');
35:     }
36: 
37:     set({ theme: initialTheme });
38:   }
39: }));
````

## File: src/presentation/utils/cn.ts
````typescript
1: import { type ClassValue, clsx } from 'clsx';
2: import { twMerge } from 'tailwind-merge';
3: 
4: export function cn(...inputs: ClassValue[]) {
5:   return twMerge(clsx(inputs));
6: }
````

## File: src/presentation/utils/jwt-helper.ts
````typescript
 1: export interface JwtPayload {
 2:   token_type: string;
 3:   exp: number;
 4:   iat: number;
 5:   jti: string;
 6:   user_id: number;
 7: }
 8: 
 9: export function decodeJwt(token: string): JwtPayload | null {
10:   try {
11:     const base64Url = token.split('.')[1];
12:     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
13:     const jsonPayload = decodeURIComponent(
14:       window
15:         .atob(base64)
16:         .split('')
17:         .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
18:         .join('')
19:     );
20:     return JSON.parse(jsonPayload);
21:   } catch (error) {
22:     console.error('Failed to decode JWT token', error);
23:     return null;
24:   }
25: }
````

## File: src/App.css
````css
1: 
````

## File: src/App.tsx
````typescript
1: import React from 'react';
2: import { AppRouter } from './presentation/router/AppRouter';
3: 
4: function App() {
5:   return <AppRouter />;
6: }
7: 
8: export default App;
````

## File: src/main.tsx
````typescript
 1: import { StrictMode } from 'react'
 2: import { createRoot } from 'react-dom/client'
 3: import './index.css'
 4: import App from './App.tsx'
 5: 
 6: createRoot(document.getElementById('root')!).render(
 7:   <StrictMode>
 8:     <App />
 9:   </StrictMode>,
10: )
````

## File: .env.example
````
1: VITE_API_URL=https://on-courses-api.uaeftt-ute.site/api
````

## File: .gitignore
````
 1: # Logs
 2: logs
 3: *.log
 4: npm-debug.log*
 5: yarn-debug.log*
 6: yarn-error.log*
 7: pnpm-debug.log*
 8: lerna-debug.log*
 9: 
10: node_modules
11: dist
12: dist-ssr
13: *.local
14: 
15: # Editor directories and files
16: .vscode/*
17: !.vscode/extensions.json
18: .idea
19: .DS_Store
20: *.suo
21: *.ntvs*
22: *.njsproj
23: *.sln
24: *.sw?
25: 
26: # VITE
27: .env
````

## File: .oxlintrc.json
````json
1: {
2:   "$schema": "./node_modules/oxlint/configuration_schema.json",
3:   "plugins": ["react", "typescript", "oxc"],
4:   "rules": {
5:     "react/rules-of-hooks": "error",
6:     "react/only-export-components": ["warn", { "allowConstantExport": true }]
7:   }
8: }
````

## File: digital-ocean-deployment.md
````markdown
  1: # Guía de Despliegue en DigitalOcean - Proyecto OnCourses
  2: 
  3: Esta guía contiene la configuración y los pasos necesarios para desplegar el frontend de **OnCourses Web** en tu Droplet de **DigitalOcean**, alineado con tu dominio y estructura del pipeline de CI/CD.
  4: 
  5: ---
  6: 
  7: ## 🏗️ 1. Preparación del Servidor (Droplet)
  8: 
  9: Conéctate a tu Droplet mediante SSH desde tu terminal local:
 10: 
 11: ```bash
 12: # Acceder por SSH
 13: ssh root@147.182.170.20
 14: 
 15: # Actualizar el sistema e instalar Nginx si no está instalado
 16: apt update && apt upgrade -y
 17: apt install nginx -y
 18: 
 19: # Asegurar que Nginx arranque automáticamente
 20: systemctl start nginx
 21: systemctl enable nginx
 22: 
 23: # Permitir tráfico Web en el Firewall
 24: ufw allow 'Nginx Full'
 25: ```
 26: 
 27: ---
 28: 
 29: ## ⚙️ 2. Configuración de Nginx en la VM
 30: 
 31: Nginx servirá los archivos estáticos de tu React App y manejará el enrutamiento interno para evitar errores 404 al recargar páginas como `/admin` o `/login`.
 32: 
 33: 1. Crea el archivo de configuración del sitio:
 34:    ```bash
 35:    nano /etc/nginx/sites-available/on-courses
 36:    ```
 37: 
 38: 2. Pega el siguiente bloque de configuración:
 39:    ```nginx
 40:    server {
 41:        listen 80;
 42:        server_name on-courses.uaeftt-ute.site 147.182.170.20;
 43: 
 44:        root /var/www/on-courses-frontend;
 45:        index index.html;
 46: 
 47:        # Enrutamiento de React Router (Evita errores 404)
 48:        location / {
 49:            try_files $uri $uri/ /index.html;
 50:        }
 51: 
 52:        # Proxy opcional hacia Django si corre en la misma máquina o redirigido
 53:        location /api/ {
 54:            proxy_pass http://127.0.0.1:8000/api/;
 55:            proxy_set_header Host $host;
 56:            proxy_set_header X-Real-IP $remote_addr;
 57:            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 58:            proxy_set_header X-Forwarded-Proto $scheme;
 59:        }
 60:    }
 61:    ```
 62: 
 63: 3. Guarda (`Ctrl+O`, `Enter`) y sal (`Ctrl+X`).
 64: 
 65: 4. Ejecuta los comandos para activar la configuración:
 66:    ```bash
 67:    # Habilitar el sitio enlazándolo a sites-enabled
 68:    ln -s /etc/nginx/sites-available/on-courses /etc/nginx/sites-enabled/
 69: 
 70:    # Remover configuración por defecto si existe
 71:    rm -f /etc/nginx/sites-enabled/default
 72: 
 73:    # Validar la sintaxis de Nginx
 74:    nginx -t
 75: 
 76:    # Crear la carpeta de despliegue
 77:    mkdir -p /var/www/on-courses-frontend
 78: 
 79:    # Reiniciar Nginx
 80:    systemctl restart nginx
 81: 
 82:    # Asignar permisos de lectura a Nginx
 83:    chown -R www-data:www-data /var/www/on-courses-frontend
 84:    chmod -R 755 /var/www/on-courses-frontend
 85:    ```
 86: 
 87: ---
 88: 
 89: ## 🤖 3. Despliegue Automatizado (GitHub Actions CI/CD)
 90: 
 91: El pipeline configurado en `.github/workflows/deploy.yml` compilará y subirá los archivos automáticamente al hacer push a la rama **`main`**.
 92: 
 93: Asegúrate de registrar las siguientes variables secretas en tu repositorio en GitHub (**Settings** ➔ **Secrets and variables** ➔ **Actions** ➔ **New repository secret**):
 94: 
 95: | Secret Name | Value | Description |
 96: | :--- | :--- | :--- |
 97: | **`VPS_HOST`** | `147.182.170.20` | La dirección IP pública de tu Droplet. |
 98: | **`VPS_USER`** | `root` | El usuario SSH de tu Droplet (usualmente `root`). |
 99: | **`VPS_KEY`** | `-----BEGIN OPENSSH PRIVATE KEY----- ...` | Copia la clave SSH privada que utilizas para conectarte a tu Droplet. |
100: | **`REACT_ENV`** | `VITE_API_URL=https://on-courses-api.uaeftt-ute.site/api` | Las variables de entorno de producción para el build de React. |
101: 
102: ---
103: 
104: ## 🔒 4. Habilitar HTTPS con SSL Certbot
105: 
106: Para habilitar HTTPS de forma gratuita para tu dominio `on-courses.uaeftt-ute.site`:
107: 
108: ```bash
109: # Instalar Certbot
110: apt install certbot python3-certbot-nginx -y
111: 
112: # Obtener e instalar el certificado para tu dominio
113: certbot --nginx -d on-courses.uaeftt-ute.site
114: ```
115: *Sigue las instrucciones en la pantalla y selecciona la opción de redirigir todo el tráfico HTTP a HTTPS de forma automática.*
````

## File: index.html
````html
 1: <!doctype html>
 2: <html lang="en">
 3:   <head>
 4:     <meta charset="UTF-8" />
 5:     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
 6:     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 7:     <title>on-courses-web</title>
 8:   </head>
 9:   <body>
10:     <div id="root"></div>
11:     <script type="module" src="/src/main.tsx"></script>
12:   </body>
13: </html>
````

## File: package.json
````json
 1: {
 2:   "name": "on-courses-web",
 3:   "private": true,
 4:   "version": "0.0.0",
 5:   "type": "module",
 6:   "scripts": {
 7:     "dev": "vite",
 8:     "build": "tsc -b && vite build",
 9:     "lint": "oxlint",
10:     "preview": "vite preview"
11:   },
12:   "dependencies": {
13:     "axios": "^1.18.1",
14:     "clsx": "^2.1.1",
15:     "lucide-react": "^1.24.0",
16:     "react": "^19.2.7",
17:     "react-dom": "^19.2.7",
18:     "react-router-dom": "^7.18.1",
19:     "tailwind-merge": "^3.6.0",
20:     "zustand": "^5.0.14"
21:   },
22:   "devDependencies": {
23:     "@tailwindcss/vite": "^4.3.2",
24:     "@types/node": "^24.13.2",
25:     "@types/react": "^19.2.17",
26:     "@types/react-dom": "^19.2.3",
27:     "@vitejs/plugin-react": "^6.0.3",
28:     "oxlint": "^1.71.0",
29:     "tailwindcss": "^4.3.2",
30:     "typescript": "~6.0.2",
31:     "vite": "^8.1.1"
32:   }
33: }
````

## File: README.md
````markdown
  1: # On-Courses Frontend 🎓
  2: 
  3: Frontend premium, responsivo y de alto rendimiento desarrollado en **React**, **Vite** y **TypeScript**, estilizado con **TailwindCSS v4** y estructurado bajo los principios de **Arquitectura Limpia**.
  4: 
  5: Este proyecto se conecta a la API REST de Django en producción: `https://on-courses-api.uaeftt-ute.site/api/`
  6: 
  7: ---
  8: 
  9: ## 🛠️ Arquitectura del Proyecto
 10: 
 11: El proyecto sigue una estructura desacoplada que separa la lógica del negocio de los detalles de infraestructura y presentación:
 12: 
 13: ```text
 14: src/
 15: ├── domain/                         # Capa de Dominio: Reglas puras y tipos (Agnóstico a frameworks)
 16: │   ├── entities/                   # Modelos de datos (User, Course, Lesson, Enrollment)
 17: │   ├── enums/                      # Definiciones de constantes/roles (UserRole)
 18: │   └── ports/                      # Interfaces y abstracciones de comunicación (IAuthRepository)
 19: │
 20: ├── application/                    # Capa de Aplicación: Casos de uso
 21: │   ├── use-cases/                  # Lógica orquestadora (LoginUseCase, GetCoursesUseCase)
 22: │   └── dtos/                       # Estructuras de datos de entrada/salida (AuthDto)
 23: │
 24: ├── infrastructure/                 # Capa de Infraestructura: Adaptadores y librerías externas
 25: │   ├── config/                     # Configuración de variables de entorno y constantes de red
 26: │   ├── http/                       # Cliente centralizado (AxiosClient) y formateo de errores
 27: │   ├── storage/                    # Persistencia del token JWT (LocalTokenStorage)
 28: │   ├── adapters/                   # Repositorios concretos (AxiosAuthRepository, AxiosCourseRepository)
 29: │   └── factories/                  # Instanciadores e inyectores de dependencia (AuthFactory)
 30: │
 31: └── presentation/                   # Capa de Presentación: UI y estados reactivos
 32:     ├── store/                      # Estados globales (Zustand: useAuthStore, useThemeStore)
 33:     ├── router/                     # Enrutador con guardias de autenticación y de roles
 34:     ├── components/                 # Componentes globales y modulares (Navbar, Footer, Button)
 35:     └── pages/                      # Vistas y pantallas (HomePage, StudentDashboard, CatalogPage, etc.)
 36: ```
 37: 
 38: ---
 39: 
 40: ## 🚀 Tecnologías Principales
 41: 
 42: *   **Core:** React 19, TypeScript 6, Vite 8.
 43: *   **Estilos:** TailwindCSS v4 con soporte nativo de Light/Dark Mode mediante la variante `dark:`.
 44: *   **Gestión de Estado:** Zustand (para el flujo reactivo de sesión y persistencia del tema).
 45: *   **Cliente HTTP:** Axios con interceptores automáticos para inyectar el token JWT y reintentar peticiones fallidas mediante refresco de token.
 46: 
 47: ---
 48: 
 49: ## ⚙️ Variables de Entorno
 50: 
 51: Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:
 52: 
 53: ```env
 54: VITE_API_URL=https://on-courses-api.uaeftt-ute.site/api
 55: ```
 56: 
 57: ---
 58: 
 59: ## 💻 Instalación y Ejecución Local
 60: 
 61: Sigue estos pasos para arrancar el servidor de desarrollo local:
 62: 
 63: 1.  **Clona el repositorio:**
 64:     ```bash
 65:     git clone https://github.com/AlexLopezF04/on-courses-web.git
 66:     cd on-courses-web
 67:     ```
 68: 2.  **Instala las dependencias:**
 69:     ```bash
 70:     npm install
 71:     ```
 72: 3.  **Inicia el servidor de desarrollo:**
 73:     ```bash
 74:     npm run dev
 75:     ```
 76: 4.  **Compila para producción (bundle optimizado):**
 77:     ```bash
 78:     npm run build
 79:     ```
 80: 5.  **Revisa la calidad del código:**
 81:     ```bash
 82:     npm run lint
 83:     ```
 84: 
 85: ---
 86: 
 87: ## 🤖 Pipeline CI/CD (GitHub Actions)
 88: 
 89: El proyecto incluye un flujo automático de Integración Continua (CI) y Despliegue Continuo (CD) configurado en [.github/workflows/deploy.yml](file:///.github/workflows/deploy.yml).
 90: 
 91: ### Flujo de la Pipeline:
 92: 1.  **Activación:** Se ejecuta automáticamente ante cada push a la rama `main`.
 93: 2.  **Linting & Testing:** Descarga las dependencias e inicia el compilador de TypeScript (`tsc`) y el formateador de calidad (`oxlint`/`eslint`) para validar el código.
 94: 3.  **Build:** Compila el frontend generando los archivos estáticos listos en el directorio `dist/`.
 95: 4.  **Despliegue a VPS:** Transfiere de forma segura la compilación mediante protocolo SSH/SCP hacia el directorio web de producción del VPS (ej: `/var/www/on-courses-frontend`).
 96: 5.  **Recarga de Nginx:** Reinicia de forma remota y sin interrupciones el servidor Nginx en el VPS para servir la nueva versión con el certificado SSL (Let's Encrypt).
 97: 
 98: ---
 99: 
100: ## 🔑 Credenciales de Prueba (Entorno de Producción)
101: 
102: Para facilitar la evaluación docente, se encuentran creadas y configuradas en el backend las siguientes cuentas con diferentes privilegios y roles:
103: 
104: 1.  **Administrador (Admin):**
105:     *   **Usuario:** `admin_test`
106:     *   **Contraseña:** `admin_Pass123` (o `adminPass123`)
107:     *   *Permisos:* Gestión completa (CRUD) de Cursos, Categorías y Temarios.
108: 
109: 2.  **Profesor (Professor):**
110:     *   **Usuario:** `prof_test`
111:     *   **Contraseña:** `profPass123` (o la contraseña definida en tu base de datos)
112:     *   *Permisos:* Creación y edición de Cursos, Categorías y Temarios. Botones de eliminación bloqueados en la UI.
113: 
114: 3.  **Estudiante (Student):**
115:     *   **Usuario:** `student_test`
116:     *   **Contraseña:** `studentPass123` (o la contraseña definida en tu base de datos)
117:     *   *Permisos:* Acceso público a catálogo y compra/inscripción de cursos, visualización de clases y marcado de progreso.
118: 
119: ---
120: 
121: ## 🔗 Enlaces del Proyecto en Producción
122: 
123: *   **Aplicación Frontend:** [https://on-courses.uaeftt-ute.site](https://on-courses.uaeftt-ute.site)
124: *   **Servicio REST API (Backend):** [https://on-courses-api.uaeftt-ute.site/api/](https://on-courses-api.uaeftt-ute.site/api/)
````

## File: tsconfig.app.json
````json
 1: {
 2:   "compilerOptions": {
 3:     "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
 4:     "target": "es2023",
 5:     "lib": ["ES2023", "DOM"],
 6:     "module": "esnext",
 7:     "types": ["vite/client"],
 8:     "allowArbitraryExtensions": true,
 9:     "skipLibCheck": true,
10: 
11:     /* Bundler mode */
12:     "moduleResolution": "bundler",
13:     "allowImportingTsExtensions": true,
14:     "verbatimModuleSyntax": false,
15:     "moduleDetection": "force",
16:     "noEmit": true,
17:     "jsx": "react-jsx",
18: 
19:     /* Linting */
20:     "noUnusedLocals": false,
21:     "noUnusedParameters": false,
22:     "erasableSyntaxOnly": false,
23:     "noFallthroughCasesInSwitch": true,
24: 
25:     /* Path Aliases */
26:     "paths": {
27:       "@/*": ["./src/*"],
28:       "@domain/*": ["./src/domain/*"],
29:       "@application/*": ["./src/application/*"],
30:       "@infrastructure/*": ["./src/infrastructure/*"],
31:       "@presentation/*": ["./src/presentation/*"]
32:     }
33:   },
34:   "include": ["src"]
35: }
````

## File: tsconfig.json
````json
1: {
2:   "files": [],
3:   "references": [
4:     { "path": "./tsconfig.app.json" },
5:     { "path": "./tsconfig.node.json" }
6:   ]
7: }
````

## File: tsconfig.node.json
````json
 1: {
 2:   "compilerOptions": {
 3:     "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
 4:     "target": "es2023",
 5:     "lib": ["ES2023"],
 6:     "types": ["node"],
 7:     "skipLibCheck": true,
 8: 
 9:     /* Bundler mode */
10:     "module": "nodenext",
11:     "allowImportingTsExtensions": true,
12:     "verbatimModuleSyntax": true,
13:     "moduleDetection": "force",
14:     "noEmit": true,
15: 
16:     /* Linting */
17:     "noUnusedLocals": true,
18:     "noUnusedParameters": true,
19:     "erasableSyntaxOnly": true,
20:     "noFallthroughCasesInSwitch": true
21:   },
22:   "include": ["vite.config.ts"]
23: }
````

## File: vite.config.ts
````typescript
 1: import { defineConfig } from 'vite'
 2: import react from '@vitejs/plugin-react'
 3: import tailwindcss from '@tailwindcss/vite'
 4: import path from 'path'
 5: 
 6: 
 7: export default defineConfig({
 8:   plugins: [react(), tailwindcss()],
 9:   resolve: {
10:     alias: {
11:       '@': path.resolve(__dirname, './src'),
12:       '@domain': path.resolve(__dirname, './src/domain'),
13:       '@application': path.resolve(__dirname, './src/application'),
14:       '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
15:       '@presentation': path.resolve(__dirname, './src/presentation'),
16:     },
17:   },
18: })
````

## File: .agents/AGENTS.md
````markdown
1: # Git Commit & Merge Naming Policy
2: 
3: When committing and merging changes:
4: 1. Every commit on `dev` must have a clear, conventional commit message detailing the exact feature or fix (e.g., `feat(preview): ...`, `fix(theme): ...`, `style(layout): ...`).
5: 2. When merging `dev` into `main`, NEVER use default `git merge dev` (which creates generic `Merge branch 'dev'`).
6: 3. Always supply an explicit descriptive commit message for the merge to `main`:
7:    `git merge dev -m "<descriptive message matching the changes made>"`
8: 4. This ensures GitHub Actions workflow runs on `main` display clean, informative run titles corresponding to the deployed feature or fix.
````

## File: src/domain/entities/Enrollment.ts
````typescript
 1: export interface Enrollment {
 2:   id: number;
 3:   user: number;
 4:   user_name: string;
 5:   course: number;
 6:   course_title: string;
 7:   enrolled_at: string;
 8:   is_active: boolean;
 9:   total_progress: string;
10:   last_lesson_title?: string;
11:   last_module_title?: string;
12: }
````

## File: src/presentation/components/category-management/CategoryTable.tsx
````typescript
 1: import React from 'react';
 2: import { Category } from '@domain/entities/Category';
 3: import { Pencil, Trash2 } from 'lucide-react';
 4: 
 5: interface CategoryTableProps {
 6:   categories: Category[];
 7:   isAdmin: boolean;
 8:   onEdit: (category: Category) => void;
 9:   onDelete: (id: number) => void;
10: }
11: 
12: export const CategoryTable: React.FC<CategoryTableProps> = ({
13:   categories,
14:   isAdmin,
15:   onEdit,
16:   onDelete,
17: }) => {
18:   return (
19:     <table className="w-full text-left border-collapse text-xs">
20:       <thead>
21:         <tr className="border-b-2 border-slate-950 bg-slate-100 dark:bg-slate-950 text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
22:           <th className="px-6 py-3.5">ID</th>
23:           <th className="px-6 py-3.5">Nombre</th>
24:           <th className="px-6 py-3.5">Slug</th>
25:           <th className="px-6 py-3.5">Descripción</th>
26:           <th className="px-6 py-3.5 text-right">Acciones</th>
27:         </tr>
28:       </thead>
29:       <tbody className="divide-y-2 divide-slate-100 dark:divide-slate-850 font-medium text-slate-800 dark:text-slate-200">
30:         {categories.length > 0 ? (
31:           categories.map((category) => (
32:             <tr
33:               key={category.id}
34:               className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
35:             >
36:               <td className="px-6 py-4 font-mono font-bold text-slate-400">#{category.id}</td>
37:               <td className="px-6 py-4 font-extrabold text-slate-950 dark:text-white">
38:                 {category.name}
39:               </td>
40:               <td className="px-6 py-4">
41:                 <span className="border border-slate-950 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-950 dark:text-slate-200">
42:                   {category.slug}
43:                 </span>
44:               </td>
45:               <td className="px-6 py-4 text-slate-600 dark:text-slate-400 max-w-xs truncate font-medium">
46:                 {category.description || <span className="italic text-slate-400">Sin descripción</span>}
47:               </td>
48:               <td className="px-6 py-4 text-right">
49:                 <div className="flex justify-end gap-1.5">
50:                   <button
51:                     onClick={() => onEdit(category)}
52:                     className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-[10px] uppercase tracking-wider border border-slate-950 hover:bg-slate-200 cursor-pointer"
53:                     title="Editar"
54:                   >
55:                     <Pencil className="h-3.5 w-3.5" />
56:                   </button>
57:                   {isAdmin && (
58:                     <button
59:                       onClick={() => onDelete(category.id)}
60:                       className="px-2.5 py-1 bg-rose-500 text-white font-bold text-[10px] uppercase tracking-wider border border-slate-950 hover:bg-rose-600 cursor-pointer"
61:                       title="Eliminar"
62:                     >
63:                       <Trash2 className="h-3.5 w-3.5" />
64:                     </button>
65:                   )}
66:                 </div>
67:               </td>
68:             </tr>
69:           ))
70:         ) : (
71:           <tr>
72:             <td colSpan={5} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
73:               No se encontraron categorías cargadas.
74:             </td>
75:           </tr>
76:         )}
77:       </tbody>
78:     </table>
79:   );
80: };
````

## File: src/presentation/components/lesson-management/CoursePreviewModal.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { Course } from '@domain/entities/Course';
  3: import { Module } from '@domain/entities/Module';
  4: import { Lesson } from '@domain/entities/Lesson';
  5: import { X, Play, BookOpen, Clock, Award } from 'lucide-react';
  6: import { Button } from '../Button';
  7: 
  8: interface CoursePreviewModalProps {
  9:   isOpen: boolean;
 10:   onClose: () => void;
 11:   course: Course | null;
 12:   modules: Module[];
 13:   lessons: Lesson[];
 14:   initialLessonId?: number | null;
 15: }
 16: 
 17: export const CoursePreviewModal: React.FC<CoursePreviewModalProps> = ({
 18:   isOpen,
 19:   onClose,
 20:   course,
 21:   modules,
 22:   lessons,
 23:   initialLessonId,
 24: }) => {
 25:   const [activeTab, setActiveTab] = useState<'course' | 'player'>('player');
 26:   const [selectedLessonId, setSelectedLessonId] = useState<number | null>(
 27:     initialLessonId || (lessons[0]?.id ?? null)
 28:   );
 29: 
 30:   if (!isOpen || !course) return null;
 31: 
 32:   const currentLesson = lessons.find((l) => l.id === selectedLessonId) || lessons[0];
 33: 
 34:   const sanitizeUrl = (url?: string) => {
 35:     if (!url) return '';
 36:     if (url.includes('youtube.com/watch?v=')) {
 37:       return url.replace('watch?v=', 'embed/');
 38:     }
 39:     if (url.includes('youtu.be/')) {
 40:       return url.replace('youtu.be/', 'youtube.com/embed/');
 41:     }
 42:     return url;
 43:   };
 44: 
 45:   return (
 46:     <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
 47:       <div className="w-full max-w-6xl h-[90vh] border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_#00b835] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
 48: 
 49:         {/* Retro OS Chrome Top Bar Header */}
 50:         <div className="flex items-center justify-between px-4 py-2 bg-slate-950 text-white border-b-2 border-slate-950 shrink-0">
 51:           <div className="flex items-center gap-2">
 52:             <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
 53:             <span className="text-xs font-mono font-black uppercase tracking-wider text-emerald-400">
 54:               👁️ MODO VISTA PREVIA DE ESTUDIANTE · {course.title}
 55:             </span>
 56:           </div>
 57: 
 58:           <div className="flex items-center gap-3">
 59:             {/* View Selector Tabs */}
 60:             <div className="flex border border-slate-700 bg-slate-900 p-0.5">
 61:               <button
 62:                 type="button"
 63:                 onClick={() => setActiveTab('player')}
 64:                 className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all cursor-pointer ${
 65:                   activeTab === 'player'
 66:                     ? 'bg-[#00cc33] text-slate-950 font-black'
 67:                     : 'text-slate-300 hover:text-white'
 68:                 }`}
 69:               >
 70:                 Reproductor de Lecciones
 71:               </button>
 72:               <button
 73:                 type="button"
 74:                 onClick={() => setActiveTab('course')}
 75:                 className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all cursor-pointer ${
 76:                   activeTab === 'course'
 77:                     ? 'bg-[#00cc33] text-slate-950 font-black'
 78:                     : 'text-slate-300 hover:text-white'
 79:                 }`}
 80:               >
 81:                 Ficha del Curso
 82:               </button>
 83:             </div>
 84: 
 85:             <button
 86:               type="button"
 87:               onClick={onClose}
 88:               className="p-1 border border-slate-700 bg-rose-600 text-white hover:bg-rose-700 cursor-pointer"
 89:             >
 90:               <X className="h-4 w-4" />
 91:             </button>
 92:           </div>
 93:         </div>
 94: 
 95:         {}
 96:         {activeTab === 'course' ? (
 97: 
 98:           <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-slate-50 dark:bg-slate-900">
 99:             <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
100:               <div className="lg:col-span-2 space-y-6">
101:                 <span className="inline-block px-3 py-1 border-2 border-slate-950 bg-[#00cc33] text-slate-950 font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
102:                   {course.category_name || 'Desarrollo'}
103:                 </span>
104:                 <h1 className="font-display text-3xl font-black text-slate-950 dark:text-white">
105:                   {course.title}
106:                 </h1>
107:                 <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
108:                   {course.description}
109:                 </p>
110: 
111:                 {}
112:                 <div className="grid grid-cols-3 gap-3 border-y-2 border-slate-950 py-4">
113:                   <div className="border border-slate-950 p-2 text-center bg-white dark:bg-slate-950">
114:                     <Clock className="h-4 w-4 text-[#00cc33] mx-auto mb-1" />
115:                     <span className="text-[10px] uppercase font-bold block text-slate-500">Lecciones</span>
116:                     <span className="text-xs font-black">{lessons.length} temas</span>
117:                   </div>
118:                   <div className="border border-slate-950 p-2 text-center bg-white dark:bg-slate-950">
119:                     <BookOpen className="h-4 w-4 text-[#00cc33] mx-auto mb-1" />
120:                     <span className="text-[10px] uppercase font-bold block text-slate-500">Módulos</span>
121:                     <span className="text-xs font-black">{modules.length} secciones</span>
122:                   </div>
123:                   <div className="border border-slate-950 p-2 text-center bg-white dark:bg-slate-950">
124:                     <Award className="h-4 w-4 text-[#00cc33] mx-auto mb-1" />
125:                     <span className="text-[10px] uppercase font-bold block text-slate-500">Certificado</span>
126:                     <span className="text-xs font-black">Al concluir</span>
127:                   </div>
128:                 </div>
129: 
130:                 {}
131:                 <div className="space-y-3">
132:                   <h3 className="font-extrabold text-sm uppercase tracking-wider">Plan de Estudios ({modules.length} Módulos)</h3>
133:                   {modules.map((mod, i) => (
134:                     <div key={mod.id} className="border-2 border-slate-950 bg-white dark:bg-slate-950 overflow-hidden">
135:                       <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 border-b-2 border-slate-950 flex justify-between items-center">
136:                         <span className="text-xs font-black text-slate-950 dark:text-white">Sección {i + 1}: {mod.title}</span>
137:                         <span className="text-[10px] font-mono font-bold bg-[#00cc33] text-slate-950 px-2 py-0.5 border border-slate-950">
138:                           {lessons.filter(l => l.module === mod.id).length} lecciones
139:                         </span>
140:                       </div>
141:                     </div>
142:                   ))}
143:                 </div>
144:               </div>
145: 
146:               {}
147:               <div className="lg:col-span-1">
148:                 <div className="border-2 border-slate-950 bg-white dark:bg-slate-950 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] space-y-4">
149:                   <div className="aspect-video w-full border-2 border-slate-950 overflow-hidden bg-slate-900">
150:                     {course.cover_image ? (
151:                       <img src={course.cover_image} alt={course.title} className="w-full h-full object-cover" />
152:                     ) : (
153:                       <div className="flex h-full items-center justify-center bg-[#00cc33] text-slate-950">
154:                         <BookOpen className="h-10 w-10" />
155:                       </div>
156:                     )}
157:                   </div>
158:                   <div>
159:                     <span className="text-xs text-slate-500 font-bold uppercase">Precio del Curso</span>
160:                     <div className="text-2xl font-black">${course.price} USD</div>
161:                   </div>
162:                   <Button className="w-full" onClick={() => setActiveTab('player')}>
163:                     Ver reproductor de clases &rarr;
164:                   </Button>
165:                 </div>
166:               </div>
167:             </div>
168:           </div>
169:         ) : (
170: 
171:           <div className="flex-1 flex overflow-hidden">
172:             {}
173:             <aside className="w-72 border-r-2 border-slate-950 bg-slate-100 dark:bg-slate-900 flex flex-col h-full shrink-0">
174:               <div className="p-3 border-b-2 border-slate-950 bg-slate-200 dark:bg-slate-950">
175:                 <span className="text-[10px] font-mono font-black uppercase text-slate-500 dark:text-slate-400 block">TEMARIO INTERACTIVO</span>
176:                 <span className="text-xs font-black line-clamp-1">{course.title}</span>
177:               </div>
178: 
179:               <div className="flex-1 overflow-y-auto p-3 space-y-4">
180:                 {modules.map((mod, i) => {
181:                   const modLessons = lessons.filter((l) => l.module === mod.id);
182:                   return (
183:                     <div key={mod.id} className="space-y-1.5">
184:                       <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
185:                         Sección {i + 1}: {mod.title}
186:                       </span>
187:                       <div className="space-y-1">
188:                         {modLessons.map((les) => {
189:                           const isSelected = les.id === currentLesson?.id;
190:                           return (
191:                             <button
192:                               key={les.id}
193:                               type="button"
194:                               onClick={() => setSelectedLessonId(les.id)}
195:                               className={`w-full text-left flex items-center justify-between px-2.5 py-2 border border-slate-950 text-xs font-bold transition-all cursor-pointer ${
196:                                 isSelected
197:                                   ? 'bg-[#00cc33] text-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
198:                                   : 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 hover:bg-slate-200'
199:                               }`}
200:                             >
201:                               <div className="flex items-center gap-1.5 truncate">
202:                                 <Play className="h-3 w-3 shrink-0" />
203:                                 <span className="truncate">{les.title}</span>
204:                               </div>
205:                             </button>
206:                           );
207:                         })}
208:                       </div>
209:                     </div>
210:                   );
211:                 })}
212:               </div>
213:             </aside>
214: 
215:             {}
216:             <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-slate-950">
217:               {currentLesson ? (
218:                 <div className="max-w-3xl mx-auto space-y-6">
219:                   <div className="flex justify-between items-center border-b-2 border-slate-950 pb-3">
220:                     <div>
221:                       <span className="text-[10px] font-mono font-bold text-[#00cc33] uppercase">LECCIÓN SELECCIONADA</span>
222:                       <h2 className="text-xl font-black text-slate-950 dark:text-white">{currentLesson.title}</h2>
223:                     </div>
224:                     <span className="text-xs font-mono font-bold px-2 py-0.5 border border-slate-950 bg-amber-400 text-slate-950">
225:                       Orden: {currentLesson.order}
226:                     </span>
227:                   </div>
228: 
229:                   {}
230:                   {currentLesson.video_url && (
231:                     <div className="border-2 border-slate-950 bg-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
232:                       <div className="bg-slate-900 px-3 py-1 text-[10px] font-mono text-emerald-400 border-b border-slate-800">
233:                         ▶ VIDEO DE LA CLASE
234:                       </div>
235:                       <div className="aspect-video">
236:                         <iframe
237:                           src={sanitizeUrl(currentLesson.video_url)}
238:                           title={currentLesson.title}
239:                           className="w-full h-full border-0"
240:                           allowFullScreen
241:                         />
242:                       </div>
243:                     </div>
244:                   )}
245: 
246:                   {}
247:                   <article className="prose dark:prose-invert max-w-none space-y-4 text-xs sm:text-sm">
248:                     {currentLesson.content_text ? (
249:                       currentLesson.content_text.split('```').map((block, i) => {
250:                         if (i % 2 === 1) {
251:                           const lines = block.trim().split('\n');
252:                           const lang = lines[0].match(/^[a-z]+/i) ? lines[0] : 'code';
253:                           const codeContent = lines[0].match(/^[a-z]+/i) ? lines.slice(1).join('\n') : block;
254: 
255:                           return (
256:                             <div key={i} className="my-4 border-2 border-slate-950 bg-slate-950 text-emerald-400 p-4 font-mono text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] overflow-x-auto">
257:                               <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400 uppercase font-bold">
258:                                 <span>{lang}</span>
259:                                 <span>Console Output</span>
260:                               </div>
261:                               <pre className="whitespace-pre-wrap">{codeContent.trim()}</pre>
262:                             </div>
263:                           );
264:                         }
265: 
266:                         return (
267:                           <div key={i} className="space-y-3">
268:                             {block.split('\n\n').map((para, j) => {
269:                               if (para.startsWith('### ')) {
270:                                 return <h3 key={j} className="text-base font-black text-slate-950 dark:text-white mt-4 mb-1">{para.replace('### ', '')}</h3>;
271:                               }
272:                               if (para.startsWith('#### ')) {
273:                                 return (
274:                                   <div key={j} className="my-2 p-2 bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 text-xs font-bold text-slate-900 dark:text-amber-200">
275:                                     {para.replace('#### ', '')}
276:                                   </div>
277:                                 );
278:                               }
279:                               if (para.split('\n').every(line => line.trim().startsWith('- ') || line.trim().startsWith('* '))) {
280:                                 return (
281:                                   <ul key={j} className="list-disc list-inside space-y-1 text-xs text-slate-800 dark:text-slate-200 font-medium pl-2">
282:                                     {para.split('\n').map((item, k) => (
283:                                       <li key={k}>{item.replace(/^[-*]\s+/, '')}</li>
284:                                     ))}
285:                                   </ul>
286:                                 );
287:                               }
288:                               return <p key={j} className="text-xs sm:text-sm leading-relaxed font-medium">{para}</p>;
289:                             })}
290:                           </div>
291:                         );
292:                       })
293:                     ) : (
294:                       <div className="p-6 border border-dashed border-slate-400 text-center text-slate-400 text-xs italic">
295:                         Esta lección no incluye manual escrito.
296:                       </div>
297:                     )}
298:                   </article>
299:                 </div>
300:               ) : (
301:                 <div className="text-center py-20 text-slate-400 text-sm">
302:                   Selecciona una lección del temario para ver su previsualización.
303:                 </div>
304:               )}
305:             </main>
306:           </div>
307:         )}
308:       </div>
309:     </div>
310:   );
311: };
````

## File: src/presentation/components/student-management/StudentProgressDetailModal.tsx
````typescript
  1: import React from 'react';
  2: import { Enrollment } from '@domain/entities/Enrollment';
  3: import { X, CheckCircle2, Clock, MapPin, BookOpen, User } from 'lucide-react';
  4: 
  5: interface StudentProgressDetailModalProps {
  6:   isOpen: boolean;
  7:   onClose: () => void;
  8:   enrollment: Enrollment | null;
  9: }
 10: 
 11: export const StudentProgressDetailModal: React.FC<StudentProgressDetailModalProps> = ({
 12:   isOpen,
 13:   onClose,
 14:   enrollment,
 15: }) => {
 16:   if (!isOpen || !enrollment) return null;
 17: 
 18:   const progressNum = Math.min(100, Math.max(0, parseFloat(enrollment.total_progress || '0')));
 19:   const isCompleted = progressNum >= 100;
 20: 
 21: 
 22:   const mockModules = [
 23:     {
 24:       title: 'Módulo 1: Fundamentos y Entorno de Desarrollo',
 25:       lessons: [
 26:         { title: 'Manual de Instalación y Requisitos Previos', completed: true },
 27:         { title: 'Lección 1.1: Configuración Inicial del Proyecto', completed: true },
 28:         {
 29:           title: 'Lección 1.2: Paginación Global y Serialización de Listas',
 30:           completed: progressNum >= 50,
 31:           isCurrent: progressNum < 100 && progressNum >= 30,
 32:         },
 33:       ],
 34:     },
 35:     {
 36:       title: 'Módulo 2: Arquitectura y Lógica de Negocio',
 37:       lessons: [
 38:         {
 39:           title: 'Lección 2.1: Implementación de Endpoints y Vistas',
 40:           completed: progressNum >= 75,
 41:           isCurrent: progressNum < 100 && progressNum >= 50,
 42:         },
 43:         {
 44:           title: 'Lección 2.2: Autenticación JWT y Permisos de Usuario',
 45:           completed: progressNum >= 90,
 46:           isCurrent: progressNum < 100 && progressNum >= 75,
 47:         },
 48:         {
 49:           title: 'Lección 2.3: Despliegue y Certificación Final',
 50:           completed: progressNum >= 100,
 51:           isCurrent: progressNum >= 90 && progressNum < 100,
 52:         },
 53:       ],
 54:     },
 55:   ];
 56: 
 57:   const currentLessonTitle = enrollment.last_lesson_title ||
 58:     (isCompleted ? 'Certificado emitido - Curso finalizado' : 'Lección 1.2: Paginación Global y Serialización de Listas');
 59: 
 60:   return (
 61:     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
 62:       <div className="w-full max-w-3xl border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_#00b835] overflow-hidden my-auto flex flex-col">
 63:         {}
 64:         <div className="flex items-center justify-between px-5 py-3 bg-slate-950 text-white border-b-2 border-slate-950 shrink-0">
 65:           <div className="flex items-center gap-2.5" translate="no">
 66:             <span className="w-3 h-3 rounded-full bg-[#00cc33] animate-pulse" />
 67:             <span className="text-xs font-mono font-black uppercase tracking-wider text-[#00cc33]">
 68:               DETALLE DE AVANCE ESTUDIANTIL · ONCOURSES
 69:             </span>
 70:           </div>
 71: 
 72:           <button
 73:             type="button"
 74:             onClick={onClose}
 75:             aria-label="Cerrar modal"
 76:             className="w-7 h-7 flex items-center justify-center border-2 border-white bg-rose-600 text-white font-black text-xs hover:bg-rose-700 transition-colors cursor-pointer shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
 77:           >
 78:             <X className="h-4 w-4" />
 79:           </button>
 80:         </div>
 81: 
 82:         {}
 83:         <div className="p-6 space-y-6 bg-slate-50 dark:bg-slate-900 max-h-[80vh] overflow-y-auto font-sans">
 84: 
 85:           {}
 86:           <div className="border-2 border-slate-950 bg-white dark:bg-slate-950 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
 87:             <div className="flex items-center gap-3.5">
 88:               <div className="w-12 h-12 rounded-full bg-[#00cc33] border-2 border-slate-950 font-black text-slate-950 text-base flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
 89:                 {enrollment.user_name.charAt(0).toUpperCase()}
 90:               </div>
 91:               <div>
 92:                 <h2 className="font-display font-black text-lg text-slate-950 dark:text-white leading-tight">
 93:                   {enrollment.user_name}
 94:                 </h2>
 95:                 <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
 96:                   <User className="h-3.5 w-3.5 text-[#00cc33]" />
 97:                   <span>ID Estudiante: #{enrollment.user}</span>
 98:                 </div>
 99:               </div>
100:             </div>
101: 
102:             <div className="flex flex-col items-end w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200 dark:border-slate-800">
103:               <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
104:                 Avance General
105:               </span>
106:               <div className="flex items-center gap-2">
107:                 <div className="w-28 h-3 bg-slate-200 dark:bg-slate-800 border border-slate-950 overflow-hidden">
108:                   <div
109:                     className={`h-full ${isCompleted ? 'bg-emerald-500' : 'bg-[#00cc33]'}`}
110:                     style={{ width: `${progressNum}%` }}
111:                   />
112:                 </div>
113:                 <span className="font-mono font-bold text-xs text-slate-950 dark:text-white">{progressNum}%</span>
114:               </div>
115:             </div>
116:           </div>
117: 
118:           {}
119:           <div className="border-2 border-slate-950 bg-amber-50 dark:bg-slate-950 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] space-y-3">
120:             <div className="flex items-center justify-between border-b-2 border-slate-950 pb-2">
121:               <span className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-2">
122:                 <MapPin className="h-4 w-4 text-amber-600 dark:text-[#00cc33] animate-bounce" />
123:                 📍 DÓNDE SE QUEDÓ EL ESTUDIANTE (ÚLTIMA UBICACIÓN VISTA)
124:               </span>
125:               {isCompleted ? (
126:                 <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-mono font-bold text-[10px] uppercase border border-slate-950">
127:                   CURSO FINALIZADO ✅
128:                 </span>
129:               ) : (
130:                 <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-mono font-bold text-[10px] uppercase border border-slate-950">
131:                   EN PROGRESO 🟡
132:                 </span>
133:               )}
134:             </div>
135: 
136:             <div className="space-y-1">
137:               <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase block">
138:                 Curso: {enrollment.course_title}
139:               </span>
140:               <h3 className="font-display font-black text-xl text-slate-950 dark:text-white">
141:                 {currentLessonTitle}
142:               </h3>
143:             </div>
144: 
145:             <div className="pt-2 border-t border-slate-300 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
146:               <span className="flex items-center gap-1.5">
147:                 <Clock className="h-3.5 w-3.5 text-[#00cc33]" />
148:                 Último acceso registrado: Reciente
149:               </span>
150:               <span className="font-bold text-slate-900 dark:text-white">
151:                 Tema activo #{Math.ceil((progressNum / 100) * 6) || 1} de 6
152:               </span>
153:             </div>
154:           </div>
155: 
156:           {}
157:           <div className="border-2 border-slate-950 bg-white dark:bg-slate-950 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] space-y-4">
158:             <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
159:               <BookOpen className="h-4 w-4 text-[#00cc33]" />
160:               Desglose de Lecciones Vistas vs Pendientes
161:             </h4>
162: 
163:             <div className="space-y-4">
164:               {mockModules.map((mod, idx) => (
165:                 <div key={idx} className="border border-slate-950 p-3.5 bg-slate-50 dark:bg-slate-900 space-y-2">
166:                   <span className="font-bold text-xs text-slate-950 dark:text-white block border-b border-slate-300 dark:border-slate-800 pb-1">
167:                     {mod.title}
168:                   </span>
169: 
170:                   <div className="space-y-1.5 pl-2">
171:                     {mod.lessons.map((les, lIdx) => (
172:                       <div
173:                         key={lIdx}
174:                         className={`flex items-center justify-between p-2 text-xs font-medium border ${
175:                           les.isCurrent
176:                             ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-500 font-bold text-slate-950 dark:text-amber-200'
177:                             : les.completed
178:                             ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-900 dark:text-emerald-300'
179:                             : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400'
180:                         }`}
181:                       >
182:                         <div className="flex items-center gap-2">
183:                           {les.completed ? (
184:                             <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
185:                           ) : les.isCurrent ? (
186:                             <MapPin className="h-4 w-4 text-amber-600 dark:text-[#00cc33] shrink-0 animate-pulse" />
187:                           ) : (
188:                             <Clock className="h-4 w-4 text-slate-300 shrink-0" />
189:                           )}
190:                           <span>{les.title}</span>
191:                         </div>
192: 
193:                         {les.isCurrent && (
194:                           <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-mono text-[9px] font-black uppercase">
195:                             UBICACIÓN ACTUAL
196:                           </span>
197:                         )}
198:                         {les.completed && !les.isCurrent && (
199:                           <span className="text-[10px] text-emerald-600 font-mono font-bold">COMPLETADA</span>
200:                         )}
201:                       </div>
202:                     ))}
203:                   </div>
204:                 </div>
205:               ))}
206:             </div>
207:           </div>
208:         </div>
209: 
210:         {}
211:         <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t-2 border-slate-950 flex justify-end gap-3 shrink-0">
212:           <button
213:             type="button"
214:             onClick={onClose}
215:             className="px-6 py-2.5 bg-white dark:bg-slate-800 text-slate-950 dark:text-white font-extrabold text-xs uppercase border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-200 cursor-pointer"
216:           >
217:             Cerrar Detalle
218:           </button>
219:         </div>
220:       </div>
221:     </div>
222:   );
223: };
````

## File: src/presentation/components/CodeBlockWithCopy.tsx
````typescript
 1: import React, { useState } from 'react';
 2: import { Copy, Check } from 'lucide-react';
 3: 
 4: interface CodeBlockWithCopyProps {
 5:   code: string;
 6:   language?: string;
 7: }
 8: 
 9: export const CodeBlockWithCopy: React.FC<CodeBlockWithCopyProps> = ({ code, language = 'sql' }) => {
10:   const [copied, setCopied] = useState(false);
11: 
12:   const handleCopy = async () => {
13:     try {
14:       await navigator.clipboard.writeText(code.trim());
15:       setCopied(true);
16:       setTimeout(() => setCopied(false), 2000);
17:     } catch (err) {
18:       console.error('Failed to copy code to clipboard', err);
19:     }
20:   };
21: 
22:   return (
23:     <div className="my-6 border-2 border-slate-950 bg-slate-950 text-emerald-400 p-4 font-mono text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] overflow-hidden group">
24:       {}
25:       <div className="flex justify-between items-center pb-2.5 mb-3 border-b border-slate-800 text-[10px] uppercase font-bold tracking-wider">
26:         <div className="flex items-center gap-2 text-slate-300">
27:           <span className="w-2.5 h-2.5 rounded-full bg-[#00cc33]" />
28:           <span className="font-mono text-[#00ff41]">{language.toUpperCase()}</span>
29:         </div>
30: 
31:         <div className="flex items-center gap-2">
32:           <span className="text-slate-500 font-mono hidden sm:inline">ONCOURSES CONSOLE</span>
33:           <button
34:             type="button"
35:             onClick={handleCopy}
36:             className={`px-2.5 py-1 font-mono font-bold text-[10px] uppercase tracking-wider border border-slate-800 transition-all flex items-center gap-1 cursor-pointer select-none ${
37:               copied
38:                 ? 'bg-[#00cc33] text-slate-950 border-[#00cc33]'
39:                 : 'bg-slate-900 text-slate-300 hover:bg-[#00cc33] hover:text-slate-950 hover:border-slate-950'
40:             }`}
41:             title="Copiar código al portapapeles"
42:           >
43:             {copied ? (
44:               <>
45:                 <Check className="h-3 w-3 text-slate-950" />
46:                 <span>¡COPIADO!</span>
47:               </>
48:             ) : (
49:               <>
50:                 <Copy className="h-3 w-3" />
51:                 <span>COPIAR CÓDIGO</span>
52:               </>
53:             )}
54:           </button>
55:         </div>
56:       </div>
57: 
58:       {}
59:       <pre className="whitespace-pre-wrap leading-relaxed overflow-x-auto text-emerald-300 select-all font-mono text-[12px] p-1">
60:         {code.trim()}
61:       </pre>
62:     </div>
63:   );
64: };
````

## File: src/presentation/components/Layout.tsx
````typescript
 1: import React from 'react';
 2: import { Navbar } from './Navbar';
 3: import { Footer } from './Footer';
 4: import { CartDrawer } from './cart/CartDrawer';
 5: 
 6: export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 7:   return (
 8:     <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
 9:       <Navbar />
10:       <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
11:         {children}
12:       </main>
13:       <Footer />
14:       <CartDrawer />
15:     </div>
16:   );
17: };
````

## File: src/presentation/pages/CatalogPage.tsx
````typescript
  1: import React, { useEffect, useState, useCallback } from 'react';
  2: import { useSearchParams } from 'react-router-dom';
  3: 
  4: import { Layout } from '../components/Layout';
  5: import { Button } from '../components/Button';
  6: import { Input } from '../components/Input';
  7: import { getCoursesUseCase } from '@infrastructure/factories/CourseFactory';
  8: import { getCategoriesUseCase } from '@infrastructure/factories/CategoryFactory';
  9: import { Course } from '@domain/entities/Course';
 10: import { Category } from '@domain/entities/Category';
 11: import { BookOpen, Search, SlidersHorizontal } from 'lucide-react';
 12: import { Pagination } from '../components/Pagination';
 13: import { CatalogSkeleton } from '../components/Skeletons';
 14: import { CourseCard } from '../components/CourseCard';
 15: 
 16: export const CatalogPage: React.FC = () => {
 17:   const [searchParams] = useSearchParams();
 18:   const [courses, setCourses] = useState<Course[]>([]);
 19:   const [categories, setCategories] = useState<Category[]>([]);
 20:   const [isLoading, setIsLoading] = useState(true);
 21:   const [search, setSearch] = useState('');
 22:   const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
 23:   const [minPrice, setMinPrice] = useState('');
 24:   const [maxPrice, setMaxPrice] = useState('');
 25:   const [showFilters, setShowFilters] = useState(false);
 26: 
 27:   // Pagination State
 28:   const [page, setPage] = useState(1);
 29:   const [totalCourses, setTotalCourses] = useState(0);
 30: 
 31:   useEffect(() => {
 32:     // Read URL search params
 33:     const qSearch = searchParams.get('search');
 34:     if (qSearch !== null) setSearch(qSearch);
 35:     const qCat = searchParams.get('category');
 36:     if (qCat !== null) setSelectedCategory(Number(qCat));
 37:     const qMaxPrice = searchParams.get('max_price');
 38:     if (qMaxPrice !== null) setMaxPrice(qMaxPrice);
 39:   }, [searchParams]);
 40: 
 41:   useEffect(() => {
 42: 
 43:     getCategoriesUseCase
 44:       .execute({ page_size: 100 })
 45:       .then((data) => setCategories(data.results))
 46:       .catch((err) => console.error('Failed to load categories', err));
 47:   }, []);
 48: 
 49:   const fetchCourses = useCallback((currentPage: number) => {
 50:     setIsLoading(true);
 51:     const filters: any = {
 52:       is_active: true,
 53:       page: currentPage,
 54:     };
 55:     if (search) filters.search = search;
 56:     if (selectedCategory) filters.category = selectedCategory;
 57:     if (minPrice) filters.min_price = minPrice;
 58:     if (maxPrice) filters.max_price = maxPrice;
 59: 
 60:     getCoursesUseCase
 61:       .execute(filters)
 62:       .then((data) => {
 63:         setCourses(data.results);
 64:         setTotalCourses(data.count);
 65:         setIsLoading(false);
 66:       })
 67:       .catch((err) => {
 68:         console.error(err);
 69:         setIsLoading(false);
 70:       });
 71:   }, [search, selectedCategory, minPrice, maxPrice]);
 72: 
 73:   useEffect(() => {
 74:     const delayDebounceFn = setTimeout(() => {
 75:       setPage(1);
 76:       fetchCourses(1);
 77:     }, 400);
 78: 
 79:     return () => clearTimeout(delayDebounceFn);
 80:   }, [search, selectedCategory, fetchCourses]);
 81: 
 82:   const handleApplyFilters = (e: React.FormEvent) => {
 83:     e.preventDefault();
 84:     setPage(1);
 85:     fetchCourses(1);
 86:   };
 87: 
 88:   const handleResetFilters = () => {
 89:     setMinPrice('');
 90:     setMaxPrice('');
 91:     setSelectedCategory('');
 92:     setSearch('');
 93:     setPage(1);
 94:   };
 95: 
 96:   return (
 97:     <Layout>
 98:       <div className="mb-10">
 99:         <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
100:           Cursos
101:         </h1>
102:         <p className="text-slate-505 dark:text-slate-400">
103:           Aprende programación desde cero y mejora tus habilidades
104:         </p>
105:       </div>
106: 
107:       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
108:         {/* Sidebar Filters */}
109:         <div className={`lg:block ${showFilters ? 'block' : 'hidden'} bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-fit`}>
110:           <div className="flex justify-between items-center mb-6">
111:             <h3 className="font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
112:               <SlidersHorizontal className="h-4 w-4 text-brand-500" />
113:               Filtros
114:             </h3>
115:             <button
116:               onClick={handleResetFilters}
117:               className="text-xs font-semibold text-slate-400 hover:text-brand-500 transition-colors"
118:             >
119:               Restablecer
120:             </button>
121:           </div>
122: 
123:           <form onSubmit={handleApplyFilters} className="flex flex-col gap-6">
124:             {}
125:             <div className="flex flex-col gap-2">
126:               <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
127:                 Categoría
128:               </label>
129:               <select
130:                 value={selectedCategory}
131:                 onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : '')}
132:                 className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-750 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:border-brand-500 text-sm"
133:               >
134:                 <option value="">Todas las categorías</option>
135:                 {categories.map((cat) => (
136:                   <option key={cat.id} value={cat.id}>
137:                     {cat.name}
138:                   </option>
139:                 ))}
140:               </select>
141:             </div>
142: 
143:             {/* Price filters */}
144:             <div className="flex flex-col gap-2">
145:               <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
146:                 Rango de Precio ($)
147:               </label>
148:               <div className="flex items-center gap-2">
149:                 <Input
150:                   type="number"
151:                   placeholder="Min"
152:                   value={minPrice}
153:                   onChange={(e) => setMinPrice(e.target.value)}
154:                   className="px-3 py-1.5 text-sm"
155:                 />
156:                 <span className="text-slate-400">-</span>
157:                 <Input
158:                   type="number"
159:                   placeholder="Max"
160:                   value={maxPrice}
161:                   onChange={(e) => setMaxPrice(e.target.value)}
162:                   className="px-3 py-1.5 text-sm"
163:                 />
164:               </div>
165:             </div>
166: 
167:             <Button type="submit" className="w-full">
168:               Aplicar Filtros
169:             </Button>
170:           </form>
171:         </div>
172: 
173:         {}
174:         <div className="lg:col-span-3">
175:           {}
176:           <div className="flex gap-2 mb-6">
177:             <div className="relative flex-1">
178:               <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
179:               <Input
180:                 type="text"
181:                 placeholder="Buscar por título, descripción..."
182:                 value={search}
183:                 onChange={(e) => setSearch(e.target.value)}
184:                 className="pl-10"
185:               />
186:             </div>
187:             <Button
188:               variant="outline"
189:               onClick={() => setShowFilters(!showFilters)}
190:               className="lg:hidden flex items-center gap-2"
191:             >
192:               <SlidersHorizontal className="h-4 w-4" />
193:               Filtros
194:             </Button>
195:           </div>
196: 
197:           {isLoading ? (
198:             <CatalogSkeleton />
199:           ) : (
200:             <div>
201:               {courses.length > 0 ? (
202:                 <>
203:                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
204:                     {courses.map((course) => (
205:                       <CourseCard key={course.id} course={course} />
206:                     ))}
207:                   </div>
208:                   <Pagination
209:                     count={totalCourses}
210:                     currentPage={page}
211:                     pageSize={10}
212:                     onPageChange={(newPage) => {
213:                       setPage(newPage);
214:                       fetchCourses(newPage);
215:                     }}
216:                   />
217:                 </>
218:               ) : (
219:                 <div className="text-center py-16 bg-white dark:bg-slate-900 border border-dashed border-slate-350 dark:border-slate-800 rounded-2xl p-6">
220:                   <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
221:                   <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No se encontraron cursos</h3>
222:                   <p className="text-sm text-slate-500 dark:text-slate-455 mt-1 mb-6">Prueba a ajustar los criterios de búsqueda o filtros.</p>
223:                   <Button onClick={handleResetFilters} variant="outline" size="sm">
224:                     Restablecer Búsqueda y Filtros
225:                   </Button>
226:                 </div>
227:               )}
228:             </div>
229:           )}
230:         </div>
231:       </div>
232:     </Layout>
233:   );
234: };
````

## File: src/presentation/pages/ProfilePage.tsx
````typescript
  1: import React from 'react';
  2: import { Layout } from '../components/Layout';
  3: import { Button } from '../components/Button';
  4: import { useProfile } from '../hooks/useProfile';
  5: import { ProfileHeader } from '../components/profile/ProfileHeader';
  6: import { ProfileDetails } from '../components/profile/ProfileDetails';
  7: import { ProfileEditForm } from '../components/profile/ProfileEditForm';
  8: import { CheckCircle, ShieldAlert, Settings, ArrowLeft } from 'lucide-react';
  9: 
 10: export const ProfilePage: React.FC = () => {
 11:   const {
 12:     user,
 13:     isEditing,
 14:     firstName,
 15:     setFirstName,
 16:     lastName,
 17:     setLastName,
 18:     avatar,
 19:     setAvatar,
 20:     handleAvatarFile,
 21:     phone,
 22:     setPhone,
 23:     biography,
 24:     setBiography,
 25:     country,
 26:     setCountry,
 27:     birthDate,
 28:     setBirthDate,
 29:     professionalTitle,
 30:     setProfessionalTitle,
 31:     specialty,
 32:     setSpecialty,
 33:     linkedinUrl,
 34:     setLinkedinUrl,
 35:     successMsg,
 36:     formError,
 37:     isLoading,
 38:     isProfessorOrAdmin,
 39:     handleEditToggle,
 40:     handleSubmit,
 41:     getInitials,
 42:     formatJoinedDate,
 43:     roleConfig,
 44:   } = useProfile();
 45: 
 46:   return (
 47:     <Layout>
 48:       <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
 49:         {}
 50:         <div className="flex items-center justify-between">
 51:           <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">Mi Perfil</h1>
 52:           <Button
 53:             variant={isEditing ? 'outline' : 'primary'}
 54:             onClick={handleEditToggle}
 55:             className="flex items-center gap-2"
 56:           >
 57:             {isEditing ? (
 58:               <>
 59:                 <ArrowLeft className="h-4 w-4" />
 60:                 Cancelar Edición
 61:               </>
 62:             ) : (
 63:               <>
 64:                 <Settings className="h-4 w-4" />
 65:                 Editar Perfil
 66:               </>
 67:             )}
 68:           </Button>
 69:         </div>
 70: 
 71:         {}
 72:         {successMsg && (
 73:           <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/30 p-4 text-sm text-emerald-800 dark:text-emerald-450">
 74:             <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-455" />
 75:             <span>{successMsg}</span>
 76:           </div>
 77:         )}
 78: 
 79:         {formError && (
 80:           <div className="flex items-start gap-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 p-4 text-sm text-rose-800 dark:text-rose-455">
 81:             <ShieldAlert className="h-5 w-5 shrink-0" />
 82:             <div className="text-xs leading-relaxed">{formError}</div>
 83:           </div>
 84:         )}
 85: 
 86:         {}
 87:         <ProfileHeader
 88:           user={user}
 89:           initials={getInitials()}
 90:           roleConfig={roleConfig}
 91:           joinedDate={formatJoinedDate(user?.date_joined)}
 92:         />
 93: 
 94:         {}
 95:         {isEditing ? (
 96:           <ProfileEditForm
 97:             isProfessorOrAdmin={isProfessorOrAdmin}
 98:             firstName={firstName}
 99:             lastName={lastName}
100:             avatar={avatar}
101:             phone={phone}
102:             biography={biography}
103:             country={country}
104:             birthDate={birthDate}
105:             professionalTitle={professionalTitle}
106:             specialty={specialty}
107:             linkedinUrl={linkedinUrl}
108:             loading={isLoading}
109:             setFirstName={setFirstName}
110:             setLastName={setLastName}
111:             setAvatar={setAvatar}
112:             onAvatarFileChange={handleAvatarFile}
113:             setPhone={setPhone}
114:             setBiography={setBiography}
115:             setCountry={setCountry}
116:             setBirthDate={setBirthDate}
117:             setProfessionalTitle={setProfessionalTitle}
118:             setSpecialty={setSpecialty}
119:             setLinkedinUrl={setLinkedinUrl}
120:             onSubmit={handleSubmit}
121:           />
122:         ) : (
123:           <ProfileDetails
124:             user={user}
125:             isProfessorOrAdmin={isProfessorOrAdmin}
126:           />
127:         )}
128:       </div>
129:     </Layout>
130:   );
131: };
````

## File: src/presentation/store/useCartStore.ts
````typescript
  1: import { create } from 'zustand';
  2: import { Course } from '@domain/entities/Course';
  3: 
  4: interface CartState {
  5:   items: Course[];
  6:   isOpen: boolean;
  7:   appliedCoupon: string | null;
  8:   discountPercent: number;
  9:   addItem: (course: Course) => boolean;
 10:   removeItem: (courseId: number) => void;
 11:   clearCart: () => void;
 12:   toggleCart: () => void;
 13:   openCart: () => void;
 14:   closeCart: () => void;
 15:   applyCoupon: (code: string) => { success: boolean; message: string };
 16:   removeCoupon: () => void;
 17:   getTotalPrice: () => number;
 18:   getDiscountedTotal: () => number;
 19: }
 20: 
 21: const STORAGE_KEY = 'oncourses_cart_v1';
 22: 
 23: const getInitialItems = (): Course[] => {
 24:   try {
 25:     const saved = localStorage.getItem(STORAGE_KEY);
 26:     return saved ? JSON.parse(saved) : [];
 27:   } catch {
 28:     return [];
 29:   }
 30: };
 31: 
 32: const saveItems = (items: Course[]) => {
 33:   try {
 34:     localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
 35:   } catch (err) {
 36:     console.warn('Failed to save cart to localStorage', err);
 37:   }
 38: };
 39: 
 40: export const useCartStore = create<CartState>((set, get) => ({
 41:   items: getInitialItems(),
 42:   isOpen: false,
 43:   appliedCoupon: null,
 44:   discountPercent: 0,
 45: 
 46:   addItem: (course: Course) => {
 47:     const { items } = get();
 48:     const exists = items.some((item) => item.id === course.id);
 49:     if (exists) {
 50:       set({ isOpen: true });
 51:       return false;
 52:     }
 53:     const newItems = [...items, course];
 54:     saveItems(newItems);
 55:     set({ items: newItems, isOpen: true });
 56:     return true;
 57:   },
 58: 
 59:   removeItem: (courseId: number) => {
 60:     const { items } = get();
 61:     const newItems = items.filter((item) => item.id !== courseId);
 62:     saveItems(newItems);
 63:     set({ items: newItems });
 64:   },
 65: 
 66:   clearCart: () => {
 67:     saveItems([]);
 68:     set({ items: [], appliedCoupon: null, discountPercent: 0 });
 69:   },
 70: 
 71:   toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
 72:   openCart: () => set({ isOpen: true }),
 73:   closeCart: () => set({ isOpen: false }),
 74: 
 75:   applyCoupon: (code: string) => {
 76:     const clean = code.trim().toUpperCase();
 77:     if (!clean) {
 78:       return { success: false, message: 'Ingresa un código promocional' };
 79:     }
 80:     if (clean === 'ALEXLOPEZ' || clean === 'PROMO100' || clean === 'ONCOURSES100' || clean === 'PROFESOR') {
 81:       set({ appliedCoupon: clean, discountPercent: 100 });
 82:       return { success: true, message: '¡Cupón de 100% de descuento aplicado con éxito! 🎉' };
 83:     }
 84:     if (clean === 'BECA50' || clean === 'ESTUDIANTE50') {
 85:       set({ appliedCoupon: clean, discountPercent: 50 });
 86:       return { success: true, message: '¡Cupón de 50% de descuento aplicado con éxito! 🚀' };
 87:     }
 88:     if (clean === 'ONCOURSES20' || clean === 'DEV20') {
 89:       set({ appliedCoupon: clean, discountPercent: 20 });
 90:       return { success: true, message: '¡Cupón de 20% de descuento aplicado con éxito! ⚡' };
 91:     }
 92:     return { success: false, message: 'Código promocional no válido o expirado' };
 93:   },
 94: 
 95:   removeCoupon: () => set({ appliedCoupon: null, discountPercent: 0 }),
 96: 
 97:   getTotalPrice: () => {
 98:     const { items } = get();
 99:     return items.reduce((acc, item) => {
100:       const priceNum = parseFloat(item.price) || 0;
101:       return acc + priceNum;
102:     }, 0);
103:   },
104: 
105:   getDiscountedTotal: () => {
106:     const total = get().getTotalPrice();
107:     const discount = get().discountPercent;
108:     const finalAmount = total * (1 - discount / 100);
109:     return Math.max(0, parseFloat(finalAmount.toFixed(2)));
110:   },
111: }));
````

## File: src/presentation/utils/course-stats.ts
````typescript
 1: import { Course } from '@domain/entities/Course';
 2: 
 3: export interface CourseStats {
 4:   modulesCount: number;
 5:   totalLessons: number;
 6:   totalDurationText: string;
 7: }
 8: 
 9: export const calculateCourseStats = (course: Course): CourseStats => {
10:   const modulesCount = course.modules_count || course.modules?.length || 0;
11:   let totalLessons = 0;
12:   let totalSeconds = 0;
13: 
14:   if (course.modules && course.modules.length > 0) {
15:     course.modules.forEach((mod) => {
16:       if (mod.lessons) {
17:         totalLessons += mod.lessons.length;
18:         mod.lessons.forEach((les) => {
19:           if (les.duration_seconds) {
20:             totalSeconds += les.duration_seconds;
21:           }
22:         });
23:       }
24:     });
25:   }
26: 
27: 
28:   if (totalLessons === 0) {
29:     totalLessons = (course as any).lessons_count || (modulesCount > 0 ? modulesCount * 7 : 0);
30:   }
31: 
32:   if (totalSeconds === 0 && totalLessons > 0) {
33: 
34:     totalSeconds = totalLessons * 15 * 60;
35:   }
36: 
37:   const hours = Math.floor(totalSeconds / 3600);
38:   const minutes = Math.round((totalSeconds % 3600) / 60);
39: 
40:   let totalDurationText = '';
41:   if (hours > 0) {
42:     totalDurationText = minutes > 0 ? `${hours}h ${minutes}m` : `${hours} horas`;
43:   } else {
44:     totalDurationText = `${Math.max(10, minutes)} min`;
45:   }
46: 
47:   return {
48:     modulesCount,
49:     totalLessons,
50:     totalDurationText,
51:   };
52: };
````

## File: src/infrastructure/adapters/AxiosCourseRepository.ts
````typescript
 1: import { ICourseRepository } from '@domain/ports/ICourseRepository';
 2: import { Course } from '@domain/entities/Course';
 3: import { PaginatedResult } from '@domain/entities/PaginatedResult';
 4: import { axiosClient } from '../http/axios-client';
 5: import { parseApiError } from '../http/parse-api-error';
 6: import { enrichCourseData, getFallbackCourse } from '../data/CourseSeedData';
 7: 
 8: export class AxiosCourseRepository implements ICourseRepository {
 9:   async getCourses(filters?: any): Promise<PaginatedResult<Course>> {
10:     try {
11:       const response = await axiosClient.get('/courses/', { params: filters });
12:       if (response.data && Array.isArray(response.data.results)) {
13:         const enrichedResults = response.data.results.map(enrichCourseData);
14:         return {
15:           results: enrichedResults,
16:           count: response.data.count || enrichedResults.length,
17:           next: response.data.next || null,
18:           previous: response.data.previous || null,
19:         };
20:       }
21:       if (Array.isArray(response.data)) {
22:         const enrichedResults = response.data.map(enrichCourseData);
23:         return {
24:           results: enrichedResults,
25:           count: enrichedResults.length,
26:           next: null,
27:           previous: null,
28:         };
29:       }
30:       return { results: [], count: 0, next: null, previous: null };
31:     } catch (error) {
32:       throw parseApiError(error);
33:     }
34:   }
35: 
36:   async getCourseById(id: number): Promise<Course> {
37:     try {
38:       const response = await axiosClient.get(`/courses/${id}/`);
39:       return enrichCourseData(response.data);
40:     } catch (error) {
41:       console.warn(`Backend failed for course ${id}, using fallback seed data`, error);
42:       return getFallbackCourse(id);
43:     }
44:   }
45: 
46:   async createCourse(course: any): Promise<Course> {
47:     try {
48:       const headers: Record<string, string> = {};
49:       if (course instanceof FormData) {
50:         headers['Content-Type'] = 'multipart/form-data';
51:       }
52:       const response = await axiosClient.post('/courses/', course, { headers });
53:       return response.data;
54:     } catch (error) {
55:       throw parseApiError(error);
56:     }
57:   }
58: 
59:   async updateCourse(id: number, course: any): Promise<Course> {
60:     try {
61:       const headers: Record<string, string> = {};
62:       if (course instanceof FormData) {
63:         headers['Content-Type'] = 'multipart/form-data';
64:       }
65:       const response = await axiosClient.patch(`/courses/${id}/`, course, { headers });
66:       return response.data;
67:     } catch (error) {
68:       throw parseApiError(error);
69:     }
70:   }
71: 
72:   async deleteCourse(id: number): Promise<void> {
73:     try {
74:       await axiosClient.delete(`/courses/${id}/`);
75:     } catch (error) {
76:       throw parseApiError(error);
77:     }
78:   }
79: }
````

## File: src/infrastructure/data/CourseSeedData.ts
````typescript
  1: import { Course } from '@domain/entities/Course';
  2: import { Module } from '@domain/entities/Module';
  3: 
  4: export interface RichCourseData {
  5:   description: string;
  6:   cover_image: string;
  7:   modules: Module[];
  8: }
  9: 
 10: export const COURSE_SEED_DETAILS: Record<string, RichCourseData> = {
 11: 
 12:   python: {
 13:     cover_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
 14:     description: 'Aprende programación moderna con Python 3. Desde sintaxis básica, estructuras de datos y control de flujo, hasta funciones, programación orientada a objetos (POO) y proyectos reales de automatización.',
 15:     modules: [
 16:       {
 17:         id: 101,
 18:         course: 1,
 19:         order: 1,
 20:         title: 'Módulo 1: Fundamentos y Entorno Python',
 21:         description: 'Instalación del entorno, ejecutables y la sintaxis inicial del lenguaje.',
 22:         lessons: [
 23:           {
 24:             id: 1001,
 25:             module: 101,
 26:             order: 1,
 27:             title: '1.1 Introducción a Python y Primer Script "Hola Mundo"',
 28:             duration_seconds: 480,
 29:             video_url: 'https://www.youtube.com/embed/chPhlsxEzy0',
 30:             content_text: `Bienvenido al curso completo de Python en OnCourses. En esta lección aprenderás los principios básicos del lenguaje de programación Python, por qué es uno de los más populares del mundo y cómo escribir tu primer programa de prueba.
 31: 
 32: ### ¿Por qué aprender Python?
 33: Python es un lenguaje de alto nivel, interpretado, de sintaxis limpia y sumamente versátil. Se utiliza en Inteligencia Artificial, Ciencia de Datos, Desarrollo Web (Django/FastAPI) y Automatización.
 34: 
 35: ### Tu primer código en Python:
 36: \`\`\`python
 37: # Este es tu primer script en Python
 38: print("¡Hola Mundo! Bienvenido a OnCourses")
 39: 
 40: nombre = "Alex"
 41: print(f"Estudiante activo: {nombre}")
 42: \`\`\`
 43: 
 44: #### Ejercicio de práctica:
 45: Abre tu consola o entorno de desarrollo y ejecuta un comando print con tu nombre y tu meta de aprendizaje para este semestre.`,
 46:             resources: ['https://docs.python.org/3/', 'https://python.org']
 47:           },
 48:           {
 49:             id: 1002,
 50:             module: 101,
 51:             order: 2,
 52:             title: '1.2 Variables, Tipos de Datos e Ingreso por Teclado',
 53:             duration_seconds: 600,
 54:             video_url: 'https://www.youtube.com/embed/_y9qQZXEGH4',
 55:             content_text: `En esta lección estudiaremos el manejo de variables dinámicas en Python y los tipos de datos primarios: int, float, str y bool.
 56: 
 57: ### Tipos de Datos Principales:
 58: - **Enteros (int):** Numeros enteros como \`edad = 20\`
 59: - **Flotantes (float):** Numeros decimales como \`promedio = 9.5\`
 60: - **Cadenas (str):** Texto encomillado como \`curso = "Python"\`
 61: - **Booleanos (bool):** Valores lógicos \`True\` o \`False\`
 62: 
 63: ### Código de ejemplo:
 64: \`\`\`python
 65: nombre = input("Ingresa tu nombre: ")
 66: edad = int(input("Ingresa tu edad: "))
 67: 
 68: print(f"Hola {nombre}, el próximo año tendrás {edad + 1} años.")
 69: \`\`\``,
 70:             resources: ['https://w3schools.com/python/python_datatypes.asp']
 71:           },
 72:           {
 73:             id: 1003,
 74:             module: 101,
 75:             order: 3,
 76:             title: '1.3 Operaciones Matemáticas y Métodos de Cadenas',
 77:             duration_seconds: 540,
 78:             video_url: 'https://www.youtube.com/embed/k9TUPpGqYTo',
 79:             content_text: `Aprende a manipular texto con los métodos integrados de Python y realizar operaciones aritméticas complejas.
 80: 
 81: ### Operadores Aritméticos:
 82: - Suma: \`+\`, Resta: \`-\`, Multiplicación: \`*\`, División: \`/\`
 83: - División entera: \`//\`, Módulo (Residuo): \`%\`, Potencia: \`**\`
 84: 
 85: ### Métodos de Strings útiles:
 86: \`\`\`python
 87: texto = "  aprender python con oncourses  "
 88: print(texto.strip().upper()) # "APRENDER PYTHON CON ONCOURSES"
 89: print(texto.replace("python", "desarrollo"))
 90: \`\`\``
 91:           }
 92:         ]
 93:       },
 94:       {
 95:         id: 102,
 96:         course: 1,
 97:         order: 2,
 98:         title: 'Módulo 2: Estructuras de Control y Colecciones',
 99:         description: 'Toma de decisiones con condicionales, bucles iterativos y estructuras de almacenamiento.',
100:         lessons: [
101:           {
102:             id: 1004,
103:             module: 102,
104:             order: 1,
105:             title: '2.1 Estructuras Condicionales (if, elif, else)',
106:             duration_seconds: 720,
107:             video_url: 'https://www.youtube.com/embed/9OK3R89_pT0',
108:             content_text: `Las estructuras condicionales le permiten a tu programa tomar decisiones basadas en comparaciones lógicas.
109: 
110: \`\`\`python
111: nota = 8.5
112: 
113: if nota >= 9.0:
114:     print("Excelente trabajo")
115: elif nota >= 7.0:
116:     print("Aprobado con buen rendimiento")
117: else:
118:     print("Requiere refuerzo")
119: \`\`\``
120:           },
121:           {
122:             id: 1005,
123:             module: 102,
124:             order: 2,
125:             title: '2.2 Bucles e Iteraciones (for y while)',
126:             duration_seconds: 650,
127:             video_url: 'https://www.youtube.com/embed/Rk0H2k4X5rA',
128:             content_text: `Aprende a repetir tareas automatizadas con bucles de iteración contada (for) e iteración condicional (while).
129: 
130: \`\`\`python
131: # Iterar sobre un rango de números
132: for i in range(1, 6):
133:     print(f"Iteración número {i}")
134: 
135: # Bucle condicional
136: contador = 3
137: while contador > 0:
138:     print(f"Cuenta regresiva: {contador}")
139:     contador -= 1
140: \`\`\``
141:           },
142:           {
143:             id: 1006,
144:             module: 102,
145:             order: 3,
146:             title: '2.3 Colecciones: Listas, Tuplas y Diccionarios',
147:             duration_seconds: 800,
148:             video_url: 'https://www.youtube.com/embed/rfscVS0vtbw',
149:             content_text: `Organiza datos complejos de manera eficiente utilizando colecciones estructuradas.
150: 
151: \`\`\`python
152: # Lista (Mutable)
153: estudiantes = ["Ana", "Carlos", "Beatriz"]
154: estudiantes.append("David")
155: 
156: # Diccionario (Clave: Valor)
157: estudiante = {
158:     "nombre": "Sofia",
159:     "carrera": "Ingeniería de Software",
160:     "promedio": 9.8
161: }
162: 
163: print(f"Nombre: {estudiante['nombre']}, Carrera: {estudiante['carrera']}")
164: \`\`\``
165:           }
166:         ]
167:       },
168:       {
169:         id: 103,
170:         course: 1,
171:         order: 3,
172:         title: 'Módulo 3: Programación Orientada a Objetos y Proyecto Final',
173:         description: 'Construcción de clases, métodos, objetos y desarrollo de un proyecto integrador.',
174:         lessons: [
175:           {
176:             id: 1007,
177:             module: 103,
178:             order: 1,
179:             title: '3.1 Programación Orientada a Objetos (Clases y Métodos)',
180:             duration_seconds: 900,
181:             video_url: 'https://www.youtube.com/embed/J7x8Vv1zVbg',
182:             content_text: `La POO es uno de los paradigmas de programación más importantes. Aprende a crear tus propias clases y objetos.
183: 
184: \`\`\`python
185: class Estudiante:
186:     def __init__(self, nombre, carrera):
187:         self.nombre = nombre
188:         self.carrera = carrera
189:         self.cursos = []
190: 
191:     def inscribir_curso(self, curso):
192:         self.cursos.append(curso)
193:         print(f"{self.nombre} se inscribió en {curso}")
194: 
195: alumno = Estudiante("Alex López", "Software")
196: alumno.inscribir_curso("Python Pro")
197: \`\`\``
198:           },
199:           {
200:             id: 1008,
201:             module: 103,
202:             order: 2,
203:             title: '3.2 Proyecto Final: Administrador de Tareas en Consola',
204:             duration_seconds: 1200,
205:             video_url: 'https://www.youtube.com/embed/T4qTzY1Bf0w',
206:             content_text: `Desarrollaremos un sistema interactivo de consola para registrar, marcar como completadas y filtrar tareas académicas utilizando todo lo aprendido en el curso.`
207:           }
208:         ]
209:       }
210:     ]
211:   },
212: 
213: 
214:   javascript: {
215:     cover_image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1200&auto=format&fit=crop',
216:     description: 'Domina el lenguaje de la web desde cero. Sintaxis moderna ES6+, Manipulación del DOM, Eventos, Asincronía con Promises, Async/Await y consumo de APIs REST.',
217:     modules: [
218:       {
219:         id: 201,
220:         course: 2,
221:         order: 1,
222:         title: 'Módulo 1: Fundamentos de JavaScript ES6+',
223:         description: 'Sintaxis moderna de JavaScript, scope, const/let y funciones flecha.',
224:         lessons: [
225:           {
226:             id: 2001,
227:             module: 201,
228:             order: 1,
229:             title: '1.1 Introducción a JavaScript y Motor V8',
230:             duration_seconds: 500,
231:             video_url: 'https://www.youtube.com/embed/hdI2bqOjy3c',
232:             content_text: `JavaScript es el lenguaje de programación estándar de la web. En esta lección aprenderás sobre la sintaxis moderna de ES6+ y cómo se ejecuta el código en el navegador.`
233:           },
234:           {
235:             id: 2002,
236:             module: 201,
237:             order: 2,
238:             title: '1.2 Variables, Constantes y Arrow Functions',
239:             duration_seconds: 620,
240:             video_url: 'https://www.youtube.com/embed/Q9swWClqCgg',
241:             content_text: `Uso de const y let, alcance de bloque y declaración de funciones flecha.
242: 
243: \`\`\`javascript
244: const calcularTotal = (precio, impuesto = 0.12) => {
245:   return precio + (precio * impuesto);
246: };
247: 
248: console.log(\`Total a pagar: $\${calcularTotal(100)}\`);
249: \`\`\``
250:           }
251:         ]
252:       },
253:       {
254:         id: 202,
255:         course: 2,
256:         order: 2,
257:         title: 'Módulo 2: DOM, Eventos y Asincronía Fetch',
258:         description: 'Interacción dinámica con páginas web y conexión a servidores web.',
259:         lessons: [
260:           {
261:             id: 2003,
262:             module: 202,
263:             order: 1,
264:             title: '2.1 Manipulación del DOM y Event Listeners',
265:             duration_seconds: 700,
266:             video_url: 'https://www.youtube.com/embed/17b2pL3KqY4',
267:             content_text: `Cómo seleccionar elementos del HTML y escuchar interacciones de usuario.
268: 
269: \`\`\`javascript
270: const boton = document.querySelector('#btn-guardar');
271: boton.addEventListener('click', () => {
272:   alert('¡Datos guardados con éxito!');
273: });
274: \`\`\``
275:           },
276:           {
277:             id: 2004,
278:             module: 202,
279:             order: 2,
280:             title: '2.2 Asincronía con Async / Await y Fetch API',
281:             duration_seconds: 850,
282:             video_url: 'https://www.youtube.com/embed/vn3tm0quoqE',
283:             content_text: `Consumo de servicios web REST con peticiones asíncronas.
284: 
285: \`\`\`javascript
286: async function obtenerCursos() {
287:   try {
288:     const respuesta = await fetch('/api/courses/');
289:     const datos = await respuesta.json();
290:     console.log(datos);
291:   } catch (error) {
292:     console.error('Error al conectar con la API:', error);
293:   }
294: }
295: \`\`\``
296:           }
297:         ]
298:       }
299:     ]
300:   },
301: 
302: 
303:   terminal: {
304:     cover_image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1200&auto=format&fit=crop',
305:     description: 'Domina la consola de comandos de Linux y macOS. Navegación en sistema de archivos, permisos, tuberías (pipes), scripts en Bash y productividad para desarrolladores.',
306:     modules: [
307:       {
308:         id: 301,
309:         course: 3,
310:         order: 1,
311:         title: 'Módulo 1: Consola de Comandos y Gestión de Archivos',
312:         description: 'Comandos fundamentales para la línea de comandos en UNIX / Linux.',
313:         lessons: [
314:           {
315:             id: 3001,
316:             module: 301,
317:             order: 1,
318:             title: '1.1 Navegación por el Sistema de Archivos (pwd, ls, cd)',
319:             duration_seconds: 450,
320:             video_url: 'https://www.youtube.com/embed/oxuRxtCjEA8',
321:             content_text: `Aprende a navegar rápidamente por directorios utilizando la consola.
322: 
323: \`\`\`bash
324: # Mostrar directorio actual
325: pwd
326: 
327: # Listar archivos detalladamente
328: ls -l -a
329: 
330: # Cambiar de directorio
331: cd /var/www/html
332: \`\`\``
333:           },
334:           {
335:             id: 3002,
336:             module: 301,
337:             order: 2,
338:             title: '1.2 Creación, Edición y Permisos de Archivos',
339:             duration_seconds: 600,
340:             video_url: 'https://www.youtube.com/embed/2pgvy-4ZlYw',
341:             content_text: `Administración de permisos de lectura, escritura y ejecución.
342: 
343: \`\`\`bash
344: # Dar permisos de ejecución a un script
345: chmod +x deploy.sh
346: 
347: # Cambiar propietario de un archivo
348: sudo chown usuario:grupo script.sh
349: \`\`\``
350:           }
351:         ]
352:       }
353:     ]
354:   },
355: 
356: 
357:   git: {
358:     cover_image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=1200&auto=format&fit=crop',
359:     description: 'Domina el flujo de trabajo profesional con Git y GitHub. Control de cambios, ramas (branches), fusiones (merge, rebase), resolución de conflictos y GitHub Pull Requests.',
360:     modules: [
361:       {
362:         id: 401,
363:         course: 4,
364:         order: 1,
365:         title: 'Módulo 1: Control de Versiones con Git',
366:         description: 'Commits, ramas y trabajo colaborativo.',
367:         lessons: [
368:           {
369:             id: 4001,
370:             module: 401,
371:             order: 1,
372:             title: '1.1 Flujo de Trabajo Básico con Git',
373:             duration_seconds: 520,
374:             video_url: 'https://www.youtube.com/embed/3GymExBkKjE',
375:             content_text: `Configura tu identidad en Git y realiza tu primer commit.
376: 
377: \`\`\`bash
378: git config --global user.name "Alex López"
379: git config --global user.email "alex@ejemplo.com"
380: 
381: git init
382: git add .
383: git commit -m "feat: mi primer commit profesional"
384: \`\`\``
385:           },
386:           {
387:             id: 4002,
388:             module: 401,
389:             order: 2,
390:             title: '1.2 Ramas, Merges y Resolución de Conflictos',
391:             duration_seconds: 680,
392:             video_url: 'https://www.youtube.com/embed/e2IbNHi4uCI',
393:             content_text: `Aprende a trabajar con ramas de características (feature branches) sin romper la rama principal.
394: 
395: \`\`\`bash
396: git checkout -b feature/login-page
397: git push origin feature/login-page
398: \`\`\``
399:           }
400:         ]
401:       }
402:     ]
403:   },
404: 
405: 
406:   sql: {
407:     cover_image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format&fit=crop',
408:     description: 'Aprende el diseño relacional de bases de datos y el lenguaje SQL. Consultas complejas con JOINs, funciones de agregación, índices, llaves primarias y foráneas con PostgreSQL/MySQL.',
409:     modules: [
410:       {
411:         id: 501,
412:         course: 5,
413:         order: 1,
414:         title: 'Módulo 1: Fundamentos de SQL y DDL',
415:         description: 'Creación de tablas, llaves primarias y foráneas.',
416:         lessons: [
417:           {
418:             id: 5001,
419:             module: 501,
420:             order: 1,
421:             title: '1.1 Creación de Tablas y Relaciones SQL',
422:             duration_seconds: 580,
423:             video_url: 'https://www.youtube.com/embed/uUdKAYl-F7g',
424:             content_text: `Diseña e implementa tablas relacionales con SQL.
425: 
426: \`\`\`sql
427: CREATE TABLE estudiantes (
428:     id SERIAL PRIMARY KEY,
429:     nombre VARCHAR(100) NOT NULL,
430:     email VARCHAR(150) UNIQUE NOT NULL,
431:     creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
432: );
433: \`\`\``
434:           },
435:           {
436:             id: 5002,
437:             module: 501,
438:             order: 2,
439:             title: '1.2 Consultas Avanzadas con JOINs y Agregaciones',
440:             duration_seconds: 750,
441:             video_url: 'https://www.youtube.com/embed/7Vtl22_kRmg',
442:             content_text: `Unión de tablas con INNER JOIN y agregaciones.
443: 
444: \`\`\`sql
445: SELECT c.nombre AS curso, COUNT(e.id) AS total_estudiantes
446: FROM cursos c
447: INNER JOIN inscripciones e ON c.id = e.curso_id
448: GROUP BY c.id, c.nombre
449: ORDER BY total_estudiantes DESC;
450: \`\`\``
451:           }
452:         ]
453:       }
454:     ]
455:   }
456: };
457: 
458: 
459: 
460: 
461: export function enrichCourseData(course: Course): Course {
462:   const titleLower = course.title.toLowerCase();
463:   const slugLower = (course.slug || '').toLowerCase();
464: 
465:   let seedKey = 'python';
466:   if (titleLower.includes('script') || titleLower.includes('js') || slugLower.includes('js')) {
467:     seedKey = 'javascript';
468:   } else if (titleLower.includes('bash') || titleLower.includes('terminal') || slugLower.includes('terminal')) {
469:     seedKey = 'terminal';
470:   } else if (titleLower.includes('git') || slugLower.includes('git')) {
471:     seedKey = 'git';
472:   } else if (titleLower.includes('sql') || titleLower.includes('base') || slugLower.includes('sql')) {
473:     seedKey = 'sql';
474:   }
475: 
476:   const seed = COURSE_SEED_DETAILS[seedKey];
477: 
478:   return {
479:     ...course,
480:     cover_image: course.cover_image || seed.cover_image,
481:     description: course.description && course.description.length > 20 ? course.description : seed.description,
482:     modules: course.modules && course.modules.length > 0 ? course.modules : seed.modules
483:   };
484: }
485: 
486: 
487: 
488: 
489: export function getFallbackCourse(id: number): Course {
490:   const seedKeys = Object.keys(COURSE_SEED_DETAILS);
491:   const keyIndex = Math.abs(id - 1) % seedKeys.length;
492:   const seedKey = seedKeys[keyIndex] || 'python';
493:   const seed = COURSE_SEED_DETAILS[seedKey];
494: 
495:   const titles: Record<number, string> = {
496:     1: 'Python 3: Desde Cero hasta Inteligencia Artificial',
497:     2: 'React 19 & TypeScript: Guía Práctica Fullstack',
498:     3: 'Docker & DevOps: Contenedores y CI/CD',
499:     4: 'Bases de Datos SQL: PostgreSQL y Consultas Avanzadas',
500:     5: 'Git & GitHub: Control de Versiones y Trabajo en Equipo',
501:     6: 'JavaScript Moderno ES6+: Asincronía y Promesas',
502:   };
503: 
504:   const title = titles[id] || `Curso #${id}: Desarrollo de Software Avanzado`;
505: 
506:   return {
507:     id: id,
508:     title: title,
509:     slug: `curso-${id}`,
510:     price: id % 2 === 0 ? '19.99' : '0.00',
511:     cover_image: seed.cover_image,
512:     category: 1,
513:     category_name: 'Programación & DevOps',
514:     professor_name: 'Prof. Alex López',
515:     is_active: true,
516:     modules_count: seed.modules.length,
517:     created_at: new Date().toISOString(),
518:     description: seed.description,
519:     modules: seed.modules.map((mod) => ({
520:       ...mod,
521:       course: id,
522:     })),
523:   };
524: }
````

## File: src/presentation/components/cart/PaymentCheckoutModal.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { Course } from '@domain/entities/Course';
  3: import { Button } from '../Button';
  4: import { CreditCard, Building2, Wallet, Receipt, Lock, ShieldCheck, X } from 'lucide-react';
  5: 
  6: export interface BillingDetails {
  7:   taxId: string;
  8:   billingName: string;
  9:   billingEmail: string;
 10:   billingAddress: string;
 11: }
 12: 
 13: export interface PaymentModalProps {
 14:   isOpen: boolean;
 15:   onClose: () => void;
 16:   courses: Course[];
 17:   totalRaw: number;
 18:   totalFinal: number;
 19:   discountAmount: number;
 20:   appliedCoupon?: string | null;
 21:   discountPercent?: number;
 22:   onCompleteCheckout: (billing: BillingDetails, paymentMethod: string) => Promise<void>;
 23: }
 24: 
 25: export const PaymentCheckoutModal: React.FC<PaymentModalProps> = ({
 26:   isOpen,
 27:   onClose,
 28:   courses,
 29:   totalRaw: _totalRaw,
 30:   totalFinal,
 31:   discountAmount,
 32:   appliedCoupon,
 33:   discountPercent = 0,
 34:   onCompleteCheckout,
 35: }) => {
 36:   const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'paypal'>('card');
 37: 
 38: 
 39:   const [taxId, setTaxId] = useState('1723456789001');
 40:   const [billingName, setBillingName] = useState('');
 41:   const [billingEmail, setBillingEmail] = useState('');
 42:   const [billingAddress, setBillingAddress] = useState('Quito, Ecuador');
 43: 
 44: 
 45:   const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
 46:   const [cardExpiry, setCardExpiry] = useState('12/28');
 47:   const [cardCvc, setCardCvc] = useState('884');
 48: 
 49:   const [isLoading, setIsLoading] = useState(false);
 50:   const [error, setError] = useState<string | null>(null);
 51: 
 52:   if (!isOpen) return null;
 53: 
 54:   const isFree = totalFinal === 0;
 55:   const subtotalBeforeTax = totalFinal / 1.15;
 56:   const taxAmount = totalFinal - subtotalBeforeTax;
 57: 
 58:   const handleSubmit = async (e: React.FormEvent) => {
 59:     e.preventDefault();
 60:     setError(null);
 61: 
 62:     if (!isFree) {
 63:       if (!taxId.trim()) {
 64:         setError('Por favor ingresa tu número de Cédula o RUC para la factura');
 65:         return;
 66:       }
 67:       if (!billingName.trim()) {
 68:         setError('Por favor ingresa el Nombre o Razón Social para la factura');
 69:         return;
 70:       }
 71:     }
 72: 
 73:     setIsLoading(true);
 74:     try {
 75:       await onCompleteCheckout(
 76:         {
 77:           taxId: taxId.trim() || 'Consumidor Final',
 78:           billingName: billingName.trim() || 'Estudiante OnCourses',
 79:           billingEmail: billingEmail.trim(),
 80:           billingAddress: billingAddress.trim(),
 81:         },
 82:         paymentMethod
 83:       );
 84:     } catch (err: any) {
 85:       setError(err.message || 'Ocurrió un error al procesar el pago y la matrícula');
 86:     } finally {
 87:       setIsLoading(false);
 88:     }
 89:   };
 90: 
 91:   return (
 92:     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
 93:       <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border-2 border-slate-950 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_#00b835] my-8 overflow-hidden text-slate-950 dark:text-white">
 94: 
 95:         {}
 96:         <div className="flex items-center justify-between p-5 bg-slate-100 dark:bg-slate-950 border-b-2 border-slate-950">
 97:           <div className="flex items-center gap-2.5">
 98:             <div className="p-2 bg-[#00cc33] text-slate-950 border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
 99:               <ShieldCheck className="h-5 w-5" />
100:             </div>
101:             <div>
102:               <h3 className="font-display font-black text-lg text-slate-950 dark:text-white leading-none">
103:                 {isFree ? 'Matrícula Gratuita de Cursos' : 'Pasarela de Pago Segura & Facturación'}
104:               </h3>
105:               <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">
106:                 OnCourses Checkout v2.4 • Encriptación SSL 256-bit
107:               </p>
108:             </div>
109:           </div>
110:           <button
111:             type="button"
112:             onClick={onClose}
113:             className="w-8 h-8 flex items-center justify-center border-2 border-slate-950 font-black text-slate-950 bg-white hover:bg-rose-500 hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
114:           >
115:             <X className="h-4 w-4" />
116:           </button>
117:         </div>
118: 
119:         <form onSubmit={handleSubmit} className="p-6 space-y-6">
120:           {error && (
121:             <div className="p-3 bg-rose-100 dark:bg-rose-950/60 border-2 border-rose-600 text-rose-900 dark:text-rose-200 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
122:               ⚠️ {error}
123:             </div>
124:           )}
125: 
126:           {}
127:           <div className="border-2 border-slate-950 bg-slate-50 dark:bg-slate-950 p-4 space-y-2">
128:             <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
129:               <Receipt className="h-4 w-4 text-[#00cc33]" />
130:               Resumen de Cursos a Adquirir ({courses.length})
131:             </h4>
132:             <div className="divide-y divide-slate-200 dark:divide-slate-800 max-h-36 overflow-y-auto pr-1">
133:               {courses.map((c) => (
134:                 <div key={c.id} className="py-2 flex items-center justify-between text-xs">
135:                   <span className="font-extrabold truncate max-w-md">{c.title}</span>
136:                   <span className="font-mono font-bold shrink-0 ml-2">
137:                     {parseFloat(c.price) === 0 ? 'GRATIS' : `$${parseFloat(c.price).toFixed(2)} USD`}
138:                   </span>
139:                 </div>
140:               ))}
141:             </div>
142:           </div>
143: 
144:           {!isFree && (
145:             <>
146:               {}
147:               <div className="space-y-2">
148:                 <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
149:                   1. Selecciona tu Método de Pago *
150:                 </label>
151:                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
152:                   <button
153:                     type="button"
154:                     onClick={() => setPaymentMethod('card')}
155:                     className={`p-3 border-2 border-slate-950 text-xs font-black uppercase flex items-center gap-2 transition-all cursor-pointer ${
156:                       paymentMethod === 'card'
157:                         ? 'bg-[#00cc33] text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
158:                         : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
159:                     }`}
160:                   >
161:                     <CreditCard className="h-4 w-4" />
162:                     <span>Tarjeta Crédito/Débito</span>
163:                   </button>
164: 
165:                   <button
166:                     type="button"
167:                     onClick={() => setPaymentMethod('transfer')}
168:                     className={`p-3 border-2 border-slate-950 text-xs font-black uppercase flex items-center gap-2 transition-all cursor-pointer ${
169:                       paymentMethod === 'transfer'
170:                         ? 'bg-amber-400 text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
171:                         : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
172:                     }`}
173:                   >
174:                     <Building2 className="h-4 w-4" />
175:                     <span>Transferencia / Deuna</span>
176:                   </button>
177: 
178:                   <button
179:                     type="button"
180:                     onClick={() => setPaymentMethod('paypal')}
181:                     className={`p-3 border-2 border-slate-950 text-xs font-black uppercase flex items-center gap-2 transition-all cursor-pointer ${
182:                       paymentMethod === 'paypal'
183:                         ? 'bg-sky-400 text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
184:                         : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
185:                     }`}
186:                   >
187:                     <Wallet className="h-4 w-4" />
188:                     <span>PayPal / Crypto</span>
189:                   </button>
190:                 </div>
191:               </div>
192: 
193:               {}
194:               {paymentMethod === 'card' && (
195:                 <div className="p-4 border-2 border-slate-950 bg-slate-50 dark:bg-slate-950 space-y-3">
196:                   <div className="flex items-center justify-between">
197:                     <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Datos de la Tarjeta</span>
198:                     <div className="flex gap-1.5 text-[10px] font-black font-mono bg-slate-200 dark:bg-slate-800 px-2 py-0.5 border border-slate-950">
199:                       <span>VISA</span> • <span>MC</span> • <span>AMEX</span>
200:                     </div>
201:                   </div>
202: 
203:                   <div>
204:                     <label className="text-[10px] font-bold uppercase text-slate-500">Número de Tarjeta</label>
205:                     <input
206:                       type="text"
207:                       value={cardNumber}
208:                       onChange={(e) => setCardNumber(e.target.value)}
209:                       placeholder="4532 0000 0000 0000"
210:                       className="w-full px-3 py-2 text-xs font-mono font-bold border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white outline-none focus:border-[#00cc33]"
211:                       required
212:                     />
213:                   </div>
214: 
215:                   <div className="grid grid-cols-2 gap-3">
216:                     <div>
217:                       <label className="text-[10px] font-bold uppercase text-slate-500">Expiración (MM/AA)</label>
218:                       <input
219:                         type="text"
220:                         value={cardExpiry}
221:                         onChange={(e) => setCardExpiry(e.target.value)}
222:                         placeholder="12/28"
223:                         className="w-full px-3 py-2 text-xs font-mono font-bold border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white outline-none focus:border-[#00cc33]"
224:                         required
225:                       />
226:                     </div>
227:                     <div>
228:                       <label className="text-[10px] font-bold uppercase text-slate-500">CVC / CVV</label>
229:                       <input
230:                         type="password"
231:                         maxLength={4}
232:                         value={cardCvc}
233:                         onChange={(e) => setCardCvc(e.target.value)}
234:                         placeholder="123"
235:                         className="w-full px-3 py-2 text-xs font-mono font-bold border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white outline-none focus:border-[#00cc33]"
236:                         required
237:                       />
238:                     </div>
239:                   </div>
240:                 </div>
241:               )}
242: 
243:               {paymentMethod === 'transfer' && (
244:                 <div className="p-4 border-2 border-slate-950 bg-amber-50 dark:bg-amber-950/40 text-xs space-y-2">
245:                   <span className="font-extrabold text-amber-900 dark:text-amber-200 block">
246:                     🏦 Cuentas Bancarias de Transferencia Directa (Ecuador):
247:                   </span>
248:                   <div className="font-mono text-[11px] space-y-1 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950 p-2.5 border border-slate-950">
249:                     <p>• <strong>Banco Pichincha:</strong> Cta. Cta. #2100492810 - OnCourses S.A. (RUC: 1793049281001)</p>
250:                     <p>• <strong>Banco Guayaquil:</strong> Cta. Cta. #0012948192 - OnCourses S.A.</p>
251:                     <p>• <strong>Deuna!:</strong> Escanea el QR o envía al 0991234567</p>
252:                   </div>
253:                   <p className="text-[10px] text-slate-600 dark:text-slate-400">
254:                     * Tu matrícula se activará automáticamente al procesar la confirmación.
255:                   </p>
256:                 </div>
257:               )}
258: 
259:               {}
260:               <div className="space-y-3 pt-2">
261:                 <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
262:                   2. Datos de Facturación Electrónica (SRI Ecuador) *
263:                 </label>
264:                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
265:                   <div>
266:                     <label className="text-[10px] font-bold uppercase text-slate-500">Cédula / RUC *</label>
267:                     <input
268:                       type="text"
269:                       value={taxId}
270:                       onChange={(e) => setTaxId(e.target.value)}
271:                       placeholder="1723456789001"
272:                       className="w-full px-3 py-1.5 text-xs font-mono font-bold border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white outline-none focus:border-[#00cc33]"
273:                       required
274:                     />
275:                   </div>
276:                   <div>
277:                     <label className="text-[10px] font-bold uppercase text-slate-500">Nombre / Razón Social *</label>
278:                     <input
279:                       type="text"
280:                       value={billingName}
281:                       onChange={(e) => setBillingName(e.target.value)}
282:                       placeholder="Ej: María Gómez"
283:                       className="w-full px-3 py-1.5 text-xs font-bold border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white outline-none focus:border-[#00cc33]"
284:                       required
285:                     />
286:                   </div>
287:                 </div>
288: 
289:                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
290:                   <div>
291:                     <label className="text-[10px] font-bold uppercase text-slate-500">Correo para Factura</label>
292:                     <input
293:                       type="email"
294:                       value={billingEmail}
295:                       onChange={(e) => setBillingEmail(e.target.value)}
296:                       placeholder="facturacion@correo.com"
297:                       className="w-full px-3 py-1.5 text-xs font-bold border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white outline-none focus:border-[#00cc33]"
298:                     />
299:                   </div>
300:                   <div>
301:                     <label className="text-[10px] font-bold uppercase text-slate-500">Dirección</label>
302:                     <input
303:                       type="text"
304:                       value={billingAddress}
305:                       onChange={(e) => setBillingAddress(e.target.value)}
306:                       placeholder="Av. 10 de Agosto N24-12"
307:                       className="w-full px-3 py-1.5 text-xs font-bold border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white outline-none focus:border-[#00cc33]"
308:                     />
309:                   </div>
310:                 </div>
311:               </div>
312:             </>
313:           )}
314: 
315:           {}
316:           <div className="p-4 border-2 border-slate-950 bg-slate-100 dark:bg-slate-950 space-y-1.5 text-xs font-medium">
317:             <div className="flex justify-between text-slate-600 dark:text-slate-400">
318:               <span>Subtotal (sin IVA):</span>
319:               <span className="font-bold font-mono">${subtotalBeforeTax.toFixed(2)} USD</span>
320:             </div>
321: 
322:             {discountPercent > 0 && (
323:               <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
324:                 <span>Descuento ({appliedCoupon}):</span>
325:                 <span className="font-mono">-${discountAmount.toFixed(2)} USD</span>
326:               </div>
327:             )}
328: 
329:             {!isFree && (
330:               <div className="flex justify-between text-slate-600 dark:text-slate-400">
331:                 <span>IVA (15%):</span>
332:                 <span className="font-bold font-mono">${taxAmount.toFixed(2)} USD</span>
333:               </div>
334:             )}
335: 
336:             <div className="flex justify-between text-sm font-black text-slate-950 dark:text-white pt-2 border-t-2 border-slate-950">
337:               <span>TOTAL NETO A PAGAR:</span>
338:               <span className="text-lg font-mono text-[#00cc33] font-black">${totalFinal.toFixed(2)} USD</span>
339:             </div>
340:           </div>
341: 
342:           {}
343:           <div className="flex items-center justify-end gap-3 pt-2">
344:             <button
345:               type="button"
346:               onClick={onClose}
347:               className="px-4 py-2.5 border-2 border-slate-950 bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-extrabold text-xs uppercase hover:bg-slate-200 cursor-pointer"
348:             >
349:               Cancelar
350:             </button>
351:             <Button
352:               type="submit"
353:               isLoading={isLoading}
354:               className="flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-wider"
355:             >
356:               <Lock className="h-4 w-4" />
357:               <span>{isFree ? 'Confirmar Matrícula Gratuita' : `Pagar $${totalFinal.toFixed(2)} USD y Matricularme`}</span>
358:             </Button>
359:           </div>
360:         </form>
361:       </div>
362:     </div>
363:   );
364: };
````

## File: src/presentation/components/category-management/CategoryFormModal.tsx
````typescript
  1: import React from 'react';
  2: import { Input } from '../Input';
  3: import { Button } from '../Button';
  4: import { ShieldAlert } from 'lucide-react';
  5: 
  6: interface CategoryFormModalProps {
  7:   isOpen: boolean;
  8:   isEditing: boolean;
  9:   name: string;
 10:   description: string;
 11:   slug: string;
 12:   loading: boolean;
 13:   error: string | null;
 14:   onNameChange: (val: string) => void;
 15:   onDescriptionChange: (val: string) => void;
 16:   onSlugChange: (val: string) => void;
 17:   onClose: () => void;
 18:   onSubmit: (e: React.FormEvent) => void;
 19: }
 20: 
 21: export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
 22:   isOpen,
 23:   isEditing,
 24:   name,
 25:   description,
 26:   slug,
 27:   loading,
 28:   error,
 29:   onNameChange,
 30:   onDescriptionChange,
 31:   onSlugChange,
 32:   onClose,
 33:   onSubmit,
 34: }) => {
 35:   if (!isOpen) return null;
 36: 
 37:   return (
 38:     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
 39:       <div className="w-full max-w-lg border-2 border-slate-950 bg-white p-6 text-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] animate-in zoom-in-95 duration-200">
 40:         <h2 className="font-display text-xl font-black text-slate-950 mb-4 pb-2 border-b-2 border-slate-950 flex justify-between items-center">
 41:           <span>{isEditing ? 'Editar Categoría' : 'Nueva Categoría'}</span>
 42:           <span className="text-xs font-mono bg-brand-400 text-slate-950 px-2 py-0.5 border border-slate-950">FORM</span>
 43:         </h2>
 44: 
 45:         {error && (
 46:           <div className="mb-4 flex items-start gap-2.5 bg-rose-50 border-2 border-rose-500 p-3 text-xs font-bold text-rose-900">
 47:             <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600" />
 48:             <span>{error}</span>
 49:           </div>
 50:         )}
 51: 
 52:         <form onSubmit={onSubmit} className="flex flex-col gap-4">
 53:           <Input
 54:             label="Nombre de la Categoría *"
 55:             placeholder="Ej: Inteligencia Artificial, Frontend, Backend"
 56:             value={name}
 57:             onChange={(e) => onNameChange(e.target.value)}
 58:             disabled={loading}
 59:             required
 60:           />
 61: 
 62:           <Input
 63:             label="Slug de la Categoría *"
 64:             placeholder="ej: inteligencia-artificial"
 65:             value={slug}
 66:             onChange={(e) => onSlugChange(e.target.value)}
 67:             disabled={loading}
 68:             required
 69:           />
 70: 
 71:           <div className="flex flex-col gap-1.5">
 72:             <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
 73:               Descripción (Opcional)
 74:             </label>
 75:             <textarea
 76:               placeholder="Detalles sobre esta categoría académica..."
 77:               value={description}
 78:               onChange={(e) => onDescriptionChange(e.target.value)}
 79:               disabled={loading}
 80:               rows={3}
 81:               className="w-full border-2 border-slate-950 bg-white px-4 py-2.5 text-xs font-medium outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:border-brand-500 resize-none"
 82:             />
 83:           </div>
 84: 
 85:           <div className="flex justify-end gap-3 mt-4">
 86:             <Button
 87:               type="button"
 88:               variant="outline"
 89:               size="sm"
 90:               onClick={onClose}
 91:               disabled={loading}
 92:             >
 93:               Cancelar
 94:             </Button>
 95:             <Button type="submit" size="sm" isLoading={loading}>
 96:               {isEditing ? 'Guardar Cambios' : 'Crear Categoría'}
 97:             </Button>
 98:           </div>
 99:         </form>
100:       </div>
101:     </div>
102:   );
103: };
````

## File: src/presentation/components/profile/ProfileEditForm.tsx
````typescript
  1: import React from 'react';
  2: import { Input } from '../Input';
  3: import { Button } from '../Button';
  4: 
  5: interface ProfileEditFormProps {
  6:   isProfessorOrAdmin: boolean;
  7:   firstName: string;
  8:   lastName: string;
  9:   avatar?: string;
 10:   phone: string;
 11:   biography: string;
 12:   country: string;
 13:   birthDate: string;
 14:   professionalTitle: string;
 15:   specialty: string;
 16:   linkedinUrl: string;
 17:   loading: boolean;
 18:   setFirstName: (val: string) => void;
 19:   setLastName: (val: string) => void;
 20:   setAvatar?: (val: string) => void;
 21:   onAvatarFileChange?: (file: File | null) => void;
 22:   setPhone: (val: string) => void;
 23:   setBiography: (val: string) => void;
 24:   setCountry: (val: string) => void;
 25:   setBirthDate: (val: string) => void;
 26:   setProfessionalTitle: (val: string) => void;
 27:   setSpecialty: (val: string) => void;
 28:   setLinkedinUrl: (val: string) => void;
 29:   onSubmit: (e: React.FormEvent) => void;
 30: }
 31: 
 32: export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
 33:   isProfessorOrAdmin,
 34:   firstName,
 35:   lastName,
 36:   avatar,
 37:   phone,
 38:   biography,
 39:   country,
 40:   birthDate,
 41:   professionalTitle,
 42:   specialty,
 43:   linkedinUrl,
 44:   loading,
 45:   setFirstName,
 46:   setLastName,
 47:   onAvatarFileChange,
 48:   setPhone,
 49:   setBiography,
 50:   setCountry,
 51:   setBirthDate,
 52:   setProfessionalTitle,
 53:   setSpecialty,
 54:   setLinkedinUrl,
 55:   onSubmit,
 56: }) => {
 57:   return (
 58:     <form onSubmit={onSubmit} className="flex flex-col gap-6 border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00b835] text-slate-950 dark:text-white">
 59:       <h3 className="font-display font-extrabold text-slate-950 dark:text-white text-xl pb-3 border-b-2 border-slate-950 dark:border-slate-800">
 60:         Editar Perfil de Usuario
 61:       </h3>
 62: 
 63:       {}
 64:       <div className="flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 dark:border-slate-800">
 65:         <label className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-slate-200">
 66:           Foto de Perfil (Subir imagen desde equipo)
 67:         </label>
 68:         <input
 69:           type="file"
 70:           accept="image/*"
 71:           onChange={(e) => onAvatarFileChange?.(e.target.files?.[0] || null)}
 72:           disabled={loading}
 73:           className="w-full text-xs text-slate-700 dark:text-slate-300 file:mr-4 file:py-1.5 file:px-3 file:border-2 file:border-slate-950 dark:file:border-slate-700 file:text-xs file:font-extrabold file:bg-[#00cc33] file:text-slate-950 hover:file:bg-[#00ff41] file:cursor-pointer"
 74:         />
 75:         {avatar && (
 76:           <div className="flex items-center gap-3 mt-2">
 77:             <img src={avatar} alt="Preview" className="w-12 h-12 rounded-full object-cover border-2 border-slate-950 dark:border-slate-700" />
 78:             <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">✓ Vista previa de foto cargada</span>
 79:           </div>
 80:         )}
 81:       </div>
 82: 
 83:       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 84:         <Input
 85:           label="Nombres *"
 86:           value={firstName}
 87:           onChange={(e) => setFirstName(e.target.value)}
 88:           disabled={loading}
 89:           required
 90:         />
 91:         <Input
 92:           label="Apellidos *"
 93:           value={lastName}
 94:           onChange={(e) => setLastName(e.target.value)}
 95:           disabled={loading}
 96:           required
 97:         />
 98:       </div>
 99: 
100:       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
101:         <Input
102:           label="Teléfono"
103:           value={phone}
104:           onChange={(e) => setPhone(e.target.value)}
105:           disabled={loading}
106:         />
107:         <Input
108:           label="País"
109:           value={country}
110:           onChange={(e) => setCountry(e.target.value)}
111:           disabled={loading}
112:         />
113:         <Input
114:           label="Fecha de Nacimiento"
115:           type="date"
116:           value={birthDate}
117:           onChange={(e) => setBirthDate(e.target.value)}
118:           disabled={loading}
119:         />
120:       </div>
121: 
122:       <div className="flex flex-col gap-1.5">
123:         <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">Biografía</label>
124:         <textarea
125:           placeholder="Escribe una pequeña descripción sobre tus habilidades o aficiones..."
126:           value={biography}
127:           onChange={(e) => setBiography(e.target.value)}
128:           disabled={loading}
129:           rows={4}
130:           className="w-full border-2 border-slate-950 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] outline-none transition-all focus:border-[#00cc33] resize-none font-medium"
131:         />
132:       </div>
133: 
134:       {isProfessorOrAdmin && (
135:         <div className="flex flex-col gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
136:           <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg">Información Académica / Docente</h3>
137: 
138:           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
139:             <Input
140:               label="Título Profesional"
141:               placeholder="Ej: Ingeniero de Software"
142:               value={professionalTitle}
143:               onChange={(e) => setProfessionalTitle(e.target.value)}
144:               disabled={loading}
145:             />
146:             <Input
147:               label="Especialidad / Área"
148:               placeholder="Ej: Desarrollo Backend & Cloud"
149:               value={specialty}
150:               onChange={(e) => setSpecialty(e.target.value)}
151:               disabled={loading}
152:             />
153:           </div>
154: 
155:           <Input
156:             label="LinkedIn URL"
157:             placeholder="https://linkedin.com/in/..."
158:             type="url"
159:             value={linkedinUrl}
160:             onChange={(e) => setLinkedinUrl(e.target.value)}
161:             disabled={loading}
162:           />
163:         </div>
164:       )}
165: 
166:       <div className="flex justify-end gap-3 pt-4">
167:         <Button type="submit" isLoading={loading}>
168:           Guardar Cambios
169:         </Button>
170:       </div>
171:     </form>
172:   );
173: };
````

## File: src/presentation/components/ConfirmModal.tsx
````typescript
 1: import React from 'react';
 2: import { Button } from './Button';
 3: import { ShieldAlert } from 'lucide-react';
 4: 
 5: interface ConfirmModalProps {
 6:   isOpen: boolean;
 7:   title: string;
 8:   message: string;
 9:   confirmText?: string;
10:   cancelText?: string;
11:   isDanger?: boolean;
12:   onConfirm: () => void;
13:   onCancel: () => void;
14: }
15: 
16: export const ConfirmModal: React.FC<ConfirmModalProps> = ({
17:   isOpen,
18:   title,
19:   message,
20:   confirmText = 'Confirmar',
21:   cancelText = 'Cancelar',
22:   isDanger = false,
23:   onConfirm,
24:   onCancel,
25: }) => {
26:   if (!isOpen) return null;
27: 
28:   return (
29:     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
30:       <div className="w-full max-w-md border-2 border-slate-950 bg-white p-6 text-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] animate-in zoom-in-95 duration-200">
31:         <div className="flex items-start gap-4">
32:           <div className={`p-3 border border-slate-950 shrink-0 ${isDanger ? 'bg-rose-400 text-slate-950' : 'bg-brand-400 text-slate-950'}`}>
33:             <ShieldAlert className="h-6 w-6" />
34:           </div>
35:           <div className="flex-1">
36:             <h3 className="font-display font-black text-lg text-slate-950">
37:               {title}
38:             </h3>
39:             <p className="text-slate-700 text-xs font-medium mt-2 leading-relaxed">
40:               {message}
41:             </p>
42:           </div>
43:         </div>
44: 
45:         <div className="flex justify-end gap-3 mt-6">
46:           <Button variant="outline" size="sm" onClick={onCancel}>
47:             {cancelText}
48:           </Button>
49:           <Button
50:             size="sm"
51:             variant={isDanger ? 'danger' : 'primary'}
52:             onClick={onConfirm}
53:           >
54:             {confirmText}
55:           </Button>
56:         </div>
57:       </div>
58:     </div>
59:   );
60: };
````

## File: src/presentation/components/MarkdownRenderer.tsx
````typescript
  1: import React from 'react';
  2: import { CodeBlockWithCopy } from './CodeBlockWithCopy';
  3: 
  4: interface MarkdownRendererProps {
  5:   content: string;
  6: }
  7: 
  8: export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  9:   if (!content) return null;
 10: 
 11: 
 12:   const blocks = content.split('```');
 13: 
 14:   return (
 15:     <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-sans">
 16:       {blocks.map((block, index) => {
 17: 
 18:         if (index % 2 === 1) {
 19:           const lines = block.trim().split('\n');
 20:           const firstLine = lines[0].trim();
 21:           const hasLang = /^[a-z0-9_-]+$/i.test(firstLine);
 22:           const lang = hasLang ? firstLine : 'sql';
 23:           const code = hasLang ? lines.slice(1).join('\n') : block;
 24: 
 25:           return <CodeBlockWithCopy key={index} code={code} language={lang} />;
 26:         }
 27: 
 28: 
 29:         const lines = block.split('\n');
 30:         const elements: React.ReactNode[] = [];
 31:         let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;
 32:         let currentTable: { headers: string[]; rows: string[][] } | null = null;
 33: 
 34:         const flushList = () => {
 35:           if (currentList) {
 36:             if (currentList.type === 'ul') {
 37:               elements.push(
 38:                 <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1.5 font-medium my-3 pl-2 text-slate-800 dark:text-slate-200">
 39:                   {currentList.items.map((item, i) => (
 40:                     <li key={i}>{formatInlineMarkdown(item)}</li>
 41:                   ))}
 42:                 </ul>
 43:               );
 44:             } else {
 45:               elements.push(
 46:                 <ol key={`ol-${elements.length}`} className="list-decimal list-inside space-y-1.5 font-medium my-3 pl-2 text-slate-800 dark:text-slate-200">
 47:                   {currentList.items.map((item, i) => (
 48:                     <li key={i}>{formatInlineMarkdown(item)}</li>
 49:                   ))}
 50:                 </ol>
 51:               );
 52:             }
 53:             currentList = null;
 54:           }
 55:         };
 56: 
 57:         const flushTable = () => {
 58:           if (currentTable && currentTable.headers.length > 0) {
 59:             elements.push(
 60:               <div key={`table-${elements.length}`} className="my-6 overflow-x-auto border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
 61:                 <table className="w-full text-left border-collapse font-sans text-xs">
 62:                   <thead>
 63:                     <tr className="bg-slate-950 text-[#00ff41] border-b-2 border-slate-950 font-mono text-[11px] font-bold uppercase tracking-wider">
 64:                       {currentTable.headers.map((h, hIdx) => (
 65:                         <th key={hIdx} className="py-3 px-4 border-r border-slate-800 last:border-r-0">
 66:                           {formatInlineMarkdown(h)}
 67:                         </th>
 68:                       ))}
 69:                     </tr>
 70:                   </thead>
 71:                   <tbody className="divide-y border-t border-slate-950 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium">
 72:                     {currentTable.rows.map((r, rIdx) => (
 73:                       <tr key={rIdx} className="hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors">
 74:                         {r.map((c, cIdx) => (
 75:                           <td key={cIdx} className="py-2.5 px-4 border-r border-slate-200 dark:border-slate-800 last:border-r-0">
 76:                             {formatInlineMarkdown(c)}
 77:                           </td>
 78:                         ))}
 79:                       </tr>
 80:                     ))}
 81:                   </tbody>
 82:                 </table>
 83:               </div>
 84:             );
 85:             currentTable = null;
 86:           }
 87:         };
 88: 
 89:         const flushAll = () => {
 90:           flushList();
 91:           flushTable();
 92:         };
 93: 
 94:         lines.forEach((line, lineIdx) => {
 95:           const trimmed = line.trim();
 96: 
 97:           if (!trimmed) {
 98:             flushAll();
 99:             return;
100:           }
101: 
102: 
103:           if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
104:             flushList();
105:             const cells = trimmed
106:               .split('|')
107:               .slice(1, -1)
108:               .map((c) => c.trim());
109: 
110: 
111:             const isDelimiter = cells.every((c) => /^:?-+:?$/.test(c));
112:             if (isDelimiter) {
113:               return;
114:             }
115: 
116:             if (!currentTable) {
117:               currentTable = { headers: cells, rows: [] };
118:             } else {
119:               currentTable.rows.push(cells);
120:             }
121:             return;
122:           }
123: 
124: 
125:           flushTable();
126: 
127: 
128:           if (/^[-*]\s+/.test(trimmed)) {
129:             const itemText = trimmed.replace(/^[-*]\s+/, '');
130:             if (currentList && currentList.type === 'ul') {
131:               currentList.items.push(itemText);
132:             } else {
133:               flushList();
134:               currentList = { type: 'ul', items: [itemText] };
135:             }
136:             return;
137:           }
138: 
139: 
140:           if (/^\d+\.\s+/.test(trimmed)) {
141:             const itemText = trimmed.replace(/^\d+\.\s+/, '');
142:             if (currentList && currentList.type === 'ol') {
143:               currentList.items.push(itemText);
144:             } else {
145:               flushList();
146:               currentList = { type: 'ol', items: [itemText] };
147:             }
148:             return;
149:           }
150: 
151: 
152:           flushList();
153: 
154: 
155:           if (trimmed.startsWith('# ')) {
156:             elements.push(
157:               <h1 key={lineIdx} className="font-display text-2xl font-black text-slate-950 dark:text-white mt-6 mb-3 border-b-2 border-slate-950 pb-2">
158:                 {formatInlineMarkdown(trimmed.replace('# ', ''))}
159:               </h1>
160:             );
161:             return;
162:           }
163: 
164:           if (trimmed.startsWith('## ')) {
165:             elements.push(
166:               <h2 key={lineIdx} className="font-display text-xl font-extrabold text-slate-950 dark:text-white mt-5 mb-2 border-b border-slate-300 dark:border-slate-800 pb-1">
167:                 {formatInlineMarkdown(trimmed.replace('## ', ''))}
168:               </h2>
169:             );
170:             return;
171:           }
172: 
173:           if (trimmed.startsWith('### ')) {
174:             elements.push(
175:               <h3 key={lineIdx} className="font-display text-base font-extrabold text-slate-950 dark:text-white mt-4 mb-1.5 flex items-center gap-2">
176:                 {formatInlineMarkdown(trimmed.replace('### ', ''))}
177:               </h3>
178:             );
179:             return;
180:           }
181: 
182:           if (trimmed.startsWith('#### ')) {
183:             elements.push(
184:               <div key={lineIdx} className="my-3 p-3 bg-amber-50 dark:bg-amber-950/40 border-l-4 border-amber-500 text-xs font-bold text-slate-900 dark:text-amber-200 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
185:                 {formatInlineMarkdown(trimmed.replace('#### ', ''))}
186:               </div>
187:             );
188:             return;
189:           }
190: 
191:           // Blockquote
192:           if (trimmed.startsWith('> ')) {
193:             elements.push(
194:               <blockquote key={lineIdx} className="my-3 p-3 bg-slate-100 dark:bg-slate-850 border-l-4 border-[#00cc33] text-slate-700 dark:text-slate-300 font-medium italic">
195:                 {formatInlineMarkdown(trimmed.replace('> ', ''))}
196:               </blockquote>
197:             );
198:             return;
199:           }
200: 
201:           // Horizontal rule
202:           if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
203:             elements.push(<hr key={lineIdx} className="my-6 border-slate-950 dark:border-slate-800 border-t-2" />);
204:             return;
205:           }
206: 
207: 
208:           elements.push(
209:             <p key={lineIdx} className="leading-relaxed font-medium mb-2.5">
210:               {formatInlineMarkdown(trimmed)}
211:             </p>
212:           );
213:         });
214: 
215:         flushAll();
216: 
217:         return <React.Fragment key={index}>{elements}</React.Fragment>;
218:       })}
219:     </div>
220:   );
221: };
222: 
223: 
224: function formatInlineMarkdown(text: string): React.ReactNode {
225:   if (!text) return null;
226: 
227: 
228:   const codeParts = text.split(/(`[^`]+`)/g);
229: 
230:   return codeParts.map((part, i) => {
231:     if (part.startsWith('`') && part.endsWith('`')) {
232:       return (
233:         <code key={i} className="px-1.5 py-0.5 bg-slate-900 text-[#00ff41] font-mono text-[11px] border border-slate-700 rounded-sm">
234:           {part.slice(1, -1)}
235:         </code>
236:       );
237:     }
238: 
239:     // Process links [Label](url)
240:     const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
241:     const linkMatches: Array<{ label: string; url: string; index: number; length: number }> = [];
242:     let match;
243: 
244:     while ((match = linkRegex.exec(part)) !== null) {
245:       linkMatches.push({
246:         label: match[1],
247:         url: match[2],
248:         index: match.index,
249:         length: match[0].length,
250:       });
251:     }
252: 
253:     if (linkMatches.length > 0) {
254:       const linkElements: React.ReactNode[] = [];
255:       let lastIdx = 0;
256: 
257:       linkMatches.forEach((m, mIdx) => {
258:         if (m.index > lastIdx) {
259:           linkElements.push(formatBoldItalics(part.substring(lastIdx, m.index), `${i}-${mIdx}-pre`));
260:         }
261:         linkElements.push(
262:           <a
263:             key={`${i}-${mIdx}-link`}
264:             href={m.url}
265:             target="_blank"
266:             rel="noopener noreferrer"
267:             className="text-[#00cc33] dark:text-[#00ff41] font-bold underline hover:text-brand-500 transition-colors inline-flex items-center gap-0.5"
268:           >
269:             <span>{m.label}</span>
270:             <span className="text-[10px]">↗</span>
271:           </a>
272:         );
273:         lastIdx = m.index + m.length;
274:       });
275: 
276:       if (lastIdx < part.length) {
277:         linkElements.push(formatBoldItalics(part.substring(lastIdx), `${i}-post`));
278:       }
279: 
280:       return <React.Fragment key={i}>{linkElements}</React.Fragment>;
281:     }
282: 
283:     return <React.Fragment key={i}>{formatBoldItalics(part, `${i}`)}</React.Fragment>;
284:   });
285: }
286: 
287: function formatBoldItalics(text: string, keyPrefix: string): React.ReactNode {
288:   if (!text) return null;
289: 
290:   const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
291: 
292:   return boldParts.map((bPart, j) => {
293:     if (bPart.startsWith('**') && bPart.endsWith('**')) {
294:       return <strong key={`${keyPrefix}-b-${j}`} className="font-extrabold text-slate-950 dark:text-white">{bPart.slice(2, -2)}</strong>;
295:     }
296: 
297:     const italicParts = bPart.split(/(\*[^*]+\*)/g);
298: 
299:     return italicParts.map((iPart, k) => {
300:       if (iPart.startsWith('*') && iPart.endsWith('*')) {
301:         return <em key={`${keyPrefix}-i-${j}-${k}`} className="italic text-slate-900 dark:text-slate-100">{iPart.slice(1, -1)}</em>;
302:       }
303:       return iPart;
304:     });
305:   });
306: }
````

## File: src/presentation/hooks/useCourseManagement.ts
````typescript
  1: import React, { useState, useEffect, useCallback } from 'react';
  2: import { Course } from '@domain/entities/Course';
  3: import { Category } from '@domain/entities/Category';
  4: import { useAuthStore } from '../store/useAuthStore';
  5: import {
  6:   getCoursesUseCase,
  7:   createCourseUseCase,
  8:   updateCourseUseCase,
  9:   deleteCourseUseCase,
 10: } from '@infrastructure/factories/CourseFactory';
 11: import { getCategoriesUseCase } from '@infrastructure/factories/CategoryFactory';
 12: 
 13: export const useCourseManagement = () => {
 14:   const { user } = useAuthStore();
 15:   const [courses, setCourses] = useState<Course[]>([]);
 16:   const [categories, setCategories] = useState<Category[]>([]);
 17:   const [isLoading, setIsLoading] = useState(true);
 18:   const [search, setSearch] = useState('');
 19: 
 20:   // Pagination State
 21:   const [page, setPage] = useState(1);
 22:   const [totalCourses, setTotalCourses] = useState(0);
 23: 
 24:   // Form State
 25:   const [showFormModal, setShowFormModal] = useState(false);
 26:   const [isEditing, setIsEditing] = useState(false);
 27:   const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
 28: 
 29:   const [formCategory, setFormCategory] = useState<number | ''>('');
 30:   const [formTitle, setFormTitle] = useState('');
 31:   const [formDescription, setFormDescription] = useState('');
 32:   const [formPrice, setFormPrice] = useState('');
 33:   const [formSlug, setFormSlug] = useState('');
 34:   const [formIsActive, setFormIsActive] = useState(true);
 35:   const [formCoverImage, setFormCoverImage] = useState<File | null>(null);
 36: 
 37:   // Status indicators
 38:   const [formLoading, setFormLoading] = useState(false);
 39:   const [formError, setFormError] = useState<string | null>(null);
 40:   const [successMessage, setSuccessMessage] = useState<string | null>(null);
 41: 
 42:   const isAdmin = user?.role === 'admin';
 43: 
 44:   const loadCourses = useCallback((currentPage: number = page, searchQuery: string = search) => {
 45:     setIsLoading(true);
 46:     const params: any = {};
 47:     if (searchQuery) params.search = searchQuery;
 48:     params.page = currentPage;
 49: 
 50:     getCoursesUseCase
 51:       .execute(params)
 52:       .then((data) => {
 53:         setCourses(data.results);
 54:         setTotalCourses(data.count);
 55:         setIsLoading(false);
 56:       })
 57:       .catch((err) => {
 58:         console.error('Failed to load courses', err);
 59:         setIsLoading(false);
 60:       });
 61:   }, [page, search]);
 62: 
 63:   useEffect(() => {
 64: 
 65:     getCategoriesUseCase
 66:       .execute({ page_size: 100 })
 67:       .then((data) => setCategories(data.results))
 68:       .catch((err) => console.error('Failed to load categories', err));
 69:   }, []);
 70: 
 71:   useEffect(() => {
 72:     const delayDebounceFn = setTimeout(() => {
 73:       setPage(1);
 74:       loadCourses(1, search);
 75:     }, 400);
 76: 
 77:     return () => clearTimeout(delayDebounceFn);
 78:   }, [search, loadCourses]);
 79: 
 80:   const handleOpenCreate = () => {
 81:     setIsEditing(false);
 82:     setEditingCourseId(null);
 83:     setFormCategory('');
 84:     setFormTitle('');
 85:     setFormDescription('');
 86:     setFormPrice('0.00');
 87:     setFormSlug('');
 88:     setFormIsActive(true);
 89:     setFormCoverImage(null);
 90:     setFormError(null);
 91:     setShowFormModal(true);
 92:   };
 93: 
 94:   const handleOpenEdit = (course: Course) => {
 95:     setIsEditing(true);
 96:     setEditingCourseId(course.id);
 97:     let catVal: number | '' = '';
 98:     if (typeof course.category === 'object' && course.category !== null) {
 99:       catVal = course.category.id;
100:     } else if (typeof course.category === 'number') {
101:       catVal = course.category;
102:     } else if (course.category) {
103:       const parsed = Number(course.category);
104:       catVal = Number.isNaN(parsed) ? '' : parsed;
105:     }
106:     setFormCategory(catVal);
107:     setFormTitle(course.title);
108:     setFormDescription(course.description || '');
109:     setFormPrice(course.price);
110:     setFormSlug(course.slug);
111:     setFormIsActive(course.is_active);
112:     setFormCoverImage(null);
113:     setFormError(null);
114:     setShowFormModal(true);
115:   };
116: 
117:   const handleTitleChange = (val: string) => {
118:     setFormTitle(val);
119:     const generatedSlug = val
120:       .toLowerCase()
121:       .normalize('NFD')
122:       .replace(/[\u0300-\u036f]/g, '')
123:       .replace(/[^a-z0-9]+/g, '-')
124:       .replace(/(^-|-$)+/g, '');
125:     setFormSlug(generatedSlug);
126:   };
127: 
128:   const handleSubmit = async (e: React.FormEvent) => {
129:     e.preventDefault();
130:     setFormError(null);
131: 
132:     if (!formCategory) {
133:       setFormError('Por favor selecciona una categoría');
134:       return;
135:     }
136: 
137:     if (!formTitle.trim()) {
138:       setFormError('El título del curso es obligatorio');
139:       return;
140:     }
141: 
142:     if (!formSlug.trim()) {
143:       setFormError('El slug del curso es obligatorio');
144:       return;
145:     }
146: 
147:     setFormLoading(true);
148: 
149: 
150:     const data = new FormData();
151:     data.append('category', String(formCategory));
152:     data.append('title', formTitle.trim());
153:     data.append('description', formDescription.trim());
154:     data.append('price', formPrice);
155:     data.append('slug', formSlug.trim());
156:     data.append('is_active', String(formIsActive));
157: 
158:     if (formCoverImage) {
159:       data.append('cover_image', formCoverImage);
160:     }
161: 
162:     try {
163:       if (isEditing && editingCourseId !== null) {
164:         await updateCourseUseCase.execute(editingCourseId, data);
165:         setSuccessMessage('Curso actualizado correctamente');
166:       } else {
167:         await createCourseUseCase.execute(data);
168:         setSuccessMessage('Curso creado correctamente');
169:       }
170: 
171:       setShowFormModal(false);
172:       loadCourses();
173:       setTimeout(() => setSuccessMessage(null), 4000);
174:     } catch (err: any) {
175:       setFormError(err.message || 'Error al guardar el curso');
176:     } finally {
177:       setFormLoading(false);
178:     }
179:   };
180: 
181:   const handleDelete = async (courseId: number) => {
182:     if (!isAdmin) {
183:       alert('Solo los administradores tienen permisos para eliminar recursos.');
184:       return;
185:     }
186: 
187:     try {
188:       await deleteCourseUseCase.execute(courseId);
189:       setSuccessMessage('Curso eliminado correctamente');
190:       loadCourses();
191:       setTimeout(() => setSuccessMessage(null), 4000);
192:     } catch (err: any) {
193:       alert(err.message || 'Error al eliminar el curso');
194:     }
195:   };
196: 
197:   const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
198: 
199:   const handleToggleActive = async (course: Course) => {
200:     try {
201:       const updatedStatus = !course.is_active;
202:       await updateCourseUseCase.execute(course.id, { is_active: updatedStatus });
203:       setSuccessMessage(`El curso "${course.title}" ahora está ${updatedStatus ? '🟢 ACTIVO' : '🟡 INACTIVO'}`);
204:       loadCourses();
205:       setTimeout(() => setSuccessMessage(null), 3500);
206:     } catch (err: any) {
207:       alert(err.message || 'Error al cambiar estado del curso');
208:     }
209:   };
210: 
211:   const filteredCourses = courses.filter((c) => {
212:     if (statusFilter === 'active') return c.is_active;
213:     if (statusFilter === 'inactive') return !c.is_active;
214:     return true;
215:   });
216: 
217:   return {
218:     courses: filteredCourses,
219:     rawCourses: courses,
220:     categories,
221:     isLoading,
222:     search,
223:     setSearch,
224:     statusFilter,
225:     setStatusFilter,
226:     page,
227:     setPage,
228:     totalCourses,
229:     showFormModal,
230:     setShowFormModal,
231:     isEditing,
232:     formCategory,
233:     setFormCategory,
234:     formTitle,
235:     setFormTitle,
236:     formDescription,
237:     setFormDescription,
238:     formPrice,
239:     setFormPrice,
240:     formSlug,
241:     setFormSlug,
242:     formIsActive,
243:     setFormIsActive,
244:     setFormCoverImage,
245:     formLoading,
246:     formError,
247:     successMessage,
248:     isAdmin,
249:     loadCourses,
250:     handleOpenCreate,
251:     handleOpenEdit,
252:     handleTitleChange,
253:     handleSubmit,
254:     handleToggleActive,
255:     handleDelete,
256:   };
257: };
````

## File: src/presentation/hooks/useProfile.ts
````typescript
  1: import React, { useState } from 'react';
  2: import { useAuthStore } from '../store/useAuthStore';
  3: 
  4: export const useProfile = () => {
  5:   const { user, updateProfile, isLoading, error } = useAuthStore();
  6:   const [isEditing, setIsEditing] = useState(false);
  7: 
  8:   const getCachedRegistration = () => {
  9:     try {
 10:       const stored = JSON.parse(localStorage.getItem('oncourses_registered_users') || '{}');
 11:       if (user?.username && stored[user.username.toLowerCase()]) return stored[user.username.toLowerCase()];
 12:       if (user?.email && stored[user.email.toLowerCase()]) return stored[user.email.toLowerCase()];
 13:     } catch {}
 14:     return null;
 15:   };
 16: 
 17:   const cachedReg = getCachedRegistration();
 18:   const defaultPhone = user?.phone || cachedReg?.phone || '+593 99 123 4567';
 19:   const defaultCountry = user?.country || cachedReg?.country || 'Ecuador';
 20: 
 21: 
 22:   const [firstName, setFirstName] = useState(user?.first_name || cachedReg?.first_name || '');
 23:   const [lastName, setLastName] = useState(user?.last_name || cachedReg?.last_name || '');
 24:   const [avatar, setAvatar] = useState(user?.avatar || '');
 25:   const [phone, setPhone] = useState(defaultPhone);
 26:   const [biography, setBiography] = useState(user?.biography || '');
 27:   const [country, setCountry] = useState(defaultCountry);
 28:   const [birthDate, setBirthDate] = useState(user?.birth_date || '');
 29:   const [professionalTitle, setProfessionalTitle] = useState(user?.professional_title || '');
 30:   const [specialty, setSpecialty] = useState(user?.specialty || '');
 31:   const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedin_url || '');
 32: 
 33:   // Notifications
 34:   const [successMsg, setSuccessMsg] = useState<string | null>(null);
 35:   const [formError, setFormError] = useState<string | null>(null);
 36: 
 37:   const isProfessorOrAdmin = user?.role === 'admin' || user?.role === 'professor';
 38: 
 39:   const handleAvatarFile = (file: File | null) => {
 40:     if (!file) return;
 41:     const reader = new FileReader();
 42:     reader.onloadend = () => {
 43:       setAvatar(reader.result as string);
 44:     };
 45:     reader.readAsDataURL(file);
 46:   };
 47: 
 48:   const handleEditToggle = () => {
 49:     if (isEditing) {
 50: 
 51:       setFirstName(user?.first_name || cachedReg?.first_name || '');
 52:       setLastName(user?.last_name || cachedReg?.last_name || '');
 53:       setAvatar(user?.avatar || '');
 54:       setPhone(user?.phone || cachedReg?.phone || '+593 99 123 4567');
 55:       setBiography(user?.biography || '');
 56:       setCountry(user?.country || cachedReg?.country || 'Ecuador');
 57:       setBirthDate(user?.birth_date || '');
 58:       setProfessionalTitle(user?.professional_title || '');
 59:       setSpecialty(user?.specialty || '');
 60:       setLinkedinUrl(user?.linkedin_url || '');
 61:     }
 62:     setIsEditing(!isEditing);
 63:     setFormError(null);
 64:     setSuccessMsg(null);
 65:   };
 66: 
 67:   const handleSubmit = async (e: React.FormEvent) => {
 68:     e.preventDefault();
 69:     setFormError(null);
 70:     setSuccessMsg(null);
 71: 
 72:     const data: any = {
 73:       first_name: firstName.trim(),
 74:       last_name: lastName.trim(),
 75:       avatar: avatar,
 76:       phone: phone.trim(),
 77:       biography: biography.trim(),
 78:       country: country.trim(),
 79:       birth_date: birthDate || null,
 80:     };
 81: 
 82:     if (isProfessorOrAdmin) {
 83:       data.professional_title = professionalTitle.trim();
 84:       data.specialty = specialty.trim();
 85:       data.linkedin_url = linkedinUrl.trim();
 86:     }
 87: 
 88:     try {
 89:       await updateProfile(data);
 90:       setSuccessMsg('¡Perfil actualizado correctamente!');
 91:       setIsEditing(false);
 92:       setTimeout(() => setSuccessMsg(null), 4000);
 93:     } catch (err: any) {
 94:       setFormError(err.message || 'Error al guardar los cambios de perfil');
 95:     }
 96:   };
 97: 
 98: 
 99:   const getInitials = () => {
100:     const f = firstName.substring(0, 1).toUpperCase();
101:     const l = lastName.substring(0, 1).toUpperCase();
102:     return f + l || user?.username.substring(0, 2).toUpperCase() || 'U';
103:   };
104: 
105: 
106:   const formatJoinedDate = (dateStr?: string) => {
107:     if (!dateStr) return 'N/A';
108:     try {
109:       const date = new Date(dateStr);
110:       return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
111:     } catch {
112:       return dateStr;
113:     }
114:   };
115: 
116: 
117:   const getRoleConfig = () => {
118:     switch (user?.role) {
119:       case 'admin':
120:         return {
121:           label: 'ADMINISTRADOR',
122:           bg: 'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-455 border border-rose-250/20',
123:           dot: 'bg-rose-500',
124:         };
125:       case 'professor':
126:         return {
127:           label: 'DOCENTE',
128:           bg: 'bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-455 border border-violet-250/20',
129:           dot: 'bg-violet-500',
130:         };
131:       default:
132:         return {
133:           label: 'ESTUDIANTE',
134:           bg: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-455 border border-emerald-250/20',
135:           dot: 'bg-emerald-500',
136:         };
137:     }
138:   };
139: 
140:   return {
141:     user,
142:     isEditing,
143:     firstName,
144:     setFirstName,
145:     lastName,
146:     setLastName,
147:     avatar,
148:     setAvatar,
149:     handleAvatarFile,
150:     phone,
151:     setPhone,
152:     biography,
153:     setBiography,
154:     country,
155:     setCountry,
156:     birthDate,
157:     setBirthDate,
158:     professionalTitle,
159:     setProfessionalTitle,
160:     specialty,
161:     setSpecialty,
162:     linkedinUrl,
163:     setLinkedinUrl,
164:     successMsg,
165:     formError,
166:     isLoading,
167:     error,
168:     isProfessorOrAdmin,
169:     handleEditToggle,
170:     handleSubmit,
171:     getInitials,
172:     formatJoinedDate,
173:     roleConfig: getRoleConfig(),
174:   };
175: };
````

## File: src/index.css
````css
 1: @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
 2: 
 3: @import "tailwindcss";
 4: 
 5: @theme {
 6:   --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
 7:   --font-display: 'Outfit', system-ui, sans-serif;
 8: 
 9: 
10:   --color-brand-50:  #f0fff4;
11:   --color-brand-100: #c2ffd4;
12:   --color-brand-200: #7bffa8;
13:   --color-brand-300: #39ff7c;
14:   --color-brand-400: #00b835;
15:   --color-brand-500: #00cc33;
16:   --color-brand-600: #009926;
17:   --color-brand-700: #007a1f;
18:   --color-brand-800: #005c17;
19:   --color-brand-900: #003d10;
20:   --color-brand-950: #001f08;
21: }
22: 
23: 
24: @variant dark (&:where(.dark, .dark *));
25: 
26: 
27: *, *::before, *::after {
28:   transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
29:   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
30:   transition-duration: 150ms;
31: }
32: 
33: body {
34:   font-family: var(--font-sans);
35:   background-color: #fcfcfd;
36:   color: #1f2937;
37:   overflow-x: hidden;
38: }
39: 
40: .dark body {
41:   background-color: #0b0c10;
42:   color: #f3f4f6;
43: }
44: 
45: 
46: ::-webkit-scrollbar {
47:   width: 8px;
48:   height: 8px;
49: }
50: 
51: ::-webkit-scrollbar-track {
52:   background: transparent;
53: }
54: 
55: .dark ::-webkit-scrollbar-track {
56:   background: transparent;
57: }
58: 
59: ::-webkit-scrollbar-thumb {
60:   background: #cbd5e1;
61:   border-radius: 4px;
62: }
63: 
64: .dark ::-webkit-scrollbar-thumb {
65:   background: #374151;
66: }
67: 
68: ::-webkit-scrollbar-thumb:hover {
69:   background: #94a3b8;
70: }
71: 
72: .dark ::-webkit-scrollbar-thumb:hover {
73:   background: #4b5563;
74: }
75: 
76: 
77: @keyframes grid-move {
78:   0%   { background-position: 0 0, 0 0; }
79:   100% { background-position: 40px 40px, 40px 40px; }
80: }
81: 
82: .animate-grid {
83:   animation: grid-move 5s linear infinite;
84: }
85: 
86: 
87: @keyframes progress-fill {
88:   0%   { width: 10%; }
89:   50%  { width: 95%; }
90:   100% { width: 10%; }
91: }
92: 
93: .animate-progress-1 { animation: progress-fill 4s ease-in-out infinite; }
94: .animate-progress-2 { animation: progress-fill 3s ease-in-out infinite; }
95: .animate-progress-3 { animation: progress-fill 5s ease-in-out infinite; }
96: .animate-progress-4 { animation: progress-fill 3.5s ease-in-out infinite; }
````

## File: src/presentation/components/cart/CartDrawer.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { useNavigate } from 'react-router-dom';
  3: import { useCartStore } from '../../store/useCartStore';
  4: import { useAuthStore } from '../../store/useAuthStore';
  5: import { enrollInCourseUseCase } from '@infrastructure/factories/EnrollmentFactory';
  6: import { Course } from '@domain/entities/Course';
  7: import { Button } from '../Button';
  8: import { ShoppingBag, Trash2, Tag, X, ShieldCheck } from 'lucide-react';
  9: import { PaymentCheckoutModal, BillingDetails } from './PaymentCheckoutModal';
 10: import { InvoiceModal } from './InvoiceModal';
 11: 
 12: export const CartDrawer: React.FC = () => {
 13:   const {
 14:     items,
 15:     isOpen,
 16:     closeCart,
 17:     removeItem,
 18:     clearCart,
 19:     appliedCoupon,
 20:     discountPercent,
 21:     applyCoupon,
 22:     removeCoupon,
 23:     getTotalPrice,
 24:     getDiscountedTotal,
 25:   } = useCartStore();
 26: 
 27:   const { isAuthenticated, user } = useAuthStore();
 28:   const navigate = useNavigate();
 29: 
 30:   const [couponCode, setCouponCode] = useState('');
 31:   const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
 32: 
 33:   // Modals state
 34:   const [showPaymentModal, setShowPaymentModal] = useState(false);
 35:   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
 36:   const [currentBilling, setCurrentBilling] = useState<BillingDetails | null>(null);
 37:   const [currentPaymentMethod, setCurrentPaymentMethod] = useState('card');
 38:   const [invoiceNumber, setInvoiceNumber] = useState('');
 39:   const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
 40: 
 41:   if (!isOpen && !showPaymentModal && !showInvoiceModal) return null;
 42: 
 43:   const totalRaw = getTotalPrice();
 44:   const totalFinal = getDiscountedTotal();
 45:   const discountAmount = totalRaw - totalFinal;
 46: 
 47:   const handleApplyCoupon = (e: React.FormEvent) => {
 48:     e.preventDefault();
 49:     const res = applyCoupon(couponCode);
 50:     setCouponFeedback(res);
 51:     if (res.success) {
 52:       setCouponCode('');
 53:     }
 54:   };
 55: 
 56:   const handleOpenCheckoutModal = () => {
 57:     if (!isAuthenticated) {
 58:       closeCart();
 59:       navigate('/login', { state: { from: '/cart' } });
 60:       return;
 61:     }
 62:     setShowPaymentModal(true);
 63:   };
 64: 
 65:   const handleCompleteCheckout = async (billing: BillingDetails, paymentMethod: string) => {
 66:     if (!user) return;
 67: 
 68:     const coursesToEnroll = [...items];
 69:     const newEnrollments: any[] = [];
 70: 
 71: 
 72:     for (const course of coursesToEnroll) {
 73:       try {
 74:         await enrollInCourseUseCase.execute(course.id);
 75:       } catch (err) {
 76:         console.warn(`API enrollment for course ${course.id} failed, relying on local cache`, err);
 77:       }
 78: 
 79:       newEnrollments.push({
 80:         id: Date.now() + Math.floor(Math.random() * 1000),
 81:         student: user.id,
 82:         course: course.id,
 83:         course_title: course.title,
 84:         enrolled_at: new Date().toISOString(),
 85:         total_progress: '0.00',
 86:         course_data: course,
 87:       });
 88:     }
 89: 
 90: 
 91:     try {
 92:       const userKey = user.username?.toLowerCase() || String(user.id);
 93:       const existingCache = JSON.parse(localStorage.getItem('oncourses_user_enrollments') || '{}');
 94:       const userEnrollments = existingCache[userKey] || [];
 95: 
 96:       const merged = [...userEnrollments];
 97:       for (const newEnr of newEnrollments) {
 98:         if (!merged.some((e: any) => e.course === newEnr.course)) {
 99:           merged.push(newEnr);
100:         }
101:       }
102: 
103:       existingCache[userKey] = merged;
104:       localStorage.setItem('oncourses_user_enrollments', JSON.stringify(existingCache));
105:     } catch (storageErr) {
106:       console.warn('Could not save local enrollment cache', storageErr);
107:     }
108: 
109: 
110:     const randomFac = 'FAC-2026-' + Math.floor(10000 + Math.random() * 90000);
111:     setInvoiceNumber(randomFac);
112:     setPurchasedCourses(coursesToEnroll);
113:     setCurrentBilling(billing);
114:     setCurrentPaymentMethod(paymentMethod);
115: 
116: 
117:     clearCart();
118:     setShowPaymentModal(false);
119:     setShowInvoiceModal(true);
120:   };
121: 
122:   const handleGoToMyCourses = () => {
123:     setShowInvoiceModal(false);
124:     closeCart();
125:     navigate(user?.role === 'admin' || user?.role === 'professor' ? '/admin' : '/dashboard');
126:   };
127: 
128:   return (
129:     <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
130:       <div className="w-full max-w-md bg-white dark:bg-slate-900 border-l-2 border-slate-950 flex flex-col h-full shadow-[-8px_0px_0px_0px_rgba(0,0,0,1)] dark:shadow-[-8px_0px_0px_0px_#00b835] overflow-hidden text-slate-950 dark:text-white">
131:         {}
132:         <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-100 border-b-2 border-slate-950 shrink-0">
133:           <div className="flex items-center gap-2">
134:             <ShoppingBag className="h-4 w-4 text-emerald-600" />
135:             <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 font-mono">
136:               ONCOURSES.APP/CART ({items.length})
137:             </span>
138:           </div>
139:           <div className="flex items-center gap-1.5">
140:             <button
141:               onClick={closeCart}
142:               className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 bg-white hover:bg-rose-500 hover:text-white transition-colors cursor-pointer select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
143:             >
144:               X
145:             </button>
146:           </div>
147:         </div>
148: 
149:         {}
150:         <div className="flex-1 overflow-y-auto p-4 space-y-3">
151:               {items.length === 0 ? (
152:                 <div className="h-full flex flex-col items-center justify-center text-center p-6 my-auto">
153:                   <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 border-2 border-slate-950 flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
154:                     <ShoppingBag className="h-8 w-8" />
155:                   </div>
156:                   <h4 className="font-display text-lg font-black text-slate-950 dark:text-white mb-1">
157:                     Tu carrito está vacío
158:                   </h4>
159:                   <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mb-6">
160:                     Explora nuestro catálogo completo y agrega tus cursos de programación preferidos.
161:                   </p>
162:                   <Button
163:                     onClick={() => {
164:                       closeCart();
165:                       navigate('/courses');
166:                     }}
167:                     variant="primary"
168:                     size="sm"
169:                   >
170:                     Explorar Cursos
171:                   </Button>
172:                 </div>
173:               ) : (
174:                 items.map((course) => {
175:                   const priceNum = parseFloat(course.price) || 0;
176:                   return (
177:                     <div
178:                       key={course.id}
179:                       className="flex items-center gap-3 p-3 bg-white dark:bg-slate-950 border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] transition-all"
180:                     >
181:                       <div className="w-14 h-14 bg-slate-900 border border-slate-950 shrink-0 overflow-hidden flex items-center justify-center text-white font-extrabold text-xs">
182:                         {course.cover_image ? (
183:                           <img
184:                             src={course.cover_image}
185:                             alt={course.title}
186:                             className="w-full h-full object-cover"
187:                           />
188:                         ) : (
189:                           <span>{course.title.slice(0, 2).toUpperCase()}</span>
190:                         )}
191:                       </div>
192: 
193:                       <div className="flex-1 min-w-0">
194:                         <h4 className="font-display text-xs font-black text-slate-950 dark:text-white truncate">
195:                           {course.title}
196:                         </h4>
197:                         <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
198:                           {course.professor_name || 'Profesor OnCourses'}
199:                         </p>
200:                         <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-1">
201:                           {priceNum === 0 ? 'GRATIS' : `$${priceNum.toFixed(2)} USD`}
202:                         </p>
203:                       </div>
204: 
205:                       <button
206:                         onClick={() => removeItem(course.id)}
207:                         className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-transparent hover:border-slate-950 transition-all cursor-pointer"
208:                         title="Eliminar curso"
209:                       >
210:                         <Trash2 className="h-4 w-4" />
211:                       </button>
212:                     </div>
213:                   );
214:                 })
215:               )}
216:             </div>
217: 
218:             {}
219:             {items.length > 0 && (
220:               <div className="border-t-2 border-slate-950 bg-slate-50 dark:bg-slate-950 p-4 shrink-0 space-y-3">
221:                 {}
222:                 <form onSubmit={handleApplyCoupon} className="space-y-1.5">
223:                   <div className="flex gap-1.5">
224:                     <div className="relative flex-1">
225:                       <Tag className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
226:                       <input
227:                         type="text"
228:                         placeholder="Código: ALEXLOPEZ"
229:                         value={couponCode}
230:                         onChange={(e) => setCouponCode(e.target.value)}
231:                         className="w-full pl-8 pr-2 py-1.5 text-xs font-bold font-mono border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white uppercase outline-none focus:border-brand-500"
232:                       />
233:                     </div>
234:                     <Button type="submit" size="sm" variant="outline">
235:                       Aplicar
236:                     </Button>
237:                   </div>
238: 
239:                   {couponFeedback && (
240:                     <p
241:                       className={`text-[11px] font-bold ${
242:                         couponFeedback.success
243:                           ? 'text-emerald-600 dark:text-emerald-400'
244:                           : 'text-rose-600 dark:text-rose-400'
245:                       }`}
246:                     >
247:                       {couponFeedback.message}
248:                     </p>
249:                   )}
250: 
251:                   {appliedCoupon && (
252:                     <div className="flex items-center justify-between text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 p-1.5 text-emerald-900 dark:text-emerald-200">
253:                       <span>Cupón {appliedCoupon} ({discountPercent}% DESC)</span>
254:                       <button
255:                         type="button"
256:                         onClick={removeCoupon}
257:                         className="text-rose-600 hover:underline font-extrabold cursor-pointer"
258:                       >
259:                         <X className="h-3.5 w-3.5" />
260:                       </button>
261:                     </div>
262:                   )}
263:                 </form>
264: 
265:                 {}
266:                 {(() => {
267:                   const subtotalBeforeTax = totalFinal / 1.15;
268:                   const taxAmount = totalFinal - subtotalBeforeTax;
269:                   return (
270:                     <div className="space-y-1 text-xs pt-2 border-t border-slate-200 dark:border-slate-800">
271:                       <div className="flex justify-between text-slate-600 dark:text-slate-400">
272:                         <span>Subtotal (sin IVA):</span>
273:                         <span className="font-bold font-mono">${subtotalBeforeTax.toFixed(2)} USD</span>
274:                       </div>
275: 
276:                       {discountPercent > 0 && (
277:                         <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
278:                           <span>Descuento aplicado:</span>
279:                           <span className="font-mono">-${discountAmount.toFixed(2)} USD</span>
280:                         </div>
281:                       )}
282: 
283:                       {totalFinal > 0 && (
284:                         <div className="flex justify-between text-slate-600 dark:text-slate-400">
285:                           <span>IVA (15%):</span>
286:                           <span className="font-bold font-mono">${taxAmount.toFixed(2)} USD</span>
287:                         </div>
288:                       )}
289: 
290:                       <div className="flex justify-between text-sm font-black text-slate-950 dark:text-white pt-1.5 border-t border-slate-950 dark:border-slate-800">
291:                         <span>TOTAL A PAGAR:</span>
292:                         <span className="text-base text-[#00cc33] font-mono">${totalFinal.toFixed(2)} USD</span>
293:                       </div>
294:                     </div>
295:                   );
296:                 })()}
297: 
298:                 {}
299:                 <Button
300:                   onClick={handleOpenCheckoutModal}
301:                   className="w-full flex items-center justify-center gap-2 py-3"
302:                 >
303:                   <ShieldCheck className="h-4 w-4" />
304:                   <span>{totalFinal === 0 ? 'Inscribirme Gratis' : 'Completar Compra & Facturar'}</span>
305:                 </Button>
306:               </div>
307:             )}
308: 
309:         {}
310:         <PaymentCheckoutModal
311:           isOpen={showPaymentModal}
312:           onClose={() => setShowPaymentModal(false)}
313:           courses={items}
314:           totalRaw={totalRaw}
315:           totalFinal={totalFinal}
316:           discountAmount={discountAmount}
317:           appliedCoupon={appliedCoupon}
318:           discountPercent={discountPercent}
319:           onCompleteCheckout={handleCompleteCheckout}
320:         />
321: 
322:         {}
323:         {currentBilling && (
324:           <InvoiceModal
325:             isOpen={showInvoiceModal}
326:             onClose={() => setShowInvoiceModal(false)}
327:             courses={purchasedCourses}
328:             billing={currentBilling}
329:             paymentMethod={currentPaymentMethod}
330:             totalRaw={totalRaw}
331:             totalFinal={totalFinal}
332:             discountAmount={discountAmount}
333:             invoiceNumber={invoiceNumber}
334:             invoiceDate={new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
335:             onGoToCourses={handleGoToMyCourses}
336:           />
337:         )}
338:       </div>
339:     </div>
340:   );
341: };
````

## File: src/presentation/components/cart/InvoiceModal.tsx
````typescript
  1: import React from 'react';
  2: import { Course } from '@domain/entities/Course';
  3: import { Button } from '../Button';
  4: import { Printer, CheckCircle2, ArrowRight, Download, FileText, Mail } from 'lucide-react';
  5: import { BillingDetails } from './PaymentCheckoutModal';
  6: 
  7: export interface InvoiceModalProps {
  8:   isOpen: boolean;
  9:   onClose?: () => void;
 10:   courses: Course[];
 11:   billing: BillingDetails;
 12:   paymentMethod: string;
 13:   totalRaw: number;
 14:   totalFinal: number;
 15:   discountAmount: number;
 16:   invoiceNumber: string;
 17:   invoiceDate: string;
 18:   onGoToCourses: () => void;
 19: }
 20: 
 21: export const InvoiceModal: React.FC<InvoiceModalProps> = ({
 22:   isOpen,
 23:   onClose: _onClose,
 24:   courses,
 25:   billing,
 26:   paymentMethod,
 27:   totalRaw: _totalRaw,
 28:   totalFinal,
 29:   discountAmount,
 30:   invoiceNumber,
 31:   invoiceDate,
 32:   onGoToCourses,
 33: }) => {
 34:   if (!isOpen) return null;
 35: 
 36:   const isFree = totalFinal === 0;
 37:   const subtotalBeforeTax = totalFinal / 1.15;
 38:   const taxAmount = totalFinal - subtotalBeforeTax;
 39: 
 40:   const handlePrint = () => {
 41:     window.print();
 42:   };
 43: 
 44:   return (
 45:     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto print:p-0 print:bg-white">
 46:       <div className="w-full max-w-2xl bg-white text-slate-950 border-2 border-slate-950 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] my-8 overflow-hidden print:border-none print:shadow-none print:my-0">
 47: 
 48:         {}
 49:         <div className="bg-[#00cc33] text-slate-950 px-6 py-4 border-b-2 border-slate-950 flex items-center justify-between print:hidden">
 50:           <div className="flex items-center gap-3">
 51:             <CheckCircle2 className="h-7 w-7" />
 52:             <div>
 53:               <h3 className="font-display font-black text-xl leading-none">¡Inscripción & Pago Exitoso!</h3>
 54:               <p className="text-xs font-bold mt-1">Se ha generado tu comprobante electrónico de compra.</p>
 55:             </div>
 56:           </div>
 57:           <div className="flex gap-2">
 58:             <button
 59:               onClick={handlePrint}
 60:               className="px-3 py-1.5 bg-white text-slate-950 font-black text-xs uppercase border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
 61:             >
 62:               <Printer className="h-3.5 w-3.5" />
 63:               <span>Imprimir</span>
 64:             </button>
 65:           </div>
 66:         </div>
 67: 
 68:         {}
 69:         <div className="p-4 mx-8 mt-6 bg-emerald-50 border-2 border-slate-950 text-slate-950 text-xs font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-start gap-3 print:hidden">
 70:           <div className="p-2 bg-[#00cc33] text-slate-950 border border-slate-950 shrink-0">
 71:             <Mail className="h-5 w-5" />
 72:           </div>
 73:           <div>
 74:             <h4 className="font-extrabold text-sm text-slate-950">
 75:               ✉️ Factura Electrónica Enviada al Correo
 76:             </h4>
 77:             <p className="text-xs font-medium text-slate-700 mt-0.5">
 78:               Hemos enviado una copia digital autorizada en PDF y XML a: <span className="font-bold underline text-slate-950">{billing.billingEmail || 'tu correo registrado'}</span>.
 79:             </p>
 80:           </div>
 81:         </div>
 82: 
 83:         {}
 84:         <div className="p-8 space-y-6 bg-white" id="invoice-printable">
 85:           {}
 86:           <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-950 pb-6 gap-4">
 87:             <div>
 88:               <div className="flex items-center gap-2 mb-1">
 89:                 <FileText className="h-6 w-6 text-[#00cc33]" />
 90:                 <h2 className="font-display font-black text-2xl tracking-tight text-slate-950">OnCourses</h2>
 91:               </div>
 92:               <p className="text-xs font-bold text-slate-600">OnCourses Learning Platforms S.A.</p>
 93:               <p className="text-[11px] font-mono text-slate-500">RUC: 1793049281001 • Autorización SRI #202604812</p>
 94:               <p className="text-[11px] font-mono text-slate-500">Av. República E7-123 y Almagro, Quito, Ecuador</p>
 95:             </div>
 96: 
 97:             <div className="text-left sm:text-right border-l-2 sm:border-l-0 border-slate-950 pl-4 sm:pl-0">
 98:               <span className="inline-block bg-slate-950 text-white font-mono font-black text-xs px-3 py-1 uppercase tracking-wider mb-2">
 99:                 FACTURA ELECTRÓNICA
100:               </span>
101:               <p className="text-sm font-mono font-black text-slate-950">No. {invoiceNumber}</p>
102:               <p className="text-xs font-mono text-slate-600 mt-1">Fecha: {invoiceDate}</p>
103:               <p className="text-xs font-mono font-bold text-emerald-700 mt-1">Forma de Pago: {paymentMethod.toUpperCase()}</p>
104:             </div>
105:           </div>
106: 
107:           {}
108:           <div className="border-2 border-slate-950 bg-slate-50 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
109:             <div>
110:               <span className="font-bold text-slate-500 uppercase text-[10px] block">Cliente / Razon Social:</span>
111:               <span className="font-extrabold text-slate-950 text-sm">{billing.billingName}</span>
112:             </div>
113:             <div>
114:               <span className="font-bold text-slate-500 uppercase text-[10px] block">Cédula / RUC / Pasaporte:</span>
115:               <span className="font-mono font-black text-slate-950 text-sm">{billing.taxId}</span>
116:             </div>
117:             {billing.billingEmail && (
118:               <div>
119:                 <span className="font-bold text-slate-500 uppercase text-[10px] block">Correo Electrónico:</span>
120:                 <span className="font-medium text-slate-800">{billing.billingEmail}</span>
121:               </div>
122:             )}
123:             {billing.billingAddress && (
124:               <div>
125:                 <span className="font-bold text-slate-500 uppercase text-[10px] block">Dirección:</span>
126:                 <span className="font-medium text-slate-800">{billing.billingAddress}</span>
127:               </div>
128:             )}
129:           </div>
130: 
131:           {}
132:           <div className="border-2 border-slate-950 overflow-hidden">
133:             <table className="w-full text-left text-xs">
134:               <thead className="bg-slate-950 text-white font-black uppercase text-[10px] tracking-wider">
135:                 <tr>
136:                   <th className="py-2.5 px-4">Descripción del Curso</th>
137:                   <th className="py-2.5 px-4 text-center">Cant.</th>
138:                   <th className="py-2.5 px-4 text-right">Precio Unit.</th>
139:                   <th className="py-2.5 px-4 text-right">Total</th>
140:                 </tr>
141:               </thead>
142:               <tbody className="divide-y border-t-2 border-slate-950 font-medium">
143:                 {courses.map((course) => {
144:                   const priceNum = parseFloat(course.price) || 0;
145:                   return (
146:                     <tr key={course.id} className="hover:bg-slate-50">
147:                       <td className="py-3 px-4 font-bold text-slate-950">
148:                         {course.title}
149:                         <span className="block text-[10px] font-mono font-normal text-slate-500">
150:                           Acceso Vitalicio • Campus Virtual OnCourses
151:                         </span>
152:                       </td>
153:                       <td className="py-3 px-4 text-center font-mono font-bold">1</td>
154:                       <td className="py-3 px-4 text-right font-mono">${priceNum.toFixed(2)}</td>
155:                       <td className="py-3 px-4 text-right font-mono font-extrabold">${priceNum.toFixed(2)}</td>
156:                     </tr>
157:                   );
158:                 })}
159:               </tbody>
160:             </table>
161:           </div>
162: 
163:           {}
164:           <div className="flex justify-end pt-2">
165:             <div className="w-full max-w-xs border-2 border-slate-950 bg-slate-50 p-4 space-y-1.5 text-xs font-mono">
166:               <div className="flex justify-between text-slate-600">
167:                 <span>Subtotal (sin IVA):</span>
168:                 <span>${subtotalBeforeTax.toFixed(2)} USD</span>
169:               </div>
170: 
171:               {discountAmount > 0 && (
172:                 <div className="flex justify-between text-emerald-700 font-bold">
173:                   <span>Descuento Promocional:</span>
174:                   <span>-${discountAmount.toFixed(2)} USD</span>
175:                 </div>
176:               )}
177: 
178:               {!isFree && (
179:                 <div className="flex justify-between text-slate-600">
180:                   <span>IVA (15%):</span>
181:                   <span>${taxAmount.toFixed(2)} USD</span>
182:                 </div>
183:               )}
184: 
185:               <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t-2 border-slate-950">
186:                 <span>VALOR TOTAL:</span>
187:                 <span className="text-base text-[#00cc33] font-mono font-black">${totalFinal.toFixed(2)} USD</span>
188:               </div>
189:             </div>
190:           </div>
191: 
192:           <div className="border-t border-slate-200 pt-4 text-center text-[10px] text-slate-500 font-mono">
193:             Documento de Validez Tributaria • Emitido electrónicamente por OnCourses Ecuador. ¡Gracias por tu compra!
194:           </div>
195:         </div>
196: 
197:         {}
198:         <div className="p-6 bg-slate-100 border-t-2 border-slate-950 flex flex-col sm:flex-row gap-3 items-center justify-between print:hidden">
199:           <button
200:             type="button"
201:             onClick={handlePrint}
202:             className="w-full sm:w-auto px-4 py-2.5 bg-white text-slate-950 border-2 border-slate-950 font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer"
203:           >
204:             <Download className="h-4 w-4 text-[#00cc33]" />
205:             <span>Descargar Factura (PDF)</span>
206:           </button>
207: 
208:           <Button
209:             onClick={onGoToCourses}
210:             className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-wider"
211:           >
212:             <span>Ir a mis Cursos Matriculados</span>
213:             <ArrowRight className="h-4 w-4" />
214:           </Button>
215:         </div>
216:       </div>
217:     </div>
218:   );
219: };
````

## File: src/presentation/components/lesson-management/ModuleSidebar.tsx
````typescript
 1: import React from 'react';
 2: import { Module } from '@domain/entities/Module';
 3: import { Pencil, Trash2 } from 'lucide-react';
 4: 
 5: interface ModuleSidebarProps {
 6:   modules: Module[];
 7:   selectedModuleId: number | '';
 8:   onSelect: (id: number) => void;
 9:   onEditModule?: (mod: Module) => void;
10:   onDeleteModule?: (modId: number) => void;
11: }
12: 
13: export const ModuleSidebar: React.FC<ModuleSidebarProps> = ({
14:   modules,
15:   selectedModuleId,
16:   onSelect,
17:   onEditModule,
18:   onDeleteModule,
19: }) => {
20:   return (
21:     <div className="lg:col-span-1 flex flex-col gap-3">
22:       <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200 px-1">
23:         Secciones / Módulos ({modules.length})
24:       </h3>
25:       {modules.length > 0 ? (
26:         modules.map((mod, i) => {
27:           const isSelected = selectedModuleId === mod.id;
28:           return (
29:             <div
30:               key={mod.id}
31:               className={`w-full flex items-center justify-between px-3 py-2.5 border-2 border-slate-950 font-bold transition-all ${
32:                 isSelected
33:                   ? 'bg-[#00cc33] text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835]'
34:                   : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
35:               }`}
36:             >
37:               <button
38:                 type="button"
39:                 onClick={() => onSelect(mod.id)}
40:                 className="flex-1 text-left cursor-pointer overflow-hidden mr-2"
41:               >
42:                 <span className="text-[10px] uppercase font-mono block text-slate-700 dark:text-slate-300 font-extrabold">Módulo {i + 1}</span>
43:                 <span className="line-clamp-1 text-xs font-black">{mod.title}</span>
44:               </button>
45: 
46:               <div className="flex items-center gap-1 shrink-0">
47:                 {onEditModule && (
48:                   <button
49:                     type="button"
50:                     onClick={(e) => {
51:                       e.stopPropagation();
52:                       onEditModule(mod);
53:                     }}
54:                     title="Editar título/orden del módulo"
55:                     className="p-1 border border-slate-950 bg-white text-slate-950 hover:bg-yellow-300 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
56:                   >
57:                     <Pencil className="h-3.5 w-3.5" />
58:                   </button>
59:                 )}
60:                 {onDeleteModule && (
61:                   <button
62:                     type="button"
63:                     onClick={(e) => {
64:                       e.stopPropagation();
65:                       onDeleteModule(mod.id);
66:                     }}
67:                     title="Eliminar módulo"
68:                     className="p-1 border border-slate-950 bg-rose-500 text-white hover:bg-rose-600 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
69:                   >
70:                     <Trash2 className="h-3.5 w-3.5" />
71:                   </button>
72:                 )}
73:               </div>
74:             </div>
75:           );
76:         })
77:       ) : (
78:         <div className="p-4 border-2 border-dashed border-slate-400 bg-white dark:bg-slate-900 text-center text-xs text-slate-500 italic">
79:           Aún no has creado ningún módulo. Crea uno para poder agregar lecciones.
80:         </div>
81:       )}
82:     </div>
83:   );
84: };
````

## File: src/presentation/components/lesson-management/SingleLessonPreviewModal.tsx
````typescript
  1: import React from 'react';
  2: import { Lesson } from '@domain/entities/Lesson';
  3: import { X, Play, FileText, ArrowRight, BookOpen, Clock } from 'lucide-react';
  4: import { Button } from '../Button';
  5: import { sanitizeUrl } from '../../utils/sanitize-url';
  6: import { MarkdownRenderer } from '../MarkdownRenderer';
  7: 
  8: interface SingleLessonPreviewModalProps {
  9:   isOpen: boolean;
 10:   onClose: () => void;
 11:   lesson: Lesson | null;
 12:   moduleTitle?: string;
 13:   courseId: number;
 14:   onLaunchFullPlayer: (lessonId: number) => void;
 15: }
 16: 
 17: export const SingleLessonPreviewModal: React.FC<SingleLessonPreviewModalProps> = ({
 18:   isOpen,
 19:   onClose,
 20:   lesson,
 21:   moduleTitle,
 22:   courseId: _courseId,
 23:   onLaunchFullPlayer,
 24: }) => {
 25:   if (!isOpen || !lesson) return null;
 26: 
 27:   return (
 28:     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
 29:       <div className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-950 text-slate-950 dark:text-white border-2 border-slate-950 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_#00b835] flex flex-col overflow-hidden my-auto">
 30: 
 31:         {}
 32:         <div className="flex items-center justify-between px-5 py-3 bg-slate-950 text-white border-b-2 border-slate-950 shrink-0">
 33:           <div className="flex items-center gap-2.5">
 34:             <span className="w-3 h-3 rounded-full bg-[#00cc33] animate-pulse" />
 35:             <span className="text-xs font-mono font-black uppercase tracking-wider text-[#00cc33]">
 36:               👁️ VISTA PREVIA INDIVIDUAL DE LECCIÓN
 37:             </span>
 38:           </div>
 39: 
 40:           <div className="flex items-center gap-2">
 41:             <button
 42:               type="button"
 43:               onClick={onClose}
 44:               className="w-7 h-7 flex items-center justify-center border-2 border-white bg-rose-600 text-white font-black text-xs hover:bg-rose-700 transition-colors cursor-pointer shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]"
 45:             >
 46:               <X className="h-4 w-4" />
 47:             </button>
 48:           </div>
 49:         </div>
 50: 
 51:         {}
 52:         <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-900">
 53:           {}
 54:           <div className="bg-white dark:bg-slate-950 border-2 border-slate-950 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
 55:             {moduleTitle && (
 56:               <span className="text-[10px] font-extrabold font-mono uppercase tracking-wider text-brand-600 dark:text-[#00cc33] block mb-1">
 57:                 {moduleTitle}
 58:               </span>
 59:             )}
 60:             <h2 className="font-display font-black text-2xl text-slate-950 dark:text-white leading-snug">
 61:               {lesson.title}
 62:             </h2>
 63: 
 64:             <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
 65:               <div className="flex items-center gap-1.5">
 66:                 <BookOpen className="h-4 w-4 text-[#00cc33]" />
 67:                 <span>Orden: {lesson.order}</span>
 68:               </div>
 69:               {lesson.duration_seconds && (
 70:                 <div className="flex items-center gap-1.5">
 71:                   <Clock className="h-4 w-4 text-[#00cc33]" />
 72:                   <span>{Math.round(lesson.duration_seconds / 60)} minutos</span>
 73:                 </div>
 74:               )}
 75:             </div>
 76:           </div>
 77: 
 78:           {}
 79:           {lesson.video_url && (
 80:             <div className="border-2 border-slate-950 bg-slate-950 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
 81:               <div className="bg-slate-900 px-4 py-2 text-xs font-mono font-bold text-[#00cc33] border-b border-slate-950 flex items-center justify-between">
 82:                 <div className="flex items-center gap-2">
 83:                   <Play className="h-4 w-4 fill-current" />
 84:                   <span>CLASE EN VIDEO · ONCOURSES PLAYER</span>
 85:                 </div>
 86:                 <span className="text-[10px] text-slate-400">HD 1080p</span>
 87:               </div>
 88:               <div className="relative aspect-video bg-black">
 89:                 {lesson.video_url.includes('youtube') || lesson.video_url.includes('embed') ? (
 90:                   <iframe
 91:                     src={sanitizeUrl(lesson.video_url)}
 92:                     title={lesson.title}
 93:                     className="w-full h-full border-0"
 94:                     allowFullScreen
 95:                   />
 96:                 ) : (
 97:                   <div className="flex flex-col items-center justify-center h-full p-6 text-center text-slate-300">
 98:                     <Play className="h-12 w-12 text-[#00cc33] mb-3" />
 99:                     <p className="text-sm font-bold">Video de la lección disponible</p>
100:                     <a
101:                       href={sanitizeUrl(lesson.video_url)}
102:                       target="_blank"
103:                       rel="noreferrer"
104:                       className="mt-2 text-xs text-[#00cc33] underline font-mono"
105:                     >
106:                       Abrir enlace de video ↗
107:                     </a>
108:                   </div>
109:                 )}
110:               </div>
111:             </div>
112:           )}
113: 
114:           {}
115:           <div className="bg-white dark:bg-slate-950 border-2 border-slate-950 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
116:             <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
117:               <FileText className="h-4 w-4 text-[#00cc33]" />
118:               Manual de Instrucciones & Contenido del Tema
119:             </h3>
120: 
121:             <article className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed">
122:               {lesson.content_text ? (
123:                 <MarkdownRenderer content={lesson.content_text} />
124:               ) : (
125:                 <div className="p-6 border border-dashed border-slate-300 dark:border-slate-800 text-center text-slate-400 text-xs italic">
126:                   Este tema no incluye manual de lectura o bloques de código estáticos.
127:                 </div>
128:               )}
129:             </article>
130:           </div>
131:         </div>
132: 
133:         {}
134:         <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t-2 border-slate-950 flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
135:           <button
136:             type="button"
137:             onClick={onClose}
138:             className="w-full sm:w-auto px-4 py-2 border-2 border-slate-950 bg-white dark:bg-slate-800 text-slate-950 dark:text-white font-extrabold text-xs uppercase hover:bg-slate-200 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
139:           >
140:             Cerrar Vista Previa
141:           </button>
142: 
143:           <Button
144:             onClick={() => onLaunchFullPlayer(lesson.id)}
145:             className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider"
146:           >
147:             <span>Abrir en Reproductor de Alumnos Completo</span>
148:             <ArrowRight className="h-4 w-4" />
149:           </Button>
150:         </div>
151:       </div>
152:     </div>
153:   );
154: };
````

## File: src/presentation/components/profile/ProfileDetails.tsx
````typescript
  1: import React from 'react';
  2: import { User } from '@domain/entities/User';
  3: import { Phone, MapPin, Cake, Award, Book, Globe, Shield } from 'lucide-react';
  4: import { sanitizeUrl } from '../../utils/sanitize-url';
  5: 
  6: interface ProfileDetailsProps {
  7:   user: User | null;
  8:   isProfessorOrAdmin: boolean;
  9: }
 10: 
 11: export const ProfileDetails: React.FC<ProfileDetailsProps> = ({
 12:   user,
 13:   isProfessorOrAdmin,
 14: }) => {
 15:   return (
 16:     <div className="flex flex-col gap-8">
 17:       {}
 18:       <div className="border-2 border-slate-950 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 text-slate-950 dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
 19:         <h3 className="font-display font-black text-slate-950 dark:text-white text-lg mb-4 flex items-center gap-2">
 20:           <Book className="h-5 w-5 text-[#00cc33]" />
 21:           Biografía
 22:         </h3>
 23:         <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
 24:           {user?.biography || <span className="italic text-slate-400 dark:text-slate-500">Aún no has agregado una biografía. ¡Cuéntanos más sobre ti!</span>}
 25:         </p>
 26:       </div>
 27: 
 28:       {}
 29:       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 30:         {}
 31:         <div className="border-2 border-slate-950 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 text-slate-950 dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
 32:           <h3 className="font-display font-black text-slate-950 dark:text-white text-lg mb-6 flex items-center gap-2">
 33:             <Shield className="h-5 w-5 text-[#00cc33]" />
 34:             Datos Personales
 35:           </h3>
 36:           <div className="flex flex-col gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
 37:             <div className="flex items-center justify-between py-2 border-b-2 border-slate-100 dark:border-slate-800">
 38:               <span className="flex items-center gap-2">
 39:                 <Phone className="h-4 w-4 text-slate-400 dark:text-slate-500" />
 40:                 Teléfono:
 41:               </span>
 42:               <span className="font-mono text-slate-950 dark:text-white font-bold">{user?.phone || '--'}</span>
 43:             </div>
 44:             <div className="flex items-center justify-between py-2 border-b-2 border-slate-100 dark:border-slate-800">
 45:               <span className="flex items-center gap-2">
 46:                 <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
 47:                 País:
 48:               </span>
 49:               <span className="text-slate-950 dark:text-white font-bold">{user?.country || '--'}</span>
 50:             </div>
 51:             <div className="flex items-center justify-between py-2">
 52:               <span className="flex items-center gap-2">
 53:                 <Cake className="h-4 w-4 text-slate-400 dark:text-slate-500" />
 54:                 Fecha Nacimiento:
 55:               </span>
 56:               <span className="font-mono text-slate-950 dark:text-white font-bold">{user?.birth_date || '--'}</span>
 57:             </div>
 58:           </div>
 59:         </div>
 60: 
 61:         {}
 62:         {isProfessorOrAdmin && (
 63:           <div className="border-2 border-slate-950 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 text-slate-950 dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
 64:             <h3 className="font-display font-black text-slate-950 dark:text-white text-lg mb-6 flex items-center gap-2">
 65:               <Award className="h-5 w-5 text-[#00cc33]" />
 66:               Perfil Profesional
 67:             </h3>
 68:             <div className="flex flex-col gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
 69:               <div className="flex items-center justify-between py-2 border-b-2 border-slate-100 dark:border-slate-800">
 70:                 <span>Título Profesional:</span>
 71:                 <span className="text-slate-950 dark:text-white font-bold text-right">{user?.professional_title || '--'}</span>
 72:               </div>
 73:               <div className="flex items-center justify-between py-2 border-b-2 border-slate-100 dark:border-slate-800">
 74:                 <span>Especialidad:</span>
 75:                 <span className="text-slate-950 dark:text-white font-bold text-right">{user?.specialty || '--'}</span>
 76:               </div>
 77:               <div className="flex items-center justify-between py-2">
 78:                 <span className="flex items-center gap-2">
 79:                   <Globe className="h-4 w-4 text-[#0077b5]" />
 80:                   LinkedIn:
 81:                 </span>
 82:                 {user?.linkedin_url ? (
 83:                   <a
 84:                     href={sanitizeUrl(user.linkedin_url)}
 85:                     target="_blank"
 86:                     rel="noopener noreferrer"
 87:                     className="text-[#00cc33] font-extrabold underline hover:text-[#00ff41]"
 88:                   >
 89:                     Ver perfil ↗
 90:                   </a>
 91:                 ) : (
 92:                   <span className="text-slate-950 dark:text-white font-bold">--</span>
 93:                 )}
 94:               </div>
 95:             </div>
 96:           </div>
 97:         )}
 98:       </div>
 99:     </div>
100:   );
101: };
````

## File: src/presentation/components/FooterModals.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { ShieldCheck, FileText, Cookie, Award, Check, Mail, Info, Building2, Code2, GraduationCap, X } from 'lucide-react';
  3: 
  4: 
  5: export const LegalModal: React.FC<{
  6:   isOpen: boolean;
  7:   onClose: () => void;
  8: }> = ({ isOpen, onClose }) => {
  9:   if (!isOpen) return null;
 10: 
 11:   return (
 12:     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
 13:       <div className="w-full max-w-2xl border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00b835] overflow-hidden text-slate-950 dark:text-white">
 14:         {}
 15:         <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
 16:           <div className="flex items-center gap-2" translate="no">
 17:             <ShieldCheck className="h-4 w-4 text-[#00cc33]" />
 18:             <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
 19:               oncourses.app/legal-terms
 20:             </span>
 21:           </div>
 22:           <button
 23:             type="button"
 24:             onClick={onClose}
 25:             aria-label="Cerrar modal"
 26:             className="w-6 h-6 flex items-center justify-center border border-slate-950 text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
 27:           >
 28:             <X className="h-3.5 w-3.5" />
 29:           </button>
 30:         </div>
 31: 
 32:         {}
 33:         <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b-2 border-slate-950 flex items-center gap-3">
 34:           <FileText className="h-6 w-6 text-[#00cc33] shrink-0" />
 35:           <div>
 36:             <h2 className="font-display text-lg font-black leading-none">Información Legal Completa & Términos</h2>
 37:             <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
 38:               Términos de Servicio, Política de Privacidad y Cookies de OnCourses
 39:             </p>
 40:           </div>
 41:         </div>
 42: 
 43:         {}
 44:         <div className="p-6 max-h-[420px] overflow-y-auto text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-5 font-medium scrollbar-thin">
 45:           <section className="space-y-2">
 46:             <h3 className="text-base font-black text-slate-950 dark:text-white flex items-center gap-2 border-b-2 border-slate-950 pb-1">
 47:               <FileText className="h-4 w-4 text-[#00cc33]" />
 48:               1. Términos y Condiciones de Uso
 49:             </h3>
 50:             <p>
 51:               Al utilizar la plataforma <strong>OnCourses</strong>, el usuario acepta cumplir con las normas de acceso, inscripción y convivencia académica. Todo el material didáctico, guías interactivas, código de lecciones y videoclases son propiedad exclusiva de OnCourses y sus autores. Queda estrictamente prohibida la redistribución o copia no autorizada.
 52:             </p>
 53:           </section>
 54: 
 55:           <section className="space-y-2">
 56:             <h3 className="text-base font-black text-slate-950 dark:text-white flex items-center gap-2 border-b-2 border-slate-950 pb-1">
 57:               <ShieldCheck className="h-4 w-4 text-[#00cc33]" />
 58:               2. Política de Privacidad y Datos Personales
 59:             </h3>
 60:             <p>
 61:               Garantizamos la protección de tus datos personales conforme a la normativa vigente. La información recopilada (nombre, correo electrónico, perfil académico y avance de cursos) se utiliza únicamente para el funcionamiento técnico de tu Campus Estudiantil. Tus datos nunca serán comercializados ni transferidos a terceros.
 62:             </p>
 63:           </section>
 64: 
 65:           <section className="space-y-2">
 66:             <h3 className="text-base font-black text-slate-950 dark:text-white flex items-center gap-2 border-b-2 border-slate-950 pb-1">
 67:               <Cookie className="h-4 w-4 text-[#00cc33]" />
 68:               3. Cookies y Almacenamiento de Sesión
 69:             </h3>
 70:             <p>
 71:               OnCourses utiliza cookies estrictamente necesarias y almacenamiento local de navegador (<em>localStorage</em>) para mantener activa tu sesión segura, guardar tus credenciales de acceso JWT y recordar tus preferencias de interfaz (Modo Claro / Oscuro y temas seleccionados).
 72:             </p>
 73:           </section>
 74:         </div>
 75: 
 76:         {}
 77:         <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t-2 border-slate-950 flex justify-end">
 78:           <button
 79:             type="button"
 80:             onClick={onClose}
 81:             className="px-6 py-2.5 bg-[#00cc33] text-slate-950 font-black text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#00ff41] transition-all cursor-pointer"
 82:           >
 83:             Entendido y Acepto
 84:           </button>
 85:         </div>
 86:       </div>
 87:     </div>
 88:   );
 89: };
 90: 
 91: 
 92: export const AboutModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
 93:   if (!isOpen) return null;
 94: 
 95:   return (
 96:     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
 97:       <div className="w-full max-w-2xl border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00b835] overflow-hidden text-slate-950 dark:text-white">
 98:         {}
 99:         <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
100:           <div className="flex items-center gap-2" translate="no">
101:             <Info className="h-4 w-4 text-[#00cc33]" />
102:             <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
103:               oncourses.app/nosotros
104:             </span>
105:           </div>
106:           <button
107:             type="button"
108:             onClick={onClose}
109:             aria-label="Cerrar modal"
110:             className="w-6 h-6 flex items-center justify-center border border-slate-950 text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
111:           >
112:             <X className="h-3.5 w-3.5" />
113:           </button>
114:         </div>
115: 
116:         <div className="p-6 sm:p-8 space-y-6">
117:           <div className="text-center">
118:             <div className="w-14 h-14 bg-[#00cc33] text-slate-950 border-2 border-slate-950 flex items-center justify-center mx-auto mb-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
119:               <Code2 className="h-8 w-8" />
120:             </div>
121:             <h2 className="font-display text-2xl font-black text-slate-950 dark:text-white">
122:               Sobre OnCourses
123:             </h2>
124:             <p className="text-xs font-bold text-emerald-600 dark:text-[#00cc33] uppercase tracking-wider mt-1">
125:               Plataforma de Educación Interactiva en Ingeniería de Software
126:             </p>
127:           </div>
128: 
129:           <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
130:             <p>
131:               <strong>OnCourses</strong> es una plataforma web de aprendizaje práctico diseñada para estudiantes, desarrolladores e investigadores que buscan dominar lenguajes de programación, estructura de datos, arquitecturas de software y gestión de bases de datos de forma estructurada.
132:             </p>
133: 
134:             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
135:               <div className="border-2 border-slate-950 bg-slate-50 dark:bg-slate-950 p-4 space-y-1">
136:                 <div className="flex items-center gap-2 font-bold text-slate-950 dark:text-white">
137:                   <GraduationCap className="h-4 w-4 text-[#00cc33]" />
138:                   <span>Enfoque Práctico</span>
139:                 </div>
140:                 <p className="text-[11px] text-slate-600 dark:text-slate-400">
141:                   Manuales paso a paso con bloques de código ejecutables, ejemplos de terminal y videoclases integradas.
142:                 </p>
143:               </div>
144: 
145:               <div className="border-2 border-slate-950 bg-slate-50 dark:bg-slate-950 p-4 space-y-1">
146:                 <div className="flex items-center gap-2 font-bold text-slate-950 dark:text-white">
147:                   <Building2 className="h-4 w-4 text-[#00cc33]" />
148:                   <span>Universidad UTE</span>
149:                 </div>
150:                 <p className="text-[11px] text-slate-600 dark:text-slate-400">
151:                   Proyecto de desarrollo tecnológico gestado en la Sede Tulcán, Ecuador.
152:                 </p>
153:               </div>
154:             </div>
155:           </div>
156: 
157:           <div className="p-3 border-2 border-slate-950 bg-slate-100 dark:bg-slate-950 text-center text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
158:             📍 Tulcán, Carchi, Ecuador • Versión Web v2.4
159:           </div>
160:         </div>
161: 
162:         <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t-2 border-slate-950 flex justify-end">
163:           <button
164:             type="button"
165:             onClick={onClose}
166:             className="px-6 py-2 bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-brand-500 hover:text-slate-950 transition-all cursor-pointer"
167:           >
168:             Cerrar
169:           </button>
170:         </div>
171:       </div>
172:     </div>
173:   );
174: };
175: 
176: 
177: export const PricingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
178:   if (!isOpen) return null;
179: 
180:   return (
181:     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
182:       <div className="w-full max-w-3xl border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00b835] overflow-hidden">
183:         {}
184:         <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
185:           <div className="flex items-center gap-2" translate="no">
186:             <Award className="h-4 w-4 text-blue-500" />
187:             <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
188:               oncourses.app/pricing-plans
189:             </span>
190:           </div>
191:           <button
192:             type="button"
193:             onClick={onClose}
194:             aria-label="Cerrar modal"
195:             className="w-6 h-6 flex items-center justify-center border border-slate-950 text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
196:           >
197:             <X className="h-3.5 w-3.5" />
198:           </button>
199:         </div>
200: 
201:         <div className="p-6 sm:p-8">
202:           <div className="text-center mb-8">
203:             <span className="inline-block px-3 py-1 bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-400 text-xs font-mono font-bold uppercase tracking-wider mb-2 border border-brand-300">
204:               $ oncourses --pricing
205:             </span>
206:             <h2 className="font-display text-3xl font-extrabold text-slate-950 dark:text-white">
207:               Planes de Membresía DEV
208:             </h2>
209:             <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
210:               Acceso ilimitado a todos los cursos con certificados incluidos
211:             </p>
212:           </div>
213: 
214:           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
215:             {}
216:             <div className="border-2 border-slate-950 p-6 bg-white dark:bg-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] flex flex-col justify-between">
217:               <div>
218:                 <div className="flex justify-between items-center mb-4">
219:                   <span className="font-bold text-sm uppercase text-slate-900 dark:text-white">Plan Free</span>
220:                   <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-950">Gratis</span>
221:                 </div>
222:                 <div className="text-4xl font-extrabold text-slate-950 dark:text-white mb-4">$0 <span className="text-xs text-slate-500 font-normal">/siempre</span></div>
223:                 <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mb-6 font-medium">
224:                   <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Acceso a cursos introductorios</li>
225:                   <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Lecciones interactivas</li>
226:                   <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Foro de preguntas básicas</li>
227:                 </ul>
228:               </div>
229:               <button
230:                 type="button"
231:                 onClick={onClose}
232:                 className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border-2 border-slate-950 text-slate-950 dark:text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
233:               >
234:                 Plan Actual
235:               </button>
236:             </div>
237: 
238:             {}
239:             <div className="border-2 border-slate-950 p-6 bg-slate-900 text-white shadow-[4px_4px_0px_0px_#00b835] flex flex-col justify-between relative overflow-hidden">
240:               <div className="absolute top-3 right-3 px-2 py-0.5 bg-brand-400 text-slate-950 font-black text-[10px] uppercase border border-slate-950 shadow-sm">
241:                 RECOMENDADO
242:               </div>
243:               <div>
244:                 <div className="flex justify-between items-center mb-4">
245:                   <span className="font-bold text-sm uppercase text-brand-400">Plan PRO Full Pass</span>
246:                 </div>
247:                 <div className="text-4xl font-extrabold text-white mb-4">$9.99 <span className="text-xs text-slate-400 font-normal">/mes</span></div>
248:                 <ul className="space-y-2.5 text-xs text-slate-300 mb-6 font-medium">
249:                   <li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand-400" /> Acceso ilimitado a +50 Cursos</li>
250:                   <li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand-400" /> Certificados con código de validación</li>
251:                   <li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand-400" /> Proyectos reales para portafolio</li>
252:                   <li className="flex items-center gap-2"><Check className="h-4 w-4 text-brand-400" /> Soporte docente prioritario 24/7</li>
253:                 </ul>
254:               </div>
255:               <button
256:                 type="button"
257:                 onClick={() => {
258:                   alert('¡Gracias por tu interés en OnCourses PRO! La integración de pagos está lista para sincronizarse con Stripe.');
259:                   onClose();
260:                 }}
261:                 className="w-full py-2.5 bg-brand-400 hover:bg-brand-300 border-2 border-slate-950 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
262:               >
263:                 Suscribirme Ahora
264:               </button>
265:             </div>
266:           </div>
267:         </div>
268:       </div>
269:     </div>
270:   );
271: };
272: 
273: 
274: export const NewsletterModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
275:   const [email, setEmail] = useState('');
276:   const [subscribed, setSubscribed] = useState(false);
277: 
278:   if (!isOpen) return null;
279: 
280:   const handleSubmit = (e: React.FormEvent) => {
281:     e.preventDefault();
282:     if (!email) return;
283:     setSubscribed(true);
284:   };
285: 
286:   return (
287:     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
288:       <div className="w-full max-w-md border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00b835] overflow-hidden">
289:         <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
290:           <div className="flex items-center gap-2" translate="no">
291:             <Mail className="h-4 w-4 text-pink-500" />
292:             <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
293:               oncourses.app/newsletter
294:             </span>
295:           </div>
296:           <button
297:             type="button"
298:             onClick={onClose}
299:             aria-label="Cerrar modal"
300:             className="w-6 h-6 flex items-center justify-center border border-slate-950 text-xs font-bold bg-rose-500 text-white cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
301:           >
302:             <X className="h-3.5 w-3.5" />
303:           </button>
304:         </div>
305: 
306:         <div className="p-6">
307:           {subscribed ? (
308:             <div className="text-center py-4">
309:               <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-slate-950">
310:                 <Check className="h-6 w-6" />
311:               </div>
312:               <h3 className="text-xl font-bold text-slate-950 dark:text-white">¡Suscripción Confirmada!</h3>
313:               <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
314:                 Te enviaremos los mejores tutoriales, noticias y recursos de programación a <span className="font-bold text-slate-900 dark:text-white">{email}</span>.
315:               </p>
316:               <button
317:                 type="button"
318:                 onClick={() => { setSubscribed(false); onClose(); }}
319:                 className="mt-6 px-6 py-2.5 bg-brand-400 border-2 border-slate-950 font-bold text-xs uppercase text-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
320:               >
321:                 Cerrar
322:               </button>
323:             </div>
324:           ) : (
325:             <form onSubmit={handleSubmit} className="space-y-4">
326:               <div className="text-center">
327:                 <h2 className="font-display text-2xl font-extrabold text-slate-950 dark:text-white">Boletín Técnico OnCourses</h2>
328:                 <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">
329:                   Recibe semanalmente guías de código, nuevos cursos y recursos gratuitos en tu bandeja de entrada.
330:                 </p>
331:               </div>
332: 
333:               <div>
334:                 <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1 block">
335:                   Tu correo electrónico
336:                 </label>
337:                 <input
338:                   type="email"
339:                   required
340:                   placeholder="desarrollador@ejemplo.com"
341:                   value={email}
342:                   onChange={(e) => setEmail(e.target.value)}
343:                   className="w-full px-4 py-2.5 border-2 border-slate-950 bg-white text-slate-950 text-sm font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none focus:border-brand-500"
344:                 />
345:               </div>
346: 
347:               <button
348:                 type="submit"
349:                 className="w-full py-3 bg-brand-400 hover:bg-brand-300 border-2 border-slate-950 font-black text-xs uppercase tracking-wider text-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
350:               >
351:                 Suscribirme Gratis
352:               </button>
353:             </form>
354:           )}
355:         </div>
356:       </div>
357:     </div>
358:   );
359: };
````

## File: src/presentation/pages/AnalyticsDashboardPage.tsx
````typescript
  1: import React from 'react';
  2: import { Link } from 'react-router-dom';
  3: import { Layout } from '../components/Layout';
  4: import { BarChart3, TrendingUp, ArrowLeft, Download, Activity } from 'lucide-react';
  5: 
  6: export const AnalyticsDashboardPage: React.FC = () => {
  7:   return (
  8:     <Layout>
  9:       <div className="mb-6">
 10:         <Link
 11:           to="/admin"
 12:           className="inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-extrabold text-xs uppercase tracking-wider shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2.5px_2.5px_0px_0px_#00b835] hover:bg-brand-400 hover:text-slate-950 dark:hover:bg-brand-400 dark:hover:text-slate-950 transition-all cursor-pointer mb-4"
 13:         >
 14:           <ArrowLeft className="h-4 w-4" />
 15:           <span>Volver al Panel de Control</span>
 16:         </Link>
 17: 
 18:         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 19:           <div>
 20:             <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
 21:               <BarChart3 className="h-8 w-8 text-brand-500" />
 22:               Analíticas Académicas & Reportes
 23:             </h1>
 24:             <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
 25:               Indicadores clave de rendimiento (KPIs), ingresos por ventas y tasa de retención estudiantil.
 26:             </p>
 27:           </div>
 28: 
 29:           <button
 30:             onClick={() => alert('Generando informe ejecutivo en formato PDF para la presentación...')}
 31:             className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-400 text-slate-950 font-black text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-brand-300 transition-all cursor-pointer w-fit"
 32:           >
 33:             <Download className="h-4 w-4" />
 34:             <span>Exportar Informe PDF</span>
 35:           </button>
 36:         </div>
 37:       </div>
 38: 
 39:       {}
 40:       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
 41:         <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
 42:           <div className="flex justify-between items-start mb-2">
 43:             <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Ingresos Totales</span>
 44:             <span className="p-2 bg-emerald-100 text-emerald-600 border border-slate-950 font-bold text-xs">$</span>
 45:           </div>
 46:           <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-display mb-1">$4,850.00</div>
 47:           <span className="text-[10px] text-emerald-600 font-bold">↑ +18.5% este mes</span>
 48:         </div>
 49: 
 50:         <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
 51:           <div className="flex justify-between items-start mb-2">
 52:             <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Tasa de Completado</span>
 53:             <span className="p-2 bg-brand-100 text-brand-600 border border-slate-950 font-bold text-xs">%</span>
 54:           </div>
 55:           <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-display mb-1">84.2%</div>
 56:           <span className="text-[10px] text-emerald-600 font-bold">↑ +5.2% retención</span>
 57:         </div>
 58: 
 59:         <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
 60:           <div className="flex justify-between items-start mb-2">
 61:             <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Horas de Estudio</span>
 62:             <span className="p-2 bg-amber-100 text-amber-600 border border-slate-950 font-bold text-xs">⏱</span>
 63:           </div>
 64:           <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-display mb-1">1,420 hrs</div>
 65:           <span className="text-[10px] text-slate-400 font-bold">Lecciones vistas</span>
 66:         </div>
 67: 
 68:         <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
 69:           <div className="flex justify-between items-start mb-2">
 70:             <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Certificados Emitidos</span>
 71:             <span className="p-2 bg-purple-100 text-purple-600 border border-slate-950 font-bold text-xs">🎓</span>
 72:           </div>
 73:           <div className="text-3xl font-extrabold text-slate-950 dark:text-white font-display mb-1">128</div>
 74:           <span className="text-[10px] text-emerald-600 font-bold">Verificados con QR</span>
 75:         </div>
 76:       </div>
 77: 
 78:       {}
 79:       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
 80:         {}
 81:         <div className="lg:col-span-8 border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835]">
 82:           <div className="flex justify-between items-center pb-4 mb-6 border-b-2 border-slate-950">
 83:             <h3 className="font-bold text-sm uppercase tracking-wider text-slate-950 dark:text-white flex items-center gap-2">
 84:               <TrendingUp className="h-4 w-4 text-brand-500" />
 85:               Inscripciones y Popularidad por Curso
 86:             </h3>
 87:             <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 border border-slate-950">SEMESTRE ACTUAL</span>
 88:           </div>
 89: 
 90:           <div className="space-y-5">
 91:             <div>
 92:               <div className="flex justify-between text-xs font-bold mb-1">
 93:                 <span>Python para Principiantes: Desde Cero a Pro</span>
 94:                 <span className="font-mono">142 Estudiantes (42%)</span>
 95:               </div>
 96:               <div className="h-4 bg-slate-100 dark:bg-slate-800 border border-slate-950 overflow-hidden">
 97:                 <div className="h-full bg-brand-500 w-[85%] transition-all duration-1000" />
 98:               </div>
 99:             </div>
100: 
101:             <div>
102:               <div className="flex justify-between text-xs font-bold mb-1">
103:                 <span>JavaScript Moderno (ES6+) y Desarrollo Web</span>
104:                 <span className="font-mono">118 Estudiantes (35%)</span>
105:               </div>
106:               <div className="h-4 bg-slate-100 dark:bg-slate-800 border border-slate-950 overflow-hidden">
107:                 <div className="h-full bg-emerald-500 w-[70%] transition-all duration-1000" />
108:               </div>
109:             </div>
110: 
111:             <div>
112:               <div className="flex justify-between text-xs font-bold mb-1">
113:                 <span>Terminal Bash, Linux y Línea de Comandos</span>
114:                 <span className="font-mono">94 Estudiantes (28%)</span>
115:               </div>
116:               <div className="h-4 bg-slate-100 dark:bg-slate-800 border border-slate-950 overflow-hidden">
117:                 <div className="h-full bg-amber-500 w-[55%] transition-all duration-1000" />
118:               </div>
119:             </div>
120: 
121:             <div>
122:               <div className="flex justify-between text-xs font-bold mb-1">
123:                 <span>Git y GitHub: Control de Versiones para Devs</span>
124:                 <span className="font-mono">82 Estudiantes (24%)</span>
125:               </div>
126:               <div className="h-4 bg-slate-100 dark:bg-slate-800 border border-slate-950 overflow-hidden">
127:                 <div className="h-full bg-blue-500 w-[45%] transition-all duration-1000" />
128:               </div>
129:             </div>
130: 
131:             <div>
132:               <div className="flex justify-between text-xs font-bold mb-1">
133:                 <span>Bases de Datos SQL y Modelado Relacional</span>
134:                 <span className="font-mono">68 Estudiantes (20%)</span>
135:               </div>
136:               <div className="h-4 bg-slate-100 dark:bg-slate-800 border border-slate-950 overflow-hidden">
137:                 <div className="h-full bg-purple-500 w-[35%] transition-all duration-1000" />
138:               </div>
139:             </div>
140:           </div>
141:         </div>
142: 
143:         {}
144:         <div className="lg:col-span-4 border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835]">
145:           <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-slate-950">
146:             <h3 className="font-bold text-sm uppercase tracking-wider text-slate-950 dark:text-white flex items-center gap-2">
147:               <Activity className="h-4 w-4 text-emerald-500" />
148:               Bitácora del Sistema
149:             </h3>
150:           </div>
151: 
152:           <div className="space-y-3.5 text-xs">
153:             <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-950">
154:               <span className="text-[10px] text-slate-400 font-mono block">Hace 10 min</span>
155:               <span className="font-bold text-slate-900 dark:text-slate-100 block mt-0.5">Sofía Ramírez completó el Módulo 3 de Python</span>
156:             </div>
157: 
158:             <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-950">
159:               <span className="text-[10px] text-slate-400 font-mono block">Hace 25 min</span>
160:               <span className="font-bold text-slate-900 dark:text-slate-100 block mt-0.5">Prof. García creó la lección 'Async/Await'</span>
161:             </div>
162: 
163:             <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-950">
164:               <span className="text-[10px] text-slate-400 font-mono block">Hace 1 hora</span>
165:               <span className="font-bold text-slate-900 dark:text-slate-100 block mt-0.5">Mateo Torres obtuvo Certificado en JS ES6+</span>
166:             </div>
167: 
168:             <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-950">
169:               <span className="text-[10px] text-slate-400 font-mono block">Hace 3 horas</span>
170:               <span className="font-bold text-slate-900 dark:text-slate-100 block mt-0.5">Nuevo registro de usuario: @valeria.cardenas</span>
171:             </div>
172:           </div>
173:         </div>
174:       </div>
175:     </Layout>
176:   );
177: };
````

## File: src/presentation/pages/CategoryManagementPage.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { Link } from 'react-router-dom';
  3: import { Layout } from '../components/Layout';
  4: import { Button } from '../components/Button';
  5: import { useCategoryManagement } from '../hooks/useCategoryManagement';
  6: import { CategoryTable } from '../components/category-management/CategoryTable';
  7: import { CategoryFormModal } from '../components/category-management/CategoryFormModal';
  8: import { ConfirmModal } from '../components/ConfirmModal';
  9: import { ArrowLeft, Search, Plus, CheckCircle } from 'lucide-react';
 10: import { Loader } from '../components/Loader';
 11: import { Pagination } from '../components/Pagination';
 12: 
 13: export const CategoryManagementPage: React.FC = () => {
 14:   const [confirmOpen, setConfirmOpen] = useState(false);
 15:   const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
 16: 
 17:   const {
 18:     categories,
 19:     isLoading,
 20:     search,
 21:     setSearch,
 22:     page,
 23:     setPage,
 24:     totalCategories,
 25:     showFormModal,
 26:     setShowFormModal,
 27:     isEditing,
 28:     formName,
 29:     formDescription,
 30:     setFormDescription,
 31:     formSlug,
 32:     setFormSlug,
 33:     formLoading,
 34:     formError,
 35:     successMessage,
 36:     isAdmin,
 37:     loadCategories,
 38:     handleOpenCreate,
 39:     handleOpenEdit,
 40:     handleNameChange,
 41:     handleSubmit,
 42:     handleDelete,
 43:   } = useCategoryManagement();
 44: 
 45:   return (
 46:     <Layout>
 47:       <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 48:         <div>
 49:           <Link
 50:             to="/admin"
 51:             className="inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-extrabold text-xs uppercase tracking-wider shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2.5px_2.5px_0px_0px_#00b835] hover:bg-brand-400 hover:text-slate-950 dark:hover:bg-brand-400 dark:hover:text-slate-950 transition-all cursor-pointer mb-3"
 52:           >
 53:             <ArrowLeft className="h-4 w-4" />
 54:             <span>Volver al Panel de Control</span>
 55:           </Link>
 56:           <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
 57:             Gestión de Categorías
 58:           </h1>
 59:           <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
 60:             Crea, edita y organiza las áreas temáticas del catálogo.
 61:           </p>
 62:         </div>
 63: 
 64:         <Button onClick={handleOpenCreate} className="flex items-center gap-2 self-start sm:self-auto">
 65:           <Plus className="h-4 w-4" />
 66:           Nueva Categoría
 67:         </Button>
 68:       </div>
 69: 
 70:       {successMessage && (
 71:         <div className="mb-6 flex items-center gap-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250/35 dark:border-emerald-900/50 p-4 text-sm text-emerald-800 dark:text-emerald-450">
 72:           <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-455" />
 73:           <span className="font-medium">{successMessage}</span>
 74:         </div>
 75:       )}
 76: 
 77:       {}
 78:       <div className="mb-6 max-w-md relative">
 79:         <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
 80:         <input
 81:           type="text"
 82:           placeholder="Buscar categorías por nombre o descripción..."
 83:           value={search}
 84:           onChange={(e) => setSearch(e.target.value)}
 85:           className="w-full border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white pl-10 pr-4 py-2.5 text-xs font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none focus:border-brand-500"
 86:         />
 87:       </div>
 88: 
 89:       {}
 90:       <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] p-6 overflow-hidden">
 91:         {isLoading ? (
 92:           <Loader />
 93:         ) : (
 94:           <div className="overflow-x-auto">
 95:             <CategoryTable
 96:               categories={categories}
 97:               isAdmin={isAdmin}
 98:               onEdit={handleOpenEdit}
 99:               onDelete={(id) => {
100:                 setDeleteTargetId(id);
101:                 setConfirmOpen(true);
102:               }}
103:             />
104:             <Pagination
105:               count={totalCategories}
106:               currentPage={page}
107:               pageSize={10}
108:               onPageChange={(newPage) => {
109:                 setPage(newPage);
110:                 loadCategories(newPage);
111:               }}
112:             />
113:           </div>
114:         )}
115:       </div>
116: 
117:       {}
118:       <CategoryFormModal
119:         isOpen={showFormModal}
120:         isEditing={isEditing}
121:         name={formName}
122:         description={formDescription}
123:         slug={formSlug}
124:         loading={formLoading}
125:         error={formError}
126:         onNameChange={handleNameChange}
127:         onDescriptionChange={setFormDescription}
128:         onSlugChange={setFormSlug}
129:         onClose={() => setShowFormModal(false)}
130:         onSubmit={handleSubmit}
131:       />
132: 
133:       <ConfirmModal
134:         isOpen={confirmOpen}
135:         title="¿Eliminar Categoría?"
136:         message="¿Estás seguro de que deseas eliminar esta categoría? Esto podría afectar a los cursos relacionados."
137:         confirmText="Eliminar"
138:         cancelText="Cancelar"
139:         isDanger
140:         onConfirm={() => {
141:           if (deleteTargetId !== null) {
142:             handleDelete(deleteTargetId);
143:           }
144:           setConfirmOpen(false);
145:         }}
146:         onCancel={() => setConfirmOpen(false)}
147:       />
148:     </Layout>
149:   );
150: };
````

## File: src/presentation/pages/UserManagementPage.tsx
````typescript
  1: import React, { useState, useMemo } from 'react';
  2: import { Link } from 'react-router-dom';
  3: import { Layout } from '../components/Layout';
  4: import { useAuthStore } from '../store/useAuthStore';
  5: import { UserCheck, Search, ArrowLeft, Filter, Check, Crown, BookOpen, Shield } from 'lucide-react';
  6: 
  7: interface SystemUser {
  8:   id: number;
  9:   username: string;
 10:   email: string;
 11:   first_name: string;
 12:   last_name: string;
 13:   role: 'admin' | 'professor' | 'student';
 14:   date_joined: string;
 15:   is_active: boolean;
 16: }
 17: 
 18: const SAMPLE_USERS: SystemUser[] = [
 19:   {
 20:     id: 1,
 21:     username: 'alex.admin',
 22:     email: 'j.alexander.lopez.f@gmail.com',
 23:     first_name: 'Alex',
 24:     last_name: 'López',
 25:     role: 'admin',
 26:     date_joined: '2024-01-10T10:00:00Z',
 27:     is_active: true
 28:   },
 29:   {
 30:     id: 2,
 31:     username: 'prof.garcia',
 32:     email: 'garcia.docente@ute.edu.ec',
 33:     first_name: 'Carlos',
 34:     last_name: 'García',
 35:     role: 'professor',
 36:     date_joined: '2024-02-14T09:30:00Z',
 37:     is_active: true
 38:   },
 39:   {
 40:     id: 3,
 41:     username: 'sofia.ramirez',
 42:     email: 'sofia.ramirez@gmail.com',
 43:     first_name: 'Sofía',
 44:     last_name: 'Ramírez',
 45:     role: 'student',
 46:     date_joined: '2026-07-15T14:20:00Z',
 47:     is_active: true
 48:   },
 49:   {
 50:     id: 4,
 51:     username: 'mateo.torres',
 52:     email: 'mateo.torres@gmail.com',
 53:     first_name: 'Mateo',
 54:     last_name: 'Torres',
 55:     role: 'student',
 56:     date_joined: '2026-07-18T11:00:00Z',
 57:     is_active: true
 58:   },
 59:   {
 60:     id: 5,
 61:     username: 'valeria.cardenas',
 62:     email: 'valeria.cardenas@gmail.com',
 63:     first_name: 'Valeria',
 64:     last_name: 'Cárdenas',
 65:     role: 'student',
 66:     date_joined: '2026-07-20T16:45:00Z',
 67:     is_active: true
 68:   },
 69:   {
 70:     id: 6,
 71:     username: 'prof.martinez',
 72:     email: 'martinez.profesor@ute.edu.ec',
 73:     first_name: 'Elena',
 74:     last_name: 'Martínez',
 75:     role: 'professor',
 76:     date_joined: '2024-03-01T08:15:00Z',
 77:     is_active: true
 78:   }
 79: ];
 80: 
 81: export const UserManagementPage: React.FC = () => {
 82:   const { user: currentUser } = useAuthStore();
 83:   const [users, setUsers] = useState<SystemUser[]>(SAMPLE_USERS);
 84:   const [searchTerm, setSearchTerm] = useState('');
 85:   const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'professor' | 'student'>('all');
 86:   const [notification, setNotification] = useState<string | null>(null);
 87: 
 88: 
 89:   const filteredUsers = useMemo(() => {
 90:     return users.filter((u) => {
 91:       const matchesSearch =
 92:         searchTerm === '' ||
 93:         u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
 94:         u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
 95:         `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
 96: 
 97:       const matchesRole = roleFilter === 'all' || u.role === roleFilter;
 98: 
 99:       return matchesSearch && matchesRole;
100:     });
101:   }, [users, searchTerm, roleFilter]);
102: 
103:   const handleRoleChange = (userId: number, newRole: 'admin' | 'professor' | 'student') => {
104:     setUsers((prev) =>
105:       prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
106:     );
107:     const updatedUser = users.find((u) => u.id === userId);
108:     setNotification(`Rol de ${updatedUser?.username || 'usuario'} actualizado a: ${newRole.toUpperCase()}`);
109:     setTimeout(() => setNotification(null), 4000);
110:   };
111: 
112:   const toggleUserStatus = (userId: number) => {
113:     setUsers((prev) =>
114:       prev.map((u) => (u.id === userId ? { ...u, is_active: !u.is_active } : u))
115:     );
116:   };
117: 
118:   return (
119:     <Layout>
120:       <div className="mb-6">
121:         <Link
122:           to="/admin"
123:           className="inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-extrabold text-xs uppercase tracking-wider shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2.5px_2.5px_0px_0px_#00b835] hover:bg-brand-400 hover:text-slate-950 dark:hover:bg-brand-400 dark:hover:text-slate-950 transition-all cursor-pointer mb-4"
124:         >
125:           <ArrowLeft className="h-4 w-4" />
126:           <span>Volver al Panel de Control</span>
127:         </Link>
128: 
129:         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
130:           <div>
131:             <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
132:               <UserCheck className="h-8 w-8 text-brand-500" />
133:               Gestión de Usuarios y Roles RBAC
134:             </h1>
135:             <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
136:               Administración central de cuentas de usuario, permisos de docentes y acceso de administradores.
137:             </p>
138:           </div>
139: 
140:           <div className="flex items-center gap-2">
141:             <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
142:               Operador: <span className="text-brand-500">{currentUser?.username}</span>
143:             </span>
144:           </div>
145:         </div>
146:       </div>
147: 
148:       {notification && (
149:         <div className="mb-6 flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500 text-xs font-bold text-emerald-900 dark:text-emerald-200 shadow-[4px_4px_0px_0px_rgba(16,185,129,0.4)] animate-fade-in">
150:           <Check className="h-5 w-5 text-emerald-600" />
151:           <span>{notification}</span>
152:         </div>
153:       )}
154: 
155:       {}
156:       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
157:         <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] flex items-center gap-4">
158:           <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-2 border-slate-950 flex items-center justify-center shrink-0">
159:             <Crown className="h-6 w-6" />
160:           </div>
161:           <div>
162:             <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Administradores</span>
163:             <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-display">
164:               {users.filter((u) => u.role === 'admin').length} Usuarios
165:             </div>
166:           </div>
167:         </div>
168: 
169:         <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] flex items-center gap-4">
170:           <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 border-2 border-slate-950 flex items-center justify-center shrink-0">
171:             <Shield className="h-6 w-6" />
172:           </div>
173:           <div>
174:             <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Docentes / Profesores</span>
175:             <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-display">
176:               {users.filter((u) => u.role === 'professor').length} Docentes
177:             </div>
178:           </div>
179:         </div>
180: 
181:         <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] flex items-center gap-4">
182:           <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-2 border-slate-950 flex items-center justify-center shrink-0">
183:             <BookOpen className="h-6 w-6" />
184:           </div>
185:           <div>
186:             <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Estudiantes</span>
187:             <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-display">
188:               {users.filter((u) => u.role === 'student').length} Estudiantes
189:             </div>
190:           </div>
191:         </div>
192:       </div>
193: 
194:       {}
195:       <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
196:         <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
197:           <div className="relative flex-1 w-full">
198:             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
199:             <input
200:               type="text"
201:               placeholder="Buscar por usuario, nombre o correo..."
202:               value={searchTerm}
203:               onChange={(e) => setSearchTerm(e.target.value)}
204:               className="w-full pl-9 pr-4 py-2.5 border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white text-xs font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none focus:border-brand-500"
205:             />
206:           </div>
207: 
208:           <div className="flex items-center gap-3 w-full sm:w-auto">
209:             <Filter className="h-4 w-4 text-slate-400 shrink-0" />
210:             <select
211:               value={roleFilter}
212:               onChange={(e) => setRoleFilter(e.target.value as any)}
213:               className="w-full sm:w-auto px-4 py-2.5 border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none cursor-pointer"
214:             >
215:               <option value="all">Todos los Roles</option>
216:               <option value="admin">Solo Administradores</option>
217:               <option value="professor">Solo Docentes</option>
218:               <option value="student">Solo Estudiantes</option>
219:             </select>
220:           </div>
221:         </div>
222:       </div>
223: 
224:       {}
225:       <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] overflow-hidden">
226:         <div className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
227:           <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
228:             Cuentas de Usuario Registradas ({filteredUsers.length})
229:           </span>
230:           <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-brand-400 text-slate-950 border border-slate-950">
231:             PANEL RBAC SECURITY
232:           </span>
233:         </div>
234: 
235:         <div className="overflow-x-auto">
236:           <table className="w-full text-left border-collapse">
237:             <thead>
238:               <tr className="bg-slate-50 dark:bg-slate-950 border-b-2 border-slate-950 text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
239:                 <th className="py-3.5 px-6">Usuario / Nombre</th>
240:                 <th className="py-3.5 px-6">Correo Electrónico</th>
241:                 <th className="py-3.5 px-6">Fecha Registro</th>
242:                 <th className="py-3.5 px-6">Rol Actual</th>
243:                 <th className="py-3.5 px-6">Estado</th>
244:                 <th className="py-3.5 px-6 text-right">Asignar Nuevo Rol</th>
245:               </tr>
246:             </thead>
247:             <tbody className="divide-y-2 divide-slate-100 dark:divide-slate-850 text-xs font-medium text-slate-800 dark:text-slate-200">
248:               {filteredUsers.map((u) => {
249:                 const formattedDate = new Date(u.date_joined).toLocaleDateString('es-ES', {
250:                   day: '2-digit',
251:                   month: 'short',
252:                   year: 'numeric'
253:                 });
254: 
255:                 return (
256:                   <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
257:                     <td className="py-4 px-6">
258:                       <div className="flex items-center gap-3">
259:                         <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-800 text-white font-bold border border-slate-950 flex items-center justify-center text-xs shrink-0">
260:                           {u.username.charAt(0).toUpperCase()}
261:                         </div>
262:                         <div>
263:                           <span className="font-bold block text-slate-950 dark:text-white">
264:                             {u.first_name} {u.last_name}
265:                           </span>
266:                           <span className="text-[10px] font-mono text-slate-500">@{u.username}</span>
267:                         </div>
268:                       </div>
269:                     </td>
270: 
271:                     <td className="py-4 px-6 font-mono text-slate-600 dark:text-slate-400">
272:                       {u.email}
273:                     </td>
274: 
275:                     <td className="py-4 px-6 text-slate-500 font-mono text-[11px]">
276:                       {formattedDate}
277:                     </td>
278: 
279:                     <td className="py-4 px-6">
280:                       {u.role === 'admin' && (
281:                         <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-100 dark:bg-rose-950/40 border border-rose-500 text-rose-800 dark:text-rose-300 font-bold text-[10px] uppercase">
282:                           <Crown className="h-3 w-3" /> ADMIN
283:                         </span>
284:                       )}
285:                       {u.role === 'professor' && (
286:                         <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-100 dark:bg-brand-950/40 border border-brand-500 text-brand-800 dark:text-brand-300 font-bold text-[10px] uppercase">
287:                           <Shield className="h-3 w-3" /> DOCENTE
288:                         </span>
289:                       )}
290:                       {u.role === 'student' && (
291:                         <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] uppercase">
292:                           <BookOpen className="h-3 w-3" /> ESTUDIANTE
293:                         </span>
294:                       )}
295:                     </td>
296: 
297:                     <td className="py-4 px-6">
298:                       <button
299:                         onClick={() => toggleUserStatus(u.id)}
300:                         className={`px-2.5 py-1 border text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
301:                           u.is_active
302:                             ? 'bg-emerald-50 text-emerald-700 border-emerald-500'
303:                             : 'bg-rose-50 text-rose-700 border-rose-500'
304:                         }`}
305:                       >
306:                         {u.is_active ? 'Activo' : 'Inactivo'}
307:                       </button>
308:                     </td>
309: 
310:                     <td className="py-4 px-6 text-right">
311:                       <div className="flex items-center justify-end gap-1.5">
312:                         <button
313:                           onClick={() => handleRoleChange(u.id, 'student')}
314:                           disabled={u.role === 'student'}
315:                           className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-[10px] uppercase border border-slate-950 disabled:opacity-30 hover:bg-emerald-400 hover:text-slate-950 transition-colors cursor-pointer"
316:                         >
317:                           Estudiante
318:                         </button>
319:                         <button
320:                           onClick={() => handleRoleChange(u.id, 'professor')}
321:                           disabled={u.role === 'professor'}
322:                           className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-[10px] uppercase border border-slate-950 disabled:opacity-30 hover:bg-brand-400 hover:text-slate-950 transition-colors cursor-pointer"
323:                         >
324:                           Docente
325:                         </button>
326:                         <button
327:                           onClick={() => handleRoleChange(u.id, 'admin')}
328:                           disabled={u.role === 'admin'}
329:                           className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-[10px] uppercase border border-slate-950 disabled:opacity-30 hover:bg-rose-400 hover:text-slate-950 transition-colors cursor-pointer"
330:                         >
331:                           Admin
332:                         </button>
333:                       </div>
334:                     </td>
335:                   </tr>
336:                 );
337:               })}
338:             </tbody>
339:           </table>
340:         </div>
341:       </div>
342:     </Layout>
343:   );
344: };
````

## File: src/presentation/router/AppRouter.tsx
````typescript
  1: import React, { useEffect } from 'react';
  2: import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
  3: import { useAuthStore } from '../store/useAuthStore';
  4: import { useThemeStore } from '../store/useThemeStore';
  5: import { Loader } from '../components/Loader';
  6: 
  7: 
  8: import { HomePage } from '../pages/HomePage';
  9: import { CatalogPage } from '../pages/CatalogPage';
 10: import { CourseDetailPage } from '../pages/CourseDetailPage';
 11: import { LoginPage } from '../pages/LoginPage';
 12: import { RegisterPage } from '../pages/RegisterPage';
 13: import { StudentDashboard } from '../pages/StudentDashboard';
 14: import { LessonPlayerPage } from '../pages/LessonPlayerPage';
 15: import { AdminDashboard } from '../pages/AdminDashboard';
 16: import { CourseManagementPage } from '../pages/CourseManagementPage';
 17: import { LessonManagementPage } from '../pages/LessonManagementPage';
 18: import { CategoryManagementPage } from '../pages/CategoryManagementPage';
 19: import { StudentManagementPage } from '../pages/StudentManagementPage';
 20: import { UserManagementPage } from '../pages/UserManagementPage';
 21: import { AnalyticsDashboardPage } from '../pages/AnalyticsDashboardPage';
 22: import { ProfilePage } from '../pages/ProfilePage';
 23: 
 24: 
 25: const RequireAuth: React.FC<{ children: React.ReactElement; allowedRoles?: string[] }> = ({
 26:   children,
 27:   allowedRoles,
 28: }) => {
 29:   const { isAuthenticated, user, isLoading } = useAuthStore();
 30:   const location = useLocation();
 31: 
 32:   if (isLoading) {
 33:     return <Loader fullScreen />;
 34:   }
 35: 
 36:   if (!isAuthenticated) {
 37:     return <Navigate to="/login" state={{ from: location }} replace />;
 38:   }
 39: 
 40:   if (allowedRoles && user && !allowedRoles.includes(user.role)) {
 41:     if (user.role === 'student') {
 42:       return <Navigate to="/dashboard" replace />;
 43:     }
 44:     return <Navigate to="/admin" replace />;
 45:   }
 46: 
 47:   return children;
 48: };
 49: 
 50: 
 51: const PublicOnly: React.FC<{ children: React.ReactElement }> = ({ children }) => {
 52:   const { isAuthenticated, user } = useAuthStore();
 53: 
 54:   if (isAuthenticated && user) {
 55:     if (user.role === 'admin' || user.role === 'professor') {
 56:       return <Navigate to="/admin" replace />;
 57:     }
 58:     return <Navigate to="/dashboard" replace />;
 59:   }
 60: 
 61:   return children;
 62: };
 63: 
 64: export const AppRouter: React.FC = () => {
 65:   const { checkAuth, isLoading } = useAuthStore();
 66:   const { initTheme } = useThemeStore();
 67: 
 68:   useEffect(() => {
 69:     initTheme();
 70:     checkAuth();
 71:   }, [checkAuth, initTheme]);
 72: 
 73:   if (isLoading) {
 74:     return <Loader fullScreen />;
 75:   }
 76: 
 77:   return (
 78:     <BrowserRouter>
 79:       <Routes>
 80:         {}
 81:         <Route path="/" element={<HomePage />} />
 82:         <Route path="/courses" element={<CatalogPage />} />
 83:         <Route path="/courses/:id" element={<CourseDetailPage />} />
 84: 
 85:         {}
 86:         <Route
 87:           path="/login"
 88:           element={
 89:             <PublicOnly>
 90:               <LoginPage />
 91:             </PublicOnly>
 92:           }
 93:         />
 94:         <Route
 95:           path="/register"
 96:           element={
 97:             <PublicOnly>
 98:               <RegisterPage />
 99:             </PublicOnly>
100:           }
101:         />
102: 
103:         {}
104:         <Route
105:           path="/dashboard"
106:           element={
107:             <RequireAuth allowedRoles={['student']}>
108:               <StudentDashboard />
109:             </RequireAuth>
110:           }
111:         />
112:         <Route
113:           path="/learn/:courseId/lesson/:lessonId"
114:           element={
115:             <RequireAuth allowedRoles={['student', 'professor', 'admin']}>
116:               <LessonPlayerPage />
117:             </RequireAuth>
118:           }
119:         />
120:         <Route
121:           path="/profile"
122:           element={
123:             <RequireAuth allowedRoles={['student', 'professor', 'admin']}>
124:               <ProfilePage />
125:             </RequireAuth>
126:           }
127:         />
128: 
129:         {}
130:         <Route
131:           path="/admin"
132:           element={
133:             <RequireAuth allowedRoles={['admin', 'professor']}>
134:               <AdminDashboard />
135:             </RequireAuth>
136:           }
137:         />
138:         <Route
139:           path="/admin/courses"
140:           element={
141:             <RequireAuth allowedRoles={['admin', 'professor']}>
142:               <CourseManagementPage />
143:             </RequireAuth>
144:           }
145:         />
146:         <Route
147:           path="/admin/courses/:courseId/lessons"
148:           element={
149:             <RequireAuth allowedRoles={['admin', 'professor']}>
150:               <LessonManagementPage />
151:             </RequireAuth>
152:           }
153:         />
154:         <Route
155:           path="/admin/categories"
156:           element={
157:             <RequireAuth allowedRoles={['admin', 'professor']}>
158:               <CategoryManagementPage />
159:             </RequireAuth>
160:           }
161:         />
162:         <Route
163:           path="/admin/students"
164:           element={
165:             <RequireAuth allowedRoles={['admin', 'professor']}>
166:               <StudentManagementPage />
167:             </RequireAuth>
168:           }
169:         />
170:         <Route
171:           path="/admin/users"
172:           element={
173:             <RequireAuth allowedRoles={['admin']}>
174:               <UserManagementPage />
175:             </RequireAuth>
176:           }
177:         />
178:         <Route
179:           path="/admin/analytics"
180:           element={
181:             <RequireAuth allowedRoles={['admin', 'professor']}>
182:               <AnalyticsDashboardPage />
183:             </RequireAuth>
184:           }
185:         />
186: 
187:         {}
188:         <Route path="*" element={<Navigate to="/" replace />} />
189:       </Routes>
190:     </BrowserRouter>
191:   );
192: };
````

## File: src/presentation/store/useAuthStore.ts
````typescript
  1: import { create } from 'zustand';
  2: import { User } from '@domain/entities/User';
  3: import {
  4:   loginUseCase,
  5:   getCurrentUserUseCase,
  6:   updateCurrentUserUseCase,
  7:   logoutUseCase,
  8: } from '@infrastructure/factories/AuthFactory';
  9: import { LocalTokenStorage } from '@infrastructure/storage/local-token-storage';
 10: import { LoginRequestDto } from '@application/dtos/AuthDto';
 11: import { decodeJwt } from '../utils/jwt-helper';
 12: 
 13: interface AuthState {
 14:   user: User | null;
 15:   accessToken: string | null;
 16:   isAuthenticated: boolean;
 17:   isLoading: boolean;
 18:   error: string | null;
 19:   login: (credentials: LoginRequestDto) => Promise<void>;
 20:   logout: () => Promise<void>;
 21:   checkAuth: () => Promise<void>;
 22:   updateProfile: (data: any) => Promise<void>;
 23: }
 24: 
 25: const enrichUserWithCachedProfile = (user: User): User => {
 26:   try {
 27:     const storedReg = JSON.parse(localStorage.getItem('oncourses_registered_users') || '{}');
 28:     const cachedReg = storedReg[user.username?.toLowerCase()] || storedReg[user.email?.toLowerCase()];
 29: 
 30:     const savedProfiles = JSON.parse(localStorage.getItem('oncourses_user_profiles') || '{}');
 31:     const saved = savedProfiles[user.username?.toLowerCase()] || savedProfiles[user.id] || {};
 32: 
 33:     return {
 34:       ...user,
 35:       first_name: saved.first_name || user.first_name || cachedReg?.first_name || user.username,
 36:       last_name: saved.last_name || user.last_name || cachedReg?.last_name || '',
 37:       avatar: saved.avatar || user.avatar || '',
 38:       phone: saved.phone || user.phone || cachedReg?.phone || '+593 99 123 4567',
 39:       country: saved.country || user.country || cachedReg?.country || 'Ecuador',
 40:       birth_date: saved.birth_date || user.birth_date || '',
 41:       biography: saved.biography || user.biography || '',
 42:       professional_title: saved.professional_title || user.professional_title || '',
 43:       specialty: saved.specialty || user.specialty || '',
 44:       linkedin_url: saved.linkedin_url || user.linkedin_url || '',
 45:     };
 46:   } catch {
 47:     return {
 48:       ...user,
 49:       phone: user.phone || '+593 99 123 4567',
 50:       country: user.country || 'Ecuador',
 51:     };
 52:   }
 53: };
 54: 
 55: export const useAuthStore = create<AuthState>((set) => ({
 56:   user: null,
 57:   accessToken: LocalTokenStorage.getAccessToken(),
 58:   isAuthenticated: !!LocalTokenStorage.getAccessToken(),
 59:   isLoading: false,
 60:   error: null,
 61: 
 62:   login: async (credentials) => {
 63:     set({ isLoading: true, error: null });
 64:     try {
 65:       const response = await loginUseCase.execute(credentials);
 66: 
 67:       LocalTokenStorage.setAccessToken(response.access);
 68:       LocalTokenStorage.setRefreshToken(response.refresh);
 69: 
 70:       const jwtData = decodeJwt(response.access);
 71:       if (jwtData && jwtData.user_id) {
 72:         try {
 73:           const userProfile = await getCurrentUserUseCase.execute(jwtData.user_id);
 74:           set({
 75:             user: enrichUserWithCachedProfile(userProfile),
 76:             accessToken: response.access,
 77:             isAuthenticated: true,
 78:             isLoading: false,
 79:           });
 80:         } catch {
 81:           const fallbackUser: User = {
 82:             id: jwtData.user_id,
 83:             username: credentials.username,
 84:             email: `${credentials.username}@example.com`,
 85:             first_name: credentials.username,
 86:             last_name: '',
 87:             role: 'student' as any,
 88:             is_active: true,
 89:           };
 90:           set({
 91:             user: enrichUserWithCachedProfile(fallbackUser),
 92:             accessToken: response.access,
 93:             isAuthenticated: true,
 94:             isLoading: false,
 95:           });
 96:         }
 97:       } else {
 98:         const fallbackUser: User = {
 99:           id: 1,
100:           username: credentials.username,
101:           email: `${credentials.username}@example.com`,
102:           first_name: credentials.username,
103:           last_name: '',
104:           role: 'student' as any,
105:           is_active: true,
106:         };
107:         set({
108:           user: enrichUserWithCachedProfile(fallbackUser),
109:           accessToken: response.access,
110:           isAuthenticated: true,
111:           isLoading: false,
112:         });
113:       }
114:     } catch (err: any) {
115:       set({
116:         isLoading: false,
117:         error: err.message || 'Error al iniciar sesión',
118:       });
119:       throw err;
120:     }
121:   },
122: 
123:   logout: async () => {
124:     const refresh = LocalTokenStorage.getRefreshToken();
125:     if (refresh) {
126:       try {
127:         await logoutUseCase.execute(refresh);
128:       } catch (err) {
129:         console.warn('Logout request failed', err);
130:       }
131:     }
132:     LocalTokenStorage.clear();
133:     set({
134:       user: null,
135:       accessToken: null,
136:       isAuthenticated: false,
137:     });
138:   },
139: 
140:   checkAuth: async () => {
141:     const token = LocalTokenStorage.getAccessToken();
142:     if (!token) {
143:       set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
144:       return;
145:     }
146:     const jwtData = decodeJwt(token);
147:     if (!jwtData || !jwtData.user_id) {
148:       LocalTokenStorage.clear();
149:       set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
150:       return;
151:     }
152:     set({ isLoading: true });
153:     try {
154:       const userProfile = await getCurrentUserUseCase.execute(jwtData.user_id);
155:       set({
156:         user: enrichUserWithCachedProfile(userProfile),
157:         accessToken: token,
158:         isAuthenticated: true,
159:         isLoading: false,
160:       });
161:     } catch (err) {
162:       console.warn('Failed to verify token', err);
163:       LocalTokenStorage.clear();
164:       set({
165:         user: null,
166:         accessToken: null,
167:         isAuthenticated: false,
168:         isLoading: false,
169:       });
170:     }
171:   },
172: 
173:   updateProfile: async (data: any) => {
174:     const store = useAuthStore.getState();
175:     const currentUserId = store.user?.id;
176:     if (!currentUserId) throw new Error('No autenticado');
177: 
178:     set({ isLoading: true, error: null });
179:     try {
180:       let updatedUser: any = {};
181:       try {
182:         updatedUser = await updateCurrentUserUseCase.execute(currentUserId, data);
183:       } catch {
184:         updatedUser = {};
185:       }
186: 
187:       const mergedUser = { ...(store.user as User), ...updatedUser, ...data };
188: 
189: 
190:       try {
191:         const savedProfiles = JSON.parse(localStorage.getItem('oncourses_user_profiles') || '{}');
192:         const userKey = store.user?.username?.toLowerCase() || currentUserId;
193:         savedProfiles[userKey] = {
194:           ...(savedProfiles[userKey] || {}),
195:           ...data,
196:           ...updatedUser,
197:         };
198:         localStorage.setItem('oncourses_user_profiles', JSON.stringify(savedProfiles));
199: 
200: 
201:         const storedReg = JSON.parse(localStorage.getItem('oncourses_registered_users') || '{}');
202:         if (userKey && storedReg[userKey]) {
203:           storedReg[userKey] = {
204:             ...storedReg[userKey],
205:             ...data,
206:             ...updatedUser,
207:           };
208:           localStorage.setItem('oncourses_registered_users', JSON.stringify(storedReg));
209:         }
210:       } catch (storageErr) {
211:         console.warn('Could not update localStorage profile cache', storageErr);
212:       }
213: 
214:       set({
215:         user: mergedUser,
216:         isLoading: false,
217:       });
218:     } catch (err: any) {
219:       set({
220:         isLoading: false,
221:         error: err.message || 'Error al actualizar el perfil',
222:       });
223:       throw err;
224:     }
225:   },
226: }));
227: 
228: if (typeof window !== 'undefined') {
229:   window.addEventListener('auth-logout', () => {
230:     useAuthStore.getState().logout();
231:   });
232: }
````

## File: src/presentation/components/course-management/CourseFormModal.tsx
````typescript
  1: import React from 'react';
  2: import { Category } from '@domain/entities/Category';
  3: import { Input } from '../Input';
  4: import { Button } from '../Button';
  5: import { ShieldAlert } from 'lucide-react';
  6: 
  7: interface CourseFormModalProps {
  8:   isOpen: boolean;
  9:   isEditing: boolean;
 10:   categories: Category[];
 11:   category: number | '';
 12:   title: string;
 13:   description: string;
 14:   price: string;
 15:   slug: string;
 16:   isActive: boolean;
 17:   loading: boolean;
 18:   error: string | null;
 19:   onCategoryChange: (val: number | '') => void;
 20:   onTitleChange: (val: string) => void;
 21:   onDescriptionChange: (val: string) => void;
 22:   onPriceChange: (val: string) => void;
 23:   onSlugChange: (val: string) => void;
 24:   onIsActiveChange: (val: boolean) => void;
 25:   onCoverImageChange: (file: File | null) => void;
 26:   onClose: () => void;
 27:   onSubmit: (e: React.FormEvent) => void;
 28: }
 29: 
 30: export const CourseFormModal: React.FC<CourseFormModalProps> = ({
 31:   isOpen,
 32:   isEditing,
 33:   categories,
 34:   category,
 35:   title,
 36:   description,
 37:   price,
 38:   slug,
 39:   isActive,
 40:   loading,
 41:   error,
 42:   onCategoryChange,
 43:   onTitleChange,
 44:   onDescriptionChange,
 45:   onPriceChange,
 46:   onSlugChange,
 47:   onIsActiveChange,
 48:   onCoverImageChange,
 49:   onClose,
 50:   onSubmit,
 51: }) => {
 52:   if (!isOpen) return null;
 53: 
 54:   return (
 55:     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
 56:       <div className="w-full max-w-lg border-2 border-slate-950 bg-white p-8 text-slate-950 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] relative my-8">
 57:         <h3 className="font-display text-xl font-black text-slate-950 mb-6 pb-2 border-b-2 border-slate-950 flex justify-between items-center">
 58:           <span>{isEditing ? 'Editar Curso' : 'Crear Nuevo Curso'}</span>
 59:           <span className="text-xs font-mono bg-[#00cc33] text-slate-950 px-2 py-0.5 border border-slate-950 font-bold">
 60:             CURSO #{category || 'NUEVO'}
 61:           </span>
 62:         </h3>
 63: 
 64:         {isEditing && (
 65:           <div className="mb-6 p-3 bg-[#00cc33]/15 border-2 border-slate-950 flex items-center justify-between gap-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
 66:             <div className="text-xs font-bold text-slate-950">
 67:               <span>📚 ¿Quieres agregar o editar las lecciones y módulos de este curso?</span>
 68:             </div>
 69:             <a
 70:               href={`/admin/courses/${slug ? slug : '1'}/lessons`}
 71:               onClick={(e) => {
 72: 
 73:                 e.preventDefault();
 74:                 window.location.href = `/admin/courses/${slug}/lessons`;
 75:               }}
 76:               className="px-3 py-1.5 bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 font-mono font-black text-[11px] uppercase border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] shrink-0"
 77:             >
 78:               Ir a Lecciones ↗
 79:             </a>
 80:           </div>
 81:         )}
 82: 
 83:         {error && (
 84:           <div className="flex items-start gap-2.5 bg-rose-50 border-2 border-rose-500 p-3 text-xs font-bold text-rose-900 mb-6">
 85:             <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600" />
 86:             <div className="leading-relaxed">{error}</div>
 87:           </div>
 88:         )}
 89: 
 90:         <form onSubmit={onSubmit} className="flex flex-col gap-5">
 91:           <div className="flex flex-col gap-1.5">
 92:             <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
 93:               Categoría Temática *
 94:             </label>
 95:             <select
 96:               value={category}
 97:               onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : '')}
 98:               disabled={loading}
 99:               className="w-full border-2 border-slate-950 bg-white px-4 py-2.5 text-xs font-medium outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:border-brand-500"
100:               required
101:             >
102:               <option value="">-- Selecciona una Categoría --</option>
103:               {categories.map((cat) => (
104:                 <option key={cat.id} value={cat.id}>
105:                   {cat.name}
106:                 </option>
107:               ))}
108:             </select>
109:           </div>
110: 
111:           <Input
112:             label="Título del Curso *"
113:             placeholder="Ej: React y TypeScript de Novato a Experto"
114:             value={title}
115:             onChange={(e) => onTitleChange(e.target.value)}
116:             disabled={loading}
117:             required
118:           />
119: 
120:           <Input
121:             label="Slug del Curso *"
122:             placeholder="ej: react-y-typescript-de-novato-a-experto"
123:             value={slug}
124:             onChange={(e) => onSlugChange(e.target.value)}
125:             disabled={loading}
126:             required
127:           />
128: 
129:           <div className="flex flex-col gap-1.5">
130:             <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
131:               Descripción del Temario
132:             </label>
133:             <textarea
134:               placeholder="Escribe un resumen o las metas del curso..."
135:               value={description}
136:               onChange={(e) => onDescriptionChange(e.target.value)}
137:               disabled={loading}
138:               rows={3}
139:               className="w-full border-2 border-slate-950 bg-white px-4 py-2.5 text-xs font-medium outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:border-brand-500 resize-none"
140:             />
141:           </div>
142: 
143:           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
144:             <Input
145:               label="Precio (USD) *"
146:               type="number"
147:               step="0.01"
148:               placeholder="19.99"
149:               value={price}
150:               onChange={(e) => onPriceChange(e.target.value)}
151:               disabled={loading}
152:               required
153:             />
154: 
155:             <div className="flex flex-col gap-2">
156:               <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
157:                 Imagen de Portada (Subida de Archivo o Predefinido)
158:               </label>
159: 
160:               <div className="flex items-center gap-3">
161:                 <input
162:                   type="file"
163:                   accept="image/*"
164:                   onChange={(e) => {
165:                     const file = e.target.files?.[0] || null;
166:                     onCoverImageChange(file);
167:                   }}
168:                   disabled={loading}
169:                   className="w-full text-xs text-slate-700 file:mr-4 file:py-1.5 file:px-3 file:border-2 file:border-slate-950 file:text-xs file:font-extrabold file:bg-[#00cc33] file:text-slate-950 hover:file:bg-[#00ff41] file:cursor-pointer"
170:                 />
171:               </div>
172: 
173:               <p className="text-[11px] text-slate-500 font-medium mt-1">
174:                 Formats soportados: PNG, JPG, WEBP, SVG. La foto se asociará automáticamente a la portada del curso.
175:               </p>
176:             </div>
177:           </div>
178: 
179:           <div className="flex items-center gap-2 mt-2">
180:             <input
181:               type="checkbox"
182:               id="formIsActive"
183:               checked={isActive}
184:               onChange={(e) => onIsActiveChange(e.target.checked)}
185:               disabled={loading}
186:               className="h-4 w-4 border-2 border-slate-950 text-brand-600 focus:ring-brand-500"
187:             />
188:             <label htmlFor="formIsActive" className="text-xs font-bold text-slate-800">
189:               Habilitar publicación (Visible en el catálogo público)
190:             </label>
191:           </div>
192: 
193:           <div className="flex justify-end gap-3 mt-6">
194:             <Button
195:               type="button"
196:               variant="outline"
197:               size="sm"
198:               onClick={onClose}
199:               disabled={loading}
200:             >
201:               Cancelar
202:             </Button>
203:             <Button type="submit" size="sm" isLoading={loading}>
204:               {isEditing ? 'Guardar Cambios' : 'Crear Curso'}
205:             </Button>
206:           </div>
207:         </form>
208:       </div>
209:     </div>
210:   );
211: };
````

## File: src/presentation/components/course-management/CourseTable.tsx
````typescript
  1: import React from 'react';
  2: import { Course } from '@domain/entities/Course';
  3: import { Link } from 'react-router-dom';
  4: import { Pencil, Trash2, ListPlus, Eye } from 'lucide-react';
  5: 
  6: interface CourseTableProps {
  7:   courses: Course[];
  8:   isAdmin: boolean;
  9:   onEdit: (course: Course) => void;
 10:   onToggleStatus?: (course: Course) => void;
 11:   onDelete: (id: number) => void;
 12: }
 13: 
 14: export const CourseTable: React.FC<CourseTableProps> = ({
 15:   courses,
 16:   isAdmin,
 17:   onEdit,
 18:   onToggleStatus,
 19:   onDelete,
 20: }) => {
 21:   return (
 22:     <table className="w-full text-left border-collapse text-xs">
 23:       <thead>
 24:         <tr className="border-b-2 border-slate-950 bg-slate-100 dark:bg-slate-950 text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
 25:           <th className="py-3.5 px-6">ID</th>
 26:           <th className="py-3.5 px-4">Curso</th>
 27:           <th className="py-3.5 px-4">Precio</th>
 28:           <th className="py-3.5 px-4">Estado (Clic para Cambiar)</th>
 29:           <th className="py-3.5 px-4 text-center">Acciones</th>
 30:         </tr>
 31:       </thead>
 32:       <tbody className="divide-y-2 divide-slate-100 dark:divide-slate-850 font-medium text-slate-800 dark:text-slate-200">
 33:         {courses.length > 0 ? (
 34:           courses.map((c) => (
 35:             <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
 36:               <td className="py-4 px-6 font-mono font-bold text-slate-400">#{c.id}</td>
 37:               <td className="py-4 px-4">
 38:                 <div className="flex flex-col">
 39:                   <span className="font-extrabold text-slate-950 dark:text-white line-clamp-1">{c.title}</span>
 40:                   <span className="text-[10px] font-mono text-slate-400 mt-0.5">Slug: /{c.slug}</span>
 41:                 </div>
 42:               </td>
 43:               <td className="py-4 px-4 font-mono font-extrabold text-slate-950 dark:text-white">
 44:                 {parseFloat(c.price) === 0 ? 'Gratis' : `$${c.price}`}
 45:               </td>
 46:               <td className="py-4 px-4">
 47:                 <button
 48:                   type="button"
 49:                   onClick={() => onToggleStatus?.(c)}
 50:                   className={`inline-flex items-center gap-1 border-2 border-slate-950 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
 51:                     c.is_active
 52:                       ? 'bg-emerald-400 text-slate-950 hover:bg-rose-400'
 53:                       : 'bg-amber-400 text-slate-950 hover:bg-emerald-400'
 54:                   }`}
 55:                   title={c.is_active ? 'Clic para Inactivar este curso' : 'Clic para Activar este curso'}
 56:                 >
 57:                   <span>{c.is_active ? '🟢 ACTIVO' : '🟡 INACTIVO'}</span>
 58:                 </button>
 59:               </td>
 60:               <td className="py-4 px-4 text-center">
 61:                 <div className="flex items-center justify-center gap-1.5">
 62:                   <Link to={`/courses/${c.id}`}>
 63:                     <button
 64:                       className="px-2.5 py-1 bg-[#00cc33] text-slate-950 font-black text-[10px] uppercase tracking-wider border border-slate-950 hover:bg-[#00ff41] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 cursor-pointer"
 65:                       title="Vista Previa de Estudiante"
 66:                     >
 67:                       <Eye className="h-3.5 w-3.5" />
 68:                       <span>Ver</span>
 69:                     </button>
 70:                   </Link>
 71:                   <Link to={`/admin/courses/${c.id}/lessons`}>
 72:                     <button
 73:                       className="px-2.5 py-1 bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 font-extrabold text-[10px] uppercase tracking-wider border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 cursor-pointer"
 74:                       title="Agregar y Gestionar Módulos y Lecciones de este Curso"
 75:                     >
 76:                       <ListPlus className="h-3.5 w-3.5" />
 77:                       <span>Módulos & Lecciones</span>
 78:                     </button>
 79:                   </Link>
 80:                   <button
 81:                     onClick={() => onEdit(c)}
 82:                     className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-[10px] uppercase tracking-wider border border-slate-950 hover:bg-slate-200 cursor-pointer"
 83:                   >
 84:                     <Pencil className="h-3.5 w-3.5" />
 85:                   </button>
 86:                   <button
 87:                     onClick={() => onDelete(c.id)}
 88:                     disabled={!isAdmin}
 89:                     className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-slate-950 cursor-pointer ${
 90:                       isAdmin ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-slate-200 text-slate-400 opacity-40 cursor-not-allowed'
 91:                     }`}
 92:                   >
 93:                     <Trash2 className="h-3.5 w-3.5" />
 94:                   </button>
 95:                 </div>
 96:               </td>
 97:             </tr>
 98:           ))
 99:         ) : (
100:           <tr>
101:             <td colSpan={5} className="py-12 text-center text-slate-400 italic">
102:               No se encontraron cursos cargados.
103:             </td>
104:           </tr>
105:         )}
106:       </tbody>
107:     </table>
108:   );
109: };
````

## File: src/presentation/components/profile/ProfileHeader.tsx
````typescript
 1: import React from 'react';
 2: import { User } from '@domain/entities/User';
 3: import { Mail, Calendar } from 'lucide-react';
 4: 
 5: interface ProfileHeaderProps {
 6:   user: User | null;
 7:   initials: string;
 8:   roleConfig: { label: string; bg: string; dot: string };
 9:   joinedDate: string;
10: }
11: 
12: export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
13:   user,
14:   initials,
15:   roleConfig,
16:   joinedDate,
17: }) => {
18:   return (
19:     <div className="relative border-2 border-slate-950 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00b835] overflow-hidden text-slate-950 dark:text-white">
20:       {}
21:       <div className="relative shrink-0 select-none group">
22:         {user?.avatar ? (
23:           <img
24:             src={user.avatar}
25:             alt={user.username}
26:             className="h-24 w-24 rounded-full object-cover border-4 border-slate-950 dark:border-slate-700 shadow-md"
27:           />
28:         ) : (
29:           <div className="h-24 w-24 rounded-full bg-[#00cc33] text-slate-950 border-4 border-slate-950 dark:border-slate-700 flex items-center justify-center font-display font-black text-3xl shadow-inner uppercase">
30:             {initials}
31:           </div>
32:         )}
33:       </div>
34: 
35:       {}
36:       <div className="text-center md:text-left flex-1">
37:         <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-1.5">
38:           <h2 className="font-display text-2xl font-black text-slate-950 dark:text-white leading-tight">
39:             {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.username}
40:           </h2>
41:           <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 border border-slate-950 bg-[#00cc33] text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
42:             {roleConfig.label}
43:           </span>
44:         </div>
45:         <p className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">@{user?.username}</p>
46: 
47:         <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 mt-4 text-xs font-bold text-slate-700 dark:text-slate-300">
48:           <div className="flex items-center gap-1.5">
49:             <Mail className="h-4 w-4 text-slate-500 dark:text-slate-400" />
50:             <span>{user?.email}</span>
51:           </div>
52:           <div className="flex items-center gap-1.5">
53:             <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
54:             <span>Miembro desde: {joinedDate}</span>
55:           </div>
56:         </div>
57:       </div>
58:     </div>
59:   );
60: };
````

## File: src/presentation/hooks/useLessonManagement.ts
````typescript
  1: import React, { useState, useEffect, useCallback } from 'react';
  2: import { useAuthStore } from '../store/useAuthStore';
  3: import { getCourseByIdUseCase } from '@infrastructure/factories/CourseFactory';
  4: import {
  5:   getModulesUseCase,
  6:   createModuleUseCase,
  7:   updateModuleUseCase,
  8:   deleteModuleUseCase,
  9: } from '@infrastructure/factories/ModuleFactory';
 10: import {
 11:   getLessonsUseCase,
 12:   createLessonUseCase,
 13:   updateLessonUseCase,
 14:   deleteLessonUseCase,
 15: } from '@infrastructure/factories/LessonFactory';
 16: import { Course } from '@domain/entities/Course';
 17: import { Module } from '@domain/entities/Module';
 18: import { Lesson } from '@domain/entities/Lesson';
 19: 
 20: export const useLessonManagement = (courseIdStr?: string) => {
 21:   const { user } = useAuthStore();
 22:   const idCourse = Number(courseIdStr);
 23: 
 24:   const [course, setCourse] = useState<Course | null>(null);
 25:   const [modules, setModules] = useState<Module[]>([]);
 26:   const [selectedModuleId, setSelectedModuleId] = useState<number | ''>('');
 27:   const [lessons, setLessons] = useState<Lesson[]>([]);
 28:   const [isLoading, setIsLoading] = useState(true);
 29: 
 30:   // Modals/Forms State
 31:   const [showLessonModal, setShowLessonModal] = useState(false);
 32:   const [isEditingLesson, setIsEditingLesson] = useState(false);
 33:   const [editingLessonId, setEditingLessonId] = useState<number | null>(null);
 34: 
 35:   // Lesson Form Fields
 36:   const [formLessonTitle, setFormLessonTitle] = useState('');
 37:   const [formLessonContent, setFormLessonContent] = useState('');
 38:   const [formLessonVideoUrl, setFormLessonVideoUrl] = useState('');
 39:   const [formLessonDurationMinutes, setFormLessonDurationMinutes] = useState('15');
 40:   const [formLessonOrder, setFormLessonOrder] = useState('0');
 41:   const [formLessonModule, setFormLessonModule] = useState<number | ''>('');
 42: 
 43:   // Module creation & edit form (in-page)
 44:   const [showModuleForm, setShowModuleForm] = useState(false);
 45:   const [isEditingModule, setIsEditingModule] = useState(false);
 46:   const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
 47:   const [moduleTitle, setModuleTitle] = useState('');
 48:   const [moduleOrder, setModuleOrder] = useState('0');
 49: 
 50:   const [formLoading, setFormLoading] = useState(false);
 51:   const [formError, setFormError] = useState<string | null>(null);
 52:   const [successMessage, setSuccessMessage] = useState<string | null>(null);
 53: 
 54:   const isAdmin = user?.role === 'admin';
 55: 
 56:   const loadCourseDetails = useCallback(async () => {
 57:     setIsLoading(true);
 58:     try {
 59:       const courseData = await getCourseByIdUseCase.execute(idCourse);
 60:       setCourse(courseData);
 61: 
 62:       const modulesData = await getModulesUseCase.execute(idCourse);
 63:       setModules(modulesData);
 64: 
 65: 
 66:       const allLessons: Lesson[] = [];
 67:       for (const mod of modulesData) {
 68:         const moduleLessons = await getLessonsUseCase.execute(mod.id);
 69:         allLessons.push(...moduleLessons);
 70:       }
 71: 
 72:       allLessons.sort((a, b) => a.order - b.order);
 73:       setLessons(allLessons);
 74: 
 75:       if (modulesData.length > 0 && selectedModuleId === '') {
 76:         setSelectedModuleId(modulesData[0].id);
 77:       }
 78:     } catch (err) {
 79:       console.error('Failed to load course details', err);
 80:     } finally {
 81:       setIsLoading(false);
 82:     }
 83:   }, [idCourse, selectedModuleId]);
 84: 
 85:   useEffect(() => {
 86:     if (!isNaN(idCourse)) {
 87:       loadCourseDetails();
 88:     }
 89:   }, [idCourse, loadCourseDetails]);
 90: 
 91:   const handleOpenCreateModule = () => {
 92:     setIsEditingModule(false);
 93:     setEditingModuleId(null);
 94:     setModuleTitle('');
 95:     setModuleOrder(String(modules.length + 1));
 96:     setShowModuleForm(true);
 97:   };
 98: 
 99:   const handleOpenEditModule = (mod: Module) => {
100:     setIsEditingModule(true);
101:     setEditingModuleId(mod.id);
102:     setModuleTitle(mod.title);
103:     setModuleOrder(String(mod.order));
104:     setShowModuleForm(true);
105:   };
106: 
107:   const handleSaveModule = async (e: React.FormEvent) => {
108:     e.preventDefault();
109:     if (!moduleTitle.trim()) return;
110: 
111:     setFormLoading(true);
112:     try {
113:       if (isEditingModule && editingModuleId) {
114:         await updateModuleUseCase.execute(editingModuleId, {
115:           title: moduleTitle,
116:           order: Number(moduleOrder),
117:         });
118:         setSuccessMessage('Sección/Módulo actualizada correctamente');
119:       } else {
120:         await createModuleUseCase.execute({
121:           course: idCourse,
122:           title: moduleTitle,
123:           order: Number(moduleOrder),
124:         });
125:         setSuccessMessage('Sección/Módulo creada correctamente');
126:       }
127:       setModuleTitle('');
128:       setModuleOrder('0');
129:       setShowModuleForm(false);
130:       setIsEditingModule(false);
131:       setEditingModuleId(null);
132:       loadCourseDetails();
133:       setTimeout(() => setSuccessMessage(null), 4000);
134:     } catch (err: any) {
135:       alert(err.message || 'Error al guardar la sección/módulo');
136:     } finally {
137:       setFormLoading(false);
138:     }
139:   };
140: 
141:   const handleDeleteModule = async (moduleId: number) => {
142:     if (!window.confirm('¿Estás seguro de eliminar este módulo/sección? Las lecciones asociadas también se borrarán.')) {
143:       return;
144:     }
145: 
146:     setFormLoading(true);
147:     try {
148:       await deleteModuleUseCase.execute(moduleId);
149:       setSuccessMessage('Módulo eliminado correctamente');
150:       if (selectedModuleId === moduleId) {
151:         setSelectedModuleId('');
152:       }
153:       loadCourseDetails();
154:       setTimeout(() => setSuccessMessage(null), 4000);
155:     } catch (err: any) {
156:       alert(err.message || 'Error al eliminar el módulo');
157:     } finally {
158:       setFormLoading(false);
159:     }
160:   };
161: 
162:   const handleOpenCreateLesson = () => {
163:     setIsEditingLesson(false);
164:     setEditingLessonId(null);
165:     setFormLessonTitle('');
166:     setFormLessonContent('');
167:     setFormLessonVideoUrl('');
168:     setFormLessonDurationMinutes('15');
169:     setFormLessonOrder('0');
170:     setFormLessonModule(selectedModuleId || '');
171:     setFormError(null);
172:     setShowLessonModal(true);
173:   };
174: 
175:   const handleOpenEditLesson = (lesson: Lesson) => {
176:     setIsEditingLesson(true);
177:     setEditingLessonId(lesson.id);
178:     setFormLessonTitle(lesson.title);
179:     setFormLessonContent(lesson.content_text || '');
180:     setFormLessonVideoUrl(lesson.video_url || '');
181:     setFormLessonDurationMinutes(String(lesson.duration_seconds ? Math.round(lesson.duration_seconds / 60) : 15));
182:     setFormLessonOrder(String(lesson.order));
183:     setFormLessonModule(lesson.module);
184:     setFormError(null);
185:     setShowLessonModal(true);
186:   };
187: 
188:   const handleSaveLesson = async (e: React.FormEvent) => {
189:     e.preventDefault();
190:     setFormError(null);
191: 
192:     if (!formLessonTitle.trim() || !formLessonModule) {
193:       setFormError('Por favor completa todos los campos obligatorios (*)');
194:       return;
195:     }
196: 
197:     setFormLoading(true);
198:     const data = {
199:       title: formLessonTitle,
200:       content_text: formLessonContent,
201:       video_url: formLessonVideoUrl || undefined,
202:       duration_seconds: (Number(formLessonDurationMinutes) || 15) * 60,
203:       order: Number(formLessonOrder),
204:       module: Number(formLessonModule),
205:     };
206: 
207:     try {
208:       if (isEditingLesson && editingLessonId !== null) {
209:         await updateLessonUseCase.execute(editingLessonId, data);
210:         setSuccessMessage('Lección actualizada correctamente');
211:       } else {
212:         await createLessonUseCase.execute(data);
213:         setSuccessMessage('Lección creada correctamente');
214:       }
215:       setShowLessonModal(false);
216:       loadCourseDetails();
217:       setTimeout(() => setSuccessMessage(null), 4000);
218:     } catch (err: any) {
219:       setFormError(err.message || 'Error al guardar la lección');
220:     } finally {
221:       setFormLoading(false);
222:     }
223:   };
224: 
225:   const handleDeleteLesson = async (lessonId: number) => {
226:     if (!isAdmin) {
227:       alert('Solo los administradores tienen permisos para eliminar lecciones.');
228:       return;
229:     }
230: 
231:     try {
232:       await deleteLessonUseCase.execute(lessonId);
233:       setSuccessMessage('Lección eliminada correctamente');
234:       loadCourseDetails();
235:       setTimeout(() => setSuccessMessage(null), 4000);
236:     } catch (err: any) {
237:       alert(err.message || 'Error al eliminar la lección');
238:     }
239:   };
240: 
241:   return {
242:     idCourse,
243:     course,
244:     modules,
245:     selectedModuleId,
246:     setSelectedModuleId,
247:     lessons,
248:     isLoading,
249:     showLessonModal,
250:     setShowLessonModal,
251:     isEditingLesson,
252:     formLessonTitle,
253:     setFormLessonTitle,
254:     formLessonContent,
255:     setFormLessonContent,
256:     formLessonVideoUrl,
257:     setFormLessonVideoUrl,
258:     formLessonDurationMinutes,
259:     setFormLessonDurationMinutes,
260:     formLessonOrder,
261:     setFormLessonOrder,
262:     formLessonModule,
263:     setFormLessonModule,
264:     showModuleForm,
265:     setShowModuleForm,
266:     isEditingModule,
267:     moduleTitle,
268:     setModuleTitle,
269:     moduleOrder,
270:     setModuleOrder,
271:     formLoading,
272:     formError,
273:     successMessage,
274:     isAdmin,
275:     handleOpenCreateModule,
276:     handleOpenEditModule,
277:     handleSaveModule,
278:     handleDeleteModule,
279:     handleCreateModule: handleSaveModule,
280:     handleOpenCreateLesson,
281:     handleOpenEditLesson,
282:     handleSaveLesson,
283:     handleDeleteLesson,
284:   };
285: };
````

## File: src/presentation/pages/CourseManagementPage.tsx
````typescript
  1: import React, { useState, useEffect } from 'react';
  2: import { Link, useLocation } from 'react-router-dom';
  3: import { Layout } from '../components/Layout';
  4: import { Button } from '../components/Button';
  5: import { useCourseManagement } from '../hooks/useCourseManagement';
  6: import { CourseTable } from '../components/course-management/CourseTable';
  7: import { CourseFormModal } from '../components/course-management/CourseFormModal';
  8: import { ConfirmModal } from '../components/ConfirmModal';
  9: import { ArrowLeft, Search, Plus, CheckCircle } from 'lucide-react';
 10: import { Loader } from '../components/Loader';
 11: import { Pagination } from '../components/Pagination';
 12: 
 13: export const CourseManagementPage: React.FC = () => {
 14:   const [confirmOpen, setConfirmOpen] = useState(false);
 15:   const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
 16: 
 17:   const {
 18:     courses,
 19:     rawCourses,
 20:     categories,
 21:     isLoading,
 22:     search,
 23:     setSearch,
 24:     statusFilter,
 25:     setStatusFilter,
 26:     page,
 27:     setPage,
 28:     totalCourses,
 29:     showFormModal,
 30:     setShowFormModal,
 31:     isEditing,
 32:     formCategory,
 33:     setFormCategory,
 34:     formTitle,
 35:     formDescription,
 36:     setFormDescription,
 37:     formPrice,
 38:     setFormPrice,
 39:     formSlug,
 40:     setFormSlug,
 41:     formIsActive,
 42:     setFormIsActive,
 43:     setFormCoverImage,
 44:     formLoading,
 45:     formError,
 46:     successMessage,
 47:     isAdmin,
 48:     loadCourses,
 49:     handleOpenCreate,
 50:     handleOpenEdit,
 51:     handleTitleChange,
 52:     handleSubmit,
 53:     handleToggleActive,
 54:     handleDelete,
 55:   } = useCourseManagement();
 56: 
 57:   const location = useLocation();
 58: 
 59:   useEffect(() => {
 60:     const params = new URLSearchParams(location.search);
 61:     const statusParam = params.get('status');
 62:     if (statusParam === 'inactive') {
 63:       setStatusFilter('inactive');
 64:     } else if (statusParam === 'active') {
 65:       setStatusFilter('active');
 66:     }
 67:   }, [location.search, setStatusFilter]);
 68: 
 69:   const activeCount = rawCourses.filter((c) => c.is_active).length;
 70:   const inactiveCount = rawCourses.filter((c) => !c.is_active).length;
 71: 
 72:   return (
 73:     <Layout>
 74:       {}
 75:       <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 76:         <div>
 77:           <Link
 78:             to="/admin"
 79:             className="inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-extrabold text-xs uppercase tracking-wider shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2.5px_2.5px_0px_0px_#00b835] hover:bg-brand-400 hover:text-slate-950 dark:hover:bg-brand-400 dark:hover:text-slate-950 transition-all cursor-pointer mb-3"
 80:           >
 81:             <ArrowLeft className="h-4 w-4" />
 82:             <span>Volver al Panel de Control</span>
 83:           </Link>
 84:           <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
 85:             Gestión de Cursos
 86:           </h1>
 87:           <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
 88:             Administra el catálogo completo de cursos y cambia su estado de publicación con un clic.
 89:           </p>
 90:         </div>
 91: 
 92:         <Button onClick={handleOpenCreate} className="flex items-center gap-2 self-start sm:self-auto">
 93:           <Plus className="h-5 w-5" />
 94:           Crear Nuevo Curso
 95:         </Button>
 96:       </div>
 97: 
 98:       {successMessage && (
 99:         <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border-2 border-slate-950 p-4 text-xs font-black text-emerald-800 dark:text-emerald-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] mb-6">
100:           <CheckCircle className="h-5 w-5 text-[#00cc33] shrink-0" />
101:           <span>{successMessage}</span>
102:         </div>
103:       )}
104: 
105:       {}
106:       <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] overflow-hidden">
107: 
108:         {}
109:         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
110:           {}
111:           <div className="relative max-w-md w-full">
112:             <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
113:             <input
114:               type="text"
115:               placeholder="Buscar por título de curso..."
116:               value={search}
117:               onChange={(e) => setSearch(e.target.value)}
118:               className="w-full border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white pl-10 pr-4 py-2 text-xs font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none focus:border-[#00cc33]"
119:             />
120:           </div>
121: 
122:           {}
123:           <div className="flex border-2 border-slate-950 bg-slate-100 dark:bg-slate-950 p-0.5 shrink-0">
124:             <button
125:               type="button"
126:               onClick={() => setStatusFilter('all')}
127:               className={`px-3 py-1.5 text-xs font-black uppercase transition-all cursor-pointer ${
128:                 statusFilter === 'all'
129:                   ? 'bg-slate-950 text-white dark:bg-[#00cc33] dark:text-slate-950'
130:                   : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200'
131:               }`}
132:             >
133:               Todos ({rawCourses.length})
134:             </button>
135:             <button
136:               type="button"
137:               onClick={() => setStatusFilter('active')}
138:               className={`px-3 py-1.5 text-xs font-black uppercase transition-all cursor-pointer ${
139:                 statusFilter === 'active'
140:                   ? 'bg-[#00cc33] text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
141:                   : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200'
142:               }`}
143:             >
144:               🟢 Activos ({activeCount})
145:             </button>
146:             <button
147:               type="button"
148:               onClick={() => setStatusFilter('inactive')}
149:               className={`px-3 py-1.5 text-xs font-black uppercase transition-all cursor-pointer ${
150:                 statusFilter === 'inactive'
151:                   ? 'bg-amber-400 text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
152:                   : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200'
153:               }`}
154:             >
155:               🟡 Inactivos ({inactiveCount})
156:             </button>
157:           </div>
158:         </div>
159: 
160:         {isLoading ? (
161:           <Loader />
162:         ) : (
163:           <div className="overflow-x-auto">
164:             <CourseTable
165:               courses={courses}
166:               isAdmin={isAdmin}
167:               onEdit={handleOpenEdit}
168:               onToggleStatus={handleToggleActive}
169:               onDelete={(id) => {
170:                 setDeleteTargetId(id);
171:                 setConfirmOpen(true);
172:               }}
173:             />
174:             <Pagination
175:               count={totalCourses}
176:               currentPage={page}
177:               pageSize={10}
178:               onPageChange={(newPage) => {
179:                 setPage(newPage);
180:                 loadCourses(newPage);
181:               }}
182:             />
183:           </div>
184:         )}
185:       </div>
186: 
187:       {}
188:       <CourseFormModal
189:         isOpen={showFormModal}
190:         isEditing={isEditing}
191:         categories={categories}
192:         category={formCategory}
193:         title={formTitle}
194:         description={formDescription}
195:         price={formPrice}
196:         slug={formSlug}
197:         isActive={formIsActive}
198:         loading={formLoading}
199:         error={formError}
200:         onCategoryChange={setFormCategory}
201:         onTitleChange={handleTitleChange}
202:         onDescriptionChange={setFormDescription}
203:         onPriceChange={setFormPrice}
204:         onSlugChange={setFormSlug}
205:         onIsActiveChange={setFormIsActive}
206:         onCoverImageChange={setFormCoverImage}
207:         onClose={() => setShowFormModal(false)}
208:         onSubmit={handleSubmit}
209:       />
210: 
211:       <ConfirmModal
212:         isOpen={confirmOpen}
213:         title="¿Eliminar Curso?"
214:         message="¿Estás seguro de que deseas eliminar este curso de forma permanente? Esta acción borrará todas sus lecciones y módulos."
215:         confirmText="Eliminar"
216:         cancelText="Cancelar"
217:         isDanger
218:         onConfirm={() => {
219:           if (deleteTargetId !== null) {
220:             handleDelete(deleteTargetId);
221:           }
222:           setConfirmOpen(false);
223:         }}
224:         onCancel={() => setConfirmOpen(false)}
225:       />
226:     </Layout>
227:   );
228: };
````

## File: src/presentation/pages/StudentManagementPage.tsx
````typescript
  1: import React, { useEffect, useState, useMemo } from 'react';
  2: import { Link } from 'react-router-dom';
  3: import { Layout } from '../components/Layout';
  4: import { useAuthStore } from '../store/useAuthStore';
  5: import { getEnrollmentsUseCase } from '@infrastructure/factories/EnrollmentFactory';
  6: import { getCoursesUseCase } from '@infrastructure/factories/CourseFactory';
  7: import { Enrollment } from '@domain/entities/Enrollment';
  8: import { Course } from '@domain/entities/Course';
  9: import { Search, Users, Filter, BookOpen, GraduationCap, Award, ArrowLeft, RefreshCw, CheckCircle2, Clock, MapPin, Eye } from 'lucide-react';
 10: import { Loader } from '../components/Loader';
 11: import { StudentProgressDetailModal } from '../components/student-management/StudentProgressDetailModal';
 12: 
 13: 
 14: const SAMPLE_ENROLLMENTS: Enrollment[] = [
 15:   {
 16:     id: 101,
 17:     user: 1,
 18:     user_name: 'sofia.ramirez (Sofía Ramírez)',
 19:     course: 1,
 20:     course_title: 'Python para Principiantes: Desde Cero a Pro',
 21:     enrolled_at: '2026-07-15T14:30:00Z',
 22:     is_active: true,
 23:     total_progress: '100.0',
 24:     last_lesson_title: 'Lección 2.3: Certificación y Proyecto Final (Completo)',
 25:     last_module_title: 'Módulo 2: Proyecto Integrador'
 26:   },
 27:   {
 28:     id: 102,
 29:     user: 2,
 30:     user_name: 'mateo.torres (Mateo Torres)',
 31:     course: 2,
 32:     course_title: 'JavaScript Moderno (ES6+) y Desarrollo Web',
 33:     enrolled_at: '2026-07-18T09:15:00Z',
 34:     is_active: true,
 35:     total_progress: '75.0',
 36:     last_lesson_title: 'Lección 2.2: Autenticación JWT y LocalStorage',
 37:     last_module_title: 'Módulo 2: Asincronía y APIs REST'
 38:   },
 39:   {
 40:     id: 103,
 41:     user: 3,
 42:     user_name: 'valeria.cardenas (Valeria Cárdenas)',
 43:     course: 1,
 44:     course_title: 'Python para Principiantes: Desde Cero a Pro',
 45:     enrolled_at: '2026-07-20T11:45:00Z',
 46:     is_active: true,
 47:     total_progress: '40.0',
 48:     last_lesson_title: 'Lección 1.2: Paginación Global y Serialización',
 49:     last_module_title: 'Módulo 1: Fundamentos y Entorno'
 50:   },
 51:   {
 52:     id: 104,
 53:     user: 4,
 54:     user_name: 'carlos.mendoza (Carlos Mendoza)',
 55:     course: 3,
 56:     course_title: 'Terminal Bash, Linux y Línea de Comandos',
 57:     enrolled_at: '2026-07-21T16:20:00Z',
 58:     is_active: true,
 59:     total_progress: '85.0',
 60:     last_lesson_title: 'Lección 2.1: Comandos de Red, SSH y Permisos chmod',
 61:     last_module_title: 'Módulo 2: Administración de Servidores'
 62:   },
 63:   {
 64:     id: 105,
 65:     user: 5,
 66:     user_name: 'andrea.villalba (Andrea Villalba)',
 67:     course: 4,
 68:     course_title: 'Git y GitHub: Control de Versiones para Devs',
 69:     enrolled_at: '2026-07-22T10:00:00Z',
 70:     is_active: true,
 71:     total_progress: '100.0',
 72:     last_lesson_title: 'Lección 3.2: Pull Requests y Merging Estratégico',
 73:     last_module_title: 'Módulo 3: Flujos Avanzados'
 74:   },
 75:   {
 76:     id: 106,
 77:     user: 6,
 78:     user_name: 'david.paredes (David Paredes)',
 79:     course: 5,
 80:     course_title: 'Bases de Datos SQL y Modelado Relacional',
 81:     enrolled_at: '2026-07-22T15:10:00Z',
 82:     is_active: true,
 83:     total_progress: '25.0',
 84:     last_lesson_title: 'Lección 1.1: Introducción a Consultas SELECT y WHERE',
 85:     last_module_title: 'Módulo 1: Fundamentos de SQL'
 86:   }
 87: ];
 88: 
 89: export const StudentManagementPage: React.FC = () => {
 90:   const { user } = useAuthStore();
 91:   const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
 92:   const [courses, setCourses] = useState<Course[]>([]);
 93:   const [isLoading, setIsLoading] = useState(true);
 94:   const [selectedProgressEnrollment, setSelectedProgressEnrollment] = useState<Enrollment | null>(null);
 95: 
 96: 
 97:   const [searchTerm, setSearchTerm] = useState('');
 98:   const [selectedCourseId, setSelectedCourseId] = useState<number | 'all'>('all');
 99:   const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'in_progress'>('all');
100: 
101:   const fetchData = async () => {
102:     setIsLoading(true);
103:     try {
104:       const [enrollmentData, courseData] = await Promise.all([
105:         getEnrollmentsUseCase.execute({ page_size: 100 }).catch(() => ({ results: [], count: 0 })),
106:         getCoursesUseCase.execute({ page_size: 100 }).catch(() => ({ results: [], count: 0 }))
107:       ]);
108: 
109: 
110:       const apiResults = enrollmentData.results || [];
111:       const combined = apiResults.length > 0 ? apiResults : SAMPLE_ENROLLMENTS;
112:       setEnrollments(combined);
113:       setCourses(courseData.results || []);
114:     } catch (err) {
115:       console.error('Error al cargar estudiantes inscritos:', err);
116:       setEnrollments(SAMPLE_ENROLLMENTS);
117:     } finally {
118:       setIsLoading(false);
119:     }
120:   };
121: 
122:   useEffect(() => {
123:     fetchData();
124:   }, []);
125: 
126: 
127:   const filteredEnrollments = useMemo(() => {
128:     return enrollments.filter((item) => {
129: 
130:       const matchesSearch =
131:         searchTerm === '' ||
132:         item.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
133:         item.course_title.toLowerCase().includes(searchTerm.toLowerCase());
134: 
135:       // 2. Course filter
136:       const matchesCourse =
137:         selectedCourseId === 'all' || item.course === selectedCourseId;
138: 
139: 
140:       const progressNum = parseFloat(item.total_progress || '0');
141:       const matchesStatus =
142:         selectedStatus === 'all' ||
143:         (selectedStatus === 'completed' && progressNum >= 100) ||
144:         (selectedStatus === 'in_progress' && progressNum < 100);
145: 
146:       return matchesSearch && matchesCourse && matchesStatus;
147:     });
148:   }, [enrollments, searchTerm, selectedCourseId, selectedStatus]);
149: 
150: 
151:   const totalStudents = enrollments.length;
152:   const completedCount = enrollments.filter((e) => parseFloat(e.total_progress || '0') >= 100).length;
153:   const avgProgress = useMemo(() => {
154:     if (enrollments.length === 0) return 0;
155:     const sum = enrollments.reduce((acc, curr) => acc + parseFloat(curr.total_progress || '0'), 0);
156:     return Math.round(sum / enrollments.length);
157:   }, [enrollments]);
158: 
159:   if (isLoading) return <Loader fullScreen />;
160: 
161:   return (
162:     <Layout>
163:       <div className="mb-6">
164:         <Link
165:           to="/admin"
166:           className="inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-extrabold text-xs uppercase tracking-wider shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2.5px_2.5px_0px_0px_#00b835] hover:bg-brand-400 hover:text-slate-950 dark:hover:bg-brand-400 dark:hover:text-slate-950 transition-all cursor-pointer mb-4"
167:         >
168:           <ArrowLeft className="h-4 w-4" />
169:           <span>Volver al Panel de Control</span>
170:         </Link>
171:         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
172:           <div>
173:             <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
174:               <Users className="h-8 w-8 text-brand-500" />
175:               Gestión de Estudiantes Inscritos
176:             </h1>
177:             <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
178:               Portal exclusivo para <span className="font-bold text-brand-500 uppercase">{user?.role}</span>: Supervisa el progreso académico y la nómina de estudiantes.
179:             </p>
180:           </div>
181:           <button
182:             onClick={fetchData}
183:             className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] hover:bg-slate-50 transition-all cursor-pointer w-fit"
184:           >
185:             <RefreshCw className="h-4 w-4 text-brand-500" />
186:             <span>Actualizar Datos</span>
187:           </button>
188:         </div>
189:       </div>
190: 
191:       {}
192:       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
193:         <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] flex items-center gap-4">
194:           <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 border-2 border-slate-950 flex items-center justify-center shrink-0">
195:             <Users className="h-6 w-6" />
196:           </div>
197:           <div>
198:             <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Inscripciones</span>
199:             <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-display">{totalStudents} Alumnos</div>
200:           </div>
201:         </div>
202: 
203:         <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] flex items-center gap-4">
204:           <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-2 border-slate-950 flex items-center justify-center shrink-0">
205:             <GraduationCap className="h-6 w-6" />
206:           </div>
207:           <div>
208:             <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Cursos Graduados</span>
209:             <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-display">{completedCount} Certificados</div>
210:           </div>
211:         </div>
212: 
213:         <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] flex items-center gap-4">
214:           <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-2 border-slate-950 flex items-center justify-center shrink-0">
215:             <Award className="h-6 w-6" />
216:           </div>
217:           <div>
218:             <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Avance Promedio</span>
219:             <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-display">{avgProgress}% Global</div>
220:           </div>
221:         </div>
222:       </div>
223: 
224:       {}
225:       <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
226:         <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
227:           <Filter className="h-4 w-4 text-brand-500" />
228:           <span>Filtros Avanzados de Búsqueda</span>
229:         </div>
230: 
231:         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
232:           {}
233:           <div className="relative">
234:             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
235:             <input
236:               type="text"
237:               placeholder="Buscar por estudiante o curso..."
238:               value={searchTerm}
239:               onChange={(e) => setSearchTerm(e.target.value)}
240:               className="w-full pl-9 pr-4 py-2.5 border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white text-xs font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none focus:border-brand-500"
241:             />
242:           </div>
243: 
244:           {}
245:           <div>
246:             <select
247:               value={selectedCourseId}
248:               onChange={(e) => setSelectedCourseId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
249:               className="w-full px-3 py-2.5 border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none cursor-pointer"
250:             >
251:               <option value="all">Todos los Cursos</option>
252:               {courses.map((c) => (
253:                 <option key={c.id} value={c.id}>
254:                   {c.title}
255:                 </option>
256:               ))}
257:             </select>
258:           </div>
259: 
260:           {}
261:           <div>
262:             <select
263:               value={selectedStatus}
264:               onChange={(e) => setSelectedStatus(e.target.value as any)}
265:               className="w-full px-3 py-2.5 border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline-none cursor-pointer"
266:             >
267:               <option value="all">Todos los Estados</option>
268:               <option value="in_progress">En Progreso (&lt; 100%)</option>
269:               <option value="completed">Completados (100%)</option>
270:             </select>
271:           </div>
272:         </div>
273:       </div>
274: 
275:       {}
276:       <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] overflow-hidden">
277:         <div className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-950">
278:           <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
279:             Nómina de Estudiantes Matricularos ({filteredEnrollments.length})
280:           </span>
281:           <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-brand-400 text-slate-950 border border-slate-950">
282:             ACCESO RESTRINGIDO
283:           </span>
284:         </div>
285: 
286:         {filteredEnrollments.length > 0 ? (
287:           <div className="overflow-x-auto">
288:             <table className="w-full text-left border-collapse">
289:               <thead>
290:                 <tr className="bg-slate-50 dark:bg-slate-950 border-b-2 border-slate-950 text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
291:                   <th className="py-3.5 px-6">Estudiante</th>
292:                   <th className="py-3.5 px-6">Curso Matriculado</th>
293:                   <th className="py-3.5 px-6">Progreso Académico</th>
294:                   <th className="py-3.5 px-6">📍 Dónde Se Quedó (Última Lección)</th>
295:                   <th className="py-3.5 px-6">Estado</th>
296:                   <th className="py-3.5 px-6 text-right">Acción</th>
297:                 </tr>
298:               </thead>
299:               <tbody className="divide-y-2 divide-slate-100 dark:divide-slate-850 text-xs font-medium text-slate-800 dark:text-slate-200">
300:                 {filteredEnrollments.map((item) => {
301:                   const progressNum = Math.min(100, Math.max(0, parseFloat(item.total_progress || '0')));
302:                   const isCompleted = progressNum >= 100;
303:                   const formattedDate = new Date(item.enrolled_at).toLocaleDateString('es-ES', {
304:                     day: '2-digit',
305:                     month: 'short',
306:                     year: 'numeric'
307:                   });
308: 
309:                   const currentLesson = item.last_lesson_title ||
310:                     (isCompleted ? 'Certificación Emitida' : 'Lección 1.2: Paginación y Serialización');
311: 
312:                   return (
313:                     <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
314:                       <td className="py-4 px-6">
315:                         <div className="flex items-center gap-3">
316:                           <div className="w-8 h-8 rounded-full bg-[#00cc33] border border-slate-950 font-black text-slate-950 flex items-center justify-center text-xs shrink-0">
317:                             {item.user_name.charAt(0).toUpperCase()}
318:                           </div>
319:                           <div>
320:                             <span className="font-bold block text-slate-950 dark:text-white">
321:                               {item.user_name}
322:                             </span>
323:                             <span className="text-[10px] text-slate-400 font-mono">Reg: {formattedDate}</span>
324:                           </div>
325:                         </div>
326:                       </td>
327: 
328:                       <td className="py-4 px-6">
329:                         <div className="flex items-center gap-2">
330:                           <BookOpen className="h-4 w-4 text-[#00cc33] shrink-0" />
331:                           <span className="font-bold text-slate-900 dark:text-slate-100">
332:                             {item.course_title}
333:                           </span>
334:                         </div>
335:                       </td>
336: 
337:                       <td className="py-4 px-6 min-w-[150px]">
338:                         <div className="flex items-center gap-3">
339:                           <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-800 border border-slate-950 rounded-none overflow-hidden">
340:                             <div
341:                               className={`h-full transition-all duration-500 ${
342:                                 isCompleted ? 'bg-emerald-500' : 'bg-[#00cc33]'
343:                               }`}
344:                               style={{ width: `${progressNum}%` }}
345:                             />
346:                           </div>
347:                           <span className="font-bold text-xs font-mono">{progressNum}%</span>
348:                         </div>
349:                       </td>
350: 
351:                       {}
352:                       <td className="py-4 px-6 min-w-[220px]">
353:                         <div className="flex flex-col gap-1 p-2 bg-amber-50 dark:bg-slate-950 border border-slate-950">
354:                           <div className="flex items-center gap-1.5 text-xs font-bold text-slate-950 dark:text-amber-300">
355:                             <MapPin className="h-3.5 w-3.5 text-amber-600 dark:text-[#00cc33] shrink-0 animate-pulse" />
356:                             <span className="truncate max-w-[200px]" title={currentLesson}>
357:                               {currentLesson}
358:                             </span>
359:                           </div>
360:                           {item.last_module_title && (
361:                             <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
362:                               {item.last_module_title}
363:                             </span>
364:                           )}
365:                         </div>
366:                       </td>
367: 
368:                       <td className="py-4 px-6">
369:                         {isCompleted ? (
370:                           <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] uppercase tracking-wider">
371:                             <CheckCircle2 className="h-3 w-3" />
372:                             Completado
373:                           </span>
374:                         ) : (
375:                           <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 dark:bg-amber-950/40 border border-amber-500 text-amber-800 dark:text-amber-300 font-bold text-[10px] uppercase tracking-wider">
376:                             <Clock className="h-3 w-3" />
377:                             En Curso
378:                           </span>
379:                         )}
380:                       </td>
381: 
382:                       <td className="py-4 px-6 text-right space-x-2">
383:                         <button
384:                           type="button"
385:                           onClick={() => setSelectedProgressEnrollment(item)}
386:                           className="px-2.5 py-1.5 bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 font-mono font-extrabold text-[10px] uppercase tracking-wider border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer inline-flex items-center gap-1"
387:                         >
388:                           <Eye className="h-3 w-3" />
389:                           <span>Ver Avance</span>
390:                         </button>
391: 
392:                         <Link
393:                           to={`/courses/${item.course}`}
394:                           className="px-2.5 py-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-[10px] uppercase tracking-wider border border-slate-950 hover:bg-[#00cc33] dark:hover:bg-[#00ff41] dark:hover:text-slate-950 transition-colors inline-block"
395:                         >
396:                           Ir al Curso ↗
397:                         </Link>
398:                       </td>
399:                     </tr>
400:                   );
401:                 })}
402:               </tbody>
403:             </table>
404:           </div>
405:         ) : (
406:           <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
407:             No se encontraron estudiantes matriculados que coincidan con la búsqueda.
408:           </div>
409:         )}
410:       </div>
411: 
412:       {}
413:       <StudentProgressDetailModal
414:         isOpen={Boolean(selectedProgressEnrollment)}
415:         onClose={() => setSelectedProgressEnrollment(null)}
416:         enrollment={selectedProgressEnrollment}
417:       />
418:     </Layout>
419:   );
420: };
````

## File: src/presentation/utils/sanitize-url.ts
````typescript
 1: export function sanitizeUrl(url?: string): string {
 2:   if (!url) return '';
 3:   const trimmed = url.trim();
 4: 
 5:   if (trimmed.toLowerCase().startsWith('javascript:')) {
 6:     return 'about:blank';
 7:   }
 8: 
 9:   if (trimmed.toLowerCase().startsWith('data:')) {
10:     return 'about:blank';
11:   }
12: 
13:   return trimmed;
14: }
15: 
16: 
17: 
18: 
19: 
20: export function getEmbedVideoUrl(url?: string): { isEmbed: boolean; isDirectVideo: boolean; embedUrl: string } {
21: 
22:   const LOCAL_MP4_VIDEO = '/videos/sql_lesson_1.mp4';
23: 
24:   if (!url || !url.trim()) {
25:     return { isEmbed: false, isDirectVideo: true, embedUrl: LOCAL_MP4_VIDEO };
26:   }
27: 
28:   const trimmed = url.trim();
29: 
30: 
31:   if (/\.(mp4|webm|ogg)$/i.test(trimmed) || trimmed.startsWith('/videos/')) {
32:     return {
33:       isEmbed: false,
34:       isDirectVideo: true,
35:       embedUrl: sanitizeUrl(trimmed),
36:     };
37:   }
38: 
39: 
40:   const ytWatchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/i);
41:   if (ytWatchMatch && ytWatchMatch[1]) {
42:     return {
43:       isEmbed: true,
44:       isDirectVideo: false,
45:       embedUrl: `https://www.youtube.com/embed/${ytWatchMatch[1]}?autoplay=0&rel=0`,
46:     };
47:   }
48: 
49: 
50:   const ytShortMatch = trimmed.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
51:   if (ytShortMatch && ytShortMatch[1]) {
52:     return {
53:       isEmbed: true,
54:       isDirectVideo: false,
55:       embedUrl: `https://www.youtube.com/embed/${ytShortMatch[1]}?autoplay=0&rel=0`,
56:     };
57:   }
58: 
59: 
60:   const ytEmbedMatch = trimmed.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/i);
61:   if (ytEmbedMatch && ytEmbedMatch[1]) {
62:     return {
63:       isEmbed: true,
64:       isDirectVideo: false,
65:       embedUrl: `https://www.youtube.com/embed/${ytEmbedMatch[1]}?autoplay=0&rel=0`,
66:     };
67:   }
68: 
69: 
70:   const vimeoMatch = trimmed.match(/(?:vimeo\.com\/)([0-9]+)/i);
71:   if (vimeoMatch && vimeoMatch[1]) {
72:     return {
73:       isEmbed: true,
74:       isDirectVideo: false,
75:       embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
76:     };
77:   }
78: 
79: 
80:   return { isEmbed: false, isDirectVideo: true, embedUrl: LOCAL_MP4_VIDEO };
81: }
````

## File: src/presentation/components/lesson-management/LessonsList.tsx
````typescript
  1: import React from 'react';
  2: import { Lesson } from '@domain/entities/Lesson';
  3: import { FileText, Pencil, Trash2, Eye, Plus } from 'lucide-react';
  4: 
  5: interface LessonsListProps {
  6:   lessons: Lesson[];
  7:   selectedModuleId: number | '';
  8:   isAdmin: boolean;
  9:   onEdit: (lesson: Lesson) => void;
 10:   onPreview?: (lessonId: number) => void;
 11:   onDelete: (id: number) => void;
 12:   onCreateLesson?: () => void;
 13: }
 14: 
 15: export const LessonsList: React.FC<LessonsListProps> = ({
 16:   lessons,
 17:   selectedModuleId,
 18:   isAdmin,
 19:   onEdit,
 20:   onPreview,
 21:   onDelete,
 22:   onCreateLesson,
 23: }) => {
 24:   const filtered = lessons.filter((les) => les.module === selectedModuleId);
 25: 
 26:   return (
 27:     <div className="lg:col-span-3 flex flex-col gap-4">
 28:       <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835]">
 29:         <h3 className="font-display font-black text-lg text-slate-950 dark:text-white mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-950 pb-3">
 30:           <span>Temas del Módulo Seleccionado</span>
 31:           <div className="flex items-center gap-2 shrink-0">
 32:             <span className="text-xs font-mono bg-[#00cc33] text-slate-950 font-extrabold px-2.5 py-1 border border-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
 33:               {filtered.length} {filtered.length === 1 ? 'Lección' : 'Lecciones'}
 34:             </span>
 35:             {onCreateLesson && (
 36:               <button
 37:                 type="button"
 38:                 onClick={onCreateLesson}
 39:                 disabled={selectedModuleId === ''}
 40:                 className={`px-3 py-1 bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 font-mono font-black text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-1.5 cursor-pointer ${
 41:                   selectedModuleId === '' ? 'opacity-50 cursor-not-allowed bg-slate-200' : ''
 42:                 }`}
 43:                 title="Crear una nueva lección/tema para este módulo"
 44:               >
 45:                 <Plus className="h-4 w-4" />
 46:                 <span>Nueva Lección</span>
 47:               </button>
 48:             )}
 49:           </div>
 50:         </h3>
 51: 
 52:         <div className="divide-y-2 divide-slate-100 dark:divide-slate-850">
 53:           {filtered.length > 0 ? (
 54:             filtered.map((les) => (
 55:               <div
 56:                 key={les.id}
 57:                 className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 px-3 transition-all"
 58:               >
 59:                 <div className="flex items-start gap-3">
 60:                   <div className="flex h-8 w-8 items-center justify-center border border-slate-950 bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white mt-0.5 shrink-0 font-bold">
 61:                     <FileText className="h-4 w-4" />
 62:                   </div>
 63:                   <div>
 64:                     <h4 className="font-extrabold text-slate-950 dark:text-white text-sm">{les.title}</h4>
 65:                     <p className="text-xs text-slate-500 line-clamp-1 mt-0.5 max-w-lg font-medium">
 66:                       {les.content_text || 'Sin contenido de texto todavía.'}
 67:                     </p>
 68:                   </div>
 69:                 </div>
 70: 
 71:                 <div className="flex items-center gap-2 justify-end sm:justify-start shrink-0">
 72:                   <span className="text-[10px] font-mono font-extrabold text-slate-950 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 border border-slate-950 px-2 py-0.5">
 73:                     Orden: {les.order}
 74:                   </span>
 75:                   {onPreview && (
 76:                     <button
 77:                       onClick={() => onPreview(les.id)}
 78:                       className="px-2.5 py-1 bg-[#00cc33] text-slate-950 font-extrabold text-[10px] uppercase border border-slate-950 hover:bg-[#00ff41] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer flex items-center gap-1"
 79:                       title="Vista Previa de la Lección"
 80:                     >
 81:                       <Eye className="h-3.5 w-3.5" />
 82:                       <span className="hidden md:inline">Ver</span>
 83:                     </button>
 84:                   )}
 85:                   <button
 86:                     onClick={() => onEdit(les)}
 87:                     className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-[10px] uppercase border border-slate-950 hover:bg-slate-200 cursor-pointer"
 88:                     title="Editar Tema"
 89:                   >
 90:                     <Pencil className="h-3.5 w-3.5" />
 91:                   </button>
 92:                   <button
 93:                     onClick={() => onDelete(les.id)}
 94:                     disabled={!isAdmin}
 95:                     className={`px-2.5 py-1 text-[10px] font-bold uppercase border border-slate-950 cursor-pointer ${
 96:                       isAdmin ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-slate-200 text-slate-400 opacity-40 cursor-not-allowed'
 97:                     }`}
 98:                     title={isAdmin ? "Eliminar Tema" : "Eliminar (Solo Administradores)"}
 99:                   >
100:                     <Trash2 className="h-3.5 w-3.5" />
101:                   </button>
102:                 </div>
103:               </div>
104:             ))
105:           ) : (
106:             <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
107:               <p className="text-slate-400 italic text-xs font-medium">
108:                 No hay lecciones en este módulo todavía.
109:               </p>
110:               {onCreateLesson && selectedModuleId !== '' && (
111:                 <button
112:                   type="button"
113:                   onClick={onCreateLesson}
114:                   className="px-4 py-2 bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 font-mono font-black text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-2 cursor-pointer"
115:                 >
116:                   <Plus className="h-4 w-4" />
117:                   <span>Crear la Primera Lección de este Módulo</span>
118:                 </button>
119:               )}
120:             </div>
121:           )}
122:         </div>
123:       </div>
124:     </div>
125:   );
126: };
````

## File: src/presentation/components/Input.tsx
````typescript
 1: import React from 'react';
 2: import { cn } from '../utils/cn';
 3: 
 4: interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
 5:   label?: string;
 6:   error?: string;
 7:   helperText?: string;
 8: }
 9: 
10: export const Input = React.forwardRef<HTMLInputElement, InputProps>(
11:   ({ className, type = 'text', label, error, helperText, ...props }, ref) => {
12:     return (
13:       <div className="w-full flex flex-col gap-1.5">
14:         {label && (
15:           <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
16:             {label}
17:           </label>
18:         )}
19:         <input
20:           ref={ref}
21:           type={type}
22:           className={cn(
23:             'w-full px-4 py-2.5 rounded-none border-2 border-slate-950 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] transition-all duration-200 outline-none focus:border-[#00cc33] focus:shadow-[0_0_12px_rgba(0,255,65,0.65),2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[0_0_16px_rgba(0,255,65,0.85),2px_2px_0px_0px_#00b835] disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-900 text-sm font-medium',
24:             {
25:               'border-rose-500 focus:border-rose-500 focus:shadow-[0_0_12px_rgba(244,63,94,0.7)]': !!error,
26:             },
27:             className
28:           )}
29:           {...props}
30:         />
31:         {error && (
32:           <span className="text-xs text-rose-500 font-bold">{error}</span>
33:         )}
34:         {!error && helperText && (
35:           <span className="text-xs text-slate-500 dark:text-slate-500 font-medium">{helperText}</span>
36:         )}
37:       </div>
38:     );
39:   }
40: );
41: 
42: Input.displayName = 'Input';
````

## File: src/presentation/pages/StudentDashboard.tsx
````typescript
  1: import React, { useEffect, useState } from 'react';
  2: import { useNavigate, Link } from 'react-router-dom';
  3: import { Layout } from '../components/Layout';
  4: import { useAuthStore } from '../store/useAuthStore';
  5: import { getEnrollmentsUseCase } from '@infrastructure/factories/EnrollmentFactory';
  6: import { getCourseByIdUseCase } from '@infrastructure/factories/CourseFactory';
  7: import { getModulesUseCase } from '@infrastructure/factories/ModuleFactory';
  8: import { getLessonsUseCase } from '@infrastructure/factories/LessonFactory';
  9: import { Enrollment } from '@domain/entities/Enrollment';
 10: import { BookOpen, LayoutDashboard, PlayCircle, Trophy, Calendar } from 'lucide-react';
 11: import { Button } from '../components/Button';
 12: import { DashboardSkeleton } from '../components/Skeletons';
 13: 
 14: export const StudentDashboard: React.FC = () => {
 15:   const { user } = useAuthStore();
 16:   const navigate = useNavigate();
 17:   const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
 18:   const [isLoading, setIsLoading] = useState(true);
 19: 
 20:   useEffect(() => {
 21:     const fetchAllEnrollments = async () => {
 22:       setIsLoading(true);
 23:       let apiEnrollments: Enrollment[] = [];
 24: 
 25:       try {
 26:         const data = await getEnrollmentsUseCase.execute();
 27:         apiEnrollments = data.results || [];
 28:       } catch (err) {
 29:         console.warn('API enrollments fetch error, loading from local cache', err);
 30:       }
 31: 
 32: 
 33:       let cachedEnrollments: any[] = [];
 34:       try {
 35:         if (user) {
 36:           const userKey = user.username?.toLowerCase() || String(user.id);
 37:           const storedCache = JSON.parse(localStorage.getItem('oncourses_user_enrollments') || '{}');
 38:           const userStored = storedCache[userKey] || [];
 39:           cachedEnrollments = userStored;
 40:         }
 41:       } catch (cacheErr) {
 42:         console.warn('Failed to parse local enrollment cache', cacheErr);
 43:       }
 44: 
 45: 
 46:       const mergedMap = new Map<number, any>();
 47:       apiEnrollments.forEach((e) => mergedMap.set(e.course, e));
 48:       cachedEnrollments.forEach((e) => {
 49:         if (!mergedMap.has(e.course)) {
 50:           mergedMap.set(e.course, e);
 51:         }
 52:       });
 53: 
 54:       setEnrollments(Array.from(mergedMap.values()));
 55:       setIsLoading(false);
 56:     };
 57: 
 58:     fetchAllEnrollments();
 59:   }, [user]);
 60: 
 61:   const handleResumeCourse = async (courseId: number) => {
 62:     try {
 63:       let firstLessonId: number | null = null;
 64: 
 65:       try {
 66:         const modulesData = await getModulesUseCase.execute(courseId);
 67:         if (modulesData && modulesData.length > 0) {
 68:           const lessonsData = await getLessonsUseCase.execute(modulesData[0].id);
 69:           if (lessonsData && lessonsData.length > 0) {
 70:             lessonsData.sort((a, b) => a.order - b.order);
 71:             firstLessonId = lessonsData[0].id;
 72:           }
 73:         }
 74:       } catch (modErr) {
 75:         console.warn('Could not fetch modules for student dashboard redirect', modErr);
 76:       }
 77: 
 78:       if (!firstLessonId) {
 79:         const courseDetails = await getCourseByIdUseCase.execute(courseId);
 80:         firstLessonId = courseDetails.modules?.[0]?.lessons?.[0]?.id || null;
 81:       }
 82: 
 83:       if (firstLessonId) {
 84:         navigate(`/learn/${courseId}/lesson/${firstLessonId}`);
 85:       } else {
 86:         navigate(`/courses/${courseId}`);
 87:       }
 88:     } catch {
 89:       navigate(`/courses/${courseId}`);
 90:     }
 91:   };
 92: 
 93:   return (
 94:     <Layout>
 95:       <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
 96:         <div>
 97:           <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
 98:             <LayoutDashboard className="h-8 w-8 text-brand-500" />
 99:             Mi Panel de Estudiante
100:           </h1>
101:           <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm font-medium">
102:             <span className="text-slate-600 dark:text-slate-400">
103:               Bienvenido de vuelta, <span className="font-extrabold text-slate-950 dark:text-white">{user?.first_name ? `${user.first_name} ${user.last_name}` : user?.username}</span>
104:             </span>
105:             <span className="text-slate-400">•</span>
106:             {user?.role === 'admin' && (
107:               <span className="inline-flex items-center gap-1 bg-rose-500 text-white font-black text-xs uppercase tracking-wider px-2.5 py-0.5 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835]">
108:                 👑 ROL: ADMINISTRADOR
109:               </span>
110:             )}
111:             {user?.role === 'professor' && (
112:               <span className="inline-flex items-center gap-1 bg-purple-500 text-white font-black text-xs uppercase tracking-wider px-2.5 py-0.5 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835]">
113:                 🎓 ROL: DOCENTE
114:               </span>
115:             )}
116:             {user?.role === 'student' && (
117:               <span className="inline-flex items-center gap-1 bg-[#00cc33] text-slate-950 font-black text-xs uppercase tracking-wider px-2.5 py-0.5 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835]">
118:                 ⚡ ESTUDIANTE
119:               </span>
120:             )}
121:           </div>
122:         </div>
123: 
124:         <div className="flex gap-4">
125:           <div className="border-2 border-slate-950 bg-white p-4 text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] flex items-center gap-3">
126:             <div className="border border-slate-950 bg-brand-400 p-2 text-slate-950">
127:               <BookOpen className="h-5 w-5" />
128:             </div>
129:             <div>
130:               <span className="text-xs text-slate-600 block font-bold uppercase tracking-wider">Inscrito en</span>
131:               <span className="text-base font-black text-slate-950">{enrollments.length} cursos</span>
132:             </div>
133:           </div>
134:         </div>
135:       </div>
136: 
137:       <div className="flex flex-col gap-6">
138:         <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
139:           <Trophy className="h-5 w-5 text-brand-500" />
140:           Mis Cursos Matriculados
141:         </h2>
142: 
143:         {isLoading ? (
144:           <DashboardSkeleton />
145:         ) : enrollments.length > 0 ? (
146:           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
147:             {enrollments.map((enrollment) => {
148:               const progressNum = Math.round(parseFloat(enrollment.total_progress || '0'));
149:               return (
150:                 <div
151:                   key={enrollment.id}
152:                   className="border-2 border-slate-950 bg-white p-6 text-slate-950 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00b835] flex flex-col justify-between transition-all"
153:                 >
154:                   <div>
155:                     <div className="flex justify-between items-start gap-4 mb-4">
156:                       <h3 className="font-display text-lg font-black text-slate-950 leading-snug line-clamp-2">
157:                         {enrollment.course_title}
158:                       </h3>
159:                       <span className="shrink-0 text-xs font-black px-2.5 py-1 border border-slate-950 bg-brand-400 text-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
160:                         Progreso: {progressNum}%
161:                       </span>
162:                     </div>
163: 
164:                     <div className="w-full bg-slate-100 border-2 border-slate-950 h-4 overflow-hidden mb-6">
165:                       <div
166:                         className="bg-brand-500 h-full transition-all duration-500"
167:                         style={{ width: `${progressNum}%` }}
168:                       />
169:                     </div>
170: 
171:                     <div className="flex items-center gap-2 text-xs font-bold text-slate-600 mb-6">
172:                       <Calendar className="h-4 w-4 text-slate-400" />
173:                       <span>Matriculado: {new Date(enrollment.enrolled_at).toLocaleDateString('es-ES')}</span>
174:                     </div>
175:                   </div>
176: 
177:                   <button
178:                     onClick={() => handleResumeCourse(enrollment.course)}
179:                     className="w-full py-2.5 px-4 border-2 border-slate-950 bg-slate-950 text-white font-extrabold text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] hover:bg-brand-500 hover:text-slate-950 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
180:                   >
181:                     <PlayCircle className="h-4 w-4" />
182:                     Continuar Aprendizaje
183:                   </button>
184:                 </div>
185:               );
186:             })}
187:           </div>
188:         ) : (
189:           <div className="text-center py-16 border-2 border-slate-950 bg-white p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
190:             <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
191:             <h3 className="text-lg font-bold text-slate-950">Aún no estás matriculado en ningún curso</h3>
192:             <p className="text-xs text-slate-600 mt-1 mb-6">Explora nuestro catálogo y empieza tu ruta de aprendizaje hoy mismo.</p>
193:             <Link to="/courses">
194:               <Button className="font-extrabold text-xs uppercase tracking-wider">Explorar Catálogo</Button>
195:             </Link>
196:           </div>
197:         )}
198:       </div>
199:     </Layout>
200:   );
201: };
````

## File: src/presentation/components/lesson-management/LessonModal.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { Module } from '@domain/entities/Module';
  3: import { Input } from '../Input';
  4: import { Button } from '../Button';
  5: import { ShieldAlert, FileCode2, Terminal, BookOpen, Code2 } from 'lucide-react';
  6: import { MarkdownRenderer } from '../MarkdownRenderer';
  7: 
  8: interface LessonModalProps {
  9:   isOpen: boolean;
 10:   isEditing: boolean;
 11:   modules: Module[];
 12:   title: string;
 13:   content: string;
 14:   videoUrl: string;
 15:   durationMinutes?: string;
 16:   order: string;
 17:   moduleId: number | '';
 18:   loading: boolean;
 19:   error: string | null;
 20:   onTitleChange: (val: string) => void;
 21:   onContentChange: (val: string) => void;
 22:   onVideoUrlChange: (val: string) => void;
 23:   onDurationMinutesChange?: (val: string) => void;
 24:   onOrderChange: (val: string) => void;
 25:   onModuleChange: (val: number | '') => void;
 26:   onClose: () => void;
 27:   onSubmit: (e: React.FormEvent) => void;
 28: }
 29: 
 30: export const LessonModal: React.FC<LessonModalProps> = ({
 31:   isOpen,
 32:   isEditing,
 33:   modules,
 34:   title,
 35:   content,
 36:   videoUrl,
 37:   durationMinutes = '15',
 38:   order,
 39:   moduleId,
 40:   loading,
 41:   error,
 42:   onTitleChange,
 43:   onContentChange,
 44:   onVideoUrlChange,
 45:   onDurationMinutesChange,
 46:   onOrderChange,
 47:   onModuleChange,
 48:   onClose,
 49:   onSubmit,
 50: }) => {
 51:   const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');
 52: 
 53:   if (!isOpen) return null;
 54: 
 55:   const insertTemplate = (type: 'manual' | 'code' | 'theory' | 'sublesson' | 'table') => {
 56:     let templateText = '';
 57:     if (type === 'table') {
 58:       templateText = `### 📊 Tabla Comparativa de Conceptos
 59: 
 60: | Comando / Palabra Clave | Descripción del Funcionamiento | Ejemplo de Uso |
 61: | --- | --- | --- |
 62: | \`SELECT\` | Recupera columnas específicas de una o más tablas | \`SELECT * FROM usuarios;\` |
 63: | \`WHERE\` | Filtra registros que cumplen una condición lógica | \`WHERE edad >= 18\` |
 64: | \`JOIN\` | Combina filas de dos o más tablas basándose en una clave | \`INNER JOIN pedidos ON ...\` |
 65: | \`GROUP BY\` | Agrupa filas con los mismos valores para agregación | \`GROUP BY categoria_id\` |`;
 66:     } else if (type === 'sublesson') {
 67:       templateText = `#### 📌 Sub-lección 1.1: Titulo del Sub-paso Específico
 68: Explicación detallada de esta sub-lección secundaria dentro del tema.
 69: 
 70: \`\`\`bash
 71: # Comandos específicos para este sub-paso
 72: npm run test
 73: \`\`\``;
 74:     } else if (type === 'manual') {
 75:       templateText = `### 🛠️ Guía Paso a Paso: Manual de Instalación
 76: 
 77: #### 1. Requisitos Previos:
 78: - Sistema Operativo: Windows / Linux / macOS.
 79: - Tener instalado Node.js (v18+) o Python (3.10+).
 80: 
 81: #### 2. Comandos de Instalación:
 82: \`\`\`bash
 83: # Clonar el repositorio
 84: git clone https://github.com/ejemplo/repositorio.git
 85: cd repositorio
 86: 
 87: # Instalar dependencias del proyecto
 88: npm install
 89: \`\`\`
 90: 
 91: #### 3. Configuración del Entorno:
 92: Crea un archivo \`.env\` en la raíz del proyecto con la siguiente variable:
 93: \`\`\`bash
 94: PORT=3000
 95: DATABASE_URL=postgres://localhost:5432/mydb
 96: \`\`\`
 97: 
 98: #### 4. Ejecución del Servidor:
 99: \`\`\`bash
100: # Iniciar en modo desarrollo
101: npm run dev
102: \`\`\`
103: 
104: #### 5. Verificación Final:
105: Ingresa en tu navegador a \`http://localhost:3000\` para comprobar el correcto despliegue.`;
106:     } else if (type === 'code') {
107:       templateText = `### 💻 Tutorial Práctico: Implementación de Código
108: 
109: #### Explicación del Algoritmo:
110: En este tutorial aprenderás la lógica fundamental para procesar la información de forma eficiente.
111: 
112: #### Código Fuente:
113: \`\`\`python
114: # Ejemplo de función principal en Python
115: def procesar_datos(lista_elementos):
116:     """
117:     Función para iterar y filtrar registros válidos
118:     """
119:     resultados = [item for item in lista_elementos if item > 0]
120:     print(f"Total procesados correctamente: {len(resultados)}")
121:     return resultados
122: 
123: if __name__ == "__main__":
124:     datos = [10, -5, 20, 0, 30]
125:     procesar_datos(datos)
126: \`\`\`
127: 
128: #### Reto / Ejercicio:
129: Modifica la condición dentro de la lista para filtrar únicamente números pares.`;
130:     } else if (type === 'theory') {
131:       templateText = `### 📖 Guía Teórica y Conceptos Clave
132: 
133: #### 1. Concepto Fundamental:
134: Descripción clara y estructurada sobre los principios del tema.
135: 
136: #### 2. Ventajas Principales:
137: - **Rendimiento:** Optimización en tiempo de ejecución.
138: - **Escalabilidad:** Estructura modular y limpia.
139: - **Mantenibilidad:** Fácil refactorización para equipos DEV.
140: 
141: #### 3. Referencias y Documentación Oficial:
142: Consulta los enlaces oficiales para profundizar en los conceptos avanzados.`;
143:     }
144: 
145:     onContentChange(content ? `${content}\n\n${templateText}` : templateText);
146:   };
147: 
148:   const insertSnippet = (snippet: string) => {
149:     onContentChange(content ? `${content}\n\n${snippet}` : snippet);
150:   };
151: 
152:   return (
153:     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
154:       <div className="w-full max-w-3xl border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 text-slate-950 dark:text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00b835] my-8 animate-in zoom-in-95 duration-200">
155: 
156:         {}
157:         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-slate-950 dark:border-slate-800">
158:           <div className="flex items-center gap-2">
159:             <h2 className="font-display text-xl font-black text-slate-950 dark:text-white">
160:               {isEditing ? '✏️ Editar Tema / Lección' : '➕ Crear Nuevo Tema / Manual'}
161:             </h2>
162:             <span className="text-xs font-mono bg-[#00cc33] text-slate-950 px-2 py-0.5 border border-slate-950 font-extrabold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">TEMA</span>
163:           </div>
164: 
165:           <div className="flex border-2 border-slate-950 bg-slate-100 dark:bg-slate-950 p-0.5 shrink-0">
166:             <button
167:               type="button"
168:               onClick={() => setViewMode('editor')}
169:               className={`px-3 py-1 text-xs font-bold uppercase transition-all cursor-pointer ${
170:                 viewMode === 'editor'
171:                   ? 'bg-slate-950 text-white dark:bg-[#00cc33] dark:text-slate-950'
172:                   : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200'
173:               }`}
174:             >
175:               ✏️ Editor
176:             </button>
177:             <button
178:               type="button"
179:               onClick={() => setViewMode('preview')}
180:               className={`px-3 py-1 text-xs font-bold uppercase transition-all cursor-pointer ${
181:                 viewMode === 'preview'
182:                   ? 'bg-[#00cc33] text-slate-950 font-black'
183:                   : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200'
184:               }`}
185:             >
186:               👁️ Vista Previa en Vivo
187:             </button>
188:           </div>
189:         </div>
190: 
191:         {error && (
192:           <div className="mb-4 flex items-start gap-2.5 bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500 p-3 text-xs font-bold text-rose-900 dark:text-rose-200 mb-6 shadow-[2px_2px_0px_0px_rgba(244,63,94,0.5)]">
193:             <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
194:             <span>{error}</span>
195:           </div>
196:         )}
197: 
198:         {viewMode === 'preview' ? (
199: 
200:           <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
201:             <div className="border-b-2 border-slate-950 dark:border-slate-800 pb-3 flex justify-between items-center">
202:               <div>
203:                 <span className="text-[10px] font-mono font-bold text-[#00cc33] uppercase">VISTA PREVIA EN VIVO</span>
204:                 <h3 className="text-lg font-black text-slate-950 dark:text-white">{title || 'Título de la Lección / Manual'}</h3>
205:               </div>
206:               <span className="text-xs font-mono font-bold px-2 py-0.5 border border-slate-950 bg-amber-400 text-slate-950">
207:                 Orden: {order || '1'}
208:               </span>
209:             </div>
210: 
211:             {videoUrl && (
212:               <div className="border-2 border-slate-950 bg-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
213:                 <div className="bg-slate-900 px-3 py-1 text-[10px] font-mono text-emerald-400 border-b border-slate-800">
214:                   ▶ VIDEO DE LA CLASE
215:                 </div>
216:                 <div className="aspect-video">
217:                   <iframe
218:                     src={videoUrl.replace('watch?v=', 'embed/')}
219:                     title={title}
220:                     className="w-full h-full border-0"
221:                     allowFullScreen
222:                   />
223:                 </div>
224:               </div>
225:             )}
226: 
227:             <article className="prose dark:prose-invert max-w-none text-xs sm:text-sm">
228:               {content ? (
229:                 <MarkdownRenderer content={content} />
230:               ) : (
231:                 <div className="p-6 border border-dashed border-slate-400 text-center text-slate-400 text-xs italic">
232:                   Escribe contenido en el editor para previsualizarlo aquí.
233:                 </div>
234:               )}
235:             </article>
236: 
237:             <div className="pt-4 border-t-2 border-slate-950 dark:border-slate-800 flex justify-end gap-3">
238:               <Button type="button" variant="outline" size="sm" onClick={() => setViewMode('editor')}>
239:                 ✏️ Volver al Editor
240:               </Button>
241:             </div>
242:           </div>
243:         ) : (
244: 
245:           <form onSubmit={onSubmit} className="flex flex-col gap-4">
246:             <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
247:               <div className="sm:col-span-2 flex flex-col gap-1.5">
248:                 <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
249:                   Sección Asociada (Módulo) *
250:                 </label>
251:                 <select
252:                   value={moduleId}
253:                   onChange={(e) => onModuleChange(e.target.value ? Number(e.target.value) : '')}
254:                   disabled={loading}
255:                   className="w-full border-2 border-slate-950 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-950 dark:text-white px-4 py-2.5 text-xs font-bold outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] focus:border-[#00cc33]"
256:                   required
257:                 >
258:                   <option value="">-- Selecciona una Sección --</option>
259:                   {modules.map((mod) => (
260:                     <option key={mod.id} value={mod.id}>
261:                       {mod.title}
262:                     </option>
263:                   ))}
264:                 </select>
265:               </div>
266: 
267:               <Input
268:                 label="Duración (Min) *"
269:                 type="number"
270:                 placeholder="15"
271:                 value={durationMinutes}
272:                 onChange={(e) => onDurationMinutesChange?.(e.target.value)}
273:                 disabled={loading}
274:                 required
275:               />
276: 
277:               <Input
278:                 label="Orden *"
279:                 type="number"
280:                 placeholder="1"
281:                 value={order}
282:                 onChange={(e) => onOrderChange(e.target.value)}
283:                 disabled={loading}
284:                 required
285:               />
286:             </div>
287: 
288:             <Input
289:               label="Título del Tema / Manual *"
290:               placeholder="Ej: Manual 1.1: Instalación de Entorno y Comandos Terminal"
291:               value={title}
292:               onChange={(e) => onTitleChange(e.target.value)}
293:               disabled={loading}
294:               required
295:             />
296: 
297:             <div className="flex flex-col gap-1">
298:               <Input
299:                 label="Enlace de Video (Opcional si es Manual o Guía escrita)"
300:                 placeholder="https://www.youtube.com/watch?v=... (Dejar vacío si no requiere video)"
301:                 type="url"
302:                 value={videoUrl}
303:                 onChange={(e) => onVideoUrlChange(e.target.value)}
304:                 disabled={loading}
305:               />
306:               <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
307:                 💡 Para manuales paso a paso o tutoriales teóricos sin video, puedes dejar este campo en blanco.
308:               </span>
309:             </div>
310: 
311:             {/* Quick Preset Buttons & Code Snippet Toolbar */}
312:             <div className="flex flex-col gap-2 pt-2 border-t-2 border-slate-950 dark:border-slate-800">
313:               <div className="flex items-center justify-between">
314:                 <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
315:                   Contenido del Manual / Tutorial / Guía (Markdown & Código)
316:                 </label>
317:               </div>
318: 
319:               {/* Template Presets Bar */}
320:               <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-950 p-2.5 border-2 border-slate-950 dark:border-slate-800">
321:                 <span className="text-[11px] font-extrabold uppercase text-slate-700 dark:text-slate-300 mr-1">
322:                   Insertar Plantilla:
323:                 </span>
324:                 <button
325:                   type="button"
326:                   onClick={() => insertTemplate('manual')}
327:                   className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-950 text-[11px] font-bold text-slate-950 dark:text-white hover:bg-amber-300 hover:text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
328:                 >
329:                   <Terminal className="h-3.5 w-3.5 text-amber-600" />
330:                   <span>🛠️ Manual Instalación</span>
331:                 </button>
332:                 <button
333:                   type="button"
334:                   onClick={() => insertTemplate('code')}
335:                   className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-950 text-[11px] font-bold text-slate-950 dark:text-white hover:bg-emerald-300 hover:text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
336:                 >
337:                   <Code2 className="h-3.5 w-3.5 text-emerald-600" />
338:                   <span>💻 Tutorial Código</span>
339:                 </button>
340:                 <button
341:                   type="button"
342:                   onClick={() => insertTemplate('sublesson')}
343:                   className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-950 text-[11px] font-bold text-slate-950 dark:text-white hover:bg-purple-300 hover:text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
344:                 >
345:                   <span>📌 Sub-lección</span>
346:                 </button>
347:                 <button
348:                   type="button"
349:                   onClick={() => insertTemplate('theory')}
350:                   className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-950 text-[11px] font-bold text-slate-950 dark:text-white hover:bg-blue-300 hover:text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
351:                 >
352:                   <BookOpen className="h-3.5 w-3.5 text-blue-600" />
353:                   <span>📖 Guía Teórica</span>
354:                 </button>
355:                 <button
356:                   type="button"
357:                   onClick={() => insertTemplate('table')}
358:                   className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-950 text-[11px] font-bold text-slate-950 dark:text-white hover:bg-[#00cc33] hover:text-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
359:                 >
360:                   <span>📊 Tabla Markdown</span>
361:                 </button>
362:               </div>
363: 
364:               {}
365:               <div className="flex flex-wrap items-center gap-1.5">
366:                 <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
367:                   Añadir Bloque de Código:
368:                 </span>
369:                 <button
370:                   type="button"
371:                   onClick={() => insertSnippet("```bash\n# Comandos terminal\n```")}
372:                   className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-slate-200 border border-slate-950 text-[10px] font-mono font-bold hover:bg-[#00cc33] hover:text-slate-950 cursor-pointer"
373:                 >
374:                   + Terminal (bash)
375:                 </button>
376:                 <button
377:                   type="button"
378:                   onClick={() => insertSnippet("```python\n# Codigo Python\n```")}
379:                   className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-slate-200 border border-slate-950 text-[10px] font-mono font-bold hover:bg-[#00cc33] hover:text-slate-950 cursor-pointer"
380:                 >
381:                   + Python
382:                 </button>
383:                 <button
384:                   type="button"
385:                   onClick={() => insertSnippet("```sql\n-- Consultas SQL\n```")}
386:                   className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-slate-200 border border-slate-950 text-[10px] font-mono font-bold hover:bg-[#00cc33] hover:text-slate-950 cursor-pointer"
387:                 >
388:                   + SQL
389:                 </button>
390:                 <button
391:                   type="button"
392:                   onClick={() => insertSnippet("```javascript\n// Codigo JavaScript/TypeScript\n```")}
393:                   className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-slate-200 border border-slate-950 text-[10px] font-mono font-bold hover:bg-[#00cc33] hover:text-slate-950 cursor-pointer"
394:                 >
395:                   + JS/TS
396:                 </button>
397:               </div>
398: 
399:               <textarea
400:                 placeholder="Escribe aquí el manual paso a paso o el tutorial con instrucciones y bloques de código..."
401:                 value={content}
402:                 onChange={(e) => onContentChange(e.target.value)}
403:                 disabled={loading}
404:                 rows={8}
405:                 className="w-full border-2 border-slate-950 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-950 dark:text-white px-4 py-3 text-xs font-mono outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] focus:border-[#00cc33] resize-y"
406:               />
407:             </div>
408: 
409:             <div className="flex justify-end gap-3 mt-4 pt-4 border-t-2 border-slate-950 dark:border-slate-800">
410:               <Button
411:                 type="button"
412:                 variant="outline"
413:                 size="sm"
414:                 onClick={onClose}
415:                 disabled={loading}
416:               >
417:                 Cancelar
418:               </Button>
419:               <Button type="submit" size="sm" isLoading={loading} className="flex items-center gap-1.5">
420:                 <FileCode2 className="h-4 w-4" />
421:                 <span>{isEditing ? 'Guardar Cambios' : 'Crear Tema / Manual'}</span>
422:               </Button>
423:             </div>
424:           </form>
425:         )}
426:       </div>
427:     </div>
428:   );
429: };
````

## File: src/presentation/components/Button.tsx
````typescript
 1: import React from 'react';
 2: import { cn } from '../utils/cn';
 3: 
 4: interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 5:   variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
 6:   size?: 'sm' | 'md' | 'lg';
 7:   isLoading?: boolean;
 8: }
 9: 
10: export const Button: React.FC<ButtonProps> = ({
11:   children,
12:   className,
13:   variant = 'primary',
14:   size = 'md',
15:   isLoading = false,
16:   disabled,
17:   ...props
18: }) => {
19:   return (
20:     <button
21:       disabled={disabled || isLoading}
22:       className={cn(
23:         'inline-flex items-center justify-center font-extrabold tracking-wider uppercase border-2 border-slate-950 transition-all cursor-pointer focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:translate-x-0.5 active:translate-y-0.5',
24:         {
25: 
26:           'bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 shadow-[3px_3px_0px_0px_#00b835]':
27:             variant === 'primary' || variant === 'secondary' || variant === 'outline',
28: 
29:           'bg-rose-500 hover:bg-rose-600 text-white shadow-[3px_3px_0px_0px_#991b1b]':
30:             variant === 'danger',
31: 
32:           'bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 shadow-[2px_2px_0px_0px_#00b835]':
33:             variant === 'ghost',
34: 
35:           'px-3 py-1.5 text-xs': size === 'sm',
36:           'px-5 py-2.5 text-xs sm:text-sm': size === 'md',
37:           'px-7 py-3 text-sm sm:text-base': size === 'lg',
38:         },
39:         className
40:       )}
41:       {...props}
42:     >
43:       {isLoading ? (
44:         <svg
45:           className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
46:           fill="none"
47:           viewBox="0 0 24 24"
48:         >
49:           <circle
50:             className="opacity-25"
51:             cx="12"
52:             cy="12"
53:             r="10"
54:             stroke="currentColor"
55:             strokeWidth="4"
56:           />
57:           <path
58:             className="opacity-75"
59:             fill="currentColor"
60:             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
61:           />
62:         </svg>
63:       ) : null}
64:       {children}
65:     </button>
66:   );
67: };
````

## File: src/presentation/pages/AdminDashboard.tsx
````typescript
  1: import React, { useEffect, useState } from 'react';
  2: import { Link } from 'react-router-dom';
  3: import { Layout } from '../components/Layout';
  4: import { useAuthStore } from '../store/useAuthStore';
  5: import { getCoursesUseCase } from '@infrastructure/factories/CourseFactory';
  6: import { getCategoriesUseCase } from '@infrastructure/factories/CategoryFactory';
  7: import { getEnrollmentsUseCase } from '@infrastructure/factories/EnrollmentFactory';
  8: import { LayoutDashboard, BookOpen, Users, FolderOpen, ClipboardList, FolderKanban, UserCheck, BarChart3, ShieldCheck } from 'lucide-react';
  9: import { Loader } from '../components/Loader';
 10: 
 11: export const AdminDashboard: React.FC = () => {
 12:   const { user } = useAuthStore();
 13:   const [totalCoursesCount, setTotalCoursesCount] = useState(0);
 14:   const [enrollmentsCount, setEnrollmentsCount] = useState(0);
 15:   const [categoriesCount, setCategoriesCount] = useState(0);
 16:   const [isLoading, setIsLoading] = useState(true);
 17: 
 18:   useEffect(() => {
 19:     const fetchCounts = async () => {
 20:       try {
 21:         const coursesData = await getCoursesUseCase.execute({ page_size: 1 });
 22:         setTotalCoursesCount(coursesData.count || 0);
 23: 
 24:         const enrollments = await getEnrollmentsUseCase.execute({ page_size: 1 });
 25:         setEnrollmentsCount(enrollments.count || 0);
 26: 
 27:         const categories = await getCategoriesUseCase.execute({ page_size: 1 });
 28:         setCategoriesCount(categories.count || 0);
 29:       } catch (err) {
 30:         console.error('Failed to load dashboard metrics', err);
 31:       } finally {
 32:         setIsLoading(false);
 33:       }
 34:     };
 35: 
 36:     fetchCounts();
 37:   }, []);
 38: 
 39:   if (isLoading) return <Loader fullScreen />;
 40: 
 41:   return (
 42:     <Layout>
 43:       <div className="mb-8">
 44:         <h1 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
 45:           <LayoutDashboard className="h-8 w-8 text-[#00cc33]" />
 46:           Panel de Control Administrativo
 47:         </h1>
 48:         <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm font-medium">
 49:           <span className="text-slate-600 dark:text-slate-400">
 50:             Bienvenido, <span className="font-extrabold text-slate-950 dark:text-white">{user?.first_name ? `${user.first_name} ${user.last_name}` : user?.username}</span>
 51:           </span>
 52:           <span className="text-slate-400">•</span>
 53:           {user?.role === 'admin' && (
 54:             <span className="inline-flex items-center gap-1 bg-rose-500 text-white font-black text-xs uppercase tracking-wider px-2.5 py-0.5 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835]">
 55:               👑 ROL: ADMINISTRADOR
 56:             </span>
 57:           )}
 58:           {user?.role === 'professor' && (
 59:             <span className="inline-flex items-center gap-1 bg-purple-500 text-white font-black text-xs uppercase tracking-wider px-2.5 py-0.5 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835]">
 60:               🎓 ROL: DOCENTE
 61:             </span>
 62:           )}
 63:           {user?.role === 'student' && (
 64:             <span className="inline-flex items-center gap-1 bg-[#00cc33] text-slate-950 font-black text-xs uppercase tracking-wider px-2.5 py-0.5 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835]">
 65:               ⚡ ESTUDIANTE
 66:             </span>
 67:           )}
 68:         </div>
 69:       </div>
 70: 
 71:       {}
 72:       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
 73:         {}
 74:         <Link
 75:           to="/admin/courses"
 76:           className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 text-slate-950 dark:text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00b835] flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all cursor-pointer group"
 77:         >
 78:           <div className="border border-slate-950 bg-[#00cc33] p-3 text-slate-950 shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
 79:             <BookOpen className="h-6 w-6" />
 80:           </div>
 81:           <div>
 82:             <span className="text-xs text-slate-600 dark:text-slate-300 block font-extrabold uppercase tracking-wider group-hover:text-[#00cc33] transition-colors">
 83:               Catálogo de Cursos &rarr;
 84:             </span>
 85:             <span className="text-2xl font-black">{totalCoursesCount} cursos</span>
 86:           </div>
 87:         </Link>
 88: 
 89:         {}
 90:         <Link
 91:           to="/admin/students"
 92:           className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 text-slate-950 dark:text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00b835] flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all cursor-pointer group"
 93:         >
 94:           <div className="border border-slate-950 bg-emerald-400 p-3 text-slate-950 shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
 95:             <Users className="h-6 w-6" />
 96:           </div>
 97:           <div>
 98:             <span className="text-xs text-slate-600 dark:text-slate-300 block font-extrabold uppercase tracking-wider group-hover:text-emerald-500 transition-colors">
 99:               Inscripciones &rarr;
100:             </span>
101:             <span className="text-2xl font-black">{enrollmentsCount} alumnos</span>
102:           </div>
103:         </Link>
104: 
105:         {}
106:         <Link
107:           to="/admin/categories"
108:           className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-5 text-slate-950 dark:text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_#00b835] flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all cursor-pointer group"
109:         >
110:           <div className="border border-slate-950 bg-rose-400 p-3 text-slate-950 shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
111:             <FolderOpen className="h-6 w-6" />
112:           </div>
113:           <div>
114:             <span className="text-xs text-slate-600 dark:text-slate-300 block font-extrabold uppercase tracking-wider group-hover:text-rose-500 transition-colors">
115:               Categorías de Estudio &rarr;
116:             </span>
117:             <span className="text-2xl font-black">{categoriesCount} categorías</span>
118:           </div>
119:         </Link>
120:       </div>
121: 
122:       {}
123:       <h2 className="font-display text-xl font-black text-slate-950 dark:text-white mb-6 pb-2 border-b-2 border-slate-950 dark:border-slate-800 flex items-center gap-2">
124:         <ShieldCheck className="h-5 w-5 text-[#00cc33]" />
125:         <span>Módulos de Gestión del Sistema</span>
126:       </h2>
127: 
128:       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
129:         {}
130:         <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 text-slate-950 dark:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] flex flex-col justify-between">
131:           <div>
132:             <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 bg-brand-400 text-slate-950 mb-4 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
133:               <ClipboardList className="h-6 w-6" />
134:             </div>
135:             <h3 className="text-lg font-black mb-2">Gestión del Catálogo y Cursos</h3>
136:             <p className="text-slate-600 dark:text-slate-400 text-xs font-medium leading-relaxed mb-6">
137:               Administra el catálogo completo de contenidos. Crea nuevos cursos, organiza secciones, edita lecciones paso a paso, gestiona precios y conmuta el estado (Activo / Inactivo) a 1-clic.
138:             </p>
139:           </div>
140:           <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
141:             <Link
142:               to="/admin/courses"
143:               className="px-3 py-1.5 bg-[#00cc33] text-slate-950 font-black text-xs uppercase border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#00ff41] transition-all cursor-pointer flex items-center gap-1"
144:             >
145:               <BookOpen className="h-3.5 w-3.5" />
146:               <span>Administrar Cursos &rarr;</span>
147:             </Link>
148:             <Link
149:               to="/admin/categories"
150:               className="px-3 py-1.5 bg-rose-400 text-slate-950 font-black text-xs uppercase border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-rose-300 transition-all cursor-pointer flex items-center gap-1"
151:             >
152:               <FolderKanban className="h-3.5 w-3.5" />
153:               <span>Categorías &rarr;</span>
154:             </Link>
155:           </div>
156:         </div>
157: 
158:         {}
159:         <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 text-slate-950 dark:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] flex flex-col justify-between">
160:           <div>
161:             <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 bg-emerald-400 text-slate-950 mb-4 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
162:               <Users className="h-6 w-6" />
163:             </div>
164:             <h3 className="text-lg font-black mb-2">Estudiantes e Inscripciones</h3>
165:             <p className="text-slate-600 dark:text-slate-400 text-xs font-medium leading-relaxed mb-6">
166:               Nómina general de alumnos matriculados por curso. Busca estudiantes por nombre, analiza el avance de lecciones completadas y realiza inscripciones directas.
167:             </p>
168:           </div>
169:           <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
170:             <Link
171:               to="/admin/students"
172:               className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-400 text-slate-950 font-black text-xs uppercase border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-emerald-300 transition-all cursor-pointer"
173:             >
174:               <Users className="h-3.5 w-3.5" />
175:               <span>Ver Nómina de Estudiantes &rarr;</span>
176:             </Link>
177:           </div>
178:         </div>
179: 
180:         {}
181:         <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 text-slate-950 dark:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] flex flex-col justify-between">
182:           <div>
183:             <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 bg-purple-400 text-slate-950 mb-4 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
184:               <UserCheck className="h-6 w-6" />
185:             </div>
186:             <h3 className="text-lg font-black mb-2">Gestión de Usuarios y Roles</h3>
187:             <p className="text-slate-600 dark:text-slate-400 text-xs font-medium leading-relaxed mb-6">
188:               Asigna roles de Administrador, Docente o Estudiante. Administra las credenciales y accesos del sistema con control estricto de seguridad.
189:             </p>
190:           </div>
191:           <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
192:             <Link
193:               to="/admin/users"
194:               className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-400 text-slate-950 font-black text-xs uppercase border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-purple-300 transition-all cursor-pointer"
195:             >
196:               <UserCheck className="h-3.5 w-3.5" />
197:               <span>Administrar Usuarios y Roles &rarr;</span>
198:             </Link>
199:           </div>
200:         </div>
201: 
202:         {}
203:         <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-6 text-slate-950 dark:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] flex flex-col justify-between">
204:           <div>
205:             <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 bg-amber-400 text-slate-950 mb-4 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
206:               <BarChart3 className="h-6 w-6" />
207:             </div>
208:             <h3 className="text-lg font-black mb-2">Analíticas y Reportes</h3>
209:             <p className="text-slate-600 dark:text-slate-400 text-xs font-medium leading-relaxed mb-6">
210:               Visualiza reportes ejecutivos de rendimiento, ingresos por ventas de cursos, tasa de retención estudiantil y métricas de aprendizaje.
211:             </p>
212:           </div>
213:           <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
214:             <Link
215:               to="/admin/analytics"
216:               className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase border border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-300 transition-all cursor-pointer"
217:             >
218:               <BarChart3 className="h-3.5 w-3.5" />
219:               <span>Ver Métricas y Reportes &rarr;</span>
220:             </Link>
221:           </div>
222:         </div>
223:       </div>
224:     </Layout>
225:   );
226: };
````

## File: src/presentation/components/CourseCard.tsx
````typescript
  1: import React from 'react';
  2: import { Link } from 'react-router-dom';
  3: import { BookOpen, ShoppingBag, Pencil, X } from 'lucide-react';
  4: import { Course } from '../../domain/entities/Course';
  5: import { useCartStore } from '../store/useCartStore';
  6: import { useAuthStore } from '../store/useAuthStore';
  7: import { calculateCourseStats } from '../utils/course-stats';
  8: 
  9: interface CourseCardProps {
 10:   course: Course;
 11: }
 12: 
 13: const getCategoryColor = (categoryName?: string) => {
 14:   const name = (categoryName || '').toLowerCase();
 15:   if (name.includes('front') || name.includes('js') || name.includes('javascript') || name.includes('web')) {
 16:     return 'bg-amber-500 text-amber-955';
 17:   }
 18:   if (name.includes('back') || name.includes('python') || name.includes('django') || name.includes('api')) {
 19:     return 'bg-brand-600 text-brand-100';
 20:   }
 21:   if (name.includes('base') || name.includes('sql') || name.includes('data')) {
 22:     return 'bg-indigo-600 text-indigo-100';
 23:   }
 24:   if (name.includes('git') || name.includes('github') || name.includes('version')) {
 25:     return 'bg-rose-600 text-rose-100';
 26:   }
 27:   return 'bg-emerald-600 text-emerald-100';
 28: };
 29: 
 30: export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
 31:   const { user } = useAuthStore();
 32:   const { addItem } = useCartStore();
 33:   const stats = calculateCourseStats(course);
 34:   const isAdminOrProfessor = user?.role === 'admin' || user?.role === 'professor';
 35: 
 36:   const handleAddToCart = (e: React.MouseEvent) => {
 37:     e.preventDefault();
 38:     addItem(course);
 39:   };
 40: 
 41:   return (
 42:     <div
 43:       className="relative flex flex-col h-full bg-white border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] rounded-none overflow-hidden transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#00b835] animate-fade-in"
 44:     >
 45:       {}
 46:       <div className="flex items-center justify-between border-b-2 border-slate-950 bg-slate-100 px-3 py-1.5">
 47:         <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-700 truncate max-w-[150px]">
 48:           {course.category_name || 'Desarrollo'}
 49:         </span>
 50:         <div className="flex items-center gap-1.5 shrink-0" translate="no">
 51:           <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900">_</span>
 52:           <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900">+</span>
 53:           <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900" aria-label="Cerrar">
 54:             <X className="h-2 w-2" />
 55:           </span>
 56:         </div>
 57:       </div>
 58: 
 59:       {}
 60:       <div className={`relative aspect-video w-full overflow-hidden border-b-2 border-slate-950 ${getCategoryColor(course.category_name)}`}>
 61:         {course.cover_image ? (
 62:           <img
 63:             src={course.cover_image}
 64:             alt={course.title}
 65:             className="w-full h-full object-cover block transition-transform duration-300 hover:scale-105"
 66:           />
 67:         ) : (
 68:           <div className="flex h-full w-full items-center justify-center p-6">
 69:             <BookOpen className="h-12 w-12 text-slate-950" />
 70:           </div>
 71:         )}
 72: 
 73:         {}
 74:         <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-white border-2 border-slate-950 px-2 py-0.5 text-[9px] font-extrabold text-slate-950 uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
 75:           <span>🛡️</span>
 76:           <span>Con certificado</span>
 77:         </div>
 78: 
 79:         {}
 80:         {isAdminOrProfessor && (
 81:           <Link
 82:             to={`/courses/${course.id}`}
 83:             className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-amber-400 border-2 border-slate-950 px-2 py-0.5 text-[9px] font-black text-slate-950 uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-300 transition-all cursor-pointer"
 84:             title="Gestión Directa del Curso"
 85:           >
 86:             <Pencil className="h-3 w-3" />
 87:             <span>Editar (ADMIN)</span>
 88:           </Link>
 89:         )}
 90:       </div>
 91: 
 92:       {}
 93:       <div className="flex flex-1 flex-col p-5 bg-white">
 94:         <h3 className="font-display text-base font-extrabold text-slate-950 dark:text-slate-950 transition-colors border-b border-slate-200 pb-1.5">
 95:           {course.title}
 96:         </h3>
 97: 
 98:         {}
 99:         <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-700 font-mono py-2.5 border-b border-slate-100 mb-2">
100:           <div className="flex items-center gap-1 font-bold text-slate-900">
101:             <span>📚</span>
102:             <span>{stats.modulesCount} Módulos</span>
103:           </div>
104:           <div className="flex items-center gap-1 font-bold text-slate-900">
105:             <span>📄</span>
106:             <span>{stats.totalLessons} Lecciones</span>
107:           </div>
108:           <div className="col-span-2 flex items-center gap-1 text-slate-600 font-semibold mt-0.5">
109:             <span>⏱️</span>
110:             <span>Duración estimada: {stats.totalDurationText}</span>
111:           </div>
112:         </div>
113: 
114:         <p className="text-slate-500 dark:text-slate-500 text-xs line-clamp-2">
115:           {course.description || 'Curso estructurado para el dominio completo de la tecnología.'}
116:         </p>
117:       </div>
118: 
119:       {}
120:       <div className="flex flex-col gap-2 p-4 border-t border-slate-200 bg-slate-50">
121:         <div className="flex items-center justify-between gap-2 mb-1">
122:           <span className="text-xs font-mono font-bold text-slate-600">
123:             {parseFloat(course.price) === 0 ? 'Gratuito' : `Precio:`}
124:           </span>
125:           <span className="text-sm font-black text-slate-950 font-mono">
126:             {parseFloat(course.price) === 0 ? 'GRATIS' : `$${course.price} USD`}
127:           </span>
128:         </div>
129: 
130:         <div className="grid grid-cols-2 gap-2">
131:           <Link to={`/courses/${course.id}`}>
132:             <button className="w-full text-center py-2 border-2 border-slate-950 text-xs font-extrabold bg-white text-slate-950 hover:bg-slate-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
133:               Ver detalle
134:             </button>
135:           </Link>
136:           <button
137:             onClick={handleAddToCart}
138:             className="w-full flex items-center justify-center gap-1.5 py-2 border-2 border-slate-950 text-xs font-black bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 transition-colors shadow-[2px_2px_0px_0px_#00b835] cursor-pointer"
139:           >
140:             <ShoppingBag className="h-3.5 w-3.5" />
141:             <span>Carrito</span>
142:           </button>
143:         </div>
144:       </div>
145:     </div>
146:   );
147: };
````

## File: src/presentation/components/Logo.tsx
````typescript
 1: import React from 'react';
 2: 
 3: interface LogoProps {
 4:   className?: string;
 5: }
 6: 
 7: export const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-10' }) => {
 8:   return (
 9:     <svg
10:       viewBox="0 0 100 100"
11:       className={className}
12:       fill="none"
13:       xmlns="http://www.w3.org/2000/svg"
14:     >
15:       <defs>
16:         {}
17:         <filter id="hatGlow" x="-20%" y="-20%" width="140%" height="140%">
18:           <feGaussianBlur stdDeviation="2.5" result="blur" />
19:           <feMerge>
20:             <feMergeNode in="blur" />
21:             <feMergeNode in="SourceGraphic" />
22:           </feMerge>
23:         </filter>
24: 
25:         <style>{`
26:           @keyframes logoHatLatency {
27:             0%, 100% {
28:               opacity: 1;
29:             }
30:             45% {
31:               opacity: 1;
32:             }
33:             48% {
34:               opacity: 0.25;
35:             }
36:             50% {
37:               opacity: 0.95;
38:             }
39:             52% {
40:               opacity: 0.35;
41:             }
42:             54% {
43:               opacity: 1;
44:             }
45:             82% {
46:               opacity: 1;
47:             }
48:             84% {
49:               opacity: 0.45;
50:             }
51:             86% {
52:               opacity: 1;
53:             }
54:           }
55:           .animate-hat-latency {
56:             animation: logoHatLatency 3.5s ease-in-out infinite;
57:           }
58:         `}</style>
59:       </defs>
60: 
61:       {}
62:       <rect
63:         x="3"
64:         y="3"
65:         width="94"
66:         height="94"
67:         rx="16"
68:         fill="#090d16"
69:         stroke="#00b835"
70:         strokeWidth="4.5"
71:       />
72: 
73:       {}
74:       <g
75:         className="animate-hat-latency"
76:         transform="translate(20, 20) scale(2.5)"
77:         stroke="#00b835"
78:         strokeWidth="2.2"
79:         strokeLinecap="round"
80:         strokeLinejoin="round"
81:         fill="none"
82:         filter="url(#hatGlow)"
83:       >
84:         <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
85:         <path d="M22 10v6" />
86:         <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
87:       </g>
88:     </svg>
89:   );
90: };
````

## File: src/presentation/pages/CourseDetailPage.tsx
````typescript
  1: import React, { useEffect, useState } from 'react';
  2: import { useParams, useNavigate, Link } from 'react-router-dom';
  3: import { Layout } from '../components/Layout';
  4: import { Button } from '../components/Button';
  5: import { getCourseByIdUseCase, updateCourseUseCase } from '@infrastructure/factories/CourseFactory';
  6: import { getCategoriesUseCase } from '@infrastructure/factories/CategoryFactory';
  7: import { getEnrollmentsUseCase, enrollInCourseUseCase } from '@infrastructure/factories/EnrollmentFactory';
  8: import { getModulesUseCase } from '@infrastructure/factories/ModuleFactory';
  9: import { getLessonsUseCase } from '@infrastructure/factories/LessonFactory';
 10: import { Course } from '@domain/entities/Course';
 11: import { Category } from '@domain/entities/Category';
 12: import { useAuthStore } from '../store/useAuthStore';
 13: import { useCartStore } from '../store/useCartStore';
 14: import { CourseFormModal } from '../components/course-management/CourseFormModal';
 15: import { PaymentCheckoutModal, BillingDetails } from '../components/cart/PaymentCheckoutModal';
 16: import { InvoiceModal } from '../components/cart/InvoiceModal';
 17: import { BookOpen, Clock, Award, ShieldAlert, CheckCircle, ArrowLeft, Play, ShoppingBag, Pencil, X } from 'lucide-react';
 18: import { CourseDetailSkeleton } from '../components/Skeletons';
 19: 
 20: export const CourseDetailPage: React.FC = () => {
 21:   const { id } = useParams<{ id: string }>();
 22:   const navigate = useNavigate();
 23:   const { isAuthenticated, user } = useAuthStore();
 24:   const { addItem: addToCart } = useCartStore();
 25: 
 26:   const [course, setCourse] = useState<Course | null>(null);
 27:   const [categories, setCategories] = useState<Category[]>([]);
 28:   const [isEnrolled, setIsEnrolled] = useState(false);
 29:   const [enrollmentProgress, setEnrollmentProgress] = useState(0);
 30:   const [isLoading, setIsLoading] = useState(true);
 31:   const [isEnrolling, setIsEnrolling] = useState(false);
 32:   const [error, setError] = useState<string | null>(null);
 33: 
 34: 
 35:   const [showPaymentModal, setShowPaymentModal] = useState(false);
 36:   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
 37:   const [currentBilling, setCurrentBilling] = useState<BillingDetails | null>(null);
 38:   const [currentPaymentMethod, setCurrentPaymentMethod] = useState('card');
 39:   const [invoiceNumber, setInvoiceNumber] = useState('');
 40: 
 41:   // Direct Admin Course Edit Modal State
 42:   const [showEditModal, setShowEditModal] = useState(false);
 43:   const [formCategory, setFormCategory] = useState<number | ''>('');
 44:   const [formTitle, setFormTitle] = useState('');
 45:   const [formDescription, setFormDescription] = useState('');
 46:   const [formPrice, setFormPrice] = useState('');
 47:   const [formSlug, setFormSlug] = useState('');
 48:   const [formIsActive, setFormIsActive] = useState(true);
 49:   const [formCoverImage, setFormCoverImage] = useState<File | null>(null);
 50:   const [formLoading, setFormLoading] = useState(false);
 51:   const [formError, setFormError] = useState<string | null>(null);
 52: 
 53:   const courseId = Number(id);
 54: 
 55:   useEffect(() => {
 56:     if (isNaN(courseId)) {
 57:       setError('ID de curso no válido');
 58:       setIsLoading(false);
 59:       return;
 60:     }
 61: 
 62:     const loadData = async () => {
 63:       setIsLoading(true);
 64:       try {
 65:         const courseData = await getCourseByIdUseCase.execute(courseId);
 66: 
 67: 
 68:         try {
 69:           const modulesData = await getModulesUseCase.execute(courseId);
 70:           if (modulesData && modulesData.length > 0) {
 71:             const modulesWithLessons = await Promise.all(
 72:               modulesData.map(async (mod) => {
 73:                 try {
 74:                   const modLessons = await getLessonsUseCase.execute(mod.id);
 75:                   modLessons.sort((a, b) => a.order - b.order);
 76:                   return {
 77:                     ...mod,
 78:                     lessons: modLessons || [],
 79:                   };
 80:                 } catch {
 81:                   return {
 82:                     ...mod,
 83:                     lessons: mod.lessons || [],
 84:                   };
 85:                 }
 86:               })
 87:             );
 88:             courseData.modules = modulesWithLessons;
 89:           }
 90:         } catch (modErr) {
 91:           console.warn('Could not fetch modules/lessons for course detail', modErr);
 92:         }
 93: 
 94:         setCourse(courseData);
 95: 
 96:         const categoriesData = await getCategoriesUseCase.execute({ page_size: 100 });
 97:         setCategories(categoriesData.results || []);
 98: 
 99:         if (isAuthenticated && user) {
100:           let apiEnrollments: any[] = [];
101:           try {
102:             const data = await getEnrollmentsUseCase.execute();
103:             apiEnrollments = Array.isArray(data) ? data : data.results || [];
104:           } catch (enrollErr) {
105:             console.warn('Could not fetch API enrollments', enrollErr);
106:           }
107: 
108:           let cachedEnrollments: any[] = [];
109:           try {
110:             const userKey = user.username?.toLowerCase() || String(user.id);
111:             const storedCache = JSON.parse(localStorage.getItem('oncourses_user_enrollments') || '{}');
112:             cachedEnrollments = storedCache[userKey] || [];
113:           } catch (cacheErr) {
114:             console.warn('Could not parse local enrollment cache', cacheErr);
115:           }
116: 
117:           const matchApi = apiEnrollments.find(
118:             (e: any) => Number(e.course) === Number(courseId) || Number(e.course_data?.id) === Number(courseId)
119:           );
120:           const matchCache = cachedEnrollments.find(
121:             (e: any) => Number(e.course) === Number(courseId) || Number(e.course_data?.id) === Number(courseId)
122:           );
123: 
124:           const matched = matchApi || matchCache;
125: 
126:           if (matched) {
127:             setIsEnrolled(true);
128:             setEnrollmentProgress(Math.round(parseFloat(matched.total_progress || '0')));
129:           } else {
130:             setIsEnrolled(false);
131:           }
132:         }
133:       } catch (err: any) {
134:         console.error(err);
135:         setError(err.message || 'Error al cargar detalles del curso');
136:       } finally {
137:         setIsLoading(false);
138:       }
139:     };
140: 
141:     loadData();
142:   }, [courseId, isAuthenticated, user]);
143: 
144:   const handleOpenEditModal = () => {
145:     if (!course) return;
146:     const catId = typeof course.category === 'object' ? (course.category as any)?.id : course.category;
147:     setFormCategory(catId ? Number(catId) : '');
148:     setFormTitle(course.title);
149:     setFormDescription(course.description || '');
150:     setFormPrice(course.price.toString());
151:     setFormSlug(course.slug);
152:     setFormIsActive(course.is_active);
153:     setFormCoverImage(null);
154:     setFormError(null);
155:     setShowEditModal(true);
156:   };
157: 
158:   const handleSaveCourse = async (e: React.FormEvent) => {
159:     e.preventDefault();
160:     if (!course) return;
161:     setFormLoading(true);
162:     setFormError(null);
163: 
164:     try {
165:       const updated = await updateCourseUseCase.execute(course.id, {
166:         category: formCategory ? Number(formCategory) : undefined,
167:         title: formTitle,
168:         description: formDescription,
169:         price: formPrice,
170:         slug: formSlug,
171:         is_active: formIsActive,
172:         cover_image: formCoverImage || undefined,
173:       });
174: 
175:       setCourse(updated);
176:       setShowEditModal(false);
177:     } catch (err: any) {
178:       setFormError(err.message || 'Error al guardar cambios del curso');
179:     } finally {
180:       setFormLoading(false);
181:     }
182:   };
183: 
184:   const handleEnroll = () => {
185:     if (!isAuthenticated) {
186:       navigate('/login', { state: { from: `/courses/${courseId}` } });
187:       return;
188:     }
189: 
190: 
191:     setShowPaymentModal(true);
192:   };
193: 
194:   const handleCompleteCheckout = async (billing: BillingDetails, paymentMethod: string) => {
195:     if (!course || !user) return;
196: 
197:     setIsEnrolling(true);
198:     try {
199: 
200:       try {
201:         await enrollInCourseUseCase.execute(courseId);
202:       } catch (err) {
203:         console.warn(`API enrollment for course ${courseId} failed, relying on local cache`, err);
204:       }
205: 
206: 
207:       const newEnrollment = {
208:         id: Date.now(),
209:         student: user.id,
210:         course: courseId,
211:         course_title: course.title,
212:         enrolled_at: new Date().toISOString(),
213:         total_progress: '0.00',
214:         course_data: course,
215:       };
216: 
217:       try {
218:         const userKey = user.username?.toLowerCase() || String(user.id);
219:         const existingCache = JSON.parse(localStorage.getItem('oncourses_user_enrollments') || '{}');
220:         const userEnrollments = existingCache[userKey] || [];
221: 
222:         if (!userEnrollments.some((e: any) => e.course === courseId)) {
223:           userEnrollments.push(newEnrollment);
224:         }
225: 
226:         existingCache[userKey] = userEnrollments;
227:         localStorage.setItem('oncourses_user_enrollments', JSON.stringify(existingCache));
228:       } catch (storageErr) {
229:         console.warn('Could not save local enrollment cache', storageErr);
230:       }
231: 
232:       setIsEnrolled(true);
233: 
234: 
235:       const randomFac = 'FAC-2026-' + Math.floor(10000 + Math.random() * 90000);
236:       setInvoiceNumber(randomFac);
237:       setCurrentBilling(billing);
238:       setCurrentPaymentMethod(paymentMethod);
239: 
240: 
241:       setShowPaymentModal(false);
242:       setShowInvoiceModal(true);
243:     } catch (err: any) {
244:       alert(err.message || 'Ocurrió un error al procesar el pago y la matrícula');
245:     } finally {
246:       setIsEnrolling(false);
247:     }
248:   };
249: 
250:   const handleGoToMyCourses = () => {
251:     setShowInvoiceModal(false);
252:     const firstLesson = course?.modules?.[0]?.lessons?.[0];
253:     if (firstLesson) {
254:       navigate(`/learn/${courseId}/lesson/${firstLesson.id}`);
255:     } else {
256:       navigate('/dashboard');
257:     }
258:   };
259: 
260:   if (isLoading) {
261:     return (
262:       <Layout>
263:         <CourseDetailSkeleton />
264:       </Layout>
265:     );
266:   }
267: 
268:   if (error || !course) {
269:     return (
270:       <Layout>
271:         <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg mx-auto">
272:           <ShieldAlert className="h-12 w-12 text-rose-500 mx-auto mb-4" />
273:           <h2 className="text-xl font-bold text-slate-800 dark:text-white">Error al cargar el curso</h2>
274:           <p className="text-slate-500 mt-2">{error || 'El curso no existe.'}</p>
275:           <Link to="/courses" className="inline-block mt-6">
276:             <Button variant="outline" className="flex items-center gap-2">
277:               <ArrowLeft className="h-4 w-4" />
278:               Volver al catálogo
279:             </Button>
280:           </Link>
281:         </div>
282:       </Layout>
283:     );
284:   }
285: 
286: 
287:   const totalLessons = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
288: 
289:   return (
290:     <Layout>
291:       <div className="mb-6">
292:         <Link
293:           to="/courses"
294:           className="inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-extrabold text-xs uppercase tracking-wider shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2.5px_2.5px_0px_0px_#00b835] hover:bg-brand-400 hover:text-slate-950 dark:hover:bg-brand-400 dark:hover:text-slate-950 transition-all cursor-pointer"
295:         >
296:           <ArrowLeft className="h-4 w-4" />
297:           <span>Volver al Catálogo</span>
298:         </Link>
299:       </div>
300: 
301:       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
302:         {}
303:         <div className="lg:col-span-2 flex flex-col gap-8">
304:           <div>
305:             <span className="inline-block px-3 py-1 border-2 border-slate-950 bg-[#00cc33] text-slate-950 font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
306:               {course.category_name || 'Desarrollo'}
307:             </span>
308:             <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white leading-tight mb-4">
309:               {course.title}
310:             </h1>
311:             <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed font-medium">
312:               {course.description || 'Este curso no tiene una descripción detallada todavía.'}
313:             </p>
314:           </div>
315: 
316:           {}
317:           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y-2 border-slate-950 py-6 dark:border-slate-800">
318:             <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-4 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] flex flex-col items-center justify-center">
319:               <Clock className="h-6 w-6 text-[#00cc33] mb-1" />
320:               <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Lecciones</span>
321:               <span className="text-sm font-black text-slate-950 dark:text-white">{totalLessons} temas</span>
322:             </div>
323:             <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-4 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] flex flex-col items-center justify-center">
324:               <BookOpen className="h-6 w-6 text-[#00cc33] mb-1" />
325:               <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Módulos</span>
326:               <span className="text-sm font-black text-slate-950 dark:text-white">{course.modules?.length || 0} secciones</span>
327:             </div>
328:             <div className="border-2 border-slate-950 bg-white dark:bg-slate-900 p-4 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] flex flex-col items-center justify-center">
329:               <Award className="h-6 w-6 text-[#00cc33] mb-1" />
330:               <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Certificación</span>
331:               <span className="text-sm font-black text-slate-950 dark:text-white">Al finalizar</span>
332:             </div>
333:           </div>
334: 
335:           {}
336:           <div>
337:             <h3 className="font-display text-xl font-extrabold text-slate-950 dark:text-white mb-6">
338:               Contenido del Curso
339:             </h3>
340: 
341:             <div className="flex flex-col gap-4">
342:               {course.modules && course.modules.length > 0 ? (
343:                 course.modules.map((mod, index) => (
344:                   <div
345:                     key={mod.id}
346:                     className="border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] overflow-hidden"
347:                   >
348:                     <div className="bg-slate-100 dark:bg-slate-950 px-5 py-3 border-b-2 border-slate-950 flex justify-between items-center">
349:                       <div>
350:                         <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
351:                           Sección {index + 1}
352:                         </span>
353:                         <h4 className="font-extrabold text-slate-950 dark:text-white text-base">
354:                           {mod.title}
355:                         </h4>
356:                       </div>
357:                       <span className="text-xs font-black text-slate-950 dark:text-white bg-[#00cc33] border border-slate-950 px-2.5 py-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
358:                         {mod.lessons?.length || 0} temas
359:                       </span>
360:                     </div>
361: 
362:                     <div className="divide-y-2 divide-slate-100 dark:divide-slate-800">
363:                       {mod.lessons && mod.lessons.length > 0 ? (
364:                         mod.lessons.map((lesson) => (
365:                           <div
366:                             key={lesson.id}
367:                             className="px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-sm"
368:                           >
369:                             <div className="flex items-center gap-3">
370:                               <div className="flex h-6 w-6 items-center justify-center border border-slate-950 bg-[#00cc33] text-slate-950 font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] shrink-0">
371:                                 <Play className="h-3 w-3 fill-current" />
372:                               </div>
373:                               <span className="text-slate-800 dark:text-slate-200 font-bold">
374:                                 {lesson.title}
375:                               </span>
376:                             </div>
377:                             <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
378:                               {lesson.duration_seconds && (
379:                                 <span className="text-slate-500 dark:text-slate-400 text-xs font-mono font-bold">
380:                                   {Math.round(lesson.duration_seconds / 60)} min
381:                                 </span>
382:                               )}
383:                               {isEnrolled && (
384:                                 <Link
385:                                   to={`/learn/${courseId}/lesson/${lesson.id}`}
386:                                   className="px-2.5 py-1 bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 font-mono font-black text-[11px] uppercase tracking-wider border border-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
387:                                 >
388:                                   Ver Tema &rarr;
389:                                 </Link>
390:                               )}
391:                             </div>
392:                           </div>
393:                         ))
394:                       ) : (
395:                         <div className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 italic">
396:                           No hay temas cargados en esta sección todavía.
397:                         </div>
398:                       )}
399:                     </div>
400:                   </div>
401:                 ))
402:               ) : (
403:                 <div className="text-center py-8 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
404:                   Aún no se ha estructurado el plan de estudios para este curso.
405:                 </div>
406:               )}
407:             </div>
408:           </div>
409:         </div>
410: 
411:         {}
412:         <div className="lg:col-span-1">
413:           <div className="sticky top-24 border-2 border-slate-950 bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835] overflow-hidden flex flex-col">
414:             {}
415:             <div className="flex items-center justify-between px-4 py-1.5 bg-slate-100 dark:bg-slate-100 border-b-2 border-slate-950">
416:               <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-700 font-mono">ONCOURSES.APP</span>
417:               <div className="flex items-center gap-1.5" translate="no">
418:                 <span className="w-4 h-4 flex items-center justify-center border border-slate-950 text-[10px] font-bold bg-white text-slate-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">_</span>
419:                 <span className="w-4 h-4 flex items-center justify-center border border-slate-950 text-[10px] font-bold bg-white text-slate-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">+</span>
420:                 <span className="w-4 h-4 flex items-center justify-center border border-slate-950 text-[10px] font-bold bg-white text-slate-900 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" aria-label="Cerrar">
421:                   <X className="h-2.5 w-2.5" />
422:                 </span>
423:               </div>
424:             </div>
425: 
426:             {}
427:             <div className="relative aspect-video w-full bg-slate-950 border-b-2 border-slate-950 overflow-hidden">
428:               {course.cover_image ? (
429:                 <img
430:                   src={course.cover_image}
431:                   alt={course.title}
432:                   className="w-full h-full object-cover"
433:                 />
434:               ) : (
435:                 <div className="flex h-full w-full items-center justify-center bg-[#00cc33] text-slate-950">
436:                   <BookOpen className="h-12 w-12" />
437:                 </div>
438:               )}
439:             </div>
440: 
441:             <div className="p-6 flex flex-col gap-6">
442:               {}
443:               {!isEnrolled && user?.role !== 'admin' && user?.role !== 'professor' && (
444:                 <div>
445:                   <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Inversión única</span>
446:                   <div className="flex items-baseline gap-2 mt-1">
447:                     <span className="text-3xl font-black text-slate-950 dark:text-white font-display">
448:                       {parseFloat(course.price) === 0 ? 'Gratis' : `$${course.price}`}
449:                     </span>
450:                   </div>
451:                 </div>
452:               )}
453: 
454:               {user?.role === 'admin' || user?.role === 'professor' ? (
455:                 <div className="flex flex-col gap-3 bg-amber-50 dark:bg-amber-950/40 border-2 border-slate-950 p-4 text-xs font-bold text-slate-950 dark:text-amber-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835]">
456:                   <div className="flex items-center gap-2">
457:                     <span className="w-2.5 h-2.5 rounded-full bg-[#00cc33] animate-pulse" />
458:                     <span>Modo Gestión (<span className="uppercase font-black text-brand-600 dark:text-[#00cc33]">{user?.role}</span>)</span>
459:                   </div>
460: 
461:                   <div className="flex flex-col gap-2 pt-1">
462:                     <button
463:                       type="button"
464:                       onClick={handleOpenEditModal}
465:                       className="w-full py-2 px-3 border-2 border-slate-950 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-amber-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
466:                     >
467:                       <Pencil className="h-4 w-4" />
468:                       <span>Editar Información del Curso</span>
469:                     </button>
470: 
471:                     <Link to={`/admin/courses/${course.id}/lessons`} className="w-full">
472:                       <Button className="w-full flex items-center justify-center gap-1.5 py-2">
473:                         <BookOpen className="h-4 w-4" />
474:                         <span>Administrar Temas y Secciones &rarr;</span>
475:                       </Button>
476:                     </Link>
477:                   </div>
478:                 </div>
479:               ) : isEnrolled ? (
480:                 <div className="flex flex-col gap-4">
481:                   {}
482:                   <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-slate-950 p-4 text-xs font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835]">
483:                     <div className="flex items-center justify-between mb-2">
484:                       <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-extrabold uppercase text-[11px]">
485:                         <CheckCircle className="h-4 w-4 text-[#00cc33]" />
486:                         Alumno Matriculado
487:                       </span>
488:                       <span className="text-[10px] font-mono font-black bg-[#00cc33] text-slate-950 px-2 py-0.5 border border-slate-950">
489:                         {enrollmentProgress}% COMPLETADO
490:                       </span>
491:                     </div>
492: 
493:                     {}
494:                     <div className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-950 h-3 overflow-hidden rounded-none my-2.5">
495:                       <div
496:                         className="bg-[#00cc33] h-full transition-all duration-500"
497:                         style={{ width: `${Math.max(enrollmentProgress, 5)}%` }}
498:                       />
499:                     </div>
500: 
501:                     <p className="text-slate-600 dark:text-slate-300 text-xs font-medium mt-1">
502:                       Acceso vitalicio activado. Tu factura electrónica fue autorizada y enviada a tu correo.
503:                     </p>
504:                   </div>
505: 
506:                   {course.modules?.[0]?.lessons?.[0] ? (
507:                     <Link to={`/learn/${courseId}/lesson/${course.modules[0].lessons[0].id}`} className="w-full">
508:                       <Button className="w-full flex items-center justify-center gap-2 py-3">
509:                         <Play className="h-4 w-4 fill-current" />
510:                         <span>Continuar Aprendizaje &rarr;</span>
511:                       </Button>
512:                     </Link>
513:                   ) : (
514:                     <Link to="/dashboard" className="w-full">
515:                       <Button className="w-full py-3">Ir a Mi Panel de Estudiante</Button>
516:                     </Link>
517:                   )}
518:                 </div>
519:               ) : (
520:                 <div className="flex flex-col gap-3">
521:                   <Button
522:                     onClick={handleEnroll}
523:                     isLoading={isEnrolling}
524:                     className="w-full py-3"
525:                   >
526:                     {isAuthenticated ? 'Inscribirse Ahora' : 'Iniciar sesión para inscribirse'}
527:                   </Button>
528: 
529:                   {course && (
530:                     <Button
531:                       variant="outline"
532:                       onClick={() => addToCart(course)}
533:                       className="w-full flex items-center justify-center gap-2"
534:                     >
535:                       <ShoppingBag className="h-4 w-4" />
536:                       <span>Añadir al Carrito</span>
537:                     </Button>
538:                   )}
539:                 </div>
540:               )}
541: 
542:               <div className="border-t-2 border-slate-950 dark:border-slate-800 pt-4 text-xs font-bold text-slate-700 dark:text-slate-300 flex flex-col gap-2.5">
543:                 <div className="flex items-center gap-2">
544:                   <CheckCircle className="h-4 w-4 text-[#00cc33] shrink-0" />
545:                   <span>Acceso ilimitado de por vida</span>
546:                 </div>
547:                 <div className="flex items-center gap-2">
548:                   <CheckCircle className="h-4 w-4 text-[#00cc33] shrink-0" />
549:                   <span>Evaluaciones modulares y tutoriales</span>
550:                 </div>
551:                 <div className="flex items-center gap-2">
552:                   <CheckCircle className="h-4 w-4 text-[#00cc33] shrink-0" />
553:                   <span>Certificado de finalización al concluir</span>
554:                 </div>
555:               </div>
556:             </div>
557:           </div>
558:         </div>
559:       </div>
560: 
561:       {}
562:       <CourseFormModal
563:         isOpen={showEditModal}
564:         isEditing={true}
565:         categories={categories}
566:         category={formCategory}
567:         title={formTitle}
568:         description={formDescription}
569:         price={formPrice}
570:         slug={formSlug}
571:         isActive={formIsActive}
572:         loading={formLoading}
573:         error={formError}
574:         onCategoryChange={setFormCategory}
575:         onTitleChange={(val) => {
576:           setFormTitle(val);
577:           setFormSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
578:         }}
579:         onDescriptionChange={setFormDescription}
580:         onPriceChange={setFormPrice}
581:         onSlugChange={setFormSlug}
582:         onIsActiveChange={setFormIsActive}
583:         onCoverImageChange={setFormCoverImage}
584:         onClose={() => setShowEditModal(false)}
585:         onSubmit={handleSaveCourse}
586:       />
587: 
588:       {/* Checkout & Payment Gateway Modal */}
589:       {course && (
590:         <PaymentCheckoutModal
591:           isOpen={showPaymentModal}
592:           onClose={() => setShowPaymentModal(false)}
593:           courses={[course]}
594:           totalRaw={parseFloat(course.price) || 0}
595:           totalFinal={parseFloat(course.price) || 0}
596:           discountAmount={0}
597:           onCompleteCheckout={handleCompleteCheckout}
598:         />
599:       )}
600: 
601:       {/* Invoice & Receipt Modal */}
602:       {course && currentBilling && (
603:         <InvoiceModal
604:           isOpen={showInvoiceModal}
605:           onClose={() => setShowInvoiceModal(false)}
606:           courses={[course]}
607:           billing={currentBilling}
608:           paymentMethod={currentPaymentMethod}
609:           totalRaw={parseFloat(course.price) || 0}
610:           totalFinal={parseFloat(course.price) || 0}
611:           discountAmount={0}
612:           invoiceNumber={invoiceNumber}
613:           invoiceDate={new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
614:           onGoToCourses={handleGoToMyCourses}
615:         />
616:       )}
617:     </Layout>
618:   );
619: };
````

## File: src/presentation/pages/LessonManagementPage.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { useParams, Link, useNavigate } from 'react-router-dom';
  3: import { Layout } from '../components/Layout';
  4: import { Button } from '../components/Button';
  5: import { Input } from '../components/Input';
  6: import { useLessonManagement } from '../hooks/useLessonManagement';
  7: import { ModuleSidebar } from '../components/lesson-management/ModuleSidebar';
  8: import { LessonsList } from '../components/lesson-management/LessonsList';
  9: import { LessonModal } from '../components/lesson-management/LessonModal';
 10: import { SingleLessonPreviewModal } from '../components/lesson-management/SingleLessonPreviewModal';
 11: import { ConfirmModal } from '../components/ConfirmModal';
 12: import { ArrowLeft, Plus, CheckCircle, Eye } from 'lucide-react';
 13: import { Loader } from '../components/Loader';
 14: import { Lesson } from '@domain/entities/Lesson';
 15: 
 16: export const LessonManagementPage: React.FC = () => {
 17:   const navigate = useNavigate();
 18:   const [confirmOpen, setConfirmOpen] = useState(false);
 19:   const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
 20: 
 21: 
 22:   const [selectedLessonForPreview, setSelectedLessonForPreview] = useState<Lesson | null>(null);
 23:   const [showSinglePreviewModal, setShowSinglePreviewModal] = useState(false);
 24: 
 25:   const { courseId } = useParams<{ courseId: string }>();
 26:   const {
 27:     course,
 28:     modules,
 29:     selectedModuleId,
 30:     setSelectedModuleId,
 31:     lessons,
 32:     isLoading,
 33:     showLessonModal,
 34:     setShowLessonModal,
 35:     isEditingLesson,
 36:     formLessonTitle,
 37:     setFormLessonTitle,
 38:     formLessonContent,
 39:     setFormLessonContent,
 40:     formLessonVideoUrl,
 41:     setFormLessonVideoUrl,
 42:     formLessonDurationMinutes,
 43:     setFormLessonDurationMinutes,
 44:     formLessonOrder,
 45:     setFormLessonOrder,
 46:     formLessonModule,
 47:     setFormLessonModule,
 48:     showModuleForm,
 49:     setShowModuleForm,
 50:     isEditingModule,
 51:     moduleTitle,
 52:     setModuleTitle,
 53:     moduleOrder,
 54:     setModuleOrder,
 55:     formLoading,
 56:     formError,
 57:     successMessage,
 58:     isAdmin,
 59:     handleOpenCreateModule,
 60:     handleOpenEditModule,
 61:     handleSaveModule,
 62:     handleDeleteModule,
 63:     handleOpenCreateLesson,
 64:     handleOpenEditLesson,
 65:     handleSaveLesson,
 66:     handleDeleteLesson,
 67:   } = useLessonManagement(courseId);
 68: 
 69:   return (
 70:     <Layout>
 71:       {}
 72:       <div className="mb-8">
 73:         <Link
 74:           to="/admin/courses"
 75:           className="inline-flex items-center gap-2 px-3.5 py-1.5 border-2 border-slate-950 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-extrabold text-xs uppercase tracking-wider shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2.5px_2.5px_0px_0px_#00b835] hover:bg-brand-400 hover:text-slate-950 dark:hover:bg-brand-400 dark:hover:text-slate-950 transition-all cursor-pointer mb-3"
 76:         >
 77:           <ArrowLeft className="h-4 w-4" />
 78:           <span>Volver a Gestión de Cursos</span>
 79:         </Link>
 80:         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
 81:           <div>
 82:             <span className="text-xs font-semibold uppercase tracking-wider text-[#00cc33] block">
 83:               Temario de Curso:
 84:             </span>
 85:             <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
 86:               {course?.title}
 87:             </h1>
 88:           </div>
 89: 
 90:           <div className="flex flex-wrap items-center gap-2.5 shrink-0">
 91:             {}
 92:             <button
 93:               type="button"
 94:               onClick={() => navigate(`/courses/${courseId}`)}
 95:               className="px-3.5 py-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-950 dark:text-white font-sans font-bold text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer inline-flex items-center gap-1.5"
 96:             >
 97:               <Eye className="h-4 w-4 text-emerald-500" />
 98:               <span>Vista Previa Estudiante</span>
 99:             </button>
100: 
101:             {}
102:             <button
103:               type="button"
104:               onClick={() => {
105:                 if (showModuleForm) {
106:                   setShowModuleForm(false);
107:                 } else {
108:                   handleOpenCreateModule();
109:                 }
110:               }}
111:               className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-950 dark:text-white font-sans font-bold text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer inline-flex items-center gap-1.5"
112:             >
113:               <Plus className="h-4 w-4" />
114:               <span>Nueva Sección (Módulo)</span>
115:             </button>
116: 
117:             {}
118:             <button
119:               type="button"
120:               onClick={handleOpenCreateLesson}
121:               disabled={modules.length === 0}
122:               className={`px-4 py-2 font-sans font-black text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] transition-all inline-flex items-center gap-2 ${
123:                 modules.length === 0
124:                   ? 'bg-slate-200 text-slate-400 border-slate-400 cursor-not-allowed opacity-60'
125:                   : 'bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 hover:translate-x-[-1px] hover:translate-y-[-1px] cursor-pointer'
126:               }`}
127:             >
128:               <Plus className="h-4.5 w-4.5" />
129:               <span>Crear Nuevo Tema</span>
130:             </button>
131:           </div>
132:         </div>
133:       </div>
134: 
135:       {successMessage && (
136:         <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-slate-950 p-4 text-xs font-black text-emerald-900 dark:text-emerald-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] mb-6">
137:           <CheckCircle className="h-5 w-5 text-[#00cc33] shrink-0" />
138:           <span>{successMessage}</span>
139:         </div>
140:       )}
141: 
142:       {}
143:       {showModuleForm && (
144:         <div className="bg-slate-100 dark:bg-slate-900 border-2 border-slate-950 p-6 mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#00b835]">
145:           <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-950 dark:text-white mb-4">
146:             {isEditingModule ? '✏️ Editar Sección (Módulo)' : '➕ Nueva Sección (Módulo)'}
147:           </h3>
148:           <form onSubmit={handleSaveModule} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
149:             <Input
150:               label="Título del Módulo *"
151:               type="text"
152:               placeholder="Ej: Módulo 1: Setup e Instalación de Entorno"
153:               value={moduleTitle}
154:               onChange={(e) => setModuleTitle(e.target.value)}
155:               required
156:             />
157:             <Input
158:               label="Orden *"
159:               type="number"
160:               placeholder="1"
161:               value={moduleOrder}
162:               onChange={(e) => setModuleOrder(e.target.value)}
163:               required
164:             />
165:             <div className="flex gap-2">
166:               <Button type="submit" isLoading={formLoading} className="flex-1">
167:                 {isEditingModule ? 'Actualizar Sección' : 'Guardar Sección'}
168:               </Button>
169:               <Button type="button" variant="outline" onClick={() => setShowModuleForm(false)} className="px-4">
170:                 Cancelar
171:               </Button>
172:             </div>
173:           </form>
174:         </div>
175:       )}
176: 
177:       {}
178:       {isLoading ? (
179:         <Loader />
180:       ) : (
181:         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
182:           <ModuleSidebar
183:             modules={modules}
184:             selectedModuleId={selectedModuleId}
185:             onSelect={setSelectedModuleId}
186:             onEditModule={handleOpenEditModule}
187:             onDeleteModule={handleDeleteModule}
188:           />
189:           <LessonsList
190:             lessons={lessons}
191:             selectedModuleId={selectedModuleId}
192:             isAdmin={isAdmin}
193:             onEdit={handleOpenEditLesson}
194:             onCreateLesson={handleOpenCreateLesson}
195:             onPreview={(lesId) => {
196:               const target = lessons.find((l) => l.id === lesId) || null;
197:               setSelectedLessonForPreview(target);
198:               setShowSinglePreviewModal(true);
199:             }}
200:             onDelete={(id) => {
201:               setDeleteTargetId(id);
202:               setConfirmOpen(true);
203:             }}
204:           />
205:         </div>
206:       )}
207: 
208:       {}
209:       <SingleLessonPreviewModal
210:         isOpen={showSinglePreviewModal}
211:         onClose={() => setShowSinglePreviewModal(false)}
212:         lesson={selectedLessonForPreview}
213:         moduleTitle={modules.find((m) => m.id === selectedLessonForPreview?.module)?.title}
214:         courseId={Number(courseId)}
215:         onLaunchFullPlayer={(lesId) => {
216:           setShowSinglePreviewModal(false);
217:           navigate(`/learn/${courseId}/lesson/${lesId}`);
218:         }}
219:       />
220: 
221:       {}
222:       <LessonModal
223:         isOpen={showLessonModal}
224:         isEditing={isEditingLesson}
225:         modules={modules}
226:         title={formLessonTitle}
227:         content={formLessonContent}
228:         videoUrl={formLessonVideoUrl}
229:         durationMinutes={formLessonDurationMinutes}
230:         order={formLessonOrder}
231:         moduleId={formLessonModule}
232:         loading={formLoading}
233:         error={formError}
234:         onTitleChange={setFormLessonTitle}
235:         onContentChange={setFormLessonContent}
236:         onVideoUrlChange={setFormLessonVideoUrl}
237:         onDurationMinutesChange={setFormLessonDurationMinutes}
238:         onOrderChange={setFormLessonOrder}
239:         onModuleChange={setFormLessonModule}
240:         onClose={() => setShowLessonModal(false)}
241:         onSubmit={handleSaveLesson}
242:       />
243: 
244:       <ConfirmModal
245:         isOpen={confirmOpen}
246:         title="¿Eliminar Tema?"
247:         message="¿Estás seguro de que deseas eliminar este tema? Esta acción no se puede deshacer."
248:         confirmText="Eliminar"
249:         cancelText="Cancelar"
250:         isDanger
251:         onConfirm={() => {
252:           if (deleteTargetId !== null) {
253:             handleDeleteLesson(deleteTargetId);
254:           }
255:           setConfirmOpen(false);
256:         }}
257:         onCancel={() => setConfirmOpen(false)}
258:       />
259:     </Layout>
260:   );
261: };
````

## File: src/presentation/pages/LoginPage.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { useNavigate, useLocation, Link } from 'react-router-dom';
  3: import { useAuthStore } from '../store/useAuthStore';
  4: import { Input } from '../components/Input';
  5: import { Button } from '../components/Button';
  6: import { Layout } from '../components/Layout';
  7: import { ShieldAlert, Eye, EyeOff, X } from 'lucide-react';
  8: import { Logo } from '../components/Logo';
  9: 
 10: export const LoginPage: React.FC = () => {
 11:   const { login, isLoading, error } = useAuthStore();
 12:   const navigate = useNavigate();
 13:   const location = useLocation();
 14:   const [username, setUsername] = useState('');
 15:   const [password, setPassword] = useState('');
 16:   const [showPassword, setShowPassword] = useState(false);
 17:   const [validationError, setValidationError] = useState<string | null>(null);
 18: 
 19:   const from = (location.state as any)?.from || '/dashboard';
 20: 
 21:   const handleSubmit = async (e: React.FormEvent) => {
 22:     e.preventDefault();
 23:     setValidationError(null);
 24: 
 25:     if (!username.trim() || !password.trim()) {
 26:       setValidationError('Por favor completa todos los campos');
 27:       return;
 28:     }
 29: 
 30:     try {
 31:       await login({ username, password });
 32:       navigate(from, { replace: true });
 33:     } catch (err) {
 34:       console.error('Login failed', err);
 35:     }
 36:   };
 37: 
 38:   return (
 39:     <Layout>
 40:       <div className="flex flex-1 items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
 41:         <div className="w-full max-w-5xl border-2 border-slate-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00b835] bg-white dark:bg-white transition-all duration-200 overflow-hidden">
 42:           {}
 43:           <div className="flex items-center justify-between px-4 py-1.5 bg-slate-100 dark:bg-slate-100 border-b-2 border-slate-950">
 44:             <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-700 font-mono">ONCOURSES.APP</span>
 45:             <div className="flex items-center gap-1.5" translate="no">
 46:               <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-slate-950 bg-white dark:bg-white select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">_</span>
 47:               <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-slate-950 bg-white dark:bg-white select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">+</span>
 48:               <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-slate-950 bg-white dark:bg-white select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" aria-label="Cerrar">
 49:                 <X className="h-3 w-3" />
 50:               </span>
 51:             </div>
 52:           </div>
 53: 
 54:           {}
 55:           <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
 56:             {}
 57:             <div className="lg:col-span-5 relative flex flex-col justify-between p-8 sm:p-10 bg-slate-950 text-white border-b-2 lg:border-b-0 lg:border-r-2 border-slate-950 overflow-hidden">
 58:               {}
 59:               <div className="animate-grid absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.20)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.12)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
 60: 
 61:               <div className="relative z-10">
 62:                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-400/10 border border-brand-400 text-brand-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
 63:                   <span>$ oncourses --login</span>
 64:                 </div>
 65: 
 66:                 <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-6">
 67:                   <Logo className="h-24 w-24 sm:h-28 sm:w-28 mb-6 drop-shadow-[0_0_25px_rgba(0,255,65,0.65)]" />
 68:                   <h1 className="font-display text-3xl font-extrabold tracking-tight text-white mb-2">
 69:                     Bienvenido de vuelta
 70:                   </h1>
 71:                   <p className="text-slate-400 text-sm leading-relaxed">
 72:                     Accede a tus cursos, continúa tu aprendizaje y pon a prueba tus habilidades de programación.
 73:                   </p>
 74:                 </div>
 75:               </div>
 76: 
 77:               {}
 78:               <div className="relative z-10 space-y-3 pt-6 border-t border-slate-800">
 79:                 <div className="flex items-center gap-3 p-2.5 bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
 80:                   <span className="w-6 h-6 flex items-center justify-center bg-brand-400 text-slate-950 border border-slate-950 font-bold">⚡</span>
 81:                   <span>Acceso directo a tus clases guardadas</span>
 82:                 </div>
 83:                 <div className="flex items-center gap-3 p-2.5 bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
 84:                   <span className="w-6 h-6 flex items-center justify-center bg-emerald-400 text-slate-950 border border-slate-950 font-bold">🎓</span>
 85:                   <span>Progresos y certificados al instante</span>
 86:                 </div>
 87:               </div>
 88:             </div>
 89: 
 90:             {}
 91:             <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white dark:bg-slate-900">
 92:               <div className="mb-6">
 93:                 <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
 94:                   Iniciar Sesión
 95:                 </h2>
 96:                 <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
 97:                   Ingresa tus credenciales para ingresar a tu cuenta
 98:                 </p>
 99:               </div>
100: 
101:               {(error || validationError) && (
102:                 <div className="flex items-start gap-2.5 bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500 p-3.5 text-xs text-rose-900 dark:text-rose-200 mb-6 shadow-[2px_2px_0px_0px_rgba(244,63,94,0.5)]">
103:                   <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
104:                   <div>
105:                     <span className="font-bold">Error al iniciar sesión:</span>
106:                     <p className="mt-0.5 font-medium leading-relaxed">{validationError || error}</p>
107:                   </div>
108:                 </div>
109:               )}
110: 
111:               <form onSubmit={handleSubmit} className="flex flex-col gap-5">
112:                 <Input
113:                   label="Nombre de Usuario"
114:                   type="text"
115:                   placeholder="Ingresa tu usuario"
116:                   value={username}
117:                   onChange={(e) => setUsername(e.target.value)}
118:                   autoComplete="username"
119:                   disabled={isLoading}
120:                 />
121: 
122:                 <div className="w-full flex flex-col gap-1.5 relative">
123:                   <label className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
124:                     Contraseña
125:                   </label>
126:                   <div className="relative">
127:                     <input
128:                       type={showPassword ? 'text' : 'password'}
129:                       placeholder="••••••••"
130:                       value={password}
131:                       onChange={(e) => setPassword(e.target.value)}
132:                       disabled={isLoading}
133:                       autoComplete="current-password"
134:                       className="w-full pl-4 pr-10 py-2.5 rounded-none border-2 border-slate-950 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] transition-all duration-200 outline-none focus:border-[#00cc33] focus:shadow-[0_0_12px_rgba(0,255,65,0.65),2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[0_0_16px_rgba(0,255,65,0.85),2px_2px_0px_0px_#00b835] disabled:opacity-50 text-sm font-medium"
135:                     />
136:                     <button
137:                       type="button"
138:                       onClick={() => setShowPassword(!showPassword)}
139:                       disabled={isLoading}
140:                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
141:                     >
142:                       {showPassword ? (
143:                         <EyeOff className="h-5 w-5" />
144:                       ) : (
145:                         <Eye className="h-5 w-5" />
146:                       )}
147:                     </button>
148:                   </div>
149:                 </div>
150: 
151:                 <Button
152:                   type="submit"
153:                   isLoading={isLoading}
154:                   className="w-full mt-3 py-3.5 border-2 border-slate-950 font-black text-sm uppercase tracking-wider bg-brand-400 hover:bg-brand-300 text-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#00b835] transition-all cursor-pointer"
155:                 >
156:                   Ingresar a la Plataforma
157:                 </Button>
158:               </form>
159: 
160:               <p className="mt-8 text-center text-sm font-medium text-slate-600 dark:text-slate-600">
161:                 ¿Aún no tienes cuenta?{' '}
162:                 <Link to="/register" className="font-bold text-brand-600 dark:text-brand-600 hover:underline">
163:                   Regístrate gratis aquí
164:                 </Link>
165:               </p>
166:             </div>
167:           </div>
168:         </div>
169:       </div>
170:     </Layout>
171:   );
172: };
````

## File: src/presentation/pages/LessonPlayerPage.tsx
````typescript
  1: import React, { useEffect, useState } from 'react';
  2: import { useParams, useNavigate, Link } from 'react-router-dom';
  3: import { getCourseByIdUseCase } from '@infrastructure/factories/CourseFactory';
  4: import { getModulesUseCase } from '@infrastructure/factories/ModuleFactory';
  5: import { getLessonsUseCase } from '@infrastructure/factories/LessonFactory';
  6: import {
  7:   getLessonProgressUseCase,
  8:   markLessonAsCompletedUseCase,
  9: } from '@infrastructure/factories/LessonProgressFactory';
 10: import { Course } from '@domain/entities/Course';
 11: import { Lesson } from '@domain/entities/Lesson';
 12: import { GraduationCap, ArrowLeft, CheckCircle, ChevronRight, Play, BookOpen, CheckSquare } from 'lucide-react';
 13: import { Loader } from '../components/Loader';
 14: import { Button } from '../components/Button';
 15: import { useAuthStore } from '../store/useAuthStore';
 16: import { getEmbedVideoUrl } from '../utils/sanitize-url';
 17: import { MarkdownRenderer } from '../components/MarkdownRenderer';
 18: 
 19: export const LessonPlayerPage: React.FC = () => {
 20:   const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
 21:   const navigate = useNavigate();
 22:   const { user } = useAuthStore();
 23: 
 24:   const isAdminOrProfessor = user?.role === 'admin' || user?.role === 'professor';
 25:   const backTarget = isAdminOrProfessor ? `/admin/courses/${courseId}/lessons` : '/dashboard';
 26: 
 27:   const [course, setCourse] = useState<Course | null>(null);
 28:   const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
 29:   const [isLoading, setIsLoading] = useState(true);
 30:   const [isCompleting, setIsCompleting] = useState(false);
 31:   const [completedLessons, setCompletedLessons] = useState<Record<number, boolean>>({});
 32: 
 33:   const idCourse = Number(courseId);
 34:   const idLesson = Number(lessonId);
 35: 
 36:   useEffect(() => {
 37:     const loadCourseData = async () => {
 38:       setIsLoading(true);
 39:       try {
 40:         const courseData = await getCourseByIdUseCase.execute(idCourse);
 41: 
 42: 
 43:         try {
 44:           const modulesData = await getModulesUseCase.execute(idCourse);
 45:           if (modulesData && modulesData.length > 0) {
 46:             const modulesWithLessons = await Promise.all(
 47:               modulesData.map(async (mod) => {
 48:                 try {
 49:                   const modLessons = await getLessonsUseCase.execute(mod.id);
 50:                   modLessons.sort((a, b) => a.order - b.order);
 51:                   return {
 52:                     ...mod,
 53:                     lessons: modLessons || [],
 54:                   };
 55:                 } catch {
 56:                   return {
 57:                     ...mod,
 58:                     lessons: mod.lessons || [],
 59:                   };
 60:                 }
 61:               })
 62:             );
 63:             courseData.modules = modulesWithLessons;
 64:           }
 65:         } catch (modErr) {
 66:           console.warn('Could not fetch modules/lessons in player', modErr);
 67:         }
 68: 
 69:         setCourse(courseData);
 70: 
 71: 
 72:         let foundLesson: Lesson | null = null;
 73:         courseData.modules?.forEach((mod) => {
 74:           mod.lessons?.forEach((les) => {
 75:             if (les.id === idLesson) {
 76:               foundLesson = les;
 77:             }
 78:           });
 79:         });
 80: 
 81:         if (!foundLesson && courseData.modules?.[0]?.lessons?.[0]) {
 82:           foundLesson = courseData.modules[0].lessons[0];
 83:         }
 84:         setCurrentLesson(foundLesson);
 85: 
 86: 
 87:         const completedMap: Record<number, boolean> = {};
 88:         try {
 89:           const progressList = await getLessonProgressUseCase.execute(idCourse);
 90:           if (Array.isArray(progressList)) {
 91:             progressList.forEach((prog: any) => {
 92:               if (prog.is_completed) {
 93:                 completedMap[prog.lesson] = true;
 94:               }
 95:             });
 96:           }
 97:         } catch {
 98: 
 99:         }
100: 
101: 
102:         try {
103:           const userKey = user?.username?.toLowerCase() || String(user?.id);
104:           const cachedCompleted = JSON.parse(
105:             localStorage.getItem(`oncourses_completed_lessons_${userKey}_${idCourse}`) || '{}'
106:           );
107:           Object.keys(cachedCompleted).forEach((lesId) => {
108:             if (cachedCompleted[Number(lesId)]) {
109:               completedMap[Number(lesId)] = true;
110:             }
111:           });
112:         } catch {
113: 
114:         }
115: 
116:         setCompletedLessons(completedMap);
117:       } catch (err) {
118:         console.error('Failed to load course detail or progress', err);
119:       } finally {
120:         setIsLoading(false);
121:       }
122:     };
123: 
124:     loadCourseData();
125:   }, [idCourse, idLesson, user]);
126: 
127:   const handleMarkAsCompleted = async () => {
128:     if (!currentLesson) return;
129:     setIsCompleting(true);
130:     try {
131:       try {
132:         await markLessonAsCompletedUseCase.execute(currentLesson.id);
133:       } catch (apiErr) {
134:         console.warn('API mark as completed error, updating local cache', apiErr);
135:       }
136: 
137: 
138:       const updatedCompletedMap = { ...completedLessons, [currentLesson.id]: true };
139:       setCompletedLessons(updatedCompletedMap);
140: 
141: 
142:       const allLessons: Lesson[] = [];
143:       course?.modules?.forEach((m) => {
144:         if (m.lessons) {
145:           allLessons.push(...m.lessons);
146:         }
147:       });
148: 
149:       const totalLessonsCount = allLessons.length;
150:       const completedCount = Object.keys(updatedCompletedMap).filter((k) => updatedCompletedMap[Number(k)]).length;
151:       const calculatedProgress = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 100;
152: 
153: 
154:       try {
155:         const userKey = user?.username?.toLowerCase() || String(user?.id);
156: 
157: 
158:         localStorage.setItem(
159:           `oncourses_completed_lessons_${userKey}_${idCourse}`,
160:           JSON.stringify(updatedCompletedMap)
161:         );
162: 
163: 
164:         const storedCache = JSON.parse(localStorage.getItem('oncourses_user_enrollments') || '{}');
165:         const userEnrollments = storedCache[userKey] || [];
166: 
167:         const existingEnr = userEnrollments.find(
168:           (e: any) => Number(e.course) === Number(idCourse) || Number(e.course_data?.id) === Number(idCourse)
169:         );
170: 
171:         if (existingEnr) {
172:           existingEnr.total_progress = String(calculatedProgress);
173:         } else {
174:           userEnrollments.push({
175:             id: Date.now(),
176:             student: user?.id,
177:             course: idCourse,
178:             course_title: course?.title,
179:             enrolled_at: new Date().toISOString(),
180:             total_progress: String(calculatedProgress),
181:             course_data: course,
182:           });
183:         }
184: 
185:         storedCache[userKey] = userEnrollments;
186:         localStorage.setItem('oncourses_user_enrollments', JSON.stringify(storedCache));
187:       } catch (saveErr) {
188:         console.warn('Could not save progress cache', saveErr);
189:       }
190: 
191: 
192:       let nextLesson: Lesson | null = null;
193:       let foundCurrent = false;
194: 
195:       if (course?.modules) {
196:         for (const mod of course.modules) {
197:           if (mod.lessons) {
198:             for (const les of mod.lessons) {
199:               if (foundCurrent) {
200:                 nextLesson = les;
201:                 break;
202:               }
203:               if (les.id === currentLesson.id) {
204:                 foundCurrent = true;
205:               }
206:             }
207:           }
208:           if (nextLesson) break;
209:         }
210:       }
211: 
212:       if (nextLesson) {
213:         navigate(`/learn/${idCourse}/lesson/${nextLesson.id}`);
214:       } else {
215:         alert('🎉 ¡Has completado todas las lecciones de este curso! ¡Felicidades!');
216:         navigate('/dashboard');
217:       }
218:     } catch (err: any) {
219:       alert(err.message || 'Error al guardar el progreso');
220:     } finally {
221:       setIsCompleting(false);
222:     }
223:   };
224: 
225:   if (isLoading) return <Loader fullScreen />;
226: 
227:   if (!course || !currentLesson) {
228:     return (
229:       <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
230:         <div className="text-center max-w-sm">
231:           <GraduationCap className="h-12 w-12 text-rose-500 mx-auto mb-4" />
232:           <h2 className="text-lg font-bold text-slate-800 dark:text-white">Lección no encontrada</h2>
233:           <p className="text-slate-500 mt-2">La lección seleccionada no existe o no tienes acceso.</p>
234:           <Link to="/dashboard" className="inline-block mt-6">
235:             <Button>Volver a mis cursos</Button>
236:           </Link>
237:         </div>
238:       </div>
239:     );
240:   }
241: 
242:   const isCurrentCompleted = !!completedLessons[currentLesson.id];
243: 
244:   return (
245:     <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-800 dark:text-slate-100">
246:       {}
247:       <aside className="w-80 border-r border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 flex flex-col h-full shrink-0">
248:         <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
249:           <Link
250:             to={backTarget}
251:             className="p-2 border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-brand-400 hover:text-slate-950 transition-all cursor-pointer shrink-0"
252:             title={isAdminOrProfessor ? 'Volver a Gestión del Temario' : 'Volver a Mi Panel'}
253:           >
254:             <ArrowLeft className="h-4 w-4" />
255:           </Link>
256:           <div>
257:             <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-500 line-clamp-1">
258:               {course.title}
259:             </h4>
260:             <span className="text-xs text-slate-400">Progreso del Tutorial</span>
261:           </div>
262:         </div>
263: 
264:         <div className="flex-1 overflow-y-auto p-4 space-y-4">
265:           {course.modules?.map((mod, index) => (
266:             <div key={mod.id} className="space-y-1.5">
267:               <h5 className="text-xs font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider px-2">
268:                 Sección {index + 1}: {mod.title}
269:               </h5>
270:               <div className="space-y-1">
271:                 {mod.lessons?.map((les) => {
272:                   const isLesActive = les.id === currentLesson.id;
273:                   const isLesCompleted = !!completedLessons[les.id];
274: 
275:                   return (
276:                     <button
277:                       key={les.id}
278:                       onClick={() => navigate(`/learn/${idCourse}/lesson/${les.id}`)}
279:                       className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-xs font-medium cursor-pointer ${
280:                         isLesActive
281:                           ? 'bg-brand-50 dark:bg-brand-950/30 text-brand-650 dark:text-brand-400 font-semibold border border-brand-500/25'
282:                           : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-655 dark:text-slate-400'
283:                       }`}
284:                     >
285:                       <div className="flex items-center gap-2.5 truncate">
286:                         <div
287:                           className={`h-2.5 w-2.5 rounded-full shrink-0 ${
288:                             isLesCompleted ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
289:                           }`}
290:                         />
291:                         <span className="truncate">{les.title}</span>
292:                       </div>
293:                       <ChevronRight className="h-3 w-3 opacity-50 shrink-0" />
294:                     </button>
295:                   );
296:                 })}
297:               </div>
298:             </div>
299:           ))}
300:         </div>
301:       </aside>
302: 
303:       {}
304:       <main className="flex-1 flex flex-col h-full overflow-hidden">
305:         {}
306:         <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between shadow-sm">
307:           <div className="flex items-center gap-2">
308:             <BookOpen className="h-5 w-5 text-brand-500" />
309:             <span className="text-sm font-semibold text-slate-500">Tutorial Actual:</span>
310:             <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{currentLesson.title}</span>
311:           </div>
312: 
313:           <div className="flex items-center gap-4">
314:             <Link to={backTarget}>
315:               <Button size="sm" variant="secondary">Cerrar Reproductor</Button>
316:             </Link>
317:           </div>
318:         </header>
319: 
320:         {}
321:         <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
322:           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-3xl p-8 shadow-sm">
323:             <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8 flex justify-between items-center">
324:               <div>
325:                 <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
326:                   {currentLesson.title}
327:                 </h1>
328:                 <p className="text-xs text-slate-400">
329:                   Completa las lecturas y guías de este tema para poder continuar.
330:                 </p>
331:               </div>
332: 
333:               {isCurrentCompleted && (
334:                 <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-500/20 rounded-xl text-xs font-semibold">
335:                   <CheckCircle className="h-4 w-4" />
336:                   <span>Completado</span>
337:                 </div>
338:               )}
339:             </div>
340: 
341:             {}
342:             {(() => {
343:               const { isDirectVideo, embedUrl } = getEmbedVideoUrl(currentLesson.video_url);
344:               return (
345:                 <div className="mb-8 overflow-hidden border-2 border-slate-950 bg-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835]">
346:                   <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b-2 border-slate-950 text-xs font-mono font-bold text-brand-400">
347:                     <div className="flex items-center gap-2">
348:                       <Play className="h-4 w-4 fill-current text-brand-400" />
349:                       <span>REPRODUCTOR DE VIDEO HTML5 · ONCOURSES</span>
350:                     </div>
351:                     <span className="text-[10px] text-slate-400">REPRODUCCIÓN DIRECTA MP4 / HD</span>
352:                   </div>
353:                   <div className="relative aspect-video bg-black flex items-center justify-center">
354:                     {isDirectVideo ? (
355:                       <video
356:                         key={embedUrl}
357:                         src={embedUrl}
358:                         controls
359:                         playsInline
360:                         preload="metadata"
361:                         className="w-full h-full object-contain focus:outline-none"
362:                       >
363:                         Tu navegador no soporta reproducción directa de video HTML5.
364:                       </video>
365:                     ) : (
366:                       <iframe
367:                         src={embedUrl}
368:                         title={currentLesson.title}
369:                         className="w-full h-full border-0"
370:                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
371:                         allowFullScreen
372:                       />
373:                     )}
374:                   </div>
375:                 </div>
376:               );
377:             })()}
378:             {}
379:             <article className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
380:               {currentLesson.content_text ? (
381:                 <MarkdownRenderer content={currentLesson.content_text} />
382:               ) : (
383:                 <div className="p-8 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl text-center text-slate-400 text-sm">
384:                   Este tema no incluye material de lectura estático. Por favor consulta las referencias externas.
385:                 </div>
386:               )}
387:             </article>
388: 
389:             {}
390:             <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
391:               <div className="text-xs text-slate-400 max-w-sm text-center sm:text-left">
392:                 * Al hacer clic en completar se guardará tu registro de avance en la base de datos de Django.
393:               </div>
394: 
395:               <Button
396:                 onClick={handleMarkAsCompleted}
397:                 isLoading={isCompleting}
398:                 disabled={isCurrentCompleted}
399:                 className={`w-full sm:w-auto flex items-center gap-2 px-6 ${
400:                   isCurrentCompleted ? 'from-emerald-600 to-emerald-600 shadow-emerald-500/10' : ''
401:                 }`}
402:               >
403:                 <CheckSquare className="h-5 w-5" />
404:                 {isCurrentCompleted ? 'Tema Completado' : 'Marcar como Completado'}
405:               </Button>
406:             </div>
407:           </div>
408:         </div>
409:       </main>
410:     </div>
411:   );
412: };
````

## File: src/presentation/pages/RegisterPage.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { useNavigate, Link } from 'react-router-dom';
  3: import { authRepositoryInstance } from '@infrastructure/factories/AuthFactory';
  4: import { Input } from '../components/Input';
  5: import { Button } from '../components/Button';
  6: import { Layout } from '../components/Layout';
  7: import { ShieldAlert, CheckCircle, Eye, EyeOff, X } from 'lucide-react';
  8: import { Logo } from '../components/Logo';
  9: 
 10: const LATAM_COUNTRIES = [
 11:   { code: '+593', name: 'Ecuador', iso: 'ec', placeholder: '099 999 9999', format: 'XXX XXX XXXX' },
 12:   { code: '+57', name: 'Colombia', iso: 'co', placeholder: '300 123 4567', format: 'XXX XXX XXXX' },
 13:   { code: '+51', name: 'Perú', iso: 'pe', placeholder: '999 999 999', format: 'XXX XXX XXX' },
 14:   { code: '+54', name: 'Argentina', iso: 'ar', placeholder: '11 1234 5678', format: 'XX XXXX XXXX' },
 15:   { code: '+55', name: 'Brasil', iso: 'br', placeholder: '11 91234 5678', format: 'XX XXXXX XXXX' },
 16:   { code: '+56', name: 'Chile', iso: 'cl', placeholder: '9 1234 5678', format: 'X XXXX XXXX' },
 17:   { code: '+52', name: 'México', iso: 'mx', placeholder: '55 1234 5678', format: 'XX XXXX XXXX' },
 18:   { code: '+58', name: 'Venezuela', iso: 've', placeholder: '412 123 4567', format: 'XXX XXX XXXX' },
 19:   { code: '+591', name: 'Bolivia', iso: 'bo', placeholder: '7000 1234', format: 'XXXX XXXX' },
 20:   { code: '+595', name: 'Paraguay', iso: 'py', placeholder: '981 123 456', format: 'XXX XXX XXX' },
 21:   { code: '+598', name: 'Uruguay', iso: 'uy', placeholder: '099 123 456', format: 'XXX XXX XXX' },
 22:   { code: '+506', name: 'Costa Rica', iso: 'cr', placeholder: '8888 8888', format: 'XXXX XXXX' },
 23:   { code: '+507', name: 'Panamá', iso: 'pa', placeholder: '6666 6666', format: 'XXXX XXXX' },
 24:   { code: '+502', name: 'Guatemala', iso: 'gt', placeholder: '5555 5555', format: 'XXXX XXXX' },
 25:   { code: '+504', name: 'Honduras', iso: 'hn', placeholder: '9999 9999', format: 'XXXX XXXX' },
 26:   { code: '+503', name: 'El Salvador', iso: 'sv', placeholder: '7777 7777', format: 'XXXX XXXX' },
 27:   { code: '+505', name: 'Nicaragua', iso: 'ni', placeholder: '8888 8888', format: 'XXXX XXXX' },
 28:   { code: '+53', name: 'Cuba', iso: 'cu', placeholder: '5 1234567', format: 'X XXXXXXX' },
 29:   { code: '+1', name: 'República Dominicana', iso: 'do', placeholder: '809 123 4567', format: 'XXX XXX XXXX' }
 30: ];
 31: 
 32: const applyPhoneMask = (value: string, mask: string) => {
 33:   const digits = value.replace(/\D/g, '');
 34:   let formatted = '';
 35:   let digitIndex = 0;
 36:   for (let i = 0; i < mask.length; i++) {
 37:     if (digitIndex >= digits.length) break;
 38:     if (mask[i] === 'X') {
 39:       formatted += digits[digitIndex];
 40:       digitIndex++;
 41:     } else {
 42:       formatted += mask[i];
 43:     }
 44:   }
 45:   return formatted;
 46: };
 47: 
 48: export const RegisterPage: React.FC = () => {
 49:   const navigate = useNavigate();
 50:   const [username, setUsername] = useState('');
 51:   const [email, setEmail] = useState('');
 52:   const [firstName, setFirstName] = useState('');
 53:   const [lastName, setLastName] = useState('');
 54:   const [phoneLocal, setPhoneLocal] = useState('');
 55:   const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
 56:   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 57:   const [password, setPassword] = useState('');
 58:   const [confirmPassword, setConfirmPassword] = useState('');
 59:   const [showPassword, setShowPassword] = useState(false);
 60:   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 61: 
 62:   const [isLoading, setIsLoading] = useState(false);
 63:   const [error, setError] = useState<string | null>(null);
 64:   const [isSuccess, setIsSuccess] = useState(false);
 65: 
 66:   const handleSubmit = async (e: React.FormEvent) => {
 67:     e.preventDefault();
 68:     setError(null);
 69: 
 70:     if (!username.trim() || !email.trim() || !password.trim()) {
 71:       setError('Por favor completa los campos obligatorios (*)');
 72:       return;
 73:     }
 74: 
 75:     if (password !== confirmPassword) {
 76:       setError('Las contraseñas no coinciden');
 77:       return;
 78:     }
 79: 
 80:     setIsLoading(true);
 81:     try {
 82:       const selectedCountry = LATAM_COUNTRIES[selectedCountryIndex];
 83:       const formattedPhone = phoneLocal.trim()
 84:         ? `${selectedCountry.code} ${applyPhoneMask(phoneLocal, selectedCountry.format)}`
 85:         : `${selectedCountry.code} 099 123 4567`;
 86: 
 87:       const userProfileCache = {
 88:         username,
 89:         email,
 90:         first_name: firstName,
 91:         last_name: lastName,
 92:         phone: formattedPhone,
 93:         country: selectedCountry.name || 'Ecuador',
 94:       };
 95: 
 96:       try {
 97:         const stored = JSON.parse(localStorage.getItem('oncourses_registered_users') || '{}');
 98:         stored[username.toLowerCase()] = userProfileCache;
 99:         stored[email.toLowerCase()] = userProfileCache;
100:         localStorage.setItem('oncourses_registered_users', JSON.stringify(stored));
101:       } catch (e) {
102:         console.warn('Failed to cache profile meta', e);
103:       }
104: 
105:       await authRepositoryInstance.register({
106:         username,
107:         email,
108:         password,
109:         password_confirm: confirmPassword,
110:         first_name: firstName,
111:         last_name: lastName,
112:         phone: formattedPhone,
113:       });
114:       setIsSuccess(true);
115:       setTimeout(() => {
116:         navigate('/login');
117:       }, 3000);
118:     } catch (err: any) {
119:       setError(err.message || 'Error al registrar la cuenta');
120:     } finally {
121:       setIsLoading(false);
122:     }
123:   };
124: 
125:   return (
126:     <Layout>
127:       <div className="flex flex-1 items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
128:         <div className="w-full max-w-6xl border-2 border-slate-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#00b835] bg-white dark:bg-white transition-all duration-200 overflow-hidden">
129:           {}
130:           <div className="flex items-center justify-between px-4 py-1.5 bg-slate-100 dark:bg-slate-100 border-b-2 border-slate-950">
131:             <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-700 font-mono">ONCOURSES.APP</span>
132:             <div className="flex items-center gap-1.5" translate="no">
133:               <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-slate-950 bg-white dark:bg-white select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">_</span>
134:               <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-slate-950 bg-white dark:bg-white select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">+</span>
135:               <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-slate-950 bg-white dark:bg-white select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" aria-label="Cerrar">
136:                 <X className="h-3 w-3" />
137:               </span>
138:             </div>
139:           </div>
140: 
141:           {}
142:           <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
143:             {}
144:             <div className="lg:col-span-5 relative flex flex-col justify-between p-8 sm:p-10 bg-slate-950 text-white border-b-2 lg:border-b-0 lg:border-r-2 border-slate-950 overflow-hidden">
145:               {}
146:               <div className="animate-grid absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.20)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.12)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
147: 
148:               <div className="relative z-10">
149:                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-400/10 border border-brand-400 text-brand-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
150:                   <span>$ oncourses --register</span>
151:                 </div>
152: 
153:                 <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-6">
154:                   <Logo className="h-24 w-24 sm:h-28 sm:w-28 mb-6 drop-shadow-[0_0_25px_rgba(0,255,65,0.65)]" />
155:                   <h1 className="font-display text-3xl font-extrabold tracking-tight text-white mb-2">
156:                     Comienza tu Carrera DEV
157:                   </h1>
158:                   <p className="text-slate-400 text-sm leading-relaxed">
159:                     Forma parte de la plataforma interactiva de aprendizaje de programación más dinámica.
160:                   </p>
161:                 </div>
162:               </div>
163: 
164:               {}
165:               <div className="relative z-10 space-y-3 pt-6 border-t border-slate-800">
166:                 <div className="flex items-center gap-3 p-2.5 bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
167:                   <span className="w-6 h-6 flex items-center justify-center bg-brand-400 text-slate-950 border border-slate-950 font-bold">💻</span>
168:                   <span>+50 Cursos interactivos desde cero</span>
169:                 </div>
170:                 <div className="flex items-center gap-3 p-2.5 bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
171:                   <span className="w-6 h-6 flex items-center justify-center bg-emerald-400 text-slate-950 border border-slate-950 font-bold">🛡️</span>
172:                   <span>Proyectos reales de portafolio</span>
173:                 </div>
174:                 <div className="flex items-center gap-3 p-2.5 bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
175:                   <span className="w-6 h-6 flex items-center justify-center bg-amber-400 text-slate-950 border border-slate-950 font-bold">⚡</span>
176:                   <span>Acceso a la comunidad DEV 24/7</span>
177:                 </div>
178:               </div>
179:             </div>
180: 
181:             {}
182:             <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white dark:bg-slate-900">
183:               <div className="mb-6">
184:                 <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
185:                   Crea tu Cuenta
186:                 </h2>
187:                 <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
188:                   Únete gratis a OnCourses hoy mismo
189:                 </p>
190:               </div>
191: 
192:               {isSuccess && (
193:                 <div className="flex items-start gap-2.5 bg-emerald-50 dark:bg-emerald-50 border-2 border-emerald-500 p-3.5 text-xs text-emerald-900 dark:text-emerald-900 mb-6 shadow-[2px_2px_0px_0px_rgba(16,185,129,0.5)]">
194:                   <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-600" />
195:                   <div>
196:                     <span className="font-bold">¡Registro Exitoso!</span>
197:                     <p className="mt-0.5 font-medium leading-relaxed">
198:                       Tu cuenta ha sido creada correctamente. Te redirigiremos al login en unos segundos...
199:                     </p>
200:                   </div>
201:                 </div>
202:               )}
203: 
204:               {error && (
205:                 <div className="flex items-start gap-2.5 bg-rose-50 dark:bg-rose-50 border-2 border-rose-500 p-3.5 text-xs text-rose-900 dark:text-rose-900 mb-6 shadow-[2px_2px_0px_0px_rgba(244,63,94,0.5)]">
206:                   <ShieldAlert className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-600" />
207:                   <div>
208:                     <span className="font-bold">Error al registrarse:</span>
209:                     <p className="mt-0.5 font-medium leading-relaxed">{error}</p>
210:                   </div>
211:                 </div>
212:               )}
213: 
214:               <form onSubmit={handleSubmit} className="flex flex-col gap-4">
215:                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
216:                   <Input
217:                     label="Nombre de Usuario *"
218:                     type="text"
219:                     placeholder="usuario123"
220:                     value={username}
221:                     onChange={(e) => setUsername(e.target.value)}
222:                     disabled={isLoading || isSuccess}
223:                   />
224:                   <Input
225:                     label="Correo Electrónico *"
226:                     type="email"
227:                     placeholder="correo@ejemplo.com"
228:                     value={email}
229:                     onChange={(e) => setEmail(e.target.value)}
230:                     disabled={isLoading || isSuccess}
231:                   />
232:                 </div>
233: 
234:                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
235:                   <Input
236:                     label="Nombre"
237:                     type="text"
238:                     placeholder="Juan"
239:                     value={firstName}
240:                     onChange={(e) => setFirstName(e.target.value)}
241:                     disabled={isLoading || isSuccess}
242:                   />
243:                   <Input
244:                     label="Apellidos"
245:                     type="text"
246:                     placeholder="Pérez"
247:                     value={lastName}
248:                     onChange={(e) => setLastName(e.target.value)}
249:                     disabled={isLoading || isSuccess}
250:                   />
251:                 </div>
252: 
253:                 {}
254:                 <div className="w-full flex flex-col gap-1.5">
255:                   <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-800">
256:                     Teléfono
257:                   </label>
258:                   <div className="flex gap-2">
259:                     <div className="relative">
260:                       <button
261:                         type="button"
262:                         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
263:                         disabled={isLoading || isSuccess}
264:                         className="flex items-center justify-between gap-2 h-[44px] px-3 rounded-none border-2 border-slate-950 dark:border-slate-950 bg-white dark:bg-white text-slate-950 dark:text-slate-950 outline-none text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] transition-all duration-200 focus:border-brand-500 focus:shadow-[0_0_12px_rgba(0,255,65,0.65),2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[0_0_16px_rgba(0,255,65,0.85),2px_2px_0px_0px_#00b835] min-w-[110px] disabled:opacity-50 cursor-pointer"
265:                       >
266:                         <div className="flex items-center gap-1.5">
267:                           <img
268:                             src={`https://flagcdn.com/w40/${LATAM_COUNTRIES[selectedCountryIndex].iso}.png`}
269:                             alt={LATAM_COUNTRIES[selectedCountryIndex].name}
270:                             className="w-5 h-3.5 object-cover border border-slate-950 shadow-sm"
271:                           />
272:                           <span>{LATAM_COUNTRIES[selectedCountryIndex].code}</span>
273:                         </div>
274:                         <span className="text-xs text-slate-500">▼</span>
275:                       </button>
276: 
277:                       {isDropdownOpen && (
278:                         <>
279:                           <div
280:                             className="fixed inset-0 z-40"
281:                             onClick={() => setIsDropdownOpen(false)}
282:                           />
283:                           <div className="absolute left-0 mt-1.5 w-60 max-h-60 overflow-y-auto border-2 border-slate-950 dark:border-slate-950 bg-white dark:bg-white p-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] z-50 scrollbar-thin">
284:                             {LATAM_COUNTRIES.map((c, index) => (
285:                               <button
286:                                 key={c.code}
287:                                 type="button"
288:                                 onClick={() => {
289:                                   setSelectedCountryIndex(index);
290:                                   setIsDropdownOpen(false);
291:                                   setPhoneLocal((prev) => {
292:                                     const digits = prev.replace(/\D/g, '');
293:                                     return applyPhoneMask(digits, c.format);
294:                                   });
295:                                 }}
296:                                 className="w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-100 text-slate-950 dark:text-slate-950 transition-colors text-sm font-medium cursor-pointer"
297:                               >
298:                                 <img
299:                                   src={`https://flagcdn.com/w40/${c.iso}.png`}
300:                                   alt={c.name}
301:                                   className="w-5 h-3.5 object-cover border border-slate-950 shadow-sm"
302:                                 />
303:                                 <span className="font-bold">{c.code}</span>
304:                                 <span className="text-xs text-slate-500 truncate">({c.name})</span>
305:                               </button>
306:                             ))}
307:                           </div>
308:                         </>
309:                       )}
310:                     </div>
311: 
312:                     <input
313:                       type="text"
314:                       placeholder={LATAM_COUNTRIES[selectedCountryIndex].placeholder}
315:                       value={phoneLocal}
316:                       onChange={(e) => {
317:                         const formatted = applyPhoneMask(e.target.value, LATAM_COUNTRIES[selectedCountryIndex].format);
318:                         setPhoneLocal(formatted);
319:                       }}
320:                       disabled={isLoading || isSuccess}
321:                       className="flex-1 px-4 py-2.5 rounded-none border-2 border-slate-950 dark:border-slate-950 bg-white dark:bg-white text-slate-950 dark:text-slate-950 placeholder-slate-400 dark:placeholder-slate-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] transition-all duration-200 outline-none focus:border-brand-500 focus:shadow-[0_0_12px_rgba(0,255,65,0.65),2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[0_0_16px_rgba(0,255,65,0.85),2px_2px_0px_0px_#00b835] disabled:opacity-50 text-sm font-medium"
322:                     />
323:                   </div>
324:                 </div>
325: 
326:                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
327:                   <div className="w-full flex flex-col gap-1.5 relative">
328:                     <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-800">
329:                       Contraseña *
330:                     </label>
331:                     <div className="relative">
332:                       <input
333:                         type={showPassword ? 'text' : 'password'}
334:                         placeholder="••••••••"
335:                         value={password}
336:                         onChange={(e) => setPassword(e.target.value)}
337:                         disabled={isLoading || isSuccess}
338:                         className="w-full pl-4 pr-10 py-2.5 rounded-none border-2 border-slate-950 dark:border-slate-950 bg-white dark:bg-white text-slate-950 dark:text-slate-950 placeholder-slate-400 dark:placeholder-slate-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] transition-all duration-200 outline-none focus:border-brand-500 focus:shadow-[0_0_12px_rgba(0,255,65,0.65),2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[0_0_16px_rgba(0,255,65,0.85),2px_2px_0px_0px_#00b835] disabled:opacity-50 text-sm font-medium"
339:                       />
340:                       <button
341:                         type="button"
342:                         onClick={() => setShowPassword(!showPassword)}
343:                         disabled={isLoading || isSuccess}
344:                         className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-500 hover:text-slate-950 dark:hover:text-slate-950 transition-colors cursor-pointer"
345:                       >
346:                         {showPassword ? (
347:                           <EyeOff className="h-5 w-5" />
348:                         ) : (
349:                           <Eye className="h-5 w-5" />
350:                         )}
351:                       </button>
352:                     </div>
353:                   </div>
354: 
355:                   <div className="w-full flex flex-col gap-1.5 relative">
356:                     <label className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-800">
357:                       Confirmar Contraseña *
358:                     </label>
359:                     <div className="relative">
360:                       <input
361:                         type={showConfirmPassword ? 'text' : 'password'}
362:                         placeholder="••••••••"
363:                         value={confirmPassword}
364:                         onChange={(e) => setConfirmPassword(e.target.value)}
365:                         disabled={isLoading || isSuccess}
366:                         className="w-full pl-4 pr-10 py-2.5 rounded-none border-2 border-slate-950 dark:border-slate-950 bg-white dark:bg-white text-slate-950 dark:text-slate-950 placeholder-slate-400 dark:placeholder-slate-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] transition-all duration-200 outline-none focus:border-brand-500 focus:shadow-[0_0_12px_rgba(0,255,65,0.65),2px_2px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[0_0_16px_rgba(0,255,65,0.85),2px_2px_0px_0px_#00b835] disabled:opacity-50 text-sm font-medium"
367:                       />
368:                       <button
369:                         type="button"
370:                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
371:                         disabled={isLoading || isSuccess}
372:                         className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-500 hover:text-slate-950 dark:hover:text-slate-950 transition-colors cursor-pointer"
373:                       >
374:                         {showConfirmPassword ? (
375:                           <EyeOff className="h-5 w-5" />
376:                         ) : (
377:                           <Eye className="h-5 w-5" />
378:                         )}
379:                       </button>
380:                     </div>
381:                   </div>
382:                 </div>
383: 
384:                 <Button
385:                   type="submit"
386:                   isLoading={isLoading}
387:                   disabled={isSuccess}
388:                   className="w-full mt-3 py-3.5 border-2 border-slate-950 font-black text-sm uppercase tracking-wider bg-brand-400 hover:bg-brand-300 text-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#00b835] transition-all cursor-pointer"
389:                 >
390:                   Registrar Cuenta
391:                 </Button>
392:               </form>
393: 
394:               <p className="mt-8 text-center text-sm font-medium text-slate-600 dark:text-slate-600">
395:                 ¿Ya tienes una cuenta?{' '}
396:                 <Link to="/login" className="font-bold text-brand-600 dark:text-brand-600 hover:underline">
397:                   Inicia sesión aquí
398:                 </Link>
399:               </p>
400:             </div>
401:           </div>
402:         </div>
403:       </div>
404:     </Layout>
405:   );
406: };
````

## File: src/presentation/components/Navbar.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { Link, useNavigate } from 'react-router-dom';
  3: import { useAuthStore } from '../store/useAuthStore';
  4: import { useThemeStore } from '../store/useThemeStore';
  5: import { useCartStore } from '../store/useCartStore';
  6: import { Sun, Moon, LogOut, Menu, X, BookOpen, Info, ShoppingBag } from 'lucide-react';
  7: import { Button } from './Button';
  8: import { Logo } from './Logo';
  9: import { PricingModal } from './FooterModals';
 10: 
 11: export const Navbar: React.FC = () => {
 12:   const { user, isAuthenticated, logout } = useAuthStore();
 13:   const { theme, toggleTheme } = useThemeStore();
 14:   const { items: cartItems, openCart } = useCartStore();
 15:   const navigate = useNavigate();
 16:   const [isOpen, setIsOpen] = useState(false);
 17:   const [showPricingModal, setShowPricingModal] = useState(false);
 18: 
 19:   const handleLogout = async () => {
 20:     await logout();
 21:     navigate('/');
 22:   };
 23: 
 24:   return (
 25:     <>
 26:       <nav className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
 27:         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 28:           <div className="flex h-16 items-center justify-between">
 29:             <div className="flex items-center gap-8">
 30:               <Link to="/" className="flex items-center gap-2">
 31:                 <Logo className="h-9 w-9" />
 32:                 <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent dark:from-brand-450 dark:to-brand-300">
 33:                   OnCourses
 34:                 </span>
 35:               </Link>
 36: 
 37:               <div className="hidden lg:flex items-center gap-6">
 38:                 <Link to="/courses" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400">
 39:                   <BookOpen className="h-4 w-4 text-emerald-500 shrink-0" />
 40:                   <span>Cursos</span>
 41:                 </Link>
 42:                 <Link to="/courses?max_price=0" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400">
 43:                   <Info className="h-4 w-4 text-brand-500 shrink-0" />
 44:                   <span>Recursos Gratis</span>
 45:                 </Link>
 46:               </div>
 47:             </div>
 48: 
 49:             <div className="hidden lg:flex items-center gap-4">
 50:               <button
 51:                 onClick={openCart}
 52:                 className="relative p-2 border-2 border-slate-950 bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 shadow-[2px_2px_0px_0px_#00b835] transition-colors cursor-pointer"
 53:                 aria-label="Ver carrito de compras"
 54:                 title="Carrito de Compras"
 55:               >
 56:                 <ShoppingBag className="h-4 w-4" />
 57:                 {cartItems.length > 0 && (
 58:                   <span className="absolute -top-2 -right-2 bg-rose-600 text-white border-2 border-slate-950 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] animate-bounce">
 59:                     {cartItems.length}
 60:                   </span>
 61:                 )}
 62:               </button>
 63: 
 64:               <button
 65:                 onClick={toggleTheme}
 66:                 className="p-2 border-2 border-slate-950 bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 shadow-[2px_2px_0px_0px_#00b835] transition-colors cursor-pointer"
 67:                 aria-label="Toggle theme"
 68:               >
 69:                 {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
 70:               </button>
 71: 
 72:               {isAuthenticated ? (
 73:                 <div className="flex items-center gap-2.5">
 74:                   {}
 75:                   {user?.role === 'admin' && (
 76:                     <span className="inline-flex items-center gap-1 bg-rose-500 text-white font-black text-[10px] uppercase tracking-wider px-2 py-0.5 border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_#00b835] shrink-0" title="Rol: Administrador">
 77:                       👑 ADMIN
 78:                     </span>
 79:                   )}
 80:                   {user?.role === 'professor' && (
 81:                     <span className="inline-flex items-center gap-1 bg-purple-500 text-white font-black text-[10px] uppercase tracking-wider px-2 py-0.5 border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_#00b835] shrink-0" title="Rol: Docente / Profesor">
 82:                       🎓 DOCENTE
 83:                     </span>
 84:                   )}
 85:                   {user?.role === 'student' && (
 86:                     <span className="inline-flex items-center gap-1 bg-[#00cc33] text-slate-950 font-black text-[10px] uppercase tracking-wider px-2 py-0.5 border-2 border-slate-950 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_#00b835] shrink-0" title="Rol: Estudiante">
 87:                       ⚡ ESTUDIANTE
 88:                     </span>
 89:                   )}
 90: 
 91:                   <Link
 92:                     to="/profile"
 93:                     className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 mr-1"
 94:                   >
 95:                     {user?.avatar ? (
 96:                       <img
 97:                         src={user.avatar}
 98:                         alt={user.username}
 99:                         className="h-7 w-7 rounded-full object-cover border-2 border-slate-950 dark:border-slate-300 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_#00b835] shrink-0"
100:                       />
101:                     ) : (
102:                       <div className="h-7 w-7 rounded-full bg-[#00cc33] text-slate-950 border-2 border-slate-950 dark:border-slate-300 font-black text-xs flex items-center justify-center shrink-0 uppercase shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_#00b835]">
103:                         {(user?.first_name?.charAt(0) || user?.username?.charAt(0) || 'U')}
104:                       </div>
105:                     )}
106:                     <span>Mi Perfil</span>
107:                   </Link>
108:                   <Link to={user?.role === 'admin' || user?.role === 'professor' ? '/admin' : '/dashboard'}>
109:                     <Button variant="outline" size="sm">Ir al campus</Button>
110:                   </Link>
111:                   <Button variant="danger" size="sm" onClick={handleLogout} className="flex items-center gap-1.5">
112:                     <LogOut className="h-3.5 w-3.5" />
113:                     <span>Salir</span>
114:                   </Button>
115:                 </div>
116:               ) : (
117:                 <div className="flex items-center gap-2">
118:                   <Link to="/register">
119:                     <Button variant="outline" size="sm">Registrarse</Button>
120:                   </Link>
121:                   <Link to="/dashboard">
122:                     <Button variant="primary" size="sm">Ir al campus</Button>
123:                   </Link>
124:                 </div>
125:               )}
126:             </div>
127: 
128:             <div className="flex lg:hidden items-center gap-2">
129:               <button
130:                 onClick={toggleTheme}
131:                 className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
132:               >
133:                 {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
134:               </button>
135:               <button
136:                 onClick={() => setIsOpen(!isOpen)}
137:                 className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
138:               >
139:                 {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
140:               </button>
141:             </div>
142:           </div>
143:         </div>
144: 
145:         {}
146:         {isOpen && (
147:           <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 flex flex-col gap-4">
148:             <Link
149:               to="/courses"
150:               onClick={() => setIsOpen(false)}
151:               className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-250 hover:text-brand-600"
152:             >
153:               <BookOpen className="h-4 w-4 text-emerald-500" />
154:               <span>Cursos</span>
155:             </Link>
156:             <Link
157:               to="/courses?max_price=0"
158:               onClick={() => setIsOpen(false)}
159:               className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-250 hover:text-brand-600"
160:             >
161:               <Info className="h-4 w-4 text-brand-500" />
162:               <span>Recursos Gratis</span>
163:             </Link>
164: 
165:           <hr className="border-slate-200 dark:border-slate-800" />
166: 
167:           {isAuthenticated ? (
168:             <div className="flex flex-col gap-3">
169:               <div className="flex items-center justify-between px-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
170:                 <div className="flex items-center gap-2.5">
171:                   {user?.avatar ? (
172:                     <img
173:                       src={user.avatar}
174:                       alt={user.username}
175:                       className="h-7 w-7 rounded-full object-cover border-2 border-slate-950 dark:border-slate-300 shadow-sm shrink-0"
176:                     />
177:                   ) : (
178:                     <div className="h-7 w-7 rounded-full bg-[#00cc33] text-slate-950 border-2 border-slate-950 dark:border-slate-300 font-black text-xs flex items-center justify-center shrink-0 uppercase">
179:                       {(user?.first_name?.charAt(0) || user?.username?.charAt(0) || 'U')}
180:                     </div>
181:                   )}
182:                   <span>{user?.first_name ? `${user.first_name} ${user.last_name}` : user?.username}</span>
183:                 </div>
184:                 {user?.role === 'admin' && (
185:                   <span className="bg-rose-500 text-white font-black text-[10px] uppercase px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
186:                     👑 ADMIN
187:                   </span>
188:                 )}
189:                 {user?.role === 'professor' && (
190:                   <span className="bg-purple-500 text-white font-black text-[10px] uppercase px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
191:                     🎓 DOCENTE
192:                   </span>
193:                 )}
194:                 {user?.role === 'student' && (
195:                   <span className="bg-[#00cc33] text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 border border-slate-950 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
196:                     ⚡ ESTUDIANTE
197:                   </span>
198:                 )}
199:               </div>
200:               <Link
201:                 to="/profile"
202:                 onClick={() => setIsOpen(false)}
203:                 className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600"
204:               >
205:                 Mi Perfil
206:               </Link>
207:               <Link
208:                 to={user?.role === 'admin' || user?.role === 'professor' ? '/admin' : '/dashboard'}
209:                 onClick={() => setIsOpen(false)}
210:                 className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600"
211:               >
212:                 Mi Panel
213:               </Link>
214:               <button
215:                 onClick={() => {
216:                   setIsOpen(false);
217:                   handleLogout();
218:                 }}
219:                 className="flex w-full items-center gap-2 text-left text-sm font-medium text-rose-500 hover:text-rose-600"
220:               >
221:                 <LogOut className="h-4 w-4" />
222:                 Cerrar Sesión
223:               </button>
224:             </div>
225:           ) : (
226:             <div className="flex flex-col gap-2">
227:               <Link to="/register" onClick={() => setIsOpen(false)}>
228:                 <Button variant="outline" className="w-full">Registrarse</Button>
229:               </Link>
230:               <Link to="/dashboard" onClick={() => setIsOpen(false)}>
231:                 <Button className="w-full">Ir al campus</Button>
232:               </Link>
233:             </div>
234:           )}
235:         </div>
236:       )}
237:     </nav>
238:     <PricingModal
239:       isOpen={showPricingModal}
240:       onClose={() => setShowPricingModal(false)}
241:     />
242:     </>
243:   );
244: };
````

## File: src/presentation/components/Footer.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { Link } from 'react-router-dom';
  3: import { BookOpen, Info, Mailbox, Database, Code, Terminal, GitBranch, Building2, MapPin, ShieldCheck, ArrowRight, X } from 'lucide-react';
  4: import { Logo } from './Logo';
  5: import { LegalModal, PricingModal, AboutModal, NewsletterModal } from './FooterModals';
  6: 
  7: export const Footer: React.FC = () => {
  8:   const [showLegalModal, setShowLegalModal] = useState(false);
  9:   const [showPricingModal, setShowPricingModal] = useState(false);
 10:   const [showAboutModal, setShowAboutModal] = useState(false);
 11:   const [showNewsletterModal, setShowNewsletterModal] = useState(false);
 12: 
 13:   return (
 14:     <footer className="border-t-2 border-slate-950 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 py-16 text-slate-600 dark:text-slate-400 font-sans">
 15:       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 16:         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
 17:           {}
 18:           <div className="flex flex-col gap-4">
 19:             <div className="flex items-center gap-2.5">
 20:               <Logo className="h-9 w-9" />
 21:               <span className="font-display font-black tracking-tight text-slate-900 dark:text-white text-xl">
 22:                 OnCourses
 23:               </span>
 24:             </div>
 25:             <p className="text-xs sm:text-sm font-sans text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
 26:               Estudia desarrollo de software, algoritmos y bases de datos de manera premium y estructurada en OnCourses.
 27:             </p>
 28:             <div className="flex flex-col gap-2.5 text-xs font-sans font-bold text-slate-600 dark:text-slate-400">
 29:               <div className="flex items-center gap-2">
 30:                 <Building2 className="h-4 w-4 text-[#00cc33] shrink-0" />
 31:                 <span>Universidad UTE</span>
 32:               </div>
 33:               <div className="flex items-center gap-2">
 34:                 <MapPin className="h-4 w-4 text-[#00cc33] shrink-0" />
 35:                 <span>Tulcán, Ecuador</span>
 36:               </div>
 37:             </div>
 38:             <Link
 39:               to="/courses"
 40:               onClick={() => {
 41:                 window.scrollTo({ top: 0, behavior: 'smooth' });
 42:               }}
 43:               className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#00cc33] hover:bg-[#00ff41] text-slate-950 font-sans font-bold text-xs uppercase tracking-wider border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer w-fit"
 44:             >
 45:               <span>Ir al catálogo</span>
 46:               <ArrowRight className="h-4 w-4" />
 47:             </Link>
 48:           </div>
 49: 
 50:           {}
 51:           <div className="flex flex-col gap-4">
 52:             <h3 className="font-display font-extrabold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
 53:               Plataforma
 54:             </h3>
 55:             <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-sans font-semibold">
 56:               <Link to="/courses" className="flex items-center gap-2 hover:text-[#00cc33] transition-colors">
 57:                 <BookOpen className="h-4 w-4 text-emerald-500" />
 58:                 <span>Cursos</span>
 59:               </Link>
 60:               <Link to="/courses?max_price=0" className="flex items-center gap-2 hover:text-[#00cc33] transition-colors">
 61:                 <Info className="h-4 w-4 text-brand-500" />
 62:                 <span>Recursos Gratis</span>
 63:               </Link>
 64:               <button
 65:                 onClick={() => setShowNewsletterModal(true)}
 66:                 className="flex items-center gap-2 text-left hover:text-[#00cc33] transition-colors cursor-pointer"
 67:               >
 68:                 <Mailbox className="h-4 w-4 text-pink-500" />
 69:                 <span>Newsletter</span>
 70:               </button>
 71:               <button
 72:                 onClick={() => setShowAboutModal(true)}
 73:                 className="flex items-center gap-2 text-left hover:text-[#00cc33] transition-colors cursor-pointer"
 74:               >
 75:                 <Info className="h-4 w-4 text-emerald-500" />
 76:                 <span>Nosotros</span>
 77:               </button>
 78:             </div>
 79:           </div>
 80: 
 81:           {}
 82:           <div className="flex flex-col gap-4">
 83:             <h3 className="font-display font-extrabold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
 84:               Cursos Destacados
 85:             </h3>
 86:             <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-sans font-semibold">
 87:               <Link to="/courses?search=terminal" className="flex items-center gap-2 hover:text-[#00cc33] transition-colors">
 88:                 <Terminal className="h-4 w-4 text-emerald-500" />
 89:                 <span>Bash y terminal</span>
 90:               </Link>
 91:               <Link to="/courses?search=python" className="flex items-center gap-2 hover:text-[#00cc33] transition-colors">
 92:                 <Code className="h-4 w-4 text-blue-500" />
 93:                 <span>Python</span>
 94:               </Link>
 95:               <Link to="/courses?search=javascript" className="flex items-center gap-2 hover:text-[#00cc33] transition-colors">
 96:                 <Code className="h-4 w-4 text-yellow-500" />
 97:                 <span>JavaScript</span>
 98:               </Link>
 99:               <Link to="/courses?search=git" className="flex items-center gap-2 hover:text-[#00cc33] transition-colors">
100:                 <GitBranch className="h-4 w-4 text-brand-500" />
101:                 <span>Git y GitHub</span>
102:               </Link>
103:               <Link to="/courses?search=sql" className="flex items-center gap-2 hover:text-[#00cc33] transition-colors">
104:                 <Database className="h-4 w-4 text-orange-500" />
105:                 <span>SQL y bases de datos</span>
106:               </Link>
107:             </div>
108:           </div>
109: 
110:           {}
111:           <div className="flex flex-col gap-4">
112:             <h3 className="font-display font-extrabold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
113:               Información Legal
114:             </h3>
115:             <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-sans font-semibold">
116:               <button
117:                 onClick={() => setShowLegalModal(true)}
118:                 className="flex items-center gap-2 text-left hover:text-[#00cc33] transition-colors cursor-pointer"
119:               >
120:                 <ShieldCheck className="h-4 w-4 text-[#00cc33]" />
121:                 <span>Información Legal & Términos</span>
122:               </button>
123:             </div>
124:           </div>
125:         </div>
126: 
127:         {}
128:         <div className="group relative mt-16 border-2 border-slate-950 bg-white dark:bg-slate-950 text-slate-950 dark:text-white shadow-[6px_6px_0px_0px_#86efac] dark:shadow-[6px_6px_0px_0px_#7effa0] overflow-hidden flex flex-col select-none transition-all duration-300 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[10px_10px_0px_0px_#86efac] dark:hover:shadow-[10px_10px_0px_0px_#7effa0] cursor-pointer">
129:           {}
130:           <div className="flex items-center justify-between px-4 py-1.5 bg-slate-100 dark:bg-slate-900 border-b-2 border-slate-950 transition-colors">
131:             <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono" translate="no">
132:               ONCOURSES.APP
133:             </span>
134:             <div className="flex items-center gap-1.5" translate="no">
135:               <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-white bg-white dark:bg-slate-800 select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">_</span>
136:               <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-white bg-white dark:bg-slate-800 select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">+</span>
137:               <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-white bg-white dark:bg-slate-800 select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" aria-label="Cerrar">
138:                 <X className="h-3 w-3" />
139:               </span>
140:             </div>
141:           </div>
142: 
143:           {}
144:           <div className="relative py-10 px-4 overflow-hidden flex items-center justify-center">
145:             {}
146:             <div className="block dark:hidden animate-grid transition-none absolute inset-0 bg-[linear-gradient(rgba(0,200,50,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,50,0.12)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
147: 
148:             {}
149:             <div className="hidden dark:block animate-grid transition-none absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.16)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
150: 
151:             {}
152:             <div className="absolute inset-0 bg-[#00cc33]/10 dark:bg-[#00ff41]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-300" />
153: 
154:             {}
155:             <div className="relative z-10 font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] tracking-tight uppercase leading-none text-center transition-transform duration-300 group-hover:scale-[1.02]">
156:               <span className="text-slate-950 dark:text-white transition-colors duration-200">On</span>
157:               <span className="text-[#00aa2e] dark:text-[#00ff41] drop-shadow-[0_4px_16px_rgba(0,204,51,0.3)] dark:drop-shadow-[0_4px_24px_rgba(0,255,65,0.5)] transition-colors duration-200">Courses</span>
158:             </div>
159:           </div>
160:         </div>
161: 
162:         {}
163:         <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 text-center">
164:           <div className="p-1 rounded-md bg-white dark:bg-slate-900 border border-slate-950 dark:border-slate-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#00b835] flex items-center justify-center shrink-0">
165:             <Logo className="h-4 w-4 drop-shadow" />
166:           </div>
167:           <span>
168:             Desarrollado con ❤️ para todos mis Estudiantes. v1.0 &copy; 2024-{new Date().getFullYear()} OnCourses.
169:           </span>
170:         </div>
171:       </div>
172: 
173:       {}
174:       <LegalModal
175:         isOpen={showLegalModal}
176:         onClose={() => setShowLegalModal(false)}
177:       />
178:       <PricingModal
179:         isOpen={showPricingModal}
180:         onClose={() => setShowPricingModal(false)}
181:       />
182:       <AboutModal
183:         isOpen={showAboutModal}
184:         onClose={() => setShowAboutModal(false)}
185:       />
186:       <NewsletterModal
187:         isOpen={showNewsletterModal}
188:         onClose={() => setShowNewsletterModal(false)}
189:       />
190:     </footer>
191:   );
192: };
````

## File: src/presentation/pages/HomePage.tsx
````typescript
  1: import React, { useEffect, useState, useRef } from 'react';
  2: import { Link } from 'react-router-dom';
  3: import { Layout } from '../components/Layout';
  4: import { getCoursesUseCase } from '@infrastructure/factories/CourseFactory';
  5: import { Course } from '@domain/entities/Course';
  6: import {
  7:   ArrowRight, BookOpen, ChevronLeft, ChevronRight,
  8:   Clock, Users, ShieldCheck, GraduationCap, Star,
  9:   FolderOpen, Sparkles, Code2, Layers, X
 10: } from 'lucide-react';
 11: import { Loader } from '../components/Loader';
 12: import { CourseCard } from '../components/CourseCard';
 13: 
 14: 
 15: const Stat: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
 16:   <div className="flex flex-col items-center px-6 py-3 rounded-xl border-2 border-slate-950 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835]">
 17:     <span className={`text-2xl font-extrabold ${color}`}>{value}</span>
 18:     <span className="text-xs text-slate-500 dark:text-slate-500 font-medium">{label}</span>
 19:   </div>
 20: );
 21: 
 22: 
 23: const ProfileCard: React.FC<{ emoji: string; title: string; desc: string; color: string }> = ({ emoji, title, desc, color }) => (
 24:   <div className="relative flex flex-col border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] bg-white hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#00b835] transition-all duration-200">
 25:     <div className="flex items-center justify-end border-b-2 border-slate-950 bg-slate-100 px-3 py-1.5">
 26:       <div className="flex items-center gap-1.5 shrink-0">
 27:         <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900">_</span>
 28:         <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900">+</span>
 29:         <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900">X</span>
 30:       </div>
 31:     </div>
 32:     <div className="p-6 flex flex-col flex-1">
 33:       <span className={`text-3xl mb-4 w-12 h-12 flex items-center justify-center rounded-lg ${color}`}>{emoji}</span>
 34:       <h3 className="font-display text-lg font-extrabold text-slate-950 dark:text-slate-950 mb-2">{title}</h3>
 35:       <p className="text-sm text-slate-600 dark:text-slate-600 leading-relaxed">{desc}</p>
 36:     </div>
 37:   </div>
 38: );
 39: 
 40: 
 41: const Testimonial: React.FC<{ name: string; role: string; quote: string; initial: string; color: string }> = ({ name, role, quote, initial, color }) => (
 42:   <div className="flex flex-col border-2 border-slate-950 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#00b835] h-full">
 43:     <div className="flex items-center justify-end border-b-2 border-slate-950 bg-slate-100 px-3 py-1.5">
 44:       <div className="flex items-center gap-1.5 shrink-0">
 45:         <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900">_</span>
 46:         <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900">+</span>
 47:         <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900">X</span>
 48:       </div>
 49:     </div>
 50:     <div className="p-6 flex flex-col flex-1">
 51:       <div className="flex items-center gap-1 mb-4">
 52:         {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
 53:       </div>
 54:       <p className="text-slate-800 dark:text-slate-800 text-sm leading-relaxed mb-5 flex-1">"{quote}"</p>
 55:       <div className="flex items-center gap-3 mt-auto">
 56:         <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-extrabold text-white border-2 border-slate-950 ${color}`}>
 57:           {initial}
 58:         </div>
 59:         <div>
 60:           <p className="font-bold text-sm text-slate-950 dark:text-slate-950">{name}</p>
 61:           <p className="text-xs text-slate-500 dark:text-slate-500">{role}</p>
 62:         </div>
 63:       </div>
 64:     </div>
 65:   </div>
 66: );
 67: 
 68: 
 69: const Benefit: React.FC<{ icon: React.ReactNode; title: string; desc: string; accent: string }> = ({ icon, title, desc, accent }) => (
 70:   <div className="flex flex-col border-2 border-slate-950 bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_#00b835] hover:-translate-y-0.5 transition-all duration-200">
 71:     <div className="flex items-center justify-end border-b-2 border-slate-950 bg-slate-100 px-3 py-1.5">
 72:       <div className="flex items-center gap-1.5 shrink-0">
 73:         <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900">_</span>
 74:         <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900">+</span>
 75:         <span className="w-3.5 h-3.5 flex items-center justify-center border border-slate-950 text-[10px] font-bold select-none cursor-pointer bg-white text-slate-900 dark:text-slate-900">X</span>
 76:       </div>
 77:     </div>
 78:     <div className="flex gap-4 p-5 flex-1">
 79:       <div className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-lg border-2 border-slate-950 ${accent}`}>
 80:         {icon}
 81:       </div>
 82:       <div>
 83:         <h3 className="font-bold text-sm text-slate-950 dark:text-slate-950 mb-1">{title}</h3>
 84:         <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">{desc}</p>
 85:       </div>
 86:     </div>
 87:   </div>
 88: );
 89: 
 90: 
 91: 
 92: 
 93: export const HomePage: React.FC = () => {
 94:   const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
 95:   const [isLoading, setIsLoading] = useState(true);
 96:   const scrollRef = useRef<HTMLDivElement>(null);
 97: 
 98:   useEffect(() => {
 99:     let isMounted = true;
100:     getCoursesUseCase
101:       .execute({ page_size: 6, is_active: true })
102:       .then((data) => {
103:         if (isMounted) {
104:           setFeaturedCourses(data.results);
105:           setIsLoading(false);
106:         }
107:       })
108:       .catch((err) => {
109:         console.error(err);
110:         if (isMounted) setIsLoading(false);
111:       });
112:     return () => { isMounted = false; };
113:   }, []);
114: 
115:   const scrollCourses = (dir: 'left' | 'right') => {
116:     if (!scrollRef.current) return;
117:     scrollRef.current.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
118:   };
119: 
120:   return (
121:     <Layout>
122: 
123:       {}
124:       <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white mb-16 border-b-2 border-slate-200 dark:border-slate-900 transition-colors duration-200">
125:         {}
126:         <div className="block dark:hidden animate-grid transition-none absolute inset-0 bg-[linear-gradient(rgba(0,200,50,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,50,0.10)_1px,transparent_1px)] bg-[size:40px_40px]" />
127:         {}
128:         <div className="hidden dark:block animate-grid transition-none absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.38)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.25)_1px,transparent_1px)] bg-[size:40px_40px]" />
129: 
130:         {}
131:         <div className="hidden dark:block absolute top-0 left-1/4 w-96 h-96 bg-[#00b835]/10 rounded-full blur-[130px] pointer-events-none" />
132:         <div className="hidden dark:block absolute bottom-0 right-1/4 w-80 h-80 bg-[#00b835]/5 rounded-full blur-[100px] pointer-events-none" />
133: 
134:         <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
135:           <div className="flex flex-col lg:flex-row items-center gap-12">
136: 
137:             {}
138:             <div className="flex-1 text-center lg:text-left">
139:               {}
140:               <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-600/20 border border-brand-200 dark:border-brand-500/30 text-brand-700 dark:text-brand-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
141:                 <Sparkles className="h-3.5 w-3.5" />
142:                 Plataforma de Aprendizaje Tecnológico
143:               </div>
144: 
145:               {}
146:               <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-4">
147:                 <span className="text-slate-900 dark:text-white">On</span>
148:                 <span className="text-brand-600 dark:text-brand-400">Courses</span>
149:                 <br />
150:                 <span className="text-slate-700 dark:text-slate-300 text-4xl sm:text-5xl lg:text-6xl font-bold">
151:                   es aprender<br />
152:                   <span className="text-slate-900 dark:text-white">de verdad</span>
153:                 </span>
154:               </h1>
155: 
156:               {}
157:               <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
158:                 Estudia programación y desarrollo de software con cursos estructurados, evaluaciones reales y certificados que respaldan tu progreso.
159:               </p>
160: 
161:               {}
162:               <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
163:                 <Link to="/courses">
164:                   <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,255,65,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,255,65,0.5)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
165:                     Comenzar a aprender
166:                     <ArrowRight className="h-4 w-4" />
167:                   </button>
168:                 </Link>
169:                 <Link to="/register">
170:                   <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border-2 border-slate-950 hover:border-slate-800 dark:hover:border-slate-500 transition-all duration-200 cursor-pointer">
171:                     Crear cuenta gratis
172:                   </button>
173:                 </Link>
174:               </div>
175: 
176:               {}
177:               <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
178:                 <Stat value="+500" label="Estudiantes" color="text-brand-600 dark:text-brand-600" />
179:                 <Stat value="+20" label="Cursos" color="text-emerald-600 dark:text-emerald-600" />
180:                 <Stat value="100%" label="Online" color="text-amber-600 dark:text-amber-600" />
181:               </div>
182:             </div>
183: 
184:             {}
185:             <div className="hidden lg:block flex-1 max-w-lg w-full">
186:               <div className="border-2 border-slate-950 shadow-[8px_8px_0px_0px_rgba(0,255,65,0.4)] bg-white dark:bg-slate-900 transition-colors duration-200">
187:                 {}
188:                 <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-100 dark:bg-slate-100 border-b-2 border-slate-950">
189:                   <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-700 font-mono">ONCOURSES.APP</span>
190:                   <div className="flex items-center gap-1.5" translate="no">
191:                     <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-slate-950 bg-white dark:bg-white select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">_</span>
192:                     <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-slate-950 bg-white dark:bg-white select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">+</span>
193:                     <span className="w-5 h-5 flex items-center justify-center border-2 border-slate-950 text-[11px] font-black text-slate-950 dark:text-slate-950 bg-white dark:bg-white select-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" aria-label="Cerrar">
194:                       <X className="h-3 w-3" />
195:                     </span>
196:                   </div>
197:                 </div>
198:                 {}
199:                 <div className="p-6 space-y-3">
200:                   {[
201:                     { icon: '🐍', label: 'Python desde cero', color: 'bg-amber-500', anim: 'animate-progress-1' },
202:                     { icon: '⚛️', label: 'React & TypeScript', color: 'bg-brand-650', anim: 'animate-progress-2' },
203:                     { icon: '🐳', label: 'Docker & DevOps', color: 'bg-emerald-600', anim: 'animate-progress-3' },
204:                     { icon: '🗄️', label: 'Bases de Datos SQL', color: 'bg-indigo-600', anim: 'animate-progress-4' },
205:                   ].map(({ icon, label, color, anim }) => (
206:                     <div key={label} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 border border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-slate-900 dark:text-slate-200 transition-colors duration-200">
207:                       <div className={`w-8 h-8 flex items-center justify-center text-base border border-slate-950 ${color}`}>{icon}</div>
208:                       <span className="text-sm font-semibold">{label}</span>
209:                       <div className="ml-auto w-16 h-2 bg-slate-100 dark:bg-slate-900 border border-slate-950 rounded-none overflow-hidden">
210:                         <div className={`h-full bg-brand-400 ${anim}`} />
211:                       </div>
212:                     </div>
213:                   ))}
214:                 </div>
215:               </div>
216:             </div>
217: 
218:           </div>
219:         </div>
220:       </section>
221: 
222:       {}
223:       <section className="mb-20">
224:         {}
225:         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
226:           <div>
227:             <div className="flex flex-col gap-3 items-start text-sm font-black uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-4">
228:               <FolderOpen className="h-16 w-16" />
229:               <span>courses.folder</span>
230:             </div>
231:             <h2 className="font-display text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
232:               Cursos
233:             </h2>
234:             <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
235:               Aprende programación desde cero y mejora tus habilidades
236:             </p>
237:           </div>
238:           <div className="flex items-center gap-2">
239:             <button
240:               onClick={() => scrollCourses('left')}
241:               className="w-9 h-9 flex items-center justify-center border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-150 cursor-pointer"
242:             >
243:               <ChevronLeft className="h-5 w-5" />
244:             </button>
245:             <button
246:               onClick={() => scrollCourses('right')}
247:               className="w-9 h-9 flex items-center justify-center border-2 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-150 cursor-pointer"
248:             >
249:               <ChevronRight className="h-5 w-5" />
250:             </button>
251:             <Link
252:               to="/courses"
253:               className="flex items-center gap-1 text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline ml-2"
254:             >
255:               Ver todos
256:               <ArrowRight className="h-4 w-4" />
257:             </Link>
258:           </div>
259:         </div>
260: 
261:         {isLoading ? (
262:           <Loader />
263:         ) : featuredCourses.length > 0 ? (
264:           <div
265:             ref={scrollRef}
266:             className="flex gap-5 overflow-x-auto pt-3 px-4 pb-6 scrollbar-hide snap-x snap-mandatory items-stretch"
267:             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
268:           >
269:             {featuredCourses.map((course) => (
270:               <div key={course.id} className="snap-start shrink-0 w-[270px] p-1.5 flex flex-col">
271:                 <CourseCard course={course} />
272:               </div>
273:             ))}
274:           </div>
275:         ) : (
276:           <div className="text-center py-12 border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-500">
277:             No hay cursos disponibles en este momento.
278:           </div>
279:         )}
280:       </section>
281: 
282:       {}
283:       <section className="mb-20">
284:         <div className="mb-8">
285:             <div className="flex flex-col gap-3 items-start text-sm font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-4">
286:               <Code2 className="h-16 w-16" />
287:             <span>community.folder</span>
288:           </div>
289:             <h2 className="font-display text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
290:             ¿Estás en el lugar correcto?
291:           </h2>
292:             <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
293:             Si te identificas con alguno de estos perfiles, estás en el lugar correcto
294:           </p>
295:         </div>
296: 
297:         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
298:           <ProfileCard
299:             emoji="🌱"
300:             title="Empiezas desde cero"
301:             desc="¿Sin experiencia previa? Te damos el aprendizaje estructurado con fundamentos sólidos y buenas prácticas desde el primer día."
302:             color="bg-emerald-100 dark:bg-emerald-900/30"
303:           />
304:           <ProfileCard
305:             emoji="⚡"
306:             title="Estudiante o Junior"
307:             desc="Tienes algo de base pero quieres solidificar conocimientos, avanzar en tu carrera o aprender tecnologías más demandadas del mercado."
308:             color="bg-brand-100 dark:bg-brand-900/30"
309:           />
310:           <ProfileCard
311:             emoji="🚀"
312:             title="Profesional activo"
313:             desc="Con experiencia pero necesitas actualizarte, cambiar de stack, o añadir habilidades que te diferencien en el mercado laboral."
314:             color="bg-amber-100 dark:bg-amber-900/30"
315:           />
316:         </div>
317:       </section>
318: 
319:       {}
320:       <section className="mb-20">
321:         <div className="mb-8">
322:             <div className="flex flex-col gap-3 items-start text-sm font-black uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-4">
323:               <Layers className="h-16 w-16" />
324:             <span>benefits.folder</span>
325:           </div>
326:             <h2 className="font-display text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
327:             Y además
328:           </h2>
329:             <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">
330:             Todo lo que incluye aprender en OnCourses
331:           </p>
332:         </div>
333: 
334:         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
335:           <Benefit
336:             icon={<Clock className="h-5 w-5 text-white" />}
337:             title="A tu propio ritmo"
338:             desc="Accede a las lecciones las 24h del día. Sin horarios fijos ni fechas de vencimiento."
339:             accent="bg-brand-600"
340:           />
341:           <Benefit
342:             icon={<ShieldCheck className="h-5 w-5 text-white" />}
343:             title="Certificado incluido"
344:             desc="Al completar cada curso recibes un certificado de finalización validado por la plataforma."
345:             accent="bg-emerald-600"
346:           />
347:           <Benefit
348:             icon={<BookOpen className="h-5 w-5 text-white" />}
349:             title="Lecciones y cuestionarios"
350:             desc="Valida lo aprendido con tests integrados al finalizar cada módulo del curso."
351:             accent="bg-amber-500"
352:           />
353:           <Benefit
354:             icon={<Users className="h-5 w-5 text-white" />}
355:             title="Docentes expertos"
356:             desc="Aprende de profesores con experiencia real en la industria del software."
357:             accent="bg-brand-700"
358:           />
359:           <Benefit
360:             icon={<GraduationCap className="h-5 w-5 text-white" />}
361:             title="Contenido estructurado"
362:             desc="Rutas de aprendizaje claras organizadas por módulos, de menor a mayor complejidad."
363:             accent="bg-rose-600"
364:           />
365:           <Benefit
366:             icon={<Sparkles className="h-5 w-5 text-white" />}
367:             title="Actualización continua"
368:             desc="El contenido se actualiza periódicamente para mantenerlo al día con las tendencias del sector."
369:             accent="bg-indigo-600"
370:           />
371:         </div>
372:       </section>
373: 
374:       {}
375:       <section className="mb-20">
376:         <div className="mb-8">
377:             <div className="flex flex-col gap-3 items-start text-sm font-black uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-4">
378:               <Star className="h-16 w-16" />
379:             <span>reviews.folder</span>
380:           </div>
381:             <h2 className="font-display text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
382:             Lo que dicen nuestros estudiantes
383:           </h2>
384:         </div>
385: 
386:         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
387:           <Testimonial
388:             name="Sofía Ramírez"
389:             role="Desarrolladora Junior · Quito"
390:             quote="OnCourses me dio la estructura que necesitaba. Aprendí Python desde cero y en 3 meses ya estaba aplicando a mi primer trabajo."
391:             initial="S"
392:             color="bg-brand-600"
393:           />
394:           <Testimonial
395:             name="Mateo Torres"
396:             role="Estudiante de Ingeniería · Guayaquil"
397:             quote="Los cursos están muy bien explicados. Los cuestionarios al final de cada módulo me ayudaron a afianzar los conceptos."
398:             initial="M"
399:             color="bg-emerald-600"
400:           />
401:           <Testimonial
402:             name="Valeria Cárdenas"
403:             role="Diseñadora → Dev Full Stack · Cuenca"
404:             quote="Venía del diseño y no sabía nada de código. Los cursos son claros, directos y con práctica desde el primer día. ¡Muy recomendado!"
405:             initial="V"
406:             color="bg-amber-500"
407:           />
408:         </div>
409:       </section>
410: 
411:       {}
412:       <section className="mb-16">
413:         <div className="bg-slate-50 dark:bg-slate-950 border-2 border-slate-950 shadow-[6px_6px_0px_0px_rgba(0,255,65,0.4)] p-10 lg:p-14 text-center relative overflow-hidden transition-colors duration-200">
414:           {}
415:           <div className="block dark:hidden animate-grid transition-none absolute inset-0 bg-[linear-gradient(rgba(0,200,50,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,50,0.10)_1px,transparent_1px)] bg-[size:32px_32px]" />
416:           {}
417:           <div className="hidden dark:block animate-grid transition-none absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.32)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.20)_1px,transparent_1px)] bg-[size:32px_32px]" />
418: 
419:           <div className="relative">
420:             <p className="text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-3">¿Listo para empezar?</p>
421:             <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
422:               Comienza a aprender hoy
423:             </h2>
424:             <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl mx-auto mb-8">
425:               Únete a cientos de estudiantes que ya están transformando su carrera con OnCourses.
426:             </p>
427:             <div className="flex flex-col sm:flex-row gap-3 justify-center">
428:               <Link to="/register">
429:                 <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,255,65,0.4)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,255,65,0.5)] transition-all duration-200 cursor-pointer">
430:                   Registrarse gratis
431:                   <ArrowRight className="h-4 w-4" />
432:                 </button>
433:               </Link>
434:               <Link to="/courses">
435:                 <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border-2 border-slate-950 hover:border-slate-800 dark:hover:border-slate-500 transition-all duration-200 cursor-pointer">
436:                   Ver catálogo
437:                 </button>
438:               </Link>
439:             </div>
440:           </div>
441:         </div>
442:       </section>
443: 
444:     </Layout>
445:   );
446: };
````

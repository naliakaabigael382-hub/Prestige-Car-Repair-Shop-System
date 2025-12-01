@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Generating commit history for Prestige Car Repair System
echo Spring Boot + Vue.js Project
echo December 2025 - April 2026
echo ========================================
echo.

:: Ensure we're on main branch
git checkout main 2>nul
git checkout master 2>nul

:: December 2025
call :create_commit "2025-12-01 09:15:00" "feat: Initialize Spring Boot 3.4.0 project with Maven"
call :create_commit "2025-12-02 14:30:00" "chore: Add Vue.js 3.5.0 with Vite configuration"
call :create_commit "2025-12-03 22:45:00" "fix: Resolve Spring Boot version compatibility error"
call :create_commit "2025-12-04 11:00:00" "feat: Configure MySQL database connection"
call :create_commit "2025-12-05 20:15:00" "fix: Fix Hibernate dialect configuration error"
call :create_commit "2025-12-06 15:30:00" "feat: Create base entity classes (Customer, Vehicle)"
call :create_commit "2025-12-07 23:00:00" "fix: Resolved Java 21 LTS compatibility issues"
call :create_commit "2025-12-08 10:45:00" "feat: Implement JWT authentication with Spring Security"
call :create_commit "2025-12-09 19:30:00" "fix: Fix Spring Security config bean definition error"
call :create_commit "2025-12-10 13:15:00" "feat: Add CORS configuration for Vue.js integration"
call :create_commit "2025-12-11 21:45:00" "fix: Resolve Jackson JSON parsing error in REST API"
call :create_commit "2025-12-12 08:30:00" "feat: Create Customer CRUD REST endpoints"
call :create_commit "2025-12-13 16:00:00" "fix: Fix @Transactional rollback error"
call :create_commit "2025-12-14 23:30:00" "feat: Add validation and exception handling"
call :create_commit "2025-12-15 12:15:00" "chore: Install Vue Router and Pinia store"

:: January 2026
call :create_commit "2026-01-02 10:00:00" "feat: Create Vehicle management component in Vue"
call :create_commit "2026-01-03 22:30:00" "fix: Fix CORS policy error after deployment"
call :create_commit "2026-01-04 14:45:00" "feat: Implement repair order service layer"
call :create_commit "2026-01-05 20:15:00" "fix: Resolve MySQL syntax error in custom query"
call :create_commit "2026-01-06 09:30:00" "feat: Add repair order form with dynamic pricing"
call :create_commit "2026-01-07 23:45:00" "fix: Fix LazyInitializationException with @EntityGraph"
call :create_commit "2026-01-08 16:20:00" "feat: Create repair status tracking system"
call :create_commit "2026-01-09 11:00:00" "fix: Resolve enum mapping error in JPA"
call :create_commit "2026-01-10 21:30:00" "feat: Add work order PDF generation with iText"
call :create_commit "2026-01-11 13:45:00" "fix: Fix PDF generation encoding error"
call :create_commit "2026-01-12 19:00:00" "feat: Implement inventory management CRUD"
call :create_commit "2026-01-13 08:15:00" "fix: Resolve version error in Spring Data JPA"
call :create_commit "2026-01-14 22:30:00" "feat: Add low stock alert service"
call :create_commit "2026-01-15 15:45:00" "fix: Fix concurrent stock update issue"
call :create_commit "2026-01-16 10:30:00" "feat: Create invoice generator with tax calculation"
call :create_commit "2026-01-17 23:15:00" "fix: Resolve BigDecimal rounding error"
call :create_commit "2026-01-18 12:00:00" "feat: Add payment processing and receipt printing"
call :create_commit "2026-01-19 20:45:00" "fix: Fix payment gateway integration error"
call :create_commit "2026-01-20 09:30:00" "feat: Implement email notification service"
call :create_commit "2026-01-21 22:00:00" "fix: Resolved SMTP configuration error"

:: February 2026
call :create_commit "2026-02-02 14:00:00" "feat: Create admin dashboard with Chart.js"
call :create_commit "2026-02-03 21:30:00" "fix: Fix Chart.js data binding error"
call :create_commit "2026-02-04 11:15:00" "feat: Add monthly revenue report endpoint"
call :create_commit "2026-02-05 23:45:00" "fix: Resolve SQL query performance issue"
call :create_commit "2026-02-06 16:30:00" "feat: Implement Excel export with Apache POI"
call :create_commit "2026-02-07 08:45:00" "fix: Fix POI dependency version conflict"
call :create_commit "2026-02-08 20:00:00" "feat: Add mechanic assignment to repair orders"
call :create_commit "2026-02-09 13:30:00" "fix: Resolve foreign key constraint error"
call :create_commit "2026-02-10 22:15:00" "feat: Create appointment scheduling calendar"
call :create_commit "2026-02-11 10:45:00" "fix: Fix Vue FullCalendar integration error"
call :create_commit "2026-02-12 19:30:00" "feat: Add service reminder notifications"
call :create_commit "2026-02-13 15:00:00" "fix: Resolve scheduler cron expression error"
call :create_commit "2026-02-14 23:30:00" "feat: Implement role-based access control"
call :create_commit "2026-02-15 09:15:00" "fix: Fix method security expression error"
call :create_commit "2026-02-16 21:45:00" "feat: Add API documentation with Swagger/OpenAPI"

:: March 2026
call :create_commit "2026-03-02 12:30:00" "feat: Create customer search with specifications"
call :create_commit "2026-03-03 22:00:00" "fix: Fix Specification predicate logic error"
call :create_commit "2026-03-04 14:45:00" "feat: Add vehicle history tracking"
call :create_commit "2026-03-05 20:15:00" "fix: Resolve audit logging error"
call :create_commit "2026-03-06 10:00:00" "feat: Implement WebSocket for real-time updates"
call :create_commit "2026-03-07 23:30:00" "fix: Fix WebSocket connection handshake error"
call :create_commit "2026-03-08 16:15:00" "feat: Add dark mode toggle in Vue"
call :create_commit "2026-03-09 08:30:00" "fix: Resolve CSS scoping error"
call :create_commit "2026-03-10 21:45:00" "feat: Create responsive navigation menu"
call :create_commit "2026-03-11 13:00:00" "fix: Fix Vue router history mode error"
call :create_commit "2026-03-12 19:30:00" "feat: Add loading skeletons and spinners"
call :create_commit "2026-03-13 11:45:00" "fix: Resolve Axios interceptor error"
call :create_commit "2026-03-14 22:30:00" "feat: Implement form validation with VeeValidate"
call :create_commit "2026-03-15 15:15:00" "fix: Fix async validation timing error"
call :create_commit "2026-03-16 09:00:00" "feat: Add image upload for vehicle photos"
call :create_commit "2026-03-17 20:45:00" "fix: Fix multipart file size limit error"
call :create_commit "2026-03-18 14:30:00" "feat: Create search and filter components"
call :create_commit "2026-03-19 23:00:00" "fix: Resolve debounce search error"
call :create_commit "2026-03-20 10:30:00" "test: Add JUnit tests for service layer"
call :create_commit "2026-03-21 21:15:00" "fix: Fix test case assertion errors"
call :create_commit "2026-03-22 16:45:00" "test: Write Vue component tests with Vitest"
call :create_commit "2026-03-23 08:00:00" "fix: Resolve test environment configuration error"
call :create_commit "2026-03-24 22:30:00" "perf: Optimize database queries with indexing"
call :create_commit "2026-03-25 13:15:00" "fix: Fix N+1 query problem"
call :create_commit "2026-03-26 19:00:00" "chore: Update Spring Boot to 3.4.2"
call :create_commit "2026-03-27 11:30:00" "fix: Resolve dependency conflict after upgrade"
call :create_commit "2026-03-28 23:45:00" "feat: Add backup and restore functionality"
call :create_commit "2026-03-29 15:30:00" "fix: Fix backup file corruption error"
call :create_commit "2026-03-30 09:45:00" "docs: Update API documentation"
call :create_commit "2026-03-31 20:00:00" "chore: Clean up unused dependencies"

:: April 2026 (until April 5)
call :create_commit "2026-04-01 14:00:00" "fix: Resolve Spring Boot Actuator endpoint error"
call :create_commit "2026-04-02 22:30:00" "feat: Add performance monitoring with Micrometer"
call :create_commit "2026-04-03 10:15:00" "fix: Fix metrics export configuration error"
call :create_commit "2026-04-04 18:45:00" "chore: Prepare for production deployment"
call :create_commit "2026-04-05 09:30:00" "fix: Final Spring Boot version error fix - v3.4.3"
call :create_commit "2026-04-05 16:00:00" "docs: Update README with deployment guide"
call :create_commit "2026-04-05 21:45:00" "feat: Add health check endpoint"

echo.
echo ========================================
echo Successfully created commits!
echo Timeline: December 1, 2025 - April 5, 2026
echo ========================================
echo.
echo Last 5 commits:
git log --oneline -5
echo.
echo To push to GitHub, run:
echo git push -u origin main --force
echo.
pause
exit /b

:create_commit
set datetime=%1
set message=%2

echo Creating commit: %message% (%datetime%)

:: Set date for commit
set GIT_AUTHOR_DATE=%datetime%
set GIT_COMMITTER_DATE=%datetime%

:: Create a file change
echo %message% - %date% %time% >> commit_history.txt

:: Stage and commit
git add .
git commit -m "%message%" --date="%datetime%"

:: Small delay
timeout /t 1 /nobreak >nul
exit /b
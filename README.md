<h1>TaskManager</h1>
TaskManager is a web application for managing projects and tasks, built with Laravel and a React frontend. It uses Laravel Sanctum for authentication and CoreUI Admin Template for the user interface.

Key Features:
* Authentication via Laravel Sanctum.
* Create and manage projects.
* Kanban board for tasks with a timer.
* User and role management (administrator, manager, etc.).
* Frontend built with React using CoreUI Admin Template for a modern and user-friendly UI.

Installation Guide

1. Install Laravel dependencies:
composer install
Set up .env and generate app key:
php artisan key:generate

2. Run migrations and seeders:
php artisan migrate --seed

3. Install React dependencies:
cd public/frontend
npm install
npm run build

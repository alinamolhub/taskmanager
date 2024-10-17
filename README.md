<h1>TaskManager</h1>
<p>TaskManager is a web application for managing projects and tasks, built with Laravel and a React frontend. It uses Laravel Sanctum for authentication and CoreUI Admin Template for the user interface.</p>

<h2>Key Features:</h2>
<ul style="list-style-type: disc;">
<li>Authentication via Laravel Sanctum.</li>
<li>Create and manage projects.</li>
<li>Kanban board for tasks with a timer</li>
<li>User and role management (administrator, manager, etc.).</li>
<li>Frontend built with React using CoreUI Admin Template for a modern and user-friendly UI.</li>
</ul>

<h2>Installation Guide:</h2>
<ul style="list-style-type: decimal;">
<li>Install Laravel dependencies:
<code>composer install</code>
Set up .env and generate app key:
<code>php artisan key:generate</code>
</li>
<li>Run migrations and seeders:
<code>php artisan migrate --seed</code>
</li>
<li>Install React dependencies:<code>
cd public/frontend
npm install
npm run build
    </code>
</li>
<ul>

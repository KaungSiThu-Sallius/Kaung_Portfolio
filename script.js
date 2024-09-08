window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectsContainer = document.querySelector('.projects');
    const paginationContainer = document.querySelector('.pagination');
    const pageNumbersContainer = document.querySelector('.page-numbers');

    let allProjects = [
        { title: 'Employee Turnover (Tableau)', category: 'tableau', imgSrc: 'images/employee_turnover.png', detailPage: 'project_details/Tableau/employee_turnover.html' },
        { title: 'Sleep Disorder (Tableau)', category: 'tableau', imgSrc: 'images/sleep_disorder.png', detailPage: 'project_details/Tableau/sleep_disorder.html' },
        { title: 'CO2 Emissions Analysis (Tableau)', category: 'tableau', imgSrc: 'https://via.placeholder.com/200x150.png?text=Tableau+Project+1', detailPage: 'project-co2-tableau.html' },
        { title: 'Movie Ratings Analysis (R)', category: 'r', imgSrc: 'https://via.placeholder.com/200x150.png?text=R+Project+1', detailPage: 'project-movies-r.html' },
        { title: 'Financial Forecasting (Excel)', category: 'excel', imgSrc: 'https://via.placeholder.com/200x150.png?text=Excel+Project+2', detailPage: 'project-forecasting-excel.html' },
        { title: 'Customer Segmentation (Python)', category: 'python', imgSrc: 'https://via.placeholder.com/200x150.png?text=Python+Project+2', detailPage: 'project-segmentation-python.html' },
        { title: 'Sales Dashboard (Tableau)', category: 'tableau', imgSrc: 'https://via.placeholder.com/200x150.png?text=Tableau+Project+2', detailPage: 'project-sales-tableau.html' },
        { title: 'Social Media Analytics (R)', category: 'r', imgSrc: 'https://via.placeholder.com/200x150.png?text=R+Project+2', detailPage: 'project-socialmedia-r.html' },

    ];

    let projectsPerPage = 4;
    let currentPage = 1;
    let currentFilter = 'all';

    function displayProjects(projects) {
        projectsContainer.innerHTML = '';
        const start = (currentPage - 1) * projectsPerPage;
        const end = start + projectsPerPage;
        const paginatedProjects = projects.slice(start, end);

        paginatedProjects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');
            projectItem.style.display = 'block'; // Ensure it's displayed

            // Wrap the project item in an anchor tag
            const projectLink = document.createElement('a');
            projectLink.setAttribute('href', project.detailPage); // Set the link to the project detail page
            projectLink.classList.add('project-link'); // Optional: add a class for styling

            const projectImg = document.createElement('img');
            projectImg.setAttribute('src', project.imgSrc);
            projectImg.setAttribute('alt', project.title);

            const projectTitle = document.createElement('div');
            projectTitle.classList.add('project-title');
            projectTitle.textContent = project.title;

            projectLink.appendChild(projectImg);
            projectLink.appendChild(projectTitle);
            projectItem.appendChild(projectLink);
            projectsContainer.appendChild(projectItem);
        });

        updatePagination(projects.length);
    }

    function updatePagination(totalProjects) {
        const totalPages = Math.ceil(totalProjects / projectsPerPage);
        pageNumbersContainer.innerHTML = `Page ${currentPage} of ${totalPages}`;
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            currentPage = 1;
            filterProjects();
        });
    });

    function filterProjects() {
        const filteredProjects = currentFilter === 'all'
            ? allProjects
            : allProjects.filter(project => project.category === currentFilter);
        displayProjects(filteredProjects);
    }

    document.querySelector('.page-btn[data-page="previous"]').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            filterProjects();
        }
    });

    document.querySelector('.page-btn[data-page="next"]').addEventListener('click', () => {
        const totalPages = Math.ceil(allProjects.filter(project => currentFilter === 'all' || project.category === currentFilter).length / projectsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            filterProjects();
        }
    });

    // Trigger the initial display and set "All Projects" as active
    filterProjects();

    // Set the "All Projects" button as active on load
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
});






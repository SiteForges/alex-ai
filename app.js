const contactEmail = "hello@alexai.studio";

const projects = [
  {
    title: "Untourist Explore",
    type: "Travel",
    description: "Travel exploration site for discovering places and planning the next stop.",
    url: "https://untourist.vercel.app/explore",
    theme: "portfolio",
    icon: "pin",
    featured: true,
  },
  {
    title: "Liberty Oil",
    type: "Business",
    description: "Business website for Liberty Oil with a clear service-focused presentation.",
    url: "https://siteforges.github.io/Liberty-Oil/index.html",
    theme: "local",
    icon: "briefcase",
  },
  {
    title: "Spendly AI",
    type: "Finance",
    description: "AI-powered finance app for tracking spending and making money decisions clearer.",
    url: "https://spendly-ai-puce.vercel.app/",
    theme: "ecommerce",
    icon: "cart",
  },
  {
    title: "Nutri AI",
    type: "Health",
    description: "Nutrition-focused AI app for signing in and getting personalized food guidance.",
    url: "https://nutri-ai-seven-chi.vercel.app/signin",
    theme: "booking",
    icon: "spark",
  },
  {
    title: "Site Forge Live",
    type: "Portfolio",
    description: "Live Site Forge experience for showcasing and launching web projects.",
    url: "https://siteforges.github.io/site-forge-live/",
    theme: "ai",
    icon: "spark",
  },
];

const icons = {
  briefcase: '<svg viewBox="0 0 24 24"><path d="M9 7V5h6v2m-10 4h14M5 7h14v12H5z" /></svg>',
  cart: '<svg viewBox="0 0 24 24"><path d="M5 5h2l2 10h8l2-7H8M10 20h.01M17 20h.01" /></svg>',
  user: '<svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" /></svg>',
  calendar: '<svg viewBox="0 0 24 24"><path d="M7 4v3m10-3v3M5 8h14M5 5h14v15H5z" /></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /></svg>',
  spark: '<svg viewBox="0 0 24 24"><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm6 11 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z" /></svg>',
};

const grid = document.querySelector("#projectGrid");
const filterButtons = document.querySelectorAll(".filter-button");

function arrowIcon() {
  return '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h13m-5-5 5 5-5 5" /></svg>';
}

function projectCard(project) {
  const linkAttrs = project.url === "#"
    ? 'href="#contact"'
    : `href="${project.url}" target="_blank" rel="noreferrer"`;

  return `
    <article class="project-card ${project.featured ? "is-featured" : ""}" data-type="${project.type}">
      <div class="project-preview theme-${project.theme}" aria-hidden="true">
        <div class="browser-bar"><span></span><span></span><span></span></div>
        <div class="preview-canvas">
          <div class="preview-copy">
            <span class="mock-line accent"></span>
            <span class="mock-line"></span>
            <span class="mock-line short"></span>
            <span class="mock-button"></span>
          </div>
          <div class="mock-media"></div>
        </div>
      </div>
      <div class="project-body">
        <div class="project-icon" aria-hidden="true">${icons[project.icon]}</div>
        <div class="project-content">
          <div class="project-title-row">
            <h3>${project.title}</h3>
            <span class="type-label">${project.type}</span>
          </div>
          <p>${project.description}</p>
          <a class="project-link" ${linkAttrs}>
            <span>View Site</span>
            ${arrowIcon()}
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderProjects(filter = "All") {
  const visibleProjects = filter === "All"
    ? projects
    : projects.filter((project) => project.type === filter);

  grid.innerHTML = visibleProjects.map(projectCard).join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-selected", "true");
    renderProjects(button.dataset.filter);
  });
});

document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const details = formData.get("details");

  const subject = encodeURIComponent(`New ALEX AI project from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject details:\n${details}`);
  const mailto = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

  document.querySelector("#formStatus").innerHTML =
    `Project note ready. <a href="${mailto}">Open Email Draft</a>`;
});

renderProjects();
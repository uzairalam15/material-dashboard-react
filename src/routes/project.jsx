import ProjectView from "views/Project/ProjectView.jsx";

const ProjectsRoutes = [
  {
    path: "/projects",
    sidebarName: "Projects",
    navbarName: "Projects",
    component: ProjectView
  },
  { redirect: true, path: "/", to: "/programs", navbarName: "Redirect" }
];

export default ProjectsRoutes;

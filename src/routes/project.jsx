import ProjectView from "views/Project/ProjectView.jsx";
import ProjectDetailView from "views/Project/ProjectDetailView.jsx";

const ProjectsRoutes = [
  {
    path: "/projects",
    sidebarName: "Projects",
    navbarName: "Projects",
    component: ProjectView
  },
  {
    path: "/projectDetails",
    sidebarName: "projectDetails",
    navbarName: "projectDetails",
    component: ProjectDetailView
  }
];

export default ProjectsRoutes;

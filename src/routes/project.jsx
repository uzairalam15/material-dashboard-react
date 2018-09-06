import ProjectView from "views/Project/ProjectView.jsx";
import ProjectDetailView from "views/Project/ProjectDetailView.jsx";
import ProjectAnalysisView from "views/Project/ProjectAnalysisView.jsx";

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
  },
  {
    path: "/projectAnalysis",
    sidebarName: "projectAnalysis",
    navbarName: "projectAnalysis",
    component: ProjectAnalysisView
  }
];

export default ProjectsRoutes;

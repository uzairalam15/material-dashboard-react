import ProgramContainer from "containers/Program/ProgramContainer.jsx";
import ProjectContainer from "containers/Project/ProjectContainer.jsx";
import ProjectDetailContainer from "containers/Project/ProjectDetailContainer.jsx";
import ProjectAnalysisContainer from "containers/Project/ProjectAnalysisContainer.jsx";

const indexRoutes = [
  { path: "/", component: ProgramContainer },
  { path: "/programs", component: ProgramContainer },
  { path: "/projects", component: ProjectContainer },
  { path: "/projectDetails", component: ProjectDetailContainer },
  { path: "/projectAnalysis", component: ProjectAnalysisContainer }
];

export default indexRoutes;

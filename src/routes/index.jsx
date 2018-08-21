import ProgramContainer from "containers/Program/ProgramContainer.jsx";
import ProjectContainer from "containers/Project/ProjectContainer.jsx";
import ProjectDetailContainer from "containers/Project/ProjectDetailContainer.jsx";

const indexRoutes = [
  { path: "/programs", component: ProgramContainer },
  { path: "/projects", component: ProjectContainer },
  { path: "/projectDetails", component: ProjectDetailContainer }
];

export default indexRoutes;

import ProgramContainer from "containers/Program/ProgramContainer.jsx";
import ProjectContainer from "containers/Project/ProjectContainer.jsx";
//import ProjectContainer from "layouts/Program/ProjectContainer.jsx";

const indexRoutes = [
  { path: "/", component: ProgramContainer },
  { path: "/programs", component: ProgramContainer },
  { path: "/projects", component: ProjectContainer }
];

export default indexRoutes;

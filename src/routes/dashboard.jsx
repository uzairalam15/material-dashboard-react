// @material-ui/icons
import GraphicEq from "@material-ui/icons/GraphicEq";
import Timeline from "@material-ui/icons/Timeline";
// core components/views
// import DashboardPage from "views/Dashboard/Dashboard.jsx";
// import FullGraph from "views/FullGraph/FullGraph.jsx";
import Projects from "views/Projects/Projects.jsx";
import ProjectDetail from "views/ProjectDetail/ProjectDetail.jsx";

const dashboardRoutes = [
  {
    path: "/projects",
    sidebarName: "Projects",
    navbarName: "Projects",
    icon: Timeline,
    component: Projects
  },
  {
    path: "/projectDetail",
    nosidebar: true,
    navbarName: "Project Detail",
    icon: Timeline,
    component: ProjectDetail
  },
  { redirect: true, path: "/", to: "/projects", navbarName: "Redirect" }
];

export default dashboardRoutes;

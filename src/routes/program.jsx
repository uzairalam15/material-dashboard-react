import ProgramView from "views/Program/ProgramView.jsx";

const ProgramsRoutes = [
  {
    path: "/programs",
    sidebarName: "Programs",
    navbarName: "Programs",
    component: ProgramView
  },
  { redirect: true, path: "/", to: "/programs", navbarName: "Redirect" }
];

export default ProgramsRoutes;

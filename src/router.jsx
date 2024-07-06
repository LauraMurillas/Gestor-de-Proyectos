/* eslint-disable react-refresh/only-export-components */
import {
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import AuthLayout from "./layouts/auth.layout"; 
import IndexProjects from "./pages/projects/index-projects.page";
import ProjectsLayout from "./layouts/projects.layout";
import CreateProject, { action as createProjectAction } from './pages/projects/create-project.page';
import Project from './pages/projects/project.page';
import { action as addTaskAction } from './compnents/projects/project-detail';
import EditProject from "./pages/projects/edit-project.page"
import { action as editProjectAction } from './compnents/projects/form-edit-project';
import GestionTasks, { loader as loaderTasks } from "./pages/tasks/gestion-tasks.page";

import { AuthProvider } from "./context/AuthProvider";
import RouteProtected from "./layouts/route-protected.layout";

import IndexPage from "./pages/projects/index-page";
const routes = createBrowserRouter([
    {// se deberian controlar el token de alguna forma
        path: "/",
        element:  <AuthLayout />,
        loader: IndexPage
    },
    {     
        path: "/projects",
        element: (() => (
            <RouteProtected>
                <ProjectsLayout />
            </RouteProtected>
        ))(),
        children: [
            {
                index: true,
                element: <IndexProjects />
            },
            {
                path: '/projects/create-project',
                element: <CreateProject />,
                action: createProjectAction,
            },
            {
                path: '/projects/:projectId',
                element: <Project />,
                action: addTaskAction
            },
            {
                path: "/projects/:projectId/edit",
                element: <EditProject />,
                action: editProjectAction
            },
            {
                path: "/projects/:projectId/tasks",
                element: <GestionTasks />,
                loader: loaderTasks
            }
        ]
    }
]);

function Router() {
    return (
        <AuthProvider>
            <RouterProvider router={routes} />
        </AuthProvider>
    );
}

export default Router;

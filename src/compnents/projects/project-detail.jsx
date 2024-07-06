/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Fab, Grid, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { isValidArray, isValidObject } from "../../helpers/validators";
//import TableUsers from "../users/table-users";
import { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import { generateUniqueId } from "../../helpers/unique_id";
import FormAddTasks from "../tasks/form-add-task";
import AddIcon from '@mui/icons-material/Add';
//import useAuth from "../../hooks/useAuth";
import TableTask from "../tasks/table-task";
import TaskList from "../tasks/task-list";

// add task action form
export async function action({ request }) {
    const errors = [];

    try {
        const fd = await request.formData();
        const values = Object.fromEntries(fd);

        const { limitDate, taskDescription } = values;
        if("".includes(limitDate) && "".includes(taskDescription)) errors.push("los campos son requeridos")
        if ("".includes(limitDate)) errors.push("la fecha limite es requerida");
        if ("".includes(taskDescription)) errors.push("el nombre de la tarea es requerido");
    
        // envio de datos
        if (Object.values(values)) {
            const task = {
                ...values,
                complete: false,
                id: generateUniqueId()
            }
            return [task, []];
        }
    } catch (e) {
        throw new Error(e.message);
    }

    return [null, errors];
}
// button fab classes
const classes = {
    customFab: {
        backgroundColor: 'bg-slate-900',
        color: 'white'
    }
}

const AddTasksButton = ({ addTask, setAddTask }) => {

    const handdlerAddTasks = (ev) => {
        ev.preventDefault();
        setAddTask(true);
    }

    return (<>
            { !addTask && <Fab
                title="add tasks"
                onClick={handdlerAddTasks}
                classes={classes.customFab}
                aria-label="add"
                variant="extended"
                size="small"
                color="primary"
                type="submit"
            >
                <AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} /> Add Tasks
            </Fab>}
    </>
    );
}





// page principal
const ProjectDetail = ({ project, updateProjectTasks, updateProject }) => {
    const [addTask, setAddTask] = useState(false);
    //const [addUsers, setAddUsers] = useState(false);
    const [tasks, setTasks] = useState(project?.tasks ?? []);
    const [newTask, errors] = useActionData() || [];
    
    //const [users, setUsers] = useState(project?.users ?? []);// projecto inside and user list from bbdd

    //const { auth } = useAuth();
    //const { user } = auth;

    //const isAdmin = isValidObject(user) && user?.role === "ADMIN";
    

    useEffect(
        () => {
            addTask && isValidObject(newTask) && (async () => {
                if (newTask) {
                    const nt = {
                        ...newTask,
                        limitDate: newTask?.limitDateTask,
                        taskDescription: newTask?.taskDescription
                    }
                    const modified = [...tasks, nt ];
                    const response = await updateProjectTasks({ id: project.id, tasks: nt });
                    isValidObject(response) && setTasks(modified);
                }
            })();

        }, [newTask]
    );



    return (
        <main className="p-4 mx-4 w-full">
            <Grid className="w-full" container>
                <Grid className="py-3 text-start" item xs={12} sm={12} md={4} lg={4}>
                    Project Name: <strong>{` ${project?.projectName}`} </strong>
                </Grid>
                <Grid className="py-3 text-start" item xs={12} sm={12} md={4} lg={4}>
                    Limit Date: <strong>{` ${project.limitDate ?? '-'}`}</strong>
                </Grid>
                <Grid className="py-3 text-start whitespace-nowrap" item xs={12} sm={12} md={4} lg={4}>
                    Project Description: <strong>{` ${project.description ?? 'Empty Description'}`} </strong>
                </Grid>
            </Grid>
            {/*  Tasks */}
            {
                <section className="flex items-center py-6 my-auto w-2/3">
                    {
                        addTask && <FormAddTasks errors={errors} setAddTask={setAddTask} />
                    }
                    <AddTasksButton
                        addTask={addTask}
                        setAddTask={setAddTask}
                    />
                </section>
            }
            {/* table task */}
            <section className="w-2/3 ml-0 mr-auto my-auto">
                <Typography
                    className="text-left"
                    margin={2}
                    variant="h5"
                    gutterBottom
                    component="div"
                > Tasks </Typography>
                {
                    isValidArray(project.tasks) && <>
                        {
                            tasks?.length === 0 && !addTask && <p className="font-semibold mr-2">No task in this project.</p>
                        }
                        
                        <TaskList tasks={project.tasks} />
                    </>
                }
            </section>
            
            <section className="w-2/3 ml-0 mr-auto my-auto">
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                >
                    Members
                </Typography>
                
            </section>
        </main>
    );
}
export default ProjectDetail;
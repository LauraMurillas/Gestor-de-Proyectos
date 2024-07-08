/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";
import { Provider, connect } from "react-redux";
import "./index.css";
import store from "./store/store";
import {
    SET_GET_PROJECTS,
    SET_GET_PROJECTS_SUCCESS,
    SET_GET_PROJECTS_ERROR,
    SET_GET_PROJECTS_CLEAR
} from "./store/project.slice";

const sequelize = require('./config/database');
const Project = require('./models/Project');
const Task = require('./models/Task');

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
  
const mapState = state => state;

const actionsCreator = {
    SET_GET_PROJECTS,
    SET_GET_PROJECTS_SUCCESS,
    SET_GET_PROJECTS_ERROR,
    SET_GET_PROJECTS_CLEAR
};

const ConectedRouter = connect(mapState, actionsCreator)(Router);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <ConectedRouter />
        </Provider>
    </React.StrictMode>
);

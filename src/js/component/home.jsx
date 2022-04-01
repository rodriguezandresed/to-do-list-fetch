import React, { useState, useEffect } from "react";
import InputTask from "./InputTask.jsx";
import ToDoList from "./ToDoList.jsx";

//create your first component
const URL_BASE = "https://assets.breatheco.de/apis/fake/todos/user";

const Home = () => {
	let initialState = {
		label: "",
		done: false,
	};

	//objeto de tasks
	const [taskToDo, setTaskToDo] = useState([]);
	// task individual
	const [taskVar, setTaskVar] = useState(initialState);
	const [error, setError] = useState(false);

	const handleChangeTask = (event) => {
		setTaskVar({ ...taskVar, [event.target.name]: event.target.value });
	};

	//PUT
	const handleAddTask = async (event) => {
		try {
			if (event.key === "Enter") {
				let response = await fetch(`${URL_BASE}/arodriguez`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},

					body: JSON.stringify([...taskToDo, taskVar]),
				});
				if (response.ok) {
					getToDos();
					setError(false);
					setTaskVar(initialState);
				} else {
					console.log(response.status);
				}
			} else {
				setError(true);
				return;
			}
		} catch {
			console.log(error);
		}
	};

	// para borrar
	const handleDelete = async (id) => {
		let newTasks = taskToDo.filter((item, index) => index != id);
		try {
			let response = await fetch(`${URL_BASE}/arodriguez`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify(newTasks),
			});
			let result = await response.json();
			if (response.ok) {
				setTaskVar({ label: "", done: false });
				getToDos();
			} else {
				return;
			}
		} catch {
			console.log(error);
		}
	};

	// GET DE LA API

	const getToDos = async () => {
		try {
			let response = await fetch(`${URL_BASE}/arodriguez`);
			let data = await response.json();
			if (response.ok) {
				setTaskToDo(data);
			} else {
				addTasks();
			}
		} catch (error) {
			console.log(error);
		}
	};

	//POST

	const addTasks = async () => {
		try {
			let response = await fetch(`${URL_BASE}/arodriguez`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify([]),
			});
			if (response.ok) {
				getToDos();
			} else {
				alert(`Error algo fallo ${response.statusText}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getToDos();
	}, []);

	return (
		<>
			<div className="container">
				<InputTask
					taskVar={taskVar}
					handleChangeTask={handleChangeTask}
					handleAddTask={handleAddTask}
				/>
				<ToDoList taskToDo={taskToDo} handleDelete={handleDelete} />
			</div>
		</>
	);
};

export default Home;

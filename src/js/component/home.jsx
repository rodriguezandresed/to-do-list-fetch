import React, { useState, useEffect } from "react";
import InputTask from "./InputTask.jsx";
import ToDoList from "./ToDoList.jsx";

//create your first component
const URL_BASE = "assets.breatheco.de/apis/fake/todos/user";

const Home = () => {
	let initialState = {
		task: "",
	};

	//objeto de tasks
	const [taskToDo, setTaskToDo] = useState([]);
	// task individual
	const [taskVar, setTaskVar] = useState(initialState);
	const [error, setError] = useState(false);

	const handleChangeTask = (event) => {
		setTaskVar({
			//crea una copia del objeto para que mantenga los valores (el ...array)
			...taskVar,
			[event.target.name]: event.target.value,
		});
	};

	const handleAddTask = (event) => {
		if (event.key != "Enter") {
			setTaskToDo([...taskToDo, taskVar]);
			setTaskVar(initialState);
			setError(false);
		} else {
			setError(true);
		}
	};

	// para borrar
	const handleDelete = (id) => {
		let newTasks = taskToDo.filter((item, index) => index != id);
		setTaskToDo(newTasks);
	};

	const getToDos = async () => {
		try {
			let response = await fetch(`${URL_BASE}/arodriguez`);
			let data = await response.json();
			if (!response.ok) {
				console.log(`Error algo fallo ${response.statusText}`);
				return;
			}
			setTaskVar(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getToDos();
	}, []);

	//PUT
	fetch("https://assets.breatheco.de/apis/fake/todos/user/arodriguez", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},

		body: JSON.stringify([taskVar]),
	}).then((response) => {
		response.json().then((data) => {
			console.log(data);
		});
	});

	//GET
	fetch("https://assets.breatheco.de/apis/fake/todos/user/arodriguez", {
		method: "GET",
		body: JSON.stringify(taskVar),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((resp) => {
			console.log(resp.ok); // will be true if the response is successfull
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			console.log(resp.text()); // will try return the exact result as string
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		})
		.then((data) => {
			//here is were your code should start after the fetch finishes
			console.log(data); //this will print on the console the exact object received from the server
		})
		.catch((error) => {
			//error handling
			console.log(error);
		});

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

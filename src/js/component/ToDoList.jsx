import React from "react";
import PropTypes from "prop-types";

const ToDoList = ({ taskToDo, handleDelete }) => {
	return (
		<div>
			<ul className="list-group m-0">
				{taskToDo.map((item, index) => (
					<div key={index}>
						<li
							key={index}
							className="list-group-item"
							onClick={() => handleDelete(index)}>
							{item.label}
						</li>
					</div>
				))}
			</ul>
		</div>
	);
};

ToDoList.propTypes = {
	TaskToDo: PropTypes.array,
};

export default ToDoList;

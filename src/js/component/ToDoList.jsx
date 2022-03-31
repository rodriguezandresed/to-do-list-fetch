import React from "react";
import PropTypes from "prop-types";

const ToDoList = ({ taskToDo, handleDelete }) => {
	return (
		<div>
			<ul className="list-group">
				{taskToDo.map((item, index) => (
					<div key={index}>
						<li
							key={index}
							className="list-group-item"
							onClick={() => handleDelete(index)}>
							{item.task}
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

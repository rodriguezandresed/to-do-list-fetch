import React from "react";
import PropTypes from "prop-types";

const InputTask = ({ taskVar, handleChangeTask, handleAddTask }) => {
	return (
		<form>
			<div className="form-group my-3">
				<label>Task to Do</label>
				<input
					type="text"
					placeholder="Task to Do!"
					className="form-control"
					name="task"
					value={taskVar.task}
					onChange={handleChangeTask}
					onKeyUp={handleAddTask}
				/>
			</div>
		</form>
	);
};

InputTask.propTypes = {
	taskVar: PropTypes.object,
	handleChangeTask: PropTypes.func,
	handleAddTask: PropTypes.func,
};

export default InputTask;

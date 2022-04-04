import React from "react";
import PropTypes from "prop-types";

const InputTask = ({
	taskVar,
	handleChangeTask,
	handleAddTask,
	handleEvent,
}) => {
	return (
		<form>
			<div className="form-group pt-4">
				<input
					type="text"
					placeholder="What needs to be done?"
					className="form-control"
					name="label"
					value={taskVar.label}
					onChange={handleChangeTask}
					onKeyUp={handleAddTask}
					onKeyDown={handleEvent}
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

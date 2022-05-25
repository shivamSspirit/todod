import React, { useState, useEffect } from "react";
import axios from "axios";
export const Context = React.createContext("defaultContext");

const AppContext = (props) => {
	const [defaultTaskList, setDefaultTasklist] = useState(null);

	const FetchTask = async () => {
		const response = await axios.get('http://localhost:3001/tasks', (req, res) => {
			console.log(res)
		})
		setDefaultTasklist(response.data);
	}

	useEffect(() => {
		FetchTask();
	}, [])

	const setTaskData = (data) => {
		setDefaultTasklist(defaultTaskList.concat(data))
	}

	let contextValue = {
		defaultTaskList,
		setTaskData
	};

	return (
		<>
			<Context.Provider value={contextValue}>
				{props.children}
			</Context.Provider>
		</>
	);
};

export default AppContext;
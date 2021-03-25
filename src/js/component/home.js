import React, { useState, useEffect } from "react";

//create your first component
export function Home() {
	const [tarea, setTarea] = useState("");
	const [listaTareas, setlistaTareas] = useState([]);

	useEffect(() => {
		traerTarea();
	}, []);

	const agregarTarea = () => {
		enviarTarea();
		setlistaTareas([...listaTareas, { label: tarea, done: false }]);
		setTarea("");
	};

	/*----------- */
	const DeleteItems = indexItem => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let listaNueva = listaTareas.filter(
			(todo, index) => index !== indexItem
		);

		var raw = JSON.stringify(listaNueva);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/edges696",
			requestOptions
		)
			.then(response => response.json())
			.then(result => traerTarea())
			.catch(error => console.log("error", error));
	};
	/* -------- */
	function traerTarea() {
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/edges696",
			requestOptions
		)
			.then(response => response.json())
			.then(result => setlistaTareas(result))
			.catch(error => console.log("error", error));
	}

	/*---enviar tarea */
	function enviarTarea() {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify([
			...listaTareas,
			{ label: tarea, done: false }
		]);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/edges696",
			requestOptions
		)
			.then(response => response.json())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	}

	return (
		<div className="col-6 mx-auto text-center bg-white shadow mt-5 rounded pb-5">
			<div className="row">
				<h1 className="text-center col">TAREAS</h1>
			</div>
			<div className="row">
				<div className="col-9 input-groupp">
					<input
						className="form-control"
						type="text"
						value={tarea}
						onChange={e => setTarea(e.target.value)}></input>
				</div>
				<div className="col-3">
					<button onClick={agregarTarea} className="btn btn-dark">
						Añadir Tarea
					</button>
				</div>
				<div className="col-12 py-5">
					<ul className="list-group">
						{listaTareas.map((item, index) => {
							return (
								<li key={index} className="list-group-item">
									{item.label}
									<button
										className="btn"
										onClick={() => DeleteItems(index)}>
										<i className="fas fa-trash-alt" />
									</button>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="col-12 text-left">
					{listaTareas.length} Tareas Pendientes
				</div>
			</div>
		</div>
	);
}

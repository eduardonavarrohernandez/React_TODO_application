import React, { useState } from "react";

//create your first component
export function Home() {
	const [tarea, setTarea] = useState("");
	const [listaTareas, setlistaTareas] = useState([]);

	const agregarTarea = () => {
		if (tarea == "") {
			alert("Por Favor Agrega una tarea");
		} else {
			setlistaTareas([...listaTareas, tarea]);
			setTarea("");
		}
	};
	const DeleteItems = indexItem => {
		setlistaTareas(prevState =>
			prevState.filter((todo, index) => index !== indexItem)
		);
	};
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
									{item}
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

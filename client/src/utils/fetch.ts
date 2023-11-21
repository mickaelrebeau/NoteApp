export interface Notes {
	title: string;
	description: string;
	label: string;
	[key: string]: string;
}

export interface User {
	username?: string;
	email: string;
	password: string;
}

export interface UpdateUser {
	username?: string;
	email?: string;
	password?: string;
}

export const signup = async (user: User) => {
	const response = await fetch("http://localhost:3000/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	return data;
}

export const login = async (user: User) => {
	const response = await fetch("http://localhost:3000/auth/signin", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	return data;
}

export const getUser = async (userId: string) => {
	try {
		const response = await fetch(`http://localhost:3000/user/${userId}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export const getUsername = async (userId: string) => {
	try {
		const response = await fetch(`http://localhost:3000/user/${userId}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data.username;
	} catch (error) {
		console.error(error);
	}
};

export const updateUser = async (userId: string, user: UpdateUser) => {
	const response = await fetch(`http://localhost:3000/user/${userId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	return data;
};

export const postNote = async (note: Notes, files: File[]) => {
	const formData = new FormData();

	for (const key in note) {
		formData.append(key, note[key]);
	}

	for (const file of files) {
		formData.append("files", file);
	}

	const response = await fetch("http://localhost:3000/note", {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	return data;
};

export const updateNote = async (id: string, note: Notes, files: File[]) => {
	const formData = new FormData();

	for (const key in note) {
		formData.append(key, note[key]);
	}

	for (const file of files) {
		formData.append("files", file);
	}

	const response = await fetch(`http://localhost:3000/note/${id}`, {
		method: "PUT",
		body: formData,
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	return data;
};

export const getNotes = async () => {
	const response = await fetch("http://localhost:3000/note");
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
	return data;
};

export const getNote = async (noteId: string) => {
	const response = await fetch(`http://localhost:3000/note/${noteId}`);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data = await response.json();
	return data;
};

export const deleteNote = async (noteId: string) => {
	const response = await fetch(`http://localhost:3000/note/${noteId}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	return data;
}

export const deleteFile = async (fileId: string) => {
	const response = await fetch(`http://localhost:3000/files/${fileId}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	return data;
}

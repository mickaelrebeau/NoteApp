import * as z from "zod";

export const signupSchema = z.object({
	username: z
		.string()
		.min(3, {message: "Le nom d'utilisateur doit contenir au moins 3 caractères !"})
		.max(20, {message: "Le nom d'utilisateur ne peut pas contenir plus de 20 caractères !"})
		.refine((value) => /^[a-zA-Z0-9]+$/.test(value), {message: "Le nom d'utilisateur ne doit contenir que des lettres et des chiffres !"}),
	email: z.string().email({ message: "L'email n'est pas valide !" }),
	password: z
		.string()
		.min(8, {message: "Le mot de passe doit contenir au moins 8 caractères !"})
		.max(50, {message: "Le mot de passe ne peut pas contenir plus de 50 caractères !"})
		.refine((value) => /[A-Z]/.test(value), {message: "Le mot de passe doit contenir au moins une majuscule"})
		.refine((value) => /[0-9]/.test(value), {message: "Le mot de passe doit contenir au moins un chiffre"})
		.refine((value) => /[!@#$%^&*]/.test(value), {message: "Le mot de passe doit contenir au moins un caractère speciaux (!@#$%^&*)"}),
});

export type Signup = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
	email: z.string().email({ message: "L'email n'est pas valide !" }),
	password: z
		.string()
		.min(8, {
			message: "Le mot de passe doit contenir au moins 8 caractères !",
		})
		.max(50, {
			message: "Le mot de passe ne peut pas contenir plus de 50 caractères !",
		})
		.refine((value) => /[A-Z]/.test(value), {
			message: "Le mot de passe doit contenir au moins une majuscule",
		})
		.refine((value) => /[0-9]/.test(value), {
			message: "Le mot de passe doit contenir au moins un chiffre",
		})
		.refine((value) => /[!@#$%^&*]/.test(value), {
			message:
				"Le mot de passe doit contenir au moins un caractère speciaux (!@#$%^&*)",
		}),
});

export type Login = z.infer<typeof loginSchema>;

export const noteSchema = z.object({
	title: z
		.string()
		.min(3, { message: "Le titre doit contenir au moins 3 caractères !" })
		.max(50, {
			message: "Le titre ne peut pas contenir plus de 50 caractères !",
		}),
	description: z
		.string()
		.min(3, {
			message: "La description doit contenir au moins 3 caractères !",
		}),
	label: z.string(),
});

export type Notes = z.infer<typeof noteSchema>;

export const userSchema = z.object({
	username: z
		.string()
		.min(3, { message: "Le pseudo doit contenir au moins 3 caractères !" })
		.max(20, {
			message: "Le pseudo ne peut pas contenir plus de 20 caractères !",
		}),
	email: z.string().email({ message: "L'email n'est pas valide !" }),
	password: z
		.string()
		.min(8, {
			message: "Le mot de passe doit contenir au moins 8 caractères !",
		})
		.max(50, {
			message: "Le mot de passe ne peut pas contenir plus de 50 caractères !",
		})
		.refine((value) => /[A-Z]/.test(value), {
			message: "Le mot de passe doit contenir au moins une majuscule",
		})
		.refine((value) => /[0-9]/.test(value), {
			message: "Le mot de passe doit contenir au moins un chiffre",
		})
		.refine((value) => /[!@#$%^&*]/.test(value), {
			message:
				"Le mot de passe doit contenir au moins un caractère speciaux (!@#$%^&*)",
		}),
});

export type User = z.infer<typeof userSchema>;

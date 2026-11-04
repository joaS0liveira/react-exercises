import { z } from "zod";

//LOGICA: desmancho o AAAA-MM-DD e monto um Date local; new Date("2000-02-31") é interpretado em UTC
// e um parsed "à meia-noite UTC" pode parecer futuro em fusos à frente de Greenwich
function toISODate(value: string) {
    const [year, month, day] = value.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    //LOGICA: new Date(2000, 1, 31) arredonda para 2 de março, então exijo que o dia tenha sobrevivido
    const isRealDay = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

    return isRealDay ? date : null;
}

//LOGICA: "hoje" é recalculado a cada validação; se vivesse à escala do módulo congelava no momento do import
function adultLimit() {
    const limit = new Date();
    limit.setFullYear(limit.getFullYear() - 18);
    return limit;
}

export const registerSchema = z.object({
    firstName: z.string().min(2, { error: "O nome precisa de pelo menos 2 letras." }),
    lastName: z.string().min(2, { error: "O apelido precisa de pelo menos 2 letras." }),
    //LOGICA: as regras correm por ordem e param na primeira falha, por isso o obrigatório vem antes do formato
    birthDate: z.string()
        .min(1, { error: "A data de nascimento é obrigatória." })
        .regex(/^\d{4}-\d{2}-\d{2}$/, { error: "Usa o formato AAAA-MM-DD." })
        .refine((value) => toISODate(value) !== null, { error: "Essa data não existe." })
        .refine((value) => {
            const date = toISODate(value);
            return date !== null && date <= new Date();
        }, { error: "A data não pode ser futura." })
        .refine((value) => {
            const date = toISODate(value);
            return date !== null && date <= adultLimit();
        }, { error: "Precisas de ter pelo menos 18 anos." }),
    email: z.email({ error: "Introduz um email válido." }),
    password: z.string()
        .min(8, { error: "A password precisa de pelo menos 8 caracteres." })
        .regex(/[A-Z]/, { error: "A password precisa de uma letra maiúscula." })
        .regex(/[0-9]/, { error: "A password precisa de um número." }),
});

export type RegisterForm = z.infer<typeof registerSchema>;

export const registerDefaults: RegisterForm = {
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
};

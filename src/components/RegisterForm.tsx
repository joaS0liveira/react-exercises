import { useState } from "react";
import { Controller, useForm, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerDefaults, type RegisterForm } from "../schemas/register";

//LOGICA: cada classe vai escrita por extenso; o Tailwind só apanha literais, não strings montadas em runtime
const inputClass = "w-full rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm outline-none focus:border-stone-500";
const invalidInputClass = "w-full rounded-md border border-red-400 bg-white px-2 py-1 text-sm outline-none focus:border-red-500";
const submitClass = "rounded-md bg-stone-800 px-3 py-1 text-sm font-medium text-stone-100 transition-all hover:cursor-pointer hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60";

//LOGICA: props partilhadas pelos cinco campos; o label e o id nascem do próprio nome, por isso a associação
// htmlFor/id nunca se desencontra e o span de erro é sempre ligado pelo aria-describedby
interface FieldProps {
    name: keyof RegisterForm;
    label: string;
    control: Control<RegisterForm>;
    type: string;
    autoComplete: string;
    hasError: boolean;
    message?: string;
}

function Field({ name, label, control, type, autoComplete, hasError, message }: FieldProps) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm font-medium text-stone-800">{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        id={name}
                        type={type}
                        autoComplete={autoComplete}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        aria-invalid={hasError}
                        aria-describedby={hasError ? `${name}-error` : undefined}
                        className={hasError ? invalidInputClass : inputClass}
                    />
                )}
            />
            {hasError && (
                <span id={`${name}-error`} role="alert" className="text-xs text-red-600">{message}</span>
            )}
        </div>
    );
}

export default function RegisterForm() {

    const [confirmation, setConfirmation] = useState("");

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
        defaultValues: registerDefaults,
    });

    //LOGICA: sem este await o isSubmitting duraria 0ms e nunca se via o botão desabilitado
    async function onSubmit(data: RegisterForm) {
        setConfirmation("");

        await new Promise((resolve) => setTimeout(resolve, 400));

        setConfirmation(`Registo confirmado: ${data.firstName} ${data.lastName}`);
        reset(registerDefaults);
    }

    return (
        //LOGICA: noValidate desliga as mensagens nativas do browser; sem isto um email mal formado
        // bloqueia o submit antes de chegar ao handleSubmit e o Zod nunca é consultado
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <Field
                name="firstName"
                label="Nome"
                control={control}
                type="text"
                autoComplete="given-name"
                hasError={Boolean(errors.firstName)}
                message={errors.firstName?.message}
            />
            <Field
                name="lastName"
                label="Apelido"
                control={control}
                type="text"
                autoComplete="family-name"
                hasError={Boolean(errors.lastName)}
                message={errors.lastName?.message}
            />
            <Field
                name="birthDate"
                label="Data de nascimento"
                control={control}
                type="date"
                autoComplete="bday"
                hasError={Boolean(errors.birthDate)}
                message={errors.birthDate?.message}
            />
            <Field
                name="email"
                label="Email"
                control={control}
                type="email"
                autoComplete="email"
                hasError={Boolean(errors.email)}
                message={errors.email?.message}
            />
            <Field
                name="password"
                label="Password"
                control={control}
                type="password"
                autoComplete="new-password"
                hasError={Boolean(errors.password)}
                message={errors.password?.message}
            />

            {confirmation && (
                <p role="status" className="text-sm text-green-700">{confirmation}</p>
            )}

            <div>
                <button type="submit" disabled={isSubmitting} className={submitClass}>
                    {isSubmitting ? "A registar..." : "Registar"}
                </button>
            </div>
        </form>
    );
}

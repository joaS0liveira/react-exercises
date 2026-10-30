interface UserGreetingProps {
    user: User
}

export default function UserGreeting({ user }: UserGreetingProps) {
    
    if (!user) {
        return <h1>Olá, Anónimo</h1>
    }
    return <>
        <div className="bg-red-500 p-4">
            <h1>Olá,{user.prefix} {user.primeiro} {user.ultimo}</h1>
        </div>
    </>
}
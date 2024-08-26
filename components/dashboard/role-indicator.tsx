


export default function RoleIndicator({role}: {role: "observer" | "super-user" | "admin" | "partner";}) {
    return <div className="w-fit bg-primary-cBlue6F px-2 py-1 text-white text-[10px] leading-tight rounded uppercase">
        <span>{role}</span>
    </div>;
}
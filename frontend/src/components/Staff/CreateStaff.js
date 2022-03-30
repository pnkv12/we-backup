import { useState } from "react";

const CreateStaff = () => {

    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [username, setUsername]=useState("");
    const [email, setEmail] = useState("");
    const [role, setRole]= useState("");
    const [department, setDepartment] = useState("");
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const staff = {first_name, last_name, username, email, role, department};

        setIsPending(true);

        fetch('http://localhost:8080/employee', {
            method:'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(staff)
        }).then(() => {
            console.log(staff);
            console.log("new user added");
            setIsPending(false);
        })
    }

    return ( 
        <div className="create">
            <h2>Hello from react</h2>
            <form onSubmit={handleSubmit}>
                <label>First Name : </label>
                <input name="firstName" placeholder={first_name} onChange={e => setFirstname(e.target.value)}></input>
                <label>Last Name: </label>
                <input name="lastName" placeholder={last_name} onChange={e => setLastname(e.target.value)}></input>
                <label>Username: </label>
                <input name="username" placeholder={username} onChange={e => setUsername(e.target.value)}></input>
                <label>Email: </label>
                <input name="email" placeholder={email} onChange={e => setEmail(e.target.value)}></input>
                <label>Role: </label>
                <input name="role" placeholder={role} onChange={e => setRole(e.target.value)}></input>
                <label>Department: </label>
                <input name="department" placeholder={department} onChange={e => setDepartment(e.target.value)}></input>

                { !isPending && <button >Submit</button>}
                { isPending && <button disabled>Submitting...</button>}
            </form>
            {/* <div>{firstname}</div>
            <div>{lastname}</div>
            <div>{gender}</div> */}
        </div>
     );
}
//npx json-server --watch data/db.json --port 8080 
 
export default CreateStaff;
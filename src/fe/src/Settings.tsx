import axios from "axios"

export default function Settings() {

    const test = async () => {
        const r = await axios.get('/api/hello');
        alert(r.data);
    }

    return <div>Settings <button onClick={() => test()}>Test</button></div>
}
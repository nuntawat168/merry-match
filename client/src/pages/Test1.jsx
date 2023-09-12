import Modal from "../components/Modal";
import { useState } from "react";

function Test1() {
    const [showModal, setShowModal] = useState(false);
    const [showTest, setShowTest] = useState(false);

    return (
        <div className="bg-white w-full h-screen flex flex-col justify-center items-center">
            <button onClick={() => setShowModal(!showModal)}>Open Modal1</button>
            { showModal ? <Modal 
                            title="Cancel Complaint" 
                            confirmText="Do you sure to cancel this complaint?" 
                            btn1="Yes, cancel this complaint" 
                            btn2="No, give me more time"/> 
            : "" }
            <button 
                onClick={() => setShowTest(!showTest)}
                className="mt-5"
            >
                Open Modal2</button>
            { showTest? <Modal 
                            title="Resolve Complaint" 
                            confirmText="This complaint is resolved?" 
                            btn1="Yes, it has been resolved" 
                            btn2="No, it's not" /> 
            : ""} 
        </div>
    )
};

export default Test1;
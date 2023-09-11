function Modal({ title, text, btn1, btn2 }) {
    return (
        <div>
            <section>
                <p>{title}</p>
            </section>
            <section>
                <div>
                    <p>{text}</p>
                </div>
                <div>
                    <button>{btn1}</button>
                    <button>{btn2}</button>
                </div>
            </section>
        </div>
    )
}

export default Modal;
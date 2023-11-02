import Footer from "../component/Footer"
import Header from "../component/Header"
import Chat from "../chat/chat"
import "./DefaultLayout.scss"


function DefaultLayout({ children }) {
    return (
        <div className="wrapper">
            <Header />
            <div className="container">
                {children}
            </div>

            <Chat/>
            <Footer />
        </div>
    )
}

export default DefaultLayout
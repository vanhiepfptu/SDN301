import axios from "axios"
import { Fragment } from "react"
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "./components/Layout/DefaultLayout"
import Page404 from "./pages/404Page"
import { adminRoutes, privateRoutes, publicRoutes, staffRoutes } from "./routes"

axios.defaults.baseURL = "http://localhost:3001"

function App() {
    const account = useSelector(state => state.account)
    // console.log(account.role);
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout = null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                                key={index}
                            />
                        )
                    })}
                    {staffRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout = null) {
                            Layout = Fragment;
                        }
                        return (
                           ((account?.role === 2) &&  <Route
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                                key={index}
                            />)
                        )
                    })}
                    {adminRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout = null) {
                            Layout = Fragment;
                        }
                        return (
                            (account?.role === 1 && <Route
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                                key={index}
                            />)
                        )
                    })}
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </div>
            <ToastContainer />
        </BrowserRouter>
    )
}

export default App
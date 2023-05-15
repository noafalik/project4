import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Welcome from './comp_general/welcome'

export default function AppRouters() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
            </Routes>
            {/* <Routes>

            </Routes>
            <Routes>

            </Routes> */}
        </BrowserRouter>
    )
}

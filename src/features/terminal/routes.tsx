import { Route } from "react-router";
import { TerminalPage } from "./pages";

export const TerminalRoutes = (
    <Route path="devices/terminal/:id" element={<TerminalPage />}/>
)
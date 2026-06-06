import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import AssetList from "./pages/assets/AssetList";
import AssetDetail from "./pages/assets/AssetDetail";
import AssetCreate from "./pages/assets/AssetCreate";
import AssetEdit from "./pages/assets/AssetEdit";
import AssignmentList from "./pages/assignments/AssignmentList";
import AssignmentCreate from "./pages/assignments/AssignmentCreate";
import AssignmentDetails from "./pages/assignments/AssignmentDetails";
import AssignmentEdit from "./pages/assignments/AssignmentEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <AssetList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assets/:id"
          element={
            <ProtectedRoute>
              <AssetDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assets/create"
          element={
            <ProtectedRoute>
              <AssetCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assets/:id/edit"
          element={
            <ProtectedRoute>
              <AssetEdit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assignments"
          element={
            <ProtectedRoute>
              <AssignmentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assignments/create"
          element={
            <ProtectedRoute>
              <AssignmentCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assignments/:id"
          element={
            <ProtectedRoute>
              <AssignmentDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assignments/:id/edit"
          element={
            <ProtectedRoute>
              <AssignmentEdit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useNavigate } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";

import AssignmentForm from "./AssignmentForm";

import { createAssignment } from "../../api/assignments";

export default function AssignmentCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (
    data: any
  ) => {
    try {
      await createAssignment(data);

      navigate("/assignments");
    } catch (error) {
      console.error(error);

      alert("Failed to create assignment");
    }
  };

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">
        Create Assignment
      </h1>

      <AssignmentForm
        onSubmit={handleSubmit}
      />
    </AppLayout>
  );
}
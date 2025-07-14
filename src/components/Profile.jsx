import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateUserProfile, fetchUserProfile } from "../redux/authSlice";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [editableUserName, setEditableUserName] = useState(
    user?.userName || ""
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  const handleSave = async () => {
    await dispatch(updateUserProfile(editableUserName));
    setEditMode(false);
    setSuccess(true);

    // Masquer le message après 3 secondes (facultatif)
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleCancel = () => {
    setEditableUserName(user.userName);
    setEditMode(false);
  };

  const [success, setSuccess] = useState(false);

  if (!user) return <p>Chargement du profil...</p>;

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1 className="profile">Edit user info</h1>
        <div className="form-container">
          <label className="profile" htmlFor="username">
            Username:{" "}
          </label>
          <input
            type="text"
            className="field"
            value={editableUserName || user?.userName || ""}
            onChange={(e) => setEditableUserName(e.target.value)}
            readOnly={!editMode}
          />
        </div>
        <div className="form-container">
          <label className="profile" htmlFor="firstname">
            Firstname:{" "}
          </label>
          <input
            type="text"
            className="field"
            value={user.firstName}
            disabled
          />
        </div>
        <div className="form-container">
          <label className="profile" htmlFor="lastname">
            Last name:{" "}
          </label>
          <input type="text" className="field" value={user.lastName} disabled />
        </div>
        {!editMode ? (
          <button onClick={() => setEditMode(true)} className="btn-green">
            Edit Username
          </button>
        ) : (
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button onClick={handleSave} className="btn-green">
              Save
            </button>
            <button onClick={handleCancel} className="btn-green">
              Cancel
            </button>
          </div>
        )}
        {success && (
          <p
            className="success-msg"
            style={{ color: "#00bc77", marginTop: "1rem" }}
          >
            Username updated successfully ✅
          </p>
        )}
      </div>
    </main>
  );
}

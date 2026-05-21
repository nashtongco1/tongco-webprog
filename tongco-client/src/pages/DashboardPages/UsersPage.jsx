import { useEffect, useState } from "react";
import { fetchUsers, createUser, deleteUser } from "../../services/UserService";

const UsersPage = () => {
  const userType = localStorage.getItem("type");

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    age: "",
    gender: "Male",
    contactNumber: "",
    email: "",
    password: "",
    address: "N/A",
    type: "editor",
    isActive: true,
  });

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response.data.users || []);
    } catch (error) {
      setMessage("Failed to load users.");
    }
  };

  useEffect(() => {
    if (userType === "admin") {
      loadUsers();
    }
  }, [userType]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await createUser(formData);

      setMessage("User added successfully.");

      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        age: "",
        gender: "Male",
        contactNumber: "",
        email: "",
        password: "",
        address: "N/A",
        type: "editor",
        isActive: true,
      });

      loadUsers();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add user.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setMessage("User deleted successfully.");
      loadUsers();
    } catch (error) {
      setMessage("Failed to delete user.");
    }
  };

  if (userType !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-500 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">Access Denied</h1>
          <p className="text-xl">
            Only admin users can access the Users Management page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Users Management
        </h1>

        <p className="text-gray-500 mb-6">
          Add, view, and manage system users.
        </p>

        {message && (
          <div className="mb-5 bg-purple-100 text-purple-700 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Add New User
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-lg text-black"
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-lg text-black"
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-lg text-black"
            />

            <input
              type="text"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-lg text-black"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-lg text-black"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-lg text-black"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-lg text-black"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-lg text-black"
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-lg text-black"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>

            <select
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-lg text-black"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <button
              type="submit"
              className="md:col-span-2 bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Add User
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            User List
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Username</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-5 text-center text-gray-500 border"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b hover:bg-gray-50 text-gray-700"
                    >
                      <td className="p-3">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="p-3">{user.username}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3 capitalize">{user.type}</td>
                      <td className="p-3">
                        {user.isActive ? "Active" : "Inactive"}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
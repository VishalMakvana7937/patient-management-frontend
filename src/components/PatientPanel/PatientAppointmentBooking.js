import React, { useState, useEffect } from "react";
import { FaEye, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../Dashboard/Navbar";
import PatientSidebar from "./PatientSidebar";


const PatientAppointmentBooking = () => {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("scheduled");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        patientName: "",
        patientIssue: "",
        doctorName: "",
        diseaseName: "",
        appointmentTime: "",
        appointmentType: "",
        date: "",
        patientImage: "https://via.placeholder.com/150",
    });
    const navigate = useNavigate();

    // Load appointments from local storage
    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
        const validatedAppointments = storedAppointments.map((appointment) => ({
            ...appointment,
            date: appointment.date ? new Date(appointment.date) : null,
        }));
        setAppointments(validatedAppointments);
    }, []);

    const filteredAppointments = appointments.filter((appointment) => {
        const isNameMatch = appointment.patientName?.toLowerCase().includes(searchTerm.toLowerCase());
        const appointmentDate = appointment.date ? new Date(appointment.date) : null;

        if (!appointmentDate) return false;

        const today = new Date().toDateString();

        if (activeTab === "scheduled") {
            return isNameMatch && appointmentDate.toDateString() === today;
        } else if (activeTab === "pending") {
            return isNameMatch && appointmentDate > new Date();
        } else if (activeTab === "previous") {
            return isNameMatch && appointmentDate < new Date();
        } else {
            return false;
        }
    });

    const handleAddAppointment = (e) => {
        e.preventDefault();

        const newApp = {
            ...newAppointment,
            id: appointments.length + 1,
            date: new Date(newAppointment.date),
        };

        const updatedAppointments = [...appointments, newApp];
        localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
        setAppointments(updatedAppointments);
        setFormModal(false);
        setNewAppointment({
            patientName: "",
            patientIssue: "",
            doctorName: "",
            diseaseName: "",
            appointmentTime: "",
            appointmentType: "",
            date: "",
            patientImage: "https://via.placeholder.com/150",
        });
    };

    const handleViewDetails = (patient) => {
        setSelectedPatient(patient);
        setShowModal(true);
    };
 

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <PatientSidebar />
            <div className="flex-grow overflow-auto bg-gray-100">
                <div className="sticky top-0 z-10">
                    <Navbar />
                </div>
                <div className="flex flex-col h-full p-6 bg-gray-100">
                    <div className="flex mb-4 border-b border-gray-300">
                        {["scheduled", "pending", "previous"].map((tab) => (
                            <button
                                key={tab}
                                className={`px-6 py-2 text-lg font-semibold transition duration-300 ${activeTab === tab
                                    ? "text-[#0EABEB] border-b-4 border-[#0EABEB]"
                                    : "text-gray-600 border-b-4 border-transparent"
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)} Appointments
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Appointments
                        </h1>
                        <button
                            className="flex items-center px-4 py-2 text-white transition duration-300 bg-blue-700 border rounded-lg hover:bg-blue-800 focus:outline-none"
                            onClick={() => setFormModal(true)}
                        >
                            <FaPlus className="mr-2" />
                            Add Appointment
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {filteredAppointments.length === 0 ? (
                            <div className="p-4 text-center text-gray-500 col-span-full">
                                No data found. Please add a new appointment.
                            </div>
                        ) : (
                            filteredAppointments.map((appointment) => (
                                <div key={appointment.id} className="p-0 bg-white rounded-lg shadow-md">
                                    <div className="flex items-center justify-between p-2 bg-gray-200 rounded-t-lg">
                                        <h2 className="text-lg font-bold">{appointment.doctorName}</h2>
                                        <button
                                            className="text-gray-600 hover:text-blue-600"
                                            onClick={() => handleViewDetails(appointment)}
                                        >
                                            <FaEye />
                                        </button>
                                    </div>
                                    <div className="p-3">
                                        <div className="flex justify-between">
                                            <p className="font-medium">Appointment Type:</p>
                                            <p>{appointment.appointmentType}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-medium">Hospital Name:</p>
                                            <p>{appointment.diseaseName}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-medium">Appointment Date:</p>
                                            <p>{appointment.date ? new Date(appointment.date).toDateString() : "N/A"}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-medium">Appointment Time</p>
                                            <p>{appointment.appointmentTime}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-medium">Patient Issue</p>
                                            <p>{appointment.patientIssue}</p>
                                        </div>
                                        <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="px-4 py-2 mr-2 text-white bg-gray-500 rounded"
                                            onClick={() => setFormModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded">
                                         Reschedule
                                        </button>
                                    </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {formModal && (
                        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                                <h2 className="text-xl font-bold mb-4">Add New Appointment</h2>
                                <form onSubmit={handleAddAppointment}>
                                    <div className="mb-4">
                                        <label className="block mb-2 font-medium">Patient Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            value={newAppointment.patientName}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 font-medium">Patient Issue</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            value={newAppointment.patientIssue}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, patientIssue: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 font-medium">Doctor Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            value={newAppointment.doctorName}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 font-medium">Hospital Name:</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded"
                                            value={newAppointment.diseaseName}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, diseaseName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 font-medium">Appointment Time</label>
                                        <input
                                            type="time"
                                            className="w-full p-2 border rounded"
                                            value={newAppointment.appointmentTime}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, appointmentTime: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 font-medium">Appointment Type</label>
                                        <select
                                            className="w-full p-2 border rounded"
                                            value={newAppointment.appointmentType}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, appointmentType: e.target.value })}
                                            required
                                        >
                                            <option value="">Select</option>
                                            <option value="Onsite">Onsite</option>
                                            <option value="Online">Online</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 font-medium">Date</label>
                                        <input
                                            type="date"
                                            className="w-full p-2 border rounded"
                                            value={newAppointment.date}
                                            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="px-4 py-2 mr-2 text-white bg-gray-500 rounded"
                                            onClick={() => setFormModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientAppointmentBooking;

import React, { useState, useEffect } from "react"
import { Eye, Search, Plus } from "lucide-react"

const initialAppointments = [
  {
    id: 1,
    patientName: "John Doe",
    patientIssue: "Fever",
    doctorName: "Dr. Marcus Philips",
    diseaseName: "Influenza",
    appointmentTime: "10:00 AM",
    appointmentType: "In-person",
    date: new Date().toISOString(),
    patientDetails: {
      age: 32,
      gender: "Male",
      phone: "123-456-7890",
      address: "123 Elm Street",
    },
  },
  {
    id: 2,
    patientName: "Jane Smith",
    patientIssue: "Toothache",
    doctorName: "Dr. Hayle Schleifer",
    diseaseName: "Dental Infection",
    appointmentTime: "2:30 PM",
    appointmentType: "Online",
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    patientDetails: {
      age: 28,
      gender: "Female",
      phone: "987-654-3210",
      address: "456 Maple Street",
    },
  },
]

export default function Component() {
  const [appointments, setAppointments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("today")
  const [showModal, setShowModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientIssue: "",
    doctorName: "",
    diseaseName: "",
    appointmentTime: "",
    appointmentType: "In-person",
    date: new Date().toISOString().split('T')[0],
    patientDetails: {
      age: "",
      gender: "Male",
      phone: "",
      address: "",
    },
  })

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments')
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments))
    } else {
      setAppointments(initialAppointments)
      localStorage.setItem('appointments', JSON.stringify(initialAppointments))
    }
  }, [])

  const filteredAppointments = appointments.filter((appointment) => {
    const isNameMatch = appointment.patientName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const appointmentDate = new Date(appointment.date)
    const today = new Date()

    if (activeTab === "today") {
      return isNameMatch && appointmentDate.toDateString() === today.toDateString()
    } else if (activeTab === "upcoming") {
      return isNameMatch && appointmentDate > today
    } else if (activeTab === "previous") {
      return isNameMatch && appointmentDate < today
    } else {
      return false
    }
  })

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient)
    setShowModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setNewAppointment(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setNewAppointment(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (name, value) => {
    setNewAppointment(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAppointmentWithId = {
      ...newAppointment,
      id: appointments.length + 1,
    }
    const updatedAppointments = [...appointments, newAppointmentWithId]
    setAppointments(updatedAppointments)
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments))
    setShowNewAppointmentModal(false)
    setNewAppointment({
      patientName: "",
      patientIssue: "",
      doctorName: "",
      diseaseName: "",
      appointmentTime: "",
      appointmentType: "In-person",
      date: new Date().toISOString().split('T')[0],
      patientDetails: {
        age: "",
        gender: "Male",
        phone: "",
        address: "",
      },
    })
  }

  return (
    <>
    <div className="gap-4 h-50" style={{ width: "200%" }}>
    <div className="p-4 text-gray-900 bg-gray-50">
      <div className="flex mb-4 border-b border-gray-300">
        {["today", "upcoming", "previous", "cancel"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Appointment
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-4 mb-4 sm:flex-row">
        <h1 className="text-2xl font-semibold">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Appointments
        </h1>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={18} />
        </div>
        <button
          className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-500 rounded-md sm:w-auto hover:bg-blue-600"
          onClick={() => setShowNewAppointmentModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Appointment
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Patient Name</th>
              <th scope="col" className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Patient Issue</th>
              <th scope="col" className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Doctor Name</th>
              <th scope="col" className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Disease Name</th>
              <th scope="col" className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Appointment Time</th>
              <th scope="col" className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Appointment Type</th>
              <th scope="col" className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    
                    <p>No appointments found. Please add a new appointment.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4">{appointment.patientName}</td>
                  <td className="px-6 py-4">{appointment.patientIssue}</td>
                  <td className="px-6 py-4">{appointment.doctorName}</td>
                  <td className="px-6 py-4">{appointment.diseaseName}</td>
                  <td className="px-6 py-4">{appointment.appointmentTime}</td>
                  <td className="px-6 py-4">{appointment.appointmentType}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleViewDetails(appointment)}
                    >
                      <Eye className="inline-block mr-1" size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-xl font-semibold">Patient Details</h2>
            <p><strong>Name:</strong> {selectedPatient.patientName}</p>
            <p><strong>Issue:</strong> {selectedPatient.patientIssue}</p>
            <p><strong>Doctor:</strong> {selectedPatient.doctorName}</p>
            <p><strong>Disease:</strong> {selectedPatient.diseaseName}</p>
            <p><strong>Time:</strong> {selectedPatient.appointmentTime}</p>
            <p><strong>Type:</strong> {selectedPatient.appointmentType}</p>
            <div className="mt-4">
              <button
                className="w-full py-2 text-white bg-gray-500 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewAppointmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <form
            onSubmit={handleSubmit}
            className="p-6 bg-white rounded-lg shadow-lg w-96"
          >
            <h2 className="mb-4 text-xl font-semibold">Add New Appointment</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Patient Name</label>
              <input
                type="text"
                name="patientName"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                value={newAppointment.patientName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Issue</label>
              <input
                type="text"
                name="patientIssue"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                value={newAppointment.patientIssue}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
              <input
                type="text"
                name="doctorName"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                value={newAppointment.doctorName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Disease Name</label>
              <input
                type="text"
                name="diseaseName"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                value={newAppointment.diseaseName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
              <input
                type="time"
                name="appointmentTime"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                value={newAppointment.appointmentTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
              <input
                type="date"
                name="date"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                value={newAppointment.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Appointment Type</label>
              <select
                name="appointmentType"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                value={newAppointment.appointmentType}
                onChange={(e) => handleSelectChange('appointmentType', e.target.value)}
                required
              >
                <option value="In-person">In-person</option>
                <option value="Online">Online</option>
              </select>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowNewAppointmentModal(false)}
                className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
    </div>
    </>
  )
}

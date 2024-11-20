import React, { useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import noaptoday from '../images/no appointment today.png';
import { MdRemoveRedEye } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';

const TodayAppointment = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSlot, setNewSlot] = useState({
    patientName: '',
    diseaseName: '',
    issue: '',
    date: '',
    time: '',
    type: '',
  });

  const handleSlotChange = (e) => {
    const { name, value } = e.target;
    setNewSlot((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSlot = () => {
    if (Object.values(newSlot).some((field) => !field)) {
      alert('Please fill in all fields!');
      return;
    }
    setAppointments((prev) => [...prev, { id: Date.now(), ...newSlot }]);
    setNewSlot({
      patientName: '',
      diseaseName: '',
      issue: '',
      date: '',
      time: '',
      type: '',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-grow bg-gray-100">
        <div className="p-3 bg-white overflow">
          <div>
            <ul className="gap-4 p-0 pb-3 mb-1 cursor-pointer d-flex">
              {['today', 'upcoming', 'previous', 'cancel'].map((tab) => (
                <li
                  key={tab}
                  className={`first-item ${
                    activeTab === tab ? 'text-[#0EABEB] pb-2 border-b-3' : ''
                  }`}
                  style={{
                    borderBottom: activeTab === tab ? '3px solid #0EABEB' : 'none',
                  }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Appointment
                </li>
              ))}
            </ul>
          </div>
          <div className="justify-between d-flex">
            <h5 className="mt-1 text-semibold">Today Appointment</h5>
            <div className="gap-3 d-flex">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Patient"
                  className="py-2 rounded-3xl"
                  style={{
                    outline: 'none',
                    border: 'none',
                    backgroundColor: '#F6F8F8',
                    paddingLeft: '40px',
                    width: '250px',
                  }}
                />
                <button className="absolute p-1 transform -translate-y-1/2 rounded-lg left-2 top-1/2">
                  <LuSearch className="fw-bold" />
                </button>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-lg p-1 px-2 d-flex justify-content-center align-items-center bg-[#0EABEB] text-white"
              >
                <FaCalendarAlt className="me-2" /> Appointment Time Slot
              </button>
            </div>
          </div>
          <div className="gap-4 mt-4 h-50">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Patient Name</th>
                  <th className="px-6 py-3">Disease Name</th>
                  <th className="px-6 py-3">Patient Issue</th>
                  <th className="px-6 py-3">Appointment Date</th>
                  <th className="px-6 py-3">Appointment Time</th>
                  <th className="px-6 py-3">Appointment Type</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      <img
                        src={noaptoday}
                        width={350}
                        className="p-5 mx-auto d-block"
                      />
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <th className="px-6 py-2">{appointment.patientName}</th>
                      <td className="px-6 py-2">{appointment.diseaseName}</td>
                      <td className="px-6 py-2">{appointment.issue}</td>
                      <td className="px-6 py-2">{appointment.date}</td>
                      <td className="px-6 py-2">{appointment.time}</td>
                      <td className="px-6 py-2">{appointment.type}</td>
                      <td className="px-6 py-2">
                        <div className="d-flex align-items-center justify-content-center">
                          <MdRemoveRedEye className="text-[#0EABEB] fs-5" />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-5 bg-white rounded-lg w-96">
            <h3 className="mb-4 text-xl">Create Appointment Slot</h3>
            {['patientName', 'diseaseName', 'issue', 'date', 'time', 'type'].map((field) => (
              <input
                key={field}
                name={field}
                value={newSlot[field]}
                onChange={handleSlotChange}
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                className="w-full p-2 mb-3 border rounded"
              />
            ))}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-white bg-gray-500 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSlot}
                className="px-4 py-2 bg-[#0EABEB] text-white rounded"
              >
                Add Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayAppointment;

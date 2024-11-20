import React, { useState } from "react";
import { FaSearch, FaPhone, FaEye, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../Dashboard/Navbar";
import { LuCalendarX2 } from "react-icons/lu";
import PatientSidebar from "./PatientSidebar";
import { FaCalendarDays } from "react-icons/fa6";
import { IoCloseCircleOutline, IoDownload } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";

const appointments = [
    // Existing data
    {
        id: 1,
        patientName: "John Doe",
        patientIssue: "Fever",
        doctorName: "Dr. Marcus Philips",
        diseaseName: "Pneumonia",
        appointmentTime: "10:00 AM",
        appointmentType: "Onsite",
        date: new Date(),
        hospitalName: "City Hospital",
        patientDetails: {
            age: 32,
            gender: "Male",
            phone: "123-456-7890",
            address: "123 Elm Street",
        },
        file: {
            name: "prescription1.pdf",
            size: "200 KB",
            imgSrc: "link-to-image-1.jpg"
        }
    },
    // Additional 15 entries
    {
        id: 2,
        patientName: "Jane Smith",
        patientIssue: "Toothache",
        doctorName: "Dr. Hayle Schleifer",
        diseaseName: "Cavity",
        appointmentTime: "2:30 PM",
        appointmentType: "Online",
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        hospitalName: "Dental Clinic",
        patientDetails: {
            age: 28,
            gender: "Female",
            phone: "987-654-3210",
            address: "456 Maple Street",
        },
        file: {
            name: "prescription2.pdf",
            size: "150 KB",
            imgSrc: "link-to-image-2.jpg"
        }
    },
    {
        id: 1,
        patientName: "John Doe",
        patientIssue: "Fever",
        doctorName: "Dr. Marcus Philips",
        diseaseName: "Pneumonia",
        appointmentTime: "10:00 AM",
        appointmentType: "Onsite",
        date: new Date(),
        hospitalName: "City Hospital",
        patientDetails: {
            age: 32,
            gender: "Male",
            phone: "123-456-7890",
            address: "123 Elm Street",
        },
        file: {
            name: "prescription1.pdf",
            size: "200 KB",
            imgSrc: "link-to-image-1.jpg"
        }
    },
    {
        id: 2,
        patientName: "Jane Smith",
        patientIssue: "Toothache",
        doctorName: "Dr. Hayle Schleifer",
        diseaseName: "Cavity",
        appointmentTime: "2:30 PM",
        appointmentType: "Online",
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        hospitalName: "Dental Clinic",
        patientDetails: {
            age: 28,
            gender: "Female",
            phone: "987-654-3210",
            address: "456 Maple Street",
        },
        file: {
            name: "prescription2.pdf",
            size: "150 KB",
            imgSrc: "link-to-image-2.jpg"
        }
    },
    {
        id: 3,
        patientName: "Alice Johnson",
        patientIssue: "Back Pain",
        doctorName: "Dr. Emily Davis",
        diseaseName: "Herniated Disc",
        appointmentTime: "11:00 AM",
        appointmentType: "Online",
        date: new Date(new Date().setDate(new Date().getDate() - 1)),
        hospitalName: "Wellness Center",
        patientDetails: {
            age: 45,
            gender: "Female",
            phone: "555-555-5555",
            address: "789 Oak Street",
        },
        canceled: true,
        file: {
            name: "prescription3.pdf",
            size: "300 KB",
            imgSrc: "link-to-image-3.jpg"
        }
    },
    {
        id: 4,
        patientName: "Robert Brown",
        patientIssue: "Headache",
        doctorName: "Dr. Linda Taylor",
        diseaseName: "Migraine",
        appointmentTime: "9:00 AM",
        appointmentType: "Onsite",
        date: new Date(new Date().setDate(new Date().getDate() + 2)),
        hospitalName: "General Hospital",
        patientDetails: {
            age: 36,
            gender: "Male",
            phone: "555-123-4567",
            address: "101 Pine Street",
        },
        file: {
            name: "prescription4.pdf",
            size: "220 KB",
            imgSrc: "link-to-image-4.jpg"
        }
    },
    {
        id: 5,
        patientName: "Sarah Miller",
        patientIssue: "Chest Pain",
        doctorName: "Dr. Thomas Evans",
        diseaseName: "Angina",
        appointmentTime: "3:30 PM",
        appointmentType: "Online",
        date: new Date(new Date().setDate(new Date().getDate() + 3)),
        hospitalName: "Heart Care Center",
        patientDetails: {
            age: 52,
            gender: "Female",
            phone: "555-765-4321",
            address: "202 Birch Avenue",
        },
        file: {
            name: "prescription5.pdf",
            size: "180 KB",
            imgSrc: "link-to-image-5.jpg"
        }
    },
    {
        id: 6,
        patientName: "Michael Wilson",
        patientIssue: "Stomach Ache",
        doctorName: "Dr. Stephanie Moore",
        diseaseName: "Gastritis",
        appointmentTime: "8:30 AM",
        appointmentType: "Onsite",
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
        hospitalName: "City Medical Center",
        patientDetails: {
            age: 30,
            gender: "Male",
            phone: "555-908-7654",
            address: "303 Cedar Road",
        },
        file: {
            name: "prescription6.pdf",
            size: "250 KB",
            imgSrc: "link-to-image-6.jpg"
        }
    },
    {
        id: 7,
        patientName: "Emily Adams",
        patientIssue: "Sore Throat",
        doctorName: "Dr. Henry Parker",
        diseaseName: "Tonsillitis",
        appointmentTime: "1:00 PM",
        appointmentType: "Online",
        date: new Date(new Date().setDate(new Date().getDate() + 4)),
        hospitalName: "West End Clinic",
        patientDetails: {
            age: 22,
            gender: "Female",
            phone: "555-564-1234",
            address: "404 Oak Street",
        },
        file: {
            name: "prescription7.pdf",
            size: "300 KB",
            imgSrc: "link-to-image-7.jpg"
        }
    },
    {
        id: 8,
        patientName: "David Clark",
        patientIssue: "Knee Pain",
        doctorName: "Dr. Jane Lee",
        diseaseName: "Arthritis",
        appointmentTime: "10:45 AM",
        appointmentType: "Onsite",
        date: new Date(new Date().setDate(new Date().getDate() - 3)),
        hospitalName: "Sports Med Center",
        patientDetails: {
            age: 41,
            gender: "Male",
            phone: "555-876-5432",
            address: "505 Elm Street",
        },
        file: {
            name: "prescription8.pdf",
            size: "210 KB",
            imgSrc: "link-to-image-8.jpg"
        }
    },
    {
        id: 9,
        patientName: "Sophia Taylor",
        patientIssue: "Fatigue",
        doctorName: "Dr. Jennifer Harris",
        diseaseName: "Chronic Fatigue Syndrome",
        appointmentTime: "4:15 PM",
        appointmentType: "Online",
        date: new Date(new Date().setDate(new Date().getDate() + 5)),
        hospitalName: "Wellness Clinic",
        patientDetails: {
            age: 37,
            gender: "Female",
            phone: "555-432-1098",
            address: "606 Maple Avenue",
        },
        file: {
            name: "prescription9.pdf",
            size: "240 KB",
            imgSrc: "link-to-image-9.jpg"
        }
    },
    {
        id: 10,
        patientName: "James Garcia",
        patientIssue: "Vision Issues",
        doctorName: "Dr. Michelle Carter",
        diseaseName: "Cataracts",
        appointmentTime: "11:30 AM",
        appointmentType: "Onsite",
        date: new Date(new Date().setDate(new Date().getDate() + 6)),
        hospitalName: "Eye Care Institute",
        patientDetails: {
            age: 58,
            gender: "Male",
            phone: "555-987-6543",
            address: "707 Pine Street",
        },
        file: {
            name: "prescription10.pdf",
            size: "200 KB",
            imgSrc: "link-to-image-10.jpg"
        }
    },
    {
        id: 11,
        patientName: "Isabella Moore",
        patientIssue: "Skin Rash",
        doctorName: "Dr. Laura Roberts",
        diseaseName: "Eczema",
        appointmentTime: "9:30 AM",
        appointmentType: "Online",
        date: new Date(new Date().setDate(new Date().getDate() + 7)),
        hospitalName: "Skin Care Center",
        patientDetails: {
            age: 27,
            gender: "Female",
            phone: "555-654-3210",
            address: "808 Birch Lane",
        },
        file: {
            name: "prescription11.pdf",
            size: "260 KB",
            imgSrc: "link-to-image-11.jpg"
        }
    },
    {
        id: 12,
        patientName: "Sophia Taylor",
        patientIssue: "Fatigue",
        doctorName: "Dr. Jennifer Harris",
        diseaseName: "Chronic Fatigue Syndrome",
        appointmentTime: "4:15 PM",
        appointmentType: "Online",
        date: new Date(new Date().setDate(new Date().getDate() + 5)),
        hospitalName: "Wellness Clinic",
        patientDetails: {
            age: 37,
            gender: "Female",
            phone: "555-432-1098",
            address: "606 Maple Avenue",
        },
        file: {
            name: "prescription9.pdf",
            size: "240 KB",
            imgSrc: "link-to-image-9.jpg"
        }
    },
    {
        id: 13,
        patientName: "James Garcia",
        patientIssue: "Vision Issues",
        doctorName: "Dr. Michelle Carter",
        diseaseName: "Cataracts",
        appointmentTime: "11:30 AM",
        appointmentType: "Onsite",
        date: new Date(new Date().setDate(new Date().getDate() + 6)),
        hospitalName: "Eye Care Institute",
        patientDetails: {
            age: 58,
            gender: "Male",
            phone: "555-987-6543",
            address: "707 Pine Street",
        },
        file: {
            name: "prescription10.pdf",
            size: "200 KB",
            imgSrc: "link-to-image-10.jpg"
        }
    },
    {
        id: 14,
        patientName: "Michael Wilson",
        patientIssue: "Stomach Ache",
        doctorName: "Dr. Stephanie Moore",
        diseaseName: "Gastritis",
        appointmentTime: "8:30 AM",
        appointmentType: "Onsite",
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
        hospitalName: "City Medical Center",
        patientDetails: {
            age: 30,
            gender: "Male",
            phone: "555-908-7654",
            address: "303 Cedar Road",
        },
        file: {
            name: "prescription6.pdf",
            size: "250 KB",
            imgSrc: "link-to-image-6.jpg"
        }
    },
    {
        id: 15,
        patientName: "Emily Adams",
        patientIssue: "Sore Throat",
        doctorName: "Dr. Henry Parker",
        diseaseName: "Tonsillitis",
        appointmentTime: "1:00 PM",
        appointmentType: "Online",
        date: new Date(new Date().setDate(new Date().getDate() + 4)),
        hospitalName: "West End Clinic",
        patientDetails: {
            age: 22,
            gender: "Female",
            phone: "555-564-1234",
            address: "404 Oak Street",
        },
        file: {
            name: "prescription7.pdf",
            size: "300 KB",
            imgSrc: "link-to-image-7.jpg"
        }
    },
];

const PrescriptionAccess = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (imgSrc) => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <PatientSidebar />
            <div className="flex-grow overflow-auto bg-gray-100">
                <div className="sticky top-0 z-10">
                    <Navbar />
                </div>
                <div className="flex flex-col h-full">
                    <div className="min-h-screen p-6 bg-gray-100">
                        <div className="flex mb-4 border-b border-gray-300"></div>

                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold text-gray-800">Prescription Access</h1>
                            <button
                                className="flex items-center px-4 py-2 ml-4 text-black transition duration-300 border rounded-lg hover:bg-gray-200 focus:outline-none"
                                onClick={() => navigate("")}>
                                <FaCalendarDays className="mr-2" />
                                2 Jan, 2022 - 13 Jan, 2022
                                <IoCloseCircleOutline className="text-red-700 ms-2" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <div key={appointment.id} className="p-0 bg-white rounded-lg shadow-md">
                                        <div className="flex items-center justify-between p-2 mb-3 bg-gray-200 rounded-t-lg">
                                            <h2 className="text-lg font-bold">{appointment.doctorName}</h2>
                                            <div className="flex gap-2">
                                                <IoDownload className="inline mr-2" />
                                                <FaEye onClick={() => openModal(appointment.file.imgSrc)} className="cursor-pointer" />
                                            </div>
                                        </div>
                                        <p className="flex justify-between mx-4">
                                            <strong>Hospital Name:</strong> {appointment.hospitalName}
                                        </p>
                                        <p className="flex justify-between mx-4">
                                            <strong>Disease Name:</strong> {appointment.diseaseName}
                                        </p>
                                        <p className="flex justify-between mx-4">
                                            <strong>Date:</strong> {appointment.date.toDateString()}
                                        </p>
                                        <p className="flex justify-between mx-4">
                                            <strong>Time:</strong> {appointment.appointmentTime}
                                        </p>
                                        <div className="flex items-center justify-between p-2 mx-4 mb-4 border rounded-lg">
                                            <FaImage className="w-8 h-8 p-1 text-gray-600 border rounded-lg" />
                                            <div className="flex-1 ml-4">
                                                <div className="text-gray-800">{appointment.file.name}</div>
                                                <div className="text-gray-500">{appointment.file.size}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 col-span-full">
                                    No scheduled appointments found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative rounded-lg">
                        <button onClick={closeModal} className="absolute text-gray-600 top-2 right-2">
                            <IoCloseCircleOutline className="w-6 h-6" />
                        </button>
                        <img src="../them1.png" alt="Prescription" className="max-w-full max-h-[80vh] rounded-lg" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrescriptionAccess;

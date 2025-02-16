import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Search, Plus, CheckCircle2 } from 'lucide-react';

interface Facility {
    id: number;
    name: string;
    type: string;
    capacity: number;
    location: string;
    image: string;
    description: string;
    availability: {
        date: string;
        slots: {
            time: string;
            isAvailable: boolean;
        }[];
    }[];
}

const facilities: Facility[] = [
    {
        id: 1,
        name: "Main Auditorium",
        type: "Auditorium",
        capacity: 500,
        location: "Main Building, Ground Floor",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=400&fit=crop",
        description: "State-of-the-art auditorium with advanced audio-visual equipment and stage lighting.",
        availability: [
            {
                date: "2024-03-15",
                slots: [
                    { time: "09:00 AM - 12:00 PM", isAvailable: true },
                    { time: "02:00 PM - 05:00 PM", isAvailable: false },
                    { time: "06:00 PM - 09:00 PM", isAvailable: true }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Conference Room A",
        type: "Conference Room",
        capacity: 50,
        location: "Academic Block, First Floor",
        image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&h=400&fit=crop",
        description: "Modern conference room with presentation facilities and video conferencing setup.",
        availability: [
            {
                date: "2024-03-15",
                slots: [
                    { time: "09:00 AM - 11:00 AM", isAvailable: true },
                    { time: "11:00 AM - 01:00 PM", isAvailable: true },
                    { time: "02:00 PM - 04:00 PM", isAvailable: false }
                ]
            }
        ]
    },
    {
        id: 3,
        name: "Sports Complex",
        type: "Sports Facility",
        capacity: 200,
        location: "Sports Block",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop",
        description: "Multi-purpose sports complex with indoor courts for basketball, badminton, and volleyball.",
        availability: [
            {
                date: "2024-03-15",
                slots: [
                    { time: "06:00 AM - 09:00 AM", isAvailable: true },
                    { time: "09:00 AM - 12:00 PM", isAvailable: false },
                    { time: "04:00 PM - 07:00 PM", isAvailable: true }
                ]
            }
        ]
    }
];

const FacilityBooking = () => {
    const [selectedDate, setSelectedDate] = useState("2024-03-15");
    const [selectedType, setSelectedType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [newBookingModalOpen, setNewBookingModalOpen] = useState(false);

    // New States for Booking Form
    const [bookingFacility, setBookingFacility] = useState<Facility | null>(null);
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [bookings, setBookings] = useState<any[]>([])

    const openNewBookingModal = () => {
        setNewBookingModalOpen(true);
    };

    const closeNewBookingModal = () => {
        setNewBookingModalOpen(false);
        // Reset form fields when closing the modal
        setBookingFacility(null);
        setBookingDate("");
        setBookingTime("");
    };

    const handleCreateBooking = () => {
        if (bookingFacility && bookingDate && bookingTime) {
            // In a real application, you would send this data to your backend
            // to create the booking in a database.  For this example, we'll
            // just simulate adding it to a list of bookings.

            const newBooking = {
                facility: bookingFacility.name,
                date: bookingDate,
                time: bookingTime,
            };

            // Update the bookings state
            setBookings([...bookings, newBooking]);

            console.log('New booking created:', newBooking);
            closeNewBookingModal(); // Close the modal after booking
            alert(`Booked ${bookingFacility.name} on ${bookingDate} at ${bookingTime}`)
        } else {
            alert("Please fill in all the booking details.");
        }
    };

    return (
        <div className="container mx-auto mt-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Facility Booking</h1>
                        <p className="text-lg text-gray-600">Book college facilities for your events and activities.</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-powder-500 text-white rounded-xl font-medium hover:bg-powder-600 transition-colors flex items-center gap-2"
                        onClick={openNewBookingModal}
                    >
                        <Plus className="w-4 h-4" />
                        New Booking
                    </motion.button>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 bg-powder-50 px-4 py-2 rounded-xl">
                        <Search className="w-4 h-4 text-powder-600" />
                        <input
                            type="text"
                            placeholder="Search facilities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent text-sm font-medium text-powder-800 focus:outline-none w-full"
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-powder-50 px-4 py-2 rounded-xl">
                        <Calendar className="w-4 h-4 text-powder-600" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-transparent text-sm font-medium text-powder-800 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-powder-50 px-4 py-2 rounded-xl">
                        <MapPin className="w-4 h-4 text-powder-600" />
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="bg-transparent text-sm font-medium text-powder-800 focus:outline-none w-full"
                        >
                            <option value="all">All Facilities</option>
                            <option value="auditorium">Auditoriums</option>
                            <option value="conference">Conference Rooms</option>
                            <option value="sports">Sports Facilities</option>
                            <option value="labs">Laboratories</option>
                        </select>
                    </div>
                </div>
            </motion.div>
            <div className="grid grid-cols-1 gap-6">
                {facilities.map((facility) => (
                    <motion.div
                        key={facility.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-soft border border-powder-100 overflow-hidden"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                            <div className="relative h-48 md:h-full">
                                <img
                                    src={facility.image}
                                    alt={facility.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="col-span-2 p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{facility.name}</h3>
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {facility.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                Capacity: {facility.capacity}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-powder-600 bg-powder-50 px-3 py-1 rounded-full">
                                        {facility.type}
                                    </span>
                                </div>

                                <p className="text-gray-700 mb-4">{facility.description}</p>

                                <div className="border-t border-powder-100 pt-4">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Available Time Slots</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {facility.availability[0].slots.map((slot, index) => (
                                            <motion.button
                                                key={index}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${slot.isAvailable
                                                    ? 'bg-powder-50 text-powder-600 hover:bg-powder-100'
                                                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                disabled={!slot.isAvailable}
                                            >
                                                <Clock className="w-4 h-4" />
                                                {slot.time}
                                                {!slot.isAvailable && <span className="text-xs">(Booked)</span>}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* New Booking Modal */}
            {newBookingModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                New Booking
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Here you can add details for a new facility booking.
                                </p>
                            </div>

                            {/* Booking Form */}
                            <div className="mt-4">
                                <label htmlFor="facility" className="block text-gray-700 text-sm font-bold mb-2">Facility:</label>
                                <select
                                    id="facility"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={(e) => {
                                        const selectedFacilityId = parseInt(e.target.value);
                                        const selectedFacility = facilities.find(f => f.id === selectedFacilityId) || null;
                                        setBookingFacility(selectedFacility);
                                    }}
                                    value={bookingFacility ? bookingFacility.id : ''}
                                >
                                    <option value="">Select a Facility</option>
                                    {facilities.map((facility) => (
                                        <option key={facility.id} value={facility.id}>
                                            {facility.name}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    value={bookingDate}
                                />

                                <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2 mt-4">Time:</label>
                                <input
                                    type="time"
                                    id="time"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={(e) => setBookingTime(e.target.value)}
                                    value={bookingTime}
                                />
                            </div>

                            <div className="items-center px-4 py-3">
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                                    onClick={closeNewBookingModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 ml-2 bg-powder-500 text-white rounded-md hover:bg-powder-700 focus:outline-none focus:shadow-outline"
                                    onClick={handleCreateBooking}
                                >
                                    Create Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacilityBooking;

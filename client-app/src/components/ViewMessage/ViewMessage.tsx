import React, { useEffect, useState } from "react";
import axios from "axios";
import './ViewMessage.css';

interface UserMessage {
    id: number;
    userName: string;
    email: string;
    phone: string;
    message: string;
    createTimestamp: string;
}

const ViewMessage = () => {
    const [messages, setMessages] = useState<UserMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Default to 10 items per page
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        // Fetch data from the API
        const fetchMessages = async () => {
            try {
                const response = await axios.get<UserMessage[]>("http://localhost:8083/api/messages/reading");
                setMessages(response.data);
                setError(""); // Clear error if successful
            } catch (err) {
                setError("Failed to fetch messages.");
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchMessages();
    }, []);

    // Handle items per page change
    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when items per page changes
    };

    // Paginate messages
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMessages = messages.slice(startIndex, startIndex + itemsPerPage);

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(messages.length / itemsPerPage);

    return (
        <div className="viewMessageContainer">
            <center>
                <h2>Customer Messages</h2>
            </center>
            {loading && <p>Loading messages...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
                <>
                    <div className="controls">
                        <label htmlFor="itemsPerPage">Show:</label>
                        <select
                            id="itemsPerPage"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="itemsPerPageSelect"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span> entries</span>
                    </div>
                    <table className="messageTable">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <th>Created At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedMessages.map((msg) => (
                            <tr key={msg.id}>
                                <td>{msg.id}</td>
                                <td>{msg.userName}</td>
                                <td>{msg.email}</td>
                                <td>{msg.phone}</td>
                                <td>{msg.message}</td>
                                <td>{new Date(msg.createTimestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`pageButton ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewMessage;

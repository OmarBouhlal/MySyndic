import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaHome, FaEdit, FaEye, FaEyeSlash, FaCamera } from 'react-icons/fa';
import '../css/Profile.css';
import UserNavBar from '../components/NavBar/UserNavBar';

export default function Profile() {
    const { id } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        immeuble: "",
        appartement: "",
        password: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/api/user/${id}`);
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch profile');
                }
                
                const data = await response.json();
                setProfileData({
                    firstName: data.firstName || data.FirstName || "",
                    lastName: data.lastName || data.LastName || "",
                    email: data.email || "",
                    immeuble: data.immeuble || data.Immeuble || "",
                    appartement: data.appartement || data.Appartement || "",
                    password: "********" 
                });
                setFormData({
                    email: data.email || "",
                    password: ""
                });
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfileData();
    }, [id]);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/updateUser/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile');
            }

            const data = await response.json();
            setProfileData(prev => ({
                ...prev,
                email: data.email
            }));
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <>
                <UserNavBar/>
                <div className="loading-container">Loading profile...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <UserNavBar/>
                <div className="error-container">Error: {error}</div>
            </>
        );
    }

    return (
        <>
            <UserNavBar/>
            <div className="profile-card">
                <div className="card-header">
                    <div className="profile-img-container">
                        <img
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                            alt="Profile"
                            className="profile-img"
                        />
                        <div className="img-overlay">
                            <FaCamera />
                        </div>
                    </div>
                    <h1 className="profile-name">
                        {profileData.firstName} {profileData.lastName}
                    </h1>
                </div>
                <div className="card-body">
                    <div className="info-section">
                        <div className="info-item">
                            <div className="icon"><FaUser /></div>
                            <div className="info-content">
                                <span className="info-label">Full Name</span>
                                <span className="info-value">
                                    {profileData.firstName} {profileData.lastName}
                                </span>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="icon"><FaEnvelope /></div>
                            <div className="info-content">
                                <span className="info-label">Email</span>
                                <span className="info-value">{profileData.email}</span>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="icon"><FaLock /></div>
                            <div className="info-content">
                                <span className="info-label">Password</span>
                                <span className={`info-value ${!showPassword ? 'password' : ''}`}>
                                    {showPassword ? profileData.password : '••••••••'}
                                </span>
                                <button className="show-password" onClick={togglePassword}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div className="address-section">
                            <div className="info-item">
                                <div className="icon"><FaBuilding /></div>
                                <div className="info-content">
                                    <span className="info-label">Immeuble</span>
                                    <span className="info-value">{profileData.immeuble}</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="icon"><FaHome /></div>
                                <div className="info-content">
                                    <span className="info-label">Appartement</span>
                                    <span className="info-value">{profileData.appartement}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                        <FaEdit /> Edit Profile
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="dialog-overlay">
                    <div className="dialog">
                        <h2>Edit Profile</h2>
                        <div className="dialog-content">
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter new email"
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter new password"
                                />
                            </div>
                        </div>
                        <div className="dialog-actions">
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                            <button onClick={handleEdit}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { profileAPI } from '../services/api';
import { fixImageUrl } from '../utils/imageHelper';

function AdminProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    profileAPI
      .getById(id)
      .then(setProfile)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="center">Loading...</p>;
  if (error) return <p className="center error">{error}</p>;
  if (!profile) return null;

  const imageUrl = fixImageUrl(profile.image);

  return (
    <div className="container admin-profile-page">
      <Link to="/" className="back-link">
        &larr; Back to Home
      </Link>

      <div className="admin-profile-card">
        <div className="admin-profile-header">
          <div className="admin-profile-avatar">
            {imageUrl ? (
              <img src={imageUrl} alt={profile.name} />
            ) : (
              <span>{profile.name?.[0]?.toUpperCase() || 'A'}</span>
            )}
          </div>
          <div>
            <h1>{profile.name || 'Admin'}</h1>
            {profile.designation && (
              <p className="admin-profile-role">{profile.designation}</p>
            )}
          </div>
        </div>

        {profile.about && (
          <div className="admin-profile-about">
            <h3>About</h3>
            <p>{profile.about}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProfile;

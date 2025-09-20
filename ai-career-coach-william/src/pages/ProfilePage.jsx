import React, { useEffect, useState } from 'react';
import { profile } from '../lib/api';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [academicInfo, setAcademicInfo] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [languages, setLanguages] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setError('');
        const res = await profile.get();
        const p = res.data.profile || {};
        setAcademicInfo(p.academicInfo || '');
        setSkills((p.skills || []).join(', '));
        setInterests((p.interests || []).join(', '));
        setLanguages((p.languages || []).join(', '));
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function onSave(e) {
    e.preventDefault();
    try {
      setSaving(true);
      setError('');
      await profile.update({
        academicInfo: academicInfo || null,
        skills: skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [],
        interests: interests ? interests.split(',').map(s => s.trim()).filter(Boolean) : [],
        languages: languages ? languages.split(',').map(s => s.trim()).filter(Boolean) : [],
      });
      alert('Profile saved');
    } catch (err) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
      <form onSubmit={onSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Academic Info</label>
          <textarea className="mt-1 w-full border rounded p-2" rows={3} value={academicInfo} onChange={(e) => setAcademicInfo(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
          <input className="mt-1 w-full border rounded p-2" value={skills} onChange={(e) => setSkills(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Interests (comma separated)</label>
          <input className="mt-1 w-full border rounded p-2" value={interests} onChange={(e) => setInterests(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Languages (comma separated)</label>
          <input className="mt-1 w-full border rounded p-2" value={languages} onChange={(e) => setLanguages(e.target.value)} />
        </div>
        <button disabled={saving} className="px-4 py-2 bg-indigo-600 text-white rounded">
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
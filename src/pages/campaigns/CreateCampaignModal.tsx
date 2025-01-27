// src/pages/campaigns/CreateCampaignModal.tsx
import { useState } from 'react';
import styled from 'styled-components';
import { createCampaign } from '../../lib/firestore';
import { auth } from '../../lib/firebase';
import { Campaign, CampaignMember } from '../../types/user';
import { AuthInput, AuthButton } from '../../components/ui/AuthBox';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 90%;
  max-width: 600px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateCampaignModal = ({ onClose, onSuccess }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser?.displayName) {
      setError('User profile not found');
      return;
    }

    setLoading(true);
    try {
      const timestamp = {
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0
      };

      const currentMember: CampaignMember = {
        uid: auth.currentUser.uid,
        username: auth.currentUser.displayName,
        role: 'dm',
        joinedAt: timestamp
      };

      const newCampaign: Omit<Campaign, 'id' | 'inviteCode'> = {
        name,
        description,
        imageUrl: '',
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: auth.currentUser.uid,
        memberUIDs: [auth.currentUser.uid],
        members: [currentMember]
      };

      console.log('Creating campaign...');
      await createCampaign(newCampaign, image);
      console.log('Campaign created successfully');
      onSuccess();
    } catch (err) {
      console.error('Error creating campaign:', err);
      setError(err instanceof Error ? err.message : 'Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <h2>Create New Campaign</h2>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <Form onSubmit={handleSubmit}>
          <AuthInput
            type="text"
            placeholder="Campaign Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <AuthInput
            as="textarea"
            placeholder="Campaign Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ minHeight: '100px' }}
          />
          <AuthInput
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          <AuthButton type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Campaign'}
          </AuthButton>
        </Form>
      </Modal>
    </Overlay>
  );
};
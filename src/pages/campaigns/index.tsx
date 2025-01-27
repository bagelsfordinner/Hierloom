// src/pages/campaigns/index.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import { getUserCampaigns } from '../../lib/firestore';
import { auth } from '../../lib/firebase';
import { Campaign } from '../../types/user';
import { CampaignCard } from './CampaignCard';
import { CreateCampaignModal } from './CreateCampaignModal';
import { AuthButton } from '../../components/ui/AuthBox';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.h1};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CreateButton = styled(AuthButton)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: auto;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LoadingState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadCampaigns = async () => {
    if (!auth.currentUser) {
      console.log('No authenticated user');
      setLoading(false);
      return;
    }

    try {
      console.log('Loading campaigns for:', auth.currentUser.uid);
      const userCampaigns = await getUserCampaigns(auth.currentUser.uid);
      console.log('Loaded campaigns:', userCampaigns);
      setCampaigns(userCampaigns);
    } catch (error) {
      console.error('Failed to load campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadCampaigns();
      } else {
        setLoading(false);
        setCampaigns([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaign/${campaignId}/dashboard`);
  };

  const handleCreateSuccess = () => {
    setShowModal(false);
    loadCampaigns();
  };

  if (loading) {
    return (
      <Container>
        <LoadingState>Loading your campaigns...</LoadingState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Your Campaigns</Title>
        <CreateButton onClick={() => setShowModal(true)}>
          <Plus size={20} />
          Create Campaign
        </CreateButton>
      </Header>

      {campaigns.length === 0 ? (
        <EmptyState>
          <h2>No Campaigns Yet</h2>
          <p>Create your first campaign or join one using an invite code!</p>
        </EmptyState>
      ) : (
        <Grid>
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onClick={() => handleCampaignClick(campaign.id)}
            />
          ))}
        </Grid>
      )}

      {showModal && (
        <CreateCampaignModal
          onClose={() => setShowModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
    </Container>
  );
};
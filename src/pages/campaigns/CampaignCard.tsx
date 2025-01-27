// src/pages/campaigns/CampaignCard.tsx
import styled from 'styled-components';
import { auth } from '../../lib/firebase';
import { Campaign } from '../../types/user';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  position: relative;
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 56.25%; // 16:9 aspect ratio
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayerAvatars = styled.div`
  position: absolute;
  top: -20px;
  left: ${({ theme }) => theme.spacing.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.surface};
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h3`
  ${({ theme }) => theme.typography.h2};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Info = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

interface Props {
  campaign: Campaign;
  onClick: () => void;
}

export const CampaignCard = ({ campaign, onClick }: Props) => {
  const currentUserRole = campaign.members.find(m => m.uid === auth.currentUser?.uid)?.role;
  const dm = campaign.members.find(member => member.role === 'dm');

  return (
    <Card onClick={onClick}>
      <ImageContainer>
        <Image 
          src={campaign.imageUrl || '/placeholder.jpg'} 
          alt={campaign.name} 
        />
        <PlayerAvatars>
          {campaign.members.length > 0 ? (
            campaign.members.map(member => (
              <Avatar key={member.uid} title={member.username} />
            ))
          ) : (
            <Avatar title="No players yet" />
          )}
        </PlayerAvatars>
      </ImageContainer>
      <Content>
        <Title>{campaign.name}</Title>
        <Info>Role: {currentUserRole || 'Unknown'}</Info>
        <Info>DM: {dm?.username || 'Unknown'}</Info>
      </Content>
    </Card>
  );
};
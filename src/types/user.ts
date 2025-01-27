// src/types/user.ts
export type UserRole = 'dm' | 'player';

export interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  createdAt: FirestoreTimestamp;
}

export interface CampaignMember {
  uid: string;
  username: string;
  role: UserRole;
  joinedAt: FirestoreTimestamp;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  createdBy: string;
  inviteCode: string;
  memberUIDs: string[];
  members: CampaignMember[];
}
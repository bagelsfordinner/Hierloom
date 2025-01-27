// src/lib/firestore.ts
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  query, 
  where, 
  getDocs,
  updateDoc,
  arrayUnion,
  collectionGroup
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from './firebase';
import { Campaign, CampaignMember, UserProfile, FirestoreTimestamp } from '../types/user';

// User Management Functions
export const isUsernameAvailable = async (username: string): Promise<boolean> => {
  try {
    const q = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  } catch (error) {
    console.error('Error checking username availability:', error);
    throw error;
  }
};

export const createUserProfile = async (
  uid: string, 
  email: string, 
  username: string
): Promise<void> => {
  try {
    const timestamp: FirestoreTimestamp = {
      seconds: Math.floor(Date.now() / 1000),
      nanoseconds: 0
    };

    const userProfile: UserProfile = {
      uid,
      email,
      username,
      createdAt: timestamp
    };

    await setDoc(doc(db, 'users', uid), userProfile);
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

// Campaign Management Functions
export const createCampaign = async (
  campaign: Omit<Campaign, 'id' | 'inviteCode'>, 
  imageFile: File | null
): Promise<string> => {
  try {
    console.log('Starting campaign creation with data:', campaign);
    
    const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    let imageUrl = '';
    if (imageFile) {
      console.log('Uploading image...');
      const imageRef = ref(storage, `campaigns/${campaign.createdBy}/${Date.now()}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
      console.log('Image uploaded successfully:', imageUrl);
    }

    const campaignRef = doc(collection(db, 'campaigns'));
    const newCampaign: Campaign = {
      ...campaign,
      id: campaignRef.id,
      inviteCode,
      imageUrl,
    };

    console.log('Saving campaign to Firestore:', newCampaign);
    await setDoc(campaignRef, newCampaign);
    console.log('Campaign saved with ID:', campaignRef.id);

    return campaignRef.id;
  } catch (error) {
    console.error('Error in createCampaign:', error);
    throw error;
  }
};

export const getUserCampaigns = async (uid: string): Promise<Campaign[]> => {
  try {
    console.log('Fetching campaigns for user:', uid);
    
    const q = query(
      collection(db, 'campaigns'),
      where('memberUIDs', 'array-contains', uid)
    );

    const querySnapshot = await getDocs(q);
    console.log('Raw query result:', querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    const campaigns = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Campaign));

    console.log('Processed campaigns:', campaigns);
    return campaigns;
  } catch (error) {
    console.error('Error in getUserCampaigns:', error);
    throw error;
  }
};
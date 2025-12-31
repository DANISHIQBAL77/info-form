import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';

// Submit form data
export const submitContactForm = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, 'form-submissions'), {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone?.trim() || '',
      message: formData.message.trim(),
      timestamp: new Date().toISOString(),
      createdAt: new Date(),
      status: 'unread'
    });

    return {
      success: true,
      id: docRef.id,
      message: 'Form submitted successfully'
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      error: error.message || 'Failed to submit form'
    };
  }
};

// Get all form submissions (for admin panel)
export const getAllSubmissions = async (limitCount = 50) => {
  try {
    const q = query(
      collection(db, 'form-submissions'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const submissions = [];
    
    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return {
      success: true,
      data: submissions
    };
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
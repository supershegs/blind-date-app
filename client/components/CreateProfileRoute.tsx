// // client/components/CreateProfileRoute.tsx
// import { useEffect, useState } from 'react';
// import { apiService } from '../services/api';

// interface CreateProfileRouteProps {
//   children: React.ReactNode;
// }

// export default function CreateProfileRoute({ children }: CreateProfileRouteProps) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAccess = async () => {
//       if (!apiService.isAuthenticated()) {
//         window.location.href = '/login';
//         return;
//       }

//       try {
//         const user = apiService.getCurrentUser();
//         if (user) {
//           const response = await apiService.getUserProfile(user.userId);
//           if (response.profile || response.firstname) {
//             window.location.href = '/dashboard';
//             return;
//           }
//         }
//       } catch (error) {
//         // Profile doesn't exist and error found, allow access
//         console.error('Error checking profile:', error);   
//         return;
//         //  window.location.href = '/create-profile';
//       }
      
//       setLoading(false);
//     };

//     checkAccess();
//   }, []);

//   if (!apiService.isAuthenticated() || loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blind-pink mx-auto"></div>
//           <p className="mt-2 text-gray-600">Checking access...</p>
//         </div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }

// client/components/CreateProfileRoute.tsx
import { useEffect, useState } from 'react';
import { apiService } from '../services/api';

interface CreateProfileRouteProps {
  children: React.ReactNode;
}

export default function CreateProfileRoute({ children }: CreateProfileRouteProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!apiService.isAuthenticated()) {
        window.location.href = '/login';
        return;
      }

      try {
        const user = apiService.getCurrentUser();
        if (user) {
          const response = await apiService.getUserProfile(user.userId);
          if (response.profile || response.firstname) {
            window.location.href = '/dashboard';
            return;
          }
        }
      } catch (error) {
        // Profile doesn't exist, allow access to create profile
      }
      
      setLoading(false);
    };

    checkAccess();
  }, []);

  if (!apiService.isAuthenticated() || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blind-pink mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

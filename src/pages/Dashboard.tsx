import { User } from "lucide-react";
import Button from "../component/Button";

const Dashboard: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => (
  <div className="text-center space-y-6">
    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
      <User className="w-8 h-8 text-green-600" />
    </div>
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome, {user.firstName}!
      </h2>
      <p className="text-gray-600 mb-6">You have successfully signed in to your account.</p>
      
      <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phoneNumber}</p>
        <p><strong>Status:</strong> 
          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
            user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {user.isVerified ? 'Verified' : 'Pending Verification'}
          </span>
        </p>
      </div>
    </div>
    
    <Button onClick={onLogout} variant="secondary">
      Sign Out
    </Button>
  </div>
);

export default Dashboard;